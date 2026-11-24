import { SUPABASE_URL } from './config'

/**
 * Builds a public Supabase Storage URL for a story asset.
 * The bucket is `stories`; `path` is the node's `image` value,
 * e.g. `s1-penipuan/001.jpg`.
 *
 * No Supabase client is created here — this only composes the URL.
 */
export function assetUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/stories/${path}`
}

/** Returns just the file name from an asset path (e.g. `001.jpg`). */
export function assetFileName(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 1] ?? path
}
