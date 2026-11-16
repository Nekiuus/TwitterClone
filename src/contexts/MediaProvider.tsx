import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { addDoc, collection, doc, getDoc, limit, onSnapshot, orderBy, query, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../Config'
import { useAuth } from './useAuth'
import { MediaContext, type MediaNotification, type MediaPost, type ReplyTarget, type SelectedMedia } from './mediaContext'
import { deleteLocalMedia, getLocalMediaUrl, saveLocalMedia } from './localMediaStore'

type Reaction = 'likes' | 'reposts'
type UserIdSet = { userId: string | null; ids: Set<string> }
const EMPTY_USER_IDS = new Set<string>()
const EMPTY_LOCAL_LIKED_POSTS: MediaPost[] = []
const EMPTY_NOTIFICATIONS: MediaNotification[] = []
export function MediaProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null)
  const [posts, setPosts] = useState<MediaPost[]>([])
  const [followedState, setFollowedState] = useState<UserIdSet>({ userId: null, ids: new Set() })
  const [likedState, setLikedState] = useState<UserIdSet>({ userId: null, ids: new Set() })
  const [repostedState, setRepostedState] = useState<UserIdSet>({ userId: null, ids: new Set() })
  const [localLikedState, setLocalLikedState] = useState<UserIdSet>({ userId: null, ids: new Set() })
  const [localLikedPostsState, setLocalLikedPostsState] = useState<{ userId: string | null; posts: MediaPost[] }>({ userId: null, posts: [] })
  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null)
  const [feedError, setFeedError] = useState('')
  const [notificationState, setNotificationState] = useState<{ userId: string | null; items: MediaNotification[] }>({ userId: null, items: EMPTY_NOTIFICATIONS })
  const [notificationErrorState, setNotificationErrorState] = useState<{ userId: string | null; error: string }>({ userId: null, error: '' })
  const objectUrlRef = useRef<string | null>(null)
  const pendingReactionsRef = useRef<Set<string>>(new Set())
  const followedUserIds = followedState.userId === user?.uid ? followedState.ids : EMPTY_USER_IDS
  const likedPostIds = likedState.userId === user?.uid ? likedState.ids : EMPTY_USER_IDS
  const repostedPostIds = repostedState.userId === user?.uid ? repostedState.ids : EMPTY_USER_IDS
  const localLikedPostIds = localLikedState.userId === user?.uid ? localLikedState.ids : EMPTY_USER_IDS
  const localLikedPosts = localLikedPostsState.userId === user?.uid ? localLikedPostsState.posts : EMPTY_LOCAL_LIKED_POSTS
  const notifications = notificationState.userId === user?.uid ? notificationState.items : EMPTY_NOTIFICATIONS
  const notificationError = notificationErrorState.userId === user?.uid ? notificationErrorState.error : ''

  const saveMedia = useCallback((file: File) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)

    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    setSelectedMedia({
      file,
      url,
      name: file.name,
      type: file.type,
      size: file.size,
    })
  }, [])

  const publishPost = useCallback(async (post: Pick<MediaPost, 'name' | 'username' | 'avatar' | 'text'>, replyTo?: ReplyTarget) => {
    if (!user) throw new Error('You must be signed in to post.')

    const text = post.text.trim()
    if (!text && !selectedMedia) throw new Error('Write something or attach media before posting.')

    let localMediaId: string | undefined
    let mediaFields: Partial<Pick<MediaPost, 'type' | 'image' | 'video' | 'localMediaId'>> = {}

    if (selectedMedia) {
      localMediaId = await saveLocalMedia(selectedMedia.file)
      mediaFields = selectedMedia.type.startsWith('video/')
        ? { type: 'video', localMediaId }
        : { type: 'image', localMediaId }
    }

    try {
      let parentAuthorUid: string | undefined
      if (replyTo) {
        try {
          const parentPost = await getDoc(doc(db, 'posts', String(replyTo.postId)))
          const authorUid = parentPost.exists() ? parentPost.data().authorUid : undefined
          if (typeof authorUid === 'string' && authorUid !== user.uid) parentAuthorUid = authorUid
        } catch (error) {
          console.error('Unable to find the reply recipient:', error)
        }
      }

      const postRef = await addDoc(collection(db, 'posts'), {
        ...post,
        text,
        ...mediaFields,
        ...(replyTo ? { replyToPostId: String(replyTo.postId), replyToUsername: replyTo.username } : {}),
        authorUid: user.uid,
        time: 'now',
        replies: 0,
        reposts: 0,
        likes: 0,
        views: '0',
        createdAt: serverTimestamp(),
      })
      if (parentAuthorUid) {
        try {
          await setDoc(doc(db, 'users', parentAuthorUid, 'notifications', `reply_${postRef.id}`), {
            type: 'reply',
            actorUid: user.uid,
            actorUsername: post.username,
            postId: String(replyTo?.postId),
            createdAt: serverTimestamp(),
          })
        } catch (error) {
          console.error('Reply was posted, but its notification could not be saved:', error)
        }
      }
    } catch (error) {
      if (localMediaId) {
        try {
          await deleteLocalMedia(localMediaId)
        } catch (cleanupError) {
          console.error('Unable to clean up media for a post that was not saved:', cleanupError)
        }
      }
      throw error
    }

    if (selectedMedia) {
      if (objectUrlRef.current === selectedMedia.url) {
        URL.revokeObjectURL(selectedMedia.url)
        objectUrlRef.current = null
      }
      setSelectedMedia((currentMedia) => currentMedia?.url === selectedMedia.url ? null : currentMedia)
    }
  }, [selectedMedia, user])

  const toggleReaction = useCallback(async (postId: string, reaction: Reaction) => {
    if (!user) throw new Error('You must be signed in to react to a post.')

    const pendingKey = `${user.uid}:${reaction}:${postId}`
    if (pendingReactionsRef.current.has(pendingKey)) return

    pendingReactionsRef.current.add(pendingKey)
    const currentState = reaction === 'likes' ? likedState : repostedState
    const wasActive = currentState.userId === user.uid && currentState.ids.has(postId)
    const nextActive = !wasActive
    const countDelta = nextActive ? 1 : -1
    const updateReactionState = reaction === 'likes' ? setLikedState : setRepostedState

    updateReactionState((state) => {
      const ids = new Set(state.userId === user.uid ? state.ids : [])
      if (nextActive) ids.add(postId)
      else ids.delete(postId)
      return { userId: user.uid, ids }
    })
    setPosts((currentPosts) => currentPosts.map((post) => post.id === postId
      ? { ...post, [reaction]: Math.max(Number(post[reaction] || 0) + countDelta, 0) }
      : post))

    const postRef = doc(db, 'posts', postId)
    const reactionRef = doc(db, 'users', user.uid, reaction, postId)

    try {
      const result = await runTransaction(db, async (transaction) => {
        const [postSnapshot, reactionSnapshot] = await Promise.all([
          transaction.get(postRef),
          transaction.get(reactionRef),
        ])

        if (!postSnapshot.exists()) throw new Error('This post no longer exists.')

        const isActive = reactionSnapshot.exists()
        const currentCount = Number(postSnapshot.data()[reaction] || 0)
        const postAuthorUid = postSnapshot.data().authorUid
        const authorUid = typeof postAuthorUid === 'string' ? postAuthorUid : undefined
        if (isActive === nextActive) return { isActive, count: currentCount, authorUid }

        const nextCount = Math.max(currentCount + countDelta, 0)
        if (nextActive) {
          transaction.set(reactionRef, { createdAt: serverTimestamp() })
          transaction.update(postRef, { [reaction]: nextCount })
        } else {
          transaction.delete(reactionRef)
          transaction.update(postRef, { [reaction]: nextCount })
        }
        return { isActive: nextActive, count: nextCount, authorUid }
      })

      if (reaction === 'likes' && result.isActive && result.authorUid && result.authorUid !== user.uid) {
        const notificationRef = doc(db, 'users', result.authorUid, 'notifications', `like_${postId}_${user.uid}`)
        const notificationWrite = setDoc(notificationRef, {
          type: 'like',
          actorUid: user.uid,
          actorUsername: user.email ? `@${user.email.split('@')[0]}` : '@user',
          postId,
          createdAt: serverTimestamp(),
        })
        void notificationWrite.catch((error) => console.error('Like was updated, but its notification could not be saved:', error))
      }

      updateReactionState((state) => {
        const ids = new Set(state.userId === user.uid ? state.ids : [])
        if (result.isActive) ids.add(postId)
        else ids.delete(postId)
        return { userId: user.uid, ids }
      })
      setPosts((currentPosts) => currentPosts.map((post) => post.id === postId
        ? { ...post, [reaction]: result.count }
        : post))
    } catch (error) {
      updateReactionState((state) => {
        const ids = new Set(state.userId === user.uid ? state.ids : [])
        if (wasActive) ids.add(postId)
        else ids.delete(postId)
        return { userId: user.uid, ids }
      })
      setPosts((currentPosts) => currentPosts.map((post) => post.id === postId
        ? { ...post, [reaction]: Math.max(Number(post[reaction] || 0) - countDelta, 0) }
        : post))
      throw error
    } finally {
      pendingReactionsRef.current.delete(pendingKey)
    }
  }, [likedState, repostedState, user])

  const toggleLike = useCallback((postId: string) => toggleReaction(postId, 'likes'), [toggleReaction])
  const toggleRepost = useCallback((postId: string) => toggleReaction(postId, 'reposts'), [toggleReaction])
  const toggleLocalLike = useCallback((post: MediaPost) => {
    const postId = String(post.id)
    setLocalLikedState((state) => {
      const ids = new Set(state.userId === user?.uid ? state.ids : [])
      if (ids.has(postId)) ids.delete(postId)
      else ids.add(postId)
      return { userId: user?.uid ?? null, ids }
    })
    setLocalLikedPostsState((state) => {
      const posts = state.userId === user?.uid ? state.posts : []
      return {
        userId: user?.uid ?? null,
        posts: posts.some((item) => String(item.id) === postId)
          ? posts.filter((item) => String(item.id) !== postId)
          : [...posts, post],
      }
    })
  }, [user])
  const startReply = useCallback((target: ReplyTarget) => setReplyTarget(target), [])
  const clearReplyTarget = useCallback(() => setReplyTarget(null), [])

  const deletePost = useCallback(async (postId: string) => {
    if (!user) throw new Error('You must be signed in to delete a post.')

    let localMediaId: string | undefined
    await runTransaction(db, async (transaction) => {
      const postRef = doc(db, 'posts', postId)
      const postSnapshot = await transaction.get(postRef)

      if (!postSnapshot.exists()) throw new Error('This post no longer exists.')
      if (postSnapshot.data().authorUid !== user.uid) throw new Error('You can only delete your own posts.')

      const storedMediaId = postSnapshot.data().localMediaId
      if (typeof storedMediaId === 'string') localMediaId = storedMediaId
      transaction.delete(postRef)
    })

    if (localMediaId) {
      try {
        await deleteLocalMedia(localMediaId)
      } catch (error) {
        console.error('Post deleted, but its local media could not be removed:', error)
      }
    }
  }, [user])

  useEffect(() => {
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(100))
    const mediaObjectUrls = new Set<string>()
    let active = true
    let snapshotVersion = 0
    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const currentVersion = ++snapshotVersion
        void Promise.all(snapshot.docs.map(async (postSnapshot) => {
          const post = { ...postSnapshot.data(), id: postSnapshot.id } as MediaPost
          if (!post.localMediaId) return post

          try {
            const url = await getLocalMediaUrl(post.localMediaId)
            if (!url) return { ...post, mediaUnavailable: true }
            return post.type === 'video' ? { ...post, video: url } : { ...post, image: url }
          } catch (error) {
            console.error('Unable to load locally stored post media:', error)
            return { ...post, mediaUnavailable: true }
          }
        })).then((loadedPosts) => {
          if (!active || currentVersion !== snapshotVersion) {
            loadedPosts.forEach((post) => {
              const url = post.type === 'video' ? post.video : post.image
              if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
            })
            return
          }

          mediaObjectUrls.forEach((url) => URL.revokeObjectURL(url))
          mediaObjectUrls.clear()
          loadedPosts.forEach((post) => {
            const url = post.type === 'video' ? post.video : post.image
            if (url?.startsWith('blob:')) mediaObjectUrls.add(url)
          })
          setPosts(loadedPosts)
          setFeedError(loadedPosts.some((post) => post.mediaUnavailable)
            ? 'Some post media is unavailable in this browser.'
            : '')
        })
      },
      (error) => {
        console.error('Unable to load posts:', error)
        setFeedError('Unable to load posts.')
      },
    )

    return () => {
      active = false
      unsubscribe()
      mediaObjectUrls.forEach((url) => URL.revokeObjectURL(url))
      mediaObjectUrls.clear()
    }
  }, [])

  useEffect(() => {
    if (!user) return

    return onSnapshot(
      collection(db, 'users', user.uid, 'following'),
      (snapshot) => setFollowedState({
        userId: user.uid,
        ids: new Set(snapshot.docs.map((following) => following.id)),
      }),
      (error) => {
        console.error('Unable to load followed accounts:', error)
        setFeedError('Unable to load the Following feed.')
      },
    )
  }, [user])

  useEffect(() => {
    if (!user) return

    return onSnapshot(
      query(collection(db, 'users', user.uid, 'notifications'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setNotificationState({
          userId: user.uid,
          items: snapshot.docs.map((item) => ({ ...item.data(), id: item.id }) as MediaNotification),
        })
        setNotificationErrorState({ userId: user.uid, error: '' })
      },
      (error) => {
        console.error('Unable to load notifications:', error)
        setNotificationErrorState({ userId: user.uid, error: 'Unable to load notifications.' })
      },
    )
  }, [user])

  useEffect(() => {
    if (!user) return

    const subscribeToReactions = (reaction: Reaction, setState: (state: UserIdSet) => void) =>
      onSnapshot(
        collection(db, 'users', user.uid, reaction),
        (snapshot) => {
          setState({ userId: user.uid, ids: new Set(snapshot.docs.map((item) => item.id)) })
        },
        (error) => {
          console.error(`Unable to load ${reaction}:`, error)
          setFeedError('Unable to load post reactions.')
        },
      )

    const unsubscribeLikes = subscribeToReactions('likes', setLikedState)
    const unsubscribeReposts = subscribeToReactions('reposts', setRepostedState)

    return () => {
      unsubscribeLikes()
      unsubscribeReposts()
    }
  }, [user])

  const clearMedia = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setSelectedMedia(null)
  }, [])

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
  }, [])

  const value = useMemo(
    () => ({
      selectedMedia,
      posts,
      followedUserIds,
      likedPostIds,
      repostedPostIds,
      localLikedPostIds,
      localLikedPosts,
      notifications,
      notificationError,
      replyTarget,
      feedError,
      saveMedia,
      clearMedia,
      publishPost,
      toggleLike,
      toggleRepost,
      toggleLocalLike,
      startReply,
      clearReplyTarget,
      deletePost,
    }),
    [
      selectedMedia,
      posts,
      followedUserIds,
      likedPostIds,
      repostedPostIds,
      localLikedPostIds,
      localLikedPosts,
      notifications,
      notificationError,
      replyTarget,
      feedError,
      saveMedia,
      clearMedia,
      publishPost,
      toggleLike,
      toggleRepost,
      toggleLocalLike,
      startReply,
      clearReplyTarget,
      deletePost,
    ],
  )

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}
