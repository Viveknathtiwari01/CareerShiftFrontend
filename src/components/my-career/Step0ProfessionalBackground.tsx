import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
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
  const length = backgroundText.length;
  const tooShort = length > 0 && length < MIN_BACKGROUND_LENGTH;
  const tooLong = length > MAX_BACKGROUND_LENGTH;
  const canAnalyze =
    length >= MIN_BACKGROUND_LENGTH && length <= MAX_BACKGROUND_LENGTH && !analyzing;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={wizardStepCardClass}>
        <CardHeader className="px-4 pt-5 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">
            Tell us about your professional background
          </CardTitle>
          <CardDescription className="text-foreground/70">
            Write or paste a LinkedIn About section, resume summary, or a short description of your
            current role, industry, responsibilities, and specialization. AI can suggest your career
            identity — or you can enter it manually.
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
            <Button
              type="button"
              variant="outline"
              onClick={onEnterManually}
              disabled={analyzing}
              className="h-11 flex-1 border-border bg-card sm:flex-none"
            >
              Enter manually instead
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
