import { motion } from "framer-motion";
import { WizardData } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface Props {
  data: WizardData;
  goToStep: (step: number) => void;
  onSubmit: () => void;
}

export function Step6Review({ data, goToStep, onSubmit }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl text-primary">Review Your Profile</CardTitle>
          <CardDescription>
            Everything looks great! Let's review your information before completing onboarding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Career Identity */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 space-y-4 relative group">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-semibold text-lg text-primary">Career Identity</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => goToStep(1)}
                  title="Edit"
                  className="opacity-70 hover:opacity-100 group-hover:bg-primary/10"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Job Title
                  </span>
                  <span className="font-medium text-base">{data.jobTitle || "Not specified"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Industry
                  </span>
                  <span className="font-medium text-base">{data.industry || "Not specified"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Function
                  </span>
                  <span className="font-medium text-base">
                    {data.businessFunction || "Not specified"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Domain
                  </span>
                  <span className="font-medium text-base">
                    {data.domain || "Not specified"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Specialization
                  </span>
                  <span className="font-medium text-base">
                    {data.specialization || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 space-y-4 relative group">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-semibold text-lg text-primary">Background</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => goToStep(2)}
                  title="Edit"
                  className="opacity-70 hover:opacity-100 group-hover:bg-primary/10"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Experience
                  </span>
                  <span className="font-medium text-base">
                    {data.experience || "Not specified"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Salary
                  </span>
                  <span className="font-medium text-base">{data.salary || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Intelligence */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 space-y-4 relative group">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-semibold text-lg text-primary">Skills Intelligence</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => goToStep(3)}
                title="Edit"
                className="opacity-70 hover:opacity-100 group-hover:bg-primary/10"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4 pt-1">
              {data.technicalSkills && data.technicalSkills.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1.5">Technical Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {data.technicalSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.professionalSkills && data.professionalSkills.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1.5">Professional Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {data.professionalSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.softSkills && data.softSkills.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1.5">Soft Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {data.softSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.behaviouralSkills && data.behaviouralSkills.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1.5">Behavioural Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {data.behaviouralSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.digitalSkills && data.digitalSkills.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1.5">Digital Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {data.digitalSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {!data.technicalSkills?.length && !data.professionalSkills?.length && !data.softSkills?.length && !data.behaviouralSkills?.length && !data.digitalSkills?.length && (
                <span className="text-sm text-muted-foreground italic">No skills generated</span>
              )}
            </div>
          </div>

          {/* AI Fitness */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 space-y-4 relative group">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-semibold text-lg text-primary">Technology & AI</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => goToStep(4)}
                title="Edit"
                className="opacity-70 hover:opacity-100 group-hover:bg-primary/10"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-1">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Frequency
                </span>
                <span className="font-medium text-base">{data.aiFrequency || "Not specified"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Comfort Level
                </span>
                <span className="font-medium text-base">{data.aiComfortLevel}/10</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {data.aiTools.length > 0 ? (
                data.aiTools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="outline"
                    className="px-3 py-1 text-sm border-primary/30 bg-background"
                  >
                    {tool}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground italic">No tools selected</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 pt-6 pb-8 border-t bg-muted/20">
          <Button variant="outline" size="lg" onClick={() => goToStep(1)}>
            Edit Information
          </Button>
          <Button size="lg" onClick={onSubmit} className="px-8 shadow-md">
            Complete Onboarding
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
