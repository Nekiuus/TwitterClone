import { Route, Routes } from 'react-router-dom'
import GlobalStyles from './assets/styles/GlobalStyles'
import { AuthenticatedApp } from './components/AuthenticatedApp'
import { AuthProvider } from './contexts/AuthProvider'
import { MediaProvider } from './contexts/MediaProvider'
import { DefaultRoute, GuestRoute, ProtectedRoute } from './routes/AuthRoutes'

export default function App() {
  return (
    <AuthProvider>
      <MediaProvider>
        <GlobalStyles />
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
