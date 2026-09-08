import { fetchApi } from "@/lib/api";

export type CheckoutSession = {
  url: string;
  session_id: string;
};

export type PaymentStatus = {
  has_paid: boolean;
  paid_at: string | null;
};

export async function createCheckoutSession(): Promise<CheckoutSession> {
  const res = await fetchApi("/payments/create-checkout-session", {
    method: "POST",
  });
  return res.data as CheckoutSession;
}

export async function getPaymentStatus(): Promise<PaymentStatus> {
  const res = await fetchApi("/payments/status");
  return res.data as PaymentStatus;
}

export async function confirmCheckoutSession(sessionId: string): Promise<PaymentStatus> {
  const res = await fetchApi("/payments/confirm-session", {
    method: "POST",
    body: JSON.stringify({ session_id: sessionId }),
  });
  return res.data as PaymentStatus;
}
