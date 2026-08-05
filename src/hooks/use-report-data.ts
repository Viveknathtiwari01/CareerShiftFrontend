import { useQueries } from "@tanstack/react-query";
import { getAssessment } from "@/api/assessment";
import { getTaskAnalysis } from "@/api/analysis";
import { getProfile } from "@/api/profile";
import { getAIReadiness, type AIReadinessResult } from "@/api/readiness";
import { getAssessmentTasks } from "@/api/tasks";
import type { WizardData } from "@/components/my-career/types";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

export function useReportData() {
  const { data: assessmentId, isLoading: loadingId } = useActiveAssessmentId();

  const results = useQueries({
    queries: [
      {
        queryKey: ["report-assessment", assessmentId],
        queryFn: () => getAssessment(assessmentId!),
        enabled: !!assessmentId,
        staleTime: 60_000,
      },
      {
        queryKey: ["report-profile"],
        queryFn: getProfile,
        staleTime: 120_000,
      },
      {
        queryKey: ["ai-readiness", assessmentId],
        queryFn: () => getAIReadiness(assessmentId!),
        enabled: !!assessmentId,
        staleTime: 60_000,
      },
      {
        queryKey: ["report-tasks", assessmentId],
        queryFn: () => getAssessmentTasks(assessmentId!),
        enabled: !!assessmentId,
        staleTime: 60_000,
      },
      {
        queryKey: ["report-analysis", assessmentId],
        queryFn: () => getTaskAnalysis(assessmentId!),
        enabled: !!assessmentId,
        staleTime: 60_000,
      },
    ],
  });

  const [assessmentQuery, profileQuery, readinessQuery, tasksQuery, analysisQuery] = results;

  const profile = profileQuery.data ?? null;
  const readiness = readinessQuery.data ?? null;
  const assessment = assessmentQuery.data ?? null;
  const tasks = tasksQuery.data ?? [];
  const selectedTasks = tasks.filter((t) => t.selected !== false);
  const analyses = analysisQuery.data?.analyses ?? [];
  const competencies = assessment?.competency_mapping?.competencies ?? [];

  const portfolioTotal =
    (readiness?.portfolio_mix.BUILD ?? 0) +
    (readiness?.portfolio_mix.BLEND ?? 0) +
    (readiness?.portfolio_mix.BOT ?? 0);

  const automationPct =
    portfolioTotal > 0
      ? Math.round(((readiness?.portfolio_mix.BOT ?? 0) / portfolioTotal) * 100)
      : analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, a) => sum + (a.auto_potential ?? 0), 0) / analyses.length,
          )
        : null;

  const isLoading =
    loadingId ||
    assessmentQuery.isLoading ||
    profileQuery.isLoading ||
    readinessQuery.isLoading ||
    tasksQuery.isLoading ||
    analysisQuery.isLoading;

  const isError = readinessQuery.isError && !readiness;

  return {
    assessmentId: assessmentId ?? null,
    isLoading,
    isError,
    error: (readinessQuery.error ?? assessmentQuery.error) as Error | null,
    profile: profile as WizardData | null,
    assessment,
    readiness: readiness as AIReadinessResult | null,
    selectedTasks,
    analyses,
    competencies,
    automationPct,
    completedAt: assessment?.metadata?.completed_at ?? null,
  };
}
