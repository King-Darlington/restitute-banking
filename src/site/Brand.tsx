import { cn } from "@/lib/utils";

export function BrandLockup({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";
  return (
    <span className={cn("group/brand inline-flex flex-col leading-none", className)}>
      <span className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold tracking-[-0.02em] sm:text-[1.5rem]",
            inverse ? "text-ink-foreground" : "text-gradient-brand",
          )}
        >
          Restitute
        </span>
        <span
          className={cn(
            "font-display text-[1.35rem] font-light tracking-[-0.01em] sm:text-[1.5rem]",
            inverse ? "text-ink-foreground/70" : "text-foreground/70",
          )}
        >
          Banking
        </span>
      </span>
      <span className="mt-1 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-[2px] w-8 rounded-full bg-action transition-all duration-300 group-hover/brand:w-12"
        />
        <span
          className={cn(
            "text-[0.55rem] font-semibold uppercase tracking-[0.3em]",
            inverse ? "text-ink-foreground/55" : "text-muted-foreground",
          )}
        >
          Refund recovery
        </span>
      </span>
    </span>
  );
}
