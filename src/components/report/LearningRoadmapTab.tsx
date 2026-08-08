<<<<<<< HEAD
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };
=======
import { motion } from "framer-motion";
import { Flag, Target, TrendingUp } from "lucide-react";
import type { ReportRoadmapPhase } from "@/api/report";

const PHASE_STYLES: Record<string, { color: string; bg: string }> = {
  "Next 30 Days": { color: "text-primary", bg: "bg-primary" },
  "Next 90 Days": { color: "text-brand", bg: "bg-brand" },
  "Next 12 Months": { color: "text-primary", bg: "bg-primary" },
};

export function LearningRoadmapTab({ roadmap }: { roadmap: ReportRoadmapPhase[] }) {
  if (roadmap.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
        Your personalized learning roadmap will appear after report generation.
      </div>
    );
  }
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962

export function LearningRoadmapTab({ report }: Props) {
  return (
<<<<<<< HEAD
    <div className="grid gap-6 md:grid-cols-3">
      {report.learning_roadmap.map((phase) => (
        <div key={phase.horizon} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand">{phase.horizon}</div>
          <h3 className="font-display text-lg font-bold mt-2 mb-4">{phase.title}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            {phase.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
=======
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="relative pl-8 md:pl-0">
        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
        <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-border md:hidden" />

        <div className="space-y-12">
          {roadmap.map((phase, pIdx) => {
            const styles = PHASE_STYLES[phase.period] ?? PHASE_STYLES["Next 30 Days"];
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: pIdx * 0.15 }}
                key={phase.period}
                className="relative md:pl-20"
              >
                <div
                  className={`absolute left-0 md:left-8 top-1 h-5 w-5 rounded-full border-4 border-background ${styles.bg} shadow-sm z-10 -ml-2.5 md:-ml-0`}
                />

                <h3
                  className={`font-display text-2xl font-black tracking-tight mb-6 ${styles.color}`}
                >
                  {phase.period}
                </h3>

                <div className="grid gap-4">
                  {phase.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-3xl border border-border bg-background p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{item.title}</h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 font-bold">
                            <Flag className="h-3 w-3" /> Priority
                          </span>
                          <span
                            className={`text-sm font-bold ${item.priority === "High" ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {item.priority}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 font-bold">
                            <Target className="h-3 w-3" /> Effort
                          </span>
                          <span className="text-sm font-semibold">{item.effort}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 font-bold">
                            <TrendingUp className="h-3 w-3" /> Impact
                          </span>
                          <span
                            className={`text-sm font-bold ${item.impact === "Transformational" ? "text-brand" : item.impact === "High" ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {item.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
        </div>
      ))}
    </div>
  );
}
