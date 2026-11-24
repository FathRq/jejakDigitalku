import { useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Stage from './components/Stage'
import { AuthProvider, useAuth } from './auth/AuthProvider'
import StartScreen from './pages/StartScreen'
import Daftar from './pages/Daftar'
import Masuk from './pages/Masuk'
import Cerita from './pages/Cerita'
import Rapor from './pages/Rapor'
import BukaDiKomputer from './pages/BukaDiKomputer'

const DESKTOP_MIN_WIDTH = 1024

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= DESKTOP_MIN_WIDTH,
  )

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= DESKTOP_MIN_WIDTH)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isDesktop
}

/**
 * Route guard: `/cerita/*` and `/rapor/*` require a signed-in user.
 * While the saved session is being restored we show a short loading screen
 * instead of flashing a redirect.
 */
function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Stage>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: '#050507' }}
        >
          <p style={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }}>Memuat…</p>
        </div>
      </Stage>
    )
  }

  if (!user) return <Navigate to="/masuk" replace />
  return <>{children}</>
}

export default function App() {
  const isDesktop = useIsDesktop()

  // Desktop-only guard: small screens get the "Buka di komputer" screen.
  if (!isDesktop) {
    return <BukaDiKomputer />
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/masuk" element={<Masuk />} />
          <Route
            path="/cerita/:storyId"
            element={
              <RequireAuth>
                <Cerita />
              </RequireAuth>
            }
          />
          <Route
            path="/rapor/:storyId"
            element={
              <RequireAuth>
                <Rapor />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
