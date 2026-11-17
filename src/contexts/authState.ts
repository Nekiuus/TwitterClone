import type { User } from 'firebase/auth'
import { createContext } from 'react'

export interface SavedProfile {
  uid: string
  username?: string
  email?: string
  displayName?: string
  photoURL?: string
  customPhotoURL?: string
  bannerURL?: string
  bio?: string
}

export interface AuthContextValue {
  user: User | null
  profile: SavedProfile | null
  isLoading: boolean
  error: Error | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)
