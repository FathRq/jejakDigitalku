import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, mapAuthError, supabase } from '../lib/supabase'

interface AuthContextValue {
  session: Session | null
  user: User | null
  displayName: string | null
  loading: boolean
  /** Returns an Indonesian error message, or null on success. */
  signUp: (name: string, email: string, password: string) => Promise<string | null>
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

/** Reads the user's display name from the `profiles` table. */
async function fetchDisplayName(user: User): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .maybeSingle()
  return (
    data?.display_name ??
    (user.user_metadata?.display_name as string | undefined) ??
    null
  )
}

/**
 * Holds the Supabase session for the whole app. The session is restored from
 * local storage on load (refreshing keeps you signed in) and kept in sync via
 * `onAuthStateChange`. After signUp the user is signed in immediately —
 * email confirmation is off.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const applySession = useCallback(async (s: Session | null) => {
    setSession(s)
    setUser(s?.user ?? null)
    setDisplayName(s?.user ? await fetchDisplayName(s.user) : null)
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      void applySession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      void applySession(s)
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [applySession])

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      if (!supabase) return 'Konfigurasi Supabase belum diisi'
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: name } },
      })
      if (error) return mapAuthError(error)
      if (!data.session) {
        // The project requires email confirmation: the account was created but
        // the user is not signed in yet.
        return 'Email perlu dikonfirmasi. Cek kotak masukmu, lalu masuk.'
      }
      void applySession(data.session)
      return null
    },
    [applySession],
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) return 'Konfigurasi Supabase belum diisi'
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) return mapAuthError(error)
      void applySession(data.session)
      return null
    },
    [applySession],
  )

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  const value = useMemo(
    () => ({ session, user, displayName, loading, signUp, signIn, signOut }),
    [session, user, displayName, loading, signUp, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Access the current auth state. Must be used inside <AuthProvider>. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}

export { isSupabaseConfigured }
