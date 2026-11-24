import { useNavigate } from 'react-router-dom'
import Stage from '../components/Stage'
import Button from '../components/ui/Button'
import { useAuth } from '../auth/AuthProvider'
import { STORIES } from '../stories'

const BG =
  'radial-gradient(1500px 950px at 50% 26%, #23233a 0%, #101018 55%, #050507 100%)'

/** UI-00 — Start screen. */
export default function StartScreen() {
  const navigate = useNavigate()
  const { user, displayName, signOut } = useAuth()
  const firstStoryId = Object.keys(STORIES)[0] ?? 's1-penipuan'

  return (
    <Stage>
      <div className="absolute inset-0" style={{ background: BG }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="text-center"
          style={{ fontSize: 120, color: '#fff', letterSpacing: '2px' }}
        >
          Jejak Digitalku
        </h1>
        <p
          className="text-center"
          style={{ fontSize: 42, color: 'rgba(255,255,255,0.72)', marginTop: 28 }}
        >
          Petualangan interaktif tentang literasi digital
        </p>
        {user && (
          <p style={{ fontSize: 46, color: 'var(--color-positive)', marginTop: 44 }}>
            Halo, {displayName ?? user.email}!
          </p>
        )}
        <div className="flex items-center" style={{ gap: 40, marginTop: user ? 48 : 84 }}>
          {user ? (
            <>
              <Button variant="primary" onClick={() => navigate(`/cerita/${firstStoryId}`)}>
                Mulai Cerita
              </Button>
              <Button variant="secondary" onClick={() => void signOut()}>
                Keluar
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={() => navigate('/daftar')}>
                Daftar
              </Button>
              <Button variant="secondary" onClick={() => navigate('/masuk')}>
                Masuk
              </Button>
            </>
          )}
        </div>
      </div>
    </Stage>
  )
}
