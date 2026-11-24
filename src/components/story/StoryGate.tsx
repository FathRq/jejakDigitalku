import Button from '../ui/Button'
import GlassPanel from '../ui/GlassPanel'

interface StoryGateProps {
  mode: 'resume' | 'replay'
  /** The saved scene number (resume mode only). */
  scene?: number
  total?: number
  onPrimary: () => void
  onSecondary: () => void
  busy?: boolean
  /** Error message shown under the buttons (failed Supabase call). */
  error?: string
}

/**
 * The pre-play gate. "resume": continue a saved game or start over.
 * "replay": the story was already finished — play again or view the report.
 */
export default function StoryGate({
  mode,
  scene,
  total,
  onPrimary,
  onSecondary,
  busy,
  error,
}: StoryGateProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <GlassPanel style={{ width: 1100, padding: '64px 72px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 72, color: '#fff' }}>
          {mode === 'resume' ? 'Lanjutkan cerita?' : 'Cerita sudah selesai'}
        </h1>
        <p
          style={{
            fontSize: 'var(--story-font-size)',
            color: 'rgba(255,255,255,0.75)',
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          {mode === 'resume'
            ? `Kamu tersimpan di adegan ${scene} dari ${total}.`
            : 'Nilaimu sudah tersimpan. Mainkan lagi untuk membuat percobaan baru.'}
        </p>
        <div className="flex items-center justify-center" style={{ gap: 32, marginTop: 56 }}>
          <Button variant="primary" onClick={onPrimary} disabled={busy}>
            {busy
              ? 'Menyiapkan…'
              : mode === 'resume'
                ? 'Lanjutkan cerita'
                : 'Ulangi skenario'}
          </Button>
          <Button variant="secondary" onClick={onSecondary} disabled={busy}>
            {mode === 'resume' ? 'Mulai dari awal' : 'Lihat rapor'}
          </Button>
        </div>
        {error && (
          <p style={{ fontSize: 30, color: 'var(--color-negative)', marginTop: 32 }}>{error}</p>
        )}
      </GlassPanel>
    </div>
  )
}
