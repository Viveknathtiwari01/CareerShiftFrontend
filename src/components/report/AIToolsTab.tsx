<<<<<<< HEAD
import type { CareerIntelligenceReport } from "@/api/report";
import { ToolkitToolCard } from "@/components/report/ToolkitToolCard";

type Props = { report: CareerIntelligenceReport };

export function AIToolsTab({ report }: Props) {
  const tools = report.ai_toolkit;

  if (!tools.length) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No personalized tools yet — complete 3B analysis to populate recommendations.
      </p>
=======
import { motion } from "framer-motion";
import { Terminal, Briefcase, Zap, TrendingUp, Sparkles } from "lucide-react";
import type { ReportToolkitCategory } from "@/api/report";

const CATEGORY_ICONS: Record<string, typeof Terminal> = {
  development: Terminal,
  productivity: Briefcase,
  automation: Zap,
  general: Sparkles,
};

const CATEGORY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  development: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  productivity: { color: "text-brand", bg: "bg-brand/10", border: "border-brand/20" },
  automation: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  general: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
};

export function AIToolsTab({ toolkit }: { toolkit: ReportToolkitCategory[] }) {
  if (toolkit.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
        AI toolkit recommendations will appear after 3B analysis and report generation.
      </div>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
    );
  }

  return (
<<<<<<< HEAD
    <div className="space-y-4">
      <p className="type-body-sm text-muted-foreground">
        Ranked by priority for your role — adopt Critical and High tools first for the fastest career impact.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolkitToolCard key={tool.name} tool={tool} variant="light" />
        ))}
      </div>
=======
    <div className="space-y-10 animate-in fade-in duration-500">
      {toolkit.map((cat, cIdx) => {
        const Icon = CATEGORY_ICONS[cat.category_key] ?? Sparkles;
        const styles = CATEGORY_STYLES[cat.category_key] ?? CATEGORY_STYLES.general;

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: cIdx * 0.15 }}
            key={cat.title}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${styles.bg} border ${styles.border}`}>
                <Icon className={`h-6 w-6 ${styles.color}`} />
              </div>
              <h3 className="font-display text-2xl font-bold">{cat.title}</h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {cat.tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <h4 className="font-bold text-xl">{tool.name}</h4>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold border border-brand/20">
                      <TrendingUp className="h-3 w-3" /> +{tool.efficiency_gain}
                    </div>
                  </div>

                  <p className="text-muted-foreground font-medium text-sm mb-6 flex-1">
                    {tool.description}
                  </p>

                  <div className="space-y-4 text-sm bg-muted/30 p-4 rounded-2xl">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 block">
                        Best Use Cases
                      </span>
                      <div className="font-semibold">{tool.use_cases}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-brand" /> Why We Recommend It
                      </span>
                      <div className="font-semibold text-primary">{tool.why}</div>
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
  );
}
