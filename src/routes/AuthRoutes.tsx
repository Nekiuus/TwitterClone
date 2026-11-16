import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Login } from '../Login'
import { useAuth } from '../contexts/useAuth'

function AuthLoading() {
  return <div className="min-h-screen bg-black" aria-busy="true" aria-label="Verificando sesión" />
}

function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center text-white" role="alert">
      No se pudo verificar tu sesión. Recarga la página para volver a intentarlo.
    </div>
  )
}

export function GuestRoute() {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <AuthLoading />
  if (error) return <AuthError />
  if (user) return <Navigate to="/app" replace />

  return <Login />
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <AuthLoading />
  if (error) return <AuthError />
  if (!user) return <Navigate to="/login" replace />

  return children
}

export function DefaultRoute() {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <AuthLoading />
  if (error) return <AuthError />

  return <Navigate to={user ? '/app' : '/login'} replace />
}
