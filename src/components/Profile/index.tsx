import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import CloseIcon from '@mui/icons-material/Close'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { collection, documentId, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, startAfter, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore'
import { useEffect, useState, type ChangeEvent } from 'react'
import type { User } from 'firebase/auth'
import { db, saveProfileImage, toggleFollow } from '../../Config'
import avatar from '../../assets/avatar.png'
import { useMedia } from '../../contexts/useMedia'
import { useAuth } from '../../contexts/useAuth'
import { compressProfileImage } from '../../utils/compressProfileImage'
import { Post } from '../Home/Post'
import { ShowMoreButton } from '../Home/styled'
import { Container, Cover, HiddenFileInput, ProfileImageActions, ProfileImageBanner, ProfileImageClose, ProfileImageDialog, ProfileImageHeader, ProfileImageIconPicker, ProfileImageOverlay, ProfileImagePicker, ProfileImageSave } from './styled'
import type { ProfileAccount } from '../AuthenticatedApp'

const PAGE_SIZE = 10
type ListView = 'Followers' | 'Following'
type ProfileTab = 'Posts' | 'Replies' | 'Likes'

type ProfileListUser = ProfileAccount

const UserList = ({ title, users, username, onBack, onChange, followedUserIds, onFollow, hasMore, loading, error, onLoadMore }: {
  title: ListView
  users: ProfileListUser[]
  username: string
  onBack: () => void
  onChange: (view: ListView) => void
  followedUserIds: Set<string>
  onFollow: (uid: string) => void
  hasMore: boolean
  loading: boolean
  error: string
  onLoadMore: () => void
}) => (
  <Container>
    <header className="profile-header list-header">
      <button type="button" onClick={onBack} aria-label="Back to profile"><ArrowBackIcon /></button>
      <div><h2>{title}</h2><span>{username}</span></div>
    </header>
    <nav className="list-tabs">
      <button type="button" className={title === 'Followers' ? 'active' : ''} onClick={() => onChange('Followers')}>Followers</button>
      <button type="button" className={title === 'Following' ? 'active' : ''} onClick={() => onChange('Following')}>Following</button>
    </nav>
    <div className="user-list">{users.map((person) => {
      const handle = person.username || person.email?.split('@')[0] || person.uid
      const name = person.displayName && person.displayName !== person.email ? person.displayName : handle
      return (
        <div className="user-row" key={person.uid}>
          <img src={person.customPhotoURL || person.photoURL || avatar} alt={`${name} avatar`} onError={(event) => { event.currentTarget.src = avatar }} />
          <div><strong>{name}</strong><span>@{handle.replace(/^@/, '')}</span></div>
          <button type="button" onClick={() => onFollow(person.uid)}>{followedUserIds.has(person.uid) ? 'Following' : 'Follow'}</button>
        </div>
      )
    })}</div>
    {error && <p className="profile-error">{error}</p>}
    {loading && <p className="profile-empty">Loading...</p>}
    {hasMore && <ShowMoreButton type="button" disabled={loading} onClick={onLoadMore}>{loading ? 'Loading...' : 'Ver más'}</ShowMoreButton>}
  </Container>
)

export const Profile = ({ user, profile, onNavigate, onOpenProfile, onOpenPost }: {
  user: User | null
  profile: ProfileAccount | null
  onNavigate: (view: string) => void
  onOpenProfile: (profile: ProfileAccount) => void
  onOpenPost: (postId: string) => void
}) => {
  const [listView, setListView] = useState<ListView | null>(null)
  const [tab, setTab] = useState<ProfileTab>('Posts')
  const [users, setUsers] = useState<ProfileListUser[]>([])
  const [userCursor, setUserCursor] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [hasMoreUsers, setHasMoreUsers] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [userListError, setUserListError] = useState('')
  const [counts, setCounts] = useState({ following: 0, followers: 0 })
  const [postPage, setPostPage] = useState(1)
  const [followBusy, setFollowBusy] = useState(false)
  const [followError, setFollowError] = useState('')
  const [editingImages, setEditingImages] = useState(false)
  const [savingImage, setSavingImage] = useState<'avatar' | 'banner' | 'saving' | null>(null)
  const [imageDrafts, setImageDrafts] = useState<Partial<Record<'avatar' | 'banner', string>>>({})
  const [imageError, setImageError] = useState('')
  const { posts, likedPostIds, localLikedPostIds, localLikedPosts, followedUserIds } = useMedia()
  const { profile: savedProfile } = useAuth()
  const profileUid = profile?.uid || user?.uid
  const isOwnProfile = !profile || profile.uid === user?.uid
  const name = profile?.displayName || (isOwnProfile ? user?.displayName || user?.email : profile?.username || profile?.email) || 'User'
  const rawUsername = profile?.username || profile?.email?.split('@')[0] || user?.email?.split('@')[0] || 'user'
  const username = `@${rawUsername.replace(/^@/, '')}`
  const photoURL = profile?.customPhotoURL || (isOwnProfile ? savedProfile?.customPhotoURL : '') || profile?.photoURL || (isOwnProfile ? user?.photoURL : '') || avatar
  const bannerURL = profile?.bannerURL || (isOwnProfile ? savedProfile?.bannerURL : undefined)

  useEffect(() => {
    if (!profileUid) return

    const unsubscribers = (['following', 'followers'] as const).map((listName) =>
      onSnapshot(collection(db, 'users', profileUid, listName), (snapshot) => {
        setCounts((current) => ({ ...current, [listName]: snapshot.size }))
      }, (error) => console.error(`Unable to count ${listName}:`, error))
    )
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
  }, [profileUid])

  useEffect(() => {
    if (!listView || !profileUid) return

    let active = true
    const loadFirstPage = async () => {
      setLoadingUsers(true)
      setUserListError('')
      try {
        const usersRef = collection(db, 'users', profileUid, listView.toLowerCase())
        const page = await getDocs(query(usersRef, orderBy(documentId()), limit(PAGE_SIZE + 1)))
        const displayedDocs = page.docs.slice(0, PAGE_SIZE)
        const profiles = await Promise.all(displayedDocs.map(async (item) => {
          const profileSnapshot = await getDoc(doc(db, 'users', item.id))
          return { ...item.data(), ...(profileSnapshot.data() || {}), uid: item.id } as ProfileListUser
        }))
        if (active) {
          setUsers(profiles)
          setUserCursor(displayedDocs[displayedDocs.length - 1] || null)
          setHasMoreUsers(page.docs.length > PAGE_SIZE)
        }
      } catch (error) {
        console.error('Unable to load profile list:', error)
        if (active) setUserListError('Unable to load this list.')
      } finally {
        if (active) setLoadingUsers(false)
      }
    }
    void loadFirstPage()
    return () => { active = false }
  }, [listView, profileUid])

  const loadMoreUsers = async () => {
    if (!listView || !profileUid || !userCursor || loadingUsers) return
    setLoadingUsers(true)
    setUserListError('')
    try {
      const usersRef = collection(db, 'users', profileUid, listView.toLowerCase())
      const page = await getDocs(query(usersRef, orderBy(documentId()), startAfter(userCursor), limit(PAGE_SIZE + 1)))
      const displayedDocs = page.docs.slice(0, PAGE_SIZE)
      const profiles = await Promise.all(displayedDocs.map(async (item) => {
        const profileSnapshot = await getDoc(doc(db, 'users', item.id))
        return { ...item.data(), ...(profileSnapshot.data() || {}), uid: item.id } as ProfileListUser
      }))
      setUsers((current) => [...current, ...profiles])
      setUserCursor(displayedDocs[displayedDocs.length - 1] || userCursor)
      setHasMoreUsers(page.docs.length > PAGE_SIZE)
    } catch (error) {
      console.error('Unable to load more profiles:', error)
      setUserListError('Unable to load more profiles.')
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleFollow = async (targetUid: string) => {
    if (!user?.uid || targetUid === user.uid || followBusy) return
    setFollowBusy(true)
    setFollowError('')
    try {
      await toggleFollow(user.uid, targetUid)
    } catch (error) {
      console.error('Unable to follow/unfollow account:', error)
      setFollowError('Unable to update follow status.')
    } finally {
      setFollowBusy(false)
    }
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file || !user?.uid) return

    setSavingImage(type)
    setImageError('')
    try {
      const image = await compressProfileImage(file, type)
      setImageDrafts((drafts) => ({ ...drafts, [type]: image }))
    } catch (error) {
      console.error(`Unable to update profile ${type}:`, error)
      setImageError(error instanceof Error ? error.message : 'Unable to save this image.')
    } finally {
      setSavingImage(null)
    }
  }

  const saveImageChanges = async () => {
    if (!user?.uid) return
    setSavingImage('saving')
    setImageError('')
    try {
      for (const type of ['avatar', 'banner'] as const) {
        const image = imageDrafts[type]
        if (image) await saveProfileImage(user.uid, type, image)
      }
      setImageDrafts({})
      setEditingImages(false)
    } catch (error) {
      console.error('Unable to save profile images:', error)
      setImageError(error instanceof Error ? error.message : 'Unable to save profile images.')
    } finally {
      setSavingImage(null)
    }
  }

  const ownPosts = posts.filter((post) => post.authorUid === profileUid)
  const profileLikes = isOwnProfile
    ? [...new Map([...posts, ...localLikedPosts].filter((post) => (
      likedPostIds.has(String(post.id)) || localLikedPostIds.has(String(post.id))
    )).map((post) => [String(post.id), post])).values()]
    : []
  const displayedPosts = tab === 'Replies'
    ? ownPosts.filter((post) => Boolean(post.replyToPostId))
    : tab === 'Likes'
      ? profileLikes
      : ownPosts.filter((post) => !post.replyToPostId)
  const pagedPosts = displayedPosts.slice(0, postPage * PAGE_SIZE)

  if (listView) {
    return <UserList title={listView} users={users} username={username} onBack={() => setListView(null)} onChange={setListView} followedUserIds={followedUserIds} onFollow={(uid) => { void handleFollow(uid) }} hasMore={hasMoreUsers} loading={loadingUsers} error={userListError} onLoadMore={() => { void loadMoreUsers() }} />
  }

  return (
    <>
    <Container>
      <header className="profile-header">
        <button type="button" onClick={() => onNavigate('home')} aria-label="Back"><ArrowBackIcon /></button>
        <div><h2>{name}</h2><span>{ownPosts.length} posts</span></div>
        <SearchIcon />
      </header>
      <Cover $image={bannerURL} />
      <section className="profile-info">
        <img src={photoURL} alt={`${name} profile`} onError={(event) => { event.currentTarget.src = avatar }} />
        {isOwnProfile
          ? <button className="edit-profile" type="button" onClick={() => { setImageError(''); setImageDrafts({}); setEditingImages(true) }}>Edit profile</button>
          : <button className="edit-profile" type="button" disabled={followBusy} onClick={() => { if (profileUid) void handleFollow(profileUid) }}>{followBusy ? '...' : followedUserIds.has(profileUid || '') ? 'Following' : 'Follow'}</button>}
        <h1>{name}</h1>
        <p className="username">{username}</p>
        <p>{profile?.bio || (isOwnProfile ? 'Bio del usuario' : '')}</p>
        {followError && <p className="profile-error" role="alert">{followError}</p>}
        <div className="stats">
          <button type="button" onClick={() => setListView('Following')}><strong>{counts.following}</strong> Following</button>
          <button type="button" onClick={() => setListView('Followers')}><strong>{counts.followers}</strong> Followers</button>
        </div>
      </section>
      <nav className="profile-tabs">
        <button className={tab === 'Posts' ? 'active' : ''} type="button" onClick={() => { setTab('Posts'); setPostPage(1) }}>Posts</button>
        <button className={tab === 'Replies' ? 'active' : ''} type="button" onClick={() => { setTab('Replies'); setPostPage(1) }}>Replies</button>
        {isOwnProfile && <button className={tab === 'Likes' ? 'active' : ''} type="button" onClick={() => { setTab('Likes'); setPostPage(1) }}>Likes</button>}
      </nav>
      {!pagedPosts.length && <p className="profile-empty">{tab === 'Likes' ? "You haven't liked any posts yet." : `No ${tab.toLowerCase()} yet.`}</p>}
      {pagedPosts.map((post) => <Post key={`${tab}-${post.id}`} {...post} onOpenProfile={onOpenProfile} onOpenPost={onOpenPost} />)}
      {pagedPosts.length < displayedPosts.length && <ShowMoreButton type="button" onClick={() => setPostPage((page) => page + 1)}>Ver más</ShowMoreButton>}
    </Container>
    {editingImages && (
      <ProfileImageOverlay onClick={() => { if (!savingImage) { setImageDrafts({}); setEditingImages(false) } }}>
        <ProfileImageDialog role="dialog" aria-modal="true" aria-label="Edit profile images" onClick={(event) => event.stopPropagation()}>
          <ProfileImageHeader>
            <ProfileImageClose type="button" onClick={() => { setImageDrafts({}); setEditingImages(false) }} disabled={Boolean(savingImage)} aria-label="Close"><CloseIcon /></ProfileImageClose>
            <h2>Edit profile</h2>
            <ProfileImageSave type="button" onClick={() => { void saveImageChanges() }} disabled={Boolean(savingImage)}>{savingImage === 'saving' ? 'Saving...' : 'Save'}</ProfileImageSave>
          </ProfileImageHeader>
          <ProfileImageBanner $image={imageDrafts.banner || bannerURL || ''}>
            <ProfileImageIconPicker htmlFor="profile-banner" aria-label="Change banner">
              <CameraAltOutlinedIcon />
            </ProfileImageIconPicker>
          </ProfileImageBanner>
          <ProfileImageActions>
            <img src={imageDrafts.avatar || photoURL} alt={`${name} profile preview`} onError={(event) => { event.currentTarget.src = avatar }} />
            <div><strong>Edit your photo with Starling</strong><span>{savingImage === 'avatar' ? 'Preparing image...' : 'Choose a new profile photo'}</span></div>
            <ProfileImagePicker htmlFor="profile-avatar" aria-label="Change profile photo">
              <EditOutlinedIcon /> Edit photo
            </ProfileImagePicker>
          </ProfileImageActions>
          <HiddenFileInput id="profile-banner" type="file" accept="image/*" disabled={Boolean(savingImage)} onChange={(event) => { void handleImageChange(event, 'banner') }} />
          <HiddenFileInput id="profile-avatar" type="file" accept="image/*" disabled={Boolean(savingImage)} onChange={(event) => { void handleImageChange(event, 'avatar') }} />
          {imageError && <p className="profile-error" role="alert">{imageError}</p>}
        </ProfileImageDialog>
      </ProfileImageOverlay>
    )}
    </>
  )
}
