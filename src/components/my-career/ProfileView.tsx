import { WizardData } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProfileViewProps {
  data: WizardData;
  onEdit: (step: number) => void;
}

export function ProfileView({ data, onEdit }: ProfileViewProps) {
  const editCount = data.editCount || 0;
  
  return (
    <div className="space-y-6">
      {/* Card 1: Current Career Identity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
              Current Career Identity
            </div>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[280px] p-3 text-sm font-medium bg-white text-black border shadow-lg flex gap-2">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">!</div>
                  <p>You cannot edit your Current Career Identity once it has been created.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Industry</div>
            <div className="font-medium">{data.industry}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Department / Business Function</div>
            <div className="font-medium">{data.businessFunction}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Functional Domain</div>
            <div className="font-medium">{data.domain}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Specialization</div>
            <div className="font-medium">{data.specialization}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Job Title</div>
            <div className="font-medium">{data.jobTitle}</div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Professional Background */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            Professional Background
          </div>
          <div className="flex items-center gap-3">
            {editCount >= 3 ? (
              <span className="text-xs text-destructive font-medium flex items-center gap-1">
                Edit limit reached
              </span>
            ) : (
              <span className="text-xs text-muted-foreground font-medium">
                {3 - editCount} edit{3 - editCount !== 1 ? 's' : ''} left
              </span>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(2)} 
              disabled={editCount >= 3}
              className="rounded-full bg-brand text-foreground hover:bg-brand/80 disabled:opacity-50"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Total Experience</div>
            <div className="font-medium">{data.experience} years</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Salary</div>
            <div className="font-medium">{data.salary || "Not provided"}</div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Skills Intelligence */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            Skills Intelligence
          </div>
          <div className="flex items-center gap-3">
            {editCount >= 3 ? (
              <span className="text-xs text-destructive font-medium flex items-center gap-1">
                Edit limit reached
              </span>
            ) : (
              <span className="text-xs text-muted-foreground font-medium">
                {3 - editCount} edit{3 - editCount !== 1 ? 's' : ''} left
              </span>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(3)} 
              disabled={editCount >= 3}
              className="rounded-full bg-brand text-foreground hover:bg-brand/80 disabled:opacity-50"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Technical Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.technicalSkills?.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Professional Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.professionalSkills?.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Soft Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.softSkills?.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Behavioural Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.behaviouralSkills?.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Digital Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.digitalSkills?.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: AI Fitness */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            AI Fitness
          </div>
          <div className="flex items-center gap-3">
            {editCount >= 3 ? (
              <span className="text-xs text-destructive font-medium flex items-center gap-1">
                Edit limit reached
              </span>
            ) : (
              <span className="text-xs text-muted-foreground font-medium">
                {3 - editCount} edit{3 - editCount !== 1 ? 's' : ''} left
              </span>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(4)} 
              disabled={editCount >= 3}
              className="rounded-full bg-brand text-foreground hover:bg-brand/80 disabled:opacity-50"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">AI Usage Frequency</div>
              <div className="font-medium">{data.aiFrequency}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">AI Comfort Level</div>
              <div className="font-medium">{data.aiComfortLevel} / 10</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">AI Tools Used</div>
            <div className="flex flex-wrap gap-2">
              {data.aiTools?.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
