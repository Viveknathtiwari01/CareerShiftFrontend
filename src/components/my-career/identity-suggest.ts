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

export interface SuggestIdentityResponse {
  industry: FieldSuggestion;
  department: FieldSuggestion;
  functional_domain: FieldSuggestion;
  specialization: FieldSuggestion;
  job_title: FieldSuggestion;
}

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
