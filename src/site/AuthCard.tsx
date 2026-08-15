import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BrandLockup } from "./Brand";
import { ShieldCheck, Lock, Clock3 } from "lucide-react";

export const authInput =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
export const authLabel =
  "block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground";

export function AuthCard({
  title,
  intro,
  children,
  footer,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <div className="surface-ink relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
        <div
          className="float-slow pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--gradient-brand)", opacity: 0.3 }}
        />
        <Link to="/" className="relative">
          <BrandLockup tone="inverse" />
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-3xl font-extrabold leading-tight text-ink-foreground">
            Money that left wrongly belongs back with you.
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-ink-foreground/75">
            {[
              { icon: ShieldCheck, text: "No upfront fees — you pay only on recovery." },
              { icon: Lock, text: "Bank-grade encryption on every document you share." },
              { icon: Clock3, text: "Live claim tracking, updated the moment anything changes." },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-action" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-ink-foreground/45">
          Routing 251480576 · Member protections apply
        </p>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-14 sm:px-8">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden">
            <BrandLockup />
          </Link>
          <h1 className="mt-8 text-3xl font-extrabold text-foreground lg:mt-0">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</p>
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6 text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}