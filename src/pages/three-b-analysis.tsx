import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { AppLoader } from "@/components/ui/app-loader";
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
import { ThreeBAnalysisHero } from "@/components/assessment/ThreeBAnalysisHero";
import { SubmitAssessmentButton } from "@/components/assessment/SubmitAssessmentButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";
import { MarketRealityCheck } from "@/components/assessment/MarketRealityCheck";
import { useQuery } from "@tanstack/react-query";
import { getTaskAnalysis } from "@/api/analysis";

export default function ThreeBAnalysisPage() {
  const { data: assessmentId, isLoading } = useActiveAssessmentId();

  const analysisQuery = useQuery({
    queryKey: ["assessment-analysis", assessmentId],
    queryFn: () => getTaskAnalysis(assessmentId!),
    enabled: !!assessmentId,
    staleTime: 60_000,
  });

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

      <ThreeBAnalysisHero assessmentId={assessmentId} />

      {analysisQuery.data?.market_reality && (
        <MarketRealityCheck data={analysisQuery.data.market_reality} />
      )}

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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 mt-4">
        <p className="type-body-sm text-muted-foreground">
          Submit to generate your Career Intelligence Report from this analysis.
        </p>
        <div className="flex flex-wrap gap-3">
          {assessmentId ? (
            <SubmitAssessmentButton
              assessmentId={assessmentId}
              className="type-body inline-flex items-center gap-2 rounded-xl bg-[#c9a84c] px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-[#b08e33] disabled:opacity-60"
            />
          ) : null}
          <Link
            to="/report"
            className="type-body inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold transition-colors hover:bg-muted"
          >
            Career Intelligence Report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
