import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
<<<<<<< HEAD
import { getReport, type CareerIntelligenceReport } from "@/api/report";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

export function useReportData() {
  const [searchParams] = useSearchParams();
  const paramId = searchParams.get("assessmentId");
  const { data: activeId, isLoading: activeLoading } = useActiveAssessmentId(!paramId);
  const assessmentId = paramId || activeId || null;

  const query = useQuery<CareerIntelligenceReport>({
    queryKey: ["career-report", assessmentId],
    queryFn: () => getReport(assessmentId!),
    enabled: !!assessmentId,
    retry: false,
  });

  return {
    assessmentId,
    report: query.data,
    isLoading: activeLoading || query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
=======
import { getProfile } from "@/api/profile";
import { getCareerReport, type CareerIntelligenceReport } from "@/api/report";
import type { WizardData } from "@/components/my-career/types";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

function automationPctFromReport(report: CareerIntelligenceReport | null): number | null {
  if (!report) return null;
  const mix = report.ai_readiness.portfolio_mix;
  const total = (mix.BUILD ?? 0) + (mix.BLEND ?? 0) + (mix.BOT ?? 0);
  if (total > 0) {
    return Math.round(((mix.BOT ?? 0) / total) * 100);
  }
  const analyses = report.task_routing.analyses;
  if (analyses.length === 0) return null;
  return Math.round(
    analyses.reduce((sum, item) => sum + (item.auto_potential ?? 0), 0) / analyses.length,
  );
}

export function useReportData() {
  const [searchParams] = useSearchParams();
  const paramAssessmentId = searchParams.get("assessmentId");
  const { data: activeAssessmentId, isLoading: loadingId } = useActiveAssessmentId(
    !paramAssessmentId,
  );
  const assessmentId = paramAssessmentId ?? activeAssessmentId ?? null;

  const profileQuery = useQuery({
    queryKey: ["report-profile"],
    queryFn: getProfile,
    staleTime: 120_000,
  });

  const reportQuery = useQuery({
    queryKey: ["career-report", assessmentId],
    queryFn: () => getCareerReport(assessmentId!),
    enabled: !!assessmentId,
    staleTime: 60_000,
    retry: 1,
  });

  const report = reportQuery.data ?? null;
  const readiness = report?.ai_readiness ?? null;
  const automationPct = automationPctFromReport(report);

  const isLoading =
    (!!paramAssessmentId ? false : loadingId) || profileQuery.isLoading || reportQuery.isLoading;
  const isError = reportQuery.isError && !report;

  return {
    assessmentId,
    isLoading,
    isError,
    error: (reportQuery.error ?? profileQuery.error) as Error | null,
    profile: profileQuery.data as WizardData | null,
    report,
    readiness,
    selectedTasks: report?.daily_work.tasks ?? [],
    analyses: report?.task_routing.analyses ?? [],
    competencies: report?.competencies ?? [],
    automationPct,
    completedAt: report?.generated_at ?? null,
    reportVersion: report?.report_version ?? null,
    strategicNote: report?.strategic_note ?? null,
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  };
}
