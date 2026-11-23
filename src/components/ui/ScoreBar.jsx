import { INDICATORS, averageScore, getBadge } from "../../lib/scoring";
import { cn } from "../../lib/utils";

export function ScoreBar({ scores, compact = false, className = "" }) {
  const badge = getBadge(scores);

  if (compact) {
    return (
      <div
        className={cn(
          "grid grid-cols-3 gap-2 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-card backdrop-blur",
          className,
        )}
        aria-label="Skor jejak digital"
      >
        {INDICATORS.map((indicator) => (
          <div key={indicator.key} className="rounded-xl px-2 py-1.5 text-center">
            <p className="text-[10px] font-semibold text-muted">{indicator.label}</p>
            <p
              className="text-lg font-extrabold leading-tight"
              style={{ color: indicator.color }}
            >
              {scores[indicator.key]}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="rounded-[1.75rem] bg-gradient-to-br from-brand-600 to-brand-500 p-5 text-white shadow-float">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white/80">Skor jejak digitalmu</p>
          <p className="mt-0.5 text-2xl font-extrabold leading-tight">
            {averageScore(scores)}
            <span className="ml-1 text-sm font-semibold text-white/70">/100</span>
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold text-brand-700">
          {badge.emoji} {badge.title}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {INDICATORS.map((indicator) => (
          <div key={indicator.key}>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold">
              <span className="text-white/85">{indicator.label}</span>
              <span className="tabular-nums">{scores[indicator.key]}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-700 ease-out"
                style={{ width: `${scores[indicator.key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ScoreChips({ scores, className = "" }) {
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
      {INDICATORS.map((indicator) => (
        <div
          key={indicator.key}
          className="rounded-2xl border border-line bg-white p-2.5 text-center"
        >
          <p className="text-[10px] font-semibold text-muted">{indicator.label}</p>
          <p
            className="text-xl font-extrabold leading-tight tabular-nums"
            style={{ color: indicator.color }}
          >
            {scores[indicator.key]}
          </p>
        </div>
      ))}
    </div>
  );
}
