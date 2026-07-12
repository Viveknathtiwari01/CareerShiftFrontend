import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Loader2,
  Lock,
  Mail,
  Target,
  User as UserIcon,
  Zap,
} from "lucide-react";
import { useAuth } from "@/store/mock-store";
import { toast } from "sonner";

export default function AuthPage() {
  const { user, login, register, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(user.onboarded ? "/dashboard" : "/onboarding", { replace: true });
    }
  }, [user, loading, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
        toast.success("Welcome back");
      } else {
        await register(name || email.split("@")[0], email, password);
        toast.success("Account created");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel */}
      <aside className="bg-[#0A1525] relative hidden overflow-hidden text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Link to="/" className="flex items-center gap-2">
          {/* <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/20">
            <Zap className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-xl font-bold leading-tight">
            Career <span className="opacity-80">Shift</span>
          </h1> */}
          <img src="/log_text.jpeg" alt="logo" className="object-cover w-50" />
        </Link>

        <div className="relative">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand/40 blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-teal/30 blur-3xl opacity-30" />
          <div className="relative">
            <h1 className="font-display text-4xl font-bold leading-tight text-white">
              Turn AI anxiety into <span className="text-blue-400">AI clarity.</span>
            </h1>
            <p className="mt-4 max-w-md text-white/70">
              Answer a few questions about your work and get a personalized AI Career Readiness
              Report — with tools, learning paths, and a clear plan.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              {[
                "Personalized readiness score",
                "Task-by-task automate / augment / master routing",
                "Curated AI toolkit and 12-week learning plan",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-white">
          © {new Date().getFullYear()} CareerShift · All rights reserved
        </p>
      </aside>

      {/* Right: form */}
      <main className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary">
              <BrainCircuit className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold">CareerShift</span>
          </Link>

          <div className="mb-6 inline-flex rounded-full border border-border bg-brand p-1 text-sm">
            <button
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                mode === "login"
                  ? "bg-white/80 shadow-soft text-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setMode("login")}
              type="button"
            >
              Log in
            </button>
            <button
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                mode === "register"
                  ? "bg-background shadow-soft text-foreground"
                  : "text-muted-foreground"
              }`}
              onClick={() => setMode("register")}
              type="button"
            >
              Create account
            </button>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to continue your career readiness journey."
              : "Get started with your free AI Career Readiness assessment."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {mode === "register" && (
              <Field
                icon={<UserIcon className="h-4 w-4" />}
                label="Full name"
                type="text"
                value={name}
                onChange={setName}
                placeholder="Ada Lovelace"
                autoComplete="name"
              />
            )}
            <Field
              icon={<Mail className="h-4 w-4" />}
              label="Work email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
            <Field
              icon={<Lock className="h-4 w-4" />}
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />

            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-medium text-brand hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "login" ? "Log in" : "Create account"}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>

            <div className="relative py-2 text-center text-xs text-muted-foreground">
              <span className="relative bg-background px-3 text-black">or continue with</span>
              <span className="absolute inset-x-0 top-1/2 -z-0 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton label="Google" />
              <SocialButton label="LinkedIn" />
            </div>

            <p className="pt-2 text-center text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <a href="#" className="underline hover:text-foreground">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({
  icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 shadow-soft focus-within:ring-2 focus-within:ring-ring">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </label>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      {label}
    </button>
  );
}
