import { useMemo, useState } from "react";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { ProgressDots, TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useSession } from "../context/SessionContext";
import { scoreTest } from "../data/questions";
import { cn } from "../lib/utils";

const LETTERS = ["A", "B", "C", "D"];

function resultMessage(mode, score, compareScore) {
  if (mode === "post" && Number.isFinite(compareScore)) {
    const diff = Math.round((score - compareScore) * 10) / 10;
    if (diff > 0) {
      return `Skormu naik ${diff} poin dari pre-test. Pemahamanmu tentang literasi digital meningkat.`;
    }
    if (diff === 0) {
      return "Skormu sama dengan pre-test. Pelajari kembali tips di setiap skenario agar pemahamanmu makin kuat.";
    }
    return `Skormu turun ${Math.abs(diff)} poin dari pre-test. Tidak apa-apa, ulangi tips di rapor digital dan coba lagi.`;
  }

  if (score >= 80) return "Pengetahuan awalmu sudah sangat baik.";
  if (score >= 60) return "Pengetahuan awalmu sudah cukup baik.";
  if (score >= 40) return "Masih ada beberapa konsep yang perlu diperdalam.";
  return "Tidak masalah. Cerita berikut akan membantumu memahami risikonya.";
}

export function TestScreen({
  mode = "pre",
  questions,
  onComplete,
  compareScore = null,
}) {
  const { participantCode, startedAt } = useSession();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const isPost = mode === "post";
  const question = questions[index];
  const selected = answers[index];
  const isLast = index === questions.length - 1;

  const answeredCount = useMemo(
    () => answers.filter((value) => Number.isInteger(value)).length,
    [answers],
  );

  function selectOption(optionIndex) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (!Number.isInteger(selected)) return;

    if (!isLast) {
      setIndex((current) => current + 1);
      return;
    }

    const scored = scoreTest(questions, answers);
    setResult(scored);
  }

  function finish() {
    if (!result) return;
    onComplete({
      answers,
      correct: result.correct,
      total: result.total,
      score: result.score,
    });
  }

  if (result) {
    return (
      <PhoneFrame>
        <TopBar
          eyebrow={isPost ? "Post-Test" : "Pre-Test"}
          title="Selesai"
          code={participantCode}
        >
          <ProgressDots current={questions.length} total={questions.length} />
        </TopBar>

        <main className="flex-1 overflow-y-auto px-4 py-5">
          <div className="animate-rise rounded-[1.75rem] border border-line bg-white p-5 shadow-card">
            <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-700">
              {isPost ? "Hasil Post-Test" : "Hasil Pre-Test"}
            </p>

            <h1 className="mt-3 text-xl font-extrabold text-ink">
              {isPost ? "Post-test selesai!" : "Hasil Pre-Test kamu"}
            </h1>

            <div className="mt-4 flex items-end gap-3">
              <p className="text-6xl font-extrabold leading-none text-brand-600">
                {result.correct}
              </p>
              <p className="pb-1 text-lg font-bold text-ink-soft">
                dari {result.total} soal benar
              </p>
            </div>

            <div className="mt-4 flex gap-1.5">
              {questions.map((_, dot) => (
                <span
                  key={dot}
                  className={cn(
                    "h-2 flex-1 rounded-full",
                    dot < result.correct ? "bg-brand-600" : "bg-brand-100",
                  )}
                />
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {resultMessage(isPost ? "post" : "pre", result.score, compareScore)}
            </p>

            {isPost && Number.isFinite(compareScore) ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-canvas p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Pre-Test
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-ink-soft">
                    {compareScore}
                  </p>
                </div>
                <div className="rounded-2xl bg-brand-50 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                    Post-Test
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-brand-700">
                    {result.score}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-4 rounded-2xl bg-brand-50 p-3.5">
              <p className="text-xs leading-relaxed text-brand-900/75">
                {isPost
                  ? "Skor ini akan dibandingkan dengan pre-test untuk melihat peningkatan pemahamanmu. Jawaban benar tidak ditampilkan agar refleksi tetap terjadi di akhir sesi."
                  : "Skor ini disimpan sebagai skor awal. Setelah cerita dan rapor digital, kamu akan mengerjakan post-test dan melihat perubahannya."}
              </p>
            </div>

            <p className="mt-3 text-[11px] font-semibold text-muted">
              Dijawab {answeredCount} dari {questions.length} soal · Kode{" "}
              {participantCode}
            </p>
          </div>
        </main>

        <footer className="shrink-0 border-t border-line bg-white px-4 py-3 safe-bottom">
          <Button full size="lg" onClick={finish}>
            {isPost ? "Lanjut ke Kuesioner" : "Lanjut Buat Profil"}
            <Icon name="arrowRight" size={18} />
          </Button>
        </footer>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <TopBar
        eyebrow={isPost ? "Post-Test" : "Pre-Test"}
        title={`Soal ${index + 1} dari ${questions.length}`}
        code={participantCode}
      >
        <ProgressDots current={index + 1} total={questions.length} />
      </TopBar>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="animate-fade-in rounded-[1.75rem] border border-line bg-white p-4 shadow-card sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold text-brand-700">
              {question.tema}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted">
              <Icon name="clock" size={12} />
              {isPost ? "Post-test" : "Pre-test"}
            </span>
          </div>

          <h1 className="mt-3 text-base font-bold leading-relaxed text-ink">
            {question.pertanyaan}
          </h1>

          <div className="mt-4 space-y-2">
            {question.pilihan.map((option, optionIndex) => {
              const active = selected === optionIndex;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectOption(optionIndex)}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-2xl border p-3 text-left transition",
                    active
                      ? "border-brand-600 bg-brand-50 shadow-[0_10px_22px_-18px_rgba(109,40,217,0.9)]"
                      : "border-line bg-white hover:border-brand-300 hover:bg-brand-50/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-extrabold",
                      active
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-brand-200 bg-white text-brand-700",
                    )}
                  >
                    {LETTERS[optionIndex]}
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-relaxed",
                      active ? "font-semibold text-brand-900" : "text-ink-soft",
                    )}
                  >
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-muted">
            Jawabanmu tidak ditampilkan benar atau salah sampai sesi selesai.
            Kerjakan dengan jujur, ya.
          </p>
        </div>
      </main>

      <footer className="shrink-0 border-t border-line bg-white px-4 py-3 safe-bottom">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            disabled={index === 0}
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
          >
            <Icon name="arrowLeft" size={17} />
            Sebelumnya
          </Button>
          <Button
            size="lg"
            className="flex-1"
            disabled={!Number.isInteger(selected)}
            onClick={goNext}
          >
            {isLast ? "Selesai" : "Lanjut"}
            <Icon name={isLast ? "check" : "arrowRight"} size={17} />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] font-medium text-muted">
          Sesi dimulai {startedAt ? "dan progres tersimpan otomatis" : "sekarang"} ·
          Kode {participantCode}
        </p>
      </footer>
    </PhoneFrame>
  );
}
