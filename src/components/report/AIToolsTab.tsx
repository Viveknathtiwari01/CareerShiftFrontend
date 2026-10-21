import { groupToolkitByTask, type CareerIntelligenceReport } from "@/api/report";
import { ToolkitToolCard } from "@/components/report/ToolkitToolCard";

type Props = { report: CareerIntelligenceReport };

export function AIToolsTab({ report }: Props) {
  const groups = groupToolkitByTask(report.ai_toolkit);

  if (!groups.length) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No personalized tools yet. Complete 3B analysis, then generate AI tools for your tasks.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <p className="type-body-sm text-muted-foreground">
        Tools are grouped by your tasks. Enterprise tools are organization platforms. External
        tools are ones you can usually start on your own. Verify access before you adopt one.
      </p>
      {groups.map((group) => (
        <section key={group.taskTitle} className="space-y-4">
          <h3 className="font-display text-2xl font-medium text-foreground">{group.taskTitle}</h3>
          <ToolClassBlock title="Enterprise AI Tools" tools={group.enterprise} />
          <ToolClassBlock title="External AI Tools" tools={group.external} />
        </section>
      ))}
    </div>
  );
}

function ToolClassBlock({
  title,
  tools,
}: {
  title: string;
  tools: CareerIntelligenceReport["ai_toolkit"];
}) {
  if (!tools.length) return null;
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h4>
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolkitToolCard
            key={`${title}-${tool.name}`}
            tool={tool}
            rank={tool.priority_rank ?? undefined}
          />
        ))}
      </div>
    </div>
  );
}
