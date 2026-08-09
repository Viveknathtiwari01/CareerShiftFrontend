import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Wrench, ArrowRight, Filter } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ToolkitToolCard } from "@/components/report/ToolkitToolCard";
import { useReportData } from "@/hooks/use-report-data";
import type { ToolkitItem } from "@/api/report";
import { cn } from "@/lib/utils";

const PRIORITY_FILTERS = ["All", "Critical", "High", "Medium", "Supporting", "Existing"] as const;

function effectivePriority(tool: ToolkitItem, index: number): string {
  if (tool.priority_label) return tool.priority_label;
  const rank = tool.priority_rank ?? index + 1;
  if (rank <= 3) return "Critical";
  if (rank <= 6) return "High";
  if (rank <= 9) return "Medium";
  return "Supporting";
}

function sortTools(tools: ToolkitItem[]): ToolkitItem[] {
  return [...tools].sort((a, b) => {
    const rankA = a.priority_rank ?? 999;
    const rankB = b.priority_rank ?? 999;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name);
  });
}

export default function Toolkit() {
  const { report, isLoading, isError, assessmentId } = useReportData();
  const [filter, setFilter] = useState<(typeof PRIORITY_FILTERS)[number]>("All");

  const tools = useMemo(() => sortTools(report?.ai_toolkit ?? []), [report?.ai_toolkit]);

  const filtered = useMemo(() => {
    if (filter === "All") return tools;
    return tools.filter((tool, idx) => effectivePriority(tool, idx) === filter);
  }, [tools, filter]);

  const categoryCount = useMemo(
    () => new Set(tools.map((t) => t.category)).size,
    [tools],
  );

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    tools.forEach((tool, idx) => {
      const p = effectivePriority(tool, idx);
      counts[p] = (counts[p] ?? 0) + 1;
    });
    return counts;
  }, [tools]);

  const grouped = useMemo(() => {
    const map = new Map<string, ToolkitItem[]>();
    filtered.forEach((tool) => {
      const key = tool.category || "Recommended AI Tools";
      const list = map.get(key) ?? [];
      list.push(tool);
      map.set(key, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="w-full space-y-8">
      <PageHeader
        title="Your AI toolkit"
        description="Personalized tools from your 3B analysis and career profile — ranked by impact on your role."
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-brand" />
        </div>
      ) : isError || !tools.length ? (
        <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-soft">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-muted">
            <Wrench className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">No toolkit recommendations yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete your assessment, run 3B analysis, and submit to generate your ranked AI toolkit.
          </p>
          <Link
            to="/assessment"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Go to Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total tools" value={String(tools.length)} />
            <StatCard label="Critical priority" value={String(stats.Critical ?? 0)} accent="brand" />
            <StatCard label="High priority" value={String(stats.High ?? 0)} accent="teal" />
            <StatCard label="Categories" value={String(categoryCount)} />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filter by priority
            </div>
            <div className="flex flex-wrap gap-2">
              {PRIORITY_FILTERS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                    filter === option
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {option}
                  {option !== "All" && stats[option] != null ? ` (${stats[option]})` : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped tools */}
          <div className="space-y-10">
            {grouped.map(([category, categoryTools]) => (
              <section key={category}>
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-border pb-3">
                  <h2 className="font-display text-xl font-semibold text-foreground">{category}</h2>
                  <span className="text-sm text-muted-foreground">
                    {categoryTools.length} tool{categoryTools.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {categoryTools.map((tool) => {
                    const globalIndex = tools.findIndex(
                      (t) => t.name === tool.name && t.category === tool.category,
                    );
                    return (
                      <ToolkitToolCard
                        key={`${category}-${tool.name}`}
                        tool={tool}
                        rank={tool.priority_rank ?? (globalIndex >= 0 ? globalIndex + 1 : undefined)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {assessmentId && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/30 px-6 py-5">
              <p className="text-sm text-muted-foreground">
                View your full toolkit in context with competencies, roadmap, and action plan.
              </p>
              <Link
                to={`/report?assessmentId=${assessmentId}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-muted"
              >
                Open Career Report <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "brand" | "teal";
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4 shadow-soft">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-3xl font-semibold tabular-nums",
          accent === "brand" && "text-brand",
          accent === "teal" && "text-teal",
          !accent && "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}
