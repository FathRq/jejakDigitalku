import { useNavigate } from 'react-router-dom'
import Stage from '../Stage'
import Button from '../ui/Button'

const BG =
  'radial-gradient(1500px 950px at 50% 26%, #1b1b2e 0%, #0c0c14 60%, #050507 100%)'

interface StoryStatusProps {
  kind: 'loading' | 'error' | 'not-found'
  /** loading: the text to show (default "Memuat…"). */
  text?: string
  /** error: heading and message (with defaults). */
  title?: string
  message?: string
  onRetry?: () => void
  /** not-found: the label ("Cerita"/"Rapor") and the unknown id. */
  label?: string
  storyId?: string
}

/** Full-screen status: loading, a failed Supabase call, or an unknown story. */
export default function StoryStatus({
  kind,
  text = 'Memuat…',
  title = 'Gagal memuat',
  message = 'Periksa koneksimu, lalu coba lagi.',
  onRetry,
  label = 'Cerita',
  storyId,
}: StoryStatusProps) {
  const navigate = useNavigate()

  return (
    <Stage>
      <div className="absolute inset-0" style={{ background: BG }} />
      <div className="absolute inset-0 flex items-center justify-center">
        {kind === 'loading' && (
          <p style={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }}>{text}</p>
        )}
        {kind === 'error' && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 72, color: '#fff' }}>{title}</h1>
            <p style={{ fontSize: 36, color: 'rgba(255,255,255,0.7)', marginTop: 24 }}>
              {message}
            </p>
            <div className="flex justify-center" style={{ marginTop: 48 }}>
              <Button onClick={onRetry}>Coba lagi</Button>
            </div>
          </div>
        )}
        {kind === 'not-found' && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 72, color: '#fff' }}>{label} tidak ditemukan</h1>
            <p style={{ fontSize: 36, color: 'rgba(255,255,255,0.7)', marginTop: 24 }}>
              {label} “{storyId}” belum tersedia.
            </p>
            <div style={{ marginTop: 48 }}>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Kembali
              </button>
            </div>
          </div>
        )}
      </div>
    </Stage>
  )
}
