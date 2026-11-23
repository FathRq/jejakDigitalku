import { cn } from "../../lib/utils";

export function PhoneFrame({ children, className = "" }) {
  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top,#ede9fe_0%,#f7f5fb_45%,#f7f5fb_100%)] lg:grid lg:place-items-center lg:p-6">
      <div
        className={cn(
          "relative mx-auto flex h-svh w-full max-w-md flex-col overflow-hidden bg-canvas",
          "lg:h-[min(880px,calc(100svh-3rem))] lg:rounded-[2.25rem] lg:border lg:border-white/70 lg:shadow-float",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
