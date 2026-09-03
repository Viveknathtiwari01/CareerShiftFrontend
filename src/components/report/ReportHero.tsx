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
      className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EDF2F7] mb-12"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FDFBF2] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col">
        {/* Top Section: Title & Readiness Tag */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-[#0B1D3A]">
            {career_identity.identity_title}
          </h2>
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8C96A]/30 bg-[#FDFBF2] px-4 py-2 text-[12px] font-bold tracking-wider uppercase text-[#C9A84C] shadow-sm">
              <Target className="h-4 w-4" /> {ai_readiness.tier_label} Readiness
            </div>
          </div>
        </div>

        {/* Middle Section: 3 Stats in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="rounded-2xl border border-[#EDF2F7] bg-[#F8FAFC] p-5 shadow-sm flex items-center justify-between group hover:border-[#E2E8F0] hover:bg-white transition-all">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#718096] mb-1">Readiness Tier</div>
              <div className="text-2xl font-display font-medium text-[#0B1D3A]">{ai_readiness.tier_label}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-white border border-[#EDF2F7] text-[#D69E2E] flex items-center justify-center shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#EDF2F7] bg-[#F8FAFC] p-5 shadow-sm flex items-center justify-between group hover:border-[#E2E8F0] hover:bg-white transition-all">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#718096] mb-1">Career Risk</div>
              <div className="text-2xl font-display font-medium text-[#0B1D3A]">{overview.career_risk}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-white border border-[#EDF2F7] text-[#319795] flex items-center justify-center shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#EDF2F7] bg-[#F8FAFC] p-5 shadow-sm flex items-center justify-between group hover:border-[#E2E8F0] hover:bg-white transition-all">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#718096] mb-1">Automation</div>
              <div className="text-2xl font-display font-medium text-[#0B1D3A]">{overview.automation_pct}%</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-white border border-[#EDF2F7] text-[#C9A84C] flex items-center justify-center shadow-sm">
              <Zap className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Executive Summary Full Width */}
        <div className="rounded-2xl border border-[#EDF2F7] bg-[#F8FAFC] p-6 shadow-sm">
          <h3 className="font-display text-lg font-medium text-[#0B1D3A] mb-2 flex items-center gap-2">
            Executive Summary
          </h3>
          <p className="text-[15px] text-[#4A5568] leading-relaxed font-light">
            {career_identity.executive_summary}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
