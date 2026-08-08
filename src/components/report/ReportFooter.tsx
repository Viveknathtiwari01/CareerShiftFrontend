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
    <footer className="mt-16 border-t border-border/40 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4" />
        <span className="font-medium">
          Career Intelligence Assessment v{version} · {assessmentId.slice(0, 8)}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <span>Generated On:</span>
          <span className="font-semibold text-foreground">{generated}</span>
        </div>
        <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-secondary-foreground border border-border">
          <Calendar className="h-4 w-4" />
          <span>Next Recommended Assessment:</span>
          <span className="font-bold">Every 90 Days</span>
        </div>
      </div>
    </footer>
  );
}
