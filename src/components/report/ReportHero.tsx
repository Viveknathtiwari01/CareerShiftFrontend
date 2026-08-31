import { Sparkles, Target, Activity, ShieldAlert, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { CareerIntelligenceReport } from "@/api/report";

type Props = {
  report: CareerIntelligenceReport;
};

export function ReportHero({ report }: Props) {
  const { overview, career_identity, ai_readiness } = report;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[2rem] bg-[#1B2533] p-8 md:p-12 shadow-2xl mb-12"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-3 gap-10 relative z-10">
        <div className="lg:col-span-2 flex flex-col">
          <div className="inline-flex self-start items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-1.5 text-[12px] font-bold tracking-wider uppercase text-[#C9A84C] mb-8">
            <Target className="h-4 w-4" /> {ai_readiness.tier_label} Readiness
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-medium text-white leading-tight mb-8">
            {career_identity.identity_title}
          </h2>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-md mt-auto">
            <h3 className="font-display text-xl font-medium text-white mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#C9A84C]" /> Executive Summary
            </h3>
            <p className="text-[16px] text-white/70 leading-relaxed font-light">
              {career_identity.executive_summary}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-center col-span-2 group hover:bg-white/10 transition-colors">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-2 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" /> Readiness Tier
            </div>
            <div className="text-3xl font-display font-medium text-white">{ai_readiness.tier_label}</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-center group hover:bg-white/10 transition-colors">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-2 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" /> Career Risk
            </div>
            <div className="text-3xl font-display font-medium text-white">{overview.career_risk}</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-center group hover:bg-white/10 transition-colors">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-2 flex items-center gap-1.5">
              <Zap className="h-4 w-4" /> Automation
            </div>
            <div className="text-3xl font-display font-medium text-white">{overview.automation_pct}%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
