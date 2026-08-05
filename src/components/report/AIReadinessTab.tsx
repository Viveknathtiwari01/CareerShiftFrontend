import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  AIReadinessEmpty,
  AIReadinessLoading,
  AIReadinessView,
} from "@/components/readiness/AIReadinessView";
import { useReportData } from "@/hooks/use-report-data";

export function AIReadinessTab() {
  const { assessmentId, isLoading, isError, error, readiness } = useReportData();

  if (isLoading) {
    return <AIReadinessLoading />;
  }

  if (!assessmentId) {
    return (
      <AIReadinessEmpty
        message="Run an assessment to see your AI readiness score in this report."
        action={
          <Link to="/assessment" className="text-sm font-semibold text-brand hover:underline">
            Start assessment →
          </Link>
        }
      />
    );
  }

  if (isError || !readiness) {
    return (
      <AIReadinessEmpty
        message={error?.message || "Complete 3B analysis to calculate your readiness score."}
        action={
          <Link
            to="/3b-analysis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            Complete 3B analysis <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
    );
  }

  return <AIReadinessView data={readiness} showFooterLink={false} />;
}
