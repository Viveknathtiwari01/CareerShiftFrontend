import { motion } from "framer-motion";
import { WizardData } from "./types";
import { SKILL_CATEGORIES } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step3Skills({ data, updateData }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSkill = (
    category: "technicalSkills" | "businessSkills" | "softSkills",
    skill: string,
  ) => {
    const currentSkills = data[category];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];

    updateData({ [category]: newSkills });
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    // Mock AI generation based on job title
    setTimeout(() => {
      const generated = {
        technicalSkills: ["JavaScript", "React", "Node.js", "TypeScript"],
        businessSkills: ["Requirement Gathering", "Architecture"],
        softSkills: ["Problem Solving", "Team Collaboration"],
      };

      // If job title includes 'Data', give data skills
      if (data.jobTitle?.toLowerCase().includes("data")) {
        generated.technicalSkills = ["Python", "SQL", "Pandas", "AWS"];
        generated.businessSkills = ["Market Analysis", "Product Strategy"];
      }

      updateData(generated);
      setIsGenerating(false);
    }, 1500);
  };

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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.Technical.map((skill) => {
                const isSelected = data.technicalSkills.includes(skill);
                return (
                  <Badge
                    key={skill}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1.5 text-sm transition-all hover:scale-105 ${isSelected ? "bg-primary" : "hover:bg-muted"}`}
                    onClick={() => toggleSkill("technicalSkills", skill)}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.Business.map((skill) => {
                const isSelected = data.businessSkills.includes(skill);
                return (
                  <Badge
                    key={skill}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1.5 text-sm transition-all hover:scale-105 ${isSelected ? "bg-primary" : "hover:bg-muted"}`}
                    onClick={() => toggleSkill("businessSkills", skill)}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.Soft.map((skill) => {
                const isSelected = data.softSkills.includes(skill);
                return (
                  <Badge
                    key={skill}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1.5 text-sm transition-all hover:scale-105 ${isSelected ? "bg-primary" : "hover:bg-muted"}`}
                    onClick={() => toggleSkill("softSkills", skill)}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
