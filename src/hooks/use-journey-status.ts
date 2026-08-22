import { useQuery } from "@tanstack/react-query";
import { getProfileStatus } from "@/api/profile";
import { getCurrentAssessment } from "@/api/assessment";
import { getTaskAnalysis } from "@/api/analysis";
import { getReport } from "@/api/report";

export type JourneyStatus =
  | "LOADING"
  | "NEEDS_PROFILE"
  | "NEEDS_ASSESSMENT"
  | "NEEDS_3B"
  | "NEEDS_REPORT"
  | "COMPLETED";

export function useJourneyStatus(): JourneyStatus {
  const { data: profileStatus, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile-status"],
    queryFn: getProfileStatus,
  });

  const profileComplete = profileStatus?.is_completed ?? false;

  const { data: currentAssessment, isLoading: isLoadingAssessment } = useQuery({
    queryKey: ["assessment-current"],
    queryFn: getCurrentAssessment,
    enabled: profileComplete,
  });

  const assessmentId = currentAssessment?.assessment_id;
  const assessmentComplete = currentAssessment?.status === "COMPLETED";

  const { data: taskAnalysis, isLoading: isLoadingAnalysis } = useQuery({
    queryKey: ["assessment-analysis", assessmentId],
    queryFn: () => getTaskAnalysis(assessmentId!),
    enabled: !!assessmentId && assessmentComplete,
    retry: false, // Don't retry if it fails (e.g. 404 because not generated)
  });

  const has3BAnalysis = !!taskAnalysis && taskAnalysis.analyses?.length > 0;

  const { data: report, isLoading: isLoadingReport } = useQuery({
    queryKey: ["assessment-report", assessmentId],
    queryFn: () => getReport(assessmentId!),
    enabled: !!assessmentId && has3BAnalysis,
    retry: false,
  });

  const hasReport = !!report && !!report.assessment_id;

  if (isLoadingProfile) return "LOADING";
  if (!profileComplete) return "NEEDS_PROFILE";

  if (isLoadingAssessment) return "LOADING";
  if (!assessmentComplete) return "NEEDS_ASSESSMENT";

  if (isLoadingAnalysis) return "LOADING";
  if (!has3BAnalysis) return "NEEDS_3B";

  if (isLoadingReport) return "LOADING";
  if (!hasReport) return "NEEDS_REPORT";

  return "COMPLETED";
}
