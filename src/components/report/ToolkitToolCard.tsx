import type { ToolkitItem } from "@/api/report";

const PRIORITY_STYLES: Record<string, string> = {
  Critical: "bg-brand text-brand-foreground border-brand/30",
  High: "bg-teal/15 text-teal border-teal/25",
  Medium: "bg-background/15 text-background/90 border-background/25",
  Supporting: "bg-background/10 text-background/75 border-background/20",
  Existing: "bg-background/10 text-background/70 border-background/20",
};

type Props = {
  tool: ToolkitItem;
  variant?: "dark" | "light";
};

export function ToolkitToolCard({ tool, variant = "dark" }: Props) {
  const isDark = variant === "dark";
  const priorityClass =
    PRIORITY_STYLES[tool.priority_label ?? ""] ??
    (isDark ? "bg-background/10 text-background/75 border-background/20" : "bg-muted text-muted-foreground border-border");

  return (
    <div
      className={
        isDark
          ? "surface-card p-6"
          : "rounded-2xl border border-border bg-background p-6 shadow-sm"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={isDark ? "type-card-title text-background" : "type-card-title"}>
          {tool.name}
        </h3>
        {tool.priority_label ? (
          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${priorityClass}`}
          >
            {/* {tool.priority_rank ? `#${tool.priority_rank} ` : ""} */}
            {tool.priority_label}
          </span>
        ) : null}
      </div>

      <p className="type-label mt-2 text-brand">{tool.category}</p>

      {tool.priority_reason ? (
        <div className="mt-4">
          <p className={isDark ? "type-label text-background/70" : "type-label text-muted-foreground"}>
            Priority
          </p>
          <p className={isDark ? "type-body-sm mt-2 text-background/90" : "type-body-sm mt-2 text-muted-foreground"}>
            {tool.priority_reason}
          </p>
        </div>
      ) : null}

      <div className="mt-4">
        <p className={isDark ? "type-label text-background/70" : "type-label text-muted-foreground"}>
          Why
        </p>
        <p className={isDark ? "type-body-sm mt-2 text-background/90" : "type-body-sm mt-2 text-muted-foreground"}>
          {tool.use_case}
        </p>
      </div>

      {tool.source ? (
        <p className={isDark ? "type-body-sm mt-4 text-background/65" : "type-body-sm mt-3 text-muted-foreground"}>
          Source: {tool.source}
        </p>
      ) : null}
    </div>
  );
}
