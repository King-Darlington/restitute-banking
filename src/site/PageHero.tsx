import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  breadcrumb,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children?: ReactNode;
  breadcrumb?: string;
  image?: string;
}) {
  const hasImage = Boolean(image);

  return (
    <section className={cn("relative overflow-hidden", hasImage ? "bg-primary/5" : "surface-ink")}>
      {image ? (
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className="w-full h-full object-cover object-center opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/10 to-transparent" />
          <div className="absolute inset-0 bg-primary/15" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "var(--gradient-action)", opacity: 0.12 }} />
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <p
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
              hasImage
                ? "border-white/20 bg-white/10 text-white/80"
                : "border-ink-foreground/20 bg-ink-foreground/5 text-ink-foreground/75",
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className={cn("mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]", hasImage ? "text-white" : "text-ink-foreground")}> 
            {title}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className={cn("mt-5 max-w-2xl text-base leading-relaxed sm:text-lg", hasImage ? "text-white/80" : "text-ink-foreground/75")}> 
            {intro}
          </p>
        </Reveal>
        {children ? (
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">{children}</div>
          </Reveal>
        ) : null}
        {breadcrumb ? (
          <p className={cn("mt-10 text-xs uppercase tracking-[0.2em]", hasImage ? "text-white/60" : "text-ink-foreground/45")}>
            <Link to="/" className={cn("hover:text-current", hasImage ? "text-white" : "text-ink-foreground")}> 
              Home
            </Link>
            <span className="px-2">/</span>
            {breadcrumb}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function CtaButton({
  to,
  children,
  variant = "action",
}: {
  to: string;
  children: ReactNode;
  variant?: "action" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300";
  return (
    <Link
      to={to}
      className={
        variant === "action"
          ? `${base} shine bg-action text-action-foreground shadow-soft hover:-translate-y-0.5`
          : `${base} border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10`
      }
    >
      {children}
    </Link>
  );
}
