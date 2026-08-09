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
  type LucideIcon,
} from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function OverviewTab({ report }: Props) {
  const o = report.overview;

  const kpis = [
    { label: "Overall Score", value: String(o.overall_score), icon: Activity, color: "text-brand" },
    { label: "Tasks Analyzed", value: String(o.tasks_analyzed), icon: CheckSquare, color: "text-primary" },
    { label: "Competencies", value: String(o.competency_count), icon: Award, color: "text-primary" },
    { label: "AI Tools Used", value: String(o.ai_tools_count), icon: Wrench, color: "text-primary" },
    { label: "Automation %", value: `${o.automation_pct}%`, icon: Zap, color: "text-brand" },
    { label: "Career Risk", value: o.career_risk, icon: ShieldAlert, color: "text-primary" },
  ];

  const snapshot = [
    { label: "Current Role", value: o.job_title, icon: Briefcase },
    { label: "Industry", value: o.industry, icon: Building2 },
    { label: "Experience", value: `${o.experience_years} years`, icon: Clock },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={kpi.label}
            className="rounded-2xl border border-border bg-background p-4 shadow-sm"
          >
            <kpi.icon className={`h-5 w-5 mb-3 ${kpi.color}`} />
            <div className="text-2xl font-bold truncate">{kpi.value}</div>
            <div className="text-xs font-medium text-muted-foreground mt-1">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="mb-6 font-display text-2xl font-bold">Career Snapshot</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snapshot.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <item.icon className="h-5 w-5 text-brand mb-3" />
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                {item.label}
              </div>
              <div className="font-semibold text-lg">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {o.profession_summary ? (
        <div className="rounded-2xl border border-border bg-muted/30 p-6">
          <h3 className="font-display text-xl font-bold mb-3">Profession Summary</h3>
          <p className="text-muted-foreground leading-relaxed">{o.profession_summary}</p>
        </div>
      ) : null}

      {report.strategic_note ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="font-display text-xl font-bold mb-3">Strategic Note</h3>
          <p className="text-muted-foreground leading-relaxed">{report.strategic_note}</p>
        </div>
      ) : null}
    </div>
  );
}
