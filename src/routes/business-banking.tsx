import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Building2, FileStack, Gavel, Users2, Workflow } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { CtaBanner, FaqList, FeatureGrid, StatBand } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import heroImage from "@/assets/business-banking.jpg";

export const Route = createFileRoute("/business-banking")({
  head: () => ({
    meta: [
      { title: "Business Banking & Chargeback Defence | Restitute Banking" },
      {
        name: "description",
        content:
          "Merchant accounts with chargeback defence built in: automatic evidence packs, representment deadlines tracked and settlement reporting.",
      },
      { property: "og:title", content: "Business Banking & Chargeback Defence" },
      {
        property: "og:description",
        content: "Merchant banking with automatic chargeback evidence packs and deadline tracking.",
      },
    ],
  }),
  component: BusinessBankingPage,
});

const plans = [
  { name: "Starter", price: "$0", note: "Sole traders and side businesses", points: ["1 user seat", "Up to 200 transactions/mo", "Chargeback alerts", "Basic evidence pack"] },
  { name: "Growth", price: "$29", note: "Established small businesses", points: ["5 user seats", "Unlimited transactions", "Automatic representment filing", "Settlement reporting"], featured: true },
  { name: "Enterprise", price: "Custom", note: "High-volume merchants", points: ["Unlimited seats and roles", "Dedicated dispute analyst", "API and webhook access", "Quarterly loss review"] },
];

function BusinessBankingPage() {
  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Business banking"
        title={<>Stop losing chargebacks you should be winning.</>}
        intro="Most merchants lose disputes on paperwork, not on merit. Restitute assembles the evidence pack, tracks the representment window and files on your behalf — from the same account your money sits in."
        breadcrumb="Business banking"
      >
        <CtaButton to="/register">Open a business account</CtaButton>
        <CtaButton to="/contact" variant="ghost">
          Book a loss review
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: "78%", label: "Average win rate" },
          { value: "4 hrs", label: "To evidence pack" },
          { value: "0", label: "Missed deadlines" },
          { value: "$29/mo", label: "Growth plan" },
        ]}
      />

      <FeatureGrid
        eyebrow="Merchant tools"
        title="Dispute defence, wired into the account"
        items={[
          { icon: FileStack, title: "Automatic evidence packs", body: "Order records, delivery proof, terms accepted and IP trail assembled the moment a dispute lands." },
          { icon: Workflow, title: "Deadline tracking", body: "Representment windows differ by scheme and reason code. We track each one and file before it closes." },
          { icon: Gavel, title: "Arbitration support", body: "When a case is worth escalating, our specialists take it to scheme arbitration with a costed recommendation." },
          { icon: BarChart3, title: "Loss analytics", body: "See which products, channels and geographies generate disputes before they become a pattern." },
          { icon: Users2, title: "Role-based access", body: "Give finance, support and ops the exact permissions they need, and nothing more." },
          { icon: Building2, title: "Multi-entity accounts", body: "Run several trading entities under one login with consolidated settlement reporting." },
        ]}
      />

      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Plans" title="Priced on seats, not on your disputes" intro="We never take a percentage of a merchant's recovered chargeback — that would put us on the wrong side of the incentive." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 90} direction="scale">
                <article className={`lift flex h-full flex-col rounded-3xl border bg-card p-8 ${plan.featured ? "border-primary/40 shadow-lift" : "border-border shadow-soft"}`}>
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{plan.note}</p>
                  <p className="mt-5 text-4xl font-extrabold text-gradient-brand">{plan.price}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm text-foreground/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-action" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a href="/register" className={`mt-8 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 ${plan.featured ? "shine bg-action text-action-foreground" : "border border-border text-foreground hover:bg-primary-soft hover:text-primary-deep"}`}>
                    Get started
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqList
        eyebrow="Merchant FAQ"
        title="What merchants ask first"
        items={[
          { q: "Do you work with my payment processor?", a: "We support the major card acquirers and PSPs through file-based and API integrations. If yours is not listed at onboarding, our team will confirm within one working day." },
          { q: "Who actually files the representment?", a: "Our dispute analysts do, using your evidence pack. You approve the submission from the dashboard, or set it to auto-file for low-value cases." },
          { q: "What happens if we lose?", a: "You see the reason code and the counter-evidence in full, plus a recommendation on whether arbitration is economically worth it." },
          { q: "Can we keep our existing bank?", a: "Yes. Chargeback defence can run as a standalone service alongside your current merchant account." },
        ]}
      />

      <CtaBanner
        title="Get a free review of last quarter's losses"
        body="Send us ninety days of dispute data and we will show you, line by line, what was winnable."
        primary={{ label: "Book a loss review", to: "/contact" }}
        secondary={{ label: "Open a business account", to: "/register" }}
      />
    </SiteShell>
  );
}
