import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Bell, PiggyBank, Repeat, ShieldAlert, Wallet } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { CtaBanner, FaqList, FeatureGrid, StatBand } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import { getSiteSettings } from "@/lib/settings.functions";
import heroImage from "@/assets/secure-digital.jpg";

export const Route = createFileRoute("/personal-banking")({
  loader: () => getSiteSettings(),
  head: () => ({
    meta: [
      { title: "Personal Banking with Refund Cover | Restitute Banking" },
      {
        name: "description",
        content:
          "Everyday checking and high-yield savings where every transaction has a one-tap dispute button and a recovery desk behind it.",
      },
      { property: "og:title", content: "Personal Banking with Refund Cover" },
      {
        property: "og:description",
        content: "Checking and savings accounts with instant dispute controls and 3.75% APY.",
      },
    ],
  }),
  component: PersonalBankingPage,
});

function PersonalBankingPage() {
  const settings = Route.useLoaderData();

  const accounts = [
    {
      name: "Everyday Checking",
      rate: "$0",
      unit: "monthly fee",
      points: ["No minimum balance", "One-tap dispute on every line", "Overdraft grace of 48 hours", "Free debit card replacement"],
      featured: false,
    },
    {
      name: "Restitute Savings",
      rate: `${settings["rate_savings_apy"] ?? "3.75"}%`,
      unit: "APY*",
      points: ["Recovered funds earn from day one", "No tiered rate games", "Automatic round-up saving", "Withdraw any time"],
      featured: true,
    },
    {
      name: "18-Month Certificate",
      rate: `${settings["rate_certificate_apy"] ?? "3.65"}%`,
      unit: "APY*",
      points: ["Fixed rate for the full term", "$500 minimum opening", "Early access if a claim resolves", "Automatic renewal option"],
      featured: false,
    },
  ];

  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Personal banking"
        title={<>Accounts that assume something might go wrong.</>}
        intro="Most banks treat a disputed payment as an exception. We built the account around it — every transaction line carries a dispute button that opens a real recovery file, not a ticket."
        breadcrumb="Personal banking"
      >
        <CtaButton to="/register">Open an account</CtaButton>
        <CtaButton to="/claims/new" variant="ghost">
          File a claim
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: `${settings["rate_savings_apy"] ?? "3.75"}%`, label: "Savings APY" },
          { value: "$0", label: "Monthly fees" },
          { value: "60 sec", label: "Card freeze to dispute" },
          { value: "24/7", label: "Fraud line" },
        ]}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Choose an account"
            title="Three accounts, no hidden tiers"
            intro="Published rates, published fees. What you read here is what our staff console publishes."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {accounts.map((account, index) => (
              <Reveal key={account.name} delay={index * 90} direction="scale">
                <article
                  className={`lift relative flex h-full flex-col rounded-3xl border p-8 ${
                    account.featured
                      ? "border-primary/40 bg-card shadow-lift"
                      : "border-border bg-card shadow-soft"
                  }`}
                >
                  {account.featured ? (
                    <span className="absolute right-6 top-6 rounded-full bg-action px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-action-foreground">
                      Most opened
                    </span>
                  ) : null}
                  <h3 className="text-lg font-bold text-foreground">{account.name}</h3>
                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-gradient-brand">{account.rate}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{account.unit}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {account.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm text-foreground/85">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/register"
                    className={`mt-8 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                      account.featured
                        ? "shine bg-action text-action-foreground"
                        : "border border-border text-foreground hover:bg-primary-soft hover:text-primary-deep"
                    }`}
                  >
                    Open {account.name}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            *Annual Percentage Yield. Rates subject to change. Terms and conditions apply.
          </p>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Built in"
        title="Controls that shorten a claim before it starts"
        tone="dark"
        columns={3}
        items={[
          { icon: ShieldAlert, title: "One-tap dispute", body: "Raise a claim from the transaction itself — merchant, amount and date are prefilled." },
          { icon: Bell, title: "Real-time alerts", body: "Every card authorisation pings your phone, so fraud is caught in minutes not statements." },
          { icon: Wallet, title: "Instant freeze", body: "Lock the card, keep the direct debits running, unfreeze when you are sure." },
          { icon: Repeat, title: "Subscription radar", body: "We flag recurring charges that changed price or restarted after a cancellation." },
          { icon: PiggyBank, title: "Recovery vault", body: "Recovered funds land in a separate pot so they do not disappear into everyday spending." },
          { icon: BadgeCheck, title: "Verified payees", body: "Name-check every new payee against the receiving bank before the money moves." },
        ]}
      />

      <FaqList
        eyebrow="Personal banking FAQ"
        title="The practical questions"
        items={[
          { q: "How long does opening an account take?", a: "About four minutes online. You will need one photo ID and a proof of address; most applications are approved the same day." },
          { q: "Is my money insured?", a: "Yes. Deposits are federally insured to the standard limit per depositor, per ownership category." },
          { q: "Can I dispute a payment made from another bank?", a: "Yes. Our recovery desk takes claims regardless of where the money left from — a Restitute account is not a requirement." },
          { q: "Do you charge for card replacement?", a: "No. Replacements after fraud or loss are free and dispatched the same working day." },
        ]}
      />

      <CtaBanner
        title="Open an account that has your back"
        body="Four minutes to apply, same-day approval for most members, and a recovery desk from the moment you are in."
        primary={{ label: "Open an account", to: "/register" }}
        secondary={{ label: "Compare cards", to: "/cards" }}
      />
    </SiteShell>
  );
}
