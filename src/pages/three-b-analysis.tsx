import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AppLoader } from "@/components/ui/app-loader";
import { LoadingQuotesOverlay } from "@/components/ui/LoadingQuotesOverlay";
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
import { ThreeBAnalysisHero } from "@/components/assessment/ThreeBAnalysisHero";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";
import { MarketRealityCheck } from "@/components/assessment/MarketRealityCheck";
import { useQuery } from "@tanstack/react-query";
import { formatGeneratedAt, generateTaskAiTools, getTaskAnalysis } from "@/api/analysis";
import { generateReport } from "@/api/report";

export default function ThreeBAnalysisPage() {
  const navigate = useNavigate();
  const { data: assessmentId, isLoading } = useActiveAssessmentId();
  const [generatingTools, setGeneratingTools] = useState(false);
  const [toolsError, setToolsError] = useState<string | null>(null);

  const analysisQuery = useQuery({
    queryKey: ["assessment-analysis", assessmentId],
    queryFn: () => getTaskAnalysis(assessmentId!),
    enabled: !!assessmentId,
    staleTime: 60_000,
  });

  const generatedLabel = formatGeneratedAt(analysisQuery.data?.generated_at);
  const hasAnalysis = (analysisQuery.data?.analyses?.length ?? 0) > 0;

  async function handleGenerateTools() {
    if (!assessmentId || generatingTools) return;
    setGeneratingTools(true);
    setToolsError(null);
    try {
      await generateTaskAiTools(assessmentId);
      await generateReport(assessmentId, true);
      navigate(`/report?assessmentId=${assessmentId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not generate AI tools.";
      setToolsError(
        message === "Failed to fetch"
          ? "The connection dropped before the tools finished. Please try again."
          : message,
      );
      setGeneratingTools(false);
    }
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl">
        <Link
          to="/assessment"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B7C99] transition-colors hover:text-[#0B1D3A]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Assessment
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
          3B Analysis
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5B7C99] sm:text-base">
          How your real work splits across human mastery, AI co-piloting, and automation.
        </p>
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
          <Step3BAnalysis assessmentId={assessmentId ?? null} embedded />
        )}
      </section>

      <div className="rounded-2xl border border-border bg-card px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 max-w-xl">
            <p className="text-sm font-bold text-[#0B1D3A]">Generate AI tools</p>
            <p className="mt-1 text-sm leading-relaxed text-[#5B7C99]">
              Build industry-standard tools for each task and work component. Your assessment
              is submitted automatically, then your Career Intelligence Report opens.
            </p>
            {generatedLabel ? (
              <p className="mt-2 text-xs font-medium text-[#8AA0B8]">
                Analysis generated {generatedLabel}
                {analysisQuery.data?.summary_confidence != null
                  ? ` · confidence ${analysisQuery.data.summary_confidence}%`
                  : ""}
              </p>
            ) : null}
            {toolsError ? <p className="mt-2 text-sm text-destructive">{toolsError}</p> : null}
          </div>
          <button
            type="button"
            onClick={handleGenerateTools}
            disabled={!assessmentId || !hasAnalysis || generatingTools}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Sparkles className="h-4 w-4" />
            Generate AI Tools
          </button>
        </div>
      </div>
      {generatingTools ? (
        <LoadingQuotesOverlay title={"Choosing the right AI tools\nfor your work..."} />
      ) : null}
    </div>
  );
}
