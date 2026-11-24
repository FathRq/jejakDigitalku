import GlassPanel from '../ui/GlassPanel'
import Button from '../ui/Button'
import type { ResultRow } from '../../lib/storyApi'

// Completion date-time, as specified: long date + short time, Asia/Jakarta.
const DATE_FMT = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Asia/Jakarta',
})

const SCORE_BARS = [
  { key: 'privasi', label: 'Privasi' },
  { key: 'reputasi', label: 'Reputasi' },
  { key: 'keamanan', label: 'Keamanan' },
] as const

interface ReportCardProps {
  result: ResultRow
  name: string
  onReplay: () => void
  onMenu: () => void
  busy?: boolean
}

/**
 * UI-06 — the "Rapor Digital" card. The scores come from the `finish_story`
 * RPC; they are only displayed here, never computed in the client.
 * "Skenario berikutnya" is intentionally hidden: only one scenario exists.
 */
export default function ReportCard({
  result,
  name,
  onReplay,
  onMenu,
  busy,
}: ReportCardProps) {
  const when = result.completed_at ?? result.created_at

  return (
    <GlassPanel style={{ width: 1440, padding: '56px 80px' }}>
      <h1 style={{ fontSize: 96, color: '#fff', textAlign: 'center' }}>Rapor Digital</h1>
      <p
        style={{
          fontSize: 44,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Nama: {name}
      </p>
      {when && (
        <p
          style={{
            fontSize: 34,
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          {DATE_FMT.format(new Date(when))}
        </p>
      )}
      {result.category && (
        <p
          style={{
            fontSize: 76,
            color: 'var(--color-accent)',
            textAlign: 'center',
            marginTop: 32,
          }}
        >
          {result.category}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 48 }}>
        {SCORE_BARS.map(({ key, label }) => {
          const value = result[key] ?? 0
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ width: 240, fontSize: 36, color: 'rgba(255,255,255,0.85)' }}>
                {label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 18,
                  background: 'rgba(255,255,255,0.12)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.max(0, Math.min(100, value))}%`,
                    height: '100%',
                    background: 'var(--color-accent)',
                  }}
                />
              </div>
              <span style={{ width: 150, textAlign: 'right', fontSize: 36, color: '#fff' }}>
                {value} / 100
              </span>
            </div>
          )
        })}
      </div>

      <p
        style={{
          fontSize: 32,
          color: 'rgba(255,255,255,0.7)',
          marginTop: 48,
          lineHeight: 1.5,
          textAlign: 'center',
        }}
      >
        Tips: cek akun resmi sebelum mengeklik tautan apa pun, dan jangan berikan data
        pribadi ke pihak yang belum jelas.
      </p>
      <p
        style={{
          fontSize: 28,
          color: 'rgba(255,255,255,0.5)',
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        Tunjukkan layar ini ke gurumu sebagai bukti nilai.
      </p>

      <div className="flex justify-center" style={{ gap: 32, marginTop: 48 }}>
        <Button onClick={onReplay} disabled={busy}>
          {busy ? 'Menyiapkan…' : 'Ulangi skenario'}
        </Button>
        <Button variant="secondary" onClick={onMenu}>
          Kembali ke menu
        </Button>
      </div>
    </GlassPanel>
  )
}
