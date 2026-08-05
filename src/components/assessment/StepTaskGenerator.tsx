import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bot,
  CheckCircle2,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  generateAssessmentTasks,
  getAssessmentTasks,
  mapBackendTaskToFrontend,
  mapSuggestedToTask,
  type SuggestedTask,
} from "@/api/tasks";
import type { useAssessment } from "@/store/mock-store";

function StepHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

type Props = {
  assessmentId: string | null;
  isCompetencyComplete: boolean;
  draft: ReturnType<typeof useAssessment>["draft"];
  setDraft: ReturnType<typeof useAssessment>["setDraft"];
};

export default function StepTaskGenerator({
  assessmentId,
  isCompetencyComplete,
  draft,
  setDraft,
}: Props) {
  const queryClient = useQueryClient();
  const generateRequestedRef = useRef(false);
  const [suggestedAdditional, setSuggestedAdditional] = useState<SuggestedTask[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    category: "",
    description: "",
    hoursPerWeek: 5,
  });

  useEffect(() => {
    generateRequestedRef.current = false;
  }, [assessmentId]);

  const tasksQuery = useQuery({
    queryKey: ["assessment-tasks", assessmentId],
    queryFn: () => getAssessmentTasks(assessmentId!),
    enabled: !!assessmentId && isCompetencyComplete,
    staleTime: 60_000,
  });

  const generateMutation = useMutation({
    mutationFn: (regenerate: boolean) => generateAssessmentTasks(assessmentId!, regenerate),
    onSuccess: (data) => {
      const mapped = data.tasks.map(mapBackendTaskToFrontend);
      setDraft({ tasks: mapped });
      setSuggestedAdditional(data.suggested_additional ?? []);
      queryClient.setQueryData(["assessment-tasks", assessmentId], data.tasks);
    },
  });

  useEffect(() => {
    if (!assessmentId || !isCompetencyComplete || tasksQuery.isLoading) return;
    if (tasksQuery.data && tasksQuery.data.length > 0) {
      setDraft({ tasks: tasksQuery.data.map(mapBackendTaskToFrontend) });
      return;
    }
    if (
      tasksQuery.data &&
      tasksQuery.data.length === 0 &&
      !generateRequestedRef.current &&
      !generateMutation.isPending
    ) {
      generateRequestedRef.current = true;
      generateMutation.mutate(false);
    }
  }, [
    assessmentId,
    isCompetencyComplete,
    tasksQuery.data,
    tasksQuery.isLoading,
    setDraft,
    generateMutation.isPending,
  ]);

  const tasksKey = draft.tasks.map((t) => t.id).join("\0");

  useEffect(() => {
    if (tasksKey) return;
    if (tasksQuery.data?.length) {
      setDraft({ tasks: tasksQuery.data.map(mapBackendTaskToFrontend) });
    }
  }, [tasksKey, tasksQuery.data, setDraft]);

  if (!isCompetencyComplete) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Complete competency mapping before generating tasks.
      </div>
    );
  }

  if (!assessmentId) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Starting assessment session...
      </div>
    );
  }

  if (tasksQuery.isLoading || (generateMutation.isPending && draft.tasks.length === 0)) {
    return (
      <div className="py-16 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand" />
        <h3 className="mt-6 font-display text-xl font-bold">Generating your daily work tasks</h3>
        <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
          AI is analyzing your role profile and mapped competencies to identify typical daily
          activities.
        </p>
      </div>
    );
  }

  if (generateMutation.isError) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-destructive mb-4">
          {(generateMutation.error as Error).message || "Failed to generate tasks"}
        </p>
        <button
          onClick={() => generateMutation.mutate(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <RefreshCw className="h-4 w-4" /> Retry generation
        </button>
      </div>
    );
  }

  function toggleTask(id: string) {
    setDraft({
      tasks: draft.tasks.map((t) => (t.id === id ? { ...t, selected: !(t.selected ?? true) } : t)),
    });
  }

  function deleteTask(id: string) {
    setDraft({ tasks: draft.tasks.filter((t) => t.id !== id) });
  }

  function handleAddCustom() {
    if (!newTask.title.trim()) return;
    setDraft({
      tasks: [
        ...draft.tasks,
        {
          id: crypto.randomUUID(),
          title: newTask.title,
          category: newTask.category || "General",
          description: newTask.description,
          hoursPerWeek: newTask.hoursPerWeek,
          selected: true,
          source: "USER",
          complexity: "medium",
          creativity: "medium",
          humanTouch: "medium",
        },
      ],
    });
    setIsAdding(false);
    setNewTask({ title: "", category: "", description: "", hoursPerWeek: 5 });
  }

  function addSuggested(s: SuggestedTask) {
    setDraft({
      tasks: [...draft.tasks, mapSuggestedToTask(s)],
    });
    setSuggestedAdditional((prev) => prev.filter((item) => item.title !== s.title));
  }

  const selectedTasks = draft.tasks.filter((t) => t.selected ?? true);
  const totalHours = selectedTasks.reduce((acc, t) => acc + t.hoursPerWeek, 0);
  const categoriesCovered = new Set(selectedTasks.map((t) => t.category || "Uncategorized")).size;
  const avgConfidence =
    selectedTasks.filter((t) => t.confidence != null).length > 0
      ? Math.round(
          selectedTasks
            .filter((t) => t.confidence != null)
            .reduce((acc, t) => acc + (t.confidence ?? 0), 0) /
            selectedTasks.filter((t) => t.confidence != null).length,
        )
      : null;

  const groupedTasks = draft.tasks.reduce(
    (acc, t) => {
      const cat = t.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(t);
      return acc;
    },
    {} as Record<string, typeof draft.tasks>,
  );

  const availableSuggested = suggestedAdditional.filter(
    (s) => !draft.tasks.some((t) => t.title.toLowerCase() === s.title.toLowerCase()),
  );

  return (
    <div>
      <StepHeader
        title="Daily Work Profile"
        description="Based on your career profile and competencies, we've identified activities that likely occupy your working day."
      />

      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-brand p-4 text-foreground">
        <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold">AI Generated from your profile</h3>
          <p className="text-sm opacity-80">
            Tasks derived from your job title, industry, domain, and mapped competencies. Select
            or deselect tasks, add custom ones, or refine details in the next step.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {avgConfidence != null && (
            <div className="text-right">
              <div className="text-sm font-bold">{avgConfidence}%</div>
              <div className="text-[10px] uppercase tracking-wider opacity-80">Avg confidence</div>
            </div>
          )}
          <button
            type="button"
            onClick={() => generateMutation.mutate(true)}
            disabled={generateMutation.isPending}
            className="inline-flex items-center gap-1 text-xs font-medium opacity-80 hover:opacity-100"
          >
            <RefreshCw className="h-3 w-3" /> Regenerate
          </button>
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
                          type="button"
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
                          <h4 className="font-semibold text-foreground truncate">{t.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {t.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-sm font-semibold text-foreground">
                            {t.hoursPerWeek} hrs
                          </div>
                          {t.confidence != null && (
                            <div className="mt-1 inline-flex items-center rounded-full bg-teal/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-teal">
                              {t.confidence}% Conf
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
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
                <button type="button" onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-foreground">
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
                type="button"
                onClick={handleAddCustom}
                className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Add Task
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 py-4 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            >
              <Plus className="h-4 w-4" /> Add Task
            </button>
          )}

          {availableSuggested.length > 0 && (
            <div className="pt-8">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Suggested Missing Tasks
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {availableSuggested.map((s) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => addSuggested(s)}
                    className="group flex items-center justify-between rounded-xl border border-border bg-background p-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary">
                        {s.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.category} · {s.hours_per_week} hrs
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}
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
                The selected tasks will be analyzed using the CareerShift 3B Framework (BUILD • BOT
                • BLEND) to determine automation opportunities and AI augmentation potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
