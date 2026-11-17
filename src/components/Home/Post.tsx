import { useEffect, useRef, useState, type MouseEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Avatar, DeletePostButton, PostBody, PostContainer, PostDescription, PostFooter, PostActionIcon, PostMenuButton, PostMenuContainer, PostMenuPopup, Images, Video } from './styled'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VerifiedIcon from '@mui/icons-material/Verified'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import reply from '../../assets/reply.png'
import retweet from '../../assets/retweet.png'
import { useMedia } from '../../contexts/useMedia'
import { useAuth } from '../../contexts/useAuth'
import type { ProfileAccount } from '../AuthenticatedApp'

export interface PostProps {
  id?: string | number
  authorUid?: string
  name?: string
  username?: string
  time?: string
  text?: string
  image?: string
  video?: string
  type?: 'image' | 'video'
  mediaUnavailable?: boolean
  replyToUsername?: string
  replyToPostId?: string
  replies?: number
  reposts?: number
  likes?: number
  views?: number | string
  avatar?: string
  onOpenProfile?: (profile: ProfileAccount) => void
  onOpenPost?: (postId: string) => void
}

export const Post = ({
  name = 'User',
  username = '@user',
  time = '',
  text = '',
  image,
  video,
  type,
  mediaUnavailable,
  replyToUsername,
  replies = 0,
  reposts = 0,
  likes = 0,
  views = '0',
  avatar = '',
  id,
  authorUid,
  onOpenProfile,
  onOpenPost,
}: PostProps) => {
  const { likedPostIds, repostedPostIds, localLikedPostIds, toggleLike, toggleRepost, toggleLocalLike, startReply, deletePost, recordPostView } = useMedia()
  const { user } = useAuth()
  const menuRef = useRef<HTMLDivElement>(null)
  const postRef = useRef<HTMLDivElement>(null)
  const viewRecordedRef = useRef(false)
  const [localReposted, setLocalReposted] = useState(false)
  const [localReposts, setLocalReposts] = useState(reposts)
  const [actionError, setActionError] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLikePending, setIsLikePending] = useState(false)
  const [isRepostPending, setIsRepostPending] = useState(false)
  const remotePostId = typeof id === 'string' && authorUid ? id : null
  const canDelete = Boolean(remotePostId && authorUid === user?.uid)
  const isLiked = remotePostId ? likedPostIds.has(remotePostId) : id !== undefined && localLikedPostIds.has(String(id))
  const isReposted = remotePostId ? repostedPostIds.has(remotePostId) : localReposted
  const formattedViews = typeof views === 'number'
    ? new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(views)
    : views
  const openAuthorProfile = () => {
    if (authorUid) onOpenProfile?.({ uid: authorUid, username: username.replace(/^@/, ''), displayName: name, photoURL: avatar })
  }
  const openPost = (event: MouseEvent<HTMLDivElement>) => {
    if (!onOpenPost || id === undefined || (event.target as Element).closest('button, a, input, video')) return
    onOpenPost(String(id))
  }
  const openPostFromKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      if (id !== undefined) onOpenPost?.(String(id))
    }
  }

  useEffect(() => {
    const element = postRef.current
    if (!element || !remotePostId || authorUid === user?.uid || !user || viewRecordedRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || viewRecordedRef.current) return
      viewRecordedRef.current = true
      void recordPostView(remotePostId, authorUid).catch((error) => {
        console.error('Unable to record post view:', error)
        setActionError('Could not record this view.')
      })
    }, { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [authorUid, recordPostView, remotePostId, user])

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
    }
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  const handleDelete = async () => {
    if (!remotePostId) return

    setActionError('')
    setIsDeleting(true)
    try {
      await deletePost(remotePostId)
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Unable to delete post:', error)
      setActionError(error instanceof Error ? error.message : 'Could not delete post.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLike = async () => {
    setActionError('')
    if (remotePostId) {
      setIsLikePending(true)
      try {
        await toggleLike(remotePostId)
      } catch (error) {
        console.error('Unable to update like:', error)
        setActionError('Could not update like.')
      } finally {
        setIsLikePending(false)
      }
      return
    }

    if (id !== undefined) toggleLocalLike({
      id,
      name,
      username,
      avatar,
      text,
      time,
      image,
      video,
      type,
      replies,
      reposts,
      likes,
      views,
      replyToUsername,
    })
  }

  const handleReply = () => {
    if (id !== undefined) startReply({ postId: id, username })
  }

  const handleRepost = async () => {
    setActionError('')
    if (remotePostId) {
      setIsRepostPending(true)
      try {
        await toggleRepost(remotePostId)
      } catch (error) {
        console.error('Unable to update repost:', error)
        setActionError('Could not update repost.')
      } finally {
        setIsRepostPending(false)
      }
      return
    }

    const nextReposted = !localReposted
    setLocalReposted(nextReposted)
    setLocalReposts((count) => Math.max(count + (nextReposted ? 1 : -1), 0))
  }

  return (
    <PostContainer className={onOpenPost ? 'post-clickable' : ''} ref={postRef} onClick={openPost} onKeyDown={openPostFromKeyboard} tabIndex={onOpenPost && id !== undefined ? 0 : undefined}>
      <button className="post-avatar" type="button" onClick={openAuthorProfile} disabled={!authorUid || !onOpenProfile} aria-label={`Open ${username}'s profile`}>
        <Avatar src={avatar} alt={`${name} avatar`} />
      </button>
      <PostBody>
        <div className="post-content">
          <div className="post-header">
            <h3>
              <button className="post-author-name" type="button" disabled={!authorUid || !onOpenProfile} onClick={openAuthorProfile}>{name}</button>
              <VerifiedIcon className="verified-icon" />
              <button className="post-username" type="button" disabled={!authorUid || !onOpenProfile} onClick={openAuthorProfile}>{username}</button>
              <span className="post-time">· {time}</span>
            </h3>
            {canDelete && (
              <PostMenuContainer ref={menuRef}>
                <PostMenuButton
                  type="button"
                  aria-label="More post options"
                  aria-haspopup="menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  <MoreHorizIcon />
                </PostMenuButton>
                {isMenuOpen && (
                  <PostMenuPopup role="menu">
                    <DeletePostButton type="button" role="menuitem" disabled={isDeleting} onClick={handleDelete}>
                      <DeleteIcon />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </DeletePostButton>
                  </PostMenuPopup>
                )}
              </PostMenuContainer>
            )}
          </div>

          <PostDescription>
            {replyToUsername && <p className="replying-to">Replying to {replyToUsername}</p>}
            <p>{text}</p>
          </PostDescription>
          
          {type === 'video' && video && <Video src={video} controls />}
          {type !== 'video' && image && <Images src={image} alt="Post" />}
          {mediaUnavailable && <p className="media-unavailable" role="note">This media is only available in the browser where it was posted.</p>}

          <PostFooter>
            <button type="button" className="reply-action" aria-label={`Reply to ${username}`} onClick={handleReply}><PostActionIcon className="post-action-icon" $icon={reply} role="img" aria-label="Replies" />{replies}</button>
            <button type="button" className={`repost-action${isReposted ? ' active' : ''}`} aria-label={isReposted ? 'Undo repost' : 'Repost'} aria-pressed={isReposted} disabled={isRepostPending} onClick={handleRepost}>
              <PostActionIcon className="post-action-icon" $icon={retweet} role="img" aria-label="Reposts" />
              {remotePostId ? reposts : localReposts}
            </button>
            <button type="button" className={`like-action${isLiked ? ' active' : ''}`} aria-label={isLiked ? 'Unlike post' : 'Like post'} aria-pressed={isLiked} disabled={isLikePending} onClick={handleLike}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              {remotePostId ? likes : likes + (isLiked ? 1 : 0)}
            </button>
            <span className="view-action"><BarChartOutlinedIcon />{formattedViews}</span>
          </PostFooter>
          {actionError && <p className="action-error" role="alert">{actionError}</p>}
        </div>
      </PostBody>
    </PostContainer>
  )
}