import type { CareerIntelligenceReport } from "@/api/report";
import { AIFitnessRadarChart } from "@/components/report/AIFitnessRadarChart";

type Props = { report: CareerIntelligenceReport };

export function AIFitnessTab({ report }: Props) {
  const r = report.ai_readiness;
  const radarData = r.dimensions.map((d) => ({
    subject: d.name,
    A: d.score,
    fullMark: 100,
  }));

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary/20 bg-brand p-8 text-center text-white">
        <div className="type-label mb-4 text-white">Overall AI Fitness</div>
        <div className="font-display text-5xl font-black">
          {r.overall_score}
          <span className="text-2xl opacity-80">/100</span>
        </div>
        <h3 className="type-section-title mt-3 text-white">{r.tier_label}</h3>
        <p className="type-body mx-auto mt-3 max-w-xl opacity-90">{r.tier_description}</p>
      </div>

      <AIFitnessRadarChart data={radarData} height={360} />

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
}
