import { Wrench, Sparkles, Bot, Cpu, CheckCircle2, AlertCircle, type LucideIcon } from "lucide-react";
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

  // Extract pros and cons from the tool or its task links
  const prosList = (tool.pros && tool.pros.length > 0)
    ? tool.pros
    : taskLinks.flatMap((l) => l.pros ?? []).filter(Boolean);
  const consList = (tool.cons && tool.cons.length > 0)
    ? tool.cons
    : taskLinks.flatMap((l) => l.cons ?? []).filter(Boolean);

  const uniquePros = Array.from(new Set(prosList)).slice(0, 3);
  const uniqueCons = Array.from(new Set(consList)).slice(0, 3);

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
            Why this tool
          </p>
          {taskLinks.length > 0 ? (
            <ul className="mt-2 space-y-3">
              {taskLinks.map((link) => (
                <li
                  key={`${link.task_title}-${link.reason.slice(0, 24)}`}
                  className="text-sm leading-relaxed"
                >
                  {taskLinks.length > 1 && (
                    <span className="font-semibold text-foreground">{link.task_title}: </span>
                  )}
                  <span className="text-muted-foreground">{link.reason}</span>
                  {link.how_to_use ? (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      <span className="font-semibold">How to use it. </span>
                      {link.how_to_use}
                    </p>
                  ) : null}
                  {link.starting_point ? (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      <span className="font-semibold">Start here. </span>
                      {link.starting_point}
                    </p>
                  ) : null}
                  {link.limitations ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">Check first. </span>
                      {link.limitations}
                    </p>
                  ) : null}
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

        {/* Pros & Cons Section */}
        {(uniquePros.length > 0 || uniqueCons.length > 0) && (
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {uniquePros.length > 0 && (
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-50/70 p-3 dark:border-emerald-500/20 dark:bg-emerald-950/20">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  Pros
                </p>
                <ul className="mt-1.5 space-y-1">
                  {uniquePros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-emerald-950/80 leading-relaxed dark:text-emerald-200/90">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {uniqueCons.length > 0 && (
              <div className="rounded-xl border border-amber-500/25 bg-amber-50/70 p-3 dark:border-amber-500/20 dark:bg-amber-950/20">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  Cons
                </p>
                <ul className="mt-1.5 space-y-1">
                  {uniqueCons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-amber-950/80 leading-relaxed dark:text-amber-200/90">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
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
