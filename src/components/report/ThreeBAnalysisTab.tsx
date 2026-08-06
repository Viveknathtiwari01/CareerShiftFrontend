import { Loader2 } from "lucide-react";
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

export function ThreeBAnalysisTab() {
  const { data: assessmentId, isLoading } = useActiveAssessmentId();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  return <Step3BAnalysis assessmentId={assessmentId ?? null} showFooterLinks />;
}
