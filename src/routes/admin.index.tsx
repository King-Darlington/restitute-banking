import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminShell, AdminCard } from "@/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { statusMeta, type ClaimStatus } from "@/lib/claims";
import { money } from "@/lib/format";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      const { data: claims } = await supabase
        .from("claims")
        .select("id, reference, claimant_name, amount, recovered_amount, currency, status, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      return claims ?? [];
    },
  });

  const claims = data ?? [];
  const open = claims.filter((c) => !["disbursed", "declined"].includes(c.status));
  const recovered = claims.reduce((sum, c) => sum + Number(c.recovered_amount ?? 0), 0);
  const exposure = open.reduce((sum, c) => sum + Number(c.amount ?? 0), 0);

  const stats = [
    { label: "Open cases", value: open.length.toLocaleString("en-US") },
    { label: "Total claims", value: claims.length.toLocaleString("en-US") },
    { label: "Recovered", value: money(recovered) },
    { label: "Amount in play", value: money(exposure) },
  ];

  return (
    <AdminShell title="Overview" subtitle="Live picture of the recovery desk.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-extrabold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <AdminCard
          title="Latest claims"
          action={
            <Link to="/admin/claims" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          }
        >
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : claims.length === 0 ? (
            <p className="text-sm text-muted-foreground">No claims filed yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {claims.slice(0, 8).map((claim) => (
                <li key={claim.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {claim.claimant_name}
                    </p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {claim.reference} · {money(Number(claim.amount), claim.currency)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold ${statusMeta[claim.status as ClaimStatus].tone}`}
                  >
                    {statusMeta[claim.status as ClaimStatus].label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard title="Pipeline by stage">
          <ul className="space-y-2">
            {Object.entries(statusMeta).map(([key, meta]) => {
              const count = claims.filter((c) => c.status === key).length;
              const pct = claims.length ? Math.round((count / claims.length) * 100) : 0;
              return (
                <li key={key}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{meta.label}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </AdminCard>
      </div>
    </AdminShell>
  );
}