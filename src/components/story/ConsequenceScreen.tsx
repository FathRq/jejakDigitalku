import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import Pill from '../ui/Pill'
import SceneImage from './SceneImage'
import { SCORE_LABEL, SCORE_ORDER, type ChoiceOption, type ConsequenceNode } from '../../engine/types'

/** Background tint per chosen option: A red, B amber, C green. */
const TINTS: Record<string, string> = {
  A: 'rgba(255, 153, 140, 0.18)',
  B: 'rgba(253, 199, 107, 0.18)',
  C: 'rgba(158, 242, 179, 0.18)',
}

interface ConsequenceScreenProps {
  node: ConsequenceNode
  chosenOption: ChoiceOption
  chosenLetter: string
  onAdvance: () => void
}

/**
 * Consequence screen (UI-05A/B/C): glass card with the chosen-option chip,
 * headline, body, three score chips, and a Lanjut button that stays disabled
 * for 2000ms after the screen appears.
 */
export default function ConsequenceScreen({
  node,
  chosenOption,
  chosenLetter,
  onAdvance,
}: ConsequenceScreenProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEnabled(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const scores = chosenOption.scores
  const tint = TINTS[chosenLetter] ?? 'transparent'

  return (
    <div className="screen-fade absolute inset-0">
      <SceneImage
        path={node.image}
        alt=""
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* Color tint overlay */}
      <div className="absolute inset-0" style={{ background: tint }} />

      {/* Cover for the baked-in narration box in the background image
          (025.jpg contains the choice narration at the bottom-left; it is
          stale on a consequence screen, so it is masked with a matching
          dark panel). Fully opaque: even 3% bleed-through of the old text
          is visible in the pixels, so no transparency. */}
      <div
        className="absolute"
        style={{
          left: 90,
          top: 806,
          width: 1680,
          height: 250,
          borderRadius: 'var(--narration-radius)',
          background: 'rgb(8, 8, 16)',
          border: '2px solid rgba(255, 255, 255, 0.12)',
        }}
      />

      {/* Glass card */}
      <div
        className="glass-panel absolute"
        style={{ left: 160, top: 150, width: 1600, padding: '56px 64px' }}
      >
        <div
          className="flex items-center justify-between"
          style={{ flexWrap: 'wrap', gap: 20 }}
        >
          <Pill tone="accent">Pilihanmu: {chosenLetter}</Pill>
          <div className="flex" style={{ gap: 20 }}>
            {SCORE_ORDER.map((key) => {
              const delta = scores[key] ?? 0
              const color =
                delta > 0
                  ? 'var(--color-positive)'
                  : delta < 0
                    ? 'var(--color-negative)'
                    : '#fff'
              const label = delta > 0 ? `+${delta}` : delta < 0 ? `−${Math.abs(delta)}` : '0'
              return (
                <Pill key={key}>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>{SCORE_LABEL[key]}</span>
                  <span style={{ color, fontWeight: 700 }}>{label}</span>
                </Pill>
              )
            })}
          </div>
        </div>

        <h2 style={{ fontSize: 64, color: '#fff', marginTop: 40 }}>{node.headline}</h2>
        <p
          style={{
            fontSize: 'var(--story-font-size)',
            color: 'rgba(255,255,255,0.85)',
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          {node.body}
        </p>

        <div className="flex justify-end" style={{ marginTop: 48 }}>
          <Button variant="primary" onClick={onAdvance} disabled={!enabled}>
            Lanjut
          </Button>
        </div>
      </div>
    </div>
  )
}
