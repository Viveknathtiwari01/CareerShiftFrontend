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

export interface ToolkitTaskLink {
  task_title: string;
  reason: string;
}

export interface ToolkitItem {
  name: string;
  category: string;
  use_case: string;
  source?: string;
  priority_rank?: number | null;
  priority_label?: string | null;
  priority_reason?: string | null;
  task_links?: ToolkitTaskLink[];
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

function kpiValue(kpis: Array<{ label?: string; value?: string }>, label: string): string {
  return kpis.find((k) => k.label === label)?.value ?? "—";
}

function snapshotValue(
  snapshot: Array<{ label?: string; value?: string }>,
  label: string,
): string {
  return snapshot.find((s) => s.label === label)?.value ?? "—";
}

function parseIntSafe(value: string | number | undefined, fallback = 0): number {
  if (typeof value === "number") return value;
  if (!value) return fallback;
  const n = parseInt(String(value).replace(/[^\d-]/g, ""), 10);
  return Number.isNaN(n) ? fallback : n;
}

function actionTexts(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) =>
    typeof item === "string" ? item : String((item as { text?: string }).text ?? ""),
  ).filter(Boolean);
}

function priorityLabelFromRank(rank: number): string {
  if (rank <= 3) return "Critical";
  if (rank <= 6) return "High";
  if (rank <= 9) return "Medium";
  return "Supporting";
}

/** Parse stored report_version into a simple 1-based revision number. */
export function reportRevisionNumber(version: string | null | undefined): number {
  const value = (version ?? "1").trim();
  if (/^\d+$/.test(value)) return Math.max(1, parseInt(value, 10));

  const parts = value.split(".");
  if (parts.length === 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
    const major = parseInt(parts[0], 10);
    const minor = parseInt(parts[1], 10);
    if (major === 1) return Math.max(1, minor + 1);
  }

  if (parts[0] === "1") return Math.max(1, parts.length - 1);

  const numericParts = parts.filter((part) => /^\d+$/.test(part));
  return Math.max(1, numericParts.length || 1);
}

/** User-facing report version label, e.g. "1" or "3". */
export function formatReportVersion(version: string | null | undefined): string {
  return String(reportRevisionNumber(version));
}

function flattenToolkit(raw: unknown): ToolkitItem[] {
  if (!raw) return [];

  let source = raw;
  if (typeof raw === "object" && !Array.isArray(raw) && Array.isArray((raw as { tools?: unknown }).tools)) {
    source = (raw as { tools: unknown[] }).tools;
  }

  if (!Array.isArray(source)) return [];

  let items: ToolkitItem[];

  if (source.length > 0 && (source[0] as Record<string, unknown>)?.name && !(source[0] as Record<string, unknown>)?.tools) {
    items = source as ToolkitItem[];
  } else {
    items = source.flatMap((category: Record<string, unknown>) => {
      const categoryTitle = String(category.title ?? category.category ?? "AI Tools");
      const tools = Array.isArray(category.tools) ? category.tools : [];
      return tools.map((tool: Record<string, unknown>) => ({
        name: String(tool.name ?? "Tool"),
        category: String(tool.category ?? categoryTitle),
        use_case: String(tool.use_case ?? tool.use_cases ?? tool.description ?? tool.why ?? ""),
        source: tool.source ? String(tool.source) : undefined,
        priority_rank: typeof tool.priority_rank === "number" ? tool.priority_rank : null,
        priority_label: tool.priority_label ? String(tool.priority_label) : null,
        priority_reason: tool.priority_reason ? String(tool.priority_reason) : null,
        task_links: Array.isArray(tool.task_links)
          ? tool.task_links.map((link: Record<string, unknown>) => ({
              task_title: String(link.task_title ?? ""),
              reason: String(link.reason ?? ""),
            }))
          : [],
      }));
    });
  }

  return items.map((tool, index) => {
    const rank = tool.priority_rank ?? index + 1;
    return {
      ...tool,
      priority_rank: rank,
      priority_label: tool.priority_label ?? priorityLabelFromRank(rank),
      task_links: tool.task_links ?? [],
    };
  });
}

/** Maps backend CareerIntelligenceReportResponse to the UI contract. */
export function normalizeReport(raw: Record<string, unknown>): CareerIntelligenceReport {
  if (raw.overview && typeof raw.overview === "object" && "job_title" in (raw.overview as object)) {
    return raw as unknown as CareerIntelligenceReport;
  }

  const aiRaw = (raw.ai_readiness ?? {}) as Record<string, unknown>;
  const overviewRaw = (raw.overview ?? {}) as Record<string, unknown>;
  const kpis = Array.isArray(overviewRaw.kpis) ? overviewRaw.kpis : [];
  const snapshot = Array.isArray(overviewRaw.career_snapshot) ? overviewRaw.career_snapshot : [];
  const identityRaw = (raw.career_identity ?? {}) as Record<string, unknown>;
  const beforeAfterRaw = (raw.before_after ?? {}) as Record<string, unknown>;
  const dailyRaw = (raw.daily_work ?? {}) as Record<string, unknown>;
  const actionRaw = (raw.action_plan ?? {}) as Record<string, unknown>;
  const roadmapRaw = raw.upskill_roadmap ?? raw.learning_roadmap ?? [];

  const dimensionsRaw = Array.isArray(aiRaw.dimensions) ? aiRaw.dimensions : [];
  const strengthsRaw = Array.isArray(aiRaw.strengths) ? aiRaw.strengths : [];
  const improvementsRaw = Array.isArray(aiRaw.improvements) ? aiRaw.improvements : [];

  const taskRoutingRaw = raw.task_routing as Record<string, unknown> | undefined;
  const taskAnalyses = Array.isArray(taskRoutingRaw?.analyses)
    ? taskRoutingRaw.analyses
    : Array.isArray(raw.task_routing)
      ? raw.task_routing
      : [];

  const automationKpi = kpiValue(kpis, "Automation %");
  const automationPct =
    automationKpi === "—" ? 0 : parseIntSafe(automationKpi.replace("%", ""));

  const idealRolesRaw = Array.isArray(identityRaw.ideal_roles) ? identityRaw.ideal_roles : [];

  return {
    assessment_id: String(raw.assessment_id ?? ""),
    report_version: String(raw.report_version ?? "1"),
    generated_at: String(raw.generated_at ?? new Date().toISOString()),
    strategic_note: raw.strategic_note ? String(raw.strategic_note) : null,
    overview: {
      overall_score:
        parseIntSafe(kpiValue(kpis, "Overall Score")) ||
        parseIntSafe(aiRaw.overall_score as number | undefined),
      tasks_analyzed: parseIntSafe(kpiValue(kpis, "Tasks Analyzed")),
      competency_count: parseIntSafe(kpiValue(kpis, "Competencies")),
      ai_tools_count: parseIntSafe(kpiValue(kpis, "AI Tools Used")),
      automation_pct: automationPct,
      career_risk: String(aiRaw.career_risk ?? kpiValue(kpis, "Career Risk") ?? "—"),
      job_title: snapshotValue(snapshot, "Current Role"),
      industry: snapshotValue(snapshot, "Industry"),
      experience_years: parseIntSafe(snapshotValue(snapshot, "Experience")),
      profession_summary: String(overviewRaw.insight ?? aiRaw.insight ?? ""),
      reading_time_minutes: undefined,
    },
    ai_readiness: {
      overall_score: parseIntSafe(aiRaw.overall_score as number | undefined),
      tier_label: String(aiRaw.tier_label ?? "—"),
      tier_description: String(aiRaw.summary ?? aiRaw.tier_description ?? ""),
      dimensions: dimensionsRaw.map((d: Record<string, unknown>) => ({
        name: String(d.subject ?? d.name ?? "Dimension"),
        score: parseIntSafe(d.score as number | undefined),
      })),
      strengths: strengthsRaw.map((s: unknown) =>
        typeof s === "string" ? s : String((s as { title?: string }).title ?? ""),
      ).filter(Boolean),
      improvement_areas: improvementsRaw.map((i: unknown) =>
        typeof i === "string" ? i : String((i as { title?: string }).title ?? ""),
      ).filter(Boolean),
      factors: Array.isArray(aiRaw.factors) ? (aiRaw.factors as Array<Record<string, string | number>>) : [],
    },
    competencies: (Array.isArray(raw.competencies) ? raw.competencies : []).map(
      (group: Record<string, unknown>) => ({
        category: String(group.title ?? group.category ?? "Competencies"),
        items: (Array.isArray(group.items) ? group.items : []).map(
          (item: Record<string, unknown>) => ({
            name: String(item.name ?? ""),
            importance: item.importance ? String(item.importance) : null,
            expected_level: item.growth
              ? String(item.growth)
              : item.expected_level
                ? String(item.expected_level)
                : null,
            why_it_matters: item.why_it_matters ? String(item.why_it_matters) : null,
          }),
        ),
      }),
    ),
    daily_work: {
      tasks: (Array.isArray(dailyRaw.tasks) ? dailyRaw.tasks : []).map(
        (task: Record<string, unknown>) => ({
          title: String(task.name ?? task.title ?? "Task"),
          hours_per_week: Number(task.hours_per_week ?? 0),
          category: String(task.category_3b ?? task.category ?? "General"),
          complexity: String(task.criticality ?? task.complexity ?? "medium"),
          ai_assistance: task.ai_usage ?? task.ai_assistance ?? null,
        }),
      ),
      total_hours_per_week: Number(dailyRaw.total_hours ?? dailyRaw.total_hours_per_week ?? 0),
    },
    task_routing: taskAnalyses.map((item: Record<string, unknown>) => ({
      task_id: String(item.task_id ?? ""),
      task_title: String(item.task_title ?? item.title ?? "Task"),
      category: String(item.category ?? "BLEND"),
      rationale: item.rationale ? String(item.rationale) : null,
      reason: item.reason ? String(item.reason) : null,
      next_actions: Array.isArray(item.next_actions)
        ? item.next_actions.map(String)
        : [],
      auto_potential:
        typeof item.auto_potential === "number" ? item.auto_potential : null,
      risk_level: item.risk_level ? String(item.risk_level) : null,
      recommended_tools: Array.isArray(item.recommended_tools)
        ? item.recommended_tools.map(String)
        : [],
    })),
    career_identity: {
      identity_title: String(identityRaw.title ?? identityRaw.identity_title ?? "Your Career Identity"),
      confidence_pct: parseIntSafe(aiRaw.overall_score as number | undefined, 75),
      executive_summary: String(
        identityRaw.narrative ?? identityRaw.executive_summary ?? aiRaw.summary ?? "",
      ),
      ideal_roles: idealRolesRaw.map((role: unknown) =>
        typeof role === "string" ? role : String((role as { role?: string }).role ?? ""),
      ).filter(Boolean),
      superpowers: (Array.isArray(identityRaw.strengths)
        ? identityRaw.strengths
        : identityRaw.superpowers ?? []
      ).map(String),
      blind_spots: (Array.isArray(identityRaw.blind_spots) ? identityRaw.blind_spots : []).map(
        String,
      ),
      growth_strategy: String(
        identityRaw.closing_note ?? identityRaw.growth_strategy ?? identityRaw.subtitle ?? "",
      ),
    },
    learning_roadmap: (Array.isArray(roadmapRaw) ? roadmapRaw : []).map(
      (phase: Record<string, unknown>) => ({
        horizon: String(phase.period ?? phase.horizon ?? "Phase"),
        title: String(phase.period ?? phase.title ?? "Roadmap"),
        items: (Array.isArray(phase.items) ? phase.items : []).map((item: unknown) =>
          typeof item === "string" ? item : String((item as { title?: string }).title ?? ""),
        ).filter(Boolean),
      }),
    ),
    ai_toolkit: flattenToolkit(raw.ai_toolkit),
    action_plan: {
      start: actionTexts(actionRaw.start_doing ?? actionRaw.start),
      stop: actionTexts(actionRaw.stop_doing ?? actionRaw.stop),
      automate: actionTexts(actionRaw.automate_with_ai ?? actionRaw.automate),
      learn: actionTexts(actionRaw.learn_next ?? actionRaw.learn),
    },
    before_after: {
      ...beforeAfterRaw,
      current_role: beforeAfterRaw.role_today ?? beforeAfterRaw.current_role,
      future_role: beforeAfterRaw.role_future ?? beforeAfterRaw.future_role,
    },
    cost_roi: (raw.cost_roi ?? {}) as Record<string, unknown>,
    market_urgency: (raw.market_urgency ?? {}) as Record<string, unknown>,
  };
}

export async function getReport(assessmentId: string): Promise<CareerIntelligenceReport> {
  const response = await fetchApi(`/assessment/${assessmentId}/report`);
  return normalizeReport(response.data as Record<string, unknown>);
}

export async function generateReport(
  assessmentId: string,
  regenerate = false,
): Promise<CareerIntelligenceReport> {
  const query = regenerate ? "?regenerate=true" : "";
  const response = await fetchApi(`/assessment/${assessmentId}/generate-report${query}`, {
    method: "POST",
  });
  return normalizeReport(response.data as Record<string, unknown>);
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

export async function downloadReportDocx(assessmentId: string) {
  const { fetchBlob } = await import("@/lib/api");
  const blob = await fetchBlob(`/assessment/${assessmentId}/report/docx`);
  const docBlob =
    blob.type && blob.type !== "application/json"
      ? blob
      : new Blob([blob], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
  downloadBlob(docBlob, "careershift-report.docx");
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
