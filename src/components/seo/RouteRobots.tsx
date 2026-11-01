import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Paths that must not appear in search results.
 * Keep this list aligned with Frontend/public/robots.txt.
 * /auth stays indexable: it is the public login and signup entry.
 */
const NOINDEX_PREFIXES = [
  "/dashboard",
  "/my-profile",
  "/profile",
  "/onboarding",
  "/assessment",
  "/3b-analysis",
  "/report",
  "/history",
  "/insights",
  "/toolkit",
  "/ai-fitness",
  "/checkout",
  "/payment",
];

function shouldNoIndex(pathname: string) {
  return NOINDEX_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function RouteRobots() {
  const { pathname } = useLocation();

  useEffect(() => {
    const content = shouldNoIndex(pathname) ? "noindex, nofollow" : "index, follow";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  }, [pathname]);

  return null;
}
