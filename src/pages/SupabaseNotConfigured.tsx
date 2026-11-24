import { useNavigate } from 'react-router-dom'
import Stage from '../components/Stage'
import GlassPanel from '../components/ui/GlassPanel'
import Button from '../components/ui/Button'

const BG =
  'radial-gradient(1500px 950px at 50% 26%, #1b1b2e 0%, #0c0c14 60%, #050507 100%)'

/** Shown when src/lib/config.ts still has the ISI_... placeholder values. */
export default function SupabaseNotConfigured() {
  const navigate = useNavigate()

  return (
    <Stage>
      <div className="absolute inset-0" style={{ background: BG }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <GlassPanel style={{ width: 1160, padding: '64px 72px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 72, color: '#fff' }}>
            Konfigurasi Supabase belum diisi
          </h1>
          <p
            style={{
              fontSize: 'var(--story-font-size)',
              color: 'rgba(255,255,255,0.75)',
              marginTop: 24,
              lineHeight: 1.5,
            }}
          >
            Isi <span style={{ color: 'var(--color-accent)' }}>SUPABASE_URL</span> dan{' '}
            <span style={{ color: 'var(--color-accent)' }}>SUPABASE_ANON_KEY</span> di
            file <span style={{ color: 'var(--color-accent)' }}>src/lib/config.ts</span>,
            lalu muat ulang halaman ini.
          </p>
          <div className="flex justify-center" style={{ marginTop: 48 }}>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Kembali
            </Button>
          </div>
        </GlassPanel>
      </div>
    </Stage>
  )
}
