import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { createCheckoutSession } from "@/api/payments";
import { useAuth } from "@/store/mock-store";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!loading && user?.hasPaid) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, navigate]);

  async function startCheckout() {
    setStarting(true);
    setError(null);
    try {
      const session = await createCheckoutSession();
      if (!session.url) {
        throw new Error("No checkout URL returned");
      }
      window.location.href = session.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not start checkout";
      setError(message);
      toast.error(message);
      setStarting(false);
    }
  }

  if (loading || !user) {
    return (
      <div
        className="grid min-h-screen place-items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/paymentcheckout_bg.jpeg')" }}
      >
        <div className="rounded-2xl bg-white/90 px-6 py-4 text-sm text-[#5B7C99] shadow-sm backdrop-blur-sm">
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{ backgroundImage: "url('/paymentcheckout_bg.jpeg')" }}
    >
      <div className="w-full max-w-[560px] rounded-[32px] bg-white px-10 py-12 text-center shadow-[0_20px_60px_rgba(11,29,58,0.18)] sm:px-14 sm:py-14">
        {/* Brand */}
        <div className="flex flex-col items-center">
          <img
            src="/new_logo11.png"
            alt="CareerShift — Build It · Bot It · Blend It"
            className="h-14 w-auto object-contain sm:h-16"
          />
          <div className="mt-5 h-[2px] w-12 rounded-full bg-[#E8B923]" />
        </div>

        {/* Headline */}
        <h1 className="mt-9 font-display text-[1.85rem] font-bold leading-[1.25] tracking-tight text-[#0B1D3A] sm:text-[2.15rem]">
          Unlock your Career
          <br />
          Intelligence Report
        </h1>

        <p className="mx-auto mt-5 max-w-[420px] text-[15px] leading-[1.7] text-[#5B7C99] sm:text-base">
          One-time payment of $19 USD. After payment you will continue to your dashboard.
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={startCheckout}
          disabled={starting}
          className="mt-9 mx-auto inline-flex w-full max-w-[400px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#F6D56A] to-[#E8B923] px-5 py-3.5 text-[15px] font-bold text-[#0B1D3A] shadow-[0_8px_20px_rgba(232,185,35,0.35)] transition hover:brightness-[1.03] hover:shadow-[0_10px_24px_rgba(232,185,35,0.45)] disabled:opacity-60 sm:py-4"
        >
          {starting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirecting to Stripe…
            </>
          ) : (
            <>
              Pay $19
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-5 flex items-center justify-center gap-1.5 text-[12px] text-[#8A9BB5]">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          <span>Secure checkout powered by Stripe.</span>
        </div>

        <Link
          to="/"
          className="mt-6 inline-block text-[13px] font-medium text-[#5B7C99] underline underline-offset-2 transition-colors hover:text-[#0B1D3A]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
