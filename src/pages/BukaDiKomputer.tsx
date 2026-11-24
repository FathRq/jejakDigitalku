/** UI-07 — Shown instead of the app when the viewport is narrower than 1024px. */
export default function BukaDiKomputer() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: '#050507',
        color: '#fff',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 40 }}>Buka di Komputer</h1>
      <p
        style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.7)',
          marginTop: 16,
          maxWidth: 440,
          lineHeight: 1.5,
        }}
      >
        Jejak Digitalku hanya bisa dimainkan di komputer. Silakan buka situs ini di
        perangkat dengan layar lebih besar.
      </p>
    </div>
  )
}
