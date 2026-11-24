import { useEffect, useRef } from 'react'

interface ProgressSaverProps {
  started: boolean
  currentId: string
  /** Full history to persist (resume prefix + in-session history). */
  history: string[]
  /** Bump to force an immediate save (the retry button). */
  retrySignal: number
  onSave?: (pos: { currentId: string; history: string[] }) => void | Promise<void>
}

/**
 * Persists the current position: debounced 500ms after each node change,
 * immediately when `retrySignal` changes, and best-effort on unmount
 * (e.g. "Simpan dan keluar"). Renders nothing.
 */
export default function ProgressSaver({
  started,
  currentId,
  history,
  retrySignal,
  onSave,
}: ProgressSaverProps) {
  const latest = useRef({ currentId, history })
  latest.current = { currentId, history }
  const saveRef = useRef(onSave)
  saveRef.current = onSave
  const startedRef = useRef(started)
  startedRef.current = started

  const saveNow = () => {
    if (!startedRef.current || !saveRef.current) return
    void Promise.resolve(saveRef.current(latest.current))
  }

  // Debounced save on every node change.
  useEffect(() => {
    if (!started) return
    const t = setTimeout(saveNow, 500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, currentId])

  // Immediate save when the retry signal changes (skips the initial render).
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    saveNow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retrySignal])

  // Best-effort final save on unmount.
  useEffect(() => {
    return () => saveNow()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
