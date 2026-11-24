import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Stage from '../components/Stage'
import GlassPanel from '../components/ui/GlassPanel'
import Button from '../components/ui/Button'
import ReportCard from '../components/story/ReportCard'
import StoryStatus from '../components/story/StoryStatus'
import { useAuth } from '../auth/AuthProvider'
import { STORIES } from '../stories'
import { getLatestResult, startNewAttempt, type ResultRow } from '../lib/storyApi'

const BG =
  'radial-gradient(1500px 950px at 50% 26%, #1b1b2e 0%, #0c0c14 60%, #050507 100%)'

/**
 * `/rapor/:storyId` — UI-06, the "Rapor Digital" screen.
 * The scores are read from `story_results` (written by the `finish_story`
 * RPC) and only displayed here — never computed in the client.
 */
export default function Rapor() {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const { user, displayName } = useAuth()
  const story = storyId ? STORIES[storyId] : undefined

  // undefined = loading, null = no result yet, ResultRow = the latest run.
  const [result, setResult] = useState<ResultRow | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [replayBusy, setReplayBusy] = useState(false)

  const load = useCallback(async () => {
    const uid = user?.id
    if (!uid || !storyId) return
    setError(null)
    setResult(undefined)
    try {
      setResult(await getLatestResult(uid, storyId))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat rapor')
    }
  }, [user?.id, storyId])

  useEffect(() => {
    void load()
  }, [load])

  if (!story) {
    return <StoryStatus kind="not-found" label="Rapor" storyId={storyId} />
  }

  if (error) {
    return <StoryStatus kind="error" message={error} onRetry={() => void load()} />
  }

  if (result === undefined) {
    return <StoryStatus kind="loading" text="Memuat rapor…" />
  }

  if (result === null) {
    return (
      <Stage>
        <div className="absolute inset-0" style={{ background: BG }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <GlassPanel style={{ width: 1080, padding: '64px 72px', textAlign: 'center' }}>
            <h1 style={{ fontSize: 72, color: '#fff' }}>Belum ada nilai</h1>
            <p
              style={{
                fontSize: 'var(--story-font-size)',
                color: 'rgba(255,255,255,0.7)',
                marginTop: 24,
                lineHeight: 1.5,
              }}
            >
              Kamu belum menyelesaikan cerita “{story.title}”. Selesaikan dulu untuk
              melihat rapor.
            </p>
            <div className="flex justify-center" style={{ gap: 32, marginTop: 48 }}>
              <Button onClick={() => navigate(`/cerita/${storyId}`)}>Mainkan cerita</Button>
              <Button variant="secondary" onClick={() => navigate('/')}>
                Kembali ke menu
              </Button>
            </div>
          </GlassPanel>
        </div>
      </Stage>
    )
  }

  // "Ulangi skenario": start a new attempt (old results stay untouched), then
  // go to the story with the "fresh" flag so the gate is skipped.
  const handleReplay = async () => {
    const uid = user?.id
    if (!uid || !storyId) return
    setReplayBusy(true)
    try {
      await startNewAttempt(uid, storyId, story)
      navigate(`/cerita/${storyId}`, { state: { fresh: true } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memulai percobaan baru')
      setReplayBusy(false)
    }
  }

  return (
    <Stage>
      <div className="absolute inset-0" style={{ background: BG }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <ReportCard
          result={result}
          name={displayName ?? '—'}
          onReplay={() => void handleReplay()}
          onMenu={() => navigate('/')}
          busy={replayBusy}
        />
      </div>
    </Stage>
  )
}
