import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTaskAnalysis, mapAnalysisToDisplay } from "@/api/analysis";
import type { CareerIntelligenceReport } from "@/api/report";
import { CollapsibleTaskCard } from "@/components/assessment/ThreeBAnalysisParts";

type Props = { report: CareerIntelligenceReport };

export function ThreeBAnalysisTab({ report }: Props) {
  const assessmentId = report.assessment_id;

  const { data, isLoading } = useQuery({
    queryKey: ["assessment-analysis", assessmentId],
    queryFn: () => getTaskAnalysis(assessmentId),
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const tasks = (data?.analyses ?? [])
    .map(mapAnalysisToDisplay)
    .sort((a, b) => b.weeklyHours - a.weeklyHours);

  if (tasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No 3B analysis available. Complete your assessment and run analysis first.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, idx) => (
        <CollapsibleTaskCard
          key={task.id}
          task={task}
          category={task.category3B}
          defaultOpen={idx === 0}
          readOnly
        />
      ))}
    </div>
  );
}
