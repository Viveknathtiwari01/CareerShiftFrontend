import { User, ClipboardList, Briefcase, Sparkles, FileText, BookOpen, TrendingUp } from "lucide-react";

const steps = [
  { step: 1, title: "Understand Yourself", name: "Career Profile", icon: User },
  { step: 2, title: "Analyze Your Work", name: "AI Assessment", icon: ClipboardList },
  { step: 3, title: "Discover AI Opportunities", name: "Task Routing (BUILD, BOT, BLEND)", icon: Briefcase },
  { step: 4, title: "Measure Readiness", name: "AI Readiness Score", icon: Sparkles },
  { step: 5, title: "Create Your Career Identity", name: "Career Intelligence Report", icon: FileText },
  { step: 6, title: "Learn", name: "Workshops & Upskill Roadmap", icon: BookOpen },
  { step: 7, title: "Grow", name: "Continuous Improvement", icon: TrendingUp },
];

export function CareerShiftJourney() {
  return (
    <div className="py-6">
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">How CareerShift Helps You</h2>
        <p className="mt-2 text-base text-muted-foreground">Your step-by-step roadmap to AI fluency.</p>
      </div>

      <div className="relative border-l border-border ml-3 md:ml-4 space-y-4">
        {steps.map((item, index) => (
          <div key={index} className="relative pl-6 md:pl-8">
            <div className="absolute left-[-0.85rem] top-1 h-6 w-6 rounded-full bg-background border border-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{item.step}</span>
            </div>
            
            <div className="bg-card border border-border p-3 rounded-lg shadow-sm flex items-center gap-3">
              <div className="bg-muted p-2 rounded-md text-primary">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{item.name}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
