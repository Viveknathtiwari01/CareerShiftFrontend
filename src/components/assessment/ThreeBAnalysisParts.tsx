import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  Hammer,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import {
  formatCostBand,
  formatFeasibilityLabel,
  getComponentTools,
  type AnalyzedTask,
  type ThreeBCategory,
  type ToolOption,
} from "@/api/analysis";

export const FRAMEWORK = {
  BUILD: {
    label: "BUILD",
    icon: Hammer,
    accent: "text-build",
    accentBg: "bg-build",
    soft: "bg-build-soft",
    bg: "bg-build/[0.08]",
    bgStrong: "bg-build/[0.12]",
    border: "border-build/25",
    badge: "bg-build/10 text-build border-build/25",
    header: "bg-build/[0.06] border-build/20",
    bar: "bg-build",
    ring: "ring-build/30",
    gradient: "from-build/20 via-build/10 to-transparent",
  },
  BLEND: {
    label: "BLEND",
    icon: Sparkles,
    accent: "text-blend",
    accentBg: "bg-blend",
    soft: "bg-blend-soft",
    bg: "bg-blend/12",
    bgStrong: "bg-blend/18",
    border: "border-blend/30",
    badge: "bg-blend/15 text-amber-900 border-blend/35",
    header: "bg-blend/10 border-blend/25",
    bar: "bg-blend",
    ring: "ring-blend/35",
    gradient: "from-blend/25 via-blend/10 to-transparent",
  },
  BOT: {
    label: "BOT",
    icon: Bot,
    accent: "text-bot-accent",
    accentBg: "bg-bot-accent",
    soft: "bg-bot-soft",
    bg: "bg-bot-accent/[0.08]",
    bgStrong: "bg-bot-accent/12",
    border: "border-bot-accent/25",
    badge: "bg-bot-accent/10 text-bot-accent border-bot-accent/25",
    header: "bg-bot-accent/[0.07] border-bot-accent/20",
    bar: "bg-bot-accent",
    ring: "ring-bot-accent/30",
    gradient: "from-bot-accent/20 via-bot-accent/8 to-transparent",
  },
} as const;

function feasibilityClass(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes("self")) return "bg-emerald-500/10 text-emerald-700 border-emerald-500/25";
  if (t.includes("company")) return "bg-blue-500/10 text-blue-700 border-blue-500/25";
  if (t.includes("org")) return "bg-amber-500/10 text-amber-800 border-amber-500/25";
  return "bg-violet-500/10 text-violet-700 border-violet-500/25";
}

function isFreeBand(band: string) {
  const b = band.toLowerCase();
  return b === "free" || b === "freemium";
}

function ToolCard({ tool }: { tool: ToolOption }) {
  const free = isFreeBand(String(tool.cost_band));
  return (
    <div className="group rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <div className="mb-2.5 flex flex-wrap items-start justify-between gap-2">
        <span className="font-semibold text-sm text-foreground">{tool.name}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            free
              ? "bg-emerald-500/10 text-emerald-700"
              : "bg-amber-500/10 text-amber-800"
          }`}
        >
          {formatCostBand(String(tool.cost_band))}
        </span>
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${feasibilityClass(
            tool.feasibility,
          )}`}
        >
          {formatFeasibilityLabel(tool.feasibility)}
        </span>
        <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          Unverified
        </span>
      </div>
      {tool.credibility_note && (
        <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{tool.credibility_note}</p>
      )}
      {tool.pros?.length > 0 && (
        <p className="text-[11px] text-muted-foreground">
          <span className="font-semibold text-emerald-600">+ </span>
          {tool.pros.join(" · ")}
        </p>
      )}
      {tool.cons?.length > 0 && (
        <p className="mt-1 text-[11px] text-muted-foreground">
          <span className="font-semibold text-red-500">− </span>
          {tool.cons.join(" · ")}
        </p>
      )}
      {tool.feasibility?.includes("org") && (
        <p className="mt-2 text-[10px] font-medium text-amber-800">
          Discuss with IT or your manager before adopting.
        </p>
      )}
    </div>
  );
}

export function CollapsibleTaskCard({
  task,
  category,
  defaultOpen = false,
  hideCategoryBadge = false,
}: {
  task: AnalyzedTask;
  category: ThreeBCategory;
  defaultOpen?: boolean;
  hideCategoryBadge?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = FRAMEWORK[category];
  const Icon = meta.icon;
  const components = task.components ?? [];

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow duration-300 hover:shadow-elevated ${meta.border}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-start gap-4 border-b px-5 py-4 text-left transition-colors duration-200 ${meta.header}`}
      >
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border bg-gradient-to-br ${meta.gradient} ${meta.border} shadow-sm`}
        >
          <Icon className={`h-5 w-5 ${meta.accent}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4 className="font-display text-base font-semibold leading-snug text-foreground">
              {task.title}
            </h4>
            {!hideCategoryBadge && (
              <span
                className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.badge}`}
              >
                {meta.label}
              </span>
            )}
          </div>
          {task.rationale && (
            <p className="mt-1 text-xs font-medium text-muted-foreground">{task.rationale}</p>
          )}
          <p className="mt-2 text-xs tabular-nums text-muted-foreground">
            {task.weeklyHours}h/week · {task.annualHours.toLocaleString()}h/year
          </p>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 p-5">
              <div className={`rounded-xl border ${meta.border} ${meta.bgStrong} p-4`}>
                <p
                  className={`mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide ${meta.accent}`}
                >
                  <Target className="h-3.5 w-3.5" /> Why this routing
                </p>
                <p className="text-sm leading-relaxed text-foreground">{task.reason}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Automation", value: `${task.autoPotential}%` },
                  { label: "Risk", value: task.riskLevel },
                  { label: "Future", value: task.futureImp },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/80 bg-muted/25 px-3 py-2.5 text-center"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="font-bold text-sm">{stat.value}</p>
                  </div>
                ))}
              </div>

              {components.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-border">
                  <p
                    className={`flex items-center gap-2 border-b border-border px-4 py-3 text-[11px] font-bold uppercase tracking-wide ${meta.accent} ${meta.soft}`}
                  >
                    <Wrench className="h-3.5 w-3.5" /> Work components & tools
                  </p>
                  <div className="divide-y divide-border">
                    {components.map((comp, i) => {
                      const tools = getComponentTools(comp);
                      return (
                        <div key={i} className="p-4">
                          <p className="font-semibold text-sm">{comp.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{comp.description}</p>
                          {comp.capability && (
                            <p className="mt-2 text-[11px] text-muted-foreground">
                              <span className="font-semibold text-foreground">Capability:</span>{" "}
                              {comp.capability}
                            </p>
                          )}
                          {comp.solution_pattern && (
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              <span className="font-semibold text-foreground">Solution:</span>{" "}
                              {comp.solution_pattern}
                            </p>
                          )}
                          {tools.length > 0 ? (
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              {tools.map((tool, j) => (
                                <ToolCard key={j} tool={tool} />
                              ))}
                            </div>
                          ) : (
                            <p className="mt-2 text-xs italic text-muted-foreground">
                              Human-led — no tool substitution recommended.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-border bg-muted/15 px-4 py-3 text-sm text-muted-foreground">
                  This task works best as a single unit for your role — no sub-step breakdown needed.
                </p>
              )}

              {task.next_actions.length > 0 && (
                <div className={`rounded-xl border ${meta.border} ${meta.bg} p-4`}>
                  <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide">
                    <Zap className={`h-3.5 w-3.5 ${meta.accent}`} /> Your next 3 actions
                  </p>
                  <ol className="space-y-2.5">
                    {task.next_actions.map((action, idx) => (
                      <li key={action} className="flex gap-3 text-sm leading-relaxed">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-[11px] font-bold ${meta.accent}`}
                        >
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{action}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function CategoryHoursNav({
  hoursSummary,
  totalHours,
  activeTab,
  onSelect,
  framework,
}: {
  hoursSummary?: {
    BUILD: { weekly_hours: number; annual_hours: number; task_count: number };
    BLEND: { weekly_hours: number; annual_hours: number; task_count: number };
    BOT: { weekly_hours: number; annual_hours: number; task_count: number };
    total: { weekly_hours: number; annual_hours: number; task_count: number };
  };
  totalHours?: number;
  activeTab: ThreeBCategory;
  onSelect: (c: ThreeBCategory) => void;
  framework: Record<
    ThreeBCategory,
    {
      label: string;
      title: string;
      tagline: string;
      icon: typeof Hammer;
      accent: string;
      border: string;
      bg: string;
      bar: string;
      ring: string;
      gradient: string;
    }
  >;
}) {
  const cats: ThreeBCategory[] = ["BUILD", "BLEND", "BOT"];
  const totalWeekly = hoursSummary?.total?.weekly_hours ?? totalHours ?? 1;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cats.map((key) => {
          const meta = framework[key];
          const frame = FRAMEWORK[key];
          const Icon = meta.icon;
          const bucket = hoursSummary?.[key];
          const weekly = bucket?.weekly_hours ?? 0;
          const annual = bucket?.annual_hours ?? 0;
          const count = bucket?.task_count ?? 0;
          const isActive = activeTab === key;
          const pct = totalWeekly > 0 ? Math.round((weekly / totalWeekly) * 100) : 0;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ease-out ${
                isActive
                  ? `${frame.border} ${frame.soft} shadow-elevated ring-2 ${frame.ring} ring-offset-2 ring-offset-background`
                  : "border-border/80 bg-card hover:border-border hover:shadow-soft"
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 ${frame.gradient} ${
                  isActive ? "opacity-100" : "group-hover:opacity-60"
                }`}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-xl border transition-colors duration-300 ${
                      isActive ? `${frame.border} bg-white/90` : "border-border bg-muted/30"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${frame.accent}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold tracking-tight ${isActive ? frame.accent : "text-foreground"}`}>
                      {meta.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{meta.tagline}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-display text-2xl font-bold tabular-nums ${frame.accent}`}>
                    {count}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    tasks
                  </p>
                </div>
              </div>
              <div className="relative mt-4 flex items-end justify-between gap-2 border-t border-border/50 pt-3">
                <div>
                  <p className="text-lg font-bold tabular-nums text-foreground">
                    {weekly}
                    <span className="ml-0.5 text-xs font-medium text-muted-foreground">h/wk</span>
                  </p>
                  <p className="text-[11px] tabular-nums text-muted-foreground">
                    {annual.toLocaleString()}h / year
                  </p>
                </div>
                {totalWeekly > 0 && (
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums ${
                      isActive ? `${frame.badge}` : "bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    {pct}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-muted/30 to-transparent px-5 py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Weekly time distribution</span>
          <span className="font-semibold tabular-nums text-foreground">
            {hoursSummary?.total?.weekly_hours ?? totalHours ?? 0}h / week
            <span className="mx-2 text-muted-foreground">·</span>
            {(hoursSummary?.total?.annual_hours ?? 0).toLocaleString()}h / year
          </span>
        </div>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted/80">
          {cats.map((key) => {
            const weekly = hoursSummary?.[key]?.weekly_hours ?? 0;
            const width = totalWeekly > 0 ? (weekly / totalWeekly) * 100 : 0;
            if (width <= 0) return null;
            return (
              <div
                key={key}
                className={`h-full transition-all duration-700 ease-out ${FRAMEWORK[key].bar}`}
                style={{ width: `${width}%` }}
                title={`${framework[key].label}: ${weekly}h`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { FRAMEWORK as THREE_B_FRAMEWORK };
