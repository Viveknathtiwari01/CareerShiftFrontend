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
import { Checkbox } from "@/components/ui/checkbox";

type AuthMode = "login" | "register" | "register-verify" | "forgot" | "forgot-verify" | "forgot-reset";

export default function AuthPage() {
  const { user, login, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  
  const [submitting, setSubmitting] = useState(false);

  const { data: profileStatus, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile-status"],
    queryFn: getProfileStatus,
    enabled: !!user && !loading && !!user.hasPaid,
  });

  useEffect(() => {
    if (loading || !user) return;
    // Unpaid users stay on this page so they can sign out and switch accounts
    if (!user.hasPaid) return;
    if (!isLoadingProfile && profileStatus !== undefined) {
      if (profileStatus.is_completed) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/my-profile", { replace: true });
      }
    }
  }, [user, loading, navigate, profileStatus, isLoadingProfile]);

  async function handleSwitchAccount() {
    setSigningOut(true);
    try {
      await logout();
      setMode("login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");
      setAcceptedTerms(false);
      toast.success("Signed out. You can log in or create another account.");
    } finally {
      setSigningOut(false);
    }
  }

  async function handleLogin() {
    await login(email, password);
    toast.success("Welcome back");
  }

  async function handleRegisterRequest() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!acceptedTerms) {
      toast.error("Please accept the Terms & Conditions and Privacy Policy to continue.");
      return;
    }
    await fetchApi("/auth/register/request-otp", {
      method: "POST",
      body: JSON.stringify({ 
        email, 
        password, 
        username: email.split("@")[0],
        terms_accepted: true,
        privacy_accepted: true,
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
    setAcceptedTerms(false);
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
      <aside className="relative hidden overflow-hidden bg-[#0B1D3A] text-white lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-12 xl:px-16 xl:py-14">
        <Link to="/" className="relative z-10 inline-flex items-center">
          <img
            src="/new_logo_white1.png"
            alt="CareerShift"
            className="h-12 w-auto object-contain xl:h-14"
          />
        </Link>

        <div className="relative z-10 max-w-[34rem]">
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#FDCF58]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />

          <p className="relative text-[12px] font-bold uppercase tracking-[0.22em] text-[#FDCF58]">
            AI Career Intelligence
          </p>
          <h1 className="relative mt-5 font-display text-[2.75rem] font-bold leading-[1.12] tracking-tight text-white xl:text-[3.25rem]">
            Turn uncertainty into career intelligence.
          </h1>
          <p className="relative mt-6 max-w-[30rem] text-[17px] leading-[1.7] text-white/75 xl:text-[18px]">
            Understand how work is changing — and what to do about it. CareerShift analyses your
            role, tasks and skills to reveal what to Build, Bot and Blend for the future of work.
          </p>

          <ul className="relative mt-10 space-y-4">
            {[
              "Personalized Career Intelligence Report",
              "Task-by-task Build It · Bot It · Blend It mapping",
              "Curated AI tools and automation opportunities",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur-[2px]"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FDCF58] text-[13px] font-bold text-[#0B1D3A]">
                  ✓
                </span>
                <span className="pt-0.5 text-[15px] font-medium leading-snug text-white/90 xl:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-sm text-white/55">
          © {new Date().getFullYear()} CareerShift · All rights reserved
        </p>
      </aside>

      {/* Right: form over mountain background */}
      <main
        className="flex min-h-screen flex-col justify-start bg-cover bg-center bg-no-repeat px-4 py-6 sm:justify-center sm:px-10 sm:py-8 lg:px-14"
        style={{ backgroundImage: "url('/paymentcheckout_bg.jpeg')" }}
      >
        <div className="mx-auto w-full max-w-xl rounded-[24px] border border-white/70 bg-white/95 p-6 shadow-[0_20px_50px_rgba(11,29,58,0.14)] backdrop-blur-[2px] sm:p-8 lg:p-10">
          <Link to="/" className="mb-5 flex items-center gap-2 sm:mb-7 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold">CareerShift</span>
          </Link>

          {!loading && user && !user.hasPaid ? (
            <div className="space-y-6">
              <h2 className="font-display text-[2rem] font-bold tracking-tight text-[#0B1D3A] sm:text-[2.35rem]">
                Finish checkout
              </h2>
              <p className="text-[15px] leading-relaxed text-[#5B7C99] sm:text-base">
                You&apos;re signed in as{" "}
                <span className="font-semibold text-[#0B1D3A]">{user.email}</span>, but payment
                is still pending.
              </p>
              <button
                type="button"
                onClick={() => navigate("/checkout", { replace: true })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-[15px] font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01]"
              >
                Continue to payment
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleSwitchAccount}
                disabled={signingOut}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-5 py-4 text-[15px] font-semibold text-foreground transition-colors hover:bg-black/5 disabled:opacity-70"
              >
                {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Sign out &amp; use another account
              </button>
              <div className="flex justify-center">
                <Link
                  to="/"
                  className="text-sm font-medium text-[#5B7C99] underline underline-offset-2 hover:text-[#0B1D3A]"
                >
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <>
          {(mode === "login" || mode === "register") && (
            <div className="mb-6 inline-flex w-full rounded-full border border-border bg-brand/90 p-1.5 text-[14px]">
              <button
                className={`flex-1 rounded-full px-5 py-2 font-semibold transition-colors ${
                  mode === "login"
                    ? "bg-white shadow-soft text-[#0B1D3A]"
                    : "text-[#0B1D3A]/65 hover:text-[#0B1D3A]"
                }`}
                onClick={() => setMode("login")}
                type="button"
              >
                Log in
              </button>
              <button
                className={`flex-1 rounded-full px-5 py-2 font-semibold transition-colors ${
                  mode === "register"
                    ? "bg-white shadow-soft text-[#0B1D3A]"
                    : "text-[#0B1D3A]/65 hover:text-[#0B1D3A]"
                }`}
                onClick={() => setMode("register")}
                type="button"
              >
                Create account
              </button>
            </div>
          )}

          <h2 className="font-display text-[1.75rem] font-bold tracking-tight text-[#0B1D3A] sm:text-[2rem]">
            {mode === "login" && "Welcome back"}
            {mode === "register" && "Create your account"}
            {mode === "register-verify" && "Verify your email"}
            {mode === "forgot" && "Reset Password"}
            {mode === "forgot-verify" && "Verify OTP"}
            {mode === "forgot-reset" && "Create New Password"}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#5B7C99] sm:text-[15px]">
            {mode === "login" && "Sign in to continue building your Career Intelligence Report."}
            {mode === "register" && "Get started with your free AI Career Readiness assessment."}
            {mode === "register-verify" && `We sent a 6-digit code to ${email}.`}
            {mode === "forgot" && "Enter your email to receive a password reset code."}
            {mode === "forgot-verify" && `We sent a password reset code to ${email}.`}
            {mode === "forgot-reset" && "Enter a new secure password for your account."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            
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

            {mode === "register" && (
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3">
                <Checkbox
                  id="register-legal-consent"
                  checked={acceptedTerms}
                  onCheckedChange={(value) => setAcceptedTerms(value === true)}
                  className="mt-0.5"
                />
                <span className="text-[13px] leading-relaxed text-muted-foreground">
                  I have read and agree to the{" "}
                  <Link
                    to="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground underline underline-offset-2 hover:text-brand"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground underline underline-offset-2 hover:text-brand"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setMode("forgot")}
                  className="text-sm font-medium text-brand hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || (mode === "register" && !acceptedTerms)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] disabled:opacity-70"
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
               <div className="mt-5 flex justify-center">
                 <button 
                   type="button" 
                   onClick={() => setMode("login")}
                   className="text-sm font-medium text-muted-foreground hover:text-foreground"
                 >
                   Back to login
                 </button>
               </div>
            )}
          </form>
            </>
          )}
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
      <span className="mb-1.5 block text-[13px] font-semibold text-[#0B1D3A]">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-input bg-background px-4 py-2.5 shadow-soft focus-within:ring-2 focus-within:ring-ring">
        <span className="text-muted-foreground">{icon}</span>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
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
