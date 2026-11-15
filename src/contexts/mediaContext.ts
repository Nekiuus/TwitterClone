import { createContext } from 'react'

export interface SelectedMedia {
  file: File
  url: string
  name: string
  type: string
  size: number
}

export interface MediaPost {
  id: string | number
  name: string
  username: string
  avatar: string
  text: string
  time?: string
  type?: 'image' | 'video'
  image?: string
  video?: string
  replies?: number
  reposts?: number
  likes?: number
  views?: string
}

export interface MediaContextValue {
  selectedMedia: SelectedMedia | null
  posts: MediaPost[]
  saveMedia: (file: File) => SelectedMedia
  clearMedia: () => void
  publishPost: (post: Omit<MediaPost, 'id' | 'time' | 'replies' | 'reposts' | 'likes' | 'views' | 'type' | 'image' | 'video'>) => void
}

export const MediaContext = createContext<MediaContextValue | null>(null)
