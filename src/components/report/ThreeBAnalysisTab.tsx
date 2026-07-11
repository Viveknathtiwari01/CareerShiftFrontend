import { motion } from "framer-motion";
import { Wrench, Bot, Users } from "lucide-react";

export function ThreeBAnalysisTab() {
  const sections = [
    {
      title: "BUILD (Core Human Value)",
      icon: Wrench,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      tasks: [
        { name: "System Architecture Design", reason: "Requires deep context, strategic foresight, and cross-system understanding.", auto: "10%", tools: "Claude (for brainstorming)", importance: "High" },
        { name: "Complex Debugging", reason: "Requires intuition and tracing across unmapped legacy systems.", auto: "20%", tools: "Cursor (for context mapping)", importance: "High" }
      ]
    },
    {
      title: "BOT (Automate Completely)",
      icon: Bot,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      tasks: [
        { name: "Boilerplate Code Generation", reason: "Standardized patterns that LLMs excel at generating instantly.", auto: "95%", tools: "GitHub Copilot", importance: "Low" },
        { name: "Initial Log Parsing", reason: "Pattern recognition in text is a native strength of AI models.", auto: "85%", tools: "ChatGPT Advanced Data Analysis", importance: "Medium" }
      ]
    },
    {
      title: "BLEND (Human + AI Collaboration)",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      tasks: [
        { name: "Code Review & PRs", reason: "AI can catch syntax and basic logic errors, but human needs to review business logic.", auto: "60%", tools: "CodeRabbit, Cursor", importance: "High" },
        { name: "Writing Documentation", reason: "AI drafts perfectly, human reviews for nuance and tone.", auto: "80%", tools: "Notion AI, ChatGPT", importance: "Medium" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "BUILD", count: 6, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "BOT", count: 5, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "BLEND", count: 7, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        ].map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={item.label} 
            className="rounded-2xl border border-border bg-background p-6 shadow-sm text-center"
          >
            <div className={`mx-auto w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-3`}>
              <span className={`font-black ${item.color}`}>{item.label[0]}</span>
            </div>
            <div className="text-3xl font-bold">{item.count}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">{item.label} Tasks</div>
          </motion.div>
        ))}
      </div>

      {/* Task Sections */}
      <div className="space-y-8">
        {sections.map((section, sIdx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (sIdx * 0.1) }}
            key={section.title} 
            className={`rounded-3xl border ${section.border} bg-background overflow-hidden shadow-sm`}
          >
            <div className={`p-5 flex items-center gap-3 ${section.bg}`}>
              <section.icon className={`h-6 w-6 ${section.color}`} />
              <h3 className={`font-display text-xl font-bold ${section.color}`}>{section.title}</h3>
            </div>
            
            <div className="divide-y divide-border">
              {section.tasks.map((task, idx) => (
                <div key={idx} className="p-6 grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <h4 className="font-bold text-lg mb-2">{task.name}</h4>
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${section.bg} ${section.color}`}>
                      {section.title.split(' ')[0]}
                    </span>
                  </div>
                  
                  <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Reasoning</div>
                      <p className="text-sm font-medium">{task.reason}</p>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Automation Potential</div>
                      <div className="font-bold text-lg">{task.auto}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Future Importance</div>
                      <div className="font-bold">{task.importance}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Recommended Tools</div>
                      <div className="text-sm font-semibold text-primary">{task.tools}</div>
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
