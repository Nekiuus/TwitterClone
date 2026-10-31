import { useState } from 'react'
import { Container, Header } from './styled'
import { TweetBox } from './TweetBox'
import { Post } from './Post'
import { Profile } from '../Profile'

const posts = [
  
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
  { id: 4, name: 'Kitties Videos', type: 'video', username: '@KittiesVids', time: '5h', avatar: 'https://pbs.twimg.com/profile_images/1900925831767261184/0IWMn5TF_400x400.jpg', text: '', video: 'https://res.cloudinary.com/tahstxat/video/upload/v1793402393/n3c5sfag_oDmsny8.mp4', replies: 8, reposts: 12, likes: 64, views: '1.8K' },
]

const followingPosts = [
  { id: 101, name: 'KaelWorks', username: '@SGarzonart', time: 'Jan 01', avatar: 'https://pbs.twimg.com/profile_images/2008207775969542145/AnBNNvdG_400x400.jpg', text: 'A bit late, but.... happy 2026!! 🎇📷Wishing you progress, peace, and big wins this year.🥂', image: 'https://pbs.twimg.com/media/G96l1yXWcAAdFH2?format=jpg&name=medium', replies: 8, reposts: 12, likes: 64, views: '1.8K' },
  { id: 102, name: 'Sua', type: 'video', username: '@suaverotic', time: '3h', avatar: 'https://pbs.twimg.com/profile_images/2096249887398432769/16KWo33l_400x400.jpg', text: 'me after crying for 3hrs', video: 'https://res.cloudinary.com/tahstxat/video/upload/v1793402903/JGZx12ThxSlaMu4d.mp4', replies: 14, reposts: 9, likes: 87, views: '2.4K' },
  { id: 103, name: 'Luna', username: '@lunatravels', time: '4h', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', text: 'The view was worth the early wake-up.', image: 'https://picsum.photos/id/29/800/500', replies: 21, reposts: 18, likes: 143, views: '4.1K' },
  { id: 104, name: 'Noah', username: '@noahdesigns', time: '5h', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', text: 'Small details make a big difference.', image: 'https://picsum.photos/id/48/800/500', replies: 5, reposts: 7, likes: 52, views: '1.1K' },
  { id: 105, name: 'Sofia', username: '@sofiapaints', time: '6h', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', text: 'Experimenting with new colors.', image: 'https://picsum.photos/id/96/800/500', replies: 11, reposts: 15, likes: 98, views: '2.8K' },
  { id: 106, name: 'Ethan', username: '@ethanruns', time: '7h', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', text: 'One step at a time.', image: 'https://picsum.photos/id/103/800/500', replies: 6, reposts: 4, likes: 39, views: '900' },
  { id: 107, name: 'Nora', username: '@nora_reads', time: '8h', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', text: 'A good book makes the day better.', image: 'https://picsum.photos/id/24/800/500', replies: 18, reposts: 10, likes: 76, views: '1.9K' },
  { id: 108, name: 'Leo', username: '@leo_music', time: '9h', avatar: 'https://randomuser.me/api/portraits/men/76.jpg', text: 'New playlist is finally ready.', image: 'https://picsum.photos/id/145/800/500', replies: 9, reposts: 13, likes: 112, views: '3.2K' },
  { id: 109, name: 'Emma', username: '@emma_nature', time: '10h', avatar: 'https://randomuser.me/api/portraits/women/49.jpg', text: 'Nature always knows how to surprise you.', image: 'https://picsum.photos/id/164/800/500', replies: 13, reposts: 20, likes: 156, views: '4.6K' },
  { id: 110, name: 'Oliver', username: '@oliverwrites', time: '12h', avatar: 'https://randomuser.me/api/portraits/men/15.jpg', text: 'Writing down ideas before they disappear.', image: 'https://picsum.photos/id/180/800/500', replies: 4, reposts: 6, likes: 47, views: '1.3K' },
]

export const Home = ({ currentView, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('for-you')

  if (currentView === 'profile') {
    return <Profile onNavigate={onNavigate} />
  }
  return (
    <Container>
      <Header>
        <button className={activeTab === 'for-you' ? 'active' : ''} onMouseEnter={() => setActiveTab('for-you')} onClick={() => setActiveTab('for-you')}>For you</button>
        <button className={activeTab === 'following' ? 'active' : ''} onMouseEnter={() => setActiveTab('following')} onClick={() => setActiveTab('following')}>Following</button>
        <span>+</span>
      </Header>

      <TweetBox />

      {(activeTab === 'following' ? followingPosts : posts).map((post) => <Post key={post.id} {...post} />)}
    </Container>
  )
} 