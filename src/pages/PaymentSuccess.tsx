import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { confirmCheckoutSession } from "@/api/payments";
import { getProfileStatus } from "@/api/profile";
import { useAuth } from "@/store/mock-store";

export default function PaymentSuccessPage() {
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [statusMessage, setStatusMessage] = useState("Confirming your payment…");
  const [failed, setFailed] = useState(false);

  const { data: profileStatus } = useQuery({
    queryKey: ["profile-status"],
    queryFn: getProfileStatus,
    enabled: !!user?.hasPaid,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (loading || !user) return;
    if (!sessionId) {
      setFailed(true);
      setStatusMessage("Missing payment session. Please contact support or try checkout again.");
      return;
    }

    let cancelled = false;
    let attempts = 0;
    let lastError = "";

    async function verify() {
      try {
        const status = await confirmCheckoutSession(sessionId!);
        if (cancelled) return;
        if (status.has_paid) {
          await refreshUser();
          setStatusMessage("Payment confirmed. Redirecting…");
          return;
        }
        attempts += 1;
        if (attempts < 8) {
          setStatusMessage("Payment received. Finalizing access…");
          setTimeout(verify, 1500);
        } else {
          setFailed(true);
          setStatusMessage(
            "Payment may still be processing. Refresh in a moment or go to checkout.",
          );
        }
      } catch (err) {
        if (cancelled) return;
        lastError = err instanceof Error ? err.message : "Unknown error";
        attempts += 1;
        if (attempts < 8) {
          setTimeout(verify, 1500);
        } else {
          setFailed(true);
          setStatusMessage(
            lastError
              ? `Could not confirm payment: ${lastError}`
              : "Could not confirm payment yet. Please try again shortly.",
          );
        }
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [loading, user, sessionId, refreshUser]);

  useEffect(() => {
    if (!user?.hasPaid || profileStatus === undefined) return;
    navigate(profileStatus.is_completed ? "/dashboard" : "/my-profile", { replace: true });
  }, [user?.hasPaid, profileStatus, navigate]);

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
        <h1 className="font-display text-2xl font-bold text-[#0B1D3A]">Payment successful</h1>
        <p className="mt-3 text-sm text-slate-600">{statusMessage}</p>
        {!failed && (
          <div className="mt-6 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#0B1D3A]" />
          </div>
        )}
        {failed && (
          <button
            type="button"
            onClick={() => navigate("/checkout", { replace: true })}
            className="mt-6 inline-flex rounded-full bg-[#FDCF58] px-5 py-3 text-sm font-bold text-[#0B1D3A]"
          >
            Back to checkout
          </button>
        )}
      </div>
    </div>
  );
}
