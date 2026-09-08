import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/mock-store";

export default function PaymentCancelPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
        <h1 className="font-display text-2xl font-bold text-[#0B1D3A]">Payment cancelled</h1>
        <p className="mt-3 text-sm text-slate-600">
          No charge was made. You can complete payment anytime to unlock your dashboard.
        </p>
        <Link
          to="/checkout"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#FDCF58] px-5 py-3.5 text-sm font-bold text-[#0B1D3A]"
        >
          Try again
        </Link>
        <Link to="/" className="mt-4 inline-block text-sm text-slate-500 underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
