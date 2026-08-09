const ACCESS_TOKEN_KEY = "careershift.token";
const REFRESH_TOKEN_KEY = "careershift.refreshToken";

let refreshPromise: Promise<string | null> | null = null;

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem("careershift.user");
}

export function redirectToLogin() {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/auth")) return;
  window.location.href = `/auth?next=${encodeURIComponent(window.location.pathname + window.location.search)}`;
}

async function refreshAccessToken(apiBaseUrl: string): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(`${apiBaseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) return null;

  const payload = await response.json();
  const access = payload?.data?.access_token as string | undefined;
  const refresh = payload?.data?.refresh_token as string | undefined;
  if (!access || !refresh) return null;

  setTokens(access, refresh);
  return access;
}

export async function ensureFreshAccessToken(apiBaseUrl: string): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(apiBaseUrl).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };
