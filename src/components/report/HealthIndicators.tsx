import { motion } from "framer-motion";
import { Activity, Brain, ShieldCheck, Zap, Briefcase, ArrowDown } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function HealthIndicators({ report }: Props) {
  const { overview, ai_readiness, before_after, career_identity } = report;

  const kpis = [
    { label: "AI Readiness", value: `${ai_readiness.overall_score}/100`, icon: Zap, color: "text-brand" },
    { label: "Tier", value: ai_readiness.tier_label, icon: Brain, color: "text-primary" },
    { label: "Career Risk", value: overview.career_risk, icon: ShieldCheck, color: "text-primary" },
    { label: "Automation", value: `${overview.automation_pct}%`, icon: Activity, color: "text-primary" },
    { label: "Role", value: (overview.job_title ?? "Your role").split(" ").slice(0, 2).join(" "), icon: Briefcase, color: "text-primary" },
  ];

  const currentRole = String(before_after.current_role ?? overview.job_title);
  const futureRole = String(before_after.future_role ?? career_identity.identity_title);

  return (
    <div className="mt-16 space-y-12">
      <div className="border-t border-border pt-12">
        <h3 className="mb-8 font-display text-2xl font-bold flex items-center gap-3">
          <Activity className="h-6 w-6 text-primary" /> Career Health Indicators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((kpi, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={kpi.label}
              className="rounded-2xl border border-border bg-background p-5 shadow-sm text-center flex flex-col items-center justify-center"
            >
              <kpi.icon className={`h-6 w-6 mb-3 ${kpi.color}`} />
              <div className="text-lg font-base mb-1">{kpi.value}</div>
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
          {[
            { label: "Today", role: currentRole, active: true },
            { label: "Next", role: futureRole, active: false },
          ].map((node, i, arr) => (
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
                  className={`font-base text-sm md:text-base px-6 py-4 rounded-2xl border ${node.active ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-background border-border text-foreground"}`}
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
