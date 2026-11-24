import { useEffect, useState, type ReactNode } from 'react'

/** Fixed design canvas. Everything inside is laid out in 1920x1080 pixels. */
export const STAGE_WIDTH = 1920
export const STAGE_HEIGHT = 1080

function computeScale(): number {
  const vw = window.innerWidth
  const vh = window.innerHeight
  // "contain": fit the whole canvas inside the viewport, uniform scale.
  return Math.min(vw / STAGE_WIDTH, vh / STAGE_HEIGHT)
}

interface StageProps {
  children: ReactNode
}

/**
 * Renders a 1920x1080 canvas, uniformly scaled to fit the viewport and
 * centered on a black letterbox. Children position themselves in
 * 1920x1080 pixel coordinates.
 */
export default function Stage({ children }: StageProps) {
  const [scale, setScale] = useState<number>(() => computeScale())

  useEffect(() => {
    const onResize = () => setScale(computeScale())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transformOrigin: 'center center',
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
