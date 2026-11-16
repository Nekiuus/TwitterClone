import { useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Config'
import { AuthContext, type AuthContextValue } from './authState'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthContextValue>({
    user: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => setAuthState({ user, isLoading: false, error: null }),
      (error) => setAuthState({ user: null, isLoading: false, error }),
    )

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
}
