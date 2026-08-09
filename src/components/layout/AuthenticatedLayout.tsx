import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BrainCircuit,
  ClipboardList,
  GraduationCap,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  Target,
  User as UserIcon,
  Wrench,
  X,
} from "lucide-react";
import { useAuth } from "@/store/mock-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/my-profile", label: "My Career", icon: UserIcon },
  { to: "/assessment", label: "Career Assessment", icon: ClipboardList },
  { to: "/3b-analysis", label: "3B Analysis", icon: BrainCircuit },
  { to: "/ai-readiness", label: "AI Readiness Score", icon: Sparkles },
  { to: "/career-identity", label: "Career Identity", icon: Target },
  { to: "/report", label: "Career Intelligence Report", icon: BarChart3 },
  { to: "/history", label: "Assessment History", icon: History },
  { to: "/toolkit", label: "AI Toolkit", icon: Wrench },
  { to: "/workshops", label: "Workshops", icon: GraduationCap },
] as const;

export default function AuthenticatedLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNav) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNav(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileNav]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="animate-pulse text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex h-svh overflow-hidden bg-background">
      {mobileNav && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileNav(false)}
          aria-hidden
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 shrink-0 border-r border-border bg-[#141F32] text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            mobileNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <Link
              to="/dashboard"
              className="hidden items-center gap-1 border-b border-border px-6 lg:flex"
            >
              <img src="/Logo_text_.png" alt="Logo" className="w-42 h-24" />
            </Link>

            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              <p className="mb-3 px-3 text-sm font-bold uppercase tracking-wider text-white/60">
                Workspace
              </p>
              {NAV.map((item) => {
                const active = pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium leading-snug transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}

              <p className="mb-3 mt-8 px-3 text-sm font-bold uppercase tracking-wider text-white/60">
                Account
              </p>
              <Link
                to="/profile"
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium leading-snug transition-colors ${
                  pathname === "/profile"
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                <UserIcon className="h-5 w-5 shrink-0" />
                Profile
              </Link>
            </nav>

            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-white">{user.name}</p>
                  <p className="truncate text-sm text-white/80">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate("/", { replace: true });
                  }}
                  aria-label="Log out"
                  className="grid h-9 w-9 place-items-center rounded-lg text-white/75 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/60">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}
                aria-label="Log out"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sidebar-foreground/60 hover:bg-white/8 hover:text-sidebar-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area — header stays put; only content scrolls */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-30 flex shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          <Link to="/dashboard" className="flex min-w-0 items-center gap-2">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary">
              <BrainCircuit className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="truncate font-display text-base font-bold text-gradient-brand">
              CareerShift
            </span>
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileNav(true)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
          >
            <Menu className="h-4 w-4" />
          </button>
        </header>

        <main className="min-w-0 w-full flex-1">
          <div className="app-page">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
