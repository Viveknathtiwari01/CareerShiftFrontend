import { motion } from "framer-motion";
import {
  PlayCircle,
  StopCircle,
  Zap,
  BookOpen,
  Flag,
  Target,
  Clock,
  AlertTriangle,
} from "lucide-react";
import type { ReportActionPlanSection } from "@/api/report";

const PRIORITY_COLORS: Record<string, string> = {
  High: "text-primary",
  Medium: "text-muted-foreground",
  Low: "text-muted-foreground",
};

const IMPACT_COLORS: Record<string, string> = {
  Transformational: "text-brand",
  High: "text-primary",
  Medium: "text-primary",
  Low: "text-muted-foreground",
};

const DIFF_COLORS: Record<string, string> = {
  High: "text-brand",
  Medium: "text-primary",
  Low: "text-muted-foreground",
};

const SECTIONS = [
  {
    key: "start_doing" as const,
    title: "Start Doing",
    icon: PlayCircle,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    key: "stop_doing" as const,
    title: "Stop Doing",
    icon: StopCircle,
    color: "text-brand",
    bg: "bg-brand/10",
    border: "border-brand/20",
  },
  {
    key: "automate_with_ai" as const,
    title: "Automate With AI",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    key: "learn_next" as const,
    title: "Learn Next",
    icon: BookOpen,
    color: "text-brand",
    bg: "bg-brand/10",
    border: "border-brand/20",
  },
];

export function ActionPlanTab({ actionPlan }: { actionPlan: ReportActionPlanSection | null }) {
  if (!actionPlan) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
        Your action plan will appear after the career intelligence report is generated.
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-8">
        {SECTIONS.map((sec, sIdx) => {
          const items = actionPlan[sec.key];
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: sIdx * 0.1 }}
              key={sec.title}
              className={`rounded-3xl border ${sec.border} bg-background p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${sec.bg}`} />

              <h3
                className={`mb-6 font-display text-2xl font-bold flex items-center gap-3 ${sec.color}`}
              >
                <div className={`p-2.5 rounded-xl ${sec.bg}`}>
                  <sec.icon className="h-6 w-6" />
                </div>
                {sec.title}
              </h3>

              <div className="space-y-6">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No items in this category yet.</p>
                ) : (
                  items.map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-border bg-muted/30 p-5">
                      <h4 className="font-bold text-lg mb-4">{item.text}</h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold">
                            <Flag className="h-3 w-3" /> Priority
                          </span>
                          <span className={PRIORITY_COLORS[item.priority] || "text-muted-foreground"}>
                            {item.priority}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold">
                            <Target className="h-3 w-3" /> Impact
                          </span>
                          <span className={IMPACT_COLORS[item.impact] || "text-muted-foreground"}>
                            {item.impact}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold">
                            <Clock className="h-3 w-3" /> Time
                          </span>
                          <span>{item.time}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold">
                            <AlertTriangle className="h-3 w-3" /> Difficulty
                          </span>
                          <span className={DIFF_COLORS[item.difficulty] || "text-muted-foreground"}>
                            {item.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
