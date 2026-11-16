import { useContext } from 'react'
import { AuthContext, type AuthContextValue } from './authState'

export function useAuth(): AuthContextValue {
  const authState = useContext(AuthContext)

  if (!authState) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return authState
}
