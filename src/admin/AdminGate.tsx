import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useIsStaff } from "@/hooks/useAuth";
import { seedBuiltInAdmin, checkBuiltInAdmin } from "@/lib/admin.functions";

export function AdminGate({ children }: { children: ReactNode }) {
  const { isStaff, loading, user } = useIsStaff();
  const seed = useServerFn(seedBuiltInAdmin);
  const checkAdmin = useServerFn(checkBuiltInAdmin);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await checkAdmin({});
        setAdminExists(result.exists);
      } catch {
        setAdminExists(true);
      }
    };
    void load();
  }, [checkAdmin]);

  useEffect(() => {
    if (adminExists === false) {
      setShowCreate(true);
    }
  }, [adminExists]);

  if (loading || adminExists === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (user && isStaff) return <>{children}</>;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    if (showCreate) {
      const { ok, message } = await seed({});
      setBusy(false);
      if (!ok) {
        setError(message ?? "Could not create admin account.");
        return;
      }
      setShowCreate(false);
      setAdminExists(true);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError("Those credentials were not accepted.");
    }
  }

  const input =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="surface-ink relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 bg-grid text-ink-foreground/40 opacity-20" />
      <div className="relative w-full max-w-sm rounded-3xl border border-border bg-card p-7 shadow-lift">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary-deep">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-xl font-extrabold text-foreground">Staff sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Restricted area. Authorised Restitute Banking staff only.
        </p>
        {adminExists === false ? (
          <p className="mt-4 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
            No admin account was found. Create the built-in administrator account once and then sign in normally.
          </p>
        ) : null}
        {user && !isStaff ? (
          <p className="mt-4 rounded-xl border border-warn/40 bg-warn/10 px-4 py-3 text-xs text-foreground">
            You are signed in, but this account has no staff role.
          </p>
        ) : null}
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          {!showCreate ? (
            <>
              <input
                type="email"
                className={input}
                placeholder="Staff email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className={input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          ) : (
            <div className="rounded-xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary">
              This will create the default admin account at
              <strong className="block mt-2">admin@restitutebanking.com</strong>
              <strong className="block">Restitute@Admin2026</strong>
            </div>
          )}
          {error ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-xs text-destructive">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {showCreate ? 'Create admin account' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}