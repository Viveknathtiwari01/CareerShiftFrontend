import { Link } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useReportData } from "@/hooks/use-report-data";

export default function CareerIdentity() {
  const { report, isLoading, isError, error } = useReportData();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="type-body mt-4 text-muted-foreground">
          {error instanceof Error ? error.message : "Submit your assessment to see career identity."}
        </p>
        <Link to="/assessment" className="type-body mt-4 inline-block font-semibold text-brand">
          Go to Assessment →
        </Link>
      </div>
    );
  }

  const c = report.career_identity;

  return (
    <div className="w-full space-y-10">
      <PageHeader
        title="Career Identity"
        description="Derived from your assessment and 3B task analysis."
      />

      <div className="rounded-2xl border border-border bg-background p-8 shadow-soft lg:p-10">
        <div className="type-label mb-3 text-brand">Your Identity</div>
        <h3 className="type-section-title">{c.identity_title}</h3>
        <p className="type-body mt-5 text-muted-foreground">{c.executive_summary}</p>
        <div className="type-body-sm mt-5 inline-flex rounded-full bg-brand/10 px-4 py-1.5 font-semibold text-brand">
          {c.confidence_pct}% alignment confidence
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Block title="Ideal Future Roles" items={c.ideal_roles} />
        <Block title="Superpowers" items={c.superpowers} />
        <Block title="Blind Spots to Watch" items={c.blind_spots} />
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
        <h4 className="type-card-title mb-3">Growth Strategy</h4>
        <p className="type-body text-muted-foreground">{c.growth_strategy}</p>
      </div>

      <Link
        to={`/report?assessmentId=${report.assessment_id}`}
        className="type-body inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        View Full Report →
      </Link>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border p-6 lg:p-8">
      <h4 className="type-card-title mb-4">{title}</h4>
      <ul className="type-body list-disc space-y-3 pl-5 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
