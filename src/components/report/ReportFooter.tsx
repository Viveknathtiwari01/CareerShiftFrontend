import { Calendar, Info } from "lucide-react";

function formatReportDate(iso: string | null | undefined) {
  if (!iso) {
    return new Date().toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ReportFooter({
  generatedAt,
  reportVersion,
  strategicNote,
}: {
  generatedAt?: string | null;
  reportVersion?: string | null;
  strategicNote?: string | null;
}) {
  return (
    <footer className="mt-16 border-t border-border/40 py-12 space-y-8">
      {strategicNote && (
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 md:p-8">
          <h3 className="font-display text-lg font-bold text-brand mb-3">Strategic Note</h3>
          <p className="text-muted-foreground leading-relaxed font-medium">{strategicNote}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span className="font-medium">
            Career Intelligence Assessment v{reportVersion ?? "1.0"}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <span>Generated On:</span>
            <span className="font-semibold text-foreground">{formatReportDate(generatedAt)}</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-secondary-foreground border border-border">
            <Calendar className="h-4 w-4" />
            <span>Next Recommended Assessment:</span>
            <span className="font-bold">Every 90 Days</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
