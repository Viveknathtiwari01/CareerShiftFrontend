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
      await submitAssessmentFlow(
        {
          assessmentId,
          regenerateAnalysis: false,
          regenerateReport: true,
        },
        setStep,
      );
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
  );
}
