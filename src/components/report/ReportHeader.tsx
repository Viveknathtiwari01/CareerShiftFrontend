import { useState } from "react";
import { Download, Share2, FileText, Loader2 } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";
import { downloadReportDocx, downloadReportPdf, formatReportVersion } from "@/api/report";
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

  async function runExport(action: "pdf" | "docx") {
    setError(null);
    setBusy(action);
    try {
      if (action === "pdf") await downloadReportPdf(report.assessment_id);
      if (action === "docx") await downloadReportDocx(report.assessment_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setBusy(null);
    }
  }

  const versionLabel = formatReportVersion(report.report_version);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div>
          <h1 className="mb-4 font-display text-4xl sm:text-5xl font-medium text-[#0A121F]">
            Career Intelligence Report
          </h1>
          <p className="text-[17px] text-[#4A5568] font-light max-w-2xl leading-relaxed">
            Personalized AI-powered career intelligence for <span className="font-medium text-[#0A121F]">{report.overview.job_title}</span> in{" "}
            <span className="font-medium text-[#0A121F]">{report.overview.industry}</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-[13px] font-medium">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FDFBF2] text-[#C9A84C] border border-[#E8C96A]/30">
              <span className="text-[#718096]">Date:</span> {generated}
            </div>
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FDFBF2] text-[#C9A84C] border border-[#E8C96A]/30">
              <span className="text-[#718096]">Version:</span> {versionLabel}
            </div>
          </div>
          {error ? <p className="mt-3 text-sm text-[#E53E3E]">{error}</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!!busy}
            onClick={() => runExport("pdf")}
            className="inline-flex items-center gap-2 rounded-full bg-[#D9A928] hover:bg-[#C2941E] px-6 py-3 text-[14px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </button>
          <button
            type="button"
            disabled={!!busy}
            onClick={() => runExport("docx")}
            className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-6 py-3 text-[14px] font-medium text-[#0A121F] hover:bg-gray-50 transition-all disabled:opacity-60 shadow-sm"
          >
            {busy === "docx" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            Download DOC
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-6 py-3 text-[14px] font-medium text-[#0A121F] hover:bg-gray-50 transition-all shadow-sm"
          >
            <Share2 className="h-4 w-4" /> Share
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
