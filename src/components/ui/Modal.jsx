import { useEffect } from "react";
import { Icon } from "./Icon";
import { cn } from "../../lib/utils";

export function Modal({ open, onClose, title, children, className = "" }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center">
      <button
        type="button"
        aria-label="Tutup"
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative z-10 mx-auto max-h-[88%] w-full max-w-md overflow-y-auto rounded-[1.75rem] bg-white p-5 shadow-float animate-rise safe-bottom",
          className,
        )}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-base font-extrabold text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700"
            aria-label="Tutup"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
