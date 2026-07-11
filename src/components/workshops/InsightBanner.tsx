import { motion } from "framer-motion";
import { ArrowUpRight, Target } from "lucide-react";

export function InsightBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-xl p-5 border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
    >
      <div>
        <h3 className="text-xs font-semibold text-primary tracking-wide uppercase flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" /> Assessment Insight
        </h3>
        <p className="mt-1.5 text-base font-medium text-foreground max-w-md">
          Strengthen your practical AI skills over the next 90 days.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 md:flex-nowrap shrink-0">
        <div className="bg-muted/50 rounded-lg p-3 border border-border/50 min-w-[110px]">
          <p className="text-[11px] text-muted-foreground font-medium mb-0.5">Readiness</p>
          <p className="text-lg font-bold">76<span className="text-xs font-normal text-muted-foreground">/100</span></p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 border border-border/50 min-w-[140px]">
          <p className="text-[11px] text-muted-foreground font-medium mb-0.5">Focus</p>
          <p className="text-sm font-semibold truncate">Prompt Engineering</p>
        </div>

        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20 min-w-[110px]">
          <p className="text-[11px] text-primary font-medium mb-0.5">Growth</p>
          <p className="text-lg font-bold text-primary flex items-center">
            +18 <ArrowUpRight className="ml-0.5 w-4 h-4 opacity-80" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}
