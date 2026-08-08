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
  );
}
