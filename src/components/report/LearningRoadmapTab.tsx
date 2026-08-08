import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function LearningRoadmapTab({ report }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {report.learning_roadmap.map((phase) => (
        <div key={phase.horizon} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand">{phase.horizon}</div>
          <h3 className="font-display text-lg font-bold mt-2 mb-4">{phase.title}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            {phase.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
