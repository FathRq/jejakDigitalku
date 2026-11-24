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

/** UI-01 — Registration screen. */
export default function Daftar() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured) return <SupabaseNotConfigured />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    if (!name.trim()) {
      setError('Nama wajib diisi')
      return
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Format email tidak valid')
      return
    }
    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter')
      return
    }
    setError(null)
    setBusy(true)
    const err = await signUp(name.trim(), email.trim(), password)
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
          <h1 style={{ fontSize: 84, color: '#fff', textAlign: 'center' }}>Daftar</h1>
          <p
            style={{
              fontSize: 'var(--story-font-size)',
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            Buat akun untuk mulai petualangan
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <Field label="Nama">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                autoComplete="name"
              />
            </Field>
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
                placeholder="Minimal 8 karakter"
                autoComplete="new-password"
              />
            </Field>

            {error && (
              <p role="alert" style={{ fontSize: 34, color: 'var(--color-negative)' }}>
                {error}
              </p>
            )}

            <div className="flex justify-center">
              <Button type="submit" disabled={busy}>
                {busy ? 'Menyimpan…' : 'Daftar'}
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
            Sudah punya akun?{' '}
            <button type="button" className="link" onClick={() => navigate('/masuk')}>
              Masuk
            </button>
          </p>
        </GlassPanel>
      </div>
    </Stage>
  )
}
