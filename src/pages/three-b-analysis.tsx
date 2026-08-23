import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { AppLoader } from "@/components/ui/app-loader";
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
import { ThreeBAnalysisHero } from "@/components/assessment/ThreeBAnalysisHero";
import { SubmitAssessmentButton } from "@/components/assessment/SubmitAssessmentButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

export default function ThreeBAnalysisPage() {
  const { data: assessmentId, isLoading } = useActiveAssessmentId();

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <Link
          to="/assessment"
          className="type-body-sm mb-6 inline-flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Assessment
        </Link>
        <PageHeader
          title="3B Analysis"
          description="How your real work splits across human mastery, AI co-piloting, and automation."
        />
      </div>

      <ThreeBAnalysisHero />

      <section className="panel p-5 md:p-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <AppLoader size="lg" />
            <p className="mt-4 text-sm">Loading your assessment…</p>
          </div>
        ) : (
          <Step3BAnalysis assessmentId={assessmentId ?? null} embedded showFooterLinks />
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/25 p-6">
        <p className="type-body-sm text-muted-foreground">
          Submit to generate your Career Intelligence Report from this analysis.
        </p>
        <div className="flex flex-wrap gap-3">
          {assessmentId ? (
            <SubmitAssessmentButton
              assessmentId={assessmentId}
              className="type-body inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
            />
          ) : null}
          <Link
            to="/ai-fitness"
            className="type-body inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold transition-colors hover:bg-muted"
          >
            AI Fitness Score <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
