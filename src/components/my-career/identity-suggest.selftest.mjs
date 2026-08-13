/**
 * Plain-Node selftest mirroring identity-suggest.ts pure helpers.
 * Run: node src/components/my-career/identity-suggest.selftest.mjs
 */

const CONFIDENCE_THRESHOLD = 0.8;

function isTrustedSuggestion(field) {
  if (!field) return false;
  const value = field.value?.trim() ?? "";
  if (!value) return false;
  return field.confidence >= CONFIDENCE_THRESHOLD;
}

function emptyReviewDraft() {
  return {
    industry: "",
    department: "",
    functional_domain: "",
    specialization: "",
    job_title: "",
  };
}

function buildReviewDraftFromSuggestions(suggestions) {
  const draft = emptyReviewDraft();
  for (const key of Object.keys(draft)) {
    const field = suggestions[key];
    draft[key] = isTrustedSuggestion(field) ? (field.value ?? "").trim() : "";
  }
  return draft;
}

function isReviewDraftComplete(draft) {
  return Object.values(draft).every((v) => String(v).trim().length > 0);
}

function mapReviewToWizardData(draft, current) {
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

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const baseWizard = {
  jobTitle: "Old",
  industry: "Old",
  businessFunction: "Old",
  domain: "Old",
  specialization: "Old",
  sector_id: "s1",
  department_id: "d1",
  functional_domain_id: "f1",
  specialization_id: "sp1",
  job_title_id: "j1",
  experience: "5",
};

const suggestions = {
  industry: { value: "Healthcare Technology", confidence: 0.93, reason: "Stated." },
  department: { value: "Information Technology", confidence: 0.79, reason: "Weak." },
  functional_domain: { value: "Software Engineering", confidence: 0.8, reason: "Explicit." },
  specialization: { value: null, confidence: 0.5, reason: "Insufficient." },
  job_title: { value: "Senior Software Engineer", confidence: 0.81, reason: "Stated." },
};

assert(isTrustedSuggestion(suggestions.industry) === true, "0.93 trusted");
assert(isTrustedSuggestion(suggestions.department) === false, "0.79 untrusted");
assert(isTrustedSuggestion(suggestions.functional_domain) === true, "0.80 trusted");
assert(isTrustedSuggestion(suggestions.specialization) === false, "null untrusted");
assert(isTrustedSuggestion(suggestions.job_title) === true, "0.81 trusted");

const draft = buildReviewDraftFromSuggestions(suggestions);
assert(draft.industry === "Healthcare Technology", "trusted industry seeded");
assert(draft.department === "", "untrusted department empty");
assert(draft.functional_domain === "Software Engineering", "0.80 seeded");
assert(draft.specialization === "", "null specialization empty");
assert(isReviewDraftComplete(draft) === false, "incomplete until all filled");

draft.department = "IT";
draft.specialization = "Backend";
assert(isReviewDraftComplete(draft) === true, "complete after fill");

const original = { ...baseWizard };
const mapped = mapReviewToWizardData(draft, baseWizard);
assert(mapped.industry === "Healthcare Technology", "map industry");
assert(mapped.businessFunction === "IT", "map department");
assert(mapped.domain === "Software Engineering", "map domain");
assert(mapped.jobTitle === "Senior Software Engineer", "map job title");
assert(mapped.sector_id === undefined, "clear sector_id");
assert(mapped.department_id === undefined, "clear department_id");
assert(mapped.functional_domain_id === undefined, "clear functional_domain_id");
assert(mapped.specialization_id === undefined, "clear specialization_id");
assert(mapped.job_title_id === undefined, "clear job_title_id");
assert(mapped.experience === "5", "preserve other fields");
assert(baseWizard.industry === original.industry, "pure: no mutate");
assert(baseWizard.sector_id === original.sector_id, "pure: ids intact on input");

console.log("identity-suggest.selftest.mjs: all assertions passed");
