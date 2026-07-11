import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  ClipboardList,
  Compass,
  DollarSign,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  User as UserIcon,
  Wrench,
  X,
  Target
} from "lucide-react";
import { useAuth } from "@/store/mock-store";

export const Route = createFileRoute("/_authenticated")({
  component: AuthedShell,
});

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/my-profile", label: "My Career", icon: UserIcon },
  { to: "/assessment", label: "Career Assessment", icon: ClipboardList },
  { to: "/ai-readiness", label: "AI Readiness Score", icon: Sparkles },
  { to: "/career-identity", label: "Career Identity", icon: Target },
  { to: "/report", label: "Career Intelligence Report", icon: BarChart3 },
  { to: "/history", label: "Assessment History", icon: History },
  { to: "/toolkit", label: "AI Toolkit", icon: Wrench },
] as const;

function AuthedShell() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="animate-pulse text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-2">
      {/* Top bar (mobile) */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary">
            <BrainCircuit className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-base font-bold">CareerShift</span>
        </Link>
        <button
          aria-label="Toggle nav"
          onClick={() => setMobileNav((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border"
        >
          {mobileNav ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 shrink-0 border-r border-border bg-background transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            mobileNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <Link
              to="/dashboard"
              className="hidden items-center gap-2 border-b border-border px-6 py-5 lg:flex"
            >
              <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-primary shadow-soft">
                <BrainCircuit className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-warm ring-2 ring-background" />
              </div>
              <span className="font-display text-lg font-bold">CareerShift</span>
            </Link>

            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Workspace
              </p>
              {NAV.map((item) => {
                const active = pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}


              <p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Account
              </p>
              <Link
                to="/profile"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === "/profile"
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <UserIcon className="h-4 w-4" />
                Profile
              </Link>

            </nav>

            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate({ to: "/", replace: true });
                  }}
                  aria-label="Log out"
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-background hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {mobileNav && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileNav(false)}
          />
        )}

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Keep unused imports honest for tsc strict mode
void ChevronDown;
