import { motion } from "framer-motion";
import { Activity, Brain, ShieldCheck, Zap, Briefcase, ArrowDown, Sparkles } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function HealthIndicators({ report }: Props) {
  const { overview, ai_readiness, before_after, career_identity } = report;

  const kpis = [
    { label: "AI Fitness", value: `${ai_readiness.overall_score}/100`, icon: Zap, color: "text-brand" },
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

      <div className="border-t border-border pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 font-display text-3xl font-bold text-center relative z-10"
        >
          Career Progress Timeline
        </motion.h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto relative z-10 px-4">
          {/* Today Node */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center w-full md:w-auto"
          >
            <span className="text-[11px] font-black uppercase tracking-widest mb-4 text-muted-foreground">
              Today
            </span>
            <div className="relative group w-full md:w-auto">
              <div className="absolute -inset-0.5 bg-border rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative flex items-center justify-center bg-card border border-border px-8 py-5 rounded-2xl text-center min-w-[200px] shadow-sm">
                <span className="font-display font-medium text-foreground text-lg">
                  {currentRole}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center py-6 md:py-0"
          >
            <div className="h-12 w-px md:h-px md:w-20 bg-gradient-to-b md:bg-gradient-to-r from-border to-primary relative flex items-center justify-center">
              <div className="absolute grid place-items-center h-8 w-8 rounded-full bg-background border border-primary/30 text-primary shadow-soft">
                <ArrowDown className="h-4 w-4 md:-rotate-90 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Next Node */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center w-full md:w-auto"
          >
            <span className="text-[11px] font-black uppercase tracking-widest mb-4 text-primary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Next Evolution
            </span>
            <div className="relative group w-full md:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand to-primary rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative flex items-center justify-center bg-gradient-to-br from-primary to-brand border border-primary/50 px-8 py-5 rounded-2xl text-center shadow-xl shadow-primary/20 min-w-[220px]">
                <span className="font-display font-bold text-primary-foreground text-lg flex items-center gap-2">
                  {futureRole}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
