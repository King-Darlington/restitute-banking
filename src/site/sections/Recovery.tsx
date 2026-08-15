import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { RECOVERY_STAGES } from "@/lib/claims";

export function Recovery() {
  return (
    <section className="relative overflow-hidden bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How recovery works"
          title="Six stages. No black box."
          intro="Most recovery services go quiet after you sign. We publish the stage your claim sits in, who owns it, and what happens next."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RECOVERY_STAGES.map((stage, index) => (
            <Reveal key={stage.title} delay={index * 80} direction={index % 2 ? "right" : "left"}>
              <li className="lift group relative h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-extrabold text-primary-foreground shadow-[0_0_12px_var(--primary_/_0.3)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
                <span className="absolute bottom-6 right-6 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-card px-6 py-3 text-sm font-semibold text-primary-deep shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-soft"
            >
              Read the full recovery playbook
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
