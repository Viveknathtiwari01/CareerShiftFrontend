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
import { useQuery } from "@tanstack/react-query";
import { getProfileStatus } from "@/api/profile";

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

  const { data: profileStatus, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile-status"],
    queryFn: getProfileStatus,
    enabled: !!user && !loading,
  });

  useEffect(() => {
    if (!loading && user && !isLoadingProfile && profileStatus !== undefined) {
      if (profileStatus.is_completed) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/my-profile", { replace: true });
      }
    }
  }, [user, loading, navigate, profileStatus, isLoadingProfile]);

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
      <aside className="bg-[#0B1D3A] relative hidden overflow-hidden text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Link to="/" className="flex items-center gap-2">
          <img src="/new_logo_white1.png" alt="logo" className="object-cover w-50" />
        </Link>

        <div className="relative">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand/40 blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-teal/30 blur-3xl opacity-30" />
          <div className="relative">
            <h1 className="font-display text-4xl font-bold leading-tight text-white">
              Turn uncertainty into career intelligence.
            </h1>
            <p className="mt-4 max-w-md text-white/70">
              Understand how work is changing - and what to do about it. CareerShift analyses the role, tasks and skills to reveal what to Build , Bot and Blend for the future of work.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              {[
                "Personalized Career Intelligence Report",
                "Task-by-task Build It · Bot It · Blend It mapping",
                "Curated AI tools and automation opportunities",
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
      <main className="flex min-h-screen flex-col justify-start px-4 py-8 sm:justify-center sm:px-12 sm:py-12">
        <div className="mx-auto w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-soft sm:max-w-md sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
          <Link to="/" className="mb-6 flex items-center gap-2 sm:mb-8 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold">CareerShift</span>
          </Link>

          {(mode === "login" || mode === "register") && (
            <div className="mb-6 inline-flex w-full rounded-full border border-border bg-brand p-1 text-sm sm:w-auto">
              <button
                className={`flex-1 rounded-full px-4 py-2 font-medium transition-colors sm:flex-none sm:py-1.5 ${
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
                className={`flex-1 rounded-full px-4 py-2 font-medium transition-colors sm:flex-none sm:py-1.5 ${
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

          <h2 className="font-display text-[1.75rem] font-bold tracking-tight sm:text-3xl">
            {mode === "login" && "Welcome back"}
            {mode === "register" && "Create your account"}
            {mode === "register-verify" && "Verify your email"}
            {mode === "forgot" && "Reset Password"}
            {mode === "forgot-verify" && "Verify OTP"}
            {mode === "forgot-reset" && "Create New Password"}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-sm">
            {mode === "login" && "Sign in to continue building your Career Intelligence Report."}
            {mode === "register" && "Get started with your free AI Career Readiness assessment."}
            {mode === "register-verify" && `We sent a 6-digit code to ${email}.`}
            {mode === "forgot" && "Enter your email to receive a password reset code."}
            {mode === "forgot-verify" && `We sent a password reset code to ${email}.`}
            {mode === "forgot-reset" && "Enter a new secure password for your account."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5 sm:mt-8 sm:space-y-4">
            
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
                  className="text-sm font-medium text-brand hover:underline sm:text-xs"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] disabled:opacity-70 sm:py-3 sm:text-sm"
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
      <span className="mb-1.5 block text-sm font-medium text-foreground sm:text-xs">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3.5 py-3 shadow-soft focus-within:ring-2 focus-within:ring-ring sm:px-3 sm:py-2.5">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground sm:text-sm"
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
