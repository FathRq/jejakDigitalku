import { cn } from "../../lib/utils";

const VARIANTS = {
  primary:
    "bg-brand-600 text-white shadow-[0_12px_24px_-14px_rgba(109,40,217,0.9)] hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border border-brand-600 bg-white text-brand-700 hover:bg-brand-50 active:bg-brand-100",
  soft: "bg-brand-100 text-brand-800 hover:bg-brand-200 active:bg-brand-200",
  ghost: "text-ink-soft hover:bg-black/5 active:bg-black/10",
  danger: "bg-danger text-white hover:bg-red-700 active:bg-red-800",
  success: "bg-success text-white hover:bg-emerald-700 active:bg-emerald-800",
};

const SIZES = {
  sm: "min-h-9 px-3 text-sm rounded-xl",
  md: "min-h-11 px-4 text-sm rounded-2xl",
  lg: "min-h-12 px-5 text-base rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  full = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        SIZES[size],
        full && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
