import { useEffect, useMemo, useRef, useState } from "react";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Modal } from "../components/ui/Modal";
import { ScoreBar } from "../components/ui/ScoreBar";
import { useSession } from "../context/SessionContext";
import { getScenario } from "../data/scenarios";
import { INDICATORS, diffScores } from "../lib/scoring";
import { cn } from "../lib/utils";

const LETTERS = ["A", "B", "C", "D"];

function DeltaChips({ before, after }) {
  const delta = diffScores(before, after);
  return (
    <div className="grid grid-cols-3 gap-2">
      {INDICATORS.map((indicator) => {
        const value = delta[indicator.key];
        return (
          <div
            key={indicator.key}
            className="rounded-2xl border border-line bg-white p-2.5 text-center"
          >
            <p className="text-[10px] font-bold text-muted">{indicator.label}</p>
            <p
              className={cn(
                "text-lg font-extrabold leading-tight tabular-nums",
                value > 0 ? "text-success" : value < 0 ? "text-danger" : "text-muted",
              )}
            >
              {value > 0 ? `+${value}` : value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function FrameViewer({ frame, onAdvance, hint = "Ketuk gambar atau tekan Lanjut" }) {
  if (!frame) return null;

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-card">
      <button
        type="button"
        onClick={onAdvance}
        className="relative block w-full overflow-hidden bg-ink"
        aria-label="Lanjut ke bagian berikutnya"
      >
        <img
          key={frame.src}
          src={frame.src}
          alt={frame.alt}
          className="aspect-video w-full animate-fade-in object-cover"
          loading="eager"
        />
        <span className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-ink/55 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur">
          <Icon name="play" size={10} />
          {hint}
        </span>
      </button>

      <div className="p-4">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-600">
          Narasi
        </p>
        <p
          className="mt-1.5 text-sm font-medium leading-relaxed text-ink-soft"
          aria-live="polite"
        >
          {frame.teks}
        </p>
      </div>
    </div>
  );
}

export function ScenarioScreen() {
  const {
    participantCode,
    profile,
    scores,
    scenarioRun,
    activeScenarioId,
    openScenario,
    saveRun,
    chooseOption,
    finishScenario,
    closeScenario,
  } = useSession();

  const scenario = getScenario(activeScenarioId ?? scenarioRun?.scenarioId);
  const [pendingChoice, setPendingChoice] = useState(null);
  const [exitOpen, setExitOpen] = useState(false);
  const mainRef = useRef(null);

  const phase = scenarioRun?.phase ?? "story";
  const index = scenarioRun?.index ?? 0;

  const choice = useMemo(() => {
    if (!scenario || !scenarioRun?.choiceId) return null;
    return scenario.keputusan.pilihan.find(
      (option) => option.id === scenarioRun.choiceId,
    );
  }, [scenario, scenarioRun]);

  const aftermathFrames = useMemo(() => {
    if (!scenario) return [];
    return [...(choice?.epilog ?? []), ...scenario.refleksi.frames];
  }, [scenario, choice]);

  const epilogCount = choice?.epilog?.length ?? 0;
  const reflectionCount = aftermathFrames.length - epilogCount;

  const storyFrames = useMemo(() => scenario?.frames ?? [], [scenario]);
  const totalBeats = storyFrames.length + 2 + aftermathFrames.length + 1;

  const progress = (() => {
    if (!scenario) return 0;
    if (phase === "story") return index;
    if (phase === "decision") return storyFrames.length;
    if (phase === "consequence") return storyFrames.length + 1;
    if (phase === "aftermath") return storyFrames.length + 2 + index;
    return totalBeats - 1;
  })();

  const progressPercent = Math.min(
    100,
    Math.round((progress / Math.max(1, totalBeats - 1)) * 100),
  );

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase, index]);

  useEffect(() => {
    if (!scenario) return undefined;
    let nextSrc = null;
    if (phase === "story" && storyFrames[index + 1]) nextSrc = storyFrames[index + 1].src;
    if (phase === "aftermath" && aftermathFrames[index + 1]) {
      nextSrc = aftermathFrames[index + 1].src;
    }
    if (!nextSrc) return undefined;
    const image = new Image();
    image.src = nextSrc;
    return () => {
      image.src = "";
    };
  }, [phase, index, scenario, storyFrames, aftermathFrames]);

  if (!scenario || !scenarioRun) {
    return (
      <PhoneFrame>
        <main className="grid flex-1 place-items-center p-6 text-center">
          <div>
            <p className="text-sm font-semibold text-muted">
              Skenario tidak ditemukan.
            </p>
            <Button className="mt-3" onClick={() => openScenario("S01")}>
              Mulai skenario pertama
            </Button>
          </div>
        </main>
      </PhoneFrame>
    );
  }

  function updateRun(patch) {
    saveRun({ ...scenarioRun, ...patch });
  }

  function advanceStory() {
    if (index < storyFrames.length - 1) {
      updateRun({ index: index + 1 });
      return;
    }
    updateRun({ phase: "decision", index: 0 });
  }

  function advanceAftermath() {
    if (index < aftermathFrames.length - 1) {
      updateRun({ index: index + 1 });
      return;
    }
    updateRun({ phase: "reflection", index: 0 });
  }

  function confirmChoice() {
    if (!pendingChoice) return;
    chooseOption(pendingChoice.id, pendingChoice.skor);
    setPendingChoice(null);
  }

  function advanceCurrent() {
    if (phase === "story") {
      advanceStory();
      return;
    }
    if (phase === "aftermath") {
      advanceAftermath();
    }
  }

  const currentFrame =
    phase === "story" ? storyFrames[index] : aftermathFrames[index] ?? null;

  const isAftermath = phase === "aftermath";

  return (
    <PhoneFrame>
      <TopBar
        eyebrow={`Skenario ${scenario.nomor} · ${scenario.tema}`}
        title={scenario.judul}
        code={participantCode}
        onBack={() => setExitOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-brand-600 transition-[width] duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] font-bold tabular-nums text-muted">
            {progressPercent}%
          </span>
        </div>
      </TopBar>

      <div className="shrink-0 px-4 pt-3">
        <ScoreBar scores={scores} compact />
      </div>

      <main ref={mainRef} className="flex-1 overflow-y-auto px-4 py-3">
        {phase === "story" ? (
          <div className="animate-fade-in">
            <FrameViewer frame={currentFrame} onAdvance={advanceStory} />
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold text-muted">
                Bagian {index + 1} dari {storyFrames.length}
              </p>
              <button
                type="button"
                onClick={() => updateRun({ phase: "decision", index: 0 })}
                className="rounded-full px-2.5 py-1.5 text-[10px] font-bold text-brand-700 transition hover:bg-brand-50"
              >
                Lewati ke keputusan →
              </button>
            </div>
          </div>
        ) : null}

        {phase === "decision" ? (
          <div className="animate-fade-in">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink shadow-card">
              <img
                src={scenario.keputusan.frame}
                alt={`Situasi keputusan dalam ${scenario.judul}`}
                className="aspect-video w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
                  <Icon name="alert" size={11} />
                  Saatnya memilih
                </p>
                <h1 className="mt-1.5 text-base font-extrabold leading-snug text-white">
                  {scenario.keputusan.pertanyaan}
                </h1>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {scenario.keputusan.pilihan.map((option, optionIndex) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPendingChoice(option)}
                  className="flex w-full items-start gap-2.5 rounded-2xl border border-line bg-white p-3 text-left transition hover:border-brand-400 hover:bg-brand-50/50 active:scale-[0.99]"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-extrabold text-brand-700">
                    {LETTERS[optionIndex]}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft">
                    {option.teks}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-3 rounded-2xl bg-brand-50 p-3 text-[11px] leading-relaxed text-brand-900/70">
              Setiap pilihan mengubah skor Privasi, Reputasi, dan Keamanan. Tidak
              ada jawaban yang menghakimi—pilih sesuai keputusanmu, lalu lihat
              dampaknya.
            </p>
          </div>
        ) : null}

        {phase === "consequence" && choice ? (
          <div className="animate-rise">
            <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-card">
              <div className="relative">
                <img
                  src={scenario.keputusan.frame}
                  alt=""
                  className="aspect-video w-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
                    <Icon name="sparkles" size={11} />
                    Dampak pilihanmu
                  </p>
                  <h2 className="mt-1.5 text-lg font-extrabold leading-snug text-white">
                    {choice.konsekuensi.judul}
                  </h2>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm leading-relaxed text-ink-soft">
                  {choice.konsekuensi.teks}
                </p>

                <div className="mt-4">
                  <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                    Perubahan skor
                  </p>
                  <DeltaChips before={scenarioRun.before} after={scores} />
                </div>

                {profile?.isPublic &&
                INDICATORS.some((indicator) => {
                  const diff =
                    scores[indicator.key] - (scenarioRun.before?.[indicator.key] ?? 0);
                  return indicator.key === "privasi" && diff < 0;
                }) ? (
                  <p className="mt-3 flex items-start gap-1.5 rounded-2xl bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-800">
                    <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
                    Karena profilmu publik, penalti Privasi dari pilihan berisiko
                    menjadi 20% lebih besar.
                  </p>
                ) : null}

                <Button
                  full
                  size="lg"
                  className="mt-4"
                  onClick={() => updateRun({ phase: "aftermath", index: 0 })}
                >
                  Lihat refleksinya
                  <Icon name="arrowRight" size={18} />
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {isAftermath ? (
          <div className="animate-fade-in">
            <FrameViewer frame={currentFrame} onAdvance={advanceAftermath} />
            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold text-muted">
                {index < epilogCount
                  ? `Epilog ${index + 1} dari ${epilogCount}`
                  : `Refleksi ${index - epilogCount + 1} dari ${reflectionCount}`}
              </p>
              <button
                type="button"
                onClick={() => updateRun({ phase: "reflection", index: 0 })}
                className="rounded-full px-2.5 py-1.5 text-[10px] font-bold text-brand-700 transition hover:bg-brand-50"
              >
                Lompat ke tips →
              </button>
            </div>
          </div>
        ) : null}

        {phase === "reflection" ? (
          <div className="animate-rise space-y-3">
            <div className="rounded-[1.75rem] border border-line bg-white p-5 shadow-card">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                <Icon name="check" size={12} />
                Skenario selesai
              </span>
              <h2 className="mt-2 text-xl font-extrabold leading-tight text-ink">
                Refleksi: {scenario.tema}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {scenario.refleksi.narasi}
              </p>

              <div className="mt-4 rounded-2xl bg-brand-50 p-3.5">
                <p className="flex items-center gap-1.5 text-xs font-extrabold text-brand-800">
                  <Icon name="sparkles" size={15} />
                  Tips praktis
                </p>
                <ul className="mt-2 space-y-1.5">
                  {scenario.refleksi.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 text-xs leading-relaxed text-brand-900/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                  Perubahan skor skenario ini
                </p>
                <DeltaChips before={scenarioRun.before} after={scores} />
              </div>
            </div>

            <Button full size="lg" onClick={() => finishScenario(scenario.id)}>
              Selesai & kembali ke Beranda
              <Icon name="check" size={18} />
            </Button>
          </div>
        ) : null}
      </main>

      {phase === "story" || isAftermath ? (
        <footer className="shrink-0 border-t border-line bg-white px-4 py-3 safe-bottom">
          <Button full size="lg" onClick={advanceCurrent}>
            {phase === "story" && index === storyFrames.length - 1
              ? "Ambil keputusan"
              : isAftermath && index === aftermathFrames.length - 1
                ? "Lihat tips"
                : "Lanjut"}
            <Icon name="arrowRight" size={18} />
          </Button>
        </footer>
      ) : null}

      <Modal
        open={Boolean(pendingChoice)}
        onClose={() => setPendingChoice(null)}
        title="Yakin dengan pilihanmu?"
      >
        <p className="text-sm leading-relaxed text-muted">
          Apakah kamu yakin dengan pilihan yang telah kamu ambil? Pilihan ini akan
          mengubah skormu.
        </p>
        {pendingChoice ? (
          <div className="mt-3 rounded-2xl border border-brand-200 bg-brand-50 p-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
              Pilihan {pendingChoice.id}
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-brand-900">
              {pendingChoice.teks}
            </p>
          </div>
        ) : null}
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" full onClick={() => setPendingChoice(null)}>
            Pilih ulang
          </Button>
          <Button full onClick={confirmChoice}>
            Ya, lanjutkan
          </Button>
        </div>
      </Modal>

      <Modal open={exitOpen} onClose={() => setExitOpen(false)} title="Keluar dari skenario?">
        <p className="text-sm leading-relaxed text-muted">
          Progres dan skormu tersimpan otomatis. Kamu bisa melanjutkan skenario ini
          dari Beranda kapan saja.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" full onClick={() => setExitOpen(false)}>
            Lanjut bermain
          </Button>
          <Button
            full
            onClick={() => {
              setExitOpen(false);
              closeScenario();
            }}
          >
            Ke Beranda
          </Button>
        </div>
      </Modal>
    </PhoneFrame>
  );
}
