import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ToolkitToolCard } from "@/components/report/ToolkitToolCard";
import { useReportData } from "@/hooks/use-report-data";

function Toolkit() {
  const { report, isLoading, isError } = useReportData();
  const tools = report?.ai_toolkit ?? [];

  return (
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
    </div>
  );
}

export default Toolkit;
