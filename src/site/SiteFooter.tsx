import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerColumns } from "./nav";
import { BrandLockup } from "./Brand";

export function SiteFooter() {
  return (
    <footer className="surface-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div>
            <BrandLockup tone="inverse" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
              Restitute Banking is a member-owned institution built around one promise: money that
              left your account wrongly should come back. We combine everyday banking with a
              dedicated recovery desk.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-foreground/70">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-action" /> 1-800-RESTITUTE (24/7)
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-action" /> claims@restitutebanking.com
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-action" />
                <span>
                  118 Recovery Row, Financial District
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-foreground/50">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-foreground/15 pt-8 text-xs text-ink-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Restitute Banking. All rights reserved.</p>
          <p className="font-mono tracking-wider">
            Routing 251480576 · Deposits federally insured · Equal Housing Lender
          </p>
        </div>
      </div>
    </footer>
  );
}
