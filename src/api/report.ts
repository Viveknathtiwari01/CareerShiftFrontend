<<<<<<< HEAD
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
=======
import type { AIReadinessResult } from "@/api/readiness";
import { fetchApi, fetchBlob } from "@/lib/api";

export interface ReportKpi {
  label: string;
  value: string;
  tone?: string;
}

export interface ReportSnapshotItem {
  label: string;
  value: string;
}

export interface ReportOverviewSection {
  kpis: ReportKpi[];
  career_snapshot: ReportSnapshotItem[];
  insight?: string | null;
}

export interface ReportCompetencyItem {
  name: string;
  importance?: string | null;
  proficiency: number;
  growth: string;
}

export interface ReportCompetencyGroup {
  title: string;
  category_key: string;
  items: ReportCompetencyItem[];
}

export interface ReportDailyWorkTask {
  name: string;
  hours_per_week: number;
  time_label: string;
  criticality?: string | null;
  ai_usage?: string | null;
  confidence?: string | null;
  category_3b?: string | null;
}

export interface ReportTimeSlice {
  name: string;
  value: number;
  color: string;
}

export interface ReportDailyWorkSection {
  tasks: ReportDailyWorkTask[];
  time_allocation: ReportTimeSlice[];
  total_hours: number;
  summary: string;
}

export interface ReportBeforeAfterSection {
  role_today: string;
  role_future: string;
  hours_freed_per_week: number;
  narrative: string;
  shifts: string[];
}

export interface ReportRoadmapItem {
  title: string;
  priority: string;
  effort: string;
  impact: string;
}

export interface ReportRoadmapPhase {
  period: string;
  items: ReportRoadmapItem[];
}

export interface ReportToolkitTool {
  name: string;
  description: string;
  use_cases: string;
  why: string;
  efficiency_gain: string;
}

export interface ReportToolkitCategory {
  title: string;
  category_key: string;
  tools: ReportToolkitTool[];
}

export interface ReportCostRoiSection {
  annual_salary_estimate?: number | null;
  ld_investment: number;
  ai_tools_cost: number;
  hours_saved_weekly: number;
  payback_months?: number | null;
  roi_summary: string;
  breakdown: ReportSnapshotItem[];
}

export interface ReportUrgencyBar {
  label: string;
  value: number;
  tone?: string;
}

export interface ReportMarketUrgencySection {
  urgency_score: number;
  demand_pct: number;
  roles_at_risk_pct: number;
  salary_premium_pct: number;
  urgency_bars: ReportUrgencyBar[];
  summary: string;
}

export interface ReportActionItem {
  text: string;
  priority: string;
  impact: string;
  time: string;
  difficulty: string;
}

export interface ReportActionPlanSection {
  start_doing: ReportActionItem[];
  stop_doing: ReportActionItem[];
  automate_with_ai: ReportActionItem[];
  learn_next: ReportActionItem[];
}

export interface ReportCareerNode {
  label: string;
  role: string;
}

export interface ReportIdealRole {
  role: string;
  reason: string;
}

export interface ReportCareerIdentitySection {
  title: string;
  subtitle: string;
  narrative: string;
  strengths: string[];
  blind_spots: string[];
  roadmap_nodes: ReportCareerNode[];
  ideal_roles: ReportIdealRole[];
  closing_note: string;
}

export interface TaskAnalysisItem {
  task_id: string;
  task_title: string;
  task_description?: string | null;
  task_category?: string | null;
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  category: string;
  rationale?: string | null;
  reason?: string | null;
  next_actions: string[];
  auto_potential?: number | null;
  risk_level?: string | null;
<<<<<<< HEAD
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
=======
  future_impact?: string | null;
  recommended_tools: string[];
}

export interface TaskRoutingSection {
  analyses: TaskAnalysisItem[];
  summary_confidence?: number | null;
  regenerated: boolean;
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
}

export interface CareerIntelligenceReport {
  assessment_id: string;
  report_version: string;
  generated_at: string;
<<<<<<< HEAD
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
=======
  strategic_note: string;
  overview: ReportOverviewSection;
  ai_readiness: AIReadinessResult;
  task_routing: TaskRoutingSection;
  before_after: ReportBeforeAfterSection;
  upskill_roadmap: ReportRoadmapPhase[];
  ai_toolkit: ReportToolkitCategory[];
  cost_roi: ReportCostRoiSection;
  market_urgency: ReportMarketUrgencySection;
  action_plan: ReportActionPlanSection;
  career_identity: ReportCareerIdentitySection;
  competencies: ReportCompetencyGroup[];
  daily_work: ReportDailyWorkSection;
}

export async function getCareerReport(assessmentId: string): Promise<CareerIntelligenceReport> {
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  const response = await fetchApi(`/assessment/${assessmentId}/report`);
  return response.data;
}

<<<<<<< HEAD
export async function generateReport(
=======
export async function generateCareerReport(
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  assessmentId: string,
  regenerate = false,
): Promise<CareerIntelligenceReport> {
  const query = regenerate ? "?regenerate=true" : "";
  const response = await fetchApi(`/assessment/${assessmentId}/generate-report${query}`, {
    method: "POST",
  });
  return response.data;
}

<<<<<<< HEAD
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
=======
export async function loadOrGenerateCareerReport(
  assessmentId: string,
): Promise<CareerIntelligenceReport> {
  try {
    return await getCareerReport(assessmentId);
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("not been generated")) {
      return generateCareerReport(assessmentId);
    }
    throw error;
  }
}

export interface ReportScorecard {
  headline: string;
  linkedin_text: string;
  twitter_text: string;
  hashtags: string[];
}

export async function getReportScorecard(assessmentId: string): Promise<ReportScorecard> {
  const response = await fetchApi(`/assessment/${assessmentId}/report/scorecard`);
  return response.data;
}

function triggerDownload(blob: Blob, filename: string) {
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
<<<<<<< HEAD
  anchor.click();
=======
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
  URL.revokeObjectURL(url);
}

export async function downloadReportPdf(assessmentId: string) {
<<<<<<< HEAD
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
=======
  const blob = await fetchBlob(`/assessment/${assessmentId}/report/pdf`);
  triggerDownload(blob, `career-intelligence-report-${assessmentId.slice(0, 8)}.pdf`);
}

export async function downloadToolkitHtml(assessmentId: string) {
  const blob = await fetchBlob(`/assessment/${assessmentId}/report/toolkit`);
  triggerDownload(blob, `ai-toolkit-${assessmentId.slice(0, 8)}.html`);
}

export async function downloadReportJson(assessmentId: string) {
  const blob = await fetchBlob(`/assessment/${assessmentId}/report/export.json`);
  triggerDownload(blob, `career-report-${assessmentId.slice(0, 8)}.json`);
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
}
