import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import GlobalStyles from './assets/styles/GlobalStyles'
import { Sidebar } from './components/Sidebar'
import { Home } from './components/Home'
import { Widgets } from './components/Widgets'
import { auth } from './Config'
import { Login } from './Login'
import { MediaProvider } from './contexts/MediaProvider'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
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

function useAuth() {
  const authState = useContext(AuthContext)

  if (!authState) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return authState
}

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

function GuestRoute() {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <AuthLoading />
  if (error) return <AuthError />
  if (user) return <Navigate to="/app" replace />

  return <Login />
}

function ProtectedRoute({ children }) {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <AuthLoading />
  if (error) return <AuthError />
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function DefaultRoute() {
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <AuthLoading />
  if (error) return <AuthError />

  return <Navigate to={user ? '/app' : '/login'} replace />
}

function AuthenticatedApp() {
  const [currentView, setCurrentView] = useState('home')
  const { user } = useAuth()

  return (
    <div className="App">
      <Sidebar user={user} onNavigate={setCurrentView} />
      <Home user={user} currentView={currentView} onNavigate={setCurrentView} />
      <Widgets />
      <GlobalStyles />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <MediaProvider>
        <Routes>
          <Route path="/" element={<DefaultRoute />} />
          <Route path="/login" element={<GuestRoute />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AuthenticatedApp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
      </MediaProvider>
    </AuthProvider>
  )
}

export default App
