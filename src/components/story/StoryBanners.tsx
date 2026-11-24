interface StoryBannersProps {
  progressError: boolean
  choiceError: boolean
  onRetryProgress: () => void
  onRetryChoice: () => void
}

/** Non-blocking error banners for failed persistence (bottom-left). */
export default function StoryBanners({
  progressError,
  choiceError,
  onRetryProgress,
  onRetryChoice,
}: StoryBannersProps) {
  if (!progressError && !choiceError) return null
  return (
    <>
      {progressError && (
        <div
          className="pill absolute"
          style={{ left: 48, bottom: 48, color: 'var(--color-negative)' }}
        >
          Gagal menyimpan progres
          <button type="button" className="link" onClick={onRetryProgress}>
            Coba lagi
          </button>
        </div>
      )}
      {choiceError && (
        <div
          className="pill absolute"
          style={{
            left: 48,
            bottom: progressError ? 130 : 48,
            color: 'var(--color-negative)',
          }}
        >
          Gagal mencatat pilihan
          <button type="button" className="link" onClick={onRetryChoice}>
            Coba lagi
          </button>
        </div>
      )}
    </>
  )
}
