import { Hammer, Sparkles, Bot } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

const META = {
  BUILD: { icon: Hammer, label: "BUILD IT", className: "border-primary/20 bg-primary/5" },
  BLEND: { icon: Sparkles, label: "BLEND IT", className: "border-brand/20 bg-brand/5" },
  BOT: { icon: Bot, label: "BOT IT", className: "border-teal/30 bg-teal/5" },
} as const;

type Props = { report: CareerIntelligenceReport };

export function ThreeBAnalysisTab({ report }: Props) {
  const items = report.task_routing;

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const meta = META[item.category as keyof typeof META] ?? META.BLEND;
        const Icon = meta.icon;
        return (
          <div
            key={item.task_id}
            className={`rounded-2xl border p-5 shadow-sm ${meta.className}`}
          >
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{item.task_title}</span>
                  <span className="text-xs font-bold uppercase tracking-wide opacity-80">
                    {meta.label}
                  </span>
                </div>
                {item.rationale ? (
                  <p className="text-sm mt-2 font-medium">{item.rationale}</p>
                ) : null}
                {item.reason ? (
                  <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                ) : null}
                {item.next_actions?.length ? (
                  <ul className="mt-3 space-y-1 text-sm list-disc pl-5">
                    {item.next_actions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
