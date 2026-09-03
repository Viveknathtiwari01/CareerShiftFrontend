import { motion } from "framer-motion";
import { Activity, Brain, ShieldCheck, Zap, Briefcase, ArrowDown, Sparkles } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function HealthIndicators({ report }: Props) {
  const { overview, ai_readiness, before_after, career_identity } = report;

  const kpis = [
    { label: "Tier", value: ai_readiness.tier_label, icon: Brain, color: "text-[#C9A84C]" },
    { label: "Career Risk", value: overview.career_risk, icon: ShieldCheck, color: "text-[#C9A84C]" },
    { label: "Automation", value: `${overview.automation_pct}%`, icon: Activity, color: "text-[#C9A84C]" },
    { label: "Role", value: (overview.job_title ?? "Your role").split(" ").slice(0, 2).join(" "), icon: Briefcase, color: "text-[#C9A84C]" },
  ];

  const currentRole = String(before_after.current_role ?? overview.job_title);
  const futureRole = String(before_after.future_role ?? career_identity.identity_title);

  return (
    <div className="mt-16 space-y-16">
      <div className="border-t border-[#EDF2F7] pt-12">
        <h3 className="mb-8 font-display text-2xl font-medium text-[#0B1D3A] text-center">
          Career Health Indicators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={kpi.label}
              className="rounded-2xl border border-[#EDF2F7] bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300"
            >
              <kpi.icon className={`h-6 w-6 mb-3 ${kpi.color}`} />
              <div className="text-xl font-display font-medium text-[#0B1D3A] mb-1">{kpi.value}</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#718096]">
                {kpi.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
