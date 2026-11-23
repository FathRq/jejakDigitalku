import { useMemo } from "react";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { ScoreBar } from "../components/ui/ScoreBar";
import { useSession } from "../context/SessionContext";
import { SCENARIOS } from "../data/scenarios";
import { INDICATORS, averageScore, getBadge, getStrengths } from "../lib/scoring";
import { cn } from "../lib/utils";

function IndicatorRow({ indicator, value }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-bold">
        <span className="text-ink-soft">{indicator.label}</span>
        <span className="tabular-nums" style={{ color: indicator.color }}>
          {value}/100
        </span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full"
        style={{ background: indicator.track }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-700"
          style={{ width: `${value}%`, background: indicator.color }}
        />
      </div>
      <p className="mt-1 text-[10px] font-medium text-muted">{indicator.short}</p>
    </div>
  );
}

function DeltaPill({ value }) {
  if (!Number.isFinite(value)) return null;
  const tone =
    value > 0 ? "text-success bg-emerald-50" : value < 0 ? "text-danger bg-red-50" : "text-muted bg-canvas";
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-extrabold tabular-nums", tone)}>
      {value > 0 ? `+${value}` : value}
    </span>
  );
}

export function Report() {
  const { scores, results, preTest, postTest, profile, participantCode, go } = useSession();

  const badge = getBadge(scores);
  const average = averageScore(scores);
  const { strongest, weakest } = getStrengths(scores);

  const recap = useMemo(
    () =>
      SCENARIOS.map((scenario) => {
        const result = results[scenario.id];
        const option = scenario.keputusan.pilihan.find(
          (item) => item.id === result?.choiceId,
        );
        return { scenario, result, option };
      }),
    [results],
  );

  const bestChoices = recap.filter(({ option }) => {
    if (!option) return false;
    const total = option.skor.privasi + option.skor.reputasi + option.skor.keamanan;
    return total >= 20;
  }).length;

  const testDelta =
    Number.isFinite(preTest.score) && Number.isFinite(postTest.score)
      ? Math.round((postTest.score - preTest.score) * 10) / 10
      : null;

  return (
    <PhoneFrame>
      <TopBar
        eyebrow="Rapor Digital"
        title="Hasil akhir kamu"
        code={participantCode}
        onBack={() => go("home")}
      />

      <main className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        <section className="animate-rise overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-card">
          <div className="relative bg-gradient-to-br from-brand-700 via-violet-600 to-fuchsia-500 px-5 pb-16 pt-6 text-white">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />
            <p className="relative text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/75">
              Skor jejak digital
            </p>
            <div className="relative mt-1 flex items-end gap-2">
              <span className="text-6xl font-extrabold leading-none tabular-nums">
                {average}
              </span>
              <span className="pb-1.5 text-sm font-semibold text-white/70">/100 rata-rata</span>
            </div>
            <p className="relative mt-2 max-w-[16rem] text-xs leading-relaxed text-white/80">
              Dihitung dari tiga indikator setelah kamu menyelesaikan semua skenario.
            </p>
          </div>

          <div className="relative -mt-11 px-4">
            <div className="rounded-2xl border border-white/80 bg-white p-4 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted">
                    Gelar kamu
                  </p>
                  <p className="mt-0.5 text-lg font-extrabold leading-tight text-ink">
                    {badge.emoji} {badge.title}
                  </p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl">
                  {badge.emoji}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted">{badge.description}</p>
            </div>
          </div>

          <div className="space-y-3.5 px-4 pb-4 pt-4">
            {INDICATORS.map((indicator) => (
              <IndicatorRow
                key={indicator.key}
                indicator={indicator}
                value={scores[indicator.key]}
              />
            ))}
          </div>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
              <Icon name="shield" size={12} /> Terkuat
            </p>
            <p className="mt-1 text-sm font-extrabold text-emerald-900">{strongest.label}</p>
            <p className="text-[11px] text-emerald-800/70">{scores[strongest.key]}/100</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
            <p className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
              <Icon name="alert" size={12} /> Perlu dijaga
            </p>
            <p className="mt-1 text-sm font-extrabold text-amber-900">{weakest.label}</p>
            <p className="text-[11px] text-amber-800/70">{scores[weakest.key]}/100</p>
          </div>
        </section>

        <section className="mt-3 rounded-[1.5rem] border border-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-ink">Pilihan di tiap skenario</h2>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-extrabold text-brand-700">
              {bestChoices}/{SCENARIOS.length} keputusan aman
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {recap.map(({ scenario, result, option }) => (
              <div key={scenario.id} className="rounded-2xl bg-canvas p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
                    Skenario {scenario.nomor} · {scenario.tema}
                  </p>
                  {result ? (
                    <DeltaPill
                      value={
                        result.after.privasi -
                        result.before.privasi +
                        (result.after.reputasi - result.before.reputasi) +
                        (result.after.keamanan - result.before.keamanan)
                      }
                    />
                  ) : null}
                </div>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-ink-soft">
                  {option?.teks ?? "Belum diselesaikan"}
                </p>
                {option ? (
                  <p className="mt-1 text-[10px] font-medium leading-relaxed text-muted">
                    {option.konsekuensi.judul}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-[1.5rem] border border-line bg-white p-4">
          <h2 className="text-sm font-extrabold text-ink">Perkembangan pemahaman</h2>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="rounded-2xl bg-canvas p-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Pre-Test</p>
              <p className="mt-1 text-2xl font-extrabold text-ink-soft">
                {preTest.score ?? "—"}
              </p>
            </div>
            <div className="grid place-items-center text-brand-600">
              <Icon name="arrowRight" size={20} />
              {testDelta != null ? <DeltaPill value={testDelta} /> : null}
            </div>
            <div className="rounded-2xl bg-brand-50 p-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                Post-Test
              </p>
              <p className="mt-1 text-2xl font-extrabold text-brand-700">
                {postTest.score ?? "—"}
              </p>
            </div>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-muted">
            {postTest.score == null
              ? "Kerjakan post-test untuk melihat peningkatan pemahamanmu setelah tiga skenario."
              : testDelta > 0
                ? `Pemahamanmu meningkat ${testDelta} poin. Pertahankan kebiasaan memeriksa sebelum bertindak.`
                : testDelta === 0
                  ? "Skormu stabil. Pelajari kembali tips di setiap skenario untuk hasil yang lebih baik."
                  : "Skor post-test sedikit menurun. Tidak apa-apa—baca ulang tips dan coba lagi."}
          </p>
        </section>

        <section className="mt-3 rounded-[1.5rem] border border-brand-200 bg-brand-50 p-4">
          <p className="flex items-center gap-1.5 text-xs font-extrabold text-brand-800">
            <Icon name="sparkles" size={15} /> Rekomendasi untukmu
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-brand-900/80">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              Perkuat indikator {weakest.label.toLowerCase()} lewat kebiasaan kecil setiap hari.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              {profile?.isPublic
                ? "Pertimbangkan mengubah akun menjadi privat agar data pribadi lebih terlindungi."
                : "Pertahankan akun privat dan tinjau pengikut secara berkala."}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              Sebelum membagikan apa pun, cek sumber, tanggal, dan apakah ada data pribadi di dalamnya.
            </li>
          </ul>
        </section>

        <div className="mt-4 rounded-2xl border border-line bg-white p-3">
          <ScoreBar scores={scores} compact />
          <p className="mt-2 text-center text-[10px] font-medium text-muted">
            Skor dihitung otomatis dari pilihanmu dan dibatasi 0–100.
          </p>
        </div>
      </main>

      <footer className="shrink-0 border-t border-line bg-white px-4 py-3 safe-bottom">
        <Button full size="lg" onClick={() => go("posttest")}>
          Lanjut ke Post-Test
          <Icon name="arrowRight" size={18} />
        </Button>
      </footer>
    </PhoneFrame>
  );
}
