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
  { key: "role", label: "Career Profile Review", icon: ClipboardList },
  { key: "tools", label: "Tools", icon: Wrench },
  { key: "attitude", label: "Attitude", icon: Heart },
  { key: "goals", label: "Goals", icon: Target },
  { key: "finalReport", label: "Review Assessment", icon: CheckCircle2 },
  { key: "competencies", label: "Competencies", icon: Map },
  { key: "taskGen", label: "Task Generator", icon: ListTodo },
  { key: "tasks", label: "Task Intelligence Review", icon: Cpu },
  { key: "3bAnalysis", label: "3B Analysis", icon: Brain },
] as const;

function AssessmentWizard() {
  const { draft, setDraft, addTask, updateTask, removeTask, submit } = useAssessment();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }
  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleSubmit() {
    submit();
    navigate("/ai-readiness");
  }

  if (submitted) return <Success onContinue={() => navigate("/report")} />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Stepper */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between text-2xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 text-brand">Assessment Profile</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-teal transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ol className="mt-6 hidden grid-cols-9 gap-2 md:grid">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <li key={s.key} className="flex flex-col items-center gap-2 text-center">
                <div
                  className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
                    done
                      ? "border-teal bg-teal text-primary-foreground"
                      : active
                        ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-background text-muted-foreground"
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

      <div className=" bg-card p-6 md:p-10 rounded-lg shadow-md">
        {STEPS[step].key === "role" && <StepRole draft={draft} setDraft={setDraft} />}
        {STEPS[step].key === "tools" && <StepTools draft={draft} setDraft={setDraft} />}
        {STEPS[step].key === "attitude" && <StepAttitude draft={draft} setDraft={setDraft} />}
        {STEPS[step].key === "goals" && <StepGoals draft={draft} setDraft={setDraft} />}
        {STEPS[step].key === "competencies" && (
          <StepCompetencies draft={draft} setDraft={setDraft} />
        )}
        {STEPS[step].key === "taskGen" && <StepTaskGenerator draft={draft} setDraft={setDraft} />}
        {STEPS[step].key === "tasks" && (
          <StepTasks draft={draft} updateTask={updateTask} removeTask={removeTask} />
        )}
        {STEPS[step].key === "3bAnalysis" && <Step3BAnalysis draft={draft} />}
        {STEPS[step].key === "finalReport" && <StepReview />}
      </div>

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
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02]"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated"
          >
            View AI Readiness Score
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
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  updateTask: ReturnType<typeof useAssessment>["updateTask"];
  removeTask: ReturnType<typeof useAssessment>["removeTask"];
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
                Please complete the review for all tasks to unlock maximum AI accuracy.
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

function StepReview() {
  const { draft } = useAssessment();
  return (
    <div>
      <StepHeader
        title="Review & submit"
        description="Confirm everything looks right before we generate your Report."
      />
      <dl className="grid gap-4 md:grid-cols-2">
        <ReviewRow label="Role" value={draft.role || "—"} />
        <ReviewRow label="Industry" value={draft.industry || "—"} />
        <ReviewRow label="Experience" value={`${draft.yearsExp} years`} />
        <ReviewRow label="AI usage today" value={draft.aiUsage} />
        <ReviewRow label="Tools" value={draft.tools.length ? draft.tools.join(", ") : "—"} />
        <ReviewRow
          label="Competencies"
          value={draft.competencies?.length ? draft.competencies.join(", ") : "—"}
        />
        <ReviewRow label="Goals" value={draft.goals.length ? draft.goals.join(", ") : "—"} />
      </dl>
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tasks ({draft.tasks.length})
        </p>
        <ul className="space-y-2">
          {draft.tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <span className="truncate">{t.title}</span>
              <span className="text-xs text-muted-foreground">
                {t.hoursPerWeek}h · {t.complexity}/{t.creativity}/{t.humanTouch}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium capitalize text-foreground">{value}</dd>
    </div>
  );
}

function Success({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-6 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal/15 text-teal">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
          Your Report is ready
        </h1>
        <p className="mt-3 text-muted-foreground">
          We analyzed your role, tools, and tasks. Head to your personalized AI Career Readiness
          Report.
        </p>
        <button
          onClick={onContinue}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02]"
        >
          View my Report <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const MOCK_COMPETENCIES = {
  Technical: [
    "REST API Development",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Authentication",
    "System Design",
    "Microservices",
    "Docker",
  ],
  Business: [
    "Requirement Gathering",
    "Client Communication",
    "Stakeholder Management",
    "Healthcare Compliance",
    "Estimation",
  ],
  Behavioral: [
    "Leadership",
    "Problem Solving",
    "Critical Thinking",
    "Decision Making",
    "Mentoring",
  ],
};

function StepCompetencies({
  draft,
  setDraft,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
}) {
  const [expanded, setExpanded] = useState<string>("Technical");
  const [customInput, setCustomInput] = useState<Record<string, string>>({
    Technical: "",
    Business: "",
    Behavioral: "",
  });

  // Default to selecting all mock competencies if none are selected yet
  useEffect(() => {
    if (!draft.competencies || draft.competencies.length === 0) {
      const all = Object.values(MOCK_COMPETENCIES).flat();
      setDraft({ competencies: all });
    }
  }, []);

  const selected = new Set(draft.competencies || []);

  function toggle(c: string) {
    const s = new Set(selected);
    if (s.has(c)) s.delete(c);
    else s.add(c);
    setDraft({ competencies: [...s] });
  }

  function addCustom(cat: string) {
    const val = customInput[cat]?.trim();
    if (!val) return;
    const s = new Set(selected);
    s.add(val);
    setDraft({ competencies: [...s] });
    setCustomInput((p) => ({ ...p, [cat]: "" }));
    // Add to MOCK_COMPETENCIES locally so it shows up in this category
    if (!MOCK_COMPETENCIES[cat as keyof typeof MOCK_COMPETENCIES].includes(val)) {
      MOCK_COMPETENCIES[cat as keyof typeof MOCK_COMPETENCIES].push(val);
    }
  }

  const counts = {
    Technical: MOCK_COMPETENCIES.Technical.filter((c) => selected.has(c)).length,
    Business: MOCK_COMPETENCIES.Business.filter((c) => selected.has(c)).length,
    Behavioral: MOCK_COMPETENCIES.Behavioral.filter((c) => selected.has(c)).length,
    Total: selected.size,
  };

  return (
    <div>
      <StepHeader
        title="Competency Mapping"
        description="We've identified the key competencies expected for your current role. Review them before continuing."
      />

      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-brand p-4 text-foreground">
        <div className="flex-1">
          <h3 className="font-semibold">AI Generated</h3>
          <p className="text-sm opacity-80">
            We've auto-generated these tasks based on industry benchmarks for your role.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold">94%</div>
          <div className="text-[10px] uppercase tracking-wider opacity-80">Confidence</div>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-4">
          {Object.entries(MOCK_COMPETENCIES).map(([cat, list]) => {
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
                  <span className="font-display text-lg font-semibold">{cat} Competencies</span>
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
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {list.map((c) => {
                            const active = selected.has(c);
                            const confidence = ["High", "Medium", "Low"][
                              Math.floor(Math.random() * 3)
                            ];
                            return (
                              <button
                                key={c}
                                onClick={() => toggle(c)}
                                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                                  active
                                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                }`}
                              >
                                {c}
                                {active && (
                                  <span className="ml-1 inline-flex items-center rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                    {confidence}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-4 flex max-w-sm items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add custom competency..."
                            value={customInput[cat]}
                            onChange={(e) =>
                              setCustomInput((p) => ({ ...p, [cat]: e.target.value }))
                            }
                            onKeyDown={(e) => e.key === "Enter" && addCustom(cat)}
                            className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                          />
                          <button
                            onClick={() => addCustom(cat)}
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
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
          <div className="sticky top-6 rounded-2xl border border-border bg-background p-6 shadow-soft">
            <h3 className="mb-4 font-display text-lg font-bold">Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Technical</span>
                <span className="font-semibold text-foreground">{counts.Technical}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Business</span>
                <span className="font-semibold text-foreground">{counts.Business}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Behavioral</span>
                <span className="font-semibold text-foreground">{counts.Behavioral}</span>
              </div>
              <div className="my-4 h-px w-full bg-border" />
              <div className="flex items-center justify-between text-base font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-brand">{counts.Total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCK_TASKS = [
  {
    title: "Build REST APIs",
    category: "Development",
    description: "Develop and maintain scalable RESTful API endpoints.",
    confidence: 95,
    hoursPerWeek: 18,
  },
  {
    title: "Develop Backend Services",
    category: "Development",
    description: "Create robust backend microservices.",
    confidence: 88,
    hoursPerWeek: 12,
  },
  {
    title: "Write Unit Tests",
    category: "Development",
    description: "Ensure code quality through comprehensive testing.",
    confidence: 90,
    hoursPerWeek: 5,
  },
  {
    title: "Design APIs",
    category: "Architecture",
    description: "Architect API contracts and data models.",
    confidence: 92,
    hoursPerWeek: 4,
  },
  {
    title: "Database Design",
    category: "Architecture",
    description: "Design schema and optimize queries.",
    confidence: 85,
    hoursPerWeek: 3,
  },
  {
    title: "Client Meetings",
    category: "Collaboration",
    description: "Meet with stakeholders to discuss requirements.",
    confidence: 80,
    hoursPerWeek: 4,
  },
  {
    title: "Sprint Planning",
    category: "Collaboration",
    description: "Plan and estimate tasks for the sprint.",
    confidence: 85,
    hoursPerWeek: 2,
  },
  {
    title: "Deployment",
    category: "Operations",
    description: "Manage release pipelines and production deployments.",
    confidence: 75,
    hoursPerWeek: 3,
  },
];

const SUGGESTED_MISSING = [
  {
    title: "Documentation",
    category: "Development",
    description: "Write and maintain technical docs.",
    confidence: 70,
    hoursPerWeek: 2,
  },
  {
    title: "Mentoring",
    category: "Collaboration",
    description: "Mentor junior team members.",
    confidence: 60,
    hoursPerWeek: 3,
  },
  {
    title: "Code Reviews",
    category: "Development",
    description: "Review peer code changes.",
    confidence: 85,
    hoursPerWeek: 5,
  },
];

function StepTaskGenerator({
  draft,
  setDraft,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    category: "Development",
    description: "",
    hoursPerWeek: 5,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (draft.tasks.length === 0) {
      const initialTasks = MOCK_TASKS.map((t) => ({
        id: crypto.randomUUID(),
        title: t.title,
        category: t.category,
        description: t.description,
        hoursPerWeek: t.hoursPerWeek,
        confidence: t.confidence,
        selected: true,
        complexity: "medium" as const,
        creativity: "medium" as const,
        humanTouch: "medium" as const,
      }));
      setDraft({ tasks: initialTasks });
    }
  }, []);

  function toggleTask(id: string) {
    setDraft({
      tasks: draft.tasks.map((t) => (t.id === id ? { ...t, selected: !(t.selected ?? true) } : t)),
    });
  }

  function deleteTask(id: string) {
    setDraft({ tasks: draft.tasks.filter((t) => t.id !== id) });
  }

  function startEdit(t: any) {
    setEditingId(t.id);
    setEditTitle(t.title);
  }

  function saveEdit(id: string) {
    setDraft({
      tasks: draft.tasks.map((t) => (t.id === id ? { ...t, title: editTitle } : t)),
    });
    setEditingId(null);
  }

  function handleAddCustom() {
    if (!newTask.title.trim()) return;
    setDraft({
      tasks: [
        ...draft.tasks,
        {
          id: crypto.randomUUID(),
          title: newTask.title,
          category: newTask.category,
          description: newTask.description,
          hoursPerWeek: newTask.hoursPerWeek,
          selected: true,
          complexity: "medium",
          creativity: "medium",
          humanTouch: "medium",
        },
      ],
    });
    setIsAdding(false);
    setNewTask({ title: "", category: "Development", description: "", hoursPerWeek: 5 });
  }

  function addSuggested(s: (typeof SUGGESTED_MISSING)[0]) {
    setDraft({
      tasks: [
        ...draft.tasks,
        {
          id: crypto.randomUUID(),
          title: s.title,
          category: s.category,
          description: s.description,
          hoursPerWeek: s.hoursPerWeek,
          confidence: s.confidence,
          selected: true,
          complexity: "medium",
          creativity: "medium",
          humanTouch: "medium",
        },
      ],
    });
  }

  const selectedTasks = draft.tasks.filter((t) => t.selected ?? true);
  const totalHours = selectedTasks.reduce((acc, t) => acc + t.hoursPerWeek, 0);
  const categoriesCovered = new Set(selectedTasks.map((t) => t.category || "Uncategorized")).size;

  // Group tasks by category
  const groupedTasks = draft.tasks.reduce(
    (acc, t) => {
      const cat = t.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(t);
      return acc;
    },
    {} as Record<string, typeof draft.tasks>,
  );

  return (
    <div>
      <StepHeader
        title="Daily Work Profile"
        description="Based on your career profile and competencies, we've identified the activities that likely occupy your working day."
      />

      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-brand p-4 text-foreground">
        <div className="flex-1">
          <h3 className="font-semibold">AI Generated</h3>
          <p className="text-sm opacity-80">
            We've auto-generated these tasks based on industry benchmarks for your role.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold">94%</div>
          <div className="text-[10px] uppercase tracking-wider opacity-80">Confidence</div>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-8">
          {Object.entries(groupedTasks).map(([cat, tasks]) => (
            <div key={cat}>
              <h3 className="mb-4 font-display text-lg font-bold">{cat}</h3>
              <div className="space-y-3">
                {tasks.map((t) => {
                  const isSelected = t.selected ?? true;
                  const isEditing = editingId === t.id;
                  return (
                    <div
                      key={t.id}
                      className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
                        isSelected
                          ? "border-primary/50 bg-primary/5 shadow-soft"
                          : "border-border bg-background opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleTask(t.id)}
                          className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input bg-background"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="h-3 w-3" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          {isEditing ? (
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                autoFocus
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && saveEdit(t.id)}
                                className="w-full rounded-md border border-input bg-background px-2 py-1 text-sm outline-none focus:border-primary"
                              />
                              <button
                                onClick={() => saveEdit(t.id)}
                                className="text-xs font-semibold text-primary"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground truncate">{t.title}</h4>
                              <button
                                onClick={() => startEdit(t)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {t.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-sm font-semibold text-foreground">
                            {t.hoursPerWeek} hrs
                          </div>
                          {t.confidence && (
                            <div className="mt-1 inline-flex items-center rounded-full bg-teal/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-teal">
                              {t.confidence}% Conf
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => deleteTask(t.id)}
                          className="ml-2 text-muted-foreground hover:text-danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {isAdding ? (
            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Add Custom Task</h4>
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium">Task Name</span>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium">Category</span>
                  <input
                    type="text"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-xs font-medium">Description</span>
                  <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium">Weekly Hours</span>
                  <input
                    type="number"
                    min={1}
                    value={newTask.hoursPerWeek}
                    onChange={(e) =>
                      setNewTask({ ...newTask, hoursPerWeek: Number(e.target.value) })
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
              </div>
              <button
                onClick={handleAddCustom}
                className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Add Task
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 py-4 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            >
              <Plus className="h-4 w-4" /> Add Task
            </button>
          )}

          <div className="pt-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Suggested Missing Tasks
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {SUGGESTED_MISSING.filter((s) => !draft.tasks.some((t) => t.title === s.title)).map(
                (s) => (
                  <button
                    key={s.title}
                    onClick={() => addSuggested(s)}
                    className="group flex items-center justify-between rounded-xl border border-border bg-background p-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary">
                        {s.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.category} · {s.hoursPerWeek} hrs
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="w-full shrink-0 lg:w-72">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <h3 className="mb-4 font-display text-lg font-bold">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Tasks</span>
                  <span className="font-semibold text-foreground">{draft.tasks.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Selected Tasks</span>
                  <span className="font-semibold text-foreground">{selectedTasks.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Categories Covered</span>
                  <span className="font-semibold text-foreground">{categoriesCovered}</span>
                </div>
                <div className="my-4 h-px w-full bg-border" />
                <div className="flex items-center justify-between text-base font-bold">
                  <span className="text-foreground">Weekly Hours</span>
                  <span className="text-brand">{totalHours}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-teal/5 p-5 text-sm text-teal-950 dark:text-teal-100">
              <h4 className="mb-2 font-bold flex items-center gap-1.5">
                <Bot className="h-4 w-4" /> Next Step
              </h4>
              <p className="opacity-90">
                The selected tasks will be analyzed in the next step using the CareerShift 3B
                Framework (BUILD • BOT • BLEND) to determine automation opportunities, AI
                augmentation potential, and long-term career impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  title,
  category,
  count,
  description,
  tasks,
  isExpanded,
  onToggle,
}: {
  title: string;
  category: "BUILD" | "BOT" | "BLEND";
  count: number;
  description: string;
  tasks: any[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const color =
    category === "BUILD"
      ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
      : category === "BOT"
        ? "text-rose-500 border-rose-500/20 bg-rose-500/5"
        : "text-blue-500 border-blue-500/20 bg-blue-500/5";

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${isExpanded ? color : "border-border bg-background shadow-sm"}`}
    >
      <button onClick={onToggle} className="flex w-full items-center justify-between p-4 text-left">
        <div className="flex items-center gap-3">
          <div className="font-display text-lg font-bold">
            {title} <span className="ml-2 text-xs font-normal opacity-70">({count} Tasks)</span>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-current/10"
          >
            <div className="p-4 text-sm leading-relaxed opacity-90 border-b border-current/10">
              {description}
            </div>

            <div className="p-4 space-y-3 bg-background/50">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg border border-border bg-background p-4 shadow-sm"
                >
                  <h5 className="font-semibold text-foreground mb-1">{t.title}</h5>
                  <p className="text-xs text-muted-foreground mb-3">{t.reason}</p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                    <div className="flex flex-col">
                      <span className="font-medium text-muted-foreground">Auto Potential</span>
                      <span className="font-bold text-foreground">{t.autoPotential}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-muted-foreground">Risk Level</span>
                      <span
                        className={`font-bold ${t.riskLevel === "High" ? "text-rose-500" : "text-emerald-500"}`}
                      >
                        {t.riskLevel}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-muted-foreground">Future Imp.</span>
                      <span className="font-bold text-foreground">{t.futureImp}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="font-medium text-muted-foreground mb-1">
                        Recommended Tools
                      </span>
                      <div className="flex gap-1.5 flex-wrap">
                        {t.tools.map((tool: string) => (
                          <span
                            key={tool}
                            className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Step3BAnalysis({ draft }: { draft: ReturnType<typeof useAssessment>["draft"] }) {
  const selectedTasks = draft.tasks.filter((t) => t.selected ?? true);

  const analyzedTasks = useMemo(() => {
    return selectedTasks.map((t, idx) => {
      let category: "BUILD" | "BOT" | "BLEND" = "BLEND";
      let reason = "AI accelerates this workflow, but human judgment remains essential.";
      let autoPotential = 50;
      let riskLevel: "Low" | "Medium" | "High" = "Medium";
      let futureImp: "Low" | "Medium" | "High" = "High";

      if (idx % 3 === 0) {
        category = "BUILD";
        reason = "Human-first work requiring creativity, strategy, leadership, or deep expertise.";
        autoPotential = 15;
        riskLevel = "Low";
        futureImp = "High";
      } else if (idx % 3 === 1) {
        category = "BOT";
        reason = "Highly automatable work that can largely be delegated to AI.";
        autoPotential = 85;
        riskLevel = "High";
        futureImp = "Low";
      }

      return {
        ...t,
        category3B: category,
        reason,
        autoPotential,
        riskLevel,
        futureImp,
        tools: ["ChatGPT", "Copilot", "Claude"].slice(0, (idx % 3) + 1),
      };
    });
  }, [selectedTasks]);

  const buildTasks = analyzedTasks.filter((t) => t.category3B === "BUILD");
  const botTasks = analyzedTasks.filter((t) => t.category3B === "BOT");
  const blendTasks = analyzedTasks.filter((t) => t.category3B === "BLEND");

  const totalTasks = analyzedTasks.length || 1;
  const autoOpp = Math.round(
    analyzedTasks.reduce((acc, t) => acc + t.autoPotential, 0) / totalTasks,
  );

  const [expandedSection, setExpandedSection] = useState<"BUILD" | "BOT" | "BLEND" | null>("BUILD");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            3B Career Intelligence Analysis
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            We've analyzed your daily responsibilities to understand where AI will enhance,
            automate, or amplify your work.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 rounded-lg border border-primary/20 bg-brand px-4 py-2 shadow-sm shrink-0">
          <div className="text-sm">
            <span className="font-semibold text-primary-foreground">Analysis Complete</span>
            <span className="mx-2 text-primary-foreground/30">|</span>
            <span className="text-primary-foreground/80">94% Confidence</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Task Distribution Overview
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">BUILD</div>
            <div className="font-display text-2xl font-bold text-emerald-500">
              {buildTasks.length} <span className="text-xs font-medium opacity-70">Tasks</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground">BOT</div>
            <div className="font-display text-2xl font-bold text-rose-500">
              {botTasks.length} <span className="text-sm font-medium opacity-70">Tasks</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground">BLEND</div>
            <div className="font-display text-2xl font-bold text-blue-500">
              {blendTasks.length} <span className="text-sm font-medium opacity-70">Tasks</span>
            </div>
          </div>
          <div className="border-l border-border pl-4">
            <div className="text-xs font-semibold text-muted-foreground">Automation Opp.</div>
            <div className="font-display text-2xl font-bold text-primary">{autoOpp}%</div>
          </div>
        </div>

        <div className="flex h-4 w-full overflow-hidden rounded-full border border-border/50">
          <div
            style={{ width: `${(buildTasks.length / totalTasks) * 100}%` }}
            className="bg-emerald-500 transition-all duration-1000"
            title={`BUILD: ${buildTasks.length}`}
          />
          <div
            style={{ width: `${(blendTasks.length / totalTasks) * 100}%` }}
            className="bg-blue-500 transition-all duration-1000"
            title={`BLEND: ${blendTasks.length}`}
          />
          <div
            style={{ width: `${(botTasks.length / totalTasks) * 100}%` }}
            className="bg-rose-500 transition-all duration-1000"
            title={`BOT: ${botTasks.length}`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <CategorySection
          title="BUILD Tasks"
          category="BUILD"
          count={buildTasks.length}
          description="These tasks represent human-first work requiring creativity, strategy, leadership, or deep expertise. AI cannot replace these activities in the near future."
          tasks={buildTasks}
          isExpanded={expandedSection === "BUILD"}
          onToggle={() => setExpandedSection(expandedSection === "BUILD" ? null : "BUILD")}
        />
        <CategorySection
          title="BOT Tasks"
          category="BOT"
          count={botTasks.length}
          description="Highly automatable work that can largely be delegated to AI. Focus on mastering automation tools for these tasks to free up your time."
          tasks={botTasks}
          isExpanded={expandedSection === "BOT"}
          onToggle={() => setExpandedSection(expandedSection === "BOT" ? null : "BOT")}
        />
        <CategorySection
          title="BLEND Tasks"
          category="BLEND"
          count={blendTasks.length}
          description="Work where AI acts as a co-pilot, improving your productivity while human judgment remains essential. These tasks require a balance of tool proficiency and expertise."
          tasks={blendTasks}
          isExpanded={expandedSection === "BLEND"}
          onToggle={() => setExpandedSection(expandedSection === "BLEND" ? null : "BLEND")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-primary/20 bg-brand p-5 shadow-sm">
          <h3 className="mb-2 flex items-center gap-2 font-display text-base font-bold text-primary-foreground">
            AI Recommendations
          </h3>
          <p className="text-sm leading-relaxed text-primary-foreground/90">
            Focus on strengthening <strong className="font-semibold">BUILD</strong> skills. Use AI
            aggressively to automate <strong className="font-semibold">BOT</strong> tasks and
            improve efficiency in <strong className="font-semibold">BLEND</strong> activities.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-emerald-500 p-5 shadow-sm flex items-start gap-4">
          <div>
            <h3 className="font-display text-base font-bold mb-1 text-primary-foreground">
              Up Next: AI Readiness
            </h3>
            <p className="text-sm text-primary-foreground/90 leading-relaxed">
              We'll measure your overall AI Readiness and identify your biggest opportunities for
              career growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentWizard;
