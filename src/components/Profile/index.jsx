
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import avatar from '../../assets/avatar.jpeg'
import { Post } from '../Home/Post'
import { Container } from './styled'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../Config'
import { useEffect, useState } from 'react'




const profilePosts = [
  { id: 205, time: '4d', text: 'Thank you for being here.', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154218/samples/people/bicycle.jpg', replies: 13, reposts: 10, likes: 71, views: '1.6K' },
  { id: 206, time: '5d', text: 'A little progress every day adds up.', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154221/samples/cloudinary-group.jpg', replies: 8, reposts: 4, likes: 42, views: '920' },
  { id: 207, time: '1w', text: 'Taking a moment to enjoy the small things.', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154217/samples/landscapes/girl-urban-view.jpg', replies: 5, reposts: 3, likes: 36, views: '710' },
  { id: 208, time: '1w', text: 'Working on something new. More soon!', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154220/samples/ecommerce/accessories-bag.jpg', replies: 17, reposts: 9, likes: 83, views: '2.1K' },
  { id: 209, time: '2w', text: 'Fresh air and a change of scenery.', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154219/samples/landscapes/beach-boat.jpg', replies: 11, reposts: 6, likes: 64, views: '1.4K' },
  { id: 210, time: '2w', text: 'Keep learning, keep building.', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154218/samples/people/jazz.jpg', replies: 4, reposts: 2, likes: 29, views: '560' },
  { id: 211, time: '3w', text: 'Found a new favorite place to get things done.', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154221/samples/landscapes/nature-mountains.jpg', replies: 9, reposts: 5, likes: 51, views: '1.1K' },
  { id: 212, time: '3w', text: 'Ending the week grateful for the little wins.', image: 'https://res.cloudinary.com/tahstxat/image/upload/v1793154219/samples/ecommerce/car-interior-design.jpg', replies: 7, reposts: 3, likes: 47, views: '880' },
]

const UserList = ({ title, users, username, onBack }) => (
  <Container>
    <header className="profile-header list-header">
      <button type="button" onClick={onBack} aria-label="Back to profile"><ArrowBackIcon /></button>
      <div><h2>{title}</h2><span>{username}</span></div>
    </header>
    <nav className="list-tabs"><button type="button" className={title === 'Followers' ? 'active' : ''}>Followers</button><button type="button" className={title === 'Following' ? 'active' : ''}>Following</button></nav>
    <div className="user-list">{users.map((person) => {
      const username = person.username || person.email?.split('@')[0] || person.uid
      const name = person.displayName && person.displayName !== person.email
        ? person.displayName
        : username
      const handle = `@${username.replace(/^@/, '')}`
      return (
        <div className="user-row" key={person.uid}>
          <img
            src={person.photoURL || avatar}
            alt={`${name} avatar`}
            onError={(event) => { event.currentTarget.src = avatar }}
          />
          <div><strong>{name}</strong><span>{handle}</span></div>
          <button type="button">{title === 'Following' ? 'Following' : 'Follow'}</button>
        </div>
      )
    })}</div>
  </Container>
)

export const Profile = ({ user, onNavigate }) => {
  const [listView, setListView] = useState(null)
  const [users, setUsers] = useState([])
  const [counts, setCounts] = useState({ following: 0, followers: 0 })

useEffect(() => {
  if (!user?.uid) return

  const unsubscribers = ['following', 'followers'].map((listName) =>
    onSnapshot(
      collection(db, 'users', user.uid, listName),
      (snapshot) =>
        setCounts((current) => ({ ...current, [listName]: snapshot.size })),
      (error) => console.error(`No se pudo contar ${listName}:`, error)
    )
  )

  return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
}, [user?.uid])
  


useEffect(() => {
  if (!listView || !user?.uid) return

  const listName = listView.toLowerCase() // "following" o "followers"
  const ref = collection(db, 'users', user.uid, listName)

  let isActive = true
  const unsubscribe = onSnapshot(ref, async (snapshot) => {
    try {
      const profiles = await Promise.all(snapshot.docs.map(async (item) => {
        const profileSnapshot = await getDoc(doc(db, 'users', item.id))
        return {
          ...item.data(),
          ...(profileSnapshot.data() || {}),
          uid: item.id,
        }
      }))

      if (isActive) setUsers(profiles)
    } catch (error) {
      console.error('No se pudo cargar la información de la lista:', error)
    }
  }, (error) => {
    console.error('No se pudo cargar la lista:', error)
  })

  return () => {
    isActive = false
    unsubscribe()
  }
}, [listView, user?.uid])

  const name = user?.displayName || user?.email || 'User'
  const username = user?.email ? `@${user.email.split('@')[0]}` : '@user'
  

  if (listView) {
    return <UserList title={listView} users={users} username={username} onBack={() => setListView(null)} />
  }

  return (
    <Container>
      <header className="profile-header">
        <button type="button" onClick={() => onNavigate('home')} aria-abel="Back to home"><ArrowBackIcon /></button>
        <div><h2>{name}</h2><span>8 posts</span></div>
        <SearchIcon />
      </header>
      <div className="cover" />
      <section className="profile-info">
        <img src={user?.photoURL || avatar} alt={`${name} profile`} onError={(event) => { event.currentTarget.src = avatar }} />
        <button className="edit-profile" type="button">Edit profile</button>
        <h1>{name}</h1>
        <p className="username">{username}</p>
        <p>Bio del usuario</p>
        <div className="stats"><button type="button" onClick={() => setListView('Following')}><strong>{counts.following}</strong> Following</button><button type="button" onClick={() => setListView('Followers')}><strong>{counts.followers}</strong> Followers</button></div>
      </section>
      <nav><button className="active" type="button">Posts</button><button type="button">Replies</button><button type="button">Media</button><button type="button">Likes</button></nav>
      {profilePosts.map((post) => (
        <Post
          key={post.id}
          {...post}
          name={name}
          username={username}
          avatar={user?.photoURL || avatar}
        />
      ))}
    </Container>
  )
}


