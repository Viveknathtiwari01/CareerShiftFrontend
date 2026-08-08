import { Loader2, CheckCircle2 } from "lucide-react";
import type { SubmitProgress } from "@/api/submit";

const STEP_ORDER: SubmitProgress["step"][] = ["saving", "analyzing", "generating", "complete"];

function stepIndex(step: SubmitProgress["step"]) {
  return STEP_ORDER.indexOf(step);
}

export function SubmitAssessmentOverlay({
  open,
  progress,
  error,
  includeSaveStep = false,
  onDismiss,
}: {
  open: boolean;
  progress: SubmitProgress | null;
  error: string | null;
  includeSaveStep?: boolean;
  onDismiss?: () => void;
}) {
  if (!open) return null;

  const activeIdx = progress ? stepIndex(progress.step) : -1;
  const steps = [
    ...(includeSaveStep ? [{ step: "saving" as const, label: "Save tasks" }] : []),
    { step: "analyzing" as const, label: "3B analysis" },
    { step: "generating" as const, label: "Report assembly" },
    { step: "complete" as const, label: "Ready" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-xl">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          {error ? "Submission failed" : "Preparing your report"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {error
            ? error
            : progress?.message || "This usually takes under a minute. Please keep this tab open."}
        </p>

        {error && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="mt-6 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            Close
          </button>
        )}

        {!error && (
          <ul className="mt-8 space-y-4">
            {steps.map((item, index) => {
              const normalizedIdx = index;
              const done = activeIdx > stepIndex(item.step);
              const active = progress?.step === item.step;
              return (
                <li key={item.step} className="flex items-center gap-3 text-sm">
                  <div
                    className={`grid h-8 w-8 place-items-center rounded-full border ${
                      done
                        ? "border-brand bg-brand/10 text-brand"
                        : active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : active ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-xs font-bold">{normalizedIdx + 1}</span>
                    )}
                  </div>
                  <span className={active ? "font-semibold text-foreground" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
