import { useMemo, useState } from "react";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { ProgressDots, TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Likert } from "../components/ui/Likert";
import { useSession } from "../context/SessionContext";
import { SATISFACTION_ITEMS, SUS_ITEMS } from "../data/survey";
import { buildPayload } from "../lib/payload";
import { calculateSus } from "../lib/sus";
import { submitSession } from "../lib/submit";
import { cn } from "../lib/utils";

export function Survey() {
  const session = useSession();
  const { participantCode, saveSurvey, finish } = session;

  const [step, setStep] = useState(0);
  const [sus, setSus] = useState(() => Array(SUS_ITEMS.length).fill(0));
  const [satisfaction, setSatisfaction] = useState(() =>
    Array(SATISFACTION_ITEMS.length).fill(0),
  );
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const items = step === 0 ? SUS_ITEMS : SATISFACTION_ITEMS;
  const answers = step === 0 ? sus : satisfaction;

  const answered = useMemo(
    () => answers.filter((value) => value > 0).length,
    [answers],
  );

  function setAnswer(position, value) {
    setError("");
    if (step === 0) {
      setSus((current) => {
        const next = [...current];
        next[position] = value;
        return next;
      });
      return;
    }
    setSatisfaction((current) => {
      const next = [...current];
      next[position] = value;
      return next;
    });
  }

  async function next() {
    if (answered < items.length) {
      setError(`Masih ada ${items.length - answered} pernyataan yang belum dijawab.`);
      return;
    }

    if (step === 0) {
      setStep(1);
      return;
    }

    setSending(true);
    setError("");

    const susScore = calculateSus(sus);
    const survey = { sus, satisfaction, feedback: feedback.trim() };
    const completedAt = new Date().toISOString();

    saveSurvey(survey);

    const status = await submitSession(
      buildPayload({ ...session, survey, susScore, completedAt }),
    );

    finish({ susScore, submitStatus: status, completedAt });
  }

  return (
    <PhoneFrame>
      <TopBar
        eyebrow="Kuesioner"
        title={step === 0 ? "Pengalaman menggunakan" : "Kesan & masukan"}
        code={participantCode}
      >
        <div className="flex items-center justify-between gap-3">
          <ProgressDots current={step + 1} total={2} />
          <span className="text-[10px] font-bold text-muted">
            {answered}/{items.length} dijawab
          </span>
        </div>
      </TopBar>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {step === 0 ? (
          <div className="animate-fade-in space-y-2.5">
            <div className="rounded-[1.5rem] border border-brand-200 bg-brand-50 p-4">
              <p className="flex items-center gap-1.5 text-xs font-extrabold text-brand-800">
                <Icon name="info" size={15} /> Skala 1–5
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-brand-900/75">
                1 = sangat tidak setuju, 5 = sangat setuju. Jawab sesuai pengalamanmu
                memakai simulasi ini. Tidak ada jawaban benar atau salah.
              </p>
            </div>

            {SUS_ITEMS.map((label, index) => (
              <Likert
                key={label}
                index={index + 1}
                label={label}
                value={sus[index]}
                onChange={(value) => setAnswer(index, value)}
              />
            ))}
          </div>
        ) : (
          <div className="animate-fade-in space-y-2.5">
            <div className="rounded-[1.5rem] border border-line bg-white p-4">
              <p className="text-sm font-extrabold text-ink">Seberapa setuju kamu?</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                Lima pernyataan singkat tentang pengalaman belajar dan dampaknya
                untukmu.
              </p>
            </div>

            {SATISFACTION_ITEMS.map((label, index) => (
              <Likert
                key={label}
                index={index + 1}
                label={label}
                value={satisfaction[index]}
                onChange={(value) => setAnswer(index, value)}
              />
            ))}

            <div className="rounded-[1.5rem] border border-line bg-white p-4">
              <label
                htmlFor="feedback"
                className="text-xs font-extrabold uppercase tracking-wider text-ink-soft"
              >
                Masukan (opsional)
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                maxLength={400}
                rows={4}
                placeholder="Bagian mana yang paling membantu? Apa yang bisa diperbaiki?"
                className="mt-1.5 w-full resize-none rounded-2xl border border-line bg-canvas p-3 text-sm leading-relaxed text-ink outline-none placeholder:text-muted/70 focus:border-brand-500 focus:bg-white"
              />
              <p className="mt-1 text-right text-[10px] font-medium text-muted">
                {feedback.length}/400
              </p>
            </div>
          </div>
        )}

        {error ? (
          <p className="mt-3 rounded-2xl bg-red-50 p-3 text-xs font-semibold text-danger">
            {error}
          </p>
        ) : null}
      </main>

      <footer className="shrink-0 border-t border-line bg-white px-4 py-3 safe-bottom">
        <div className="flex items-center gap-2">
          {step === 1 ? (
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              disabled={sending}
              onClick={() => setStep(0)}
            >
              <Icon name="arrowLeft" size={17} />
              Sebelumnya
            </Button>
          ) : null}
          <Button
            size="lg"
            full={step === 0}
            className={cn(step === 1 && "flex-1")}
            disabled={sending}
            onClick={next}
          >
            {sending ? "Mengirim…" : step === 0 ? "Lanjut" : "Selesai"}
            {!sending ? (
              <Icon name={step === 0 ? "arrowRight" : "check"} size={17} />
            ) : null}
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] font-medium text-muted">
          Jawabanmu tersimpan anonim dengan kode {participantCode}.
        </p>
      </footer>
    </PhoneFrame>
  );
}
