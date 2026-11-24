-- ============================================================================
-- Jejak Digitalku — izin database Supabase
-- Jalankan blok ini di Supabase Dashboard > SQL Editor (sebagai postgres).
--
-- Latar: aplikasi mengembalikan 403 "permission denied" karena role
-- `authenticated` belum diberi GRANT pada tabel-tabel aplikasi, dan RLS
-- belum diaktifkan (dibutuhkan agar user A tidak bisa membaca data user B).
-- ============================================================================

-- 1. Hak akses tabel untuk user yang sudah login (role `authenticated`)
GRANT SELECT ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.story_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.choice_log TO authenticated;
GRANT SELECT ON public.story_results TO authenticated;

-- 2. RPC finish_story: bisa dipanggil user, dan berjalan sebagai pemilik
--    tabel (SECURITY DEFINER) supaya boleh menulis story_results melewati RLS.
GRANT EXECUTE ON FUNCTION public.finish_story TO authenticated;
ALTER FUNCTION public.finish_story SECURITY DEFINER;

-- 3. Row Level Security: tiap user hanya melihat/menulis barisnya sendiri
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.choice_log     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_results  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_own" ON public.profiles;
CREATE POLICY "profiles_own" ON public.profiles
  FOR ALL USING (id = auth.uid()) WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "progress_own" ON public.story_progress;
CREATE POLICY "progress_own" ON public.story_progress
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "choicelog_own" ON public.choice_log;
CREATE POLICY "choicelog_own" ON public.choice_log
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "results_own_select" ON public.story_results;
CREATE POLICY "results_own_select" ON public.story_results
  FOR SELECT USING (user_id = auth.uid());

-- ----------------------------------------------------------------------------
-- Opsional — hanya jika constraint-nya belum ada (diperlukan oleh upsert app):
--   story_progress  : satu baris per user+cerita
--   choice_log      : satu baris per user+cerita+attempt+node
-- ----------------------------------------------------------------------------
-- ALTER TABLE public.story_progress
--   DROP CONSTRAINT IF EXISTS story_progress_user_story_key;
-- ALTER TABLE public.story_progress
--   ADD CONSTRAINT story_progress_user_story_key UNIQUE (user_id, story_id);
--
-- ALTER TABLE public.choice_log
--   DROP CONSTRAINT IF EXISTS choice_log_user_story_attempt_node_key;
-- ALTER TABLE public.choice_log
--   ADD CONSTRAINT choice_log_user_story_attempt_node_key
--   UNIQUE (user_id, story_id, attempt, node_id);
