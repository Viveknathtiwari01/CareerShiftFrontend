import { useState } from "react";
import { Download, Share2, FileJson, Loader2 } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";
import { downloadReportJson, downloadReportPdf } from "@/api/report";
import { ReportShareDialog } from "@/components/report/ReportShareDialog";

type Props = {
  report: CareerIntelligenceReport;
};

export function ReportHeader({ report }: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generated = new Date(report.generated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  async function runExport(action: "pdf" | "json") {
    setError(null);
    setBusy(action);
    try {
      if (action === "pdf") await downloadReportPdf(report.assessment_id);
      if (action === "json") await downloadReportJson(report.assessment_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border/40">
        <div>
          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight">
            Career Intelligence Report
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed">
            Personalized AI-powered career intelligence for {report.overview.job_title} in{" "}
            {report.overview.industry}.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
              <span className="text-muted-foreground">Date:</span> {generated}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
              <span className="text-muted-foreground">Version:</span> {report.report_version}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand border border-brand/20">
              <span className="text-brand/70">Score:</span> {report.overview.overall_score}/100
            </div>
          </div>
          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!!busy}
            onClick={() => runExport("pdf")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {busy === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button
            type="button"
            disabled={!!busy}
            onClick={() => runExport("json")}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-60"
          >
            {busy === "json" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileJson className="h-4 w-4" />}
            Export JSON
          </button>
        </div>
      </div>

      <ReportShareDialog
        assessmentId={report.assessment_id}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </>
  );
}
