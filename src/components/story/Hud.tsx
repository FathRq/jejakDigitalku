import Pill from '../ui/Pill'

interface HudProps {
  storyTitle: string
  /** Optional label prefix, e.g. "Skenario 1" (shown as "Skenario 1 - Penipuan"). */
  subtitle?: string
  /** The current scene number ("Adegan n"). */
  step: number
  totalSteps: number
  /** Save the position immediately, then return to the menu. */
  onSaveAndExit: () => void
}

/** Top HUD: thin progress bar, status pill, and "Simpan dan keluar". */
export default function Hud({
  storyTitle,
  subtitle,
  step,
  totalSteps,
  onSaveAndExit,
}: HudProps) {
  const progress = totalSteps > 0 ? Math.min(1, step / totalSteps) : 0
  const label = subtitle ? `${subtitle} - ${storyTitle}` : storyTitle

  return (
    <div className="absolute left-0 right-0" style={{ top: 0, zIndex: 10 }}>
      <div
        className="absolute left-0 right-0"
        style={{ top: 0, height: 10, background: 'rgba(255,255,255,0.15)' }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            background: 'var(--color-accent)',
            transition: 'width 300ms ease',
          }}
        />
      </div>
      <div className="flex items-center justify-between" style={{ padding: '26px 44px 0' }}>
        <Pill>{`${label} | Adegan ${step} dari ${totalSteps}`}</Pill>
        <button className="pill" style={{ cursor: 'pointer' }} onClick={onSaveAndExit}>
          Simpan dan keluar
        </button>
      </div>
    </div>
  )
}
