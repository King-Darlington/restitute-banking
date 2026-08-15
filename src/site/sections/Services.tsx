import { Link } from "@tanstack/react-router";
import {
  Banknote,
  Briefcase,
  CreditCard,
  HandCoins,
  LifeBuoy,
  PiggyBank,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const services = [
  {
    icon: LifeBuoy,
    title: "Refund recovery",
    body: "Our core desk. Unauthorised payments, undelivered goods, wire fraud and broker losses, filed under the right scheme.",
    to: "/claims/new",
    span: "lg:col-span-2 lg:row-span-2",
    feature: true,
  },
  {
    icon: PiggyBank,
    title: "Deposit accounts",
    body: "High-yield savings and everyday checking with instant dispute buttons on every line.",
    to: "/personal-banking",
  },
  {
    icon: CreditCard,
    title: "Cards",
    body: "Freeze, unfreeze and dispute in one tap, with chargeback paperwork prefilled.",
    to: "/cards",
  },
  {
    icon: Banknote,
    title: "Loans & credit",
    body: "Bridge finance against an approved claim so life does not stall while we recover.",
    to: "/loans",
  },
  {
    icon: Briefcase,
    title: "Business banking",
    body: "Merchant-side chargeback defence, evidence packs and settlement reporting.",
    to: "/business-banking",
  },
  {
    icon: HandCoins,
    title: "Grants & aid",
    body: "Hardship grants for members waiting on a recovery, paid within five working days.",
    to: "/grants",
  },
];

export function Services() {
  return (
    <section className="surface-ink relative overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our services"
          title="How can we help you today?"
          intro="A full-service bank wrapped around a recovery desk — so the institution holding your money is the same one fighting to get it back."
          tone="dark"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 70}
              direction="scale"
              className={service.span ?? ""}
            >
              <Link
                to={service.to}
                className={`lift group relative overflow-hidden flex h-full flex-col rounded-3xl border border-ink-foreground/12 bg-ink-foreground/[0.06] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-action/40 ${
                  service.feature ? "justify-between" : ""
                }`}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-transform duration-700 group-hover:translate-x-full group-hover:opacity-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-action/15 text-action transition-transform duration-500 group-hover:scale-110">
                  <service.icon className="h-6 w-6" />
                </span>
                <div className={service.feature ? "mt-10" : "mt-5"}>
                  <h3
                    className={`font-bold text-ink-foreground ${
                      service.feature ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-2 leading-relaxed text-ink-foreground/70 ${
                      service.feature ? "text-base" : "text-sm"
                    }`}
                  >
                    {service.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-action">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
