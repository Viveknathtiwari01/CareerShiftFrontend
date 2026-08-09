import type { CareerIntelligenceReport } from "@/api/report";
import { ToolkitToolCard } from "@/components/report/ToolkitToolCard";

type Props = { report: CareerIntelligenceReport };

export function AIToolsTab({ report }: Props) {
  const tools = report.ai_toolkit;

  if (!tools.length) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No personalized tools yet — complete 3B analysis to populate recommendations.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="type-body-sm text-muted-foreground">
        Ranked by priority for your role — adopt Critical and High tools first for the fastest career impact.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, idx) => (
          <ToolkitToolCard key={tool.name} tool={tool} rank={tool.priority_rank ?? idx + 1} />
        ))}
      </div>
    </div>
  );
}
