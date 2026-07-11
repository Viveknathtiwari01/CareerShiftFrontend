import { Link } from "react-router-dom";
import { useAssessment } from "@/store/mock-store";

function History() {
  const { submitted } = useAssessment();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="font-display text-3xl font-bold tracking-tight">Assessment history</h1>
      <p className="mt-2 text-muted-foreground">Every readiness snapshot you've completed.</p>
      <div className="surface-card mt-8 divide-y divide-border">
        {submitted ? (
          <Link to="/report" className="flex items-center justify-between p-5 hover:bg-muted/40">
            <div>
              <p className="font-semibold">AI Career Readiness Report</p>
              <p className="text-xs text-muted-foreground">
                {submitted.completedAt
                  ? new Date(submitted.completedAt).toLocaleString()
                  : "Recently"}
              </p>
            </div>
            <span className="text-sm font-medium text-brand">View →</span>
          </Link>
        ) : (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No assessments yet.{" "}
            <Link to="/assessment" className="font-semibold text-brand hover:underline">
              Run your first
            </Link>
            .
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
