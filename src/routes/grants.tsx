import { createFileRoute } from "@tanstack/react-router";
import { Baby, BookOpen, HandCoins, Home, Stethoscope, Users } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { CtaBanner, FaqList, StatBand } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import { money } from "@/lib/format";
import heroImage from "@/assets/community-grant.jpg";
export const Route = createFileRoute("/grants")({
  head: () => ({
    meta: [
      { title: "Hardship Grants & Aid | Restitute Banking" },
      {
        name: "description",
        content:
          "Non-repayable hardship grants for members waiting on a refund claim: housing, medical, childcare, education and emergency relief.",
      },
      { property: "og:title", content: "Hardship Grants & Aid" },
      {
        property: "og:description",
        content: "Non-repayable grants that carry members through the wait for a refund.",
      },
    ],
  }),
  component: GrantsPage,
});

const grants = [
  { icon: Home, name: "Housing Stability Grant", max: 3500, body: "Covers rent or mortgage arrears created by a loss that is still in recovery.", window: "Decision in 5 working days" },
  { icon: Stethoscope, name: "Medical Relief Grant", max: 5000, body: "Treatment, prescriptions and travel-to-care costs for members and dependants.", window: "Decision in 3 working days" },
  { icon: Baby, name: "Childcare Continuity Grant", max: 2000, body: "Keeps a childcare place open so a parent does not have to leave work.", window: "Decision in 5 working days" },
  { icon: BookOpen, name: "Education Access Grant", max: 4000, body: "Tuition, exam fees and equipment for members or their children.", window: "Termly assessment" },
  { icon: HandCoins, name: "Emergency Relief Grant", max: 1500, body: "Food, utilities and immediate essentials, paid within 48 hours of approval.", window: "Decision in 48 hours" },
  { icon: Users, name: "Community Fund", max: 10000, body: "For local groups running financial-literacy or fraud-prevention work.", window: "Quarterly rounds" },
];

function GrantsPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Grants & aid"
        title={<>Money you never pay back, while you wait for money you are owed.</>}
        intro="A claim can take weeks. Rent does not wait. Our grant programme is funded from member surplus and exists so that a pending recovery never turns into a crisis."
        breadcrumb="Grants & aid"
      >
        <CtaButton to="/claims/new">Apply for support</CtaButton>
        <CtaButton to="/contact" variant="ghost">
          Ask about eligibility
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: "$8.4M", label: "Granted since 2019" },
          { value: "6,120", label: "Households supported" },
          { value: "48 hrs", label: "Fastest decision" },
          { value: "$0", label: "Repayable" },
        ]}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Programmes" title="Six grants, all non-repayable" intro="Awards are assessed on need, not on credit history. Applying has no effect on any claim, loan or account you hold." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grants.map((grant, index) => (
              <Reveal key={grant.name} delay={index * 80} direction="scale">
                <article className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-action-soft text-action">
                    <grant.icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{grant.name}</h3>
                  <p className="mt-3 text-2xl font-extrabold text-gradient-brand">
                    up to {money(grant.max)}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{grant.body}</p>
                  <p className="mt-5 rounded-full bg-secondary px-3 py-1.5 text-center text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {grant.window}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-ink relative overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading tone="dark" eyebrow="Eligibility" title="Who can apply" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              "You hold a Restitute account, or have an open claim with us",
              "The need is current and evidenced — not historic or speculative",
              "You have not received the same grant in the last twelve months",
              "The amount requested is proportionate to the documented need",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <p className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.06] p-5 text-sm leading-relaxed text-ink-foreground/80">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqList
        eyebrow="Grants FAQ"
        title="What applicants ask"
        items={[
          { q: "Is a grant really not repayable?", a: "Correct. A grant is an award from member surplus. It is not a loan, it carries no interest and it is never recovered from a later claim payout." },
          { q: "Does a grant reduce my claim?", a: "No. The two are assessed separately and a grant does not affect the amount we pursue on your behalf." },
          { q: "What evidence is required?", a: "Typically a bill, arrears letter or invoice showing the need, plus your claim reference if one exists. Our team will list exactly what applies to your programme." },
          { q: "Can I apply for more than one?", a: "Yes, where the needs are genuinely distinct. Combined awards are capped at $10,000 per household per year." },
        ]}
      />

      <CtaBanner
        title="If the wait is hurting, tell us now"
        body="Support applications are assessed by people, not scorecards, and the fastest programme decides in forty-eight hours."
        primary={{ label: "Apply for support", to: "/claims/new" }}
        secondary={{ label: "Talk to member care", to: "/contact" }}
      />
    </SiteShell>
  );
}
