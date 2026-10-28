import { useState } from 'react'
import { Container, Header } from './styled'
import { TweetBox } from './TweetBox'
import { Post } from './Post'

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
]

export const Home = () => {
  const [activeTab, setActiveTab] = useState('for-you')

  return (
    <Container>
      <Header>
        <button className={activeTab === 'for-you' ? 'active' : ''} onMouseEnter={() => setActiveTab('for-you')} onClick={() => setActiveTab('for-you')}>For you</button>
        <button className={activeTab === 'following' ? 'active' : ''} onMouseEnter={() => setActiveTab('following')} onClick={() => setActiveTab('following')}>Following</button>
        <span>+</span>
      </Header>

      <TweetBox />

      {posts.map((post) => <Post key={post.id} {...post} />)}
    </Container>
  )
}