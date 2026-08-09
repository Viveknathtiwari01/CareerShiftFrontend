import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
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
    isLoading: activeLoading || (!!assessmentId && query.isLoading),
    isError: !!assessmentId && query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
