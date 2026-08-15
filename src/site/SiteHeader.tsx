import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, Sparkles, X, ShieldCheck, Phone, SunMoon } from "lucide-react";
import { navGroups } from "./nav";
import { BrandLockup } from "./Brand";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();
  const { dark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <div className="hidden bg-ink text-ink-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs">
          <p className="flex items-center gap-2 text-ink-foreground/80">
            <ShieldCheck className="h-3.5 w-3.5 text-action" />
            No upfront fees — you only pay when we recover your money.
          </p>
          <div className="flex items-center gap-6 text-ink-foreground/75">
            <a href="tel:18007378488" className="flex items-center gap-1.5 hover:text-ink-foreground">
              <Phone className="h-3.5 w-3.5" /> 1-800-RESTITUTE
            </a>
            <span className="font-mono tracking-wider">ROUTING 251480576</span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/85 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem]">
          <Link to="/" aria-label="Restitute Banking home">
            <BrandLockup />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <div className="pointer-events-none absolute left-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-primary/20 blur-xl opacity-90 animate-pulse" style={{ animationDelay: "0s" }} />
            <div className="pointer-events-none absolute left-1/2 top-2 h-24 w-24 -translate-x-1/2 rounded-full bg-primary/15 blur-xl opacity-90 animate-pulse" style={{ animationDelay: "0.25s" }} />
            <div className="pointer-events-none absolute right-16 top-1/3 h-36 w-36 -translate-y-1/2 rounded-full bg-primary/20 blur-xl opacity-90 animate-pulse" style={{ animationDelay: "0.5s" }} />

            {navGroups.map((group) =>
              group.links ? (
                <div key={group.label} className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="relative overflow-hidden">
                      <span className="absolute inset-0 scale-0 rounded-md bg-primary-soft transition-transform duration-300 group-hover:scale-100" />
                      <span className="relative">{group.label}</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full w-80 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-lift">
                      {group.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                        >
                          <span className="block text-sm font-semibold text-foreground">{link.label}</span>
                          {link.description ? (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {link.description}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={group.to}
                  to={group.to!}
                  data-active={isActive(group.to!)}
                  className="group relative overflow-hidden rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground data-[active=true]:text-primary"
                >
                  <span className="absolute inset-0 scale-0 rounded-md bg-primary-soft transition-transform duration-300 group-hover:scale-100" />
                  <span className="relative">{group.label}</span>
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground"
            >
              {dark ? <SunMoon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </button>
            <Link
              to={user ? "/dashboard" : "/login"}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {user ? "My dashboard" : "Login"}
            </Link>
            {!user ? (
              <Link
                to="/register"
                className="rounded-xl border border-primary/35 bg-primary-soft px-4 py-2 text-sm font-semibold text-primary-deep transition-colors hover:border-primary/60"
              >
                Sign up
              </Link>
            ) : null}
            <Link
              to="/claims/new"
              className="group relative overflow-hidden rounded-xl bg-action px-4 py-2 text-sm font-semibold text-action-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Request refund
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top overflow-y-auto border-b border-border bg-background transition-all duration-300 lg:hidden",
          open
            ? "max-h-[calc(100dvh-4rem)] opacity-100 animate-open-menu"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav className="space-y-1 px-4 py-5" aria-label="Mobile">
          <div className="px-2 pb-3">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground"
            >
              {dark ? <SunMoon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </button>
          </div>
          {navGroups.map((group) =>
            group.links ? (
              <div key={group.label} className="rounded-xl border border-border/70">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => (v === group.label ? null : group.label))}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      expanded === group.label && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    expanded === group.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-1 px-2 pb-3">
                      {group.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="group block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                        >
                          <span className="inline-flex items-center justify-between gap-2 transition-transform duration-200 group-hover:translate-x-2">
                            {link.label}
                            <ChevronRight className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={group.to}
                to={group.to!}
                className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-muted"
              >
                {group.label}
              </Link>
            ),
          )}
          <div className="grid gap-2 pt-3">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold"
            >
              {user ? "My dashboard" : "Login"}
            </Link>
            {!user ? (
              <Link
                to="/register"
                className="rounded-xl border border-primary/35 bg-primary-soft px-4 py-3 text-center text-sm font-semibold text-primary-deep"
              >
                Sign up
              </Link>
            ) : null}
            <Link
              to="/claims/new"
              className="rounded-xl bg-action px-4 py-3 text-center text-sm font-semibold text-action-foreground"
            >
              Request refund
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
