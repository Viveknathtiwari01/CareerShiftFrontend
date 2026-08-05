import { fetchApi } from "@/lib/api";
import type { Task } from "@/store/mock-store";

export interface SuggestedTask {
  title: string;
  description?: string | null;
  category?: string | null;
  hours_per_week: number;
  complexity: string;
  creativity: string;
  human_touch: string;
  confidence?: number | null;
}

export interface TaskGenerationResult {
  tasks: BackendTask[];
  suggested_additional: SuggestedTask[];
  regenerated: boolean;
}

export interface BackendTask {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  hours_per_week: number;
  complexity: string;
  creativity: string;
  human_touch: string;
  confidence?: number | null;
  selected: boolean;
  source: string;
  sort_order: number;
  frequency?: string | null;
  business_criticality?: string | null;
  time_allocation?: number | null;
  ai_assistance?: string | null;
  confidence_score?: number | null;
  manual_notes?: string | null;
}

export function mapBackendTaskToFrontend(task: BackendTask): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    category: task.category ?? undefined,
    hoursPerWeek: task.hours_per_week,
    complexity: (task.complexity as Task["complexity"]) || "medium",
    creativity: (task.creativity as Task["creativity"]) || "medium",
    humanTouch: (task.human_touch as Task["humanTouch"]) || "medium",
    confidence: task.confidence ?? undefined,
    selected: task.selected,
    source: (task.source as Task["source"]) ?? "AI_GENERATED",
    frequency: (task.frequency as Task["frequency"]) ?? undefined,
    businessCriticality: (task.business_criticality as Task["businessCriticality"]) ?? undefined,
    timeAllocation: task.time_allocation ?? undefined,
    aiAssistance: (task.ai_assistance as Task["aiAssistance"]) ?? undefined,
    confidenceScore: task.confidence_score ?? undefined,
    manualNotes: task.manual_notes ?? undefined,
  };
}

export function mapFrontendTaskToBackend(task: Task, index: number): Record<string, unknown> {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? null,
    category: task.category ?? null,
    hours_per_week: task.hoursPerWeek ?? 0,
    complexity: task.complexity ?? "medium",
    creativity: task.creativity ?? "medium",
    human_touch: task.humanTouch ?? "medium",
    confidence: task.confidence ?? null,
    selected: task.selected ?? true,
    source: task.source ?? "USER",
    sort_order: index,
    frequency: task.frequency ?? null,
    business_criticality: task.businessCriticality ?? null,
    time_allocation: task.timeAllocation ?? null,
    ai_assistance: task.aiAssistance ?? null,
    confidence_score: task.confidenceScore ?? null,
    manual_notes: task.manualNotes ?? null,
  };
}

export async function getAssessmentTasks(assessmentId: string): Promise<BackendTask[]> {
  const response = await fetchApi(`/assessment/${assessmentId}/tasks`);
  return response.data ?? [];
}

export async function generateAssessmentTasks(
  assessmentId: string,
  regenerate = false,
): Promise<TaskGenerationResult> {
  const query = regenerate ? "?regenerate=true" : "";
  const response = await fetchApi(`/assessment/${assessmentId}/tasks/generate${query}`, {
    method: "POST",
  });
  return response.data;
}

export async function saveAssessmentTasks(
  assessmentId: string,
  tasks: Task[],
): Promise<BackendTask[]> {
  const response = await fetchApi(`/assessment/${assessmentId}/tasks`, {
    method: "PUT",
    body: JSON.stringify({
      tasks: tasks.map((task, index) => mapFrontendTaskToBackend(task, index)),
    }),
  });
  return response.data ?? [];
}

export function mapSuggestedToTask(s: SuggestedTask): Task {
  return {
    id: crypto.randomUUID(),
    title: s.title,
    description: s.description ?? undefined,
    category: s.category ?? undefined,
    hoursPerWeek: s.hours_per_week,
    complexity: (s.complexity as Task["complexity"]) || "medium",
    creativity: (s.creativity as Task["creativity"]) || "medium",
    humanTouch: (s.human_touch as Task["humanTouch"]) || "medium",
    confidence: s.confidence ?? undefined,
    selected: true,
    source: "USER" as const,
  };
}
