import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Hammer,
  Loader2,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import {
  getTaskAnalysis,
  mapAnalysisToDisplay,
  runTaskAnalysis,
  type AnalyzedTask,
  type ThreeBCategory,
} from "@/api/analysis";

const CATEGORIES: ThreeBCategory[] = ["BUILD", "BLEND", "BOT"];

const FRAMEWORK = {
  BUILD: {
    label: "BUILD",
    title: "Build It",
    tagline: "Deepen human mastery",
    description: "Judgment, relationships, ethics, and expertise AI cannot replace.",
    action: "Invest in skills & experience",
    importance: "Highest — your irreplaceable edge",
    icon: Hammer,
    accent: "text-build",
    bg: "bg-build/[0.06]",
    bgStrong: "bg-build/[0.09]",
    border: "border-build/20",
    bar: "bg-build",
    badge: "bg-build/10 text-build border-build/20",
    tabActive: "bg-build/10 text-build border-build/30 shadow-soft",
    header: "bg-build/[0.07] border-build/15",
    ring: "ring-build/25",
  },
  BLEND: {
    label: "BLEND",
    title: "Blend It",
    tagline: "Human + AI co-pilot",
    description: "AI drafts and analyzes — you decide, refine, and own the outcome.",
    action: "Learn tools & prompt skills",
    importance: "High — your biggest leverage zone",
    icon: Sparkles,
    accent: "text-blend",
    bg: "bg-blend/10",
    bgStrong: "bg-blend/[0.14]",
    border: "border-blend/25",
    bar: "bg-blend",
    badge: "bg-blend/12 text-brand-foreground border-blend/30",
    tabActive: "bg-blend/15 text-brand-foreground border-blend/40 shadow-soft",
    header: "bg-blend/10 border-blend/20",
    ring: "ring-blend/30",
  },
  BOT: {
    label: "BOT",
    title: "Bot It",
    tagline: "Automate within 30 days",
    description: "Repetitive, templated work — delegate to AI and reclaim hours.",
    action: "Set up automation this month",
    importance: "Quick wins — reclaim time fast",
    icon: Bot,
    accent: "text-bot-accent",
    bg: "bg-bot-accent/[0.07]",
    bgStrong: "bg-bot-accent/10",
    border: "border-bot-accent/22",
    bar: "bg-bot-accent",
    badge: "bg-bot-accent/10 text-bot-accent border-bot-accent/22",
    tabActive: "bg-bot-accent/12 text-bot-accent border-bot-accent/35 shadow-soft",
    header: "bg-bot-accent/[0.08] border-bot-accent/18",
    ring: "ring-bot-accent/25",
  },
} as const;

function SectionLabel({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
        {step}
      </span>
      <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

function FrameworkGuide() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {CATEGORIES.map((key) => {
        const meta = FRAMEWORK[key];
        const Icon = meta.icon;
        return (
          <div
            key={key}
            className={`rounded-xl border-l-[3px] ${meta.border} border border-border bg-card ${meta.bgStrong} p-4 shadow-soft`}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className={`grid h-10 w-10 place-items-center rounded-xl border ${meta.border} bg-background/80`}>
                <Icon className={`h-5 w-5 ${meta.accent}`} />
              </div>
              <div>
                <p className={`text-sm font-bold ${meta.accent}`}>{meta.title}</p>
                <p className="text-[11px] text-muted-foreground">{meta.tagline}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{meta.description}</p>
            <p className={`mt-2 text-[11px] font-semibold ${meta.accent}`}>→ {meta.action}</p>
            <p className="mt-1 text-[10px] font-medium text-muted-foreground/80">{meta.importance}</p>
          </div>
        );
      })}
    </div>
  );
}

function MetricCell({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "build" | "blend" | "bot" | "warn" | "danger";
}) {
  const tones = {
    neutral: {
      box: "border-border bg-muted/40",
      label: "text-muted-foreground",
      value: "text-foreground",
    },
    build: {
      box: "border-build/20 bg-build/[0.06]",
      label: "text-muted-foreground",
      value: "text-build",
    },
    blend: {
      box: "border-blend/25 bg-blend/10",
      label: "text-muted-foreground",
      value: "text-blend",
    },
    bot: {
      box: "border-bot-accent/22 bg-bot-accent/[0.07]",
      label: "text-muted-foreground",
      value: "text-bot-accent",
    },
    warn: {
      box: "border-warm/25 bg-warm/10",
      label: "text-warm/90",
      value: "text-warm",
    },
    danger: {
      box: "border-destructive/25 bg-destructive/8",
      label: "text-destructive/80",
      value: "text-destructive",
    },
  } as const;
  const style = tones[tone];

  return (
    <div className={`rounded-xl border px-3 py-3 text-center shadow-sm ${style.box}`}>
      <p className={`text-[10px] font-semibold uppercase tracking-wide ${style.label}`}>{label}</p>
      <p className={`mt-1 text-base font-bold ${style.value}`}>{value}</p>
    </div>
  );
}

function automationTone(value: number): "build" | "blend" | "bot" {
  if (value >= 65) return "bot";
  if (value >= 35) return "blend";
  return "build";
}

function riskTone(level: string): "build" | "warn" | "danger" {
  const normalized = level.toLowerCase();
  if (normalized === "high") return "danger";
  if (normalized === "medium") return "warn";
  return "build";
}

function impactTone(level: string): "build" | "blend" | "warn" {
  const normalized = level.toLowerCase();
  if (normalized === "high") return "warn";
  if (normalized === "medium") return "blend";
  return "build";
}

function TaskCard({ task, category }: { task: AnalyzedTask; category: ThreeBCategory }) {
  const meta = FRAMEWORK[category];
  const Icon = meta.icon;

  return (
    <article className={`overflow-hidden rounded-2xl border bg-card shadow-soft ${meta.border}`}>
      {/* Task header */}
      <div className={`border-b px-5 py-4 ${meta.header}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${meta.border} bg-background shadow-sm`}>
              <Icon className={`h-5 w-5 ${meta.accent}`} />
            </div>
            <div className="min-w-0">
              <h4 className="font-display text-base font-semibold leading-snug text-foreground">
                {task.title}
              </h4>
              {task.rationale && (
                <p className="mt-1 text-xs font-medium text-muted-foreground">{task.rationale}</p>
              )}
            </div>
          </div>
          <span className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.badge}`}>
            {meta.label}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {/* Why */}
        <div className={`rounded-xl border ${meta.border} ${meta.bgStrong} p-4`}>
          <p className={`mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide ${meta.accent}`}>
            <span className={`grid h-6 w-6 place-items-center rounded-lg border ${meta.border} bg-background`}>
              <Target className="h-3.5 w-3.5" />
            </span>
            Why this routing
          </p>
          <p className="text-sm leading-relaxed text-foreground">{task.reason}</p>
        </div>

        {/* Task signals + Recommended tools — side by side */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              <span className="grid h-6 w-6 place-items-center rounded-lg border border-border bg-background">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
              Task signals
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <MetricCell
                label="Automation"
                value={`${task.autoPotential}%`}
                tone={automationTone(task.autoPotential)}
              />
              <MetricCell label="Risk" value={task.riskLevel} tone={riskTone(task.riskLevel)} />
              <MetricCell label="Future impact" value={task.futureImp} tone={impactTone(task.futureImp)} />
            </div>
          </div>

          <div className={`flex flex-col rounded-xl border ${meta.border} bg-card p-4`}>
            <p className={`mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide ${meta.accent}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-lg border ${meta.border} ${meta.bg}`}>
                <Wrench className="h-3.5 w-3.5" />
              </span>
              Recommended tools
            </p>
            {task.tools.length > 0 ? (
              <div className="flex flex-1 flex-wrap content-start gap-2">
                {task.tools.map((tool) => (
                  <span
                    key={tool}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${meta.badge}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            ) : (
              <p className="flex flex-1 items-center text-sm text-muted-foreground">
                No specific tools suggested for this task.
              </p>
            )}
          </div>
        </div>

        {/* Next actions */}
        {task.next_actions.length > 0 && (
          <div className={`rounded-xl border ${meta.border} ${meta.bgStrong} p-4`}>
            <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
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
    </article>
  );
}

function buildStrategicSummary(
  build: number,
  blend: number,
  bot: number,
  total: number,
): string {
  if (total === 0) return "Complete your task review to generate personalized 3B routing.";
  const pct = (n: number) => Math.round((n / total) * 100);
  const dominant =
    build >= blend && build >= bot
      ? "BUILD"
      : bot >= blend && bot >= build
        ? "BOT"
        : "BLEND";
  if (dominant === "BUILD") {
    return `${pct(build)}% of your work is human-first (BUILD). Your career edge is deepening expertise and judgment — use AI lightly here and invest in mastery.`;
  }
  if (dominant === "BOT") {
    return `${pct(bot)}% of your tasks are strong automation candidates (BOT). Prioritize quick wins — set up AI workflows in the next 30 days to reclaim significant weekly hours.`;
  }
  return `${pct(blend)}% of your role sits in the BLEND zone. Your biggest leverage is learning AI co-pilot workflows — let AI draft while you refine and decide.`;
}

type Props = {
  assessmentId: string | null;
  onReadyChange?: (ready: boolean) => void;
  showFooterLinks?: boolean;
  /** Hide inner page title when wrapped by PageShell */
  embedded?: boolean;
};

export default function Step3BAnalysis({
  assessmentId,
  onReadyChange,
  showFooterLinks = false,
  embedded = false,
}: Props) {
  const queryClient = useQueryClient();
  const analyzeRequestedRef = useRef(false);
  const [activeTab, setActiveTab] = useState<ThreeBCategory>("BUILD");

  const analysisQuery = useQuery({
    queryKey: ["assessment-analysis", assessmentId],
    queryFn: () => getTaskAnalysis(assessmentId!),
    enabled: !!assessmentId,
    staleTime: 60_000,
  });

  const analyzeMutation = useMutation({
    mutationFn: (regenerate: boolean) => runTaskAnalysis(assessmentId!, regenerate),
    onSuccess: (data) => {
      queryClient.setQueryData(["assessment-analysis", assessmentId], data);
    },
  });

  useEffect(() => {
    analyzeRequestedRef.current = false;
  }, [assessmentId]);

  useEffect(() => {
    if (!assessmentId || analysisQuery.isLoading) return;
    if ((analysisQuery.data?.analyses?.length ?? 0) > 0) return;
    if (!analyzeRequestedRef.current && !analyzeMutation.isPending) {
      analyzeRequestedRef.current = true;
      analyzeMutation.mutate(false);
    }
  }, [assessmentId, analysisQuery.data, analysisQuery.isLoading, analyzeMutation.isPending]);

  const analyzedTasks = useMemo(
    () => (analysisQuery.data?.analyses ?? []).map(mapAnalysisToDisplay),
    [analysisQuery.data?.analyses],
  );

  const isLoading =
    analysisQuery.isLoading || (analyzeMutation.isPending && analyzedTasks.length === 0);
  const isReady = analyzedTasks.length > 0 && !isLoading;

  useEffect(() => {
    onReadyChange?.(isReady);
  }, [isReady, onReadyChange]);

  const tasksByCategory = useMemo(
    () => ({
      BUILD: analyzedTasks.filter((t) => t.category3B === "BUILD"),
      BLEND: analyzedTasks.filter((t) => t.category3B === "BLEND"),
      BOT: analyzedTasks.filter((t) => t.category3B === "BOT"),
    }),
    [analyzedTasks],
  );

  const totalTasks = analyzedTasks.length || 1;
  const autoOpp = Math.round(
    analyzedTasks.reduce((acc, t) => acc + t.autoPotential, 0) / totalTasks,
  );
  const summaryConfidence = analysisQuery.data?.summary_confidence ?? autoOpp;
  const strategicSummary = buildStrategicSummary(
    tasksByCategory.BUILD.length,
    tasksByCategory.BLEND.length,
    tasksByCategory.BOT.length,
    analyzedTasks.length,
  );

  const activeTasks = tasksByCategory[activeTab];
  const activeMeta = FRAMEWORK[activeTab];

  if (!assessmentId) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 px-6 py-14 text-center">
        <p className="text-muted-foreground">Complete your assessment to unlock 3B analysis.</p>
        <Link
          to="/assessment"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Go to Assessment <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-4 py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
        <h3 className="mt-6 font-display text-xl font-bold">Analyzing your tasks</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Routing each task into BUILD, BLEND, or BOT with personalized actions…
        </p>
      </div>
    );
  }

  if (analyzeMutation.isError || analysisQuery.isError) {
    const err = (analyzeMutation.error ?? analysisQuery.error) as Error;
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-14 text-center">
        <AlertTriangle className="mx-auto h-9 w-9 text-destructive" />
        <h3 className="mt-4 font-semibold">Analysis unavailable</h3>
        <p className="mt-2 text-sm text-muted-foreground">{err.message}</p>
        <button
          type="button"
          onClick={() => analyzeMutation.mutate(true)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Status bar */}
      {!embedded && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              3B Career Intelligence
            </h2>
            <p className="mt-1 max-w-lg text-sm text-muted-foreground">
              Every task in your role, classified with clear reasoning and next steps.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-brand px-4 py-2.5 text-sm shadow-sm">
            <span className="font-semibold text-primary-foreground">Complete</span>
            <span className="text-primary-foreground/40">·</span>
            <span className="text-primary-foreground/90">{summaryConfidence}% confidence</span>
            <button
              type="button"
              onClick={() => analyzeMutation.mutate(true)}
              disabled={analyzeMutation.isPending}
              className="ml-1 flex items-center gap-1 text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${analyzeMutation.isPending ? "animate-spin" : ""}`} />
              Re-run
            </button>
          </div>
        </div>
      )}

      {embedded && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-foreground">{analyzedTasks.length} tasks analyzed</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{summaryConfidence}% confidence</span>
          </div>
          <button
            type="button"
            onClick={() => analyzeMutation.mutate(true)}
            disabled={analyzeMutation.isPending}
            className="flex items-center gap-1.5 text-xs font-medium text-brand hover:underline disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${analyzeMutation.isPending ? "animate-spin" : ""}`} />
            Re-run analysis
          </button>
        </div>
      )}

      {/* Step 1 — Framework */}
      <section>
        <SectionLabel step="1" title="Understand the 3B Framework" />
        <FrameworkGuide />
      </section>

      {/* Step 2 — Portfolio snapshot */}
      <section>
        <SectionLabel step="2" title="Your portfolio at a glance" />
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CATEGORIES.map((key) => {
              const meta = FRAMEWORK[key];
              const count = tasksByCategory[key].length;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`rounded-xl border p-4 text-left transition-all hover:shadow-sm ${
                    activeTab === key
                      ? `${meta.tabActive} ring-2 ${meta.ring}`
                      : `${meta.bg} ${meta.border}`
                  }`}
                >
                  <p className={`text-[11px] font-bold uppercase tracking-wide ${meta.accent}`}>
                    {meta.label}
                  </p>
                  <p className={`mt-1 font-display text-3xl font-bold ${meta.accent}`}>{count}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{meta.importance}</p>
                </button>
              );
            })}
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Automation opp.
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-primary">{autoOpp}%</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">avg. potential</p>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <div className="flex h-4 w-full overflow-hidden rounded-full border border-border/60 bg-muted">
              {CATEGORIES.map((key) => {
                const width = (tasksByCategory[key].length / totalTasks) * 100;
                if (width === 0) return null;
                return (
                  <div
                    key={key}
                    style={{ width: `${width}%` }}
                    className={`${FRAMEWORK[key].bar} transition-all duration-700`}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex w-full">
              {CATEGORIES.map((key) => {
                const meta = FRAMEWORK[key];
                const count = tasksByCategory[key].length;
                const width = (count / totalTasks) * 100;
                if (width === 0) return null;
                return (
                  <div
                    key={key}
                    style={{ width: `${width}%` }}
                    className="min-w-0 px-1 first:pl-0 last:pr-0"
                  >
                    <span className={`flex items-center gap-1.5 text-[11px] font-medium sm:text-xs ${meta.accent}`}>
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${meta.bar}`} />
                      <span className="truncate">
                        {meta.label} · {count} tasks
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 — Task details */}
      <section>
        <SectionLabel step="3" title="Explore your tasks by category" />

        {/* Tabs */}
        <div className="mb-5 flex flex-wrap gap-2 border-b border-border pb-4">
          {CATEGORIES.map((key) => {
            const meta = FRAMEWORK[key];
            const Icon = meta.icon;
            const count = tasksByCategory[key].length;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive ? meta.tabActive : `border-transparent opacity-65 hover:opacity-100 ${meta.bg} ${meta.accent}`
                }`}
              >
                <Icon className="h-4 w-4" />
                {meta.title}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? "bg-background/80" : "bg-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category context */}
        <div className={`mb-5 rounded-xl border-l-4 ${activeMeta.border} border ${activeMeta.border} ${activeMeta.bgStrong} px-4 py-3`}>
          <p className={`text-sm font-bold ${activeMeta.accent}`}>
            {activeMeta.title} — {activeMeta.tagline}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{activeMeta.description}</p>
          <p className={`mt-2 text-xs font-semibold ${activeMeta.accent}`}>{activeMeta.importance}</p>
        </div>

        {/* Task list */}
        {activeTasks.length === 0 ? (
          <div className={`rounded-xl border border-dashed ${activeMeta.border} ${activeMeta.bg} py-12 text-center text-sm ${activeMeta.accent}`}>
            No tasks routed to {activeMeta.title} in this assessment.
          </div>
        ) : (
          <div className="space-y-4">
            {activeTasks.map((task) => (
              <TaskCard key={task.id} task={task} category={activeTab} />
            ))}
          </div>
        )}
      </section>

      {/* Step 4 — Strategic takeaway */}
      <section>
        <SectionLabel step="4" title="What this means for you" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-primary/20 bg-brand p-5 shadow-sm">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-primary-foreground">
              <TrendingUp className="h-4 w-4" /> Strategic insight
            </p>
            <p className="text-sm leading-relaxed text-primary-foreground/90">{strategicSummary}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="mb-2 text-sm font-bold text-foreground">Recommended focus</p>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((key) => {
                const meta = FRAMEWORK[key];
                return (
                  <li key={key} className="flex gap-2">
                    <span className={`min-w-[4.5rem] font-bold ${meta.accent}`}>{meta.label}</span>
                    <span className="text-muted-foreground">— {meta.action.toLowerCase()}</span>
                  </li>
                );
              })}
            </ul>
            {showFooterLinks && (
              <Link
                to="/ai-readiness"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                Continue to AI Readiness Score <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
