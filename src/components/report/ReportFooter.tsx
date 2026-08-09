import { Calendar, Info } from "lucide-react";

type Props = {
  assessmentId: string;
  generatedAt?: string;
  version?: string;
};

export function ReportFooter({ assessmentId, generatedAt, version = "1.0.0" }: Props) {
  const generated = generatedAt
    ? new Date(generatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <footer className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border/40 py-12 text-sm text-muted-foreground md:flex-row">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4" />
        <span className="font-medium">
          Career Intelligence Assessment v{version} · {assessmentId.slice(0, 8)}
        </span>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
        <div className="flex items-center gap-2">
          <span>Generated On:</span>
          <span className="font-semibold text-foreground">{generated}</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-secondary-foreground">
          <Calendar className="h-4 w-4" />
          <span>Next Recommended Assessment:</span>
          <span className="font-bold">Every 90 Days</span>
        </div>
      </div>
    </footer>
  );
}
