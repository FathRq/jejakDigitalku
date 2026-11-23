import { LIKERT_LABELS } from "../../data/survey";
import { cn } from "../../lib/utils";

export function Likert({ value, onChange, label, index }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-3">
      <p className="text-sm font-semibold leading-snug text-ink-soft">
        <span className="mr-1.5 font-extrabold text-brand-600">{index}.</span>
        {label}
      </p>

      <div
        role="radiogroup"
        aria-label={label}
        className="mt-2.5 grid grid-cols-5 gap-1.5"
      >
        {LIKERT_LABELS.map((text, position) => {
          const score = position + 1;
          const selected = value === score;
          return (
            <button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${score} - ${text}`}
              title={text}
              onClick={() => onChange(score)}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center rounded-xl border text-sm font-extrabold transition",
                selected
                  ? "border-brand-600 bg-brand-600 text-white shadow-[0_8px_16px_-10px_rgba(109,40,217,0.8)]"
                  : "border-line bg-white text-ink-soft hover:border-brand-300 hover:bg-brand-50",
              )}
            >
              {score}
            </button>
          );
        })}
      </div>

      <div className="mt-1.5 flex justify-between text-[9px] font-medium text-muted">
        <span>Sangat tidak setuju</span>
        <span>Sangat setuju</span>
      </div>
    </div>
  );
}
