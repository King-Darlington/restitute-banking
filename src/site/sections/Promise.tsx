import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import teamImage from "@/assets/team-office.jpg";
import { Reveal } from "../Reveal";

const points = [
  "No upfront fee — our fee comes out of what we recover, never out of your pocket",
  "A named specialist and a written plan within one business day",
  "Every filing deadline tracked for you, including ombudsman windows",
  "Plain-English updates at each stage, never legal fog",
];

export function Promise() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal direction="left" className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={teamImage}
              alt="Restitute Banking recovery specialists reviewing a claim file together"
              loading="lazy"
              width={1600}
              height={1008}
              className="h-[24rem] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-border bg-card p-5 shadow-lift sm:right-auto sm:w-72">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Recovery guarantee
            </p>
            <p className="mt-2 text-2xl font-extrabold text-foreground">$0 if we fail</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              You are only ever invoiced from funds that actually reach your account.
            </p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <span className="inline-flex items-center gap-2 rounded-full border border-action/25 bg-action-soft px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-action">
            The Restitute promise
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Built for the moment you realise the money is gone.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Losing money is stressful enough without a maze of hold music and reference numbers. We
            replaced all of it with one file, one specialist and one honest status line you can read
            at any hour.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point, index) => (
              <Reveal key={point} delay={index * 80} as="li" className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-action/15 text-action">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-foreground/85">{point}</span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/claims/new"
              className="shine rounded-xl bg-action px-6 py-3.5 text-sm font-semibold text-action-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Start my claim
            </Link>
            <Link
              to="/register"
              className="rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary-soft hover:text-primary-deep"
            >
              Open an account
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
