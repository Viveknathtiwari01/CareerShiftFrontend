import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
import { PageHeader, PagePanel, PageShell } from "@/components/layout/PageShell";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

export default function ThreeBAnalysisPage() {
  const { data: assessmentId, isLoading } = useActiveAssessmentId();

  return (
    <PageShell>
      <Link
        to="/assessment"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Assessment
      </Link>

      <PageHeader
        eyebrow="CareerShift Core"
        title="3B Analysis"
        description="Your personalized BUILD · BOT · BLEND routing for every task in your role."
      />

      <PagePanel className="p-6 md:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
            <p className="mt-4 text-sm">Loading your assessment…</p>
          </div>
        ) : (
          <Step3BAnalysis assessmentId={assessmentId ?? null} showFooterLinks embedded />
        )}
      </PagePanel>

      <footer className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Continue to your readiness score or full report.</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/ai-readiness"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            AI Readiness <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Full Report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </PageShell>
  );
}
