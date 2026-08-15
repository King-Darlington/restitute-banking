import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Users, Settings, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/claims", label: "Claims", icon: FolderKanban },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin" });
  }

  const nav = (
    <nav className="space-y-1">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(link.to, link.exact)
              ? "bg-ink-foreground/12 text-ink-foreground"
              : "text-ink-foreground/65 hover:bg-ink-foreground/8 hover:text-ink-foreground",
          )}
        >
          <link.icon className="h-4 w-4 shrink-0" />
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-secondary lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="surface-ink hidden flex-col justify-between p-5 lg:flex">
        <div>
          <p className="px-3 text-sm font-extrabold tracking-tight text-ink-foreground">
            Restitute <span className="font-light">Back office</span>
          </p>
          <p className="mb-6 mt-1 px-3 text-[0.65rem] uppercase tracking-[0.18em] text-ink-foreground/45">
            Staff console
          </p>
          {nav}
        </div>
        <div className="space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-foreground/65 hover:text-ink-foreground"
          >
            View public site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-foreground/65 hover:text-ink-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="surface-ink flex items-center justify-between gap-4 px-4 py-3 lg:hidden">
          <p className="text-sm font-bold text-ink-foreground">Restitute Back office</p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-foreground/20 text-ink-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </header>
        {open ? (
          <div className="surface-ink border-t border-ink-foreground/10 p-4 lg:hidden">
            {nav}
            <button
              type="button"
              onClick={signOut}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-foreground/65"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        ) : null}

        <div className="flex-1 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-extrabold text-foreground sm:text-3xl">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                ) : null}
              </div>
            </div>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminCard({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="truncate text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}