import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Loader2,
  Lock,
  Mail,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuth } from "@/store/mock-store";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";

type AuthMode = "login" | "register" | "register-verify" | "forgot" | "forgot-verify" | "forgot-reset";

export default function AuthPage() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/my-profile", { replace: true });
    }
  }, [user, loading, navigate]);

  async function handleLogin() {
    await login(email, password);
    toast.success("Welcome back");
  }

  async function handleRegisterRequest() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await fetchApi("/auth/register/request-otp", {
      method: "POST",
      body: JSON.stringify({ 
        email, 
        password, 
        username: email.split("@")[0] // Auto-generated username
      }),
    });
    toast.success("OTP sent to your email!");
    setMode("register-verify");
  }

  async function handleRegisterVerify() {
    await fetchApi("/auth/register/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
    toast.success("Account created successfully! Please log in.");
    setMode("login");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleForgotRequest() {
    await fetchApi("/auth/password/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    toast.success("Password reset OTP sent to your email!");
    setMode("forgot-verify");
  }

  async function handleForgotVerify() {
    const res = await fetchApi("/auth/password/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
    setVerificationToken(res.data.verification_token);
    toast.success("OTP verified. Please enter your new password.");
    setMode("forgot-reset");
  }

  async function handleForgotReset() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await fetchApi("/auth/password/reset", {
      method: "POST",
      body: JSON.stringify({ verification_token: verificationToken, new_password: password }),
    });
    toast.success("Password reset successfully! Please log in.");
    setMode("login");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (mode === "login") await handleLogin();
      else if (mode === "register") await handleRegisterRequest();
      else if (mode === "register-verify") await handleRegisterVerify();
      else if (mode === "forgot") await handleForgotRequest();
      else if (mode === "forgot-verify") await handleForgotVerify();
      else if (mode === "forgot-reset") await handleForgotReset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen overflow-x-hidden lg:grid-cols-2">
      {/* Left: brand panel */}
      <aside className="bg-[#0A1525] relative hidden overflow-hidden text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Link to="/" className="flex items-center gap-2">
<<<<<<< HEAD
          <img src="/Logo_text_.png" alt="logo" className="object-cover w-50" />
=======
          <img src="/log_text.jpeg" alt="logo" className="h-12 w-auto max-w-[200px] object-contain" />
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
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
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">✓</span>
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

          {(mode === "login" || mode === "register") && (
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
          )}

          <h2 className="font-display text-3xl font-bold tracking-tight">
            {mode === "login" && "Welcome back"}
            {mode === "register" && "Create your account"}
            {mode === "register-verify" && "Verify your email"}
            {mode === "forgot" && "Reset Password"}
            {mode === "forgot-verify" && "Verify OTP"}
            {mode === "forgot-reset" && "Create New Password"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" && "Sign in to continue your career readiness journey."}
            {mode === "register" && "Get started with your free AI Career Readiness assessment."}
            {mode === "register-verify" && `We sent a 6-digit code to ${email}.`}
            {mode === "forgot" && "Enter your email to receive a password reset code."}
            {mode === "forgot-verify" && `We sent a password reset code to ${email}.`}
            {mode === "forgot-reset" && "Enter a new secure password for your account."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            
            {(mode === "login" || mode === "register" || mode === "forgot") && (
              <Field
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@company.com"
                required
              />
            )}

            {(mode === "login" || mode === "register" || mode === "forgot-reset") && (
              <Field
                icon={<Lock className="h-4 w-4" />}
                label={mode === "forgot-reset" ? "New Password" : "Password"}
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                required
              />
            )}

            {(mode === "register" || mode === "forgot-reset") && (
              <Field
                icon={<Lock className="h-4 w-4" />}
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="••••••••"
                required
              />
            )}

            {(mode === "register-verify" || mode === "forgot-verify") && (
              <Field
                icon={<Lock className="h-4 w-4" />}
                label="6-Digit OTP"
                type="text"
                value={otp}
                onChange={setOtp}
                placeholder="123456"
                required
              />
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setMode("forgot")}
                  className="text-xs font-medium text-brand hover:underline"
                >
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
              {mode === "login" && "Log in"}
              {mode === "register" && "Continue"}
              {mode === "register-verify" && "Verify & Create Account"}
              {mode === "forgot" && "Send Reset Code"}
              {mode === "forgot-verify" && "Verify Code"}
              {mode === "forgot-reset" && "Set New Password"}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>

            {mode !== "login" && mode !== "register" && (
               <div className="flex justify-center mt-4">
                 <button 
                   type="button" 
                   onClick={() => setMode("login")}
                   className="text-xs font-medium text-muted-foreground hover:text-foreground"
                 >
                   Back to login
                 </button>
               </div>
            )}
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
  required,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 shadow-soft focus-within:ring-2 focus-within:ring-ring">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </label>
  );
}
