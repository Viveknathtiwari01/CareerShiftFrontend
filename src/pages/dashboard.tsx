import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Compass,
  DollarSign,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import { deriveReport, useAssessment, useAuth } from "@/store/mock-store";



function Dashboard() {
  const { user } = useAuth();
  const { submitted } = useAssessment();
  const report = deriveReport(submitted);
  const hasReport = !!submitted;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Hi {user?.name?.split(" ")[0] ?? "there"} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            {hasReport
              ? "Here's the latest snapshot of your AI readiness."
              : "Kick things off with your first AI Career Readiness assessment."}
          </p>
        </div>
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02]"
        >
          <Sparkles className="h-4 w-4" /> {hasReport ? "Re-run assessment" : "Start assessment"}
        </Link>
      </div>

      {!hasReport && <EmptyBanner />}

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Readiness score"
          value={`${report.score}`}
          suffix="/100"
          delta="+8 vs. baseline"
          tone="brand"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          label="Hours saved / week"
          value={`${report.hoursSaved}h`}
          delta={hasReport ? "AI-augmented workflow" : "Estimated"}
          tone="teal"
          icon={<Zap className="h-4 w-4" />}
        />
        <StatCard
          label="Automate share"
          value={`${report.automate}%`}
          delta="Tasks AI can handle"
          tone="warm"
          icon={<Compass className="h-4 w-4" />}
        />
        <StatCard
          label="Augment share"
          value={`${report.augment}%`}
          delta="AI + human collab"
          tone="ink"
          icon={<Wrench className="h-4 w-4" />}
        />
      </div>

      {/* Main content grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Score panel */}
        <div className="surface-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-6">
            <div>
              <h2 className="font-display text-lg font-bold">AI Readiness overview</h2>
              <p className="text-xs text-muted-foreground">Based on your latest assessment</p>
            </div>
            <Link
              to="/report"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
            >
              Open Report <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[220px_1fr] md:items-center">
            <ScoreRing value={report.score} />
            <div>
              <div className="space-y-4">
                <RoutingBar label="Automate" value={report.automate} color="var(--warm)" />
                <RoutingBar label="Augment" value={report.augment} color="var(--brand)" />
                <RoutingBar label="Master (human-led)" value={report.master} color="var(--teal)" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniCard label="Top strength" value={report.strengths[0] ?? "—"} tone="teal" />
                <MiniCard label="Top risk" value={report.risks[0] ?? "—"} tone="warm" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="surface-card">
          <div className="border-b border-border p-6">
            <h2 className="font-display text-lg font-bold">Next steps</h2>
            <p className="text-xs text-muted-foreground">Recommended for you</p>
          </div>
          <div className="divide-y divide-border">
            <ActionRow icon={BarChart3} title="Review your Readiness Report" to="/report" />
            <ActionRow icon={Compass} title="Explore task routing" to="/routing" />
            <ActionRow icon={Wrench} title="Set up your AI toolkit" to="/toolkit" />
            <ActionRow icon={BookOpen} title="Start your learning roadmap" to="/learning" />
            <ActionRow icon={DollarSign} title="Estimate cost & ROI" to="/roi" />
          </div>
        </div>
      </div>

      {/* Recent tasks */}
      <div className="surface-card mt-8">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 className="font-display text-lg font-bold">Task routing preview</h2>
            <p className="text-xs text-muted-foreground">
              A snapshot of how your top tasks are routed
            </p>
          </div>
          <Link to="/routing" className="text-sm font-semibold text-brand hover:underline">
            See all
          </Link>
        </div>
        {report.routed.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Add tasks in your assessment to see personalized routing.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {report.routed.slice(0, 5).map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.hoursPerWeek}h / wk</p>
                </div>
                <RoutingBadge routing={t.routing} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------- pieces ---------- */

function EmptyBanner() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated md:p-8">
      <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
            Get started
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold">
            Run your first AI Career Readiness assessment
          </h2>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/70">
            12 minutes. 40+ signals. A personalized plan you can actually act on.
          </p>
        </div>
        <Link
          to="/assessment"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-soft hover:bg-white/90"
        >
          Start now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  delta,
  tone,
  icon,
}: {
  label: string;
  value: string;
  suffix?: string;
  delta: string;
  tone: "brand" | "teal" | "warm" | "ink";
  icon: React.ReactNode;
}) {
  const toneMap = {
    brand: "bg-brand/10 text-brand",
    teal: "bg-teal/15 text-teal",
    warm: "bg-warm/15 text-[color:var(--warm)]",
    ink: "bg-navy/10 text-navy",
  } as const;
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${toneMap[tone]}`}>
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-foreground">
        {value}
        {suffix && <span className="text-base font-semibold text-muted-foreground">{suffix}</span>}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{delta}</p>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const size = 180;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.20 262)" />
            <stop offset="100%" stopColor="oklch(0.72 0.13 185)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-5xl font-bold text-foreground">{value}</p>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Readiness
        </p>
      </div>
    </div>
  );
}

function RoutingBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-semibold text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

function MiniCard({ label, value, tone }: { label: string; value: string; tone: "teal" | "warm" }) {
  const cls = tone === "teal" ? "border-teal/30 bg-teal/5" : "border-warm/30 bg-warm/5";
  return (
    <div className={`rounded-xl border p-3 ${cls}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function ActionRow({
  icon: Icon,
  title,
  to,
}: {
  icon: typeof BarChart3;
  title: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-6 py-3.5 text-sm transition-colors hover:bg-muted/50"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 font-medium">{title}</span>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}

function RoutingBadge({ routing }: { routing: "automate" | "augment" | "master" }) {
  const map = {
    automate: { label: "Automate", cls: "bg-warm/15 text-[color:var(--warm)]" },
    augment: { label: "Augment", cls: "bg-brand/10 text-brand" },
    master: { label: "Master", cls: "bg-teal/15 text-teal" },
  } as const;
  const { label, cls } = map[routing];
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{label}</span>
  );
}

export default Dashboard;
