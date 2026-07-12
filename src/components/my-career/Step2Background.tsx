import { motion } from "framer-motion";
import { WizardData } from "./types";
import { EXPERIENCE_LEVELS, PREFERRED_LOCATIONS } from "@/lib/mock-data";
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

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step2Background({ data, updateData }: Props) {
  const toggleLocation = (loc: string) => {
    const current = data.preferredLocation || [];
    const newLocs = current.includes(loc) ? current.filter((l) => l !== loc) : [...current, loc];
    updateData({ preferredLocation: newLocs });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Professional Background</CardTitle>
          <CardDescription>Tell us about your experience and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="experience">Total Experience</Label>
            <Select
              value={data.experience}
              onValueChange={(val) => updateData({ experience: val })}
            >
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((exp) => (
                  <SelectItem key={exp} value={exp}>
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Current Location/Region</Label>
            <Input
              id="location"
              placeholder="e.g. UAE"
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              placeholder="e.g. 4-5LPA"
              value={data.salary}
              onChange={(e) => updateData({ salary: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label>Preferred Work Location</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {PREFERRED_LOCATIONS.map((loc) => {
                const isSelected = data.preferredLocation?.includes(loc);
                return (
                  <div
                    key={loc}
                    className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                    onClick={() => toggleLocation(loc)}
                  >
                    <Checkbox
                      id={`loc-${loc}`}
                      checked={isSelected}
                      onCheckedChange={() => toggleLocation(loc)}
                    />
                    <label
                      htmlFor={`loc-${loc}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      {loc}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
