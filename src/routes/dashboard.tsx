import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2, LogOut } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { statusMeta, type ClaimStatus } from "@/lib/claims";
import { money } from "@/lib/format";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your recovery dashboard — Restitute Banking" },
      { name: "description", content: "Track every refund claim you have filed with Restitute Banking, see recovered amounts and message your specialist." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Your recovery dashboard — Restitute Banking" },
      { property: "og:description", content: "Track every refund claim you have filed." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const { data } = useQuery({
    queryKey: ["member", "claims", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const { data: claims } = await supabase
        .from("claims")
        .select("*")
        .eq("claimant_email", user!.email!.toLowerCase())
        .order("created_at", { ascending: false });
      return claims ?? [];
    },
  });

  if (loading || !user) {
    return (
      <SiteShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </SiteShell>
    );
  }

  const claims = data ?? [];
  const recovered = claims.reduce((sum, c) => sum + Number(c.recovered_amount ?? 0), 0);
  const inPlay = claims
    .filter((c) => !["disbursed", "declined"].includes(c.status))
    .reduce((sum, c) => sum + Number(c.amount ?? 0), 0);

  return (
    <SiteShell>
      <section className="surface-ink relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-foreground/50">
                Recovery dashboard
              </p>
              <h1 className="mt-2 truncate text-3xl font-extrabold text-ink-foreground">
                {user.email}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/" }))}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-ink-foreground/25 px-4 py-2 text-sm font-semibold text-ink-foreground"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Claims filed", value: claims.length.toLocaleString("en-US") },
              { label: "Recovered for you", value: money(recovered) },
              { label: "Currently in play", value: money(inPlay) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5"
              >
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-ink-foreground/50">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-extrabold text-ink-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="truncate text-xl font-bold text-foreground">Your claims</h2>
            <Link
              to="/claims/new"
              className="shine inline-flex shrink-0 items-center gap-2 rounded-xl bg-action px-4 py-2.5 text-sm font-semibold text-action-foreground"
            >
              File a new claim <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {claims.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                No claims yet. File one and it will appear here with live tracking.
              </p>
            ) : null}
            {claims.map((claim) => {
              const meta = statusMeta[claim.status as ClaimStatus];
              return (
                <article
                  key={claim.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-primary-deep">{claim.reference}</p>
                      <p className="mt-1 truncate text-lg font-bold text-foreground">
                        {money(Number(claim.amount), claim.currency)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{meta.blurb}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-[0.65rem] font-semibold ${meta.tone}`}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-action transition-all duration-700"
                      style={{ width: `${(meta.step / 6) * 100}%` }}
                    />
                  </div>
                  {Number(claim.recovered_amount) > 0 ? (
                    <p className="mt-3 text-xs font-semibold text-action">
                      {money(Number(claim.recovered_amount), claim.currency)} recovered so far
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}