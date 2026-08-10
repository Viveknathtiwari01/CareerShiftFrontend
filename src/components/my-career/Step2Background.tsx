import { useState } from "react";
import { motion } from "framer-motion";
import { WizardData } from "./types";
import { EXPERIENCE_LEVELS } from "@/lib/app-enums";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { wizardFieldLabelClass, wizardInputClass, wizardSelectTriggerClass, wizardStepCardClass } from "./wizard-styles";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step2Background({ data, updateData }: Props) {
  const [showOtherExp, setShowOtherExp] = useState(false);

  const handleExpChange = (val: string) => {
    if (val === "Other") {
      setShowOtherExp(true);
      updateData({ experience: "" });
    } else {
      setShowOtherExp(false);
      updateData({ experience: val });
    }
  };

  const isExpCustom = showOtherExp || (data.experience ? !EXPERIENCE_LEVELS.includes(data.experience) : false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={wizardStepCardClass}>
        <CardHeader className="px-4 pt-5 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">Professional Background</CardTitle>
          <CardDescription className="text-foreground/70">
            Tell us about your experience and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-4 pb-5 sm:space-y-6 sm:px-6 sm:pb-6">
          <div className="space-y-2">
            <Label htmlFor="experience" className={wizardFieldLabelClass}>
              Total Experience
            </Label>
            <Select
              value={isExpCustom ? "Other" : data.experience}
              onValueChange={handleExpChange}
            >
              <SelectTrigger id="experience" className={wizardSelectTriggerClass}>
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {exp}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {isExpCustom && (
              <Input
                placeholder="Please specify your experience"
                value={data.experience}
                onChange={(e) => updateData({ experience: e.target.value })}
                className={wizardInputClass}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary" className={wizardFieldLabelClass}>
              Salary
            </Label>
            <Input
              id="salary"
              placeholder="e.g. 4-5LPA"
              value={data.salary}
              onChange={(e) => updateData({ salary: e.target.value })}
              className={wizardInputClass}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
