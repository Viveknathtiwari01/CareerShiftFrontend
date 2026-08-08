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
<<<<<<< HEAD
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
=======
import type { AIReadinessResult } from "@/api/readiness";
import type { WizardData } from "@/components/my-career/types";

export function OverviewTab({
  profile,
  readiness,
  taskCount,
  competencyCount,
  automationPct,
}: {
  profile: WizardData | null;
  readiness: AIReadinessResult | null;
  taskCount: number;
  competencyCount: number;
  automationPct: number | null;
}) {
  const kpis: { label: string; value: string; icon: LucideIcon; color: string }[] = [
    {
      label: "Overall Score",
      value: readiness ? String(readiness.overall_score) : "—",
      icon: Activity,
      color: "text-brand",
    },
    {
      label: "Tasks Analyzed",
      value: String(taskCount),
      icon: CheckSquare,
      color: "text-primary",
    },
    {
      label: "Competencies",
      value: String(competencyCount),
      icon: Award,
      color: "text-primary",
    },
    {
      label: "AI Tools Used",
      value: String(profile?.aiTools?.length ?? 0),
      icon: Wrench,
      color: "text-primary",
    },
    {
      label: "Automation %",
      value: automationPct != null ? `${automationPct}%` : "—",
      icon: Zap,
      color: "text-brand",
    },
    {
      label: "Career Risk",
      value: readiness?.career_risk ?? "—",
      icon: ShieldAlert,
      color: "text-primary",
    },
  ];

  const skillsPreview = [
    ...(profile?.technicalSkills ?? []).slice(0, 2),
    ...(profile?.professionalSkills ?? []).slice(0, 1),
  ].join(", ");

  const snapshot = profile
    ? [
        { label: "Current Role", value: profile.jobTitle || "—", icon: Briefcase },
        { label: "Industry", value: profile.industry || "—", icon: Building2 },
        {
          label: "Experience",
          value: profile.experience ? `${profile.experience} years` : "—",
          icon: Clock,
        },
        {
          label: "Primary Skills",
          value: skillsPreview || "—",
          icon: Cpu,
        },
        {
          label: "Current AI Usage",
          value: profile.aiFrequency
            ? `${profile.aiFrequency}${profile.aiTools?.length ? ` · ${profile.aiTools.length} tools` : ""}`
            : "—",
          icon: Lightbulb,
        },
        {
          label: "Specialization",
          value: profile.specialization || profile.domain || "—",
          icon: Map,
        },
      ]
    : [];
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962

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

<<<<<<< HEAD
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
=======
      {readiness?.insight && (
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand mb-2">Key insight</p>
          <p className="text-foreground/90 leading-relaxed">{readiness.insight}</p>
        </div>
      )}

      {snapshot.length > 0 && (
        <div>
          <h3 className="mb-6 font-display text-2xl font-bold">Career Snapshot</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snapshot.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-border bg-background/50 p-5 shadow-sm hover:bg-muted/50 transition-colors"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  <div className="font-semibold text-foreground truncate">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
    </div>
  );
}
