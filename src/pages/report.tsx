import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Download,
  Share2,
  Shield,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { deriveReport, useAssessment, useAuth } from "@/store/mock-store";



function ReportPage() {
  const { user } = useAuth();
  const { submitted } = useAssessment();
  const report = deriveReport(submitted);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-elevated md:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/40 blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-teal/30 blur-3xl opacity-30" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Personalized report
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              {user?.name?.split(" ")[0] ?? "Your"}'s AI Career Readiness
            </h1>
            <p className="mt-3 max-w-lg text-primary-foreground/70">
              A snapshot of how prepared you are — and exactly what to do next.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:bg-white/90">
                <Download className="h-4 w-4" /> Download PDF
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-white/10">
                <Share2 className="h-4 w-4" /> Share
              </button>
            </div>
          </div>
          <BigScore value={report.score} />
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Panel title="Task routing" subtitle="How your work splits across AI">
          <div className="space-y-5">
            <Bar label="Automate" value={report.automate} color="var(--warm)" />
            <Bar label="Augment" value={report.augment} color="var(--brand)" />
            <Bar label="Master" value={report.master} color="var(--teal)" />
          </div>
        </Panel>
        <Panel title="Impact" subtitle="Estimated weekly gains">
          <div className="grid gap-4">
            <MetricRow
              icon={<TrendingUp className="h-4 w-4" />}
              label="Hours saved / wk"
              value={`${report.hoursSaved}h`}
            />
            <MetricRow
              icon={<Shield className="h-4 w-4" />}
              label="Automation exposure"
              value={`${report.automate}%`}
            />
            <MetricRow
              icon={<Wrench className="h-4 w-4" />}
              label="Augmentation upside"
              value={`${report.augment}%`}
            />
          </div>
        </Panel>
        <Panel title="Recommended plan" subtitle="Where to focus next">
          <ul className="space-y-3 text-sm">
            {[
              "Adopt 2 AI tools that match your workflow",
              "Automate 3 recurring tasks this month",
              "Complete a 4-week prompt-engineering track",
              "Book a peer review at day 30",
            ].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ul>
          <Link
            to="/learning"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            Open learning roadmap <BookOpen className="h-3.5 w-3.5" />
          </Link>
        </Panel>
      </div>

      {/* Strengths / risks */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Strengths" subtitle="Play into these">
          <ul className="space-y-2 text-sm">
            {report.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Risks to address" subtitle="Close these gaps first">
          <ul className="space-y-2 text-sm">
            {report.risks.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <TriangleAlert className="mt-0.5 h-4 w-4 text-[color:var(--warm)]" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Task table */}
      <div className="surface-card mt-6">
        <div className="border-b border-border p-6">
          <h2 className="font-display text-lg font-bold">Task-by-task routing</h2>
          <p className="text-xs text-muted-foreground">
            How AI should be applied across each of your recurring tasks.
          </p>
        </div>
        {report.routed.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Complete an assessment with tasks to see this table populated.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-semibold">Task</th>
                  <th className="px-4 py-3 font-semibold">Hours</th>
                  <th className="px-4 py-3 font-semibold">Complexity</th>
                  <th className="px-4 py-3 font-semibold">Human touch</th>
                  <th className="px-6 py-3 text-right font-semibold">Routing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {report.routed.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/40">
                    <td className="px-6 py-3 font-medium">{t.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.hoursPerWeek}h</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{t.complexity}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{t.humanTouch}</td>
                    <td className="px-6 py-3 text-right">
                      <RoutingPill routing={t.routing} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card p-6">
      <h3 className="font-display text-base font-bold">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function MetricRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5">
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-muted">{icon}</span>
        {label}
      </span>
      <span className="font-display text-base font-bold">{value}</span>
    </div>
  );
}

function BigScore({ value }: { value: number }) {
  const size = 220;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="reportRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#reportRing)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center text-primary-foreground">
        <p className="font-display text-6xl font-bold">{value}</p>
        <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
          Readiness
        </p>
      </div>
    </div>
  );
}

function RoutingPill({ routing }: { routing: "automate" | "augment" | "master" }) {
  const map = {
    automate: { label: "Automate", cls: "bg-warm/15 text-[color:var(--warm)]" },
    augment: { label: "Augment", cls: "bg-brand/10 text-brand" },
    master: { label: "Master", cls: "bg-teal/15 text-teal" },
  } as const;
  const { label, cls } = map[routing];
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}

export default ReportPage;
