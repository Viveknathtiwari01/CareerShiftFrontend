import { Link } from "react-router-dom";
<<<<<<< HEAD
import { Loader2, AlertCircle } from "lucide-react";
import { AIReadinessRadarChart } from "@/components/report/AIReadinessRadarChart";
import { PageHeader } from "@/components/layout/PageHeader";
import { useReportData } from "@/hooks/use-report-data";

export default function AIReadiness() {
  const { report, isLoading, isError, error } = useReportData();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">
          {error instanceof Error ? error.message : "Submit your assessment to see AI readiness."}
        </p>
        <Link to="/assessment" className="mt-4 inline-block text-brand font-semibold">
          Go to Assessment →
        </Link>
      </div>
    );
  }

  const r = report.ai_readiness;
  const radarData = r.dimensions.map((d) => ({ subject: d.name, A: d.score, fullMark: 100 }));

  return (
    <div className="w-full space-y-12">
      <PageHeader
        title="AI Readiness Assessment"
        description={`Based on your profile, tasks, and 3B analysis for ${report.overview.job_title}.`}
      />

      <div className="w-full rounded-2xl border border-primary/20 bg-brand p-8 text-center shadow-soft lg:p-10">
        <div className="type-label mb-4 text-white">Overall AI Readiness</div>
        <div className="mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full border-8 border-primary/20 bg-background">
          <div className="font-display text-5xl font-bold text-brand">
            {r.overall_score}
            <span className="text-2xl text-muted-foreground">/100</span>
          </div>
        </div>
        <h3 className="type-section-title mb-3 text-white">{r.tier_label}</h3>
        <p className="type-body mx-auto max-w-2xl text-white/95">{r.tier_description}</p>
      </div>

      <AIReadinessRadarChart data={radarData} height={400} />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border p-6 lg:p-8">
          <h3 className="type-card-title mb-4">Strengths</h3>
          <ul className="type-body list-disc space-y-3 pl-5 text-muted-foreground">
            {r.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border p-6 lg:p-8">
          <h3 className="type-card-title mb-4">Improvement Areas</h3>
          <ul className="type-body list-disc space-y-3 pl-5 text-muted-foreground">
            {r.improvement_areas.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={`/report?assessmentId=${report.assessment_id}`}
        className="type-body inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        View Full Report →
      </Link>
    </div>
=======
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
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  );
}
