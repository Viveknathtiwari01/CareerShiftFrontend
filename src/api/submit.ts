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
}
