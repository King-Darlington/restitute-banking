import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AuthCard, authInput, authLabel } from "@/site/AuthCard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Restitute Banking" },
      { name: "description", content: "Request a secure password reset link for your Restitute Banking member account." },
      { property: "og:title", content: "Reset your password — Restitute Banking" },
      { property: "og:description", content: "Request a secure password reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  }

  return (
    <AuthCard
      title="Forgot your password?"
      intro="Enter the email on your account and we will send a secure reset link."
      footer={
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <p className="rounded-2xl border border-border bg-secondary px-5 py-4 text-sm text-muted-foreground">
          If an account exists for {email}, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className={authLabel}>Email</span>
            <input
              type="email"
              className={`${authInput} mt-2`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {error ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-action px-6 py-3.5 text-sm font-semibold text-action-foreground disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Send reset link
          </button>
        </form>
      )}
    </AuthCard>
  );
}