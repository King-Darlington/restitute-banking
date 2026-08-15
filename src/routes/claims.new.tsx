import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/site/SiteShell";
import { PageHero } from "@/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { CURRENCIES, LOSS_TYPES, type LossType } from "@/lib/claims";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/refund-dispute.png";

export const Route = createFileRoute("/claims/new")({
  head: () => ({
    meta: [
      { title: "File a refund claim — Restitute Banking" },
      { name: "description", content: "Start a refund recovery file in under five minutes. No upfront fees, no account required, live tracking from the moment you submit." },
      { property: "og:title", content: "File a refund claim" },
      { property: "og:description", content: "Start a refund recovery file in under five minutes. No upfront fees." },
    ],
  }),
  component: NewClaimPage,
});

const STEPS = ["Your details", "The loss", "Evidence", "Review"];

type FormState = {
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  country: string;
  loss_type: LossType;
  amount: string;
  currency: string;
  incident_date: string;
  counterparty: string;
  description: string;
  consent: boolean;
};

const initialState: FormState = {
  claimant_name: "",
  claimant_email: "",
  claimant_phone: "",
  country: "United States",
  loss_type: "unauthorized_transaction",
  amount: "",
  currency: "USD",
  incident_date: "",
  counterparty: "",
  description: "",
  consent: false,
};

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground";

function NewClaimPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canContinue = () => {
    if (step === 0) return form.claimant_name.trim().length > 1 && /.+@.+\..+/.test(form.claimant_email);
    if (step === 1) return Number(form.amount) > 0;
    if (step === 2) return form.description.trim().length > 10;
    return form.consent;
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: insertError } = await supabase
      .from("claims")
      .insert({
        claimant_name: form.claimant_name.trim(),
        claimant_email: form.claimant_email.trim().toLowerCase(),
        claimant_phone: form.claimant_phone.trim() || null,
        country: form.country || null,
        loss_type: form.loss_type,
        amount: Number(form.amount),
        currency: form.currency,
        incident_date: form.incident_date || null,
        counterparty: form.counterparty.trim() || null,
        description: form.description.trim(),
      })
      .select("reference")
      .single();

    if (insertError || !data) {
      setError("We could not file that claim just now. Please try again or call the recovery desk.");
    } else {
      setReference(data.reference);
    }
    setLoading(false);
  }

  if (reference) {
    return (
      <SiteShell>
        <section className="bg-background py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-action-soft text-action">
              <Check className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold text-foreground">Your claim is filed</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Keep this reference safe — you can track your recovery with it at any time, and a
              specialist will contact you at {form.claimant_email} within one business day.
            </p>
            <p className="mt-8 rounded-2xl border border-border bg-card px-6 py-5 font-mono text-2xl font-bold tracking-[0.2em] text-primary-deep shadow-soft">
              {reference}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/claims/track"
                className="shine rounded-xl bg-action px-6 py-3.5 text-sm font-semibold text-action-foreground"
              >
                Track this claim
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-foreground"
              >
                Create an account
              </Link>
            </div>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHero
        image={heroImage}
        eyebrow="Refund claim"
        title={<>File your claim in five minutes.</>}
        intro="No account needed, no upfront fee, and nothing to pay unless we recover your money. Everything you enter is encrypted in transit and at rest."
        breadcrumb="File a claim"
      />

      <section className="bg-background py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ol className="grid grid-cols-4 gap-2">
            {STEPS.map((label, index) => (
              <li key={label}>
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-colors duration-500",
                    index <= step ? "bg-action" : "bg-border",
                  )}
                />
                <p
                  className={cn(
                    "mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
                    index <= step ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </p>
              </li>
            ))}
          </ol>

          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            {step === 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className={labelClass}>Full name</span>
                  <input
                    className={cn(inputClass, "mt-2")}
                    value={form.claimant_name}
                    onChange={(e) => set("claimant_name", e.target.value)}
                    placeholder="Jordan Rivera"
                    required
                  />
                </label>
                <label>
                  <span className={labelClass}>Email</span>
                  <input
                    type="email"
                    className={cn(inputClass, "mt-2")}
                    value={form.claimant_email}
                    onChange={(e) => set("claimant_email", e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label>
                  <span className={labelClass}>Phone (optional)</span>
                  <input
                    className={cn(inputClass, "mt-2")}
                    value={form.claimant_phone}
                    onChange={(e) => set("claimant_phone", e.target.value)}
                    placeholder="+1 555 0100"
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Country</span>
                  <input
                    className={cn(inputClass, "mt-2")}
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className={labelClass}>What happened?</span>
                  <select
                    className={cn(inputClass, "mt-2")}
                    value={form.loss_type}
                    onChange={(e) => set("loss_type", e.target.value as LossType)}
                  >
                    {LOSS_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={labelClass}>Amount lost</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    className={cn(inputClass, "mt-2")}
                    value={form.amount}
                    onChange={(e) => set("amount", e.target.value)}
                    placeholder="2500"
                    required
                  />
                </label>
                <label>
                  <span className={labelClass}>Currency</span>
                  <select
                    className={cn(inputClass, "mt-2")}
                    value={form.currency}
                    onChange={(e) => set("currency", e.target.value)}
                  >
                    {CURRENCIES.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={labelClass}>Date of incident</span>
                  <input
                    type="date"
                    className={cn(inputClass, "mt-2")}
                    value={form.incident_date}
                    onChange={(e) => set("incident_date", e.target.value)}
                  />
                </label>
                <label>
                  <span className={labelClass}>Who received the money?</span>
                  <input
                    className={cn(inputClass, "mt-2")}
                    value={form.counterparty}
                    onChange={(e) => set("counterparty", e.target.value)}
                    placeholder="Merchant, bank or platform"
                  />
                </label>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <label>
                  <span className={labelClass}>Tell us the story</span>
                  <textarea
                    rows={7}
                    className={cn(inputClass, "mt-2 resize-y")}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Dates, amounts, what you were told, and anything you have already tried."
                    required
                  />
                </label>
                <p className="mt-4 rounded-2xl border border-border bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  Do not attach documents yet. Once your file is open, your specialist will list the
                  exact evidence that strengthens your case — and nothing you do not need.
                </p>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    ["Name", form.claimant_name],
                    ["Email", form.claimant_email],
                    ["Phone", form.claimant_phone || "—"],
                    ["Country", form.country],
                    ["Loss type", LOSS_TYPES.find((l) => l.value === form.loss_type)?.label ?? ""],
                    ["Amount", `${form.currency} ${form.amount || "0"}`],
                    ["Incident date", form.incident_date || "—"],
                    ["Counterparty", form.counterparty || "—"],
                  ].map(([key, value]) => (
                    <div key={key} className="rounded-xl border border-border bg-secondary px-4 py-3">
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {key}
                      </dt>
                      <dd className="mt-1 font-semibold text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
                <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                  />
                  <span>
                    I confirm the details are accurate and authorise Restitute Banking to act as my
                    representative in recovering these funds under the{" "}
                    <Link to="/terms" className="font-semibold text-primary underline">
                      terms of service
                    </Link>
                    .
                  </span>
                </label>
              </div>
            ) : null}

            {error ? (
              <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground disabled:opacity-40"
              >
                Back
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => canContinue() && setStep((s) => s + 1)}
                  disabled={!canContinue()}
                  className="shine rounded-xl bg-action px-6 py-3 text-sm font-semibold text-action-foreground disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canContinue() || loading}
                  className="shine inline-flex items-center gap-2 rounded-xl bg-action px-6 py-3 text-sm font-semibold text-action-foreground disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  Submit claim
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}