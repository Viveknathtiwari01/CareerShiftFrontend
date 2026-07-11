import { motion } from "framer-motion";
import { WizardData } from "./types";
import { DAILY_ACTIVITIES } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

export function Step4WorkProfile({ data, updateData }: Props) {
  const toggleActivity = (activity: string) => {
    const current = data.dailyActivities;
    const newActivities = current.includes(activity)
      ? current.filter((a) => a !== activity)
      : [...current, activity];

    updateData({ dailyActivities: newActivities });
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
          <CardTitle className="text-2xl">Current Work Profile</CardTitle>
          <CardDescription>Which best describes your daily work?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAILY_ACTIVITIES.map((activity) => {
              const isSelected = data.dailyActivities.includes(activity);
              return (
                <div
                  key={activity}
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                  onClick={() => toggleActivity(activity)}
                >
                  <Checkbox
                    id={`activity-${activity}`}
                    checked={isSelected}
                    onCheckedChange={() => toggleActivity(activity)}
                  />
                  <label
                    htmlFor={`activity-${activity}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {activity}
                  </label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
