import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Stage from '../Stage'
import Button from '../ui/Button'
import { useStory } from '../../engine/useStory'
import { nextImagePaths, sceneNumber } from '../../engine/story'
import type { ChoicePayload, ResumePosition, Story } from '../../engine/types'
import { assetUrl } from '../../lib/assets'
import Hud from './Hud'
import SceneScreen from './SceneScreen'
import ChoiceScreen from './ChoiceScreen'
import ConsequenceScreen from './ConsequenceScreen'
import EndScreen, { type FinishStatus } from './EndScreen'
import ProgressSaver from './ProgressSaver'

interface StoryPlayerProps {
  story: Story
  /** Resume from a saved position (node + history stack) instead of the start. */
  initial?: ResumePosition
  /** Called when a choice is confirmed (before the transition). */
  onChoiceConfirmed?: (payload: ChoicePayload) => void
  /** Called once when the end node is reached. */
  onFinished?: () => void
  /** Persist the position (debounced by ProgressSaver). */
  onSavePosition?: (pos: { currentId: string; history: string[] }) => void | Promise<void>
  /** Bump to force an immediate save (the "Coba lagi" banner). */
  saveRetrySignal?: number
  /** Status of the finish-story RPC, shown on the end screen. */
  finishStatus?: FinishStatus
  /** Retry the finish-story RPC. */
  onRetryFinish?: () => void
  /** Extra overlay rendered above the screens (error banners). */
  overlay?: ReactNode
}

export default function StoryPlayer({
  story,
  initial,
  onChoiceConfirmed,
  onFinished,
  onSavePosition,
  saveRetrySignal = 0,
  finishStatus = 'idle',
  onRetryFinish,
  overlay,
}: StoryPlayerProps) {
  const [started, setStarted] = useState(false)

  const handleChoiceConfirmed = useCallback(
    (payload: ChoicePayload) => {
      console.info('[onChoiceConfirmed]', payload)
      onChoiceConfirmed?.(payload)
    },
    [onChoiceConfirmed],
  )

  const handleFinished = useCallback(() => {
    console.info('[onFinished]', story.id)
    onFinished?.()
  }, [story.id, onFinished])

  const {
    state,
    node,
    selectedOptionId,
    chosenLetter,
    selectOption,
    confirmChoice,
    advance,
    back,
  } = useStory(story, {
    onChoiceConfirmed: handleChoiceConfirmed,
    onFinished: handleFinished,
    initial,
  })

  // Exit fullscreen when leaving the route.
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    }
  }, [])

  // Preload the next 2 images along the current route.
  useEffect(() => {
    nextImagePaths(story, state.currentId, 2).forEach((p) => {
      const img = new Image()
      img.src = assetUrl(p)
    })
  }, [story, state.currentId])

  // Keyboard: Space/Enter/ArrowRight = Lanjut, ArrowLeft = Kembali (scenes only).
  // Skipped while a button/link/input is focused, so native activation is not
  // double-fired (e.g. Enter on the "Kembali" button).
  useEffect(() => {
    if (!started || node.type !== 'scene') return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.isContentEditable)
      )
        return
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault()
        advance()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        back()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started, node.type, advance, back])

  // "Simpan dan keluar": fire the position save immediately, then go to the
  // menu. (ProgressSaver also saves on unmount; the upsert is idempotent.)
  const navigate = useNavigate()
  const saveAndExit = useCallback(() => {
    if (started && onSavePosition) {
      void onSavePosition({ currentId: state.currentId, history: state.history })
    }
    navigate('/')
  }, [started, onSavePosition, state.currentId, state.history, navigate])

  // The start button is the only thing allowed to request fullscreen.
  const start = useCallback(() => {
    const el = document.documentElement
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {})
    setStarted(true)
  }, [])

  // "Adegan n": the frame number of the current node (the end node counts
  // as the final step).
  const step = sceneNumber(story, node)
  const canBack = state.history.length > 1

  return (
    <Stage>
      <Hud
        storyTitle={story.title}
        subtitle={story.subtitle}
        step={step}
        totalSteps={story.totalSteps}
        onSaveAndExit={saveAndExit}
      />

      {node.type === 'scene' && (
        <SceneScreen key={node.id} node={node} onAdvance={advance} onBack={back} canBack={canBack} />
      )}
      {node.type === 'choice' && (
        <ChoiceScreen
          key={node.id}
          node={node}
          selectedOptionId={selectedOptionId}
          onSelect={selectOption}
          onConfirm={confirmChoice}
        />
      )}
      {node.type === 'consequence' && state.chosenOption && (
        <ConsequenceScreen
          key={node.id}
          node={node}
          chosenOption={state.chosenOption}
          chosenLetter={chosenLetter ?? ''}
          onAdvance={advance}
        />
      )}
      {node.type === 'end' && (
        <EndScreen
          key={node.id}
          node={node}
          storyId={story.id}
          storyTitle={story.title}
          finishStatus={finishStatus}
          onRetryFinish={onRetryFinish}
        />
      )}

      {overlay}

      {/* Start overlay */}
      {!started && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.72)' }}
        >
          <h1 style={{ fontSize: 96, color: '#fff' }}>
            {story.subtitle ? `${story.subtitle} - ${story.title}` : story.title}
          </h1>
          <p style={{ fontSize: 40, color: 'rgba(255,255,255,0.7)', marginTop: 24 }}>
            Klik untuk memulai
          </p>
          <div style={{ marginTop: 56 }}>
            <Button variant="primary" onClick={start}>
              Mulai
            </Button>
          </div>
        </div>
      )}

      <ProgressSaver
        started={started}
        currentId={state.currentId}
        history={state.history}
        retrySignal={saveRetrySignal}
        onSave={onSavePosition}
      />
    </Stage>
  )
}
