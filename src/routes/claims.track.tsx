import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/site/SiteShell";
import { PageHero } from "@/site/PageHero";
import { ClaimLookup } from "@/site/ClaimLookup";
import { FaqList } from "@/site/blocks";
import { RECOVERY_STAGES } from "@/lib/claims";
import { Reveal } from "@/site/Reveal";
import heroImage from "@/assets/financial-recovery.jpg";

export const Route = createFileRoute("/claims/track")({
  head: () => ({
    meta: [
      { title: "Track your refund claim — Restitute Banking" },
      { name: "description", content: "Enter your RB reference and email to see exactly where your refund claim stands, stage by stage, in real time." },
      { property: "og:title", content: "Track your refund claim" },
      { property: "og:description", content: "Live status for every Restitute Banking recovery file." },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Claim tracking"
        title={<>Know exactly where your money is.</>}
        intro="No hold music, no chasing. Every stage of your recovery is timestamped and visible the moment it changes."
        breadcrumb="Track a claim"
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ClaimLookup />
        </div>
      </section>
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-foreground">The six stages</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RECOVERY_STAGES.map((stage, index) => (
              <Reveal key={stage.title} delay={index * 70}>
                <li className="lift h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-action">
                    Stage {index + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-foreground">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <FaqList
        eyebrow="Tracking FAQ"
        title="Questions about your claim status"
        items={[
          { q: "Where do I find my reference?", a: "It is in your filing confirmation email and starts with RB-. It is also shown on your member dashboard." },
          { q: "How often does the status update?", a: "In real time. Whenever a specialist advances your file, the stage and timeline update immediately." },
          { q: "What does 'evidence requested' mean?", a: "We need one more document to file or escalate. The timeline note names exactly which one." },
          { q: "Can someone else track my claim?", a: "Only with both the reference and the email the claim was filed under. Nothing sensitive is exposed by reference alone." },
        ]}
      />
    </SiteShell>
  );
}