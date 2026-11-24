import { useState, type CSSProperties } from 'react'
import { assetFileName, assetUrl } from '../../lib/assets'

interface SceneImageProps {
  path: string
  alt: string
  className?: string
  style?: CSSProperties
}

/**
 * Renders a story image. If it fails to load (e.g. the Supabase URL is still a
 * placeholder), it falls back to a dark gradient showing the file name so
 * development is not blocked.
 */
export default function SceneImage({ path, alt, className, style }: SceneImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: 'linear-gradient(135deg, #14141c 0%, #0a0a10 60%, #050507 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.45)',
          fontSize: 28,
        }}
      >
        {assetFileName(path)}
      </div>
    )
  }

  return (
    <img
      src={assetUrl(path)}
      alt={alt}
      className={className}
      style={style}
      loading="eager"
      decoding="sync"
      onError={() => setFailed(true)}
    />
  )
}
