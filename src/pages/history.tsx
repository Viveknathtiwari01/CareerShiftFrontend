import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { listAssessments } from "@/api/assessment";

function History() {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["assessments-list"],
    queryFn: listAssessments,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  if (!assessments || assessments.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-border bg-background p-8 text-center shadow-soft">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-4 font-display text-xl font-bold">No assessments yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Run your first assessment to start tracking your readiness history.
          </p>
          <Link
            to="/assessment"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Go to Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="font-display text-3xl font-bold tracking-tight">Assessment history</h1>
      <p className="mt-2 text-muted-foreground">Every readiness snapshot you've completed.</p>
      <div className="bg-brand rounded-lg mt-8 divide-y divide-border">
        {assessments.map((item) => (
          <Link
            key={item.assessment_id}
            to={`/report?assessmentId=${item.assessment_id}`}
            className="flex items-center justify-between p-5 hover:bg-muted/40"
          >
            <div>
              <p className="font-semibold text-white">Career Intelligence Assessment</p>
              <p className="text-xs text-white/70">
                {item.completed_at
                  ? new Date(item.completed_at).toLocaleString()
                  : new Date(item.created_at).toLocaleString()}
                {" · "}
                {item.status}
                {item.competency_count != null ? ` · ${item.competency_count} competencies` : ""}
              </p>
            </div>
            <span className="text-sm font-medium text-white">View →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default History;
