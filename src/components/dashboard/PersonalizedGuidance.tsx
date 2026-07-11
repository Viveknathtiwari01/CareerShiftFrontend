import { ArrowRight, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Review Your Career Intelligence Report",
    why: "Your assessment is complete. Reviewing this report will give you a clear baseline of your current AI readiness.",
    time: "10 mins",
    impact: "Provides immediate clarity on your strengths and gaps.",
    cta: "View Report",
    priority: "High"
  },
  {
    title: "Start Prompt Engineering Workshop",
    why: "This is the foundational skill required to communicate effectively with AI tools in your daily work.",
    time: "1.5 hours",
    impact: "Saves you 2-4 hours per week by automating drafting and research.",
    cta: "Start Workshop",
    priority: "Medium"
  }
];

export function PersonalizedGuidance() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Recommended Next Actions</h2>
        <p className="mt-1 text-sm text-muted-foreground">Personalized guidance based on your profile.</p>
      </div>

      <div className="space-y-3">
        {actions.map((action, idx) => (
          <div key={idx} className="bg-card border border-border p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground text-sm">{action.title}</h3>
                {action.priority === "High" && (
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Priority
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3">{action.why}</p>
              
              <div className="flex flex-wrap gap-3 text-[10px]">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary" />
                  <span><strong className="text-foreground">Est. Time:</strong> {action.time}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Target className="w-3 h-3 text-primary" />
                  <span><strong className="text-foreground">Impact:</strong> {action.impact}</span>
                </div>
              </div>
            </div>
            
            <div className="shrink-0">
              <Button size="sm" variant={action.priority === "High" ? "default" : "outline"} className="w-full md:w-auto text-xs h-8">
                {action.cta} <ArrowRight className="ml-2 w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
