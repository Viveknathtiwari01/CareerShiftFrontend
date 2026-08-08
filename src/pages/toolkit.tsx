import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ToolkitToolCard } from "@/components/report/ToolkitToolCard";
import { useReportData } from "@/hooks/use-report-data";

function Toolkit() {
  const { report, isLoading, isError } = useReportData();
  const tools = report?.ai_toolkit ?? [];

  return (
<<<<<<< HEAD
    <div className="w-full">
      <PageHeader
        title="Your AI toolkit"
        description="Tools ranked by priority from your 3B analysis — start with Critical and High items."
      />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
      ) : isError || !tools.length ? (
        <div className="mt-8 rounded-2xl border border-border p-8 text-center text-muted-foreground">
          <p>Complete and submit your assessment to get personalized tool recommendations.</p>
          <Link to="/assessment" className="mt-4 inline-block text-brand font-semibold">
            Go to Assessment →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolkitToolCard key={tool.name} tool={tool} variant="dark" />
          ))}
        </div>
      )}
=======
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Your AI toolkit</h1>
      <p className="mt-2 text-muted-foreground">Curated tools matched to your role and tasks.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <div key={t.name} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{t.name}</h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand">{t.cat}</p>
            <p className="mt-3 text-sm text-muted-foreground">{t.use}</p>
          </div>
        ))}
      </div>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
    </div>
  );
}

export default Toolkit;
