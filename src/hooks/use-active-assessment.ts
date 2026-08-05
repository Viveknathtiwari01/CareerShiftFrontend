import { useQuery } from "@tanstack/react-query";
import { getCurrentAssessment } from "@/api/assessment";

export function useActiveAssessmentId(enabled = true) {
  return useQuery({
    queryKey: ["assessment-current"],
    queryFn: getCurrentAssessment,
    enabled,
    staleTime: 30_000,
    select: (data) =>
      data.assessment_id && data.reused_existing ? data.assessment_id : data.assessment_id ?? null,
  });
}
