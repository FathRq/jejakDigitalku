import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Stage from '../components/Stage'
import StoryPlayer from '../components/story/StoryPlayer'
import StoryGate from '../components/story/StoryGate'
import StoryStatus from '../components/story/StoryStatus'
import StoryBanners from '../components/story/StoryBanners'
import { sceneNumber } from '../engine/story'
import { useAuth } from '../auth/AuthProvider'
import { STORIES } from '../stories'
import {
  callFinishStory,
  getProgress,
  logChoice,
  saveProgress,
  startNewAttempt,
  type ProgressRow,
} from '../lib/storyApi'
import type { ChoicePayload, ResumePosition } from '../engine/types'

const BG =
  'radial-gradient(1500px 950px at 50% 26%, #1b1b2e 0%, #0c0c14 60%, #050507 100%)'

type Phase =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'gate'; mode: 'resume' | 'replay'; row: ProgressRow }
  | { kind: 'playing'; initial: ResumePosition | null }

/**
 * `/cerita/:storyId` — the story wired to Supabase:
 * - loads the saved progress (resume gate if in progress, replay gate if finished)
 * - saves the position on every node change (500 ms debounce, via ProgressSaver)
 * - logs each confirmed choice into `choice_log`
 * - calls the `finish_story` RPC when the end node is reached, then opens the report
 */
export default function Cerita() {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const story = storyId ? STORIES[storyId] : undefined

  const [phase, setPhase] = useState<Phase>({ kind: 'loading' })
  const [attempt, setAttempt] = useState(1)
  const [loadTick, setLoadTick] = useState(0)
  const [gateBusy, setGateBusy] = useState(false)
  const [gateError, setGateError] = useState<string | null>(null)
  const [progressError, setProgressError] = useState(false)
  const [choiceError, setChoiceError] = useState(false)
  const [progressRetry, setProgressRetry] = useState(0)
  const [finishStatus, setFinishStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  // Stable refs so callbacks never go stale. The user object's identity
  // changes on every token refresh; only its id matters here.
  const userIdRef = useRef(user?.id ?? null)
  userIdRef.current = user?.id ?? null
  const attemptRef = useRef(1)
  attemptRef.current = attempt
  // Guards the finish flow: the RPC runs at most once per attempt.
  const finishedAttemptRef = useRef<number | null>(null)

  // Set when the report's "Ulangi skenario" navigates here: the new attempt
  // was already started, so skip the gate and play from the start.
  const fresh = Boolean((location.state as { fresh?: boolean } | null)?.fresh)

  // Load the saved progress when entering the story.
  useEffect(() => {
    if (!story || !storyId) return
    const uid = userIdRef.current
    if (!uid) return
    let active = true
    setPhase({ kind: 'loading' })
    getProgress(uid, storyId)
      .then((row) => {
        if (!active) return
        if (row && row.completed) {
          setAttempt(row.attempt)
          setPhase({ kind: 'gate', mode: 'replay', row })
        } else if (
          row &&
          !row.completed &&
          // "fresh" only skips the gate while the new attempt is still at the
          // start node. If it already progressed (e.g. the user refreshed
          // mid-attempt), the normal resume gate applies.
          !(fresh && row.current_node_id === story.startId)
        ) {
          setAttempt(row.attempt)
          setPhase({ kind: 'gate', mode: 'resume', row })
        } else {
          setAttempt(row?.attempt ?? 1)
          setPhase({ kind: 'playing', initial: null })
        }
      })
      .catch((e: unknown) => {
        if (!active) return
        setPhase({
          kind: 'error',
          message: e instanceof Error ? e.message : 'Gagal memuat progres',
        })
      })
    return () => {
      active = false
    }
  }, [story, storyId, fresh, loadTick])

  // Resume: continue from the saved node with its history stack.
  const handleResume = useCallback(() => {
    setPhase((p) => {
      if (p.kind !== 'gate' || p.mode !== 'resume') return p
      return {
        kind: 'playing',
        initial: { currentId: p.row.current_node_id, history: p.row.history },
      }
    })
  }, [])

  // "Mulai dari awal" (resume gate) and "Ulangi skenario" (replay gate):
  // increment the attempt, reset the position, keep old choice_log/results.
  const handleStartOver = useCallback(async () => {
    const uid = userIdRef.current
    if (!story || !storyId || !uid) return
    setGateBusy(true)
    setGateError(null)
    try {
      const next = await startNewAttempt(uid, storyId, story)
      setAttempt(next)
      setFinishStatus('idle')
      setPhase({ kind: 'playing', initial: null })
    } catch (e) {
      setGateError(e instanceof Error ? e.message : 'Gagal memulai dari awal')
    } finally {
      setGateBusy(false)
    }
  }, [story, storyId])

  const handleViewReport = useCallback(() => {
    if (storyId) navigate(`/rapor/${storyId}`)
  }, [storyId, navigate])

  // A confirmed choice is recorded in `choice_log` (idempotent per
  // user/story/attempt/node). Failures show a non-blocking banner; the
  // banner's "Coba lagi" resends the last payload.
  const lastChoiceRef = useRef<ChoicePayload | null>(null)

  const sendChoiceLog = useCallback(
    (payload: ChoicePayload) => {
      const uid = userIdRef.current
      if (!uid || !storyId) return
      void logChoice({
        user_id: uid,
        story_id: storyId,
        attempt: attemptRef.current,
        node_id: payload.nodeId,
        first_choice: payload.firstChoice,
        final_choice: payload.finalChoice,
      })
        .then(() => setChoiceError(false))
        .catch(() => setChoiceError(true))
    },
    [storyId],
  )

  const handleChoiceConfirmed = useCallback(
    (payload: ChoicePayload) => {
      lastChoiceRef.current = payload
      sendChoiceLog(payload)
    },
    [sendChoiceLog],
  )

  const retryChoice = useCallback(() => {
    if (lastChoiceRef.current) sendChoiceLog(lastChoiceRef.current)
  }, [sendChoiceLog])

  // The `finish_story` RPC computes the scores server-side and writes
  // `story_results`. The client never computes or writes scores.
  const runFinish = useCallback(() => {
    if (!storyId) return
    setFinishStatus('sending')
    void callFinishStory(storyId)
      .then(() => navigate(`/rapor/${storyId}`))
      .catch(() => setFinishStatus('error'))
  }, [storyId, navigate])

  const handleFinished = useCallback(() => {
    if (finishedAttemptRef.current === attemptRef.current) return
    finishedAttemptRef.current = attemptRef.current
    runFinish()
  }, [runFinish])

  // Position save (debounced by ProgressSaver). Reaching the end node marks
  // the run completed so the next visit offers "Ulangi" instead of "Lanjutkan".
  const handleSavePosition = useCallback(
    async (pos: { currentId: string; history: string[] }) => {
      const uid = userIdRef.current
      if (!uid || !storyId || !story) return
      const nodeType = story.nodes[pos.currentId]?.type
      try {
        await saveProgress(uid, storyId, {
          current_node_id: pos.currentId,
          history: pos.history,
          attempt: attemptRef.current,
          completed: nodeType === 'end',
        })
        setProgressError(false)
      } catch {
        setProgressError(true)
      }
    },
    [story, storyId],
  )

  if (!story) {
    return <StoryStatus kind="not-found" label="Cerita" storyId={storyId} />
  }

  if (phase.kind === 'loading') {
    return <StoryStatus kind="loading" text="Memuat progres…" />
  }

  if (phase.kind === 'error') {
    return (
      <StoryStatus
        kind="error"
        title="Gagal memuat progres"
        message={phase.message}
        onRetry={() => setLoadTick((n) => n + 1)}
      />
    )
  }

  if (phase.kind === 'gate') {
    const isResume = phase.mode === 'resume'
    const gateNode = story.nodes[phase.row.current_node_id]
    return (
      <Stage>
        <div className="absolute inset-0" style={{ background: BG }} />
        <StoryGate
          mode={phase.mode}
          scene={gateNode ? sceneNumber(story, gateNode) : 0}
          total={story.totalSteps}
          busy={gateBusy}
          error={gateError ?? undefined}
          onPrimary={isResume ? handleResume : handleStartOver}
          onSecondary={isResume ? handleStartOver : handleViewReport}
        />
      </Stage>
    )
  }

  // phase.kind === 'playing'
  return (
    <StoryPlayer
      key={attempt}
      story={story}
      initial={phase.initial ?? undefined}
      onChoiceConfirmed={handleChoiceConfirmed}
      onFinished={handleFinished}
      onSavePosition={handleSavePosition}
      saveRetrySignal={progressRetry}
      finishStatus={finishStatus}
      onRetryFinish={runFinish}
      overlay={
        <StoryBanners
          progressError={progressError}
          choiceError={choiceError}
          onRetryProgress={() => setProgressRetry((n) => n + 1)}
          onRetryChoice={retryChoice}
        />
      }
    />
  )
}
