import {
  User,
  ClipboardList,
  Briefcase,
  Sparkles,
  FileText,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const steps = [
  { step: 1, title: "Understand Yourself", name: "Career Profile", icon: User },
  { step: 2, title: "Analyze Your Work", name: "AI Assessment", icon: ClipboardList },
  {
    step: 3,
    title: "Discover AI Opportunities",
    name: "Task Routing (BUILD, BOT, BLEND)",
    icon: Briefcase,
  },
  {
    step: 4,
    title: "Create Your Career Identity",
    name: "Career Intelligence Report",
    icon: FileText,
  },
  { step: 5, title: "Learn", name: "Workshops & Upskill Roadmap", icon: BookOpen },
  { step: 6, title: "Grow", name: "Continuous Improvement", icon: TrendingUp },
];

export function CareerShiftJourney() {
  return (
    <div className="py-6">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          How CareerShift Helps You
        </h2>
        <p className="text-lg text-muted-foreground">
          Your step-by-step roadmap to achieving AI fluency and career resilience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {steps.map((item, index) => (
          <div 
            key={index} 
            className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
          >
            {/* Big background number */}
            <div className="absolute -right-2 -bottom-6 text-[120px] font-black text-muted/10 pointer-events-none group-hover:text-primary/5 transition-colors select-none leading-none">
              {item.step}
            </div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-primary">
                Step {item.step}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-medium">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
