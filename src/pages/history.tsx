import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { listAssessments } from "@/api/assessment";

function History() {
<<<<<<< HEAD
  const { data: assessments, isLoading } = useQuery({
=======
  const { data: assessments = [], isLoading } = useQuery({
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
    queryKey: ["assessments-list"],
    queryFn: listAssessments,
  });

<<<<<<< HEAD
  return (
    <div className="w-full">
      <h1 className="font-display text-3xl font-bold tracking-tight">Assessment history</h1>
      <p className="mt-2 text-muted-foreground">Every readiness snapshot you've completed.</p>
      <div className="bg-brand rounded-lg mt-8 divide-y divide-border">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : assessments && assessments.length > 0 ? (
          assessments.map((item) => (
            <Link
              key={item.assessment_id}
              to={`/report?assessmentId=${item.assessment_id}`}
              className="flex items-center justify-between p-5 hover:bg-muted/40"
            >
              <div>
                <p className="font-semibold">Career Intelligence Assessment</p>
                <p className="text-xs text-muted-foreground">
                  {item.completed_at
                    ? new Date(item.completed_at).toLocaleString()
                    : new Date(item.created_at).toLocaleString()}
                  {" · "}
                  {item.status}
                  {item.competency_count != null ? ` · ${item.competency_count} competencies` : ""}
                </p>
              </div>
              <span className="text-sm font-medium text-primary-frontend">View →</span>
            </Link>
          ))
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
=======
  const completed = assessments.filter((item) => item.status === "COMPLETED");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Assessment history</h1>
      <p className="mt-2 text-muted-foreground">Every readiness snapshot you've completed.</p>

      {isLoading ? (
        <div className="mt-12 flex justify-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      ) : (
        <div className="bg-brand rounded-lg mt-8 divide-y divide-border">
          {completed.length > 0 ? (
            completed.map((item) => (
              <Link
                key={item.assessment_id}
                to={`/report?assessmentId=${item.assessment_id}`}
                className="flex items-center justify-between p-5 hover:bg-muted/40"
              >
                <div>
                  <p className="font-semibold">Career Intelligence Report</p>
                  <p className="text-xs text-muted-foreground">
                    {item.completed_at
                      ? new Date(item.completed_at).toLocaleString()
                      : new Date(item.created_at).toLocaleString()}
                  </p>
                  {item.competency_count != null && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.competency_count} competencies mapped
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium text-primary-frontend">View →</span>
              </Link>
            ))
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
      )}
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
    </div>
  );
}

export default History;
