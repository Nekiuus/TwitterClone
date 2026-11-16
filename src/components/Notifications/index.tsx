import { useMemo } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReplyIcon from '@mui/icons-material/Reply'
import type { User } from 'firebase/auth'
import { useMedia } from '../../contexts/useMedia'
import type { MediaNotification } from '../../contexts/mediaContext'
import { Container } from '../Home/styled'
import { NotificationEmpty, NotificationError, NotificationIcon, NotificationItem, NotificationMessage, NotificationsHeader } from './styled'

export const Notifications = ({ user }: { user: User | null }) => {
  const { posts, notifications, notificationError } = useMedia()
  const items = useMemo(() => {
    const ownPostIds = new Set(posts.filter((post) => post.authorUid === user?.uid).map((post) => String(post.id)))
    const replies = posts.flatMap((post): MediaNotification[] => {
      if (!post.replyToPostId || !post.authorUid || post.authorUid === user?.uid || !ownPostIds.has(post.replyToPostId)) return []
      return [{
        id: `reply_${post.id}`,
        type: 'reply',
        actorUid: post.authorUid,
        actorUsername: post.username,
        postId: post.replyToPostId,
        createdAt: post.createdAt,
      }]
    })
    const uniqueItems = new Map([...notifications, ...replies].map((item) => [item.id, item]))
    return [...uniqueItems.values()].sort((first, second) => (second.createdAt?.toMillis() || 0) - (first.createdAt?.toMillis() || 0))
  }, [notifications, posts, user?.uid])

  return (
    <Container>
      <NotificationsHeader><h2>Notifications</h2></NotificationsHeader>
      {notificationError && <NotificationError role="alert">{notificationError}</NotificationError>}
      {!items.length && !notificationError && <NotificationEmpty>No notifications yet.</NotificationEmpty>}
      {items.map((item) => (
        <NotificationItem key={item.id}>
          <NotificationIcon>{item.type === 'reply' ? <ReplyIcon /> : <FavoriteIcon />}</NotificationIcon>
          <NotificationMessage><strong>{item.actorUsername}</strong> {item.type === 'reply' ? 'replied to your message' : 'liked your post'}</NotificationMessage>
        </NotificationItem>
      ))}
    </Container>
  )
}
