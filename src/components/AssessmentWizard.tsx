import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Cpu,
  Heart,
  Map,
  Plus,
  Sparkles,
  Target,
  Wrench,
  Search,
  ListTodo,
  Edit2,
  X,
  Brain,
  Activity,
  Trash2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  Zap,
  BookOpen,
  Award,
  ShieldCheck,
  Compass,
  Clock,
  Star,
  ChevronRight,
  Users,
  EyeOff,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useAssessment, type Task } from "@/store/mock-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "@/api/profile";
import { saveAssessmentTasks, mapBackendTaskToFrontend } from "@/api/tasks";
import {
  groupCompetenciesByCategory,
  type AssessmentStartResponse,
  type CompetencyItem,
  type CompetencyMappingOutput,
} from "@/api/assessment";
import { useCompetencyAssessment } from "@/hooks/use-competency-assessment";
import StepTaskGenerator from "@/components/assessment/StepTaskGenerator";
import { Loader2, RefreshCw } from "lucide-react";

const TOOL_OPTIONS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Cursor",
  "Copilot",
  "Notion AI",
  "Perplexity",
  "Midjourney",
  "None",
];
const GOAL_OPTIONS = [
  "Automate repetitive tasks",
  "Learn new AI tools",
  "Change roles or industries",
  "Increase productivity",
  "Future-proof my skills",
  "Lead AI adoption at work",
];

const STEPS = [
  { key: "finalReport", label: "Review Report", icon: CheckCircle2 },
  { key: "competencies", label: "Competencies", icon: Map },
  { key: "taskGen", label: "Task Generator", icon: ListTodo },
  { key: "tasks", label: "Task Intelligence Review", icon: Cpu },
] as const;

function AssessmentWizard({
  prefetchedSession = null,
}: {
  prefetchedSession?: AssessmentStartResponse | null;
}) {
  const { draft, setDraft, addTask, updateTask, removeTask } = useAssessment();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [isSavingTasks, setIsSavingTasks] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [tasksReviewComplete, setTasksReviewComplete] = useState(false);
  const pipeline = useCompetencyAssessment({ prefetchedSession });

  const progress = ((step + 1) / STEPS.length) * 100;
  const currentStepKey = STEPS[step].key;
  const canContinue =
    currentStepKey !== "competencies" || pipeline.isComplete;

  async function persistTasks() {
    if (!pipeline.assessmentId || draft.tasks.length === 0) return;
    const saved = await saveAssessmentTasks(pipeline.assessmentId, draft.tasks);
    const mapped = saved.map(mapBackendTaskToFrontend);
    setDraft({ tasks: mapped });
    queryClient.setQueryData(["assessment-tasks", pipeline.assessmentId], saved);
    queryClient.invalidateQueries({ queryKey: ["assessment-analysis", pipeline.assessmentId] });
    setSaveError(null);
  }

  async function next() {
    if (
      pipeline.assessmentId &&
      (currentStepKey === "taskGen" || currentStepKey === "tasks")
    ) {
      setIsSavingTasks(true);
      setSaveError(null);
      try {
        await persistTasks();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to save tasks";
        setSaveError(message);
        console.error("Failed to save tasks", err);
        return;
      } finally {
        setIsSavingTasks(false);
      }
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }
  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  async function goTo3BAnalysis() {
    setIsSavingTasks(true);
    setSaveError(null);
    try {
      await persistTasks();
      navigate("/3b-analysis");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save tasks";
      setSaveError(message);
      console.error("Failed to save tasks before 3B analysis", err);
    } finally {
      setIsSavingTasks(false);
    }
  }

  return (
    <div className="page-shell animate-fade-in">
      {/* Stepper */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className="text-brand">Assessment Profile</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ol className="mt-6 hidden grid-cols-4 gap-2 md:grid">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <li key={s.key} className="flex flex-col items-center gap-2 text-center">
                <div
                  className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                        ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="panel p-6 md:p-10">
        {STEPS[step].key === "finalReport" && (
          <StepReview pipelineStatus={pipeline.status} isProcessing={pipeline.isProcessing} />
        )}
        {STEPS[step].key === "competencies" && (
          <StepCompetencies
            draft={draft}
            setDraft={setDraft}
            competencyMapping={pipeline.competencyMapping}
            status={pipeline.status}
            pipelineProgress={pipeline.pipelineProgress}
            isProcessing={pipeline.isProcessing}
            isComplete={pipeline.isComplete}
            isFailed={pipeline.isFailed}
            profileStale={pipeline.profileStale}
            pipelineError={pipeline.pipelineError}
            startError={pipeline.error}
            onRetry={pipeline.retry}
            isRetrying={pipeline.isRetrying}
          />
        )}
        {STEPS[step].key === "taskGen" && (
          <StepTaskGenerator
            assessmentId={pipeline.assessmentId}
            isCompetencyComplete={pipeline.isComplete}
            draft={draft}
            setDraft={setDraft}
          />
        )}
        {STEPS[step].key === "tasks" && (
          <StepTasks
            draft={draft}
            updateTask={updateTask}
            removeTask={removeTask}
            onReviewComplete={setTasksReviewComplete}
          />
        )}
      </div>

      {saveError && (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {saveError}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            disabled={!canContinue || isSavingTasks}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSavingTasks ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving tasks...
              </>
            ) : currentStepKey === "competencies" && pipeline.isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Mapping competencies...
              </>
            ) : (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        ) : tasksReviewComplete ? (
          <button
            type="button"
            onClick={goTo3BAnalysis}
            disabled={isSavingTasks}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSavingTasks ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                View Your 3B Analysis <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-xl bg-muted px-6 py-2.5 text-sm font-medium text-muted-foreground"
          >
            Complete all task reviews to continue
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Steps ---------- */

function StepHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

function StepRole({
  draft,
  setDraft,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
}) {
  return (
    <div className="bg-card p-6">
      <StepHeader
        title="Tell us about your role"
        description="This anchors how we interpret your tasks and toolkit."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-2xs font-medium">Job title</span>
          <input
            type="text"
            value={draft.role}
            onChange={(e) => setDraft({ role: e.target.value })}
            placeholder="e.g. Marketing Manager"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-2xs font-medium">Industry</span>
          <input
            type="text"
            value={draft.industry}
            onChange={(e) => setDraft({ industry: e.target.value })}
            placeholder="e.g. SaaS, Healthcare, Finance"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block md:col-span-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-2xs font-medium">Years of experience</span>
            <span className="font-display text-base font-bold">{draft.yearsExp}</span>
          </div>
          <input
            type="range"
            min={0}
            max={30}
            value={draft.yearsExp}
            onChange={(e) => setDraft({ yearsExp: Number(e.target.value) })}
            className="w-full accent-[color:var(--brand)]"
          />
        </label>
      </div>
    </div>
  );
}

function StepTools({
  draft,
  setDraft,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
}) {
  function toggle(tool: string) {
    const s = new Set(draft.tools);
    if (s.has(tool)) s.delete(tool);
    else s.add(tool);
    setDraft({ tools: [...s] });
  }
  return (
    <div>
      <StepHeader
        title="Which AI tools do you already use?"
        description="Pick any that apply — we use this to gauge your baseline fluency."
      />
      <div className="flex flex-wrap gap-2">
        {TOOL_OPTIONS.map((t) => {
          const active = draft.tools.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <span className="mb-2 block text-2xs font-medium">
          How often do you use AI at work today?
        </span>
        <div className="grid gap-2 sm:grid-cols-3">
          {(["none", "some", "daily"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setDraft({ aiUsage: v })}
              className={`rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-colors ${
                draft.aiUsage === v
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40"
              }`}
            >
              {v === "none" ? "Rarely / never" : v === "some" ? "Occasionally" : "Daily driver"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepTasks({
  draft,
  updateTask,
  removeTask,
  onReviewComplete,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  updateTask: ReturnType<typeof useAssessment>["updateTask"];
  removeTask: ReturnType<typeof useAssessment>["removeTask"];
  onReviewComplete?: (complete: boolean) => void;
}) {
  const selectedTasks = draft.tasks.filter((t) => t.selected ?? true);
  const [expandedId, setExpandedId] = useState<string | null>(selectedTasks[0]?.id || null);

  const tasksReviewed = selectedTasks.filter(
    (t) =>
      t.frequency &&
      t.businessCriticality &&
      t.timeAllocation !== undefined &&
      t.aiAssistance &&
      t.confidenceScore !== undefined,
  ).length;

  const validConfidenceTasks = selectedTasks.filter((t) => t.confidenceScore !== undefined);
  const avgConfidence = validConfidenceTasks.length
    ? (
        validConfidenceTasks.reduce((acc, t) => acc + t.confidenceScore!, 0) /
        validConfidenceTasks.length
      ).toFixed(1)
    : "0.0";

  const totalHours = selectedTasks.reduce(
    (acc, t) => acc + (t.timeAllocation ?? t.hoursPerWeek ?? 0),
    0,
  );

  const aiScores = { Never: 0, Sometimes: 1, Frequently: 2, Always: 3 };
  const validAiTasks = selectedTasks.filter((t) => t.aiAssistance);
  const avgAiScore = validAiTasks.length
    ? validAiTasks.reduce((acc, t) => acc + aiScores[t.aiAssistance as keyof typeof aiScores], 0) /
      validAiTasks.length
    : 0;

  let avgAiText = "None";
  if (avgAiScore > 0 && avgAiScore <= 1) avgAiText = "Low";
  else if (avgAiScore > 1 && avgAiScore <= 2) avgAiText = "Medium";
  else if (avgAiScore > 2) avgAiText = "High";

  useEffect(() => {
    const allReviewed =
      selectedTasks.length > 0 && tasksReviewed === selectedTasks.length;
    onReviewComplete?.(allReviewed);
  }, [selectedTasks.length, tasksReviewed, onReviewComplete]);

  return (
    <div>
      <StepHeader
        title="Task Intelligence Review"
        description="Help CareerShift understand how these tasks fit into your daily work so we can generate more accurate AI recommendations."
      />

      <div className="flex flex-col gap-8 lg:flex-row mt-6">
        <div className="flex-1 space-y-4">
          {selectedTasks.length === 0 && (
            <div className="rounded-xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">
              No tasks selected. Go back to the Task Generator to add tasks.
            </div>
          )}
          {selectedTasks.map((t) => {
            const isExpanded = expandedId === t.id;
            const isReviewed =
              t.frequency &&
              t.businessCriticality &&
              t.timeAllocation !== undefined &&
              t.aiAssistance &&
              t.confidenceScore !== undefined;

            return (
              <div
                key={t.id}
                className={`overflow-hidden rounded-2xl border transition-colors ${isExpanded ? "border-primary/50 bg-background shadow-soft" : "border-border bg-muted/20"}`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : t.id)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${isReviewed ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 text-muted-foreground"}`}
                    >
                      {isReviewed ? <CheckCircle2 className="h-4 w-4" /> : "!"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t.title}</h3>
                      <p className="text-xs text-muted-foreground">{t.category}</p>
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
                      <div className="p-5 space-y-8">
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <h4 className="mb-3 text-sm font-semibold">
                              How often do you perform this task?
                            </h4>
                            <TaskSelectOptions
                              value={t.frequency || ""}
                              options={[
                                "Multiple times daily",
                                "Daily",
                                "Weekly",
                                "Monthly",
                                "Occasionally",
                              ]}
                              onChange={(v) => updateTask(t.id, { frequency: v as any })}
                            />
                          </div>
                          <div>
                            <h4 className="mb-3 text-sm font-semibold">
                              How important is this task to your role?
                            </h4>
                            <TaskSelectOptions
                              value={t.businessCriticality || ""}
                              options={["Mission Critical", "High", "Medium", "Low"]}
                              onChange={(v) => updateTask(t.id, { businessCriticality: v as any })}
                            />
                          </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold">
                                Approximately how much of your work week is spent on this task?
                              </h4>
                              <span className="text-sm font-bold text-primary">
                                {t.timeAllocation ?? t.hoursPerWeek ?? 0} hrs
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="40"
                              value={t.timeAllocation ?? t.hoursPerWeek ?? 0}
                              onChange={(e) =>
                                updateTask(t.id, { timeAllocation: Number(e.target.value) })
                              }
                              className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                              <span>0</span>
                              <span>40 Hours</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold">
                                How confident are you performing this task without assistance?
                              </h4>
                              <span className="text-sm font-bold text-primary">
                                {t.confidenceScore ?? 5} / 10
                              </span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={t.confidenceScore ?? 5}
                              onChange={(e) =>
                                updateTask(t.id, { confidenceScore: Number(e.target.value) })
                              }
                              className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
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
                            value={t.aiAssistance || ""}
                            options={["Never", "Sometimes", "Frequently", "Always"]}
                            onChange={(v) => updateTask(t.id, { aiAssistance: v as any })}
                          />
                        </div>

                        <div>
                          <h4 className="mb-2 text-sm font-semibold">Manual Notes (Optional)</h4>
                          <textarea
                            placeholder="Anything else you want CareerShift to know?"
                            value={t.manualNotes || ""}
                            onChange={(e) => updateTask(t.id, { manualNotes: e.target.value })}
                            className="w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-primary resize-y min-h-[80px]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="w-full shrink-0 lg:w-72">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <h3 className="mb-4 font-display text-lg font-bold">Progress Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tasks Reviewed</span>
                  <span
                    className={`font-semibold ${tasksReviewed === selectedTasks.length ? "text-teal" : "text-foreground"}`}
                  >
                    {tasksReviewed} / {selectedTasks.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average AI Usage</span>
                  <span className="font-semibold text-foreground">{avgAiText}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Confidence</span>
                  <span className="font-semibold text-foreground">{avgConfidence}</span>
                </div>
                <div className="my-4 h-px w-full bg-border" />
                <div className="flex items-center justify-between text-base font-bold">
                  <span className="text-foreground">Weekly Hours</span>
                  <span className="text-brand">{totalHours}</span>
                </div>
              </div>
            </div>

            {tasksReviewed < selectedTasks.length && (
              <div className="rounded-2xl border border-amber/20 bg-amber/5 p-4 text-xs text-amber-900 dark:text-amber-200">
                Complete the review for all tasks to unlock your 3B Analysis.
              </div>
            )}
            {tasksReviewed === selectedTasks.length && selectedTasks.length > 0 && (
              <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4 text-xs text-teal-900 dark:text-teal-100">
                All tasks reviewed — use the button below to view your 3B Analysis.
              </div>
            )}
          </div>
        </div>
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
          onClick={() => onChange(v)}
          className={`rounded-md px-3 py-2 font-medium transition-colors border ${
            value === v
              ? "bg-primary border-primary text-primary-foreground shadow-soft"
              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

function StepAttitude({
  draft,
  setDraft,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
}) {
  return (
    <div>
      <StepHeader
        title="How do you feel about AI at work?"
        description="Your posture toward change is a strong signal for readiness."
      />
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Cautious</span>
          <span className="font-display text-3xl font-bold text-foreground">{draft.attitude}</span>
          <span className="text-muted-foreground">Enthusiastic</span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={draft.attitude}
          onChange={(e) => setDraft({ attitude: Number(e.target.value) })}
          className="w-full accent-[color:var(--brand)]"
        />
      </div>
    </div>
  );
}

function StepGoals({
  draft,
  setDraft,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
}) {
  function toggle(g: string) {
    const s = new Set(draft.goals);
    if (s.has(g)) s.delete(g);
    else s.add(g);
    setDraft({ goals: [...s] });
  }
  return (
    <div>
      <StepHeader
        title="What are you optimizing for?"
        description="Choose up to three. We'll prioritize recommendations to match."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {GOAL_OPTIONS.map((g) => {
          const active = draft.goals.includes(g);
          return (
            <button
              key={g}
              onClick={() => toggle(g)}
              className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                active
                  ? "border-primary bg-primary/5 text-foreground shadow-soft"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <span>{g}</span>
              {active && <CheckCircle2 className="h-4 w-4 text-brand" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepReview({
  pipelineStatus,
  isProcessing,
}: {
  pipelineStatus?: string;
  isProcessing: boolean;
}) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground animate-pulse">
        Loading profile...
      </div>
    );
  }

  return (
    <div>
      <StepHeader
        title="Review your career profile"
        description="Confirm your role context before we map competencies from your profile."
      />

      {isProcessing && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-primary/20 bg-brand/10 p-4">
          <Loader2 className="h-5 w-5 shrink-0 animate-spin text-brand" />
          <div>
            <p className="text-sm font-semibold text-foreground">AI competency mapping in progress</p>
            <p className="text-xs text-muted-foreground">
              Status: {pipelineStatus ?? "STARTING"} — this usually takes 1–3 minutes. You can
              continue to the next step once mapping completes.
            </p>
          </div>
        </div>
      )}

      <dl className="grid gap-4 md:grid-cols-2">
        <ReviewRow label="Job title" value={profile?.jobTitle || "—"} />
        <ReviewRow label="Industry" value={profile?.industry || "—"} />
        <ReviewRow label="Business function" value={profile?.businessFunction || "—"} />
        <ReviewRow label="Domain" value={profile?.domain || "—"} />
        <ReviewRow label="Specialization" value={profile?.specialization || "—"} />
        <ReviewRow
          label="Experience"
          value={profile?.experience ? `${profile.experience} years` : "—"}
        />
        <ReviewRow label="Salary" value={profile?.salary ? `$${profile.salary}` : "—"} />
        <ReviewRow label="AI usage" value={profile?.aiFrequency || "—"} />
        <ReviewRow
          label="AI tools"
          value={profile?.aiTools?.length ? profile.aiTools.join(", ") : "—"}
          className="md:col-span-2"
        />
      </dl>
    </div>
  );
}

function ReviewRow({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-background p-3 ${className || ""}`}>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium capitalize text-foreground">{value}</dd>
    </div>
  );
}


function StepCompetencies({
  draft,
  setDraft,
  competencyMapping,
  status,
  pipelineProgress,
  isProcessing,
  isComplete,
  isFailed,
  profileStale,
  pipelineError,
  startError,
  onRetry,
  isRetrying,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
  competencyMapping: CompetencyMappingOutput | null;
  status?: string;
  pipelineProgress: { completed: number; total: number; currentStage: string | null };
  isProcessing: boolean;
  isComplete: boolean;
  isFailed: boolean;
  profileStale?: boolean;
  pipelineError: { message: string; failed_stage?: string | null } | null;
  startError: Error | null;
  onRetry: () => void;
  isRetrying: boolean;
}) {
  const [expanded, setExpanded] = useState<string>("");

  const competencies = competencyMapping?.competencies ?? [];
  const grouped = useMemo(
    () => groupCompetenciesByCategory(competencies),
    [competencies],
  );
  const categories = useMemo(() => Object.keys(grouped), [grouped]);
  const competencyNamesKey = useMemo(
    () => competencies.map((c) => c.name).join("\0"),
    [competencies],
  );

  useEffect(() => {
    if (!competencyNamesKey) return;
    setDraft({ competencies: competencyNamesKey.split("\0") });
  }, [competencyNamesKey, setDraft]);

  useEffect(() => {
    if (categories.length > 0) {
      setExpanded((prev) => prev || categories[0]);
    }
  }, [categories]);

  if (startError) {
    return (
      <div className="py-12 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
        <h3 className="mt-4 font-semibold">Could not start assessment</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {(startError as Error).message || "Please complete your My Career profile first."}
        </p>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="py-12 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
        <h3 className="mt-4 font-semibold">Competency mapping failed</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {pipelineError?.message ?? "The AI pipeline encountered an error."}
          {pipelineError?.failed_stage && (
            <span className="block mt-1">Failed at: {pipelineError.failed_stage}</span>
          )}
        </p>
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {isRetrying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Retry mapping
        </button>
      </div>
    );
  }

  if (isComplete && !competencyMapping) {
    return (
      <div className="py-12 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-500" />
        <h3 className="mt-4 font-semibold">Mapping completed without results</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The pipeline finished but no competencies were returned. Try running the mapping again.
        </p>
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {isRetrying ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Retry mapping
        </button>
      </div>
    );
  }

  if (isProcessing) {
    const stageLabel = pipelineProgress.currentStage
      ? pipelineProgress.currentStage.replace(/_/g, " ")
      : "initializing";
    const progressPct = Math.round(
      (pipelineProgress.completed / pipelineProgress.total) * 100,
    );

    return (
      <div className="py-16 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand" />
        <h3 className="mt-6 font-display text-xl font-bold">
          {profileStale ? "Updating competency mapping" : "Mapping your competencies"}
        </h3>
        <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
          {profileStale
            ? "Your career profile changed — we're regenerating competencies from your latest profile."
            : "Running AI analysis on your role profile. This typically takes 1-2 minutes across 5 stages."}
        </p>

        <div className="mx-auto mt-8 max-w-sm">
          <div className="mb-2 flex justify-between text-xs font-medium text-muted-foreground">
            <span>Stage {pipelineProgress.completed + 1} of {pipelineProgress.total}</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500"
              style={{ width: `${Math.max(progressPct, 5)}%` }}
            />
          </div>
          <p className="mt-3 text-xs capitalize text-muted-foreground">
            Current: {stageLabel}
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Status: {status ?? "STARTING"}
          </p>
        </div>

        {pipelineProgress.completed === 0 && status === "PROCESSING" && (
          <p className="mt-6 text-xs text-muted-foreground">
            If this takes longer than 8 minutes, use Retry below.
          </p>
        )}

        {pipelineProgress.completed >= 1 && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            {isRetrying ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Stuck? Retry mapping
          </button>
        )}
      </div>
    );
  }

  const counts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = grouped[cat].length;
    return acc;
  }, {});
  const totalCount = competencies.length;

  return (
    <div>
      <StepHeader
        title="Competency Mapping"
        description="AI-identified competencies for your role based on your career profile."
      />

      {competencyMapping.profession_summary && (
        <div className="mb-8 rounded-2xl border border-primary/20 bg-brand/10 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Profession summary
          </h3>
          <p className="text-sm leading-relaxed text-foreground">
            {competencyMapping.profession_summary}
          </p>
        </div>
      )}

      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-brand p-4 text-foreground">
        <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold">AI Generated from your profile</h3>
          <p className="text-sm opacity-80">
            Competencies mapped for your job title, industry, business function, domain, and
            specialization.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold">{totalCount}</div>
          <div className="text-[10px] uppercase tracking-wider opacity-80">Competencies</div>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-4">
          {categories.map((cat) => {
            const list = grouped[cat];
            const isExpanded = expanded === cat;
            return (
              <div
                key={cat}
                className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? "" : cat)}
                  className="flex w-full items-center justify-between bg-muted/30 px-6 py-4 transition-colors hover:bg-muted/50"
                >
                  <span className="font-display text-lg font-semibold">{cat}</span>
                  <span className="mr-2 text-sm text-muted-foreground">{list.length}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-3">
                        {list.map((c) => (
                          <CompetencyCard key={c.name} competency={c} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="w-full shrink-0 lg:w-72">
          <div className="sticky top-6 rounded-2xl border border-border bg-background p-6 shadow-soft">
            <h3 className="mb-4 font-display text-lg font-bold">Summary</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{cat}</span>
                  <span className="font-semibold text-foreground">{counts[cat]}</span>
                </div>
              ))}
              <div className="my-4 h-px w-full bg-border" />
              <div className="flex items-center justify-between text-base font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-brand">{totalCount}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Review these competencies before continuing to task analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetencyCard({ competency }: { competency: CompetencyItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <div className="font-medium text-foreground">{competency.name}</div>
          <div className="mt-1 flex flex-wrap gap-2">
            {competency.importance && (
              <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                {competency.importance}
              </span>
            )}
            {competency.expected_level && (
              <span className="inline-flex rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal">
                {competency.expected_level}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-3 space-y-2 text-sm text-muted-foreground border-t border-border pt-3">
          {competency.what_it_is && (
            <p>
              <span className="font-semibold text-foreground">What: </span>
              {competency.what_it_is}
            </p>
          )}
          {competency.why_it_matters && (
            <p>
              <span className="font-semibold text-foreground">Why: </span>
              {competency.why_it_matters}
            </p>
          )}
          {competency.professional_context && (
            <p>
              <span className="font-semibold text-foreground">Context: </span>
              {competency.professional_context}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AssessmentWizard;
