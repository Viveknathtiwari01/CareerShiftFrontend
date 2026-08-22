import { fetchApi } from "@/lib/api";

export type ThreeBCategory = "BUILD" | "BOT" | "BLEND";

export interface ToolOption {
  name: string;
  cost_tier: string;
  feasibility: string;
  pros: string;
  cons: string;
}

export interface TaskComponent {
  name: string;
  description: string;
  capability_id: string;
  tool_options: ToolOption[];
}

export interface TaskAnalysisItem {
  task_id: string;
  task_title: string;
  task_description?: string | null;
  task_category?: string | null;
  category: ThreeBCategory;
  rationale?: string | null;
  reason?: string | null;
  next_actions: string[];
  auto_potential?: number | null;
  risk_level?: string | null;
  future_impact?: string | null;
  recommended_tools: string[];
  components?: TaskComponent[];
}

export interface TaskAnalysisResult {
  analyses: TaskAnalysisItem[];
  summary_confidence?: number | null;
  regenerated: boolean;
  hours_by_category?: { BUILD: number; BLEND: number; BOT: number };
  total_hours?: number;
}

export async function getTaskAnalysis(assessmentId: string): Promise<TaskAnalysisResult> {
  const response = await fetchApi(`/assessment/${assessmentId}/analysis`);
  return response.data;
}

export async function runTaskAnalysis(
  assessmentId: string,
  regenerate = false,
): Promise<TaskAnalysisResult> {
  const query = regenerate ? "?regenerate=true" : "";
  const response = await fetchApi(`/assessment/${assessmentId}/analyze${query}`, {
    method: "POST",
  });
  return response.data;
}

/** UI-ready task with 3B fields attached. */
export interface AnalyzedTask extends TaskAnalysisItem {
  id: string;
  title: string;
  tools: string[];
  components: TaskComponent[];
  autoPotential: number;
  riskLevel: string;
  futureImp: string;
  category3B: ThreeBCategory;
}

export function mapAnalysisToDisplay(item: TaskAnalysisItem): AnalyzedTask {
  return {
    ...item,
    id: item.task_id,
    title: item.task_title,
    tools: item.recommended_tools ?? [],
    components: item.components ?? [],
    autoPotential: item.auto_potential ?? 0,
    riskLevel: item.risk_level ?? "Medium",
    futureImp: item.future_impact ?? "Medium",
    category3B: item.category,
  };
}
