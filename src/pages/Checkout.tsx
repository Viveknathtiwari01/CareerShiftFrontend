import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
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
      <div className="grid min-h-screen place-items-center bg-[#F8FAFC]">
        <div className="animate-pulse text-sm text-slate-500">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          CareerShift
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-[#0B1D3A]">
          Unlock your Career Intelligence Report
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          One-time payment of <span className="font-semibold text-[#0B1D3A]">AED 19</span>.
          After payment you will continue to your dashboard.
        </p>

        <button
          type="button"
          onClick={startCheckout}
          disabled={starting}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FDCF58] px-5 py-3.5 text-sm font-bold text-[#0B1D3A] transition hover:bg-[#ebd593] disabled:opacity-60"
        >
          {starting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirecting to Stripe…
            </>
          ) : (
            "Pay AED 19"
          )}
        </button>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <p className="mt-6 text-xs text-slate-400">
          Secure checkout powered by Stripe.{" "}
          <Link to="/" className="underline hover:text-slate-600">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
