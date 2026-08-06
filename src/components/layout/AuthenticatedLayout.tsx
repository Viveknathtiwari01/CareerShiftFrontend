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

      {/* Sidebar: slide-over drawer on mobile, fixed column on desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar/20 bg-sidebar text-sidebar-foreground shadow-xl",
          "transition-transform duration-300 ease-out lg:static lg:z-auto lg:shrink-0 lg:translate-x-0 lg:shadow-none",
          mobileNav ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between border-b border-sidebar-foreground/10 px-4 py-3 lg:hidden">
          <Link
            to="/dashboard"
            className="flex items-center gap-2"
            onClick={() => setMobileNav(false)}
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary">
              <BrainCircuit className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display text-base font-bold text-gradient-brand">CareerShift</span>
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileNav(false)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-sidebar-foreground/15 text-sidebar-foreground/80 hover:bg-white/8"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <Link
            to="/dashboard"
            className="hidden shrink-0 items-center border-b border-sidebar-foreground/10 px-6 py-5 lg:flex"
          >
            <img
              src="/Logo_text_.png"
              alt="CareerShift"
              className="h-14 w-auto max-w-[168px] object-contain"
            />
          </Link>

          <nav className="scrollbar-sidebar flex-1 space-y-1 overflow-y-auto overscroll-contain p-4">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Workspace
            </p>
            {NAV.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileNav(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-sidebar-foreground/70 hover:bg-white/8 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}

            <p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Account
            </p>
            <Link
              to="/profile"
              onClick={() => setMobileNav(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === "/profile"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-sidebar-foreground/70 hover:bg-white/8 hover:text-sidebar-foreground",
              )}
            >
              <UserIcon className="h-4 w-4 shrink-0" />
              Profile
            </Link>
          </nav>

          <div className="shrink-0 border-t border-sidebar-foreground/10 p-4">
            <div className="flex items-center gap-3 rounded-xl border border-sidebar-foreground/10 bg-sidebar-foreground/5 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {user.name.slice(0, 2).toUpperCase()}
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

        <main
          className={cn(
            "scrollbar-main min-h-0 flex-1 overflow-x-hidden overscroll-contain",
            mobileNav ? "overflow-hidden" : "overflow-y-auto",
          )}
        >
          <div className="app-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
