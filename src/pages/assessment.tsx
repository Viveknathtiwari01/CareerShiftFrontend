import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardList,
  Cpu,
  Heart,
  Plus,
  Sparkles,
  Target,
  Trash2,
  Wrench,
} from "lucide-react";
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
  { key: "role", label: "Role", icon: ClipboardList },
  { key: "tools", label: "Tools", icon: Wrench },
  { key: "tasks", label: "Tasks", icon: Cpu },
  { key: "attitude", label: "Attitude", icon: Heart },
  { key: "goals", label: "Goals", icon: Target },
  { key: "review", label: "Review", icon: CheckCircle2 },
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
    setSubmitted(true);
  }

  if (submitted) return <Success onContinue={() => navigate("/report")} />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Stepper */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 text-brand">
            <Sparkles className="h-3.5 w-3.5" /> Assessment
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-teal transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ol className="mt-6 hidden grid-cols-6 gap-2 md:grid">
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

      <div className="surface-card p-6 md:p-10">
        {step === 0 && <StepRole draft={draft} setDraft={setDraft} />}
        {step === 1 && <StepTools draft={draft} setDraft={setDraft} />}
        {step === 2 && (
          <StepTasks
            draft={draft}
            addTask={addTask}
            updateTask={updateTask}
            removeTask={removeTask}
          />
        )}
        {step === 3 && <StepAttitude draft={draft} setDraft={setDraft} />}
        {step === 4 && <StepGoals draft={draft} setDraft={setDraft} />}
        {step === 5 && <StepReview />}
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
            <Bot className="h-4 w-4" /> Generate my Report
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
    <div>
      <StepHeader
        title="Tell us about your role"
        description="This anchors how we interpret your tasks and toolkit."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium">Job title</span>
          <input
            type="text"
            value={draft.role}
            onChange={(e) => setDraft({ role: e.target.value })}
            placeholder="e.g. Marketing Manager"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium">Industry</span>
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
            <span className="text-xs font-medium">Years of experience</span>
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
        <span className="mb-2 block text-xs font-medium">
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
  addTask,
  updateTask,
  removeTask,
}: {
  draft: ReturnType<typeof useAssessment>["draft"];
  addTask: ReturnType<typeof useAssessment>["addTask"];
  updateTask: ReturnType<typeof useAssessment>["updateTask"];
  removeTask: ReturnType<typeof useAssessment>["removeTask"];
}) {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(3);

  function add() {
    if (!title.trim()) return;
    const t: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      hoursPerWeek: hours,
      complexity: "medium",
      creativity: "medium",
      humanTouch: "medium",
    };
    addTask(t);
    setTitle("");
    setHours(3);
  }

  return (
    <div>
      <StepHeader
        title="What do you actually do in a week?"
        description="Add 3–8 recurring tasks. For each one, rate complexity, creativity, and human touch — this powers your task routing."
      />

      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <label className="flex-1">
            <span className="mb-1 block text-xs font-medium">Task</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="e.g. Draft weekly stakeholder report"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="md:w-40">
            <span className="mb-1 block text-xs font-medium">Hours / week</span>
            <input
              type="number"
              min={0}
              max={40}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            onClick={add}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {draft.tasks.length === 0 && (
          <li className="rounded-xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">
            No tasks yet. Add your first weekly task above.
          </li>
        )}
        {draft.tasks.map((t) => (
          <li key={t.id} className="surface-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{t.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.hoursPerWeek} hrs / week</p>
              </div>
              <button
                onClick={() => removeTask(t.id)}
                aria-label="Remove"
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-danger"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <TaskRating
                label="Complexity"
                value={t.complexity}
                onChange={(v) => updateTask(t.id, { complexity: v })}
              />
              <TaskRating
                label="Creativity"
                value={t.creativity}
                onChange={(v) => updateTask(t.id, { creativity: v })}
              />
              <TaskRating
                label="Human touch"
                value={t.humanTouch}
                onChange={(v) => updateTask(t.id, { humanTouch: v })}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TaskRating({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "low" | "medium" | "high";
  onChange: (v: "low" | "medium" | "high") => void;
}) {
  return (
    <div>
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="grid grid-cols-3 rounded-lg border border-border bg-background p-0.5 text-xs">
        {(["low", "medium", "high"] as const).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`rounded-md py-1.5 font-medium capitalize transition-colors ${
              value === v
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
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

export default AssessmentWizard;
