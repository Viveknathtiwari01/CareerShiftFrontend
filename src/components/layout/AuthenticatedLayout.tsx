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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/store/mock-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/my-profile", label: "My Career", icon: UserIcon },
  { to: "/assessment", label: "Career Assessment", icon: ClipboardList },
  { to: "/3b-analysis", label: "3B Analysis", icon: BrainCircuit },
  { to: "/ai-readiness", label: "AI Readiness Score", icon: Sparkles },
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar/20 bg-sidebar text-sidebar-foreground shadow-xl transition-all duration-300 ease-in-out lg:relative lg:z-auto lg:shrink-0 lg:translate-x-0 lg:shadow-none",
          isCollapsed ? "w-20" : "w-72",
          mobileNav ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        aria-label="Main navigation"
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 z-50 hidden h-6 w-6 items-center justify-center rounded-full border border-sidebar-foreground/10 bg-sidebar text-sidebar-foreground shadow-md lg:flex hover:bg-primary hover:text-primary-foreground transition-transform hover:scale-110"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Link
            to="/dashboard"
            className={cn(
              "hidden shrink-0 items-center border-b border-sidebar-foreground/10 py-5 lg:flex h-[97px]",
              isCollapsed ? "justify-center px-0" : "px-6"
            )}
          >
            {isCollapsed ? (
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary">
                <span className="text-base font-semibold text-primary-foreground"> CS </span>
              </div>
            ) : (
              <img
                src="/Logo_text_.png"
                alt="CareerShift"
                className="h-14 w-auto max-w-[168px] object-contain shrink-0"
              />
            )}
          </Link>

          <nav className="scrollbar-sidebar flex-1 space-y-1 overflow-y-auto overscroll-contain p-4">
            {!isCollapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 transition-opacity duration-300">
                Workspace
              </p>
            )}
            {NAV.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  title={isCollapsed ? item.label : undefined}
                  onClick={() => setMobileNav(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
                    isCollapsed ? "justify-center px-0" : "px-3",
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-sidebar-foreground/70 hover:bg-white/8 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
                  {!isCollapsed && <span className="truncate transition-opacity duration-300">{item.label}</span>}
                </Link>
              );
            })}

            <div className="mt-2 mb-2">
              {!isCollapsed && (
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 transition-opacity duration-300">
                  Account
                </p>
              )}
            </div>
            <Link
              to="/profile"
              title={isCollapsed ? "Profile" : undefined}
              onClick={() => setMobileNav(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
                isCollapsed ? "justify-center px-0" : "px-3",
                pathname === "/profile"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-sidebar-foreground/70 hover:bg-white/8 hover:text-sidebar-foreground",
              )}
            >
              <UserIcon className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
              {!isCollapsed && <span className="transition-opacity duration-300">Profile</span>}
            </Link>
          </nav>

          <div className="shrink-0 border-t border-sidebar-foreground/10 p-4">
            <div className={cn(
              "flex items-center rounded-xl border border-sidebar-foreground/10 bg-sidebar-foreground/5 transition-all duration-300",
              isCollapsed ? "justify-center p-2 flex-col gap-3" : "gap-3 p-3"
            )}>
              <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                title={isCollapsed ? user.name : undefined}
              >
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1 transition-opacity duration-300">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-sidebar-foreground/60">{user.email}</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}
                title={isCollapsed ? "Log out" : undefined}
                aria-label="Log out"
                className={cn(
                  "grid shrink-0 place-items-center rounded-lg text-sidebar-foreground/60 hover:bg-white/8 hover:text-sidebar-foreground transition-all duration-300",
                  isCollapsed ? "h-9 w-9" : "h-8 w-8"
                )}
              >
                <LogOut className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area header stays put; only content scrolls */}
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
            "scrollbar-main min-h-0 w-full flex-1 overflow-x-hidden overscroll-contain",
            mobileNav ? "overflow-hidden" : "overflow-y-auto",
          )}
        >
          <div className="app-page pb-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
