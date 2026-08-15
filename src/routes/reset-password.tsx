import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AuthCard, authInput, authLabel } from "@/site/AuthCard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — Restitute Banking" },
      { name: "description", content: "Choose a new password for your Restitute Banking member account." },
      { property: "og:title", content: "Set a new password — Restitute Banking" },
      { property: "og:description", content: "Choose a new password for your member account." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthCard title="Set a new password" intro="Choose something long and unique to this account.">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className={authLabel}>New password</span>
          <input
            type="password"
            minLength={8}
            className={`${authInput} mt-2`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className={authLabel}>Confirm password</span>
          <input
            type="password"
            minLength={8}
            className={`${authInput} mt-2`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          Update password
        </button>
      </form>
    </AuthCard>
  );
}