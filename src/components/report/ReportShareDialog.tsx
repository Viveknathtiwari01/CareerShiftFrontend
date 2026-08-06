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
  );
}
