import { Icon, Logo } from "../ui/Icon";
import { cn } from "../../lib/utils";

export function ProgressDots({ current = 0, total = 5, className = "" }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-hidden="true">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            index < current ? "w-7 bg-brand-600" : "w-5 bg-brand-200",
          )}
        />
      ))}
    </div>
  );
}

export function TopBar({
  title,
  eyebrow,
  code,
  onBack,
  children,
  right,
  className = "",
}) {
  return (
    <header
      className={cn(
        "shrink-0 border-b border-line/80 bg-white/95 px-4 pb-3 pt-3 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-soft transition hover:bg-black/5"
            aria-label="Kembali"
          >
            <Icon name="arrowLeft" size={20} />
          </button>
        ) : (
          <Logo size={32} className="shrink-0" />
        )}

        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-700">
              {eyebrow}
            </p>
          ) : null}
          <p className="truncate text-sm font-bold leading-tight text-ink">{title}</p>
        </div>

        {right}
        {code ? (
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold text-brand-700">
            Kode: {code}
          </span>
        ) : null}
      </div>

      {children ? <div className="mt-2.5">{children}</div> : null}
    </header>
  );
}
