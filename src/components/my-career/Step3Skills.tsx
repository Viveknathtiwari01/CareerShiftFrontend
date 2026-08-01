import { motion } from "framer-motion";
import { WizardData } from "./types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2, Plus, X, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { generateSkills } from "@/api/profile";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

type SkillCategory = "technicalSkills" | "professionalSkills" | "softSkills" | "behaviouralSkills" | "digitalSkills";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  technicalSkills: "Technical Skills",
  professionalSkills: "Professional Skills",
  softSkills: "Soft Skills",
  behaviouralSkills: "Behavioural Skills",
  digitalSkills: "Digital Skills",
};

function CustomSkillInput({
  category,
  list,
  data,
  updateData,
  showOther,
  setShowOther,
}: {
  category: SkillCategory;
  list: string[];
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
  showOther: boolean;
  setShowOther: (val: boolean) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const customSkills = data[category].filter((s) => !list.includes(s));
  const hasCustom = customSkills.length > 0;
  const isOtherChecked = showOther || hasCustom;

  const toggleOther = () => {
    const isNowChecked = !isOtherChecked;
    setShowOther(isNowChecked);
    if (!isNowChecked) {
      const standardSkills = data[category].filter((s) => list.includes(s));
      updateData({ [category]: standardSkills });
    }
  };

  const handleAddCustom = () => {
    if (inputValue.trim()) {
      const newSkill = inputValue.trim();
      if (!data[category].includes(newSkill)) {
        updateData({ [category]: [...data[category], newSkill] });
      }
      setInputValue("");
    }
  };

  const handleRemoveCustom = (skillToRemove: string) => {
    updateData({ [category]: data[category].filter((s) => s !== skillToRemove) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustom();
    }
  };

  return (
    <>
      <div
        className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-colors ${isOtherChecked ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
        onClick={toggleOther}
      >
        <Checkbox
          id={`other-${category}`}
          checked={isOtherChecked}
          onCheckedChange={toggleOther}
        />
        <label
          htmlFor={`other-${category}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
        >
          Other
        </label>
      </div>
      {isOtherChecked && (
        <div className="col-span-1 sm:col-span-2 md:col-span-3 space-y-3 mt-2">
          {customSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2 py-1 text-sm">
                  {skill}
                  <button
                    onClick={() => handleRemoveCustom(skill)}
                    className="ml-2 hover:bg-muted rounded-full p-0.5 inline-flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Type a skill and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddCustom}
              disabled={!inputValue.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function Step3Skills({ data, updateData }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [generatedSkills, setGeneratedSkills] = useState<{
    technicalSkills: string[];
    professionalSkills: string[];
    softSkills: string[];
    behaviouralSkills: string[];
    digitalSkills: string[];
  } | null>(() => {
    const hasAny = data.technicalSkills.length > 0 || 
                   data.professionalSkills.length > 0 || 
                   data.softSkills.length > 0 || 
                   data.behaviouralSkills.length > 0 || 
                   data.digitalSkills.length > 0;
    if (hasAny) {
      return {
        technicalSkills: data.technicalSkills,
        professionalSkills: data.professionalSkills,
        softSkills: data.softSkills,
        behaviouralSkills: data.behaviouralSkills,
        digitalSkills: data.digitalSkills,
      };
    }
    return null;
  });

  const [showOther, setShowOther] = useState({
    technicalSkills: false,
    professionalSkills: false,
    softSkills: false,
    behaviouralSkills: false,
    digitalSkills: false,
  });

  const toggleSkill = (category: SkillCategory, skill: string) => {
    const currentSkills = data[category];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];

    updateData({ [category]: newSkills });
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setErrorMsg("");
    try {
      const result = await generateSkills(data);
      if (
        result.technicalSkills?.length || 
        result.professionalSkills?.length ||
        result.softSkills?.length ||
        result.behaviouralSkills?.length ||
        result.digitalSkills?.length
      ) {
        setGeneratedSkills({
          technicalSkills: result.technicalSkills || [],
          professionalSkills: result.professionalSkills || [],
          softSkills: result.softSkills || [],
          behaviouralSkills: result.behaviouralSkills || [],
          digitalSkills: result.digitalSkills || [],
        });
        
        // Save the dynamically generated AI tools for Step 5
        if (result.aiTools?.length) {
          updateData({ suggestedAiTools: result.aiTools });
        }
      } else {
        throw new Error("Unable to fetch skills");
      }
    } catch (error) {
      setErrorMsg("Unable to fetch skills, you can add manually");
      if (!generatedSkills) {
        setGeneratedSkills({
          technicalSkills: [],
          professionalSkills: [],
          softSkills: [],
          behaviouralSkills: [],
          digitalSkills: [],
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const categories: SkillCategory[] = [
    "technicalSkills",
    "professionalSkills",
    "softSkills",
    "behaviouralSkills",
    "digitalSkills",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl">Skills Intelligence</CardTitle>
            <CardDescription>
              Select all the skills you possess across different categories.
            </CardDescription>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 bg-primary/10 text-primary hover:bg-primary/20"
            onClick={handleGenerateAI}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
            Generate with AI
          </Button>
        </CardHeader>
        <CardContent className="space-y-8">
          {errorMsg && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          {!generatedSkills && !isGenerating && !errorMsg ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
              <Wand2 className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Generate Your Skills</h3>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto text-sm">
                Click "Generate with AI" above to automatically extract your skills based on your career identity and background.
              </p>
            </div>
          ) : isGenerating && !generatedSkills ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
              <Loader2 className="h-8 w-8 mx-auto text-primary animate-spin mb-4" />
              <h3 className="text-lg font-medium">Analyzing Profile...</h3>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto text-sm">
                Our CareerShift Engine is identifying the best skills for your profile.
              </p>
            </div>
          ) : generatedSkills ? (
            categories.map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold">{CATEGORY_LABELS[category]}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {generatedSkills[category].map((skill) => {
                    const isSelected = data[category].includes(skill);
                    return (
                      <div
                        key={skill}
                        className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                        onClick={() => toggleSkill(category, skill)}
                      >
                        <Checkbox
                          id={`${category}-${skill}`}
                          checked={isSelected}
                          onCheckedChange={() => toggleSkill(category, skill)}
                        />
                        <label
                          htmlFor={`${category}-${skill}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                          {skill}
                        </label>
                      </div>
                    );
                  })}
                  <CustomSkillInput
                    category={category}
                    list={generatedSkills[category]}
                    data={data}
                    updateData={updateData}
                    showOther={showOther[category]}
                    setShowOther={(val) => setShowOther((prev) => ({ ...prev, [category]: val }))}
                  />
                </div>
              </div>
            ))
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}
