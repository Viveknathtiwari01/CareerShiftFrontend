import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, AlignLeft, CheckSquare, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_BACKGROUND_LENGTH,
  MIN_BACKGROUND_LENGTH,
} from "./identity-suggest";
import { wizardFieldLabelClass, wizardStepCardClass } from "./wizard-styles";

interface Props {
  backgroundText: string;
  onBackgroundTextChange: (value: string) => void;
  analyzing: boolean;
  onAnalyze: () => void;
  onEnterManually: () => void;
}

export function Step0ProfessionalBackground({
  backgroundText,
  onBackgroundTextChange,
  analyzing,
  onAnalyze,
  onEnterManually,
}: Props) {
  const [mode, setMode] = useState<"select" | "ai-input">("select");
  const length = backgroundText.length;
  const tooShort = length > 0 && length < MIN_BACKGROUND_LENGTH;
  const tooLong = length > MAX_BACKGROUND_LENGTH;
  const canAnalyze =
    length >= MIN_BACKGROUND_LENGTH && length <= MAX_BACKGROUND_LENGTH && !analyzing;

  return (
    <AnimatePresence mode="wait">
      {mode === "select" ? (
        <motion.div
          key="select"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 px-4 sm:px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setMode("ai-input")}
              className="text-left group relative flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100/50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                <AlignLeft className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-foreground">
                Describe your background
              </h3>
              <p className="mb-4 text-xs text-muted-foreground flex-1 leading-relaxed">
                Paste your LinkedIn About section, resume summary, or a couple of sentences about your role. AI reads it and suggests your identity fields for you to confirm.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                  AI-suggested
                </span>
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                  ~30 sec
                </span>
              </div>
              <div className="font-semibold text-xs flex items-center text-foreground group-hover:text-primary transition-colors">
                Continue with AI <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </div>
            </button>

            <button
              type="button"
              onClick={onEnterManually}
              className="text-left group relative flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100/50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-foreground">
                Enter details yourself
              </h3>
              <p className="mb-4 text-xs text-muted-foreground flex-1 leading-relaxed">
                Already know your Industry, Department, Functional Domain, Specialization, and Job Title? Skip the write-up and fill them in directly.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                  5 fields
                </span>
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                  Full control
                </span>
              </div>
              <div className="font-semibold text-xs flex items-center text-foreground group-hover:text-primary transition-colors">
                Enter manually <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </div>
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="ai-input"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="px-4 sm:px-6"
        >
          <Button
            variant="ghost"
            className="mb-4 -ml-4 text-muted-foreground"
            onClick={() => setMode("select")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Card className={wizardStepCardClass}>
            <CardHeader className="px-4 pt-5 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl">
                Tell us about your professional background
              </CardTitle>
              <CardDescription className="text-foreground/70">
                Write or paste a LinkedIn About section, resume summary, or a short description of your
                current role, industry, responsibilities, and specialization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-4 pb-5 sm:space-y-6 sm:px-6 sm:pb-6">
              <div className="space-y-2">
                <Label htmlFor="professional-background" className={wizardFieldLabelClass}>
                  Professional background
                </Label>
                <Textarea
                  id="professional-background"
                  value={backgroundText}
                  onChange={(e) => onBackgroundTextChange(e.target.value)}
                  disabled={analyzing}
                  rows={10}
                  placeholder="Describe your current role, industry, responsibilities, skills, specialization, and experience..."
                  className="min-h-[12rem] resize-y bg-card text-base shadow-sm sm:text-sm"
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>
                    {tooShort
                      ? `Enter at least ${MIN_BACKGROUND_LENGTH} characters`
                      : tooLong
                        ? `Maximum ${MAX_BACKGROUND_LENGTH} characters`
                        : "AI will suggest Industry, Department, Domain, Specialization, and Job Title"}
                  </span>
                  <span className={tooLong ? "text-destructive" : undefined}>
                    {length} / {MAX_BACKGROUND_LENGTH}
                  </span>
                </div>
              </div>

              {analyzing ? (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                  Understanding your professional background...
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={onAnalyze}
                  disabled={!canAnalyze}
                  className="h-11 min-w-[10rem] flex-1 sm:flex-none"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
