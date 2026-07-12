import { Sparkles, Target, Activity, ShieldAlert, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function ReportHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12 shadow-[0_0_40px_-10px_rgba(var(--primary),0.15)] mb-12"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles className="h-40 w-40" />
      </div>

      <div className="grid lg:grid-cols-3 gap-10 relative z-10">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6 shadow-sm">
            <Target className="h-4 w-4" /> Career Identity
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 mb-4">
            AI-Augmented Backend Engineer
          </h2>
          
          <div className="rounded-2xl border border-border bg-background/50 p-6 shadow-sm mt-8 backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand" /> Executive Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Your strong backend engineering expertise and growing AI adoption position you well for the future. By strengthening AI workflow design and leadership skills, you can transition into high-value AI-augmented engineering roles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-background/50 p-5 shadow-sm backdrop-blur-sm flex flex-col justify-center">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> AI Readiness
            </div>
            <div className="text-3xl font-display font-black text-brand">76<span className="text-lg text-muted-foreground">/100</span></div>
          </div>
          
          <div className="rounded-2xl border border-border bg-background/50 p-5 shadow-sm backdrop-blur-sm flex flex-col justify-center">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" /> Career Risk
            </div>
            <div className="text-2xl font-display font-black text-primary">Medium</div>
          </div>

          <div className="rounded-2xl border border-border bg-background/50 p-5 shadow-sm backdrop-blur-sm flex flex-col justify-center">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" /> Growth
            </div>
            <div className="text-2xl font-display font-black text-primary">High</div>
          </div>

          <div className="rounded-2xl border border-border bg-background/50 p-5 shadow-sm backdrop-blur-sm flex flex-col justify-center">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Automation
            </div>
            <div className="text-3xl font-display font-black text-brand">31%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
