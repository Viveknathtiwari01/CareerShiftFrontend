import { motion } from "framer-motion";
import { Terminal, Briefcase, Users, Brain } from "lucide-react";
<<<<<<< HEAD
import type { CareerIntelligenceReport } from "@/api/report";
=======
import type { ReportCompetencyGroup } from "@/api/report";
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962

const ICONS: Record<string, typeof Terminal> = {
  Technical: Terminal,
  Business: Briefcase,
  Leadership: Users,
  Behavioural: Brain,
  Behavioral: Brain,
  Digital: Terminal,
};

type Props = { report: CareerIntelligenceReport };

export function CompetencyTab({ report }: Props) {
  const groups = report.competencies;

<<<<<<< HEAD
  if (!groups.length) {
    return (
      <p className="text-muted-foreground text-center py-12">No competency data in this report.</p>
=======
const GROUP_ICONS: Record<string, typeof Terminal> = {
  technical: Terminal,
  business: Briefcase,
  leadership: Users,
  behavioral: Brain,
};

const GROUP_COLORS: Record<string, { color: string; bg: string }> = {
  technical: { color: "text-primary", bg: "bg-primary/10" },
  business: { color: "text-brand", bg: "bg-brand/10" },
  leadership: { color: "text-primary", bg: "bg-primary/10" },
  behavioral: { color: "text-primary", bg: "bg-primary/10" },
};

export function CompetencyTab({ groups }: { groups: ReportCompetencyGroup[] }) {
  if (groups.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
        Competency mapping will appear here once your assessment completes.
      </div>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
    );
  }

  return (
<<<<<<< HEAD
    <div className="space-y-8">
      {groups.map((group, gIdx) => {
        const Icon = ICONS[group.category] ?? Terminal;
        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gIdx * 0.06 }}
            className="rounded-2xl border border-border bg-background p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold">{group.category}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {group.items.map((item) => (
                <div key={String(item.name)} className="rounded-xl border border-border p-4">
                  <div className="font-semibold">{item.name}</div>
                  {item.importance ? (
                    <div className="text-xs text-brand mt-1">Importance: {item.importance}</div>
                  ) : null}
                  {item.expected_level ? (
                    <div className="text-xs text-muted-foreground mt-1">
                      Expected: {item.expected_level}
                    </div>
                  ) : null}
                  {item.why_it_matters ? (
                    <p className="text-sm text-muted-foreground mt-2">{item.why_it_matters}</p>
                  ) : null}
=======
    <div className="space-y-10 animate-in fade-in duration-500">
      {groups.map((group, groupIdx) => {
        const Icon = GROUP_ICONS[group.category_key] ?? Terminal;
        const styles = GROUP_COLORS[group.category_key] ?? GROUP_COLORS.technical;

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIdx * 0.1 }}
            key={group.title}
            className="rounded-3xl border border-border bg-background shadow-sm overflow-hidden"
          >
            <div className="border-b border-border p-6 flex items-center gap-3 bg-muted/30">
              <div className={`p-2 rounded-xl ${styles.bg}`}>
                <Icon className={`h-6 w-6 ${styles.color}`} />
              </div>
              <h3 className="font-display text-xl font-bold">{group.title}</h3>
            </div>

            <div className="p-6 grid gap-6">
              {group.items.map((item, idx) => (
                <div key={idx} className="grid md:grid-cols-[1fr_2fr_1fr] gap-6 items-center">
                  <div>
                    <h4 className="font-bold text-foreground">{item.name}</h4>
                    <div className="flex gap-3 mt-1.5 text-xs font-semibold">
                      <span className="text-muted-foreground uppercase tracking-wider">
                        Importance:
                      </span>
                      <span className={IMPORTANCE_COLORS[item.importance ?? "Medium"] || "text-primary"}>
                        {item.importance ?? "Medium"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>Proficiency</span>
                      <span>{item.proficiency}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.proficiency}%` }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                        className={`h-full rounded-full ${PROFICIENCY_COLORS(item.proficiency)}`}
                      />
                    </div>
                  </div>

                  <div className="md:text-right">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                      Growth Opportunity
                    </div>
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                        GROWTH_STYLES[item.growth] ||
                        "bg-secondary text-secondary-foreground border border-border"
                      }`}
                    >
                      {item.growth}
                    </div>
                  </div>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
