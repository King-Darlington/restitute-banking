import { useState, type FormEvent } from "react";
import { Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { statusMeta, type ClaimStatus } from "@/lib/claims";
import { money, shortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type TrackedClaim = {
  reference: string;
  claimant_name: string;
  status: ClaimStatus;
  amount: number;
  currency: string;
  recovered_amount: number;
  submitted_at: string;
  updated_at: string;
};

type TimelineEntry = {
  title: string;
  note: string | null;
  status: ClaimStatus | null;
  created_at: string;
};

export function ClaimLookup({ compact = false }: { compact?: boolean }) {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [claim, setClaim] = useState<TrackedClaim | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setClaim(null);
    setTimeline([]);

    const { data, error: rpcError } = await supabase.rpc("track_claim", {
      _reference: reference,
      _email: email,
    });

    if (rpcError) {
      setError("We could not reach the claims service. Please try again.");
    } else if (!data || data.length === 0) {
      setError("No claim matches that reference and email. Check both and try again.");
    } else {
      setClaim(data[0] as unknown as TrackedClaim);
      const { data: events } = await supabase.rpc("track_claim_timeline", {
        _reference: reference,
        _email: email,
      });
      setTimeline((events ?? []) as unknown as TimelineEntry[]);
    }
    setLoading(false);
  }

  return (
    <div className={cn("rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8")}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-deep">
          <Search className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">Track a claim</h3>
          <p className="text-xs text-muted-foreground">
            Enter your reference code and the email on the claim.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className={cn("mt-6 grid gap-3", !compact && "sm:grid-cols-2")}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Reference
          </span>
          <input
            required
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="RB-104217"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 font-mono text-sm uppercase tracking-wider outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Email on the claim
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "shine flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60",
            !compact && "sm:col-span-2",
          )}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Checking…" : "Check status"}
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {claim ? (
        <div className="mt-6 rounded-2xl border border-border bg-secondary/60 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {claim.reference}
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">{claim.claimant_name}</p>
            </div>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.1em]",
                statusMeta[claim.status].tone,
              )}
            >
              {statusMeta[claim.status].label}
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">{statusMeta[claim.status].blurb}</p>

          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
            {[
              { label: "Claimed", value: money(claim.amount, claim.currency) },
              { label: "Recovered", value: money(claim.recovered_amount, claim.currency) },
              { label: "Submitted", value: shortDate(claim.submitted_at) },
              { label: "Last update", value: shortDate(claim.updated_at) },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-bold text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>

          {timeline.length ? (
            <ol className="mt-6 space-y-4 border-t border-border pt-5">
              {timeline.map((entry, index) => (
                <li key={`${entry.title}-${index}`} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{entry.title}</p>
                    {entry.note ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">{entry.note}</p>
                    ) : null}
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {shortDate(entry.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
