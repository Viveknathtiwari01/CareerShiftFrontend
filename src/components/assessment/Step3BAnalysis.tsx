import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Download, Loader2, RefreshCw } from "lucide-react";
import {
  downloadCategoryAnalysis,
  getTaskAnalysis,
  mapAnalysisToDisplay,
  runTaskAnalysis,
  type ThreeBCategory,
} from "@/api/analysis";
import { SubmitAssessmentButton } from "@/components/assessment/SubmitAssessmentButton";
import {
  CollapsibleTaskCard,
  CategoryHoursNav,
  THREE_B_FRAMEWORK,
} from "@/components/assessment/ThreeBAnalysisParts";
import { getAssessmentTasks, mapBackendTaskToFrontend, isTaskReviewComplete } from "@/api/tasks";

const CATEGORIES: ThreeBCategory[] = ["BUILD", "BLEND", "BOT"];

const FRAMEWORK = {
  BUILD: {
    ...THREE_B_FRAMEWORK.BUILD,
    title: "Build",
    tagline: "Deepen human mastery",
    description: "Judgment, relationships, and expertise AI cannot replace.",
    action: "Invest in skills & experience",
  },
  BLEND: {
    ...THREE_B_FRAMEWORK.BLEND,
    title: "Blend",
    tagline: "Human + AI co-pilot",
    description: "AI drafts and analyzes — you decide and own the outcome.",
    action: "Learn tools & prompt skills",
  },
  BOT: {
    ...THREE_B_FRAMEWORK.BOT,
    title: "Bot",
    tagline: "Automate within 30 days",
    description: "Repetitive work — delegate to AI and reclaim hours.",
    action: "Set up automation this month",
  },
} as const;

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
  const [activeTab, setActiveTab] = useState<ThreeBCategory>("BLEND");
  const [exportingPdf, setExportingPdf] = useState(false);
  const hasSetInitialTab = useRef(false);

  const analysisQuery = useQuery({
    queryKey: ["assessment-analysis", assessmentId],
    queryFn: () => getTaskAnalysis(assessmentId!),
    enabled: !!assessmentId,
    staleTime: 60_000,
  });

  const analyzeMutation = useMutation({
    mutationFn: () => runTaskAnalysis(assessmentId!, false),
    onSuccess: (data) => {
      queryClient.setQueryData(["assessment-analysis", assessmentId], data);
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
      analyzeMutation.mutate();
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
    () => (analysisQuery.data?.analyses ?? []).map(mapAnalysisToDisplay),
    [analysisQuery.data?.analyses],
  );

  const hoursSummary = analysisQuery.data?.hours_summary;

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

  const tasksByCategory = useMemo(
    () => ({
      BUILD: analyzedTasks.filter((t) => t.category3B === "BUILD"),
      BLEND: analyzedTasks.filter((t) => t.category3B === "BLEND"),
      BOT: analyzedTasks.filter((t) => t.category3B === "BOT"),
    }),
    [analyzedTasks],
  );

  const activeTasks = tasksByCategory[activeTab];
  const activeMeta = FRAMEWORK[activeTab];
  const ActiveIcon = activeMeta.icon;
  const activeFrame = THREE_B_FRAMEWORK[activeTab];

  async function handleExportPdf() {
    if (!assessmentId || exportingPdf) return;
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
          Routing each task into Build, Blend, or Bot with personalized actions and tool suggestions…
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
          onClick={() => analyzeMutation.mutate()}
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
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h2 className="font-display text-2xl font-bold tracking-tight">Your 3B work map</h2>
          <p className="text-sm text-muted-foreground">
            How your reviewed tasks split across human mastery, AI co-piloting, and automation.
          </p>
        </motion.div>
      )}

      <CategoryHoursNav
        hoursSummary={hoursSummary}
        totalHours={analysisQuery.data?.total_hours}
        activeTab={activeTab}
        onSelect={setActiveTab}
        framework={FRAMEWORK}
      />

      <motion.section
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`grid h-12 w-12 place-items-center rounded-2xl border bg-gradient-to-br ${activeFrame.gradient} ${activeFrame.border}`}
            >
              <ActiveIcon className={`h-6 w-6 ${activeMeta.accent}`} />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">
                {activeMeta.title}{" "}
                <span className="font-normal text-muted-foreground">· {activeMeta.tagline}</span>
              </h3>
              <p className="text-sm text-muted-foreground">{activeMeta.description}</p>
            </div>
          </div>
          {assessmentId && activeTasks.length > 0 && (
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
              {exportingPdf ? "Preparing PDF…" : `Export ${activeMeta.title} PDF`}
            </button>
          )}
        </div>

        {activeTasks.length === 0 ? (
          <div
            className={`rounded-2xl border border-dashed px-6 py-14 text-center ${activeFrame.border} ${activeFrame.soft}`}
          >
            <ActiveIcon className={`mx-auto h-8 w-8 ${activeMeta.accent} opacity-60`} />
            <p className="mt-3 text-sm font-medium text-foreground">
              No {activeMeta.title} tasks for this assessment
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {activeTab === "BOT"
                ? "Your reviewed tasks lean toward human judgment or co-pilot workflows. Check Blend or Build."
                : `Explore other categories to see where your time is allocated.`}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {CATEGORIES.filter((c) => c !== activeTab).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveTab(c)}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted/50"
                >
                  View {FRAMEWORK[c].title}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTasks.map((task, idx) => (
              <CollapsibleTaskCard
                key={task.id}
                task={task}
                category={activeTab}
                defaultOpen={idx === 0}
                hideCategoryBadge
              />
            ))}
          </div>
        )}
      </motion.section>

      {showFooterLinks && (
        <div className="border-t border-border pt-6">
          <SubmitAssessmentButton assessmentId={assessmentId} />
        </div>
      )}
    </div>
  );
}
