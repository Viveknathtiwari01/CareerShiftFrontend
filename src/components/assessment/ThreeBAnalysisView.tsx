<<<<<<< HEAD
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Brain,
  ChevronDown,
  Hammer,
  Loader2,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  getTaskAnalysis,
  mapAnalysisToDisplay,
  runTaskAnalysis,
  type AnalyzedTask,
  type ThreeBCategory,
} from "@/api/analysis";

const FRAMEWORK = [
  {
    key: "BUILD" as const,
    label: "BUILD IT",
    tagline: "Deepen human mastery",
    description: "Judgment, relationships, ethics, and expertise AI cannot replace.",
    icon: Hammer,
    accent: "text-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    bar: "bg-primary",
    ring: "ring-primary/20",
  },
  {
    key: "BLEND" as const,
    label: "BLEND IT",
    tagline: "Human + AI co-pilot",
    description: "Augment your capability — AI drafts, you decide and refine.",
    icon: Sparkles,
    accent: "text-brand",
    badge: "bg-brand/10 text-brand border-brand/20",
    bar: "bg-brand",
    ring: "ring-brand/20",
  },
  {
    key: "BOT" as const,
    label: "BOT IT",
    tagline: "Automate within 30 days",
    description: "Repetitive, templated work — delegate to AI and reclaim hours.",
    icon: Bot,
    accent: "text-teal",
    badge: "bg-teal/10 text-teal border-teal/20",
    bar: "bg-teal",
    ring: "ring-teal/20",
  },
];

function CategorySection({
  title,
  category,
  count,
  description,
  tasks,
  isExpanded,
  onToggle,
  impressMode,
}: {
  title: string;
  category: ThreeBCategory;
  count: number;
  description: string;
  tasks: AnalyzedTask[];
  isExpanded: boolean;
  onToggle: () => void;
  impressMode?: boolean;
}) {
  const meta = FRAMEWORK.find((f) => f.key === category)!;
  const Icon = meta.icon;

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all ${
        isExpanded
          ? `border-primary/30 bg-background shadow-elevated ring-2 ${meta.ring}`
          : "border-border bg-background shadow-sm"
      }`}
    >
      <div>
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between p-6 text-left"
        >
          <div className="flex items-center gap-4">
            <div
              className={`grid h-12 w-12 place-items-center rounded-xl border ${meta.badge}`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="type-card-title">
                {title}{" "}
                <span className="text-base font-normal text-muted-foreground">({count})</span>
              </div>
              {impressMode && (
                <p className="type-body-sm mt-1 text-muted-foreground">{meta.tagline}</p>
              )}
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border"
            >
              <div className="border-b border-border bg-muted/30 p-5 type-body text-muted-foreground">
                {description}
              </div>
              <div className="space-y-4 p-5">
                {tasks.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={impressMode ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-border bg-card p-6 shadow-soft"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <h5 className="type-card-title text-foreground">{t.title}</h5>
                      {t.rationale && (
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${meta.badge}`}
                        >
                          {t.rationale}
                        </span>
                      )}
                    </div>
                    <p className="type-body mb-5 text-muted-foreground">{t.reason}</p>

                    <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <Stat label="Auto potential" value={`${t.autoPotential}%`} />
                      <Stat
                        label="Risk"
                        value={t.riskLevel}
                        highlight={t.riskLevel === "High" ? "text-rose-500" : undefined}
                      />
                      <Stat label="Future impact" value={t.futureImp} />
                      {t.tools.length > 0 && (
                        <div className="col-span-2 sm:col-span-1">
                          <p className="type-stat-label text-muted-foreground">Tools</p>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {t.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {t.next_actions.length > 0 && (
                      <div className="rounded-lg border border-border bg-muted/20 p-4">
                        <p className="type-label mb-3 flex items-center gap-2 text-foreground">
                          <Zap className="h-4 w-4 text-brand" /> Your next 3 actions
                        </p>
                        <ol className="space-y-3">
                          {t.next_actions.map((action, idx) => (
                            <li key={action} className="flex gap-3 type-body text-foreground">
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${meta.badge}`}
                              >
                                {idx + 1}
                              </span>
                              {action}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: string;
}) {
  return (
    <div>
      <p className="type-stat-label text-muted-foreground">{label}</p>
      <p className={`type-stat-value ${highlight ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}
=======
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962

type Props = {
  assessmentId: string | null;
  /** @deprecated use showFooterLinks on Step3BAnalysis directly */
  impressMode?: boolean;
  showFooterLinks?: boolean;
  variant?: "page" | "embedded";
};

/** @deprecated Use Step3BAnalysis directly */
export default function ThreeBAnalysisView({
  assessmentId,
  showFooterLinks = false,
  variant,
  impressMode,
}: Props) {
  return (
<<<<<<< HEAD
    <div className="space-y-10">
      {impressMode && (
        <div className="grid gap-4 md:grid-cols-3">
          {FRAMEWORK.map((f) => {
            const Icon = f.icon;
            const count =
              f.key === "BUILD"
                ? buildTasks.length
                : f.key === "BOT"
                  ? botTasks.length
                  : blendTasks.length;
            return (
              <div
                key={f.key}
                className={`rounded-2xl border p-5 shadow-sm ${f.badge}`}
              >
                <Icon className="mb-3 h-7 w-7" />
                <div className="type-section-title">{count}</div>
                <div className="text-base font-bold">{f.label}</div>
                <p className="type-body-sm mt-2 opacity-80">{f.description}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          {!impressMode && (
            <>
              <h2 className="type-section-title">3B Task Routing</h2>
              <p className="type-body-sm mt-2 text-muted-foreground">
                BUILD · BOT · BLEND classification for every selected task
              </p>
            </>
          )}
        </div>
        <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-soft">
          <span className="type-body font-semibold text-foreground">
            {summaryConfidence}% confidence
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="type-body-sm text-muted-foreground">{autoOpp}% automation opportunity</span>
          <button
            type="button"
            onClick={() => analyzeMutation.mutate(true)}
            disabled={analyzeMutation.isPending}
            className="ml-2 text-sm font-semibold text-brand hover:underline"
          >
            Re-run
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft">
        <p className="type-label mb-4 text-muted-foreground">Portfolio distribution</p>
        <div className="flex h-5 w-full overflow-hidden rounded-full bg-muted">
          <div
            style={{ width: `${(buildTasks.length / totalTasks) * 100}%` }}
            className="bg-primary transition-all duration-700"
          />
          <div
            style={{ width: `${(blendTasks.length / totalTasks) * 100}%` }}
            className="bg-brand transition-all duration-700"
          />
          <div
            style={{ width: `${(botTasks.length / totalTasks) * 100}%` }}
            className="bg-teal transition-all duration-700"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
          <span className="text-primary">BUILD {buildTasks.length}</span>
          <span className="text-brand">BLEND {blendTasks.length}</span>
          <span className="text-teal">BOT {botTasks.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        <CategorySection
          title="BUILD — Human-first"
          category="BUILD"
          count={buildTasks.length}
          description="Deepen expertise in work that defines your irreplaceable professional value."
          tasks={buildTasks}
          isExpanded={expandedSection === "BUILD"}
          onToggle={() => setExpandedSection(expandedSection === "BUILD" ? null : "BUILD")}
          impressMode={impressMode}
        />
        <CategorySection
          title="BLEND — AI co-pilot"
          category="BLEND"
          count={blendTasks.length}
          description="Master AI tools that amplify your output while keeping judgment in your hands."
          tasks={blendTasks}
          isExpanded={expandedSection === "BLEND"}
          onToggle={() => setExpandedSection(expandedSection === "BLEND" ? null : "BLEND")}
          impressMode={impressMode}
        />
        <CategorySection
          title="BOT — Automate now"
          category="BOT"
          count={botTasks.length}
          description="High-automation tasks to delegate to AI within the next 30 days."
          tasks={botTasks}
          isExpanded={expandedSection === "BOT"}
          onToggle={() => setExpandedSection(expandedSection === "BOT" ? null : "BOT")}
          impressMode={impressMode}
        />
      </div>

      {showFooterLinks && (
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/ai-readiness"
            className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-elevated"
          >
            <h3 className="type-card-title group-hover:text-brand">AI Readiness Score →</h3>
            <p className="type-body-sm mt-3 text-muted-foreground">
              See how your 3B mix translates into a 0–100 readiness baseline.
            </p>
          </Link>
          <Link
            to="/report"
            className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-elevated"
          >
            <h3 className="type-card-title group-hover:text-brand">Full Career Report →</h3>
            <p className="type-body-sm mt-3 text-muted-foreground">
              Explore your complete Career Intelligence Report with roadmap and toolkit.
            </p>
          </Link>
        </div>
      )}
    </div>
=======
    <Step3BAnalysis
      assessmentId={assessmentId}
      showFooterLinks={showFooterLinks || variant === "page" || impressMode}
      embedded={variant === "page" || impressMode}
    />
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  );
}
