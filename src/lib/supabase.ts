import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config'

/**
 * True when the real Supabase values have been pasted into src/lib/config.ts
 * (i.e. they are no longer the ISI_... placeholders).
 */
export const isSupabaseConfigured =
  !SUPABASE_URL.startsWith('ISI_') && !SUPABASE_ANON_KEY.startsWith('ISI_')

/**
 * The browser client. `null` while the config still has placeholders, so the
 * app can show a friendly screen instead of crashing.
 * Only the anon/publishable key is ever used in client code.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

/** Maps a Supabase auth error to a short Indonesian message. */
export function mapAuthError(error: { message?: string }): string {
  const m = (error.message ?? '').toLowerCase()
  if (m.includes('already registered')) return 'Email sudah terdaftar'
  if (
    m.includes('invalid login credentials') ||
    m.includes('wrong email or password')
  ) {
    return 'Email atau kata sandi salah'
  }
  if (m.includes('email not confirmed')) return 'Email belum dikonfirmasi'
  if (m.includes('rate limit') || m.includes('too many requests')) {
    return 'Terlalu banyak percobaan. Coba lagi nanti.'
  }
  return error.message || 'Terjadi kesalahan. Silakan coba lagi.'
}
