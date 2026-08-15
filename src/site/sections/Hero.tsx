import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Landmark, ShieldCheck, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-recovery.jpg";
import { Reveal } from "../Reveal";
import { compactMoney } from "@/lib/format";
import type { SiteSettings } from "@/lib/settings.functions";

export function Hero({ settings }: { settings: SiteSettings }) {
  const recovered = compactMoney(Number(settings["recovered_total"] ?? 0));
  const resolved = Number(settings["claims_resolved"] ?? 0).toLocaleString("en-US");

  const stats = [
    {
      icon: Landmark,
      title: "Routing number",
      body: settings["routing_number"] ?? "251480576",
      accent: "bg-primary/15 text-primary",
    },
    {
      icon: Clock3,
      title: "Recovery desk",
      body: "Mon–Fri 8AM–8PM · Sat 9AM–1PM",
      accent: "bg-action/15 text-action",
    },
    {
      icon: ShieldCheck,
      title: "24/7 fraud line",
      body: settings["support_phone"] ?? "1-800-RESTITUTE",
      accent: "bg-violet-500/15 text-violet-300",
    },
  ];

  return (
    <section className="surface-ink relative min-h-screen overflow-hidden">
      {/* Mobile / tablet background photography */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/92 via-ink/88 to-ink/95" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
      <div
        className="float-slower pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "var(--gradient-brand)", opacity: 0.28 }}
      />
      <div
        className="float-slow pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "var(--gradient-action)", opacity: 0.2 }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-action/30 bg-action/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-action">
              <ShieldCheck className="h-3.5 w-3.5" />
              Refund recovery, done properly
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-ink-foreground sm:text-5xl lg:text-[3.65rem]">
              Money that left wrongly
              <span className="block text-action">belongs back with you.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
              Restitute Banking pairs everyday accounts with a dedicated recovery desk. File a claim
              in five minutes, watch every stage in real time, and pay nothing until your funds are
              actually returned.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/claims/new"
                className="shine pulse-action inline-flex items-center gap-2 rounded-xl bg-action px-6 py-3.5 text-sm font-semibold text-action-foreground transition-transform hover:-translate-y-0.5"
              >
                Request a refund
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/claims/track"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-foreground/25 px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
              >
                Track an existing claim
              </Link>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-foreground/15 pt-8">
              {[
                { value: recovered, label: "Recovered for members" },
                { value: `${resolved}+`, label: "Claims resolved" },
                { value: `${settings["recovery_rate"] ?? "87"}%`, label: "Success rate" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-extrabold text-ink-foreground sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-foreground/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal direction="scale" delay={200} className="relative hidden lg:block">
          <div className="relative overflow-hidden rounded-3xl border border-ink-foreground/15 shadow-lift">
            <img
              src={heroImage}
              alt="A Restitute Banking member reviewing a completed refund on a laptop"
              width={1600}
              height={1104}
              className="h-[22rem] w-full object-cover sm:h-[26rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-ink/70 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs text-ink-foreground/70">
                <span className="font-mono tracking-widest">CLAIM RB-104217</span>
                <span className="rounded-full bg-action/20 px-2 py-0.5 font-semibold text-action">
                  Funds returned
                </span>
              </div>
              <p className="mt-2 text-2xl font-extrabold text-ink-foreground">$8,420.00</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-foreground/15">
                <div className="h-full w-full rounded-full bg-action" />
              </div>
              <p className="mt-2 text-[0.7rem] text-ink-foreground/60">
                Recovered in 14 days · Unauthorised card transaction
              </p>
            </div>
          </div>

          <div className="float-slow absolute -left-4 top-8 hidden rounded-2xl border border-white/15 bg-ink/75 px-4 py-3 backdrop-blur-xl lg:block">
            <p className="flex items-center gap-2 text-xs font-semibold text-ink-foreground">
              <Clock3 className="h-4 w-4 text-action" />
              Avg. {settings["avg_days"] ?? "19"} days to resolution
            </p>
          </div>
          <div className="float-slower absolute -right-4 bottom-24 hidden rounded-2xl border border-white/15 bg-ink/75 px-4 py-3 backdrop-blur-xl lg:block">
            <p className="flex items-center gap-2 text-xs font-semibold text-ink-foreground">
              <TrendingUp className="h-4 w-4 text-action" />
              No win, no fee
            </p>
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/80">
          <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-white animate-bounce" />
        </div>
      </div>

      <div className="relative border-t border-ink-foreground/12">
        <div className="mx-auto grid max-w-7xl gap-px px-4 sm:px-6 md:grid-cols-3">
          {stats.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 90}
              className="group flex items-center gap-4 rounded-3xl bg-ink/95 p-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.accent}`}>
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-foreground/50">
                  {item.title}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink-foreground">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
