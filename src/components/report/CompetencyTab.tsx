import { motion } from "framer-motion";
import { Terminal, Briefcase, Users, Brain } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

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

  if (!groups.length) {
    return (
      <p className="text-muted-foreground text-center py-12">No competency data in this report.</p>
    );
  }

  return (
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
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
