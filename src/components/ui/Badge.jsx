import { cn } from "../../lib/utils";

const TONES = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  brand: "bg-brand-50 text-brand-700 border-brand-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
};

export function Badge({ badge, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-extrabold",
        TONES[badge.tone] ?? TONES.brand,
        className,
      )}
    >
      <span aria-hidden="true">{badge.emoji}</span>
      {badge.title}
    </span>
  );
}
