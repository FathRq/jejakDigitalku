import type { CSSProperties, ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** A translucent, bordered, rounded panel (the "narration box" look). */
export default function GlassPanel({ children, className = '', style }: GlassPanelProps) {
  return (
    <div className={`glass-panel ${className}`} style={style}>
      {children}
    </div>
  )
}
