import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

const SECTIONS = [
  { key: "start" as const, title: "Start", color: "border-teal/30 bg-teal/5" },
  { key: "stop" as const, title: "Stop", color: "border-destructive/20 bg-destructive/5" },
  { key: "automate" as const, title: "Automate", color: "border-brand/20 bg-brand/5" },
  { key: "learn" as const, title: "Learn", color: "border-primary/20 bg-primary/5" },
];

export function ActionPlanTab({ report }: Props) {
  const plan = report.action_plan;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {SECTIONS.map(({ key, title, color }) => {
        const items = plan[key];
        if (!items?.length) return null;
        return (
          <div key={key} className={`rounded-2xl border p-6 ${color}`}>
            <h3 className="font-display text-lg font-bold mb-4">{title}</h3>
            <ul className="space-y-2 text-sm list-disc pl-5 text-muted-foreground">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
