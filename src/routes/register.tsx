import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle, Loader2, MailCheck, Sparkles, SunMoon } from "lucide-react";
import { authInput, authLabel } from "@/site/AuthCard";
import { PageLoader } from "@/site/PageLoader";
import { supabase } from "@/integrations/supabase/client";
import teamImage from "@/assets/team-office.jpg";
import { useTheme } from "@/hooks/useTheme";

const BENEFITS = [
  {
    title: "No upfront fees",
    description: "Only pay when your recovery succeeds.",
  },
  {
    title: "Live claim tracking",
    description: "See every status update as it happens.",
  },
  {
    title: "Named specialist on every case",
    description: "Personal support from a dedicated recovery expert.",
  },
  {
    title: "FDIC insured accounts",
    description: "Your deposits are protected with insured banking.",
  },
];

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Open a Restitute Banking account" },
      { name: "description", content: "Create a free Restitute Banking account to file refund claims, track recoveries live and hold everyday funds with dispute cover." },
      { property: "og:title", content: "Open a Restitute Banking account" },
      { property: "og:description", content: "Create a free account to file and track refund claims." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stepLoading, setStepLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const stepLabels = ["Account details", "Secure verification", "Review & submit"];

  function validateStep() {
    if (step === 1) {
      if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
        setError("Please fill in your name and email to continue.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!form.phone.trim() || form.password.length < 8 || form.password !== form.confirm_password) {
        if (!form.phone.trim()) {
          setError("A phone number is required for secure verification.");
        } else if (form.password.length < 8) {
          setError("Password must be at least 8 characters.");
        } else {
          setError("Passwords do not match.");
        }
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!acceptedTerms) {
        setError("You must agree to the terms and privacy policy before continuing.");
        return false;
      }
      return true;
    }

    return true;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (step < 3) {
      // keep step-by-step flow for onboarding
      if (!validateStep()) return;
      setStepLoading(true);
      window.setTimeout(() => {
        setStep((currentStep) => currentStep + 1);
        setStepLoading(false);
      }, 260);
      return;
    }

    // DEVELOPMENT MODE: bypass Supabase and go straight to dashboard
    setLoading(true);
    try {
      navigate({ to: "/dashboard" });
      return;
    } finally {
      setLoading(false);
    }
  }

  function back() {
    setError(null);
    setStep(step - 1);
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {(stepLoading || loading) ? <PageLoader durationMs={loading ? 10000 : 800} /> : null}
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background/90 text-foreground shadow-lg shadow-black/5 backdrop-blur-md transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-950/90 dark:border-slate-700"
        aria-label="Toggle dark mode"
      >
        {dark ? <SunMoon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </button>
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <aside className="relative hidden w-full overflow-hidden px-6 py-10 text-white lg:flex lg:w-1/2 lg:flex-col">
          <img src={teamImage} alt="Team working" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/88 via-ink/84 to-ink/92 opacity-92" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.06),transparent_18%)] opacity-70" />
          <div className="absolute left-10 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-12 top-28 h-44 w-44 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute left-24 bottom-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex grow flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">Restitute Banking</p>
              <h1 className="mt-6 max-w-lg text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:mt-8 lg:text-5xl">
                Secure onboarding with recovery-grade protection.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 lg:text-base">
                We verify your identity, lock your account with a strong password, and send a secure confirmation link so you can manage claims with confidence.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 lg:space-y-4 lg:grid-cols-1">
              <div className="rounded-[1.2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                <h2 className="text-sm font-semibold text-white">Step 1</h2>
                <p className="mt-1 text-xs text-white/75">Create your account with a verified email.</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                <h2 className="text-sm font-semibold text-white">Step 2</h2>
                <p className="mt-1 text-xs text-white/75">Add phone verification and a strong password.</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                <h2 className="text-sm font-semibold text-white">Step 3</h2>
                <p className="mt-1 text-xs text-white/75">Review and activate access for live claim tracking.</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-10">
          <div className="w-full max-w-md rounded-[2rem] border border-gray-200/50 bg-white/90 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-950/90">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Secure account setup</p>
              <h2 className="mt-3 text-3xl font-extrabold text-foreground">Register in three secure steps</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Build a secure Restitute account for recovery tracking, dispute management and card protection.
              </p>
            </div>

            <div className="mb-6">
              {/* Mobile: compact numbered dots only */}
              <div className="flex w-full justify-center gap-2 rounded-3xl bg-background px-3 py-2 shadow-sm md:hidden overflow-hidden">
                {stepLabels.map((_, index) => (
                  <div key={index} className={`inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-semibold ${step === index + 1 ? "bg-primary text-primary-foreground" : "border border-border bg-background text-muted-foreground"}`}>
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Desktop/tablet: full labeled steps */}
              <div className="mt-0 hidden rounded-3xl border border-border bg-background p-4 md:block">
                <div className="flex items-center justify-between gap-4">
                  {stepLabels.map((label, index) => (
                    <div key={label} className="flex-1 text-center">
                      <div className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full mx-auto text-sm font-semibold ${step === index + 1 ? "bg-primary text-primary-foreground" : "border border-border bg-background text-muted-foreground"}`}>
                        {index + 1}
                      </div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {stepLoading ? (
                <div className="mt-4 rounded-3xl border border-border bg-background/80 p-4 text-sm text-muted-foreground backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading next step…</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* DEVELOPMENT: form bypasses Supabase signup/signin and navigates straight to dashboard */}
            <form onSubmit={onSubmit} noValidate className="space-y-4">
                {step === 1 ? (
                  <>
                    <label className="block">
                      <span className={authLabel}>First name <span className="text-destructive ml-1">*</span></span>
                      <input
                        className={`${authInput} mt-2`}
                        value={form.first_name}
                        onChange={(e) => set("first_name", e.target.value)}
                        required
                      />
                    </label>
                    <label className="block">
                      <span className={authLabel}>Last name <span className="text-destructive ml-1">*</span></span>
                      <input
                        className={`${authInput} mt-2`}
                        value={form.last_name}
                        onChange={(e) => set("last_name", e.target.value)}
                        required
                      />
                    </label>
                    <label className="block">
                      <span className={authLabel}>Email <span className="text-destructive ml-1">*</span></span>
                      <input
                        type="email"
                        className={`${authInput} mt-2`}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        required
                      />
                    </label>
                  </>
                ) : step === 2 ? (
                  <>
                    <label className="block">
                      <span className={authLabel}>Phone number <span className="text-destructive ml-1">*</span></span>
                      <input
                        type="tel"
                        className={`${authInput} mt-2`}
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+1 555 123 4567"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className={authLabel}>Password <span className="text-destructive ml-1">*</span></span>
                      <input
                        type="password"
                        minLength={8}
                        className={`${authInput} mt-2`}
                        value={form.password}
                        onChange={(e) => set("password", e.target.value)}
                        required
                      />
                    </label>
                    <label className="block">
                      <span className={authLabel}>Confirm password <span className="text-destructive ml-1">*</span></span>
                      <input
                        type="password"
                        minLength={8}
                        className={`${authInput} mt-2`}
                        value={form.confirm_password}
                        onChange={(e) => set("confirm_password", e.target.value)}
                        required
                      />
                    </label>
                    <div className="rounded-3xl border border-border bg-secondary/60 p-4 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">Security guidance</p>
                      <ul className="mt-3 space-y-2">
                        <li>Use at least 8 characters</li>
                        <li>Do not reuse passwords from other sites</li>
                        <li>We will send a verification link to your email</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-border bg-secondary/50 p-5">
                      <p className="text-sm font-semibold text-foreground">Review your details</p>
                      <dl className="mt-4 grid gap-3 text-sm text-muted-foreground">
                        <div>
                          <dt className="font-medium text-foreground">Name</dt>
                          <dd>{form.first_name} {form.last_name}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-foreground">Email</dt>
                          <dd>{form.email}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-foreground">Phone</dt>
                          <dd>{form.phone || "Not provided"}</dd>
                        </div>
                      </dl>
                    </div>
                    <label className="flex items-start gap-3 rounded-3xl border border-border bg-background p-4">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        I agree to the terms and privacy policy so Restitute can securely manage my account.
                      </span>
                    </label>
                  </div>
                )}

                {error ? (
                  <p className="rounded-3xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex w-full items-center justify-center rounded-3xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 sm:w-auto"
                    >
                      Back
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="shine inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-action px-6 py-3 text-sm font-semibold text-action-foreground shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {step < 3 ? "Continue" : "Create account"}
                  </button>
                </div>

                <p className="mt-6 text-center text-sm leading-relaxed text-muted-foreground">
                  Already registered? {" "}
                  <Link to="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
          </div>
        </main>
      </div>
    </div>
  );
}
