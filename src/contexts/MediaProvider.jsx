import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MediaContext } from './mediaContext'

export function MediaProvider({ children }) {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [posts, setPosts] = useState([])
  const objectUrlRef = useRef(null)
  const publishedUrlsRef = useRef(new Set())

  const saveMedia = useCallback((file) => {
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

  const publishPost = useCallback((post) => {
    const newPost = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...post,
      ...(selectedMedia && {
        type: selectedMedia.type.startsWith('video/') ? 'video' : 'image',
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
