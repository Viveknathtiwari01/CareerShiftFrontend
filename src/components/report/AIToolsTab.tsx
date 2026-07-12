import { motion } from "framer-motion";
import { Terminal, Briefcase, Megaphone, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export function AIToolsTab() {
  const categories = [
    {
      title: "Development Tools",
      icon: Terminal,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      tools: [
        { name: "Cursor", desc: "AI-first code editor built for pair programming.", uses: "Refactoring, boilerplate generation, in-context debugging.", why: "Aligns with your backend architecture focus.", gain: "40%" },
        { name: "GitHub Copilot", desc: "Inline code completion and chat.", uses: "Writing test cases, translating code, regex.", why: "Industry standard, seamless workflow integration.", gain: "25%" },
        { name: "Claude 3.5 Sonnet", desc: "Advanced reasoning model with deep context window.", uses: "System design, log analysis, architectural reviews.", why: "Exceptional at parsing large architectural codebases.", gain: "30%" }
      ]
    },
    {
      title: "Business & Productivity",
      icon: Briefcase,
      color: "text-brand",
      bg: "bg-brand/10",
      border: "border-brand/20",
      tools: [
        { name: "Notion AI", desc: "Connected workspace AI assistant.", uses: "Drafting technical specs, meeting summaries.", why: "Helps translate technical work to business stakeholders.", gain: "20%" },
        { name: "Perplexity", desc: "AI-powered search engine.", uses: "Researching new libraries, troubleshooting errors.", why: "Faster than traditional documentation search.", gain: "35%" },
        { name: "Gamma", desc: "AI presentation generator.", uses: "Creating architecture slide decks quickly.", why: "Elevates your leadership and presentation readiness.", gain: "50% (on presentations)" }
      ]
    },
    {
      title: "Marketing & Design",
      icon: Megaphone,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      tools: [
        { name: "Midjourney", desc: "AI image generation.", uses: "Conceptual architecture diagrams, blog graphics.", why: "Adds visual flair to your technical writing.", gain: "N/A" },
        { name: "Canva AI", desc: "Accessible design suite with AI tools.", uses: "Quick mockups, personal branding.", why: "Low barrier to entry for non-designers.", gain: "N/A" }
      ]
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {categories.map((cat, cIdx) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: cIdx * 0.15 }}
          key={cat.title} 
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-xl ${cat.bg} border ${cat.border}`}>
              <cat.icon className={`h-6 w-6 ${cat.color}`} />
            </div>
            <h3 className="font-display text-2xl font-bold">{cat.title}</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {cat.tools.map((tool, idx) => (
              <div key={idx} className="rounded-3xl border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <h4 className="font-bold text-xl">{tool.name}</h4>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold border border-brand/20">
                    <TrendingUp className="h-3 w-3" /> +{tool.gain}
                  </div>
                </div>
                
                <p className="text-muted-foreground font-medium text-sm mb-6 flex-1">
                  {tool.desc}
                </p>

                <div className="space-y-4 text-sm bg-muted/30 p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 block">Best Use Cases</span>
                    <div className="font-semibold">{tool.uses}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Sparkles className="h-3 w-3 text-brand"/> Why We Recommend It</span>
                    <div className="font-semibold text-primary">{tool.why}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
