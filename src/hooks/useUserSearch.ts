import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { collection, endAt, limit, onSnapshot, orderBy, query, startAt } from 'firebase/firestore'
import { db } from '../Config'
import type { ProfileAccount } from '../components/AuthenticatedApp'

export function useUserSearch(user: User | null) {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState<ProfileAccount[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const usernameKey = term.trim().replace(/^@/, '').toLowerCase()
    if (!usernameKey || !user?.uid) return
    const usersQuery = query(
      collection(db, 'users'),
      orderBy('usernameKey'),
      startAt(usernameKey),
      endAt(`${usernameKey}\uf8ff`),
      limit(10)
    )

    return onSnapshot(usersQuery, (snapshot) => {
      setResults(snapshot.docs
        .filter((item) => item.id !== user.uid)
        .map((item) => ({ ...item.data(), uid: item.id }) as ProfileAccount))
      setLoading(false)
    }, (searchError) => {
      console.error('Unable to search users:', searchError)
      setError('Unable to search users')
      setLoading(false)
    })
  }, [term, user?.uid])

  const search = (value: string) => {
    setTerm(value)
    setError('')
    if (!value.trim() || !user?.uid) {
      setResults([])
      setLoading(false)
    } else {
      setLoading(true)
    }
  }

  return { term, results, loading, error, search }
}
