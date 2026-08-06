import { motion } from "framer-motion";
import { Activity, Brain, ShieldCheck, Zap, Briefcase, Cpu, ArrowDown, type LucideIcon } from "lucide-react";
import type { AIReadinessResult } from "@/api/readiness";

function scoreToLabel(score: number): string {
  if (score >= 75) return "High";
  if (score >= 50) return "Good";
  if (score >= 35) return "Medium";
  return "Emerging";
}

export function HealthIndicators({
  readiness,
  profile,
}: {
  readiness: AIReadinessResult | null;
  profile: { jobTitle?: string; experience?: string } | null;
}) {
  const dimensionMap = Object.fromEntries(
    (readiness?.dimensions ?? []).map((d) => [d.subject, d.score]),
  );

  const factorMap = Object.fromEntries(
    (readiness?.factors ?? []).map((f) => [f.key, f.score]),
  );

  const kpis: { label: string; value: string; icon: LucideIcon; color: string }[] = readiness
    ? [
        {
          label: "AI Adoption",
          value: scoreToLabel(factorMap.adoption ?? 0),
          icon: Zap,
          color: "text-brand",
        },
        {
          label: "Learning Readiness",
          value: scoreToLabel(dimensionMap["Learning Readiness"] ?? 0),
          icon: Brain,
          color: "text-primary",
        },
        {
          label: "Automation Ready",
          value: scoreToLabel(factorMap.automation ?? 0),
          icon: ShieldCheck,
          color: "text-primary",
        },
        {
          label: "Human Edge",
          value: scoreToLabel(factorMap.build_strength ?? 0),
          icon: Briefcase,
          color: "text-primary",
        },
        {
          label: "BLEND Fluency",
          value: scoreToLabel(factorMap.blend_fluency ?? 0),
          icon: Cpu,
          color: "text-primary",
        },
        {
          label: "Overall Health",
          value: readiness.tier_label,
          icon: Activity,
          color: "text-brand",
        },
      ]
    : [];

  const timeline = [
    { label: "Today", role: profile?.jobTitle || "Current role", active: true },
    { label: "Next", role: "AI-Augmented Professional", active: false },
    { label: "Growth", role: readiness?.career_opportunity ?? "Specialist path", active: false },
    { label: "Future", role: "Future-ready career", active: false },
  ];

  if (!readiness) return null;

  return (
    <div className="mt-16 space-y-12">
      <div className="border-t border-border pt-12">
        <h3 className="mb-8 font-display text-2xl font-bold flex items-center gap-3">
          <Activity className="h-6 w-6 text-primary" /> Career Health Indicators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={kpi.label}
              className="rounded-2xl border border-border bg-background p-5 shadow-sm text-center flex flex-col items-center justify-center"
            >
              <kpi.icon className={`h-6 w-6 mb-3 ${kpi.color}`} />
              <div className="text-lg font-semibold mb-1 leading-tight">{kpi.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-12 pb-8">
        <h3 className="mb-10 font-display text-2xl font-bold text-center">Career Progress Timeline</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-5xl mx-auto">
          {timeline.map((node, i, arr) => (
            <div
              key={node.label}
              className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
            >
              <div className="flex flex-col items-center text-center">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest mb-3 ${node.active ? "text-primary" : "text-muted-foreground"}`}
                >
                  {node.label}
                </span>
                <span
                  className={`font-base text-sm md:text-base px-6 py-4 rounded-2xl border max-w-[200px] ${node.active ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105" : "bg-background border-border text-foreground"}`}
                >
                  {node.role}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="flex justify-center my-2 md:my-0">
                  <ArrowDown className="h-6 w-6 text-muted-foreground/30 md:-rotate-90 shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
