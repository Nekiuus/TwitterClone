import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import avatar from '../../assets/avatar.jpeg'
import { Post } from '../Home/Post'
import { Container } from './styled'

const profilePosts = [
  { id: 201, name: 'Tiger Eye', username: '@tigercooleyes12', time: '2h', avatar, text: 'Working on new ideas today.', image: 'https://picsum.photos/id/201/800/500', replies: 6, reposts: 4, likes: 32, views: '780' },
  { id: 202, name: 'Tiger Eye', username: '@tigercooleyes12', time: '5h', avatar, text: 'A little inspiration for the weekend.', image: 'https://picsum.photos/id/202/800/500', replies: 11, reposts: 8, likes: 57, views: '1.2K' },
  { id: 203, name: 'Tiger Eye', username: '@tigercooleyes12', time: '1d', avatar, text: 'Learning something new every day.', image: 'https://picsum.photos/id/203/800/500', replies: 4, reposts: 3, likes: 28, views: '640' },
  { id: 204, name: 'Tiger Eye', username: '@tigercooleyes12', time: '2d', avatar, text: 'Good moments are better when shared.', image: 'https://picsum.photos/id/204/800/500', replies: 9, reposts: 7, likes: 46, views: '1K' },
  { id: 205, name: 'Tiger Eye', username: '@tigercooleyes12', time: '4d', avatar, text: 'Thank you for being here.', image: 'https://wallpapercave.com/wp/wp2789503.jpg', replies: 13, reposts: 10, likes: 71, views: '1.6K' },
]

const followingUsers = [
  ['Mia Carter', '@miacarter', 11], ['Alex Rivera', '@alexcreates', 32], ['Luna Park', '@lunatravels', 44], ['Noah Smith', '@noahdesigns', 12], ['Sofia Lee', '@sofiapaints', 32],
  ['Ethan Brooks', '@ethanruns', 55], ['Nora Wilson', '@nora_reads', 12], ['Leo Martin', '@leo_music', 76], ['Emma Stone', '@emma_nature', 49], ['Oliver Reed', '@oliverwrites', 15],
]

const followerUsers = [
  ['James Cole', '@jamescole', 18], ['Ava Young', '@avayoung', 25], ['Mateo Cruz', '@mateocruz', 36], ['Chloe Adams', '@chloeadams', 47], ['Lucas King', '@lucasking', 52],
  ['Isla Moore', '@islamoore', 58], ['Daniel Fox', '@danielfox', 61], ['Maya Green', '@mayagreen', 65], ['Henry Scott', '@henryscott', 70], ['Ella Stone', '@ellastone', 76],
]

const UserList = ({ title, users, onBack }) => (
  <Container>
    <header className="profile-header list-header">
      <button type="button" onClick={onBack} aria-label="Back to profile"><ArrowBackIcon /></button>
      <div><h2>{title}</h2><span>@tigercooleyes12</span></div>
    </header>
    <nav className="list-tabs"><button className={title === 'Followers' ? 'active' : ''}>Followers</button><button className={title === 'Following' ? 'active' : ''}>Following</button></nav>
    <div className="user-list">{users.map(([name, username, image], index) => <div className="user-row" key={username}><img src={`https://randomuser.me/api/portraits/${index % 2 ? 'women' : 'men'}/${image}.jpg`} alt={`${name} avatar`} /><div><strong>{name}</strong><span>{username}</span></div><button type="button">{title === 'Following' ? 'Following' : 'Follow'}</button></div>)}</div>
  </Container>
)

export const Profile = ({ onNavigate }) => {
  const [listView, setListView] = useState(null)

  if (listView) {
    return <UserList title={listView} users={listView === 'Following' ? followingUsers : followerUsers} onBack={() => setListView(null)} />
  }

  return (
    <Container>
      <header className="profile-header">
        <button type="button" onClick={() => onNavigate('home')} aria-label="Back to home"><ArrowBackIcon /></button>
        <div><h2>Tiger Eye</h2><span>5 posts</span></div>
        <SearchIcon />
      </header>
      <div className="cover" />
      <section className="profile-info">
        <img src={avatar} alt="Tiger Eye profile" />
        <button className="edit-profile" type="button">Edit profile</button>
        <h1>Tiger Eye</h1>
        <p className="username">@tigercooleyes12</p>
        <p>Bio del usuario</p>
        <div className="stats"><button type="button" onClick={() => setListView('Following')}><strong>128</strong> Following</button><button type="button" onClick={() => setListView('Followers')}><strong>64</strong> Followers</button></div>
      </section>
      <nav><button className="active" type="button">Posts</button><button type="button">Replies</button><button type="button">Media</button><button type="button">Likes</button></nav>
      {profilePosts.map((post) => <Post key={post.id} {...post} />)}
    </Container>
  )
}
