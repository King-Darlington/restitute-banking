import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import type { SiteSettings } from "@/lib/settings.functions";

export function RateBoard({ settings }: { settings: SiteSettings }) {
  const rates = [
    {
      value: `${settings["rate_savings_apy"] ?? "3.75"}%`,
      unit: "APY*",
      caption: "High yield savings",
      note: "Recovered funds start earning the day they land.",
      tag: "Featured",
    },
    {
      value: `${settings["rate_certificate_apy"] ?? "3.65"}%`,
      unit: "APY*",
      caption: "18 month certificate",
      note: "Lock a rate while your claim is in negotiation.",
      tag: "Savings",
    },
    {
      value: `${settings["rate_card_apr"] ?? "4.00"}%`,
      unit: "APR*",
      caption: "Restitute credit card",
      note: "Freeze, dispute and refund from one screen.",
      tag: "Credit",
    },
    {
      value: `${settings["rate_loan_apr"] ?? "15.49"}%`,
      unit: "APR*",
      caption: "Standard loan rate",
      note: "Bridge finance against an approved claim.",
      tag: "Lending",
    },
  ];

  const ticker = [
    "No upfront fees on any recovery claim",
    "Median resolution 19 days",
    "Regulated dispute filing under scheme rules",
    "Ombudsman escalation included",
    "Funds insured to the federal limit",
  ];

  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Restitute rates"
          title="Rates published in the open, updated by our team"
          intro="Every figure below is managed from our staff console, so what you see here is what our specialists see."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rates.map((rate, index) => (
            <Reveal key={rate.caption} delay={index * 90} direction="scale">
              <article className="lift group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-2">
                <span className="absolute right-5 top-5 rounded-full bg-primary-soft px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary-deep">
                  {rate.tag}
                </span>
                <p className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-gradient-brand">{rate.value}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{rate.unit}</span>
                </p>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                  {rate.caption}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{rate.note}</p>
                <span className="mt-6 block h-1 w-12 rounded-full bg-primary transition-all duration-500 group-hover:w-20" />
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          *Annual Percentage Yield / Rate. Rates are subject to change. Terms and conditions apply.
        </p>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-border bg-card/70 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...ticker, ...ticker].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-action" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
