import { createFileRoute } from "@tanstack/react-router";
import { FileText, Gavel, Search, Send, ShieldCheck, Wallet } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { CtaBanner, FaqList, StatBand } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import { RECOVERY_STAGES } from "@/lib/claims";
import heroImage from "@/assets/secure-digital.jpg";
const icons = [FileText, Search, ShieldCheck, Send, Gavel, Wallet];

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Refund Recovery Works | Restitute Banking" },
      {
        name: "description",
        content:
          "The six stages of a Restitute Banking refund claim: report, verify, evidence, file, negotiate and return. Timelines, evidence lists and fees explained.",
      },
      { property: "og:title", content: "How Refund Recovery Works" },
      {
        property: "og:description",
        content: "Six transparent stages, published timelines and a fee taken only from recovered funds.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const evidence = [
  "Bank or card statement showing the disputed line",
  "Any receipt, invoice or order confirmation",
  "Messages with the merchant, broker or counterparty",
  "The date and channel you first reported the loss",
  "Police or fraud-report reference, if one exists",
];

function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="How recovery works"
        title={<>A claim is a process, not a phone call.</>}
        intro="Here is exactly what happens after you press submit — who touches your file, what we need from you, how long each stage usually takes, and when a fee applies."
        breadcrumb="How recovery works"
      >
        <CtaButton to="/claims/new">File a claim now</CtaButton>
        <CtaButton to="/claims/track" variant="ghost">
          Track an existing claim
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: "5 min", label: "Average intake time" },
          { value: "1 day", label: "To a named specialist" },
          { value: "19 days", label: "Median resolution" },
          { value: "0%", label: "Upfront fee" },
        ]}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The six stages"
            title="Every claim follows the same published path"
            intro="Your dashboard shows which of these six stages you are in, at all times."
          />
          <ol className="relative mt-14 space-y-6 border-l border-border pl-8">
            {RECOVERY_STAGES.map((stage, index) => {
              const Icon = icons[index] ?? FileText;
              return (
                <Reveal key={stage.title} delay={index * 80} direction="right">
                  <li className="lift relative rounded-3xl border border-border bg-card p-7 shadow-soft">
                    <span className="absolute -left-[3.15rem] top-7 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Stage {index + 1}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-foreground">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading
              align="left"
              eyebrow="What to gather"
              title="Evidence that makes a claim win"
              intro="You do not need all of this to start — file first, and we will tell you which items actually matter for your case type."
            />
            <ul className="mt-8 space-y-3">
              {evidence.map((item, index) => (
                <Reveal key={item} delay={index * 70} as="li" className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-action" />
                  <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h3 className="text-lg font-bold text-foreground">What it costs</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Nothing to open a claim. Nothing while it runs. If — and only if — money reaches
                your account, our success fee is deducted from the recovered amount.
              </p>
              <dl className="mt-6 space-y-4 border-t border-border pt-6 text-sm">
                {[
                  ["Intake and assessment", "Free"],
                  ["Evidence review and filing", "Free"],
                  ["Ombudsman escalation", "Free"],
                  ["Success fee", "15% of recovered funds"],
                  ["If nothing is recovered", "$0"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-bold text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqList
        eyebrow="Common questions"
        title="Before you file"
        items={[
          { q: "Do I need an account with Restitute to claim?", a: "No. Anyone can file a claim and track it with a reference code. Opening a member account simply gives you a dashboard, document uploads and messaging on the file." },
          { q: "How far back can a claim go?", a: "Most card scheme disputes run to 120 days from the transaction or the expected delivery date, and regulated payment claims often stretch to six years. File anyway — our intake team checks the applicable window for you." },
          { q: "Will claiming hurt my credit?", a: "No. A refund claim is a dispute against a payment, not a credit application, and it is not reported to credit bureaus." },
          { q: "What if the counterparty refuses?", a: "We escalate. Depending on the case that means the scheme's arbitration process, the financial ombudsman or the regulator — all included, at no extra cost." },
          { q: "How do I get the money?", a: "Recovered funds are paid to your nominated account, usually within two working days of the counterparty releasing them, with a written outcome letter attached to your file." },
        ]}
      />

      <CtaBanner
        title="Five minutes now, or another month of waiting"
        body="Filing costs nothing and commits you to nothing. Most members are matched to a specialist by the next business day."
        primary={{ label: "Request a refund", to: "/claims/new" }}
        secondary={{ label: "Ask a question first", to: "/contact" }}
      />
    </SiteShell>
  );
}
