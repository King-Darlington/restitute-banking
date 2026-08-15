import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Eye, Lock, Plane, RotateCcw, Snowflake } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { CtaBanner, FaqList, FeatureGrid, StatBand } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import heroImage from "@/assets/card-payment.jpg";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title: "Debit & Credit Cards with Dispute Controls | Restitute Banking" },
      {
        name: "description",
        content:
          "Cards with instant freeze, virtual numbers for risky merchants and a dispute button on every transaction — protection before the loss, not after.",
      },
      { property: "og:title", content: "Cards with Dispute Controls" },
      {
        property: "og:description",
        content: "Instant freeze, virtual card numbers and one-tap disputes on every transaction.",
      },
    ],
  }),
  component: CardsPage,
});

const cards = [
  { name: "Restitute Debit", tone: "from-primary-deep to-primary", body: "Free with every checking account. One-tap disputes, instant freeze and real-time alerts as standard.", points: ["No foreign transaction fee", "Virtual numbers on demand", "Same-day replacement"] },
  { name: "Shield Credit", tone: "from-ink to-primary-deep", body: "Purchase protection to $10,000 per claim, plus extended warranty on eligible goods.", points: ["0% on balance transfers for 15 months", "Purchase protection built in", "No annual fee"] },
  { name: "Voyage Rewards", tone: "from-action-deep to-action", body: "For members who spend abroad — 2% back on travel and dining, with trip disruption cover.", points: ["2% travel and dining rewards", "Trip disruption cover", "Airport lounge credits"] },
];

function CardsPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Cards"
        title={<>The dispute button lives on the card, not in a call queue.</>}
        intro="Every Restitute card puts freeze, virtual numbers and one-tap disputes directly on the transaction. Protection that works before the loss is the only protection that matters."
        breadcrumb="Cards"
      >
        <CtaButton to="/register">Apply for a card</CtaButton>
        <CtaButton to="/personal-banking" variant="ghost">
          Compare accounts
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: "$10,000", label: "Purchase protection" },
          { value: "0%", label: "Foreign transaction fee" },
          { value: "60 sec", label: "Freeze to dispute" },
          { value: "24 hrs", label: "Replacement dispatch" },
        ]}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="The range" title="Three cards, one protection standard" />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {cards.map((card, index) => (
              <Reveal key={card.name} delay={index * 100} direction="up">
                <article className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <div className={`relative aspect-[1.586/1] overflow-hidden rounded-2xl bg-gradient-to-br ${card.tone} p-5 shadow-lift`}>
                    <div className="absolute inset-0 bg-grid text-ink-foreground/40 opacity-25" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-foreground/85">
                          Restitute
                        </span>
                        <CreditCard className="h-5 w-5 text-ink-foreground/70" />
                      </div>
                      <div>
                        <p className="font-mono text-sm tracking-[0.24em] text-ink-foreground/90">
                          •••• •••• •••• 4217
                        </p>
                        <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-foreground/60">
                          {card.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-foreground">{card.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm text-foreground/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-action" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Card controls"
        title="Six controls that stop losses early"
        tone="dark"
        items={[
          { icon: Snowflake, title: "Instant freeze", body: "Lock the card in one tap while keeping standing orders and direct debits alive." },
          { icon: Eye, title: "Virtual numbers", body: "Generate a single-merchant card number for anything you are not sure about." },
          { icon: RotateCcw, title: "One-tap dispute", body: "Open a recovery file directly from the transaction with the details prefilled." },
          { icon: Lock, title: "Channel limits", body: "Turn online, contactless, ATM or overseas use on and off independently." },
          { icon: Plane, title: "Travel mode", body: "Tell us where you are going and we stop blocking legitimate spend abroad." },
          { icon: CreditCard, title: "Merchant blocks", body: "Permanently block a merchant that keeps charging after cancellation." },
        ]}
      />

      <FaqList
        eyebrow="Card FAQ"
        title="Card questions, answered"
        items={[
          { q: "How fast is a fraud refund?", a: "Provisional credit for confirmed card fraud is applied within one business day while the full dispute runs." },
          { q: "Does freezing cancel my subscriptions?", a: "No. A freeze blocks new authorisations but leaves existing mandates in place, so nothing breaks unintentionally." },
          { q: "Is there a credit check?", a: "Debit cards, no. Shield Credit and Voyage Rewards require a credit assessment, starting with a soft search." },
          { q: "Can I have more than one card?", a: "Yes — one debit plus up to two credit cards per member, subject to affordability." },
        ]}
      />

      <CtaBanner
        title="Carry a card that can fight back"
        body="Apply in minutes and get a virtual card number immediately, with the physical card in the post."
        primary={{ label: "Apply for a card", to: "/register" }}
        secondary={{ label: "See the mobile app", to: "/app" }}
      />
    </SiteShell>
  );
}
