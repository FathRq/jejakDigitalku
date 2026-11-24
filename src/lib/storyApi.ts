import { supabase } from './supabase'
import type { Story } from '../engine/types'

/**
 * Data access for story persistence.
 *
 * The Supabase schema is managed outside this app (no migrations here).
 * The column names used below are the single place to adjust if the live
 * schema differs from what is assumed:
 *
 *   story_progress: user_id, story_id, current_node_id, history (array),
 *                   attempt, completed, updated_at
 *   choice_log:     user_id, story_id, attempt, node_id, first_choice,
 *                   final_choice  (unique per user/story/attempt/node)
 *   story_results:  user_id, story_id, privasi, reputasi, keamanan,
 *                   category, completed_at (or created_at)
 */

export interface ProgressRow {
  user_id: string
  story_id: string
  current_node_id: string
  history: string[]
  attempt: number
  completed: boolean
  updated_at?: string
}

export interface ChoiceLogPayload {
  user_id: string
  story_id: string
  attempt: number
  node_id: string
  first_choice: string
  final_choice: string
}

/** One finished run, as written by the `finish_story` RPC. */
export interface ResultRow {
  user_id: string
  story_id: string
  attempt?: number
  privasi?: number
  reputasi?: number
  keamanan?: number
  category?: string
  completed_at?: string
  created_at?: string
}

function requireClient() {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi')
  return supabase
}

/** Read the saved progress for a user/story. `null` when there is none. */
export async function getProgress(
  userId: string,
  storyId: string,
): Promise<ProgressRow | null> {
  const { data, error } = await requireClient()
    .from('story_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .maybeSingle()
  if (error) throw error
  return (data as ProgressRow | null) ?? null
}

/**
 * Save (upsert) the current position. One row per user/story; the upsert
 * conflicts on (user_id, story_id).
 */
export async function saveProgress(
  userId: string,
  storyId: string,
  row: {
    current_node_id: string
    history: string[]
    attempt: number
    completed?: boolean
  },
): Promise<void> {
  const { error } = await requireClient().from('story_progress').upsert(
    {
      user_id: userId,
      story_id: storyId,
      current_node_id: row.current_node_id,
      history: row.history,
      attempt: row.attempt,
      ...(row.completed !== undefined ? { completed: row.completed } : {}),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,story_id' },
  )
  if (error) throw error
}

/**
 * Start a new attempt: increment `attempt`, reset the position and
 * `completed`. Old `choice_log` and `story_results` rows are left untouched.
 * Returns the new attempt number.
 */
export async function startNewAttempt(
  userId: string,
  storyId: string,
  story: Story,
): Promise<number> {
  const existing = await getProgress(userId, storyId)
  const attempt = (existing?.attempt ?? 0) + 1
  await saveProgress(userId, storyId, {
    current_node_id: story.startId,
    history: [story.startId],
    attempt,
    completed: false,
  })
  return attempt
}

/** Record a confirmed choice. Idempotent per user/story/attempt/node. */
export async function logChoice(payload: ChoiceLogPayload): Promise<void> {
  const { error } = await requireClient().from('choice_log').upsert(payload, {
    onConflict: 'user_id,story_id,attempt,node_id',
  })
  if (error) throw error
}

/**
 * The most recent finished result for a user/story (as written by the
 * `finish_story` RPC). `null` when the story has never been finished.
 * The latest row is picked client-side, so this works whether the table
 * keeps `completed_at` or only `created_at`.
 */
export async function getLatestResult(
  userId: string,
  storyId: string,
): Promise<ResultRow | null> {
  const { data, error } = await requireClient()
    .from('story_results')
    .select('*')
    .eq('user_id', userId)
    .eq('story_id', storyId)
  if (error) throw error
  const rows = (data ?? []) as ResultRow[]
  if (rows.length === 0) return null
  const time = (r: ResultRow) => new Date(r.completed_at ?? r.created_at ?? 0).getTime()
  return rows.sort((a, b) => time(a) - time(b))[rows.length - 1]
}

/**
 * Finish the story: the `finish_story` RPC computes the scores server-side
 * (from `choice_log` + `scoring_rules`) and writes `story_results`.
 * The client never computes or writes scores itself.
 */
export async function callFinishStory(storyId: string): Promise<unknown> {
  const { data, error } = await requireClient().rpc('finish_story', {
    p_story_id: storyId,
  })
  if (error) throw error
  return data
}
