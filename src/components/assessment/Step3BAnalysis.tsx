import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Download, Loader2, RefreshCw } from "lucide-react";
import {
  downloadCategoryAnalysis,
  formatGeneratedAt,
  getTaskAnalysis,
  mapAnalysisToDisplay,
  runTaskAnalysis,
  type ThreeBCategory,
} from "@/api/analysis";
import { SubmitAssessmentButton } from "@/components/assessment/SubmitAssessmentButton";
import { CollapsibleTaskCard, CategoryTabButton } from "@/components/assessment/ThreeBAnalysisParts";
import { getAssessmentTasks, mapBackendTaskToFrontend, isTaskReviewComplete } from "@/api/tasks";

function dominantCategory(hours?: {
  BUILD: { weekly_hours: number };
  BLEND: { weekly_hours: number };
  BOT: { weekly_hours: number };
}): ThreeBCategory {
  if (!hours) return "BLEND";
  const { BUILD: b, BLEND: bl, BOT: bo } = hours;
  if (b.weekly_hours >= bl.weekly_hours && b.weekly_hours >= bo.weekly_hours) return "BUILD";
  if (bo.weekly_hours >= bl.weekly_hours) return "BOT";
  return "BLEND";
}

type Props = {
  assessmentId: string | null;
  onReadyChange?: (ready: boolean) => void;
  showFooterLinks?: boolean;
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
  const [activeTab, setActiveTab] = useState<ThreeBCategory | "ALL">("BLEND");
  const [exportingPdf, setExportingPdf] = useState(false);
  const [confirmRegenerate, setConfirmRegenerate] = useState(false);
  const hasSetInitialTab = useRef(false);
  const taskCardRefs = useRef<Record<string, HTMLElement | null>>({});

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
      setConfirmRegenerate(false);
    },
  });

  useEffect(() => {
    analyzeRequestedRef.current = false;
    hasSetInitialTab.current = false;
  }, [assessmentId]);

  const tasksQuery = useQuery({
    queryKey: ["assessment-tasks", assessmentId],
    queryFn: () => getAssessmentTasks(assessmentId!),
    enabled: !!assessmentId,
    staleTime: 60_000,
  });

  const areTasksReviewed = useMemo(() => {
    if (!tasksQuery.data) return false;
    const selectedTasks = tasksQuery.data.filter((t) => t.selected).map(mapBackendTaskToFrontend);
    if (selectedTasks.length === 0) return false;
    return selectedTasks.every(isTaskReviewComplete);
  }, [tasksQuery.data]);

  useEffect(() => {
    if (!assessmentId || analysisQuery.isLoading || tasksQuery.isLoading) return;
    if (!areTasksReviewed) return;
    if ((analysisQuery.data?.analyses?.length ?? 0) > 0) return;
    if (!analyzeRequestedRef.current && !analyzeMutation.isPending) {
      analyzeRequestedRef.current = true;
      analyzeMutation.mutate(false);
    }
  }, [
    assessmentId,
    analysisQuery.data,
    analysisQuery.isLoading,
    analyzeMutation.isPending,
    areTasksReviewed,
    tasksQuery.isLoading,
  ]);

  const analyzedTasks = useMemo(
    () =>
      (analysisQuery.data?.analyses ?? [])
        .map(mapAnalysisToDisplay)
        .sort((a, b) => b.weeklyHours - a.weeklyHours),
    [analysisQuery.data?.analyses],
  );

  const hoursSummary = analysisQuery.data?.hours_summary;
  const recommendedBuildId = analysisQuery.data?.recommended_build_task_id ?? null;
  const generatedAtLabel = formatGeneratedAt(analysisQuery.data?.generated_at);

  const actionsStarted = analyzedTasks.filter(
    (t) => t.status === "PLANNED" || t.status === "DONE",
  ).length;

  useEffect(() => {
    if (hasSetInitialTab.current || !hoursSummary) return;
    setActiveTab(dominantCategory(hoursSummary));
    hasSetInitialTab.current = true;
  }, [hoursSummary]);

  const isLoading =
    analysisQuery.isLoading || (analyzeMutation.isPending && analyzedTasks.length === 0);
  const isReady = analyzedTasks.length > 0 && !isLoading;

  useEffect(() => {
    onReadyChange?.(isReady);
  }, [isReady, onReadyChange]);

  const filteredTasks = useMemo(
    () =>
      analyzedTasks.filter((t) => activeTab === "ALL" || t.category3B === activeTab),
    [analyzedTasks, activeTab],
  );

  async function handleExportPdf() {
    if (!assessmentId || exportingPdf || activeTab === "ALL") return;
    setExportingPdf(true);
    try {
      await downloadCategoryAnalysis(assessmentId, activeTab, "pdf");
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setExportingPdf(false);
    }
  }

  if (!assessmentId) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-14 text-center">
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

  if (!tasksQuery.isLoading && !areTasksReviewed) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-14 text-center">
        <p className="text-muted-foreground">
          Complete the Task Intelligence Review before viewing your 3B analysis.
        </p>
        <Link
          to="/assessment"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Complete Task Review <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-4 py-20 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-brand/20" />
          <Loader2 className="relative h-12 w-12 animate-spin text-brand" />
        </div>
        <h3 className="mt-8 font-display text-2xl font-bold">Analyzing your tasks</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Routing each task into Build, Blend, or Bot with personalized actions and tool
          suggestions…
        </p>
      </div>
    );
  }

  if (analyzeMutation.isError || analysisQuery.isError) {
    const err = (analyzeMutation.error ?? analysisQuery.error) as Error;
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-14 text-center">
        <AlertTriangle className="mx-auto h-9 w-9 text-destructive" />
        <h3 className="mt-4 font-semibold">Analysis unavailable</h3>
        <p className="mt-2 text-sm text-muted-foreground">{err.message}</p>
        <button
          type="button"
          onClick={() => analyzeMutation.mutate(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {!embedded && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 font-serif">
                3B Analysis
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
                CareerShift routes every task into BUILD, BLEND, or BOT — with structured guidance
                on capabilities, solutions, tools, and what stays human.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {analyzedTasks.length > 0 && (
                <span className="text-sm font-medium text-muted-foreground">
                  {actionsStarted} of {analyzedTasks.length} next actions started
                </span>
              )}
              {!confirmRegenerate ? (
                <button
                  type="button"
                  onClick={() => setConfirmRegenerate(true)}
                  disabled={analyzeMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold shadow-sm hover:bg-muted/50 disabled:opacity-50"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Re-analyze my tasks
                </button>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                  <span className="text-xs text-amber-900">Replace current analysis?</span>
                  <button
                    type="button"
                    onClick={() => analyzeMutation.mutate(true)}
                    disabled={analyzeMutation.isPending}
                    className="rounded-lg bg-amber-700 px-3 py-1 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    {analyzeMutation.isPending ? "Running…" : "Confirm"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRegenerate(false)}
                    className="text-xs font-medium text-amber-800 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}


      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold font-serif text-slate-900">Your tasks</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Expand each task to follow the guided path — classification, options, action, and learning.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["ALL", "BOT", "BLEND", "BUILD"] as const).map((cat) => {
            const count =
              cat === "ALL"
                ? analyzedTasks.length
                : analyzedTasks.filter((t) => t.category3B === cat).length;
            return (
              <CategoryTabButton
                key={cat}
                category={cat}
                active={activeTab === cat}
                count={count}
                onClick={() => setActiveTab(cat)}
              />
            );
          })}
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-5"
      >
        {assessmentId && analyzedTasks.length > 0 && activeTab !== "ALL" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={exportingPdf}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold shadow-sm transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {exportingPdf ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {exportingPdf ? "Preparing PDF…" : `Export ${activeTab} PDF`}
            </button>
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed px-6 py-14 text-center border-border">
            <p className="mt-3 text-sm font-medium text-foreground">No tasks in this category</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredTasks.map((task, idx) => (
              <CollapsibleTaskCard
                key={task.id}
                ref={(el) => {
                  taskCardRefs.current[task.id] = el;
                }}
                task={task}
                category={task.category3B}
                assessmentId={assessmentId}
                defaultOpen={idx === 0 || task.id === recommendedBuildId}
                isRecommendedFocus={task.id === recommendedBuildId}
                generatedAtLabel={generatedAtLabel}
              />
            ))}
          </div>
        )}
      </motion.section>

      {analysisQuery.data?.generated_at && (
        <p className="text-center text-xs text-muted-foreground">
          Analysis generated {generatedAtLabel}
          {analysisQuery.data.summary_confidence != null &&
            ` · confidence ${analysisQuery.data.summary_confidence}%`}
        </p>
      )}

      {showFooterLinks && (
        <div className="border-t border-border pt-6">
          <SubmitAssessmentButton assessmentId={assessmentId} />
        </div>
      )}
    </div>
  );
}
