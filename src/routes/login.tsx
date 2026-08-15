import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock, Mail, MapPin, Scale, ShieldCheck, Sparkles, SunMoon } from "lucide-react";
import { authInput, authLabel } from "@/site/AuthCard";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/useTheme";

const features = [
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    subtitle: "Encrypted access and secure account controls across every session.",
  },
  {
    icon: Sparkles,
    title: "Instant Recovery",
    subtitle: "Fast refund workflows designed to recover funds quickly.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    subtitle: "See your claim status update in real time as progress happens.",
  },
  {
    icon: Scale,
    title: "No Win No Fee",
    subtitle: "Only pay when recovery is successful — no upfront charge.",
  },
];

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Member login — Restitute Banking" },
      { name: "description", content: "Sign in to your Restitute Banking account to manage claims, track recoveries and message your specialist." },
      { property: "og:title", content: "Member login — Restitute Banking" },
      { property: "og:description", content: "Sign in to manage your claims and recoveries." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/90 text-foreground shadow-lg shadow-black/5 backdrop-blur-md transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-950/90 dark:border-slate-700"
        aria-label="Toggle dark mode"
      >
        {dark ? <SunMoon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </button>

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <aside
          className="relative hidden w-full overflow-hidden px-10 py-14 text-white lg:flex lg:w-1/2 lg:flex-col"
          style={{
            background: "linear-gradient(180deg, var(--ink) 0%, var(--primary-deep) 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_20%),radial-gradient(circle_at_60%_20%,_rgba(255,255,255,0.1),_transparent_18%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent_20%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:28px_28px] opacity-60" />
          <div className="absolute left-10 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-10 top-28 h-44 w-44 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute left-24 bottom-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex grow flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">Restitute Banking</p>
              <h1 className="mt-8 max-w-lg text-5xl font-extrabold leading-tight text-white sm:text-6xl">
                Secure recovery for every refund and claim.
              </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-[1.75rem] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-white shadow-lg shadow-black/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 text-base font-semibold text-white">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/75">{feature.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-10">
          <div className="w-full max-w-md rounded-[2rem] border border-gray-200/50 bg-white/90 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-950/90">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Welcome back</p>
              <h2 className="mt-3 text-3xl font-extrabold text-foreground">Member login</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sign in to see live claim progress, message your specialist and manage your accounts.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <label className="block">
                <span className={authLabel}>Email</span>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    className={`${authInput} mt-0 pl-12 transition-transform duration-200 ease-out focus:-translate-y-1`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className={authLabel}>Password</span>
                <div className="relative mt-2">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    className={`${authInput} mt-0 pl-12 transition-transform duration-200 ease-out focus:-translate-y-1`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </label>

              {error ? (
                <p className="rounded-3xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-action px-6 py-3 text-sm font-semibold text-action-foreground transition hover:bg-action/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Sign in
              </button>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <Link to="/forgot-password" className="font-semibold text-primary hover:underline">Forgot password?</Link>
                <Link to="/claims/track" className="hover:text-foreground">Track without signing in</Link>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New here? {" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}