import { useContext } from 'react'
import { MediaContext } from './mediaContext'

export function useMedia() {
  const mediaContext = useContext(MediaContext)

  if (!mediaContext) {
    throw new Error('useMedia must be used within MediaProvider')
  }

  return mediaContext
}
