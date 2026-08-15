import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] animate-pulse",
            tone === "dark"
              ? "border-ink-foreground/20 bg-ink-foreground/5 text-ink-foreground/75"
              : "border-primary/20 bg-primary-soft text-primary-deep",
          )}
        >
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={cn(
            "mt-5 text-3xl font-extrabold leading-tight sm:text-4xl",
            tone === "dark" ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={170}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed",
              tone === "dark" ? "text-ink-foreground/70" : "text-muted-foreground",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
