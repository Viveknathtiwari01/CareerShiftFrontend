import { EXPERIENCE_LEVELS } from "@/lib/app-enums";
import type { WizardData } from "./types";

/** Evidence-confidence threshold for trusted AI suggestions (frontend-only). */
export const CONFIDENCE_THRESHOLD = 0.8;

export const MIN_BACKGROUND_LENGTH = 10;
export const MAX_BACKGROUND_LENGTH = 8000;

export type IdentityFieldKey =
  | "industry"
  | "department"
  | "functional_domain"
  | "specialization"
  | "job_title";

export interface FieldSuggestion {
  value: string | null;
  confidence: number;
  reason: string;
}

export interface ResumeExtractedDetails {
  experience_years: number | null;
  experience_level: string | null;
  tools: string[];
  technical_skills: string[];
  professional_skills: string[];
  soft_skills: string[];
  behavioural_skills: string[];
  digital_skills: string[];
  ai_tools: string[];
}

export interface SuggestIdentityResponse {
  industry: FieldSuggestion;
  department: FieldSuggestion;
  functional_domain: FieldSuggestion;
  specialization: FieldSuggestion;
  job_title: FieldSuggestion;
  resume_details?: ResumeExtractedDetails | null;
}

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const RESUME_ACCEPT = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type ReviewDraft = Record<IdentityFieldKey, string>;

export const IDENTITY_FIELD_META: {
  key: IdentityFieldKey;
  label: string;
  unableMessage: string;
}[] = [
  {
    key: "industry",
    label: "Industry",
    unableMessage: "Unable to confidently determine your industry.",
  },
  {
    key: "department",
    label: "Department / Business Function",
    unableMessage: "Unable to confidently determine your department.",
  },
  {
    key: "functional_domain",
    label: "Functional Domain",
    unableMessage: "Unable to confidently determine your functional domain.",
  },
  {
    key: "specialization",
    label: "Specialization",
    unableMessage: "Unable to confidently determine your specialization.",
  },
  {
    key: "job_title",
    label: "Job Title",
    unableMessage: "Unable to confidently determine your job title.",
  },
];

export function emptyReviewDraft(): ReviewDraft {
  return {
    industry: "",
    department: "",
    functional_domain: "",
    specialization: "",
    job_title: "",
  };
}

export function isTrustedSuggestion(field: FieldSuggestion | null | undefined): boolean {
  if (!field) return false;
  const value = field.value?.trim() ?? "";
  if (!value) return false;
  return field.confidence >= CONFIDENCE_THRESHOLD;
}

/** Seed reviewDraft from AI: trusted values only; untrusted → empty string. */
export function buildReviewDraftFromSuggestions(
  suggestions: SuggestIdentityResponse,
): ReviewDraft {
  const draft = emptyReviewDraft();
  for (const { key } of IDENTITY_FIELD_META) {
    const field = suggestions[key];
    draft[key] = isTrustedSuggestion(field) ? (field.value ?? "").trim() : "";
  }
  return draft;
}

export function isReviewDraftComplete(draft: ReviewDraft): boolean {
  return IDENTITY_FIELD_META.every(({ key }) => draft[key].trim().length > 0);
}

/**
 * Pure mapper: copies confirmed review draft into WizardData and clears cascade IDs.
 * Does not mutate `current`.
 */
export function mapReviewToWizardData(draft: ReviewDraft, current: WizardData): WizardData {
  return {
    ...current,
    industry: draft.industry.trim(),
    businessFunction: draft.department.trim(),
    domain: draft.functional_domain.trim(),
    specialization: draft.specialization.trim(),
    jobTitle: draft.job_title.trim(),
    sector_id: undefined,
    department_id: undefined,
    functional_domain_id: undefined,
    specialization_id: undefined,
    job_title_id: undefined,
  };
}

export function formatConfidencePercent(confidence: number): string {
  return `${Math.round(confidence * 100)}% confidence`;
}

function uniqueItems(items: string[] | null | undefined): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items ?? []) {
    const value = item.trim();
    const key = value.toLowerCase();
    if (!value || seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }
  return result;
}

function withoutExisting(items: string[], existing: string[]): string[] {
  const taken = new Set(existing.map((item) => item.toLowerCase()));
  return items.filter((item) => !taken.has(item.toLowerCase()));
}

/**
 * Copies resume-extracted experience, tools, and skills onto the wizard.
 * Identity fields already on `current` are left as confirmed.
 */
export function applyResumeDetails(
  current: WizardData,
  details: ResumeExtractedDetails | null | undefined,
): WizardData {
  if (!details) return current;

  const technical = uniqueItems(details.technical_skills);
  const digital = withoutExisting(uniqueItems(details.digital_skills), technical);
  const professional = uniqueItems(details.professional_skills);
  const soft = uniqueItems(details.soft_skills);
  const behavioural = uniqueItems(details.behavioural_skills);
  const placed = [...technical, ...digital, ...professional, ...soft, ...behavioural];
  const tools = withoutExisting(uniqueItems(details.tools), placed);
  const aiTools = uniqueItems(details.ai_tools);
  const experienceLevel = details.experience_level?.trim() ?? "";
  const experience = (EXPERIENCE_LEVELS as readonly string[]).includes(experienceLevel)
    ? experienceLevel
    : current.experience;

  return {
    ...current,
    experience,
    technicalSkills: uniqueItems([...technical, ...tools]),
    professionalSkills: professional,
    softSkills: soft,
    behaviouralSkills: behavioural,
    digitalSkills: digital,
    aiTools: aiTools.length > 0 ? uniqueItems([...current.aiTools, ...aiTools]) : current.aiTools,
  };
}

export function resumeFileError(file: File): string | null {
  const name = file.name.toLowerCase();
  const allowed = name.endsWith(".pdf") || name.endsWith(".docx");
  if (!allowed) return "Upload a PDF or DOCX resume.";
  if (file.size <= 0) return "The uploaded file is empty.";
  if (file.size > MAX_RESUME_BYTES) return "Resume must be 5 MB or smaller.";
  return null;
}
