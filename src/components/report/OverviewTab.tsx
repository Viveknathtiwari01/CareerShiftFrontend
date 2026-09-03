import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Clock,
  Activity,
  CheckSquare,
  Award,
  Wrench,
  Zap,
  ShieldAlert,
} from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function OverviewTab({ report }: Props) {
  const o = report.overview;

  const kpis = [
    { label: "Overall Score", value: String(o.overall_score), icon: Activity, color: "text-[#C9A84C]" },
    { label: "Tasks Analyzed", value: String(o.tasks_analyzed), icon: CheckSquare, color: "text-[#D6AD42]" },
    { label: "Competencies", value: String(o.competency_count), icon: Award, color: "text-[#C9A84C]" },
    { label: "AI Tools Used", value: String(o.ai_tools_count), icon: Wrench, color: "text-[#D6AD42]" },
    { label: "Automation %", value: `${o.automation_pct}%`, icon: Zap, color: "text-[#C9A84C]" },
    { label: "Career Risk", value: o.career_risk, icon: ShieldAlert, color: "text-[#D6AD42]" },
  ];

  const snapshot = [
    { label: "Current Role", value: o.job_title, icon: Briefcase },
    { label: "Industry", value: o.industry, icon: Building2 },
    { label: "Experience", value: `${o.experience_years} years`, icon: Clock },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={kpi.label}
              className="rounded-[1.5rem] border border-[#EDF2F7] bg-white p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center"
            >
              <div className="h-10 w-10 rounded-full bg-[#FDFBF2] flex items-center justify-center mb-3">
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-display font-medium text-[#0B1D3A] truncate w-full">{kpi.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#718096] mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-center mb-10">
          <h3 className="font-display text-3xl font-medium text-[#0B1D3A]">Career Snapshot</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {snapshot.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={item.label} 
              className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center border border-[#EDF2F7]"
            >
              <div className="h-12 w-12 rounded-full bg-[#FDFBF2] text-[#C9A84C] flex items-center justify-center mb-6">
                <item.icon className="h-6 w-6" />
              </div>
              <h4 className="font-display text-xl font-medium text-[#0B1D3A] mb-2">{item.label}</h4>
              <p className="text-[16px] text-[#718096] font-light">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {o.profession_summary ? (
        <div className="rounded-[2rem] border border-[#EDF2F7] bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FDFBF2] rounded-full blur-[60px] pointer-events-none" />
          <h3 className="font-display text-2xl font-medium text-[#0B1D3A] mb-4 relative z-10">Profession Summary</h3>
          <p className="text-[#4A5568] leading-relaxed text-[16px] font-light relative z-10 max-w-4xl mx-auto">{o.profession_summary}</p>
        </div>
      ) : null}

      {report.strategic_note ? (
        <div className="rounded-[2rem] border border-[#EDF2F7] bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center flex flex-col items-center">
          <h3 className="font-display text-2xl font-medium text-[#0B1D3A] mb-4">Strategic Note</h3>
          <p className="text-[#4A5568] leading-relaxed text-[16px] font-light max-w-4xl mx-auto">{report.strategic_note}</p>
        </div>
      ) : null}
    </div>
  );
}
