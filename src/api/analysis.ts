import { fetchApi, fetchBlob } from "@/lib/api";
import { saveBlobAs } from "@/lib/save-file";

export type ThreeBCategory = "BUILD" | "BOT" | "BLEND";

export type CostBand =
  | "free"
  | "freemium"
  | "paid_individual"
  | "paid_team"
  | "enterprise";

export type FeasibilityTier =
  | "self_serve"
  | "company_tech"
  | "org_must_enable"
  | "stays_human_led";

export interface ToolOption {
  name: string;
  cost_band: CostBand | string;
  pros: string[];
  cons: string[];
  credibility_note?: string;
  feasibility: FeasibilityTier | string;
  verification_status?: "UNVERIFIED" | "VERIFIED" | "REJECTED";
}

export interface TaskComponent {
  name: string;
  description: string;
  is_automatable?: boolean;
  capability: string;
  solution_pattern: string;
  tools: ToolOption[];
  /** Legacy catalog shape */
  capability_id?: string;
  tool_options?: ToolOption[];
}

export interface HoursBucket {
  weekly_hours: number;
  annual_hours: number;
  task_count: number;
}

export interface HoursSummary {
  BUILD: HoursBucket;
  BLEND: HoursBucket;
  BOT: HoursBucket;
  total: HoursBucket;
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
  weekly_hours?: number;
  annual_hours?: number;
  importance?: string | null;
  feasibility_tier?: string | null;
  feasibility_note?: string | null;
  human_capability?: string | null;
  velocity?: string | null;
  velocity_note?: string | null;
  next_action?: string | null;
  learn_gap?: string | null;
  learn_do?: string | null;
  learn_dont?: string | null;
  where_to_learn?: string | null;
  status?: string | null;
}

export interface PivotRole {
  name: string;
  transfer_strength: string;
  reuses: string;
  note: string;
}

export interface MarketReality {
  trend_text: string;
  pivot_roles: PivotRole[];
}

export interface TaskAnalysisResult {
  analyses: TaskAnalysisItem[];
  summary_confidence?: number | null;
  regenerated: boolean;
  hours_by_category?: { BUILD: number; BLEND: number; BOT: number };
  hours_summary?: HoursSummary;
  total_hours?: number;
  generated_at?: string | null;
  market_reality?: MarketReality | null;
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

export async function updateTaskStatus(
  assessmentId: string,
  taskId: string,
  status: string | null,
): Promise<TaskAnalysisItem> {
  const response = await fetchApi(`/assessment/${assessmentId}/analysis/${taskId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response.data;
}

export async function downloadCategoryAnalysis(
  assessmentId: string,
  category: ThreeBCategory,
  format: "pdf" | "html" | "json" = "pdf",
): Promise<boolean> {
  const blob = await fetchBlob(
    `/assessment/${assessmentId}/analysis/export?category=${category}&format=${format}`,
  );
  const ext = format === "json" ? "json" : format === "html" ? "html" : "pdf";
  const filename = `CareerShift-3B-${category}.${ext}`;
  return saveBlobAs(blob, filename);
}

/** Normalize component tools from API (tools or legacy tool_options). */
export function getComponentTools(comp: TaskComponent): ToolOption[] {
  if (comp.tools?.length) return comp.tools;
  if (comp.tool_options?.length) return comp.tool_options;
  return [];
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
  weeklyHours: number;
  annualHours: number;
  importanceVal: string;
  feasibilityTierVal: string;
  velocityVal: string;
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
    weeklyHours: item.weekly_hours ?? 0,
    annualHours: item.annual_hours ?? 0,
    importanceVal: item.importance ?? "Medium",
    feasibilityTierVal: item.feasibility_tier ?? "Unknown",
    velocityVal: item.velocity ?? "Unknown",
  };
}

export function formatFeasibilityLabel(tier: string): string {
  const map: Record<string, string> = {
    self_serve: "Self-serve",
    company_tech: "Company tech",
    org_must_enable: "Org must enable",
    stays_human_led: "Stays human-led",
    "Self-serve": "Self-serve",
    "Company tech": "Company tech",
    "Org must enable": "Org must enable",
  };
  return map[tier] ?? tier.replace(/_/g, " ");
}

export function formatCostBand(band: string): string {
  return band.replace(/_/g, " ");
}
