import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WizardData } from "@/components/my-career/types";
import { Step1CareerIdentity } from "@/components/my-career/Step1CareerIdentity";
import { Step2Background } from "@/components/my-career/Step2Background";
import { Step3Skills } from "@/components/my-career/Step3Skills";
import { Step4WorkProfile } from "@/components/my-career/Step4WorkProfile";
import { Step5AIReadiness } from "@/components/my-career/Step5AIReadiness";
import { Step6Review } from "@/components/my-career/Step6Review";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const TOTAL_STEPS = 5;

const initialData: WizardData = {
  jobTitle: "",
  industry: "",
  businessFunction: "",
  domain: "",
  specialization: "",
  experience: "",
  location: "",
  salary: "",
  preferredLocation: [],
  technicalSkills: [],
  businessSkills: [],
  softSkills: [],
  dailyActivities: [],
  aiFrequency: "",
  aiTools: [],
  aiComfortLevel: 5,
};

export default function MyCareerProfile() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);

  const updateData = (fields: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    // Basic validation for required fields in Step 1
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
    toast.success("Profile successfully created!");
    // In a real app, you would submit to API here.
    // For now, redirect to dashboard or just show success.
    setTimeout(() => {
      navigate('/dashboard'); // Mock redirect to dashboard
    }, 1500);
  };

  const progressPercentage = ((currentStep - 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      
      {/* Header & Progress */}
      {currentStep <= TOTAL_STEPS && (
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Build Your Career Identity</h1>
              <p className="text-muted-foreground mt-1">Let's map out your professional journey.</p>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      {/* Wizard Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Step1CareerIdentity key="step1" data={data} updateData={updateData} />}
          {currentStep === 2 && <Step2Background key="step2" data={data} updateData={updateData} />}
          {currentStep === 3 && <Step3Skills key="step3" data={data} updateData={updateData} />}
          {currentStep === 4 && <Step4WorkProfile key="step4" data={data} updateData={updateData} />}
          {currentStep === 5 && <Step5AIReadiness key="step5" data={data} updateData={updateData} />}
          {currentStep === 6 && <Step6Review key="step6" data={data} goToStep={setCurrentStep} onSubmit={handleSubmit} />}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {currentStep <= TOTAL_STEPS && (
        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="w-32"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            className="w-32"
          >
            {currentStep === TOTAL_STEPS ? "Review" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
