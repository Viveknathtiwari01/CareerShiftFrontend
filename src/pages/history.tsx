import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { AppLoader } from "@/components/ui/app-loader";
import { listAssessments } from "@/api/assessment";

function History() {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["assessments-list"],
    queryFn: listAssessments,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <AppLoader size="lg" />
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
      <div className="mt-8 grid gap-4">
        {assessments.map((item, i) => (
          <motion.div
            key={item.assessment_id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/report?assessmentId=${item.assessment_id}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Career Intelligence Assessment
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                  {item.completed_at
                    ? new Date(item.completed_at).toLocaleString()
                    : new Date(item.created_at).toLocaleString()}
                  {" · "}
                  {item.status}
                  {item.competency_count != null ? ` · ${item.competency_count} competencies` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  View Report
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default History;
