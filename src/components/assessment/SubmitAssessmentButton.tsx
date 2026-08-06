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
  );
}
