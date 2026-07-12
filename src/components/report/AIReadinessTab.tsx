import { motion } from "framer-motion";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from "recharts";
import { 
  Activity, TrendingUp, AlertTriangle, Lightbulb, Zap, ShieldAlert, CheckCircle2 
} from "lucide-react";

export function AIReadinessTab() {
  const radarData = [
    { subject: 'Tool Adoption', A: 90, fullMark: 100 },
    { subject: 'Automation', A: 65, fullMark: 100 },
    { subject: 'Mindset', A: 85, fullMark: 100 },
    { subject: 'Leadership', A: 50, fullMark: 100 },
    { subject: 'Strategy', A: 60, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Row: Score & Radar */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-border bg-background p-8 flex flex-col justify-center shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/80 to-brand" />
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Overall AI Readiness</div>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-primary/20 bg-primary/5">
              <div className="text-5xl font-display font-black text-primary">76</div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">Good</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-xs">
                You are ahead of many professionals in AI adoption, but there are opportunities to strengthen your leadership and strategic automation.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-border bg-background p-6 shadow-sm flex flex-col"
        >
          <h3 className="mb-4 font-display text-lg font-bold text-center">Competency Radar</h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="var(--color-border)" className="dark:stroke-neutral-800" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11, fontWeight: 600 }} />
                <Radar name="Score" dataKey="A" stroke="var(--color-brand)" strokeWidth={2} fill="var(--color-brand)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Middle Row: Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
          <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-brand" /> Strengths</h3>
          <div className="space-y-4">
            {["Strong Backend Engineering", "Good AI Tool Adoption", "Excellent Problem Solving"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
          <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" /> Improvement Areas</h3>
          <div className="space-y-4">
            {["Prompt Engineering", "AI Workflow Automation", "Strategic Leadership"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-primary shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meters & Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="font-bold">Career Risk Meter</h3>
          </div>
          <div className="text-2xl font-display font-black text-primary mb-2">Medium Risk</div>
          <p className="text-sm font-medium text-muted-foreground">Routine tasks are increasingly AI-assisted.</p>
        </div>

        <div className="rounded-3xl border border-brand/20 bg-brand/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-brand">
            <TrendingUp className="h-5 w-5" />
            <h3 className="font-bold">Opportunity Meter</h3>
          </div>
          <div className="text-2xl font-display font-black text-brand mb-2">High Growth</div>
          <p className="text-sm font-medium text-muted-foreground">Backend + AI positions you very well.</p>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Lightbulb className="h-5 w-5" />
            <h3 className="font-bold">AI Insights</h3>
          </div>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            You use AI for coding, but lack usage in architecture planning and documentation.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
        <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2"><Zap className="h-5 w-5 text-brand" /> Quick Wins</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Learn Prompt Engineering",
            "Automate Unit Testing",
            "Use AI for Code Reviews",
            "Practice AI-assisted Design"
          ].map((win, idx) => (
             <div key={idx} className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/30 p-4">
              <div className="h-6 w-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs">{idx + 1}</div>
              <span className="font-semibold text-sm">{win}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
