import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WizardData } from "@/components/my-career/types";
import { Step0ProfessionalBackground } from "@/components/my-career/Step0ProfessionalBackground";
import { AIAssistedProfileReview } from "@/components/my-career/AIAssistedProfileReview";
import { Step1CareerIdentity } from "@/components/my-career/Step1CareerIdentity";
import { Step2Background } from "@/components/my-career/Step2Background";
import { Step3Skills } from "@/components/my-career/Step3Skills";
import { Step5AIFitness } from "@/components/my-career/Step5AIFitness";
import { Step6Review } from "@/components/my-career/Step6Review";
import { ProfileView } from "@/components/my-career/ProfileView";
import {
  applyResumeDetails,
  buildReviewDraftFromSuggestions,
  emptyReviewDraft,
  isReviewDraftComplete,
  mapReviewToWizardData,
  type ReviewDraft,
  type SuggestIdentityResponse,
} from "@/components/my-career/identity-suggest";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  getProfile,
  createProfile,
  updateProfile,
  suggestCareerIdentity,
  suggestCareerIdentityFromResume,
} from "@/api/profile";

const TOTAL_STEPS = 4;

type PreIdentityPhase = "background" | "review" | null;
type IdentityEntryMode = "select" | "ai-input" | "resume";

const IDENTITY_SETUP_STEPS = [
  { title: "Choose a method", hint: "Background or resume" },
  { title: "Add your details", hint: "AI reads what you provide" },
  { title: "Review & confirm", hint: "Check your identity" },
] as const;

function IdentitySetupStepper({ activeIndex }: { activeIndex: number }) {
  const filled = activeIndex <= 0 ? "0%" : activeIndex >= 2 ? "66.66%" : "33.33%";

  return (
    <ol className="relative grid grid-cols-3">
      <span className="absolute left-[16.67%] right-[16.67%] top-4 h-0.5 -translate-y-1/2 rounded-full bg-slate-200" />
      <span
        className="absolute left-[16.67%] top-4 h-0.5 -translate-y-1/2 rounded-full bg-[#F2C94C] transition-[width] duration-300"
        style={{ width: filled }}
      />
      {IDENTITY_SETUP_STEPS.map((step, index) => {
        const state = index < activeIndex ? "done" : index === activeIndex ? "current" : "upcoming";
        return (
          <li key={step.title} className="relative flex min-w-0 flex-col items-center px-1 text-center">
            <span
              className={
                state === "current"
                  ? "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F2C94C] bg-[#0B1D3A] text-xs font-bold text-[#F2C94C] ring-4 ring-card"
                  : state === "done"
                    ? "relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F2C94C] text-[#0B1D3A] ring-4 ring-card"
                    : "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-400 ring-4 ring-card"
              }
            >
              {state === "done" ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
            </span>
            <p
              className={
                state === "current"
                  ? "mt-2.5 text-sm font-semibold leading-tight text-[#0B1D3A]"
                  : state === "done"
                    ? "mt-2.5 text-sm font-medium leading-tight text-[#0B1D3A]"
                    : "mt-2.5 text-sm font-medium leading-tight text-slate-400"
              }
            >
              {step.title}
            </p>
            <p
              className={
                state === "upcoming"
                  ? "mt-0.5 hidden text-xs text-slate-400 sm:block"
                  : "mt-0.5 hidden text-xs text-slate-500 sm:block"
              }
            >
              {step.hint}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

const initialData: WizardData = {
  jobTitle: "",
  industry: "",
  businessFunction: "",
  domain: "",
  specialization: "",
  experience: "",
  salary: "",
  technicalSkills: [],
  professionalSkills: [],
  softSkills: [],
  behaviouralSkills: [],
  digitalSkills: [],
  aiFrequency: "",
  aiTools: [],
  suggestedAiTools: [],
  aiComfortLevel: 5,
};

function clearIdentityFields(current: WizardData): WizardData {
  return {
    ...current,
    jobTitle: "",
    industry: "",
    businessFunction: "",
    domain: "",
    specialization: "",
    sector_id: undefined,
    department_id: undefined,
    functional_domain_id: undefined,
    specialization_id: undefined,
    job_title_id: undefined,
  };
}

export default function MyCareerProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);
  const [viewMode, setViewMode] = useState<"view" | "wizard" | "edit">("wizard");
  const [editStep, setEditStep] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // AI-assisted entry (first-time / no profile only)
  const [preIdentity, setPreIdentity] = useState<PreIdentityPhase>("background");
  const [entryMode, setEntryMode] = useState<IdentityEntryMode>("select");
  const [backgroundText, setBackgroundText] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<SuggestIdentityResponse | null>(null);
  const [reviewDraft, setReviewDraft] = useState<ReviewDraft>(emptyReviewDraft);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestionSource, setSuggestionSource] = useState<"background" | "resume">("background");
  const [resumePrefill, setResumePrefill] = useState(false);
  const analyzeRequestIdRef = useRef(0);
  const analyzeAbortRef = useRef<AbortController | null>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const createMutation = useMutation({
    mutationFn: createProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(["profile"], newProfile);
      toast.success("Profile successfully created!");
      setShowSuccessModal(true);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create profile");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["profile"], updatedProfile);
      toast.success("Profile successfully updated!");
      setViewMode("view");
      setEditStep(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const isProfileEmpty = !profile || (!profile.jobTitle && !profile.industry);

  useEffect(() => {
    if (profile) {
      setData(profile);
      if (viewMode === "wizard" && !isProfileEmpty) {
        setViewMode("view");
      }
    }
  }, [profile, viewMode, isProfileEmpty]);

  useEffect(() => {
    return () => {
      analyzeAbortRef.current?.abort();
    };
  }, []);

  const abortAnalyze = () => {
    analyzeAbortRef.current?.abort();
    analyzeAbortRef.current = null;
    analyzeRequestIdRef.current += 1;
    setAnalyzing(false);
  };

  const updateData = (fields: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleEnterManually = () => {
    abortAnalyze();
    setAiSuggestions(null);
    setReviewDraft(emptyReviewDraft());
    setBackgroundText("");
    setSuggestionSource("background");
    setResumePrefill(false);
    setData((prev) => clearIdentityFields(prev));
    setPreIdentity(null);
    setCurrentStep(1);
  };

  const handleStartOver = () => {
    abortAnalyze();
    setAiSuggestions(null);
    setReviewDraft(emptyReviewDraft());
    setSuggestionSource("background");
    setResumePrefill(false);
    setEntryMode("select");
    setPreIdentity("background");
  };

  const handleAnalyze = async () => {
    if (analyzing) return;

    const requestId = analyzeRequestIdRef.current + 1;
    analyzeRequestIdRef.current = requestId;
    analyzeAbortRef.current?.abort();
    const controller = new AbortController();
    analyzeAbortRef.current = controller;

    setAnalyzing(true);
    setSuggestionSource("background");
    try {
      const suggestions = await suggestCareerIdentity(backgroundText, {
        signal: controller.signal,
      });
      if (analyzeRequestIdRef.current !== requestId) return;
      setAiSuggestions(suggestions);
      setReviewDraft(buildReviewDraftFromSuggestions(suggestions));
      setPreIdentity("review");
    } catch (err: any) {
      if (err?.name === "AbortError" || controller.signal.aborted) return;
      if (analyzeRequestIdRef.current !== requestId) return;
      toast.error(err?.message || "AI analysis failed. You can try again or enter manually.");
    } finally {
      if (analyzeRequestIdRef.current === requestId) {
        setAnalyzing(false);
        analyzeAbortRef.current = null;
      }
    }
  };

  const handleAnalyzeResume = async (file: File) => {
    if (analyzing) return;

    const requestId = analyzeRequestIdRef.current + 1;
    analyzeRequestIdRef.current = requestId;
    analyzeAbortRef.current?.abort();
    const controller = new AbortController();
    analyzeAbortRef.current = controller;

    setAnalyzing(true);
    setSuggestionSource("resume");
    try {
      const suggestions = await suggestCareerIdentityFromResume(file, {
        signal: controller.signal,
      });
      if (analyzeRequestIdRef.current !== requestId) return;
      setAiSuggestions(suggestions);
      setReviewDraft(buildReviewDraftFromSuggestions(suggestions));
      setPreIdentity("review");
    } catch (err: any) {
      if (err?.name === "AbortError" || controller.signal.aborted) return;
      if (analyzeRequestIdRef.current !== requestId) return;
      toast.error(err?.message || "We couldn't read that resume. You can try again or describe your background.");
    } finally {
      if (analyzeRequestIdRef.current === requestId) {
        setAnalyzing(false);
        analyzeAbortRef.current = null;
      }
    }
  };

  const handleConfirmIdentity = () => {
    if (!isReviewDraftComplete(reviewDraft)) {
      toast.error("Please fill in all required fields to proceed.");
      return;
    }
    const fromResume = suggestionSource === "resume";
    setData((prev) => {
      const withIdentity = mapReviewToWizardData(reviewDraft, prev);
      return fromResume ? applyResumeDetails(withIdentity, aiSuggestions?.resume_details) : withIdentity;
    });
    setResumePrefill(fromResume);
    setAiSuggestions(null);
    setReviewDraft(emptyReviewDraft());
    setPreIdentity(null);
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!data.jobTitle || !data.industry || !data.businessFunction || !data.domain || !data.specialization) {
        toast.error("Please fill in all required fields to proceed.");
        return;
      }
    }

    if (currentStep <= TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentStep === 1 && isProfileEmpty) {
      setPreIdentity("background");
    }
  };

  const handleSubmit = () => {
    if (viewMode === "edit") {
      let payload: Partial<WizardData> = {};
      if (editStep === 2) {
        payload = { experience: data.experience, salary: data.salary };
      } else if (editStep === 3) {
        payload = {
          technicalSkills: data.technicalSkills,
          professionalSkills: data.professionalSkills,
          softSkills: data.softSkills,
          behaviouralSkills: data.behaviouralSkills,
          digitalSkills: data.digitalSkills,
        };
      } else if (editStep === 4) {
        payload = {
          aiFrequency: data.aiFrequency,
          aiTools: data.aiTools,
          aiComfortLevel: data.aiComfortLevel,
        };
      }
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(data);
    }
  };

  const successModal = (
    <AlertDialog open={showSuccessModal} onOpenChange={(open) => {
      if (!open) {
        setShowSuccessModal(false);
        setViewMode("view");
      }
    }}>
      <AlertDialogContent className="max-w-md p-6">
        <AlertDialogHeader className="text-center sm:text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <span className="text-3xl">🎉</span>
          </div>
          <AlertDialogTitle className="text-2xl font-bold tracking-tight">Profile Completed!</AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground leading-relaxed">
            Your career identity is now mapped. To get the most out of CareerShift, take your career assessment next. It will analyze your profile and provide actionable insights.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col gap-3 mt-8">
          <Button 
            size="lg" 
            className="w-full text-base h-12" 
            onClick={() => navigate("/assessment", { state: { openWizard: true } })}
          >
            Start Career Assessment
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground hover:bg-muted/50" 
            onClick={() => {
              setShowSuccessModal(false);
              setViewMode("view");
            }}
          >
            Maybe Later
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (isLoading) {
    return (
      <>
        {successModal}
        <div className="flex justify-center py-20 text-muted-foreground animate-pulse">Loading profile...</div>
      </>
    );
  }

  const handleEdit = (step: number) => {
    setEditStep(step);
    setViewMode("edit");
  };

  if (viewMode === "view" && profile) {
    return (
      <div className="w-full">
        {successModal}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Professional Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your career identity and skills.</p>
          </div>
          <Button onClick={() => navigate("/assessment", { state: { openWizard: true } })} className="shrink-0">
            Start Assessment
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <ProfileView data={profile} onEdit={handleEdit} />
      </div>
    );
  }

  const renderStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <Step1CareerIdentity key="step1" data={data} updateData={updateData} />;
      case 2: return <Step2Background key="step2" data={data} updateData={updateData} prefilledFromResume={resumePrefill} />;
      case 3: return <Step3Skills key="step3" data={data} updateData={updateData} prefilledFromResume={resumePrefill} />;
      case 4: return <Step5AIFitness key="step4" data={data} updateData={updateData} prefilledFromResume={resumePrefill} />;
      case 5: return (
        <Step6Review
          key="step5"
          data={data}
          goToStep={setCurrentStep}
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      );
      default: return null;
    }
  };

  if (viewMode === "edit" && editStep) {
    return (
      <div className="w-full">
        {successModal}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => { setViewMode("view"); setData(profile!); }} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Cancel Edit
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Section</h1>
        </div>
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {renderStep(editStep)}
          </AnimatePresence>
        </div>
        <div className="mt-8 pt-6 border-t flex justify-end items-center gap-4">
          <Button variant="outline" onClick={() => { setViewMode("view"); setData(profile!); }}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    );
  }

  // First-time onboarding: AI-assisted entry (isProfileEmpty && wizard)
  const showPreIdentity = isProfileEmpty && viewMode === "wizard" && preIdentity !== null;

  if (showPreIdentity) {
    return (
      <div className="flex w-full flex-col pb-2">
        {successModal}
        <div className="mx-auto w-full max-w-5xl space-y-4 px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#B59146]">
              Career Identity Setup
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Build Your Career Identity
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Describe your background or upload a resume. AI maps your industry, department, domain, specialization, and job title for you to confirm.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card px-3 py-4 shadow-sm sm:px-6">
            <IdentitySetupStepper
              activeIndex={preIdentity === "review" ? 2 : entryMode === "select" ? 0 : 1}
            />
          </div>

          <div className="w-full min-w-0">
            <AnimatePresence mode="wait">
              {preIdentity === "background" ? (
                <Step0ProfessionalBackground
                  key="step0"
                  backgroundText={backgroundText}
                  onBackgroundTextChange={setBackgroundText}
                  analyzing={analyzing}
                  onAnalyze={handleAnalyze}
                  onAnalyzeResume={handleAnalyzeResume}
                  onEnterManually={handleEnterManually}
                  onCancelAnalyze={abortAnalyze}
                  onEntryModeChange={setEntryMode}
                />
              ) : aiSuggestions ? (
                <AIAssistedProfileReview
                  key="ai-review"
                  suggestions={aiSuggestions}
                  reviewDraft={reviewDraft}
                  onReviewDraftChange={setReviewDraft}
                  onConfirm={handleConfirmIdentity}
                  onStartOver={handleStartOver}
                  onEnterManually={handleEnterManually}
                  source={suggestionSource}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentStep - 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-8 sm:px-6">
      {successModal}
      {currentStep <= TOTAL_STEPS && (
        <div className="mb-6 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#0B1D3A]">
                Build your career identity
              </h1>
              <p className="mt-1 text-sm text-slate-500">Review the details mapped for your profile.</p>
            </div>
            <p className="shrink-0 text-sm font-medium text-slate-500">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>
          <Progress value={progressPercentage} className="h-1.5 bg-slate-200" />
        </div>
      )}

      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait">
          {renderStep(currentStep)}
        </AnimatePresence>
      </div>

      {currentStep <= TOTAL_STEPS && (
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 && !isProfileEmpty}
            className="h-11 min-w-[7.5rem] bg-white"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="h-11 min-w-[7.5rem]">
            {currentStep === TOTAL_STEPS ? "Review" : "Next"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
