import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
import { SubmitAssessmentButton } from "@/components/assessment/SubmitAssessmentButton";
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
        <Step3BAnalysis assessmentId={assessmentId ?? null} showFooterLinks embedded />
      </PagePanel>

      <footer className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground max-w-xl">
          Submit your assessment to run the full intelligence pipeline and generate your Career
          Intelligence Report with readiness score, roadmap, and action plan.
        </p>
        <SubmitAssessmentButton assessmentId={assessmentId ?? null} disabled={isLoading} />
      </footer>
    </PageShell>
  );
}
