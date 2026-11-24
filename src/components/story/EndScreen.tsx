import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import type { EndNode } from '../../engine/types'

/** Status of the `finish_story` RPC on the end screen. */
export type FinishStatus = 'idle' | 'sending' | 'error'

interface EndScreenProps {
  node: EndNode
  storyId: string
  /** Story title (e.g. "Penipuan") — shown in the subtitle. */
  storyTitle: string
  finishStatus?: FinishStatus
  onRetryFinish?: () => void
}

/**
 * End of the story. The `finish_story` RPC is called automatically when this
 * screen appears; while it runs (or if it fails) the report button is
 * disabled, because no result exists for this attempt yet.
 */
export default function EndScreen({
  storyId,
  storyTitle,
  finishStatus = 'idle',
  onRetryFinish,
}: EndScreenProps) {
  const navigate = useNavigate()

  return (
    <div
      className="screen-fade absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(1500px 950px at 50% 30%, #1b1b2e 0%, #0c0c14 60%, #050507 100%)' }}
    >
      <h1 style={{ fontSize: 96, color: '#fff' }}>Cerita Selesai</h1>
      <p style={{ fontSize: 42, color: 'rgba(255,255,255,0.7)', marginTop: 24 }}>
        Kamu sudah menamatkan cerita “{storyTitle}”.
      </p>
      {finishStatus === 'sending' && (
        <p style={{ fontSize: 40, color: 'var(--color-accent)', marginTop: 40 }}>
          Mengirim nilai…
        </p>
      )}
      {finishStatus === 'error' && (
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 40, color: 'var(--color-negative)' }}>
            Gagal mengirim nilai. Coba lagi.
          </p>
          <div style={{ marginTop: 32 }}>
            <Button onClick={onRetryFinish}>Coba lagi</Button>
          </div>
        </div>
      )}
      <div className="flex" style={{ gap: 40, marginTop: 64 }}>
        <Button
          variant="primary"
          disabled={finishStatus !== 'idle'}
          onClick={() => navigate(`/rapor/${storyId}`)}
        >
          Lihat Rapor
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Kembali
        </Button>
      </div>
    </div>
  )
}
