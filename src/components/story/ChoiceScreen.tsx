import Button from '../ui/Button'
import SceneImage from './SceneImage'
import type { ChoiceNode } from '../../engine/types'

const LETTERS = ['A', 'B', 'C']

interface ChoiceScreenProps {
  node: ChoiceNode
  selectedOptionId: string | null
  onSelect: (optionId: string) => void
  onConfirm: () => void
}

/**
 * Choice screen (UI-04): the background image already contains the
 * narration dialog box (baked into the artwork at the bottom-left), so no
 * DOM narration is rendered — the same pattern as the scene screens. Only
 * the option cards and the confirm button are drawn on top. No
 * risk/"safer" hints are shown before the user confirms.
 */
export default function ChoiceScreen({
  node,
  selectedOptionId,
  onSelect,
  onConfirm,
}: ChoiceScreenProps) {
  return (
    <div className="screen-fade absolute inset-0">
      <SceneImage
        path={node.image}
        alt=""
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Option cards + confirm. The column is placed above the baked-in
          narration box (y 836-1026 in the artwork) so the card text never
          collides with it. */}
      <div
        className="absolute flex items-end justify-between"
        style={{ left: 160, right: 160, top: 290 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 1120 }}>
          {node.options.map((opt, i) => {
            const selected = opt.id === selectedOptionId
            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                className="glass-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 28,
                  padding: '26px 40px',
                  cursor: 'pointer',
                  border: selected
                    ? '3px solid var(--color-accent)'
                    : '2px solid var(--narration-border)',
                  background: selected ? 'rgba(0,0,0,0.55)' : 'var(--narration-bg)',
                }}
              >
                <span
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                    color: selected ? 'var(--color-accent)' : '#fff',
                    background: 'rgba(255,255,255,0.12)',
                    flexShrink: 0,
                  }}
                >
                  {LETTERS[i]}
                </span>
                <span
                  style={{
                    fontSize: 'var(--story-font-size)',
                    color: '#fff',
                    textAlign: 'left',
                    lineHeight: 1.4,
                  }}
                >
                  {opt.text}
                </span>
              </button>
            )
          })}
        </div>

        <Button variant="primary" onClick={onConfirm} disabled={!selectedOptionId}>
          Konfirmasi pilihan
        </Button>
      </div>
    </div>
  )
}
