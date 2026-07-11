import { motion } from "framer-motion";
import { PlayCircle, StopCircle, Zap, BookOpen, Flag, Target, Clock, AlertTriangle } from "lucide-react";

export function ActionPlanTab() {
  const sections = [
    {
      title: "Start Doing",
      icon: PlayCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      items: [
        { text: "Use AI daily for architecture documentation", priority: "High", impact: "High", time: "2h/wk", diff: "Low" },
        { text: "Treat AI as a pair programmer for complex systems design", priority: "High", impact: "Transformational", time: "4h/wk", diff: "Medium" }
      ]
    },
    {
      title: "Stop Doing",
      icon: StopCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      items: [
        { text: "Writing boilerplate code manually", priority: "High", impact: "Medium", time: "Instant", diff: "Low" },
        { text: "Spending hours on initial log analysis without AI", priority: "Medium", impact: "High", time: "Instant", diff: "Low" }
      ]
    },
    {
      title: "Automate With AI",
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      items: [
        { text: "Unit test generation & initial PR descriptions", priority: "High", impact: "High", time: "3h/wk saved", diff: "Medium" },
        { text: "Tagging and summarizing incoming bug reports", priority: "Medium", impact: "Medium", time: "2h/wk saved", diff: "High" }
      ]
    },
    {
      title: "Learn Next",
      icon: BookOpen,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      items: [
        { text: "Advanced Prompt Engineering (Chain of Thought)", priority: "High", impact: "Transformational", time: "10h", diff: "Medium" },
        { text: "Build prototype using LangChain or LlamaIndex", priority: "High", impact: "High", time: "20h", diff: "High" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((sec, sIdx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: sIdx * 0.1 }}
            key={sec.title} 
            className={`rounded-3xl border ${sec.border} bg-background p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
          >
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${sec.bg}`} />
            
            <h3 className={`mb-6 font-display text-2xl font-bold flex items-center gap-3 ${sec.color}`}>
              <div className={`p-2.5 rounded-xl ${sec.bg}`}>
                <sec.icon className="h-6 w-6" />
              </div>
              {sec.title}
            </h3>

            <div className="space-y-6">
              {sec.items.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-border bg-muted/30 p-5">
                  <h4 className="font-bold text-lg mb-4">{item.text}</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold"><Flag className="h-3 w-3"/> Priority</span>
                      <span className={item.priority === 'High' ? 'text-rose-500' : 'text-blue-500'}>{item.priority}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold"><Target className="h-3 w-3"/> Impact</span>
                      <span className={item.impact === 'Transformational' ? 'text-purple-500' : 'text-emerald-500'}>{item.impact}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold"><Clock className="h-3 w-3"/> Time</span>
                      <span>{item.time}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-1 font-bold"><AlertTriangle className="h-3 w-3"/> Difficulty</span>
                      <span className={item.diff === 'High' ? 'text-rose-500' : item.diff === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}>{item.diff}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
