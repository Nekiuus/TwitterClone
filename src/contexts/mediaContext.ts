import { createContext } from 'react'
import type { Timestamp } from 'firebase/firestore'

export interface SelectedMedia {
  file: File
  url: string
  name: string
  type: string
  size: number
}

export interface ReplyTarget {
  postId: string | number
  username: string
}

export interface MediaPost {
  id: string | number
  authorUid?: string
  name: string
  username: string
  avatar: string
  text: string
  time?: string
  type?: 'image' | 'video'
  image?: string
  video?: string
  localMediaId?: string
  mediaUnavailable?: boolean
  replyToPostId?: string
  replyToUsername?: string
  replies?: number
  reposts?: number
  likes?: number
  views?: number | string
  createdAt?: Timestamp
}

export interface MediaNotification {
  id: string
  type: 'reply' | 'like'
  actorUid: string
  actorUsername: string
  postId: string
  createdAt?: Timestamp
}

export interface MediaContextValue {
  selectedMedia: SelectedMedia | null
  posts: MediaPost[]
  followedUserIds: Set<string>
  likedPostIds: Set<string>
  repostedPostIds: Set<string>
  localLikedPostIds: Set<string>
  localLikedPosts: MediaPost[]
  notifications: MediaNotification[]
  notificationError: string
  replyTarget: ReplyTarget | null
  feedError: string
  saveMedia: (file: File) => void
  clearMedia: () => void
  publishPost: (post: Pick<MediaPost, 'name' | 'username' | 'avatar' | 'text'>, replyTo?: ReplyTarget) => Promise<void>
  toggleLike: (postId: string) => Promise<void>
  toggleRepost: (postId: string) => Promise<void>
  toggleLocalLike: (post: MediaPost) => void
  startReply: (replyTarget: ReplyTarget) => void
  clearReplyTarget: () => void
  deletePost: (postId: string) => Promise<void>
  recordPostView: (postId: string, authorUid?: string) => Promise<void>
}

export const MediaContext = createContext<MediaContextValue | null>(null)
