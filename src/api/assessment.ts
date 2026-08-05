import { fetchApi } from "@/lib/api";

export type AssessmentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

const STORAGE_KEY = "careershift.assessment.active";

export interface CompetencyItem {
  name: string;
  category: string;
  importance?: string | null;
  expected_level?: string | null;
  what_it_is?: string | null;
  why_it_matters?: string | null;
  professional_context?: string | null;
}

export interface CompetencyMappingOutput {
  profession_summary?: string | null;
  competencies: CompetencyItem[];
}

export interface PipelineError {
  message: string;
  failed_stage?: string | null;
}

export interface PipelineMetadata {
  pipeline_run_id: string;
  pipeline_version: string;
  model_name: string;
  started_at?: string | null;
  completed_at?: string | null;
  total_duration_seconds?: number | null;
  engine_metrics?: Record<string, number>;
}

export interface AssessmentStartResponse {
  assessment_id: string;
  pipeline_run_id: string;
  status: AssessmentStatus;
  already_running: boolean;
  reused_existing?: boolean;
  profile_stale?: boolean;
}

export interface AssessmentResponse {
  assessment_id: string;
  status: AssessmentStatus;
  competency_mapping: CompetencyMappingOutput | null;
  metadata: PipelineMetadata;
  error: PipelineError | null;
}

export interface AssessmentSummary {
  assessment_id: string;
  status: AssessmentStatus;
  created_at: string;
  completed_at?: string | null;
  competency_count?: number | null;
}

export interface AssessmentCurrentResponse {
  assessment_id?: string | null;
  pipeline_run_id?: string | null;
  status?: AssessmentStatus | null;
  needs_sync: boolean;
  profile_stale: boolean;
  reused_existing: boolean;
}

export async function getCurrentAssessment(): Promise<AssessmentCurrentResponse> {
  const response = await fetchApi("/assessment/current");
  return response.data;
}

export async function startAssessment(options?: { force?: boolean }): Promise<AssessmentStartResponse> {
  const query = options?.force ? "?force=true" : "";
  const response = await fetchApi(`/assessment${query}`, { method: "POST" });
  return response.data;
}

export async function getAssessment(assessmentId: string): Promise<AssessmentResponse> {
  const response = await fetchApi(`/assessment/${assessmentId}`);
  return response.data;
}

export async function retryAssessment(assessmentId: string): Promise<AssessmentStartResponse> {
  const response = await fetchApi(`/assessment/${assessmentId}/retry`, { method: "POST" });
  return response.data;
}

export async function listAssessments(): Promise<AssessmentSummary[]> {
  const response = await fetchApi("/assessment");
  return response.data ?? [];
}

/** Group competencies by category for display. */
export function groupCompetenciesByCategory(
  competencies: CompetencyItem[],
): Record<string, CompetencyItem[]> {
  return competencies.reduce<Record<string, CompetencyItem[]>>((groups, item) => {
    const category = item.category?.trim() || "Other";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});
}
