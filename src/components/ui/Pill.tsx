import type { CSSProperties, ReactNode } from 'react'

type Tone = 'default' | 'accent' | 'positive' | 'negative'

const toneStyles: Record<Tone, CSSProperties> = {
  default: {},
  accent: { color: 'var(--color-accent)', borderColor: 'var(--color-accent)' },
  positive: { color: 'var(--color-positive)', borderColor: 'var(--color-positive)' },
  negative: { color: 'var(--color-negative)', borderColor: 'var(--color-negative)' },
}

interface PillProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  tone?: Tone
}

/** A small rounded label / badge. */
export default function Pill({
  children,
  className = '',
  style,
  tone = 'default',
}: PillProps) {
  return (
    <span className={`pill ${className}`} style={{ ...toneStyles[tone], ...style }}>
      {children}
    </span>
  )
}
