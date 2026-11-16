import { useState } from 'react'
import { Container, FeedEmpty, Header, HistoryEmpty, HistoryHeader, HistoryTabs } from './styled'
import { TweetBox } from './TweetBox'
import { Post, type PostProps } from './Post'
import { Profile } from '../Profile'
import { Explore } from '../Explore'
import { useMedia } from '../../contexts/useMedia'
import type { User } from 'firebase/auth'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Notifications } from '../Notifications'

const posts: PostProps[] = [

  { id: 1, name: 'Mega atun', type: 'video', username: '@Abellcymeg', time: '10h', avatar: 'https://pbs.twimg.com/profile_images/2116583824650035200/85bm-i1u_400x400.jpg', text: 'When I am sad I watch this video.', video: 'https://res.cloudinary.com/tahstxat/video/upload/v1794612740/FoQkUPQjQtd9lXix.mp4', replies: 13, reposts: 20, likes: 156, views: '4.6K' },
  
  {
    id: 2,
    type: 'video',
    name: 'angel',
    username: '@napping_angel',
    time: '5h',
    avatar: 'https://pbs.twimg.com/profile_images/2111608100419457024/uF-f5CLn_400x400.jpg',
    text: '🖤🤍',
    video: 'https://res.cloudinary.com/tahstxat/video/upload/v1793154284/ssstwitter.com_1793153962925.mp4',
    replies: 25,
    reposts: 14,
    likes: 89,
    views: '3.4K',
  },
  {
    id: 3,
    name: 'Jason',
    type: 'image',
    username: '@jason',
    time: '20h',
    avatar: 'https://randomuser.me/api/portraits/men/70.jpg',
    text: 'Me when my code works and I have absolutely no idea why.',
    image: 'https://media1.tenor.com/m/xE-3Qec4KS0AAAAd/hi-lizard.gif',
    replies: 12,
    reposts: 8,
    likes: 34,
    views: '1.2K',
  },
  {
    id: 4,
    name: '୨ৎ',
    type: 'video',
    username: '@girlsnotes_',
    time: '1h',
    avatar: 'https://pbs.twimg.com/profile_images/2081039712995700736/b-wiHKq__400x400.jpg',
    text: '',
    video: 'https://res.cloudinary.com/tahstxat/video/upload/v1793154541/ssstwitter.com_1793154535114.mp4',
    replies: 7,
    reposts: 3,
    likes: 41,
    views: '980',
  },
  { id: 5, name: 'Kitties Videos', type: 'video', username: '@KittiesVids', time: '5h', avatar: 'https://pbs.twimg.com/profile_images/1900925831767261184/0IWMn5TF_400x400.jpg', text: '', video: 'https://res.cloudinary.com/tahstxat/video/upload/v1793402393/n3c5sfag_oDmsny8.mp4', replies: 8, reposts: 12, likes: 64, views: '1.8K' },
]

export const Home = ({ user, currentView, onNavigate }: {
  user: User | null
  currentView: string
  onNavigate: (view: string) => void
}) => {
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you')
  const { posts: publishedPosts, followedUserIds, likedPostIds, localLikedPostIds, localLikedPosts, feedError } = useMedia()

  if (currentView === 'explore') {
    return <Explore user={user} />
  }
  if (currentView === 'profile') {
    return <Profile user={user} onNavigate={onNavigate} />
  }
  if (currentView === 'notifications') {
    return <Notifications user={user} />
  }

  const allPosts = [...publishedPosts, ...posts]
  if (currentView === 'history') {
    const uniquePosts = [...new Map([...allPosts, ...localLikedPosts].map((post) => [String(post.id), post])).values()]
    const likedPosts = uniquePosts.filter((post) => (
      likedPostIds.has(String(post.id)) || localLikedPostIds.has(String(post.id))
    ))

    return (
      <Container>
        <HistoryHeader>
          <button type="button" aria-label="Back to home" onClick={() => onNavigate('home')}><ArrowBackIcon /></button>
          <h2>History</h2>
        </HistoryHeader>
        <HistoryTabs><span>Likes</span></HistoryTabs>
        {feedError && <p className="p-4 text-sm text-red-500" role="alert">{feedError}</p>}
        {!likedPosts.length && <HistoryEmpty>You haven't liked any posts yet.</HistoryEmpty>}
        {likedPosts.map((post) => <Post key={`liked-${post.id}`} {...post} />)}
      </Container>
    )
  }

  const visiblePosts = activeTab === 'following'
    ? publishedPosts.filter((post) => (
      post.authorUid !== undefined
      && post.authorUid !== user?.uid
      && followedUserIds.has(post.authorUid)
    ))
    : allPosts

  return (
    <Container>
      <Header>
        <button className={activeTab === 'for-you' ? 'active' : ''} onMouseEnter={() => setActiveTab('for-you')} onClick={() => setActiveTab('for-you')}>For you</button>
        <button className={activeTab === 'following' ? 'active' : ''} onMouseEnter={() => setActiveTab('following')} onClick={() => setActiveTab('following')}>Following</button>
        <span>+</span>
      </Header>

      <TweetBox />

      {feedError && <p className="p-4 text-sm text-red-500" role="alert">{feedError}</p>}
      {activeTab === 'following' && visiblePosts.length === 0 && (
        <FeedEmpty>No posts from accounts you follow yet.</FeedEmpty>
      )}
      {visiblePosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Container>
  )
} 