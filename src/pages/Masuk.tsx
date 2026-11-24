import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Stage from '../components/Stage'
import GlassPanel from '../components/ui/GlassPanel'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../auth/AuthProvider'
import { isSupabaseConfigured } from '../lib/supabase'
import SupabaseNotConfigured from './SupabaseNotConfigured'

const BG =
  'radial-gradient(1500px 950px at 50% 26%, #1b1b2e 0%, #0c0c14 60%, #050507 100%)'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.85)' }}>{label}</span>
      {children}
    </label>
  )
}

/** UI-02 — Login screen. */
export default function Masuk() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured) return <SupabaseNotConfigured />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    if (!EMAIL_RE.test(email.trim())) {
      setError('Format email tidak valid')
      return
    }
    if (!password) {
      setError('Kata sandi wajib diisi')
      return
    }
    setError(null)
    setBusy(true)
    const err = await signIn(email.trim(), password)
    setBusy(false)
    if (err) {
      setError(err)
      return
    }
    navigate('/')
  }

  return (
    <Stage>
      <div className="absolute inset-0" style={{ background: BG }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <GlassPanel style={{ width: 1080, padding: '64px 80px' }}>
          <h1 style={{ fontSize: 84, color: '#fff', textAlign: 'center' }}>Masuk</h1>
          <p
            style={{
              fontSize: 'var(--story-font-size)',
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            Selamat datang kembali
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <Field label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@contoh.com"
                autoComplete="email"
              />
            </Field>
            <Field label="Kata sandi">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kata sandi kamu"
                autoComplete="current-password"
              />
            </Field>

            {error && (
              <p role="alert" style={{ fontSize: 34, color: 'var(--color-negative)' }}>
                {error}
              </p>
            )}

            <div className="flex justify-center">
              <Button type="submit" disabled={busy}>
                {busy ? 'Memeriksa…' : 'Masuk'}
              </Button>
            </div>
          </form>

          <p
            style={{
              textAlign: 'center',
              fontSize: 34,
              color: 'rgba(255,255,255,0.7)',
              marginTop: 40,
            }}
          >
            Belum punya akun?{' '}
            <button type="button" className="link" onClick={() => navigate('/daftar')}>
              Daftar
            </button>
          </p>
        </GlassPanel>
      </div>
    </Stage>
  )
}
