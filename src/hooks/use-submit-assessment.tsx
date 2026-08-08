import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { submitAssessment, type SubmitProgress } from "@/api/submit";
import { SubmitAssessmentOverlay } from "@/components/assessment/SubmitAssessmentOverlay";
import type { Task } from "@/store/mock-store";

export function useSubmitAssessment(options?: { includeSaveStep?: boolean }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<SubmitProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const includeSaveStep = options?.includeSaveStep ?? false;

  const runSubmit = useCallback(
    async (assessmentId: string, tasks?: Task[]) => {
      setOpen(true);
      setError(null);
      setProgress({
        step: includeSaveStep && tasks?.length ? "saving" : "analyzing",
        message: "Starting submission…",
      });
      setIsSubmitting(true);

      try {
        await submitAssessment(assessmentId, {
          tasks: includeSaveStep ? tasks : undefined,
          onProgress: setProgress,
        });

        await queryClient.invalidateQueries({ queryKey: ["career-report", assessmentId] });
        await queryClient.invalidateQueries({ queryKey: ["assessment-current"] });
        await queryClient.invalidateQueries({ queryKey: ["assessments-list"] });

        navigate(`/report?assessmentId=${assessmentId}`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to submit assessment";
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [includeSaveStep, navigate, queryClient],
  );

  const closeOverlay = useCallback(() => {
    if (isSubmitting) return;
    setOpen(false);
    setError(null);
    setProgress(null);
  }, [isSubmitting]);

  return {
    runSubmit,
    overlay: (
      <SubmitAssessmentOverlay
        open={open}
        progress={progress}
        error={error}
        includeSaveStep={includeSaveStep}
        onDismiss={closeOverlay}
      />
    ),
    isSubmitting,
    open,
    error,
    closeOverlay,
  };
}
