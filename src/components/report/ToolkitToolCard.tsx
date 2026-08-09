import { Wrench, Sparkles, Bot, Cpu, type LucideIcon } from "lucide-react";
import type { ToolkitItem } from "@/api/report";
import { cn } from "@/lib/utils";

const PRIORITY_STYLES: Record<string, string> = {
  Critical: "bg-brand/15 text-brand border-brand/30",
  High: "bg-teal/15 text-teal border-teal/30",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Supporting: "bg-muted text-muted-foreground border-border",
  Existing: "bg-muted text-muted-foreground border-border",
  Recommended: "bg-muted text-foreground border-border",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  development: Wrench,
  coding: Wrench,
  business: Sparkles,
  productivity: Sparkles,
  automation: Bot,
  general: Cpu,
};

function iconForCategory(category: string): LucideIcon {
  const key = category.toLowerCase();
  for (const [part, icon] of Object.entries(CATEGORY_ICONS)) {
    if (key.includes(part)) return icon;
  }
  return Cpu;
}

type Props = {
  tool: ToolkitItem;
  rank?: number;
};

export function ToolkitToolCard({ tool, rank }: Props) {
  const Icon = iconForCategory(tool.category);
  const priorityLabel =
    tool.priority_label ??
    (rank != null && rank <= 6 ? (rank <= 3 ? "Critical" : "High") : "Recommended");
  const priorityClass = PRIORITY_STYLES[priorityLabel] ?? PRIORITY_STYLES.Recommended;
  const taskLinks = tool.task_links ?? [];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elevated">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            {rank != null && (
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                #{rank} priority
              </p>
            )}
            <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
              {tool.name}
            </h3>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
            priorityClass,
          )}
        >
          {priorityLabel}
        </span>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand">
        {tool.category}
      </p>

      <div className="flex-1 space-y-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Why recommended (from 3B analysis)
          </p>
          {taskLinks.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {taskLinks.map((link) => (
                <li key={`${link.task_title}-${link.reason.slice(0, 24)}`} className="text-sm leading-relaxed">
                  <span className="font-semibold text-foreground">{link.task_title}:</span>{" "}
                  <span className="text-muted-foreground">{link.reason}</span>
                </li>
              ))}
            </ul>
          ) : tool.use_case ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.use_case}</p>
          ) : (
            <p className="mt-2 text-sm italic text-muted-foreground/70">
              Complete 3B analysis to see task-specific recommendations.
            </p>
          )}
        </div>
      </div>

      {tool.priority_reason ? (
        <div className="mt-4 rounded-lg border border-border/80 bg-muted/40 px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Priority ranking
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">{tool.priority_reason}</p>
        </div>
      ) : null}

      {tool.source ? (
        <p className="mt-3 text-xs text-muted-foreground">Source: {tool.source}</p>
      ) : null}
    </article>
  );
}
