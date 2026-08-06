import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import {
  AIReadinessEmpty,
  AIReadinessLoading,
  AIReadinessView,
} from "@/components/readiness/AIReadinessView";
import { useReportData } from "@/hooks/use-report-data";

export default function AIReadiness() {
  const report = useReportData();

  return (
    <PageShell className="space-y-8">
      <PageHeader
        eyebrow="Assessment Results"
        title="AI Readiness Score"
        description="How prepared you are for the evolving AI workplace — based on your profile, task patterns, and 3B routing."
      />

      {report.isLoading ? (
        <AIReadinessLoading />
      ) : !report.assessmentId ? (
        <AIReadinessEmpty
          message="Complete your career assessment to unlock your AI readiness score."
          action={
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Go to Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      ) : report.isError || !report.readiness ? (
        <AIReadinessEmpty
          message={report.error?.message || "Unable to load AI readiness score."}
          action={
            <Link
              to="/3b-analysis"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Submit assessment for report <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      ) : (
        <AIReadinessView data={report.readiness} />
      )}
    </PageShell>
  );
}
