import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IDENTITY_FIELD_META,
  formatConfidencePercent,
  isReviewDraftComplete,
  isTrustedSuggestion,
  type IdentityFieldKey,
  type ReviewDraft,
  type SuggestIdentityResponse,
} from "./identity-suggest";
import { wizardFieldLabelClass, wizardInputClass, wizardStepCardClass } from "./wizard-styles";

interface Props {
  suggestions: SuggestIdentityResponse;
  reviewDraft: ReviewDraft;
  onReviewDraftChange: (draft: ReviewDraft) => void;
  onConfirm: () => void;
  onStartOver: () => void;
  onEnterManually: () => void;
}

export function AIAssistedProfileReview({
  suggestions,
  reviewDraft,
  onReviewDraftChange,
  onConfirm,
  onStartOver,
  onEnterManually,
}: Props) {
  const [editingKey, setEditingKey] = useState<IdentityFieldKey | null>(null);
  const [editBuffer, setEditBuffer] = useState("");
  const [editSnapshot, setEditSnapshot] = useState("");

  const canConfirm = isReviewDraftComplete(reviewDraft);

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={wizardStepCardClass}>
        <CardHeader className="px-4 pt-5 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">Review AI suggestions</CardTitle>
          <CardDescription className="text-foreground/70">
            Accept, edit, or replace each suggestion. Confirm only after you are satisfied — AI is
            an assistant, not the final authority.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-4 pb-5 sm:space-y-6 sm:px-6 sm:pb-6">
          {IDENTITY_FIELD_META.map(({ key, label, unableMessage }) => {
            const suggestion = suggestions[key];
            const trusted = isTrustedSuggestion(suggestion);
            const isEditing = editingKey === key;

            return (
              <div
                key={key}
                className="space-y-2 rounded-lg border border-border bg-card/60 p-4 shadow-soft"
              >
                <Label className={wizardFieldLabelClass}>{label}</Label>

                {trusted ? (
                  isEditing ? (
                    <div className="space-y-3">
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
                    <div className="space-y-2">
                      <p className="text-base font-medium text-foreground">{reviewDraft[key]}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatConfidencePercent(suggestion.confidence)}
                      </p>
                      <p className="text-sm text-foreground/75">{suggestion.reason}</p>
                      <Button type="button" variant="outline" size="sm" onClick={() => startEdit(key)}>
                        Edit
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{unableMessage}</p>
                    <Input
                      value={reviewDraft[key]}
                      onChange={(e) => setManualValue(key, e.target.value)}
                      placeholder={`Enter ${label.toLowerCase()} manually`}
                      className={wizardInputClass}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {!canConfirm ? (
            <p className="text-sm text-muted-foreground">
              Fill in all five fields before confirming.
            </p>
          ) : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              type="button"
              onClick={onConfirm}
              disabled={!canConfirm || editingKey !== null}
              className="h-11 min-w-[10rem]"
            >
              Confirm & Continue
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onStartOver}
              className="h-11 border-border bg-card"
            >
              Start Over
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onEnterManually}
              className="h-11"
            >
              Enter manually instead
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
