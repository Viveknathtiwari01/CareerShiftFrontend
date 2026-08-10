import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { WizardData } from "@/components/my-career/types";
import { Step1CareerIdentity } from "@/components/my-career/Step1CareerIdentity";
import { Step2Background } from "@/components/my-career/Step2Background";
import { Step3Skills } from "@/components/my-career/Step3Skills";
import { Step5AIReadiness } from "@/components/my-career/Step5AIReadiness";
import { Step6Review } from "@/components/my-career/Step6Review";
import { ProfileView } from "@/components/my-career/ProfileView";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, createProfile, updateProfile } from "@/api/profile";

const TOTAL_STEPS = 4;

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

export default function MyCareerProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);
  const [viewMode, setViewMode] = useState<"view" | "wizard" | "edit">("wizard");
  const [editStep, setEditStep] = useState<number | null>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const createMutation = useMutation({
    mutationFn: createProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(["profile"], newProfile);
      toast.success("Profile successfully created!");
      setViewMode("view");
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

  useEffect(() => {
    if (profile) {
      setData(profile);
      if (viewMode === "wizard") {
        setViewMode("view");
      }
    }
  }, [profile, viewMode]);

  const updateData = (fields: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...fields }));
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
    }
  };

  const handleSubmit = () => {
    if (viewMode === "edit") {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20 text-muted-foreground animate-pulse">Loading profile...</div>;
  }

  const handleEdit = (step: number) => {
    setEditStep(step);
    setViewMode("edit");
  };

  if (viewMode === "view" && profile) {
    return (
      <div className="w-full">
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
      case 2: return <Step2Background key="step2" data={data} updateData={updateData} />;
      case 3: return <Step3Skills key="step3" data={data} updateData={updateData} />;
      case 4: return <Step5AIReadiness key="step4" data={data} updateData={updateData} />;
      case 5: return <Step6Review key="step5" data={data} goToStep={setCurrentStep} onSubmit={handleSubmit} />;
      default: return null;
    }
  };

  if (viewMode === "edit" && editStep) {
    return (
      <div className="w-full">
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

  const progressPercentage = ((currentStep - 1) / TOTAL_STEPS) * 100;

  return (
    <div className="flex w-full flex-col pb-24 sm:pb-0">
      {currentStep <= TOTAL_STEPS && (
        <div className="mb-6 space-y-4 sm:mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Build Your Career Identity
              </h1>
              <p className="mt-1 text-base text-foreground/75 sm:text-sm sm:text-muted-foreground">
                Let's map out your professional journey.
              </p>
            </div>
            <div className="inline-flex w-fit items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-soft">
              Step {currentStep} of {TOTAL_STEPS}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2.5 bg-border/80" />
        </div>
      )}

      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait">
          {renderStep(currentStep)}
        </AnimatePresence>
      </div>

      {currentStep <= TOTAL_STEPS && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 px-4 py-3 shadow-[0_-4px_16px_rgba(10,18,31,0.06)] backdrop-blur-sm sm:static sm:mt-8 sm:border-t sm:bg-transparent sm:px-0 sm:py-0 sm:pt-6 sm:shadow-none sm:backdrop-blur-none">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="h-11 min-w-[7rem] flex-1 border-border bg-card text-foreground shadow-soft sm:w-32 sm:flex-none"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button onClick={handleNext} className="h-11 min-w-[7rem] flex-1 sm:w-32 sm:flex-none">
              {currentStep === TOTAL_STEPS ? "Review" : "Next"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
