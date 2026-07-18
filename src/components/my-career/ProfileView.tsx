import { WizardData } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";

interface ProfileViewProps {
  data: WizardData;
  onEdit: (step: number) => void;
}

export function ProfileView({ data, onEdit }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      {/* Card 1: Current Career Identity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            Current Career Identity
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(1)} className="rounded-full bg-brand text-foreground hover:bg-brand/80">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Current Job Title</div>
            <div className="font-medium">{data.jobTitle}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Company / Industry</div>
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
        </CardContent>
      </Card>

      {/* Card 2: Professional Background */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            Professional Background
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(2)} className="rounded-full bg-brand text-foreground hover:bg-brand/80">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Total Experience</div>
            <div className="font-medium">{data.experience} years</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Location</div>
            <div className="font-medium">{data.location}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Salary</div>
            <div className="font-medium">{data.salary || "Not provided"}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Preferred Work Location</div>
            <div className="font-medium">
              {data.preferredLocation?.length > 0 ? data.preferredLocation.join(", ") : "Not provided"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Skills Intelligence */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            Skills Intelligence
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(3)} className="rounded-full bg-brand text-foreground hover:bg-brand/80">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
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
            <div className="text-sm text-muted-foreground mb-2">AI Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.aiSkills?.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Current Work Profile */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            Current Work Profile
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(4)} className="rounded-full bg-brand text-foreground hover:bg-brand/80">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.dailyActivities?.map((s) => (
              <Badge key={s} variant="outline" className="bg-primary/5">{s}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Card 5: AI Readiness */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
            AI Readiness
          </div>
          <Button variant="outline" size="sm" onClick={() => onEdit(5)} className="rounded-full bg-brand text-foreground hover:bg-brand/80">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
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
