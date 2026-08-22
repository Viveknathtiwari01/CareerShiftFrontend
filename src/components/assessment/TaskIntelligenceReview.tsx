import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Circle,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import {
  getEffectiveConfidenceScore,
  getEffectiveTimeAllocation,
  isTaskReviewComplete,
} from "@/api/tasks";
import type { Task } from "@/store/mock-store";

function CircularProgress({ percent }: { percent: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#c9a84c"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={percent}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-display text-2xl font-bold tabular-nums text-foreground"
        >
          {percent}%
        </motion.span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          complete
        </span>
      </div>
    </div>
  );
}

function TaskSelectOptions({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {options.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`rounded-md border px-3 py-2 font-medium transition-all duration-200 ${
            value === v
              ? "scale-[1.02] border-primary bg-primary text-primary-foreground shadow-soft"
              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

type Props = {
  tasks: Task[];
  updateTask: (id: string, patch: Partial<Task>) => void;
  onReviewComplete?: (complete: boolean) => void;
};

export default function TaskIntelligenceReview({
  tasks,
  updateTask,
  onReviewComplete,
}: Props) {
  const selectedTasks = tasks.filter((t) => t.selected ?? true);
  const tasksReviewed = selectedTasks.filter(isTaskReviewComplete).length;
  const completionPercent =
    selectedTasks.length > 0
      ? Math.round((tasksReviewed / selectedTasks.length) * 100)
      : 0;

  const firstIncompleteId = useMemo(
    () => selectedTasks.find((t) => !isTaskReviewComplete(t))?.id ?? null,
    [selectedTasks],
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [rightPanelHeight, setRightPanelHeight] = useState<number | null>(null);

  useEffect(() => {
    if (activeId && selectedTasks.some((t) => t.id === activeId)) return;
    setActiveId(firstIncompleteId ?? selectedTasks[0]?.id ?? null);
  }, [activeId, firstIncompleteId, selectedTasks]);

  useEffect(() => {
    const allReviewed =
      selectedTasks.length > 0 && tasksReviewed === selectedTasks.length;
    onReviewComplete?.(allReviewed);
  }, [selectedTasks.length, tasksReviewed, onReviewComplete]);

  const activeTask = selectedTasks.find((t) => t.id === activeId) ?? selectedTasks[0];
  const activeIndex = selectedTasks.findIndex((t) => t.id === activeTask?.id);

  useEffect(() => {
    const el = rightPanelRef.current;
    if (!el) return;

    const syncHeight = () => {
      setRightPanelHeight(el.getBoundingClientRect().height);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTask?.id, activeTask?.description]);

  useEffect(() => {
    if (!activeTask) return;
    if (!isTaskReviewComplete(activeTask)) return;
    const next = selectedTasks.find((t) => !isTaskReviewComplete(t));
    if (next && next.id !== activeTask.id) {
      const timer = setTimeout(() => setActiveId(next.id), 450);
      return () => clearTimeout(timer);
    }
  }, [activeTask, selectedTasks, tasksReviewed]);

  const avgConfidence = selectedTasks.length
    ? (
        selectedTasks.reduce((acc, t) => acc + getEffectiveConfidenceScore(t), 0) /
        selectedTasks.length
      ).toFixed(1)
    : "0.0";

  const totalHours = selectedTasks.reduce(
    (acc, t) => acc + getEffectiveTimeAllocation(t),
    0,
  );

  if (selectedTasks.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted/20 p-10 text-center">
        <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground/60" />
        <p className="mt-4 text-sm text-muted-foreground">
          No tasks selected. Go back to the Task Generator to add tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">Task Intelligence Review</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review each generated task one at a time — your answers power accurate 3B routing.
        </p>
      </div>

      {/* Progress hero */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-primary/8 via-background to-teal/5 p-5 shadow-soft md:p-6"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <CircularProgress percent={completionPercent} />
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                Review progress
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {tasksReviewed}
                <span className="text-lg font-medium text-muted-foreground">
                  {" "}
                  / {selectedTasks.length} tasks
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {completionPercent === 100
                  ? "All done — continue to your 3B analysis."
                  : `${selectedTasks.length - tasksReviewed} remaining`}
              </p>
            </div>
          </div>

          <div className="hidden h-12 w-px bg-border sm:block" />

          <div className="grid w-full grid-cols-2 gap-4 text-center sm:w-auto sm:grid-cols-2 sm:text-left">
            <div className="rounded-xl border border-border/80 bg-background/80 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Avg confidence
              </p>
              <p className="font-bold tabular-nums">{avgConfidence}/10</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-background/80 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Weekly hours
              </p>
              <p className="font-bold tabular-nums text-brand">{totalHours}h</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-3 overflow-hidden rounded-full border border-border/80 bg-slate-200/70">
            <motion.div
              className="h-full min-w-[2px] rounded-full bg-gradient-to-r from-[#c9a84c] via-[#b8923f] to-[#0d9488]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(completionPercent, completionPercent > 0 ? 2 : 0)}%` }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Master-detail: right panel sets height; left list scrolls inside */}
      <div
        className="flex flex-col gap-5 lg:flex-row lg:items-start"
        style={
          rightPanelHeight
            ? ({ "--task-panel-h": `${rightPanelHeight}px` } as CSSProperties)
            : undefined
        }
      >
        {/* Left: task rail — matches right height on desktop, scrolls internally */}
        <aside className="w-full shrink-0 lg:h-[var(--task-panel-h)] lg:w-[300px] lg:overflow-hidden xl:w-[320px]">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-soft max-lg:max-h-[min(420px,50vh)]">
            <p className="mb-3 shrink-0 px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Generated tasks
            </p>

            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-x-auto overflow-y-auto pb-1 lg:overflow-x-hidden lg:pb-0">
              {selectedTasks.map((t, index) => {
                const reviewed = isTaskReviewComplete(t);
                const isActive = t.id === activeTask?.id;

                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    layout
                    onClick={() => setActiveId(t.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex min-w-[220px] shrink-0 items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors duration-200 lg:min-w-0 lg:w-full ${
                      isActive
                        ? "border-primary/50 bg-background shadow-soft ring-2 ring-primary/20"
                        : reviewed
                          ? "border-teal/25 bg-teal/5 hover:bg-teal/8"
                          : "border-border/80 bg-background/70 hover:border-primary/30 hover:bg-background"
                    }`}
                  >
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                        reviewed
                          ? "bg-teal text-white"
                          : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {reviewed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm font-semibold ${isActive ? "text-foreground" : "text-foreground/90"}`}
                      >
                        {t.title}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">{t.category}</p>
                    </div>
                    {isActive ? (
                      <ChevronRight className="h-4 w-4 shrink-0 text-primary" />
                    ) : reviewed ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right: active task review — natural height drives layout */}
        <div ref={rightPanelRef} className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            {activeTask && (
              <motion.div
                key={activeTask.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
              >
                <div className="border-b border-border bg-gradient-to-r from-muted/40 to-transparent px-5 py-4 md:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        Task {activeIndex + 1} of {selectedTasks.length}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold">{activeTask.title}</h3>
                      {activeTask.category && (
                        <p className="mt-0.5 text-sm text-muted-foreground">{activeTask.category}</p>
                      )}
                    </div>
                    {isTaskReviewComplete(activeTask) && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Reviewed
                      </motion.span>
                    )}
                  </div>
                  {activeTask.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {activeTask.description}
                    </p>
                  )}
                </div>

                <div className="space-y-8 p-5 md:p-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-sm font-semibold">
                        How often do you perform this task?
                      </h4>
                      <TaskSelectOptions
                        value={activeTask.frequency || ""}
                        options={[
                          "Multiple times daily",
                          "Daily",
                          "Weekly",
                          "Monthly",
                          "Occasionally",
                          "Quarterly",
                          "Half Yearly",
                          "Yearly",
                        ]}
                        onChange={(v) => updateTask(activeTask.id, { frequency: v as Task["frequency"] })}
                      />
                    </div>
                    <div>
                      <h4 className="mb-3 text-sm font-semibold">
                        How important is this task to your role?
                      </h4>
                      <TaskSelectOptions
                        value={activeTask.businessCriticality || ""}
                        options={["Mission Critical", "High", "Medium", "Low"]}
                        onChange={(v) =>
                          updateTask(activeTask.id, {
                            businessCriticality: v as Task["businessCriticality"],
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          Approximately how much of your work week is spent on this task?
                        </h4>
                        <span className="text-sm font-bold text-primary">
                          {getEffectiveTimeAllocation(activeTask) < 0.5
                            ? "<15 min"
                            : getEffectiveTimeAllocation(activeTask) === 0.5
                              ? "30 min"
                              : getEffectiveTimeAllocation(activeTask) === 1
                                ? "1 hr"
                                : `${getEffectiveTimeAllocation(activeTask)} hrs`}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {[
                          { label: "<15 min", val: 0.25 },
                          { label: "15-30 min", val: 0.5 },
                          { label: "30-60 min", val: 1 },
                          { label: "1-2 hrs", val: 2 },
                          { label: "2-4 hrs", val: 4 },
                          { label: "4+ hrs", val: 8 },
                        ].map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => updateTask(activeTask.id, { timeAllocation: opt.val })}
                            className={`rounded-md border px-3 py-2 font-medium transition-all duration-200 ${
                              getEffectiveTimeAllocation(activeTask) === opt.val
                                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                                : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          How confident are you performing this task without assistance?
                        </h4>
                        <span className="text-sm font-bold text-primary">
                          {getEffectiveConfidenceScore(activeTask)} / 10
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={getEffectiveConfidenceScore(activeTask)}
                        onChange={(e) =>
                          updateTask(activeTask.id, {
                            confidenceScore: Number(e.target.value),
                          })
                        }
                        className="w-full accent-primary"
                      />
                      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 text-sm font-semibold">
                      Do you currently use AI for this task?
                    </h4>
                    <TaskSelectOptions
                      value={activeTask.aiAssistance || ""}
                      options={["Never", "Sometimes", "Frequently", "Always"]}
                      onChange={(v) =>
                        updateTask(activeTask.id, { aiAssistance: v as Task["aiAssistance"] })
                      }
                    />
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold">Manual Notes (Optional)</h4>
                    <textarea
                      placeholder="Anything else you want CareerShift to know?"
                      value={activeTask.manualNotes || ""}
                      onChange={(e) =>
                        updateTask(activeTask.id, { manualNotes: e.target.value })
                      }
                      className="min-h-[80px] w-full resize-y rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                    <button
                      type="button"
                      disabled={activeIndex <= 0}
                      onClick={() => setActiveId(selectedTasks[activeIndex - 1]?.id)}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                    >
                      ← Previous task
                    </button>
                    <button
                      type="button"
                      disabled={activeIndex >= selectedTasks.length - 1}
                      onClick={() => setActiveId(selectedTasks[activeIndex + 1]?.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15 disabled:opacity-40"
                    >
                      Next task <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {completionPercent === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-teal/25 bg-teal/5 px-4 py-3 text-sm text-teal-900 dark:text-teal-100"
            >
              All tasks reviewed — use the button below to view your 3B Analysis.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
