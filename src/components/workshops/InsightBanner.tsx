import { motion } from "framer-motion";
import { ArrowUpRight, Target, Activity, Zap, TrendingUp } from "lucide-react";

export function InsightBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-soft flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 relative overflow-hidden"
    >
      <div className="flex-1 relative z-10">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          <Target className="w-3.5 h-3.5" /> Based on your assessment
        </div>
        <p className="text-xl font-medium text-foreground max-w-lg leading-relaxed">
          CareerShift recommends strengthening your AI practical skills over the next 90 days.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 lg:flex-nowrap shrink-0 relative z-10 w-full lg:w-auto">
        <div className="bg-muted/50 rounded-xl p-4 border border-border flex-1 min-w-[140px] flex flex-col justify-between group hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Activity className="w-4 h-4 text-primary" />
            <p className="text-xs font-medium uppercase tracking-wider">Current Readiness</p>
          </div>
          <p className="text-3xl font-bold text-foreground">
            76<span className="text-base font-normal text-muted-foreground ml-1">/100</span>
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-xl p-4 border border-border flex-1 min-w-[180px] flex flex-col justify-between group hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Zap className="w-4 h-4 text-warm" />
            <p className="text-xs font-medium uppercase tracking-wider">Recommended Focus</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            <span className="text-sm font-semibold text-primary-foreground bg-primary/90 px-2 py-0.5 rounded">Prompt Engineering</span>
            <span className="text-sm font-semibold text-primary-foreground bg-primary/90 px-2 py-0.5 rounded">Workflows</span>
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 flex-1 min-w-[140px] flex flex-col justify-between group hover:border-primary/40 transition-colors relative overflow-hidden">
          <div className="flex items-center gap-2 text-primary mb-3 relative z-10">
            <TrendingUp className="w-4 h-4 text-primary" />
            <p className="text-xs font-medium uppercase tracking-wider">Expected Growth</p>
          </div>
          <p className="text-3xl font-bold text-primary flex items-center relative z-10">
            +18 <span className="text-base font-medium ml-1">pts</span>
            <ArrowUpRight className="ml-1 w-5 h-5 opacity-80" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}
