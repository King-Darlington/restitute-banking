import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function FeatureGrid({
  eyebrow,
  title,
  intro,
  items,
  columns = 3,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: { icon: LucideIcon; title: string; body: string; meta?: string }[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 lg:py-24",
        tone === "dark" ? "surface-ink" : "bg-background",
      )}
    >
      {tone === "dark" ? (
        <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
      ) : null}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} {...(intro ? { intro } : {})} tone={tone} />
        <div
          className={cn(
            "mt-14 grid gap-6",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} direction="scale">
              <article
                className={cn(
                  "lift h-full rounded-3xl border p-7",
                  tone === "dark"
                    ? "border-ink-foreground/12 bg-ink-foreground/[0.06]"
                    : "border-border bg-card shadow-soft",
                )}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl",
                    tone === "dark" ? "bg-action/15 text-action" : "bg-primary-soft text-primary-deep",
                  )}
                >
                  <item.icon className="h-5.5 w-5.5" />
                </span>
                <h3
                  className={cn(
                    "mt-5 text-lg font-bold",
                    tone === "dark" ? "text-ink-foreground" : "text-foreground",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    tone === "dark" ? "text-ink-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {item.body}
                </p>
                {item.meta ? (
                  <p className="mt-4 inline-flex rounded-full bg-action-soft px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-action">
                    {item.meta}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="border-y border-border bg-secondary py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80} className="text-center">
            <p className="text-3xl font-extrabold text-gradient-brand sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal direction="scale">
          <div className="surface-ink relative overflow-hidden rounded-[2rem] px-8 py-14 text-center shadow-lift sm:px-14">
            <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
            <div
              className="float-slow pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "var(--gradient-action)", opacity: 0.22 }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight text-ink-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-foreground/70">{body}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  to={primary.to}
                  className="shine rounded-xl bg-action px-6 py-3.5 text-sm font-semibold text-action-foreground transition-transform hover:-translate-y-0.5"
                >
                  {primary.label}
                </Link>
                {secondary ? (
                  <Link
                    to={secondary.to}
                    className="rounded-xl border border-ink-foreground/25 px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
                  >
                    {secondary.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FaqList({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-12 space-y-3">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <details className="group rounded-2xl border border-border bg-card px-6 py-5 shadow-soft transition-colors open:border-primary/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-foreground">
                  {item.q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
