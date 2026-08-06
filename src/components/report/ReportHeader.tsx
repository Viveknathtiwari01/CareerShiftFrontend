import { useState } from "react";
import {
  Download,
  Share2,
  GitCompare,
  MoreVertical,
  Printer,
  FileJson,
  Wrench,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AIReadinessResult } from "@/api/readiness";
import { downloadReportJson, downloadReportPdf, downloadToolkitHtml } from "@/api/report";
import { ReportShareDialog } from "@/components/report/ReportShareDialog";

function formatReportDate(iso: string | null | undefined) {
  if (!iso) {
    return new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ReportHeader({
  assessmentId,
  readiness,
  completedAt,
}: {
  assessmentId: string | null;
  readiness: AIReadinessResult | null;
  completedAt?: string | null;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function runDownload(kind: "pdf" | "toolkit" | "json", fn: (id: string) => Promise<void>) {
    if (!assessmentId) return;
    setActionError(null);
    setDownloading(kind);
    try {
      await fn(assessmentId);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setDownloading(null);
    }
  }

  const exportDisabled = !assessmentId || !!downloading;

  return (
    <>
      <ReportShareDialog
        assessmentId={assessmentId}
        open={shareOpen}
        onOpenChange={setShareOpen}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border/40">
        <div>
          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight">
            Career Intelligence Report
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed">
            Your personalized AI-powered career intelligence report based on your professional
            profile, competencies, work patterns, and AI readiness.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
              <span className="text-muted-foreground">Date:</span> {formatReportDate(completedAt)}
            </div>
            {readiness && (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand border border-brand/20">
                  <span className="text-brand/70">Score:</span> {readiness.overall_score}/100
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <span className="text-primary/70">Tier:</span> {readiness.tier_label}
                </div>
              </>
            )}
          </div>

          {actionError && (
            <p className="mt-4 text-sm text-destructive">{actionError}</p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            disabled={exportDisabled}
            onClick={() => void runDownload("pdf", downloadReportPdf)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {downloading === "pdf" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download PDF
          </button>
          <button
            type="button"
            disabled={!assessmentId}
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-50"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button
            type="button"
            disabled
            title="Compare reports coming soon"
            className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold opacity-50 cursor-not-allowed"
          >
            <GitCompare className="h-4 w-4" /> Compare
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                disabled={exportDisabled}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background h-10 w-10 hover:bg-muted transition-colors disabled:opacity-50"
              >
                {downloading && downloading !== "pdf" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreVertical className="h-4 w-4" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem
                className="gap-2 cursor-pointer font-medium"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 text-muted-foreground" /> Print Report
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer font-medium"
                onClick={() => void runDownload("json", downloadReportJson)}
              >
                <FileJson className="h-4 w-4 text-muted-foreground" /> Export JSON
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer font-medium"
                onClick={() => void runDownload("toolkit", downloadToolkitHtml)}
              >
                <Wrench className="h-4 w-4 text-muted-foreground" /> Download AI Toolkit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
