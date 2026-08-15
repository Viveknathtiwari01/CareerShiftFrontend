import { ArrowRight, Sparkles, Map, ClipboardList, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useJourneyStatus } from "@/hooks/use-journey-status";

export function PersonalizedGuidance() {
  const status = useJourneyStatus();

  if (status === "LOADING") {
    return (
      <div className="py-6">
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded mb-4"></div>
          <div className="h-4 w-1/2 bg-muted rounded mb-6"></div>
          <div className="h-24 bg-muted/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {status === "COMPLETED" ? "Your Career Shift is Underway" : "Recommended Next Action"}
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Personalized guidance based on your journey progress.
          </p>
        </div>

        <div className="space-y-4">
          {status === "NEEDS_PROFILE" && (
            <ActionCard
              title="Complete Your Career Profile"
              description="Your next step is to complete your Career Profile. This gives us the baseline to understand your professional background."
              ctaText="Go to My Profile"
              ctaLink="/my-profile"
              icon={Map}
              isPrimary
            />
          )}

          {status === "NEEDS_ASSESSMENT" && (
            <ActionCard
              title="Complete Career Assessment"
              description="Your next step is to complete your Career Assessment to evaluate your current daily tasks and AI usage."
              ctaText="Start Assessment"
              ctaLink="/assessment"
              icon={ClipboardList}
              isPrimary
            />
          )}

          {status === "NEEDS_3B" && (
            <ActionCard
              title="Generate 3B Analysis"
              description="Your next step is to go to the 3B page to generate your personalized 3B analysis (Build, Bot, Blend)."
              ctaText="Go to 3B Analysis"
              ctaLink="/3b-analysis"
              icon={CheckCircle2}
              isPrimary
            />
          )}

          {status === "NEEDS_REPORT" && (
            <ActionCard
              title="Generate Intelligence Report"
              description="Based on your 3B analysis you can generate your Intelligence report to get actionable career insights."
              ctaText="Generate Report"
              ctaLink="/report"
              icon={Sparkles}
              isPrimary
            />
          )}

          {status === "COMPLETED" && (
            <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl text-sm text-foreground leading-relaxed">
              Based on your profile and 3B analysis you can see your <strong>AI readiness report</strong>, <strong>Career Identity</strong>, <strong>Suggested AI tools</strong> and <strong>Assessment history</strong> by clicking on options from the Sidebar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  ctaText,
  ctaLink,
  icon: Icon,
  isPrimary,
}: {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon: React.ElementType;
  isPrimary?: boolean;
}) {
  return (
    <div className="bg-card border border-border p-5 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${isPrimary ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground text-lg">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0 mt-2 md:mt-0">
        <Button
          asChild
          size="sm"
          className={`w-full md:w-auto h-10 px-6 font-semibold ${
            isPrimary 
              ? "bg-primary text-primary-foreground shadow-soft hover:opacity-90" 
              : "bg-background border border-border hover:bg-muted"
          }`}
        >
          <Link to={ctaLink}>
            {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
