import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function DailyWorkTab({ report }: Props) {
  const tasks = report.daily_work.tasks as Array<{
    title?: string;
    hours_per_week?: number;
    category?: string;
    complexity?: string;
    ai_assistance?: string;
  }>;
  const total = report.daily_work.total_hours_per_week;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-background p-6">
        <h3 className="font-display text-xl font-bold mb-2">Weekly Work Pattern</h3>
        <p className="text-muted-foreground text-sm mb-6">
          {tasks.length} tasks · ~{total} hours/week analyzed
        </p>
        <div className="space-y-3">
          {tasks.map((task, idx) => (
            <div
              key={`${task.title}-${idx}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4"
            >
              <div>
                <div className="font-semibold">{task.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {task.category ?? "General"} · {task.complexity ?? "medium"} complexity
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold">{task.hours_per_week ?? 0}h/wk</div>
                {task.ai_assistance ? (
                  <div className="text-xs text-muted-foreground">AI: {task.ai_assistance}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
