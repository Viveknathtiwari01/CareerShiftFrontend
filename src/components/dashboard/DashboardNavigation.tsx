import { Link } from "react-router-dom";
import {
  User,
  ClipboardList,
  FileText,
  Map,
  GraduationCap,
  Wrench,
  BookOpen,
  Activity,
  ArrowRight,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navCards = [
  {
    title: "My Career",
    purpose: "Understand your strengths.",
    why: "Identify what makes you unique in the AI era.",
    cta: "View Profile",
    icon: User,
    to: "/my-profile",
  },
  {
    title: "AI Assessment",
    purpose: "Evaluate your readiness.",
    why: "Find out where you can improve.",
    cta: "Take Assessment",
    icon: ClipboardList,
    to: "/assessment",
  },
  {
    title: "3B Analysis",
    purpose: "Categorize your tasks.",
    why: "Identify what to Build, Bot, or Blend.",
    cta: "Run Analysis",
    icon: Map,
    to: "/3b-analysis",
  },
  {
    title: "Intelligence Report",
    purpose: "Deep analysis.",
    why: "Actionable insights tailored to your career.",
    cta: "View Report",
    icon: FileText,
    to: "/report",
  },
  {
    title: "AI Readiness Score",
    purpose: "Check your score.",
    why: "See how prepared you are for the AI era.",
    cta: "View Score",
    icon: Target,
    to: "/ai-readiness",
  },
  {
    title: "Workshops",
    purpose: "Master practical skills.",
    why: "Save hours every week with AI workflows.",
    cta: "Explore Workshops",
    icon: GraduationCap,
    to: "/workshops",
  },
  {
    title: "AI Tools",
    purpose: "Discover new solutions.",
    why: "Find the best AI tools for your specific role.",
    cta: "Browse Tools",
    icon: Wrench,
    to: "/toolkit",
  },
  {
    title: "Progress Tracker",
    purpose: "Measure your growth.",
    why: "See how far you've come on your journey.",
    cta: "Track Progress",
    icon: Activity,
    to: "/history",
  },
];

export function DashboardNavigation() {
  return (
    <div className="py-6">
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Explore CareerShift</h2>
          <p className="mt-2 text-base text-muted-foreground">Access your tools and resources.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navCards.map((card, idx) => (
            <Link 
              key={idx} 
              to={card.to} 
              className="block h-full"
            >
              <div className="bg-card border border-border p-4 rounded-xl shadow-sm h-full flex flex-col hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-muted p-1.5 rounded text-primary">
                    <card.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base">{card.title}</h3>
                </div>

                <p className="text-sm text-muted-foreground font-medium mb-1">{card.purpose}</p>
                <p className="text-xs text-muted-foreground/80 mb-4 flex-1">{card.why}</p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs font-semibold justify-between h-9 px-3 bg-[#C9A84C] text-[#0A121F] hover:bg-[#FAD673] hover:text-[#0A121F] mt-auto"
                >
                  {card.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
