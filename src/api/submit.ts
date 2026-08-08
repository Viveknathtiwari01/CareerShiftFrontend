<<<<<<< HEAD
import { runTaskAnalysis } from "@/api/analysis";
import { generateReport } from "@/api/report";
import { saveAssessmentTasks } from "@/api/tasks";
import type { Task } from "@/store/mock-store";

export type SubmitAssessmentOptions = {
  assessmentId: string;
  tasks?: Task[];
  regenerateAnalysis?: boolean;
  regenerateReport?: boolean;
};

export type SubmitAssessmentStep =
  | "saving_tasks"
  | "analyzing"
  | "generating_report"
  | "done";

export async function submitAssessmentFlow(
  options: SubmitAssessmentOptions,
  onStep?: (step: SubmitAssessmentStep) => void,
): Promise<{ assessmentId: string }> {
  const { assessmentId, tasks, regenerateAnalysis = false, regenerateReport = false } = options;

  if (tasks && tasks.length > 0) {
    onStep?.("saving_tasks");
    await saveAssessmentTasks(assessmentId, tasks);
  }

  onStep?.("analyzing");
  await runTaskAnalysis(assessmentId, regenerateAnalysis);

  onStep?.("generating_report");
  await generateReport(assessmentId, regenerateReport);

  onStep?.("done");
  return { assessmentId };
=======
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
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
}
