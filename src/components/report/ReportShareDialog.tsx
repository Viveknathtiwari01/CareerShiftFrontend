<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Copy, Check, Linkedin, Twitter } from "lucide-react";
import { fetchScorecard, type ReportScorecard } from "@/api/report";

type Props = {
  assessmentId: string;
  open: boolean;
  onClose: () => void;
};

export function ReportShareDialog({ assessmentId, open, onClose }: Props) {
  const [scorecard, setScorecard] = useState<ReportScorecard | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"linkedin" | "twitter" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchScorecard(assessmentId)
      .then((data) => {
        if (!cancelled) setScorecard(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load scorecard");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, assessmentId]);

  if (!open) return null;

  async function copyText(text: string, kind: "linkedin" | "twitter") {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Share Your Score</h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading scorecard from your report…</p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : scorecard ? (
          <div className="space-y-4">
            <p className="text-sm font-medium">{scorecard.headline}</p>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2 text-brand">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{scorecard.linkedin_text}</p>
              <button
                type="button"
                onClick={() => copyText(scorecard.linkedin_text, "linkedin")}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {copied === "linkedin" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy LinkedIn post
              </button>
            </div>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2 text-brand">
                <Twitter className="h-4 w-4" /> X / Twitter
              </div>
              <p className="text-sm text-muted-foreground">{scorecard.twitter_text}</p>
              <button
                type="button"
                onClick={() => copyText(scorecard.twitter_text, "twitter")}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {copied === "twitter" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy tweet
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
=======
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Linkedin, Loader2, Twitter } from "lucide-react";
import { getReportScorecard } from "@/api/report";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ShareTab = "linkedin" | "twitter";

export function ReportShareDialog({
  assessmentId,
  open,
  onOpenChange,
}: {
  assessmentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<ShareTab>("linkedin");
  const [copied, setCopied] = useState(false);

  const scorecardQuery = useQuery({
    queryKey: ["report-scorecard", assessmentId],
    queryFn: () => getReportScorecard(assessmentId!),
    enabled: open && !!assessmentId,
  });

  const text =
    tab === "linkedin"
      ? scorecardQuery.data?.linkedin_text
      : scorecardQuery.data?.twitter_text;

  async function copyText() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Share your AI Readiness score</DialogTitle>
          <DialogDescription>
            Copy a ready-made post for LinkedIn or X (Twitter). Your full report stays private.
          </DialogDescription>
        </DialogHeader>

        {scorecardQuery.isLoading ? (
          <div className="flex justify-center py-10 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-brand" />
          </div>
        ) : scorecardQuery.isError ? (
          <p className="text-sm text-destructive py-4">
            {(scorecardQuery.error as Error)?.message || "Unable to generate scorecard."}
          </p>
        ) : (
          <>
            {scorecardQuery.data?.headline && (
              <p className="rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm font-semibold text-brand">
                {scorecardQuery.data.headline}
              </p>
            )}

            <div className="flex gap-2 border-b border-border pb-2">
              <button
                type="button"
                onClick={() => setTab("linkedin")}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                  tab === "linkedin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </button>
              <button
                type="button"
                onClick={() => setTab("twitter")}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                  tab === "twitter" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Twitter className="h-4 w-4" /> X / Twitter
              </button>
            </div>

            <textarea
              readOnly
              value={text ?? ""}
              rows={8}
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm leading-relaxed resize-none"
            />

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {tab === "twitter" && text ? `${text.length}/280 characters` : "Includes suggested hashtags"}
              </p>
              <button
                type="button"
                onClick={() => void copyText()}
                disabled={!text}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy text
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  );
}
