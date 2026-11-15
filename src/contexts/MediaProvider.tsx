import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { MediaContext, type MediaPost, type SelectedMedia } from './mediaContext'

export function MediaProvider({ children }: { children: ReactNode }) {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null)
  const [posts, setPosts] = useState<MediaPost[]>([])
  const objectUrlRef = useRef<string | null>(null)
  const publishedUrlsRef = useRef<Set<string>>(new Set())

  const saveMedia = useCallback((file: File) => {
    if (objectUrlRef.current && !publishedUrlsRef.current.has(objectUrlRef.current)) {
      URL.revokeObjectURL(objectUrlRef.current)
    }

    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    const media = {
      file,
      url,
      name: file.name,
      type: file.type,
      size: file.size,
    }
    setSelectedMedia(media)
    return media
  }, [])

  const publishPost = useCallback((post: Omit<MediaPost, 'id' | 'time' | 'replies' | 'reposts' | 'likes' | 'views' | 'type' | 'image' | 'video'>) => {
    const newPost = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...post,
      ...(selectedMedia && {
        type: selectedMedia.type.startsWith('video/') ? 'video' as const : 'image' as const,
        image: selectedMedia.type.startsWith('image/') ? selectedMedia.url : undefined,
        video: selectedMedia.type.startsWith('video/') ? selectedMedia.url : undefined,
      }),
      time: 'now',
      replies: 0,
      reposts: 0,
      likes: 0,
      views: '0',
    }

    if (selectedMedia) {
      publishedUrlsRef.current.add(selectedMedia.url)
      objectUrlRef.current = null
    }

    setPosts((currentPosts) => [newPost, ...currentPosts])
    setSelectedMedia(null)
  }, [selectedMedia])

  const clearMedia = useCallback(() => {
    if (objectUrlRef.current) {
      if (!publishedUrlsRef.current.has(objectUrlRef.current)) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
      objectUrlRef.current = null
    }
    setSelectedMedia(null)
  }, [])

  useEffect(() => () => {
    for (const url of publishedUrlsRef.current) URL.revokeObjectURL(url)
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
  }, [])

  const value = useMemo(
    () => ({ selectedMedia, posts, saveMedia, clearMedia, publishPost }),
    [selectedMedia, posts, saveMedia, clearMedia, publishPost],
  )

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}
