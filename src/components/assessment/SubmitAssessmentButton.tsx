<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { submitAssessmentFlow, type SubmitAssessmentStep } from "@/api/submit";

const STEP_LABELS: Record<SubmitAssessmentStep, string> = {
  saving_tasks: "Saving tasks…",
  analyzing: "Running 3B analysis…",
  generating_report: "Generating your report…",
  done: "Complete",
};

type Props = {
  assessmentId: string;
  className?: string;
  label?: string;
};

export function SubmitAssessmentButton({
  assessmentId,
  className = "",
  label = "Submit Assessment & View Report",
}: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState<SubmitAssessmentStep | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    try {
      await submitAssessmentFlow({ assessmentId }, setStep);
      navigate(`/report?assessmentId=${assessmentId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setStep(null);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!!step}
        className={className}
      >
        {step ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
            {STEP_LABELS[step]}
          </>
        ) : (
          label
        )}
      </button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
=======
import { ArrowRight, Loader2 } from "lucide-react";
import { useSubmitAssessment } from "@/hooks/use-submit-assessment";

export function SubmitAssessmentButton({
  assessmentId,
  label = "Submit Assessment & View Report",
  className = "",
  disabled = false,
}: {
  assessmentId: string | null;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  const { runSubmit, overlay, isSubmitting } = useSubmitAssessment();

  return (
    <>
      {overlay}
      <button
        type="button"
        disabled={!assessmentId || disabled || isSubmitting}
        onClick={() => assessmentId && void runSubmit(assessmentId)}
        className={
          className ||
          "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            {label} <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  );
}
