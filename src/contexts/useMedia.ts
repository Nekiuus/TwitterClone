import { useContext } from 'react'
import { MediaContext, type MediaContextValue } from './mediaContext'

export function useMedia(): MediaContextValue {
  const mediaContext = useContext(MediaContext)

  if (!mediaContext) {
    throw new Error('useMedia must be used within MediaProvider')
  }

  return mediaContext
}
