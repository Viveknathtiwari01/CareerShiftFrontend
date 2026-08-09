import { fetchApi } from "@/lib/api";

export interface ReadinessDimension {
  name: string;
  score: number;
}

export interface AIReadinessSection {
  overall_score: number;
  tier_label: string;
  tier_description: string;
  dimensions: ReadinessDimension[];
  strengths: string[];
  improvement_areas: string[];
  factors: Array<Record<string, string | number>>;
}

export interface ReportOverview {
  overall_score: number;
  tasks_analyzed: number;
  competency_count: number;
  ai_tools_count: number;
  automation_pct: number;
  career_risk: string;
  job_title: string;
  industry: string;
  experience_years: number;
  profession_summary?: string | null;
  reading_time_minutes?: number;
}

export interface CompetencyGroup {
  category: string;
  items: Array<Record<string, string | null | undefined>>;
}

export interface TaskRoutingItem {
  task_id: string;
  task_title: string;
  category: string;
  rationale?: string | null;
  reason?: string | null;
  next_actions: string[];
  auto_potential?: number | null;
  risk_level?: string | null;
  recommended_tools: string[];
}

export interface CareerIdentitySection {
  identity_title: string;
  confidence_pct: number;
  executive_summary: string;
  ideal_roles: string[];
  superpowers: string[];
  blind_spots: string[];
  growth_strategy: string;
}

export interface RoadmapPhase {
  horizon: string;
  title: string;
  items: string[];
}

export interface ToolkitItem {
  name: string;
  category: string;
  use_case: string;
  source?: string;
  priority_rank?: number | null;
  priority_label?: string | null;
  priority_reason?: string | null;
}

export interface ActionPlanSection {
  start: string[];
  stop: string[];
  automate: string[];
  learn: string[];
}

export interface CareerIntelligenceReport {
  assessment_id: string;
  report_version: string;
  generated_at: string;
  strategic_note?: string | null;
  overview: ReportOverview;
  ai_readiness: AIReadinessSection;
  competencies: CompetencyGroup[];
  daily_work: {
    tasks: Array<Record<string, unknown>>;
    total_hours_per_week: number;
  };
  task_routing: TaskRoutingItem[];
  career_identity: CareerIdentitySection;
  learning_roadmap: RoadmapPhase[];
  ai_toolkit: ToolkitItem[];
  action_plan: ActionPlanSection;
  before_after: Record<string, unknown>;
  cost_roi: Record<string, unknown>;
  market_urgency: Record<string, unknown>;
}

export async function getReport(assessmentId: string): Promise<CareerIntelligenceReport> {
  const response = await fetchApi(`/assessment/${assessmentId}/report`);
  return response.data;
}

export async function generateReport(
  assessmentId: string,
  regenerate = false,
): Promise<CareerIntelligenceReport> {
  const query = regenerate ? "?regenerate=true" : "";
  const response = await fetchApi(`/assessment/${assessmentId}/generate-report${query}`, {
    method: "POST",
  });
  return response.data;
}

export async function getReadiness(assessmentId: string): Promise<AIReadinessSection> {
  const response = await fetchApi(`/assessment/${assessmentId}/readiness`);
  return response.data;
}

export interface ReportScorecard {
  assessment_id: string;
  score: number;
  tier_label: string;
  job_title: string;
  industry: string;
  automation_pct: number;
  career_risk: string;
  headline: string;
  linkedin_text: string;
  twitter_text: string;
  report_url: string;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadReportPdf(assessmentId: string) {
  const { fetchBlob } = await import("@/lib/api");
  const blob = await fetchBlob(`/assessment/${assessmentId}/report/pdf`);
  downloadBlob(blob, "careershift-report.pdf");
}

export async function downloadToolkitHtml(assessmentId: string) {
  const { fetchBlob } = await import("@/lib/api");
  const blob = await fetchBlob(`/assessment/${assessmentId}/report/toolkit`);
  downloadBlob(blob, `careershift-toolkit-${assessmentId}.html`);
}

export async function downloadReportJson(assessmentId: string) {
  const { fetchBlob } = await import("@/lib/api");
  const blob = await fetchBlob(`/assessment/${assessmentId}/report/export.json`);
  downloadBlob(blob, "careershift-report.json");
}

export async function fetchScorecard(assessmentId: string): Promise<ReportScorecard> {
  const response = await fetchApi(`/assessment/${assessmentId}/report/scorecard`);
  return response.data;
}
