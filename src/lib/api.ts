import {
  clearAuthSession,
  ensureFreshAccessToken,
  getAccessToken,
  redirectToLogin,
} from "@/lib/auth-session";

const API_BASE_URL = `http://${window.location.hostname}:8000/api/v1`;

function getAuthHeader(): Record<string, string> {
  const token = getAccessToken();
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function fetchBlob(endpoint: string, options: RequestInit = {}): Promise<Blob> {
  const response = await fetchWithAuth(endpoint, options, true);
  if (!response.ok) {
    let message = "Download failed";
    try {
      const data = await response.json();
      message = data?.detail || data?.message || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return response.blob();
}

async function fetchWithAuth(
  endpoint: string,
  options: RequestInit,
  allowRetry: boolean,
): Promise<Response> {
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...getAuthHeader(),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401 && allowRetry && !endpoint.startsWith("/auth/")) {
    const newToken = await ensureFreshAccessToken(API_BASE_URL);
    if (newToken) {
      return fetchWithAuth(endpoint, options, false);
    }
    clearAuthSession();
    redirectToLogin();
  }

  return response;
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetchWithAuth(endpoint, options, true);

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401 && !endpoint.startsWith("/auth/")) {
      clearAuthSession();
      redirectToLogin();
    }

    const detail = data?.detail;
    const backendErrors = Array.isArray(data?.errors)
      ? data.errors.filter(Boolean).join(", ")
      : "";
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((e: { msg?: string }) => e.msg).join(", ")
          : backendErrors || data?.message || "An error occurred";
    throw new Error(message);
  }

  return data;
}
