<<<<<<< HEAD
import type { CareerIntelligenceReport } from "@/api/report";
import { AIReadinessRadarChart } from "@/components/report/AIReadinessRadarChart";

type Props = { report: CareerIntelligenceReport };

export function AIReadinessTab({ report }: Props) {
  const r = report.ai_readiness;
  const radarData = r.dimensions.map((d) => ({
    subject: d.name,
    A: d.score,
    fullMark: 100,
  }));

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary/20 bg-brand p-8 text-center text-white">
        <div className="type-label mb-4 text-white">Overall AI Readiness</div>
        <div className="font-display text-5xl font-black">
          {r.overall_score}
          <span className="text-2xl opacity-80">/100</span>
        </div>
        <h3 className="type-section-title mt-3 text-white">{r.tier_label}</h3>
        <p className="type-body mx-auto mt-3 max-w-xl opacity-90">{r.tier_description}</p>
      </div>

      <AIReadinessRadarChart data={radarData} height={360} />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border p-6">
          <h4 className="type-card-title mb-3">Strengths</h4>
          <ul className="type-body list-disc space-y-2 pl-5 text-muted-foreground">
            {r.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border p-6">
          <h4 className="type-card-title mb-3">Improvement Areas</h4>
          <ul className="type-body list-disc space-y-2 pl-5 text-muted-foreground">
            {r.improvement_areas.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
=======
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  AIReadinessEmpty,
  AIReadinessView,
} from "@/components/readiness/AIReadinessView";
import type { AIReadinessResult } from "@/api/readiness";

export function AIReadinessTab({ readiness }: { readiness: AIReadinessResult | null }) {
  if (!readiness) {
    return (
      <AIReadinessEmpty
        message="Complete 3B analysis and generate your report to see AI readiness here."
        action={
          <Link
            to="/3b-analysis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            Complete 3B analysis <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
    );
  }

  return <AIReadinessView data={readiness} showFooterLink={false} />;
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
}
