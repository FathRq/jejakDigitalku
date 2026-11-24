import Button from '../ui/Button'
import SceneImage from './SceneImage'
import type { SceneNode } from '../../engine/types'

interface SceneScreenProps {
  node: SceneNode
  onAdvance: () => void
  onBack: () => void
  canBack: boolean
}

/**
 * A scene shows ONLY the full-bleed image (all narration/dialog is baked into
 * the artwork) plus the HUD and the right-aligned controls.
 */
export default function SceneScreen({ node, onAdvance, onBack, canBack }: SceneScreenProps) {
  return (
    <div className="screen-fade absolute inset-0">
      <SceneImage
        path={node.image}
        alt={node.alt}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        className="absolute flex items-center opacity-80 hover:opacity-100"
        style={{ top: node.controlsY, right: 48, gap: 24 }}
      >
        <Button variant="secondary" onClick={onBack} disabled={!canBack}>
          Kembali
        </Button>
        <Button variant="primary" onClick={onAdvance}>
          Lanjut
        </Button>
      </div>
    </div>
  )
}
