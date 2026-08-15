import { Link } from "@tanstack/react-router";
import { Bell, Gauge, ShieldCheck, WifiOff } from "lucide-react";
import appImage from "@/assets/mobile-app.jpg";
import { Reveal } from "../Reveal";

const features = [
  { icon: WifiOff, title: "Works offline", body: "Your claim file travels with you" },
  { icon: Gauge, title: "Instant loading", body: "Native speed, no app store" },
  { icon: Bell, title: "Stage alerts", body: "Pinged the moment status moves" },
  { icon: ShieldCheck, title: "Bank-grade security", body: "Biometric unlock and device binding" },
];

export function AppShowcase() {
  return (
    <section className="surface-ink relative overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal direction="left">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink-foreground/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-foreground/75">
            Get our mobile app
          </span>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-ink-foreground sm:text-4xl">
            Your claim, your balance, your evidence — in one pocket.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-foreground/70">
            Restitute is a progressive web app: install it straight from the browser, get native
            performance, and keep working on your claim even when the signal drops.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80}>
                <div className="flex items-start gap-3 rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.06] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-action/15 text-action">
                    <feature.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-foreground">{feature.title}</p>
                    <p className="mt-0.5 text-xs text-ink-foreground/60">{feature.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/app"
              className="shine rounded-xl bg-action px-6 py-3.5 text-sm font-semibold text-action-foreground transition-transform hover:-translate-y-0.5"
            >
              Install the app
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-ink-foreground/25 px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
            >
              Open web banking
            </Link>
          </div>
        </Reveal>

        <Reveal direction="right" delay={140} className="relative">
          <div className="float-slow relative mx-auto max-w-sm overflow-hidden rounded-[2.5rem] border border-ink-foreground/15 shadow-lift">
            <img
              src={appImage}
              alt="The Restitute Banking mobile app open on a phone"
              loading="lazy"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="float-slower absolute left-0 top-10 hidden w-56 rounded-2xl border border-white/15 bg-ink/80 p-4 backdrop-blur-xl sm:block">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-foreground/55">
              Available balance
            </p>
            <p className="mt-1 text-xl font-extrabold text-ink-foreground">$12,847.50</p>
            <p className="text-[0.65rem] text-ink-foreground/50">•••• 1234</p>
          </div>
          <div className="float-slow absolute bottom-8 right-0 hidden w-52 rounded-2xl border border-white/15 bg-ink/80 p-4 backdrop-blur-xl sm:block">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-foreground/55">
              Claim update
            </p>
            <p className="mt-1 text-sm font-semibold text-action">Recovery approved</p>
            <p className="text-[0.65rem] text-ink-foreground/50">RB-104219 · 2 min ago</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
