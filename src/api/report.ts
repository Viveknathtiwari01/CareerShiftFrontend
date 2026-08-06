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
  category: string;
  rationale?: string | null;
  reason?: string | null;
  next_actions: string[];
  auto_potential?: number | null;
  risk_level?: string | null;
  future_impact?: string | null;
  recommended_tools: string[];
}

export interface TaskRoutingSection {
  analyses: TaskAnalysisItem[];
  summary_confidence?: number | null;
  regenerated: boolean;
}

export interface CareerIntelligenceReport {
  assessment_id: string;
  report_version: string;
  generated_at: string;
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
  const response = await fetchApi(`/assessment/${assessmentId}/report`);
  return response.data;
}

export async function generateCareerReport(
  assessmentId: string,
  regenerate = false,
): Promise<CareerIntelligenceReport> {
  const query = regenerate ? "?regenerate=true" : "";
  const response = await fetchApi(`/assessment/${assessmentId}/generate-report${query}`, {
    method: "POST",
  });
  return response.data;
}

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
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function downloadReportPdf(assessmentId: string) {
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
}
