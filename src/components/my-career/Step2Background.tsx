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
import { Combobox } from "@/components/ui/combobox";
import { wizardFieldLabelClass, wizardInputClass, wizardSelectTriggerClass, wizardStepCardClass } from "./wizard-styles";

const CURRENCIES = [
  { value: "INR", label: "INR" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "JPY", label: "JPY" },
  { value: "CNY", label: "CNY" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
  { value: "CHF", label: "CHF" },
  { value: "HKD", label: "HKD" },
  { value: "SGD", label: "SGD" },
  { value: "NZD", label: "NZD" },
  { value: "KRW", label: "KRW" },
  { value: "AED", label: "AED" },
  { value: "SAR", label: "SAR" },
  { value: "QAR", label: "QAR" },
  { value: "KWD", label: "KWD" },
  { value: "BHD", label: "BHD" },
  { value: "OMR", label: "OMR" },
  { value: "THB", label: "THB" },
  { value: "MYR", label: "MYR" },
  { value: "IDR", label: "IDR" },
  { value: "PHP", label: "PHP" },
  { value: "VND", label: "VND" },
  { value: "PKR", label: "PKR" },
  { value: "BDT", label: "BDT" },
  { value: "LKR", label: "LKR" },
  { value: "NPR", label: "NPR" },
  { value: "BRL", label: "BRL" },
  { value: "MXN", label: "MXN" },
  { value: "ARS", label: "ARS" }, 
  { value: "CLP", label: "CLP" },
  { value: "COP", label: "COP" },
  { value: "PEN", label: "PEN" },
  { value: "ZAR", label: "ZAR" },
  { value: "NGN", label: "NGN" },
  { value: "EGP", label: "EGP" },
  { value: "KES", label: "KES" },
  { value: "MAD", label: "MAD" },
  { value: "TRY", label: "TRY" },
  { value: "RUB", label: "RUB" },
  { value: "UAH", label: "UAH" },
  { value: "PLN", label: "PLN" },
  { value: "CZK", label: "CZK" },
  { value: "SEK", label: "SEK" },
  { value: "NOK", label: "NOK" },
  { value: "DKK", label: "DKK" },
  { value: "HUF", label: "HUF" },
  { value: "ILS", label: "ILS" },
];

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
            <div className="flex gap-3">
              <div className="w-1/4">
                <Combobox
                  options={CURRENCIES}
                  value={data.salary_currency}
                  onChange={(val) => updateData({ salary_currency: val })}
                  placeholder="Currency"
                  searchPlaceholder="Search currency..."
                  emptyText="Not found"
                />
              </div>
              <div className="w-3/4">
                <Input
                  id="salary"
                  placeholder="e.g. 100000"
                  value={data.salary}
                  onChange={(e) => updateData({ salary: e.target.value })}
                  className={wizardInputClass}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
