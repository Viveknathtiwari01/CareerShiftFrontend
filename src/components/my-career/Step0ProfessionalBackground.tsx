import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, AlignLeft, ArrowRight, ArrowLeft, Upload, FileText, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_BACKGROUND_LENGTH,
  MIN_BACKGROUND_LENGTH,
  RESUME_ACCEPT,
  resumeFileError,
} from "./identity-suggest";
import { wizardFieldLabelClass } from "./wizard-styles";

interface Props {
  backgroundText: string;
  onBackgroundTextChange: (value: string) => void;
  analyzing: boolean;
  onAnalyze: () => void;
  onAnalyzeResume: (file: File) => void;
  onEnterManually: () => void;
  onCancelAnalyze?: () => void;
  onEntryModeChange?: (mode: EntryMode) => void;
}

type EntryMode = "select" | "ai-input" | "resume";

const RESUME_QUOTES = [
  "Your experience is already a story. We're giving it a clearer shape.",
  "Every role you've held is a signal. We're reading the ones that point forward.",
  "A resume is more than a list of jobs. We're finding the career underneath it.",
  "You've already done the hard part. You built the experience. We're mapping what it means.",
  "Skills, tools, and titles are only the surface. We're seeing how they fit together.",
  "This is where your background stops being a document and starts becoming a direction.",
  "You don't need a perfect resume. You need a clear picture of where you stand.",
  "The work you've done is about to become a profile you can actually use.",
  "Stay with this. A sharper career identity is only a moment away.",
  "Same experience. A much clearer next step. That's what this mapping is for.",
];

function ResumeMappingQuotes() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId = 0;
    const intervalId = window.setInterval(() => {
      setVisible(false);
      timeoutId = window.setTimeout(() => {
        setQuoteIndex((current) => (current + 1) % RESUME_QUOTES.length);
        setVisible(true);
      }, 280);
    }, 4200);
    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="rounded-xl border border-[#E8B923]/45 bg-[#FFF9E8] px-4 py-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B59146]">
        While we map your profile
      </p>
      <p
        className={`mt-1.5 min-h-[2.75rem] text-sm font-medium leading-relaxed text-[#0B1D3A] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {RESUME_QUOTES[quoteIndex]}
      </p>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Step0ProfessionalBackground({
  backgroundText,
  onBackgroundTextChange,
  analyzing,
  onAnalyze,
  onAnalyzeResume,
  onCancelAnalyze,
  onEntryModeChange,
}: Props) {
  const [mode, setMode] = useState<EntryMode>("select");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onEntryModeChange?.(mode);
  }, [mode, onEntryModeChange]);

  const length = backgroundText.length;
  const tooShort = length > 0 && length < MIN_BACKGROUND_LENGTH;
  const tooLong = length > MAX_BACKGROUND_LENGTH;
  const canAnalyze =
    length >= MIN_BACKGROUND_LENGTH && length <= MAX_BACKGROUND_LENGTH && !analyzing;

  const leaveMode = () => {
    if (analyzing) onCancelAnalyze?.();
    setMode("select");
  };

  const selectResume = (file: File | null) => {
    if (!file) return;
    const error = resumeFileError(file);
    if (error) {
      setResumeFile(null);
      setResumeError(error);
      return;
    }
    setResumeError(null);
    setResumeFile(file);
  };

  return (
    <AnimatePresence mode="wait">
      {mode === "select" ? (
        <motion.div
          key="select"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <h2 className="text-base font-semibold text-foreground">How should we start?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick one. You can confirm or edit everything before it is saved.
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("ai-input")}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-[#B59146]/60 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100/70 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                <AlignLeft className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Describe your background</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                Paste a LinkedIn About section or a few sentences about your role. AI suggests your identity fields.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  AI-suggested
                </span>
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  ~30 sec
                </span>
              </div>
              <span className="mt-5 inline-flex w-max items-center rounded-lg bg-[#B59146] px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-[#9a7b3c]">
                Continue with AI <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMode("resume")}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-[#B59146]/60 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EEF6] text-[#0B1D3A] dark:bg-slate-800 dark:text-slate-100">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Upload your resume</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                Upload a PDF or Word resume. AI maps your job title, industry, department, domain, specialization, tools, and experience.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  PDF or DOCX
                </span>
                <span className="inline-flex rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  AI-mapped
                </span>
              </div>
              <span className="mt-5 inline-flex w-max items-center rounded-lg bg-[#B59146] px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-[#9a7b3c]">
                Upload resume <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </motion.div>
      ) : mode === "resume" ? (
        <motion.div
          key="resume"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Card className="w-full rounded-2xl border border-border bg-card shadow-sm">
            <CardHeader className="px-5 pb-2 pt-4 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-xl sm:text-2xl">Upload your resume</CardTitle>
                <Button
                  variant="ghost"
                  className="h-8 shrink-0 px-2 text-muted-foreground"
                  onClick={leaveMode}
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back
                </Button>
              </div>
              <CardDescription className="text-foreground/70">
                AI will map your job title, industry, department, domain, specialization, tools, and experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5 sm:px-6">
              <input
                ref={fileInputRef}
                type="file"
                accept={RESUME_ACCEPT}
                className="sr-only"
                disabled={analyzing}
                onChange={(event) => {
                  selectResume(event.target.files?.[0] ?? null);
                  event.target.value = "";
                }}
              />
              <button
                type="button"
                disabled={analyzing}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (analyzing) return;
                  selectResume(event.dataTransfer.files?.[0] ?? null);
                }}
                className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center transition-colors hover:border-primary/50 hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Upload className="mb-3 h-6 w-6 text-[#B59146]" />
                <span className="text-sm font-semibold text-foreground">
                  Choose a PDF or DOCX file
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  Or drop it here. Maximum 5 MB. The resume is read once and is not stored.
                </span>
              </button>

              {resumeFile ? (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-[#0B1D3A]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{resumeFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(resumeFile.size)}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={analyzing}
                    onClick={() => setResumeFile(null)}
                    aria-label="Remove resume"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}

              {resumeError ? (
                <p className="text-sm text-destructive">{resumeError}</p>
              ) : null}

              {analyzing ? <ResumeMappingQuotes /> : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={() => resumeFile && onAnalyzeResume(resumeFile)}
                  disabled={!resumeFile || analyzing}
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
                      Analyze resume
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="ai-input"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Card className="w-full rounded-2xl border border-border bg-card shadow-sm">
            <CardHeader className="px-5 pb-2 pt-4 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-xl sm:text-2xl">
                  Tell us about your professional background
                </CardTitle>
                <Button
                  variant="ghost"
                  className="h-8 shrink-0 px-2 text-muted-foreground"
                  onClick={leaveMode}
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back
                </Button>
              </div>
              <CardDescription className="text-foreground/70">
                Write or paste a LinkedIn About section, resume summary, or a short description of your current role.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="professional-background" className={wizardFieldLabelClass}>
                  Professional background
                </Label>
                <Textarea
                  id="professional-background"
                  value={backgroundText}
                  onChange={(e) => onBackgroundTextChange(e.target.value)}
                  disabled={analyzing}
                  rows={5}
                  placeholder="Describe your current role, industry, responsibilities, skills, specialization, and experience..."
                  className="min-h-[6.5rem] resize-y bg-background text-base shadow-sm sm:text-sm"
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
