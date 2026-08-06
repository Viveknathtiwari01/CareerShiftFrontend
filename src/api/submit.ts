import type { Task } from "@/store/mock-store";
import { runTaskAnalysis } from "@/api/analysis";
import { generateCareerReport, type CareerIntelligenceReport } from "@/api/report";
import { saveAssessmentTasks } from "@/api/tasks";

export type SubmitStep = "saving" | "analyzing" | "generating" | "complete";

export interface SubmitProgress {
  step: SubmitStep;
  message: string;
}

export async function submitAssessment(
  assessmentId: string,
  options?: {
    tasks?: Task[];
    onProgress?: (progress: SubmitProgress) => void;
  },
): Promise<CareerIntelligenceReport> {
  if (options?.tasks?.length) {
    options.onProgress?.({
      step: "saving",
      message: "Saving your reviewed tasks…",
    });
    await saveAssessmentTasks(assessmentId, options.tasks);
  }

  options.onProgress?.({
    step: "analyzing",
    message: "Running 3B analysis on your tasks…",
  });
  await runTaskAnalysis(assessmentId, false);

  options.onProgress?.({
    step: "generating",
    message: "Assembling your career intelligence report…",
  });
  const report = await generateCareerReport(assessmentId);

  options.onProgress?.({
    step: "complete",
    message: "Your report is ready.",
  });

  return report;
}
