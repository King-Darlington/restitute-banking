import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Car, GraduationCap, Home, LifeBuoy, Percent } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero, CtaButton } from "@/site/PageHero";
import { CtaBanner, FaqList, FeatureGrid, StatBand } from "@/site/blocks";
import { Reveal } from "@/site/Reveal";
import { SectionHeading } from "@/site/SectionHeading";
import { getSiteSettings } from "@/lib/settings.functions";
import heroImage from "@/assets/secure-banking.jpg";

export const Route = createFileRoute("/loans")({
  loader: () => getSiteSettings(),
  head: () => ({
    meta: [
      { title: "Loans & Bridging Credit While You Wait | Restitute Banking" },
      {
        name: "description",
        content:
          "Personal, auto and home loans at member rates — plus claim bridging credit that covers you while a refund is still in recovery.",
      },
      { property: "og:title", content: "Loans & Claim Bridging Credit" },
      {
        property: "og:description",
        content: "Member-rate lending and interest-free bridging credit against an open refund claim.",
      },
    ],
  }),
  component: LoansPage,
});

function LoansPage() {
  const settings = Route.useLoaderData();

  const products = [
    { icon: LifeBuoy, name: "Claim Bridge", rate: "0%", term: "Until your claim resolves", body: "Borrow up to 40% of a verified open claim, interest free, repaid automatically from the recovery." },
    { icon: Percent, name: "Personal Loan", rate: `${settings["rate_personal_loan_apr"] ?? "6.90"}%`, term: "12 – 60 months", body: "Fixed APR from, no origination fee, and no penalty for settling the balance early." },
    { icon: Car, name: "Auto Loan", rate: `${settings["rate_auto_loan_apr"] ?? "5.25"}%`, term: "24 – 72 months", body: "New and used vehicles, with pre-approval that holds for thirty days while you shop." },
    { icon: Home, name: "Home Loan", rate: `${settings["rate_mortgage_apr"] ?? "5.85"}%`, term: "10 – 30 years", body: "Fixed and tracker options with a named underwriter from application to completion." },
    { icon: GraduationCap, name: "Education Loan", rate: "4.40%", term: "Deferred to graduation", body: "Tuition and living costs, with repayments that only begin six months after you finish." },
    { icon: CalendarClock, name: "Hardship Line", rate: "0%", term: "Up to 6 months", body: "A short interest-free line for members in verified financial difficulty, assessed in 48 hours." },
  ];

  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Borrowing"
        title={<>Credit that understands a pending claim is money too.</>}
        intro="When a refund is stuck in recovery, the bills do not pause. Claim Bridge lends against your verified claim at zero interest, and repays itself the day the funds land."
        breadcrumb="Loans"
      >
        <CtaButton to="/register">Check your rate</CtaButton>
        <CtaButton to="/how-it-works" variant="ghost">
          How bridging works
        </CtaButton>
      </PageHero>

      <StatBand
        stats={[
          { value: "0%", label: "Claim Bridge APR" },
          { value: `${settings["rate_personal_loan_apr"] ?? "6.90"}%`, label: "Personal loan from" },
          { value: "48 hrs", label: "Hardship decision" },
          { value: "$0", label: "Early settlement fee" },
        ]}
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Lending" title="Six ways to borrow, one set of published rates" intro="Rates shown are the current member rates from our staff console. Your offer depends on affordability and credit assessment." />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.name} delay={index * 80} direction="scale">
                <article className="lift flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-deep">
                    <product.icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{product.name}</h3>
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-gradient-brand">{product.rate}</span>
                    <span className="text-xs font-semibold text-muted-foreground">APR from</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {product.term}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{product.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="How we lend"
        title="Underwriting you can actually follow"
        tone="dark"
        columns={3}
        items={[
          { icon: CalendarClock, title: "Decision in 24 hours", body: "Most applications are decided within one business day, with the reasons written out in plain language." },
          { icon: Percent, title: "No rate surprises", body: "The rate on your offer is the rate you sign. We do not re-price after acceptance." },
          { icon: LifeBuoy, title: "Missed payment support", body: "Tell us before it happens and we will restructure rather than default you." },
        ]}
      />

      <FaqList
        eyebrow="Borrowing FAQ"
        title="Questions before you apply"
        items={[
          { q: "How much can Claim Bridge advance?", a: "Up to 40% of the verified claim value, capped at $10,000, once the claim has passed evidence review." },
          { q: "What if the claim recovers nothing?", a: "The bridge converts to a standard personal loan at your assessed rate, with the first three months interest free while we agree a plan." },
          { q: "Does checking my rate affect my credit?", a: "No. The initial rate check is a soft search that is not visible to other lenders." },
          { q: "Can I overpay?", a: "Yes, at any time and in any amount, with no early settlement charge on any Restitute loan." },
        ]}
      />

      <CtaBanner
        title="See your rate without touching your credit file"
        body="A soft check takes two minutes and shows the exact APR, term and monthly payment you would be offered."
        primary={{ label: "Check your rate", to: "/register" }}
        secondary={{ label: "Speak to lending", to: "/contact" }}
      />
    </SiteShell>
  );
}
