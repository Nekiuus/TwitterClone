import { useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../Config'
import { AuthContext, type AuthContextValue, type SavedProfile } from './authState'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthContextValue>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  })
  const [profileState, setProfileState] = useState<{ uid: string | null; profile: SavedProfile | null }>({ uid: null, profile: null })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => setAuthState({ user, profile: null, isLoading: false, error: null }),
      (error) => setAuthState({ user: null, profile: null, isLoading: false, error }),
    )

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!authState.user) return

    return onSnapshot(doc(db, 'users', authState.user.uid), (snapshot) => {
      setProfileState({
        uid: authState.user?.uid || null,
        profile: snapshot.exists() ? { ...snapshot.data(), uid: snapshot.id } as SavedProfile : null,
      })
    }, (error) => console.error('Unable to load saved profile:', error))
  }, [authState.user])

  const profile = profileState.uid === authState.user?.uid ? profileState.profile : null
  return <AuthContext.Provider value={{ ...authState, profile }}>{children}</AuthContext.Provider>
}
