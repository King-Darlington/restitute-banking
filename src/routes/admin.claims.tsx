import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { AdminShell } from "@/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { CLAIM_STATUSES, statusMeta, type ClaimStatus } from "@/lib/claims";
import type { Database } from "@/integrations/supabase/types";
import { money } from "@/lib/format";

export const Route = createFileRoute("/admin/claims")({
  component: AdminClaims,
});

function AdminClaims() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ClaimStatus>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["admin", "claims"],
    queryFn: async () => {
      const { data: claims } = await supabase
        .from("claims")
        .select("*")
        .order("created_at", { ascending: false });
      return claims ?? [];
    },
  });

  const claims = (data ?? []).filter((claim) => {
    const matchesStatus = filter === "all" || claim.status === filter;
    const term = query.trim().toLowerCase();
    const matchesTerm =
      !term ||
      claim.reference.toLowerCase().includes(term) ||
      claim.claimant_name.toLowerCase().includes(term) ||
      claim.claimant_email.toLowerCase().includes(term);
    return matchesStatus && matchesTerm;
  });

  type ClaimUpdate = Database["public"]["Tables"]["claims"]["Update"];

  async function updateClaim(id: string, patch: ClaimUpdate, eventTitle: string) {
    await supabase.from("claims").update(patch).eq("id", id);
    await supabase.from("claim_events").insert({
      claim_id: id,
      title: eventTitle,
      status: patch.status ?? null,
    });
    await queryClient.invalidateQueries({ queryKey: ["admin"] });
  }

  return (
    <AdminShell title="Claims" subtitle="Every recovery file, newest first.">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reference, name or email"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | ClaimStatus)}
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="all">All statuses</option>
          {CLAIM_STATUSES.map((status) => (
            <option key={status} value={status}>
              {statusMeta[status].label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 space-y-3">
        {claims.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            No claims match this view.
          </p>
        ) : null}
        {claims.map((claim) => (
          <article key={claim.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-foreground">{claim.claimant_name}</p>
                <p className="truncate text-xs text-muted-foreground">{claim.claimant_email}</p>
                <p className="mt-1 font-mono text-xs text-primary-deep">{claim.reference}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-extrabold text-foreground">
                  {money(Number(claim.amount), claim.currency)}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold ${statusMeta[claim.status as ClaimStatus].tone}`}
                >
                  {statusMeta[claim.status as ClaimStatus].label}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenId(openId === claim.id ? null : claim.id)}
              className="mt-3 text-xs font-semibold text-primary hover:underline"
            >
              {openId === claim.id ? "Hide case" : "Manage case"}
            </button>

            {openId === claim.id ? (
              <div className="mt-4 grid gap-4 border-t border-border pt-4 lg:grid-cols-2">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Member statement
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">
                    {claim.description || "No statement supplied."}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Counterparty</dt>
                      <dd className="font-medium text-foreground">{claim.counterparty || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Incident date</dt>
                      <dd className="font-medium text-foreground">{claim.incident_date || "—"}</dd>
                    </div>
                  </dl>
                </div>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Status
                    </span>
                    <select
                      value={claim.status}
                      onChange={(e) =>
                        updateClaim(
                          claim.id,
                          { status: e.target.value as ClaimStatus },
                          `Status changed to ${statusMeta[e.target.value as ClaimStatus].label}`,
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    >
                      {CLAIM_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {statusMeta[status].label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Recovered amount
                    </span>
                    <input
                      type="number"
                      defaultValue={Number(claim.recovered_amount ?? 0)}
                      onBlur={(e) =>
                        updateClaim(
                          claim.id,
                          { recovered_amount: Number(e.target.value) },
                          `Recovered amount set to ${money(Number(e.target.value), claim.currency)}`,
                        )
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Internal notes
                    </span>
                    <textarea
                      rows={3}
                      defaultValue={claim.internal_notes ?? ""}
                      onBlur={(e) =>
                        updateClaim(claim.id, { internal_notes: e.target.value }, "Internal note updated")
                      }
                      className="mt-1 w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </AdminShell>
  );
}