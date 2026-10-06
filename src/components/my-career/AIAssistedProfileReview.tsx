import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IDENTITY_FIELD_META,
  isReviewDraftComplete,
  isTrustedSuggestion,
  type IdentityFieldKey,
  type ReviewDraft,
  type SuggestIdentityResponse,
} from "./identity-suggest";
import { wizardInputClass } from "./wizard-styles";
import { cn } from "@/lib/utils";

interface Props {
  suggestions: SuggestIdentityResponse;
  reviewDraft: ReviewDraft;
  onReviewDraftChange: (draft: ReviewDraft) => void;
  onConfirm: () => void;
  onStartOver: () => void;
  onEnterManually: () => void;
  source?: "background" | "resume";
}

export function AIAssistedProfileReview({
  suggestions,
  reviewDraft,
  onReviewDraftChange,
  onConfirm,
  onStartOver,
  source = "background",
}: Props) {
  const [editingKey, setEditingKey] = useState<IdentityFieldKey | null>(null);
  const [editBuffer, setEditBuffer] = useState("");
  const [editSnapshot, setEditSnapshot] = useState("");

  const canConfirm = isReviewDraftComplete(reviewDraft) && editingKey === null;
  const filledCount = IDENTITY_FIELD_META.filter(({ key }) => reviewDraft[key].trim().length > 0).length;
  const resumeDetails = source === "resume" ? suggestions.resume_details : null;
  const resumeTools = resumeDetails?.tools ?? [];
  const resumeSkillCount = resumeDetails
    ? [
        ...resumeDetails.technical_skills,
        ...resumeDetails.professional_skills,
        ...resumeDetails.soft_skills,
        ...resumeDetails.behavioural_skills,
        ...resumeDetails.digital_skills,
      ].length
    : 0;

  const startEdit = (key: IdentityFieldKey) => {
    setEditingKey(key);
    setEditBuffer(reviewDraft[key]);
    setEditSnapshot(reviewDraft[key]);
  };

  const saveEdit = () => {
    if (!editingKey) return;
    onReviewDraftChange({ ...reviewDraft, [editingKey]: editBuffer });
    setEditingKey(null);
    setEditBuffer("");
    setEditSnapshot("");
  };

  const cancelEdit = () => {
    if (!editingKey) return;
    onReviewDraftChange({ ...reviewDraft, [editingKey]: editSnapshot });
    setEditingKey(null);
    setEditBuffer("");
    setEditSnapshot("");
  };

  const setManualValue = (key: IdentityFieldKey, value: string) => {
    onReviewDraftChange({ ...reviewDraft, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-[#0B1D3A] dark:text-slate-100 sm:text-2xl">
            Review AI suggestions
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
            {source === "resume"
              ? "These fields were read from your resume. Edit anything that does not match before you continue."
              : "Check each suggestion. Edit anything that does not match before you continue."}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0B1D3A] px-3 py-1 text-xs font-semibold text-[#F2C94C]">
          <Sparkles className="h-3.5 w-3.5" />
          {filledCount} of 5 ready
        </span>
      </div>

      {resumeDetails ? (
        <section className="overflow-hidden rounded-2xl border border-[#0B1D3A]/10 bg-card shadow-sm">
          <div className="flex flex-col gap-2 bg-[#0B1D3A] px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm font-semibold">Also read from your resume</p>
            <p className="text-xs text-white/75">
              {resumeDetails.experience_level
                ? `Experience ${resumeDetails.experience_level}${
                    resumeDetails.experience_years != null ? ` · ${resumeDetails.experience_years} years` : ""
                  }`
                : "Experience was not clear enough to import"}
            </p>
          </div>
          <div className="space-y-3 px-4 py-4 sm:px-5">
            {resumeTools.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {resumeTools.slice(0, 12).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[#F2C94C]/70 bg-[#FFF9E6] px-2.5 py-1 text-xs font-medium text-[#0B1D3A]"
                  >
                    {tool}
                  </span>
                ))}
                {resumeTools.length > 12 ? (
                  <span className="rounded-full border border-border px-2.5 py-1 text-xs text-slate-500">
                    +{resumeTools.length - 12} more
                  </span>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No tools were listed clearly enough to import.</p>
            )}
            <p className="text-xs text-slate-500">
              {resumeSkillCount > 0
                ? "Tools and skills are carried into the next steps. You can change them before you save."
                : "You can add skills and experience on the next steps."}
            </p>
          </div>
        </section>
      ) : null}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {IDENTITY_FIELD_META.map(({ key, label, unableMessage }) => {
          const suggestion = suggestions[key];
          const trusted = isTrustedSuggestion(suggestion);
          const isEditing = editingKey === key;
          const needsInput = !reviewDraft[key].trim();

          return (
            <article
              key={key}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-4 shadow-sm",
                needsInput ? "border-[#F2C94C] ring-1 ring-[#F2C94C]/50" : "border-border",
                key === "job_title" ? "lg:col-span-2" : "",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B59146]">{label}</p>
                <div className="flex shrink-0 items-center gap-1.5">
                  {trusted && !isEditing ? (
                    <span className="rounded-full bg-[#0B1D3A]/6 px-2 py-0.5 text-[11px] font-semibold text-[#0B1D3A]">
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </span>
                  ) : needsInput ? (
                    <span className="rounded-full bg-[#F2C94C] px-2 py-0.5 text-[11px] font-semibold text-[#0B1D3A]">
                      Needs input
                    </span>
                  ) : null}
                  {trusted && !isEditing ? (
                    <button
                      type="button"
                      onClick={() => startEdit(key)}
                      aria-label={`Edit ${label}`}
                      className="grid h-7 w-7 place-items-center rounded-full text-[#0B1D3A]/70 transition-colors hover:bg-[#0B1D3A]/6 hover:text-[#0B1D3A]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>

              {trusted ? (
                isEditing ? (
                  <div className="mt-3 space-y-3">
                    <Input
                      value={editBuffer}
                      onChange={(e) => setEditBuffer(e.target.value)}
                      className={wizardInputClass}
                      autoFocus
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" size="sm" onClick={saveEdit}>
                        Save
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-1 flex-col">
                    <p className="text-lg font-semibold leading-snug text-[#0B1D3A] dark:text-slate-100">
                      {reviewDraft[key]}
                    </p>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{suggestion.reason}</p>
                  </div>
                )
              ) : (
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-slate-500">{unableMessage}</p>
                  <Input
                    value={reviewDraft[key]}
                    onChange={(e) => setManualValue(key, e.target.value)}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className={wizardInputClass}
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="sticky bottom-3 z-10 flex flex-col gap-3 rounded-2xl border border-[#0B1D3A]/10 bg-card/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="text-sm text-slate-600">
          {canConfirm
            ? "All five fields are ready."
            : editingKey
              ? "Save or cancel the field you are editing."
              : `${5 - filledCount} ${5 - filledCount === 1 ? "field still needs" : "fields still need"} a value.`}
        </p>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onStartOver} className="h-10 border-border bg-card">
            Start Over
          </Button>
          <Button type="button" onClick={onConfirm} disabled={!canConfirm} className="h-10 min-w-[10rem]">
            Confirm & Continue
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
