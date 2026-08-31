import { ArrowRight, Sparkles, Map, ClipboardList, CheckCircle2, Info } from "lucide-react";
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

  if (status === "COMPLETED") {
    return (
      <div className="py-2">
        <div className="bg-[#FDFBF2] border border-[#E8C96A]/40 rounded-2xl px-6 py-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1.5">
            <span className="text-[15px] font-bold text-[#0A121F]">
              Your Career Shift is Underway
            </span>
            <span className="text-[14px] text-muted-foreground">
              Based on your profile and 3B analysis you can see your <strong className="text-foreground font-semibold">AI fitness report</strong>, <strong className="text-foreground font-semibold">Career Identity</strong>, <strong className="text-foreground font-semibold">Suggested AI tools</strong> and <strong className="text-foreground font-semibold">Assessment history</strong> from the sidebar.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="space-y-4">
        {status === "NEEDS_PROFILE" && (
          <ActionCard
            title="Recommended Next Step: Complete Your Career Profile"
            description="Your next step is to complete your Career Profile. This gives us the baseline to understand your professional background."
            ctaText="Go to My Profile"
            ctaLink="/my-profile"
            icon={Map}
          />
        )}

        {status === "NEEDS_ASSESSMENT" && (
          <ActionCard
            title="Recommended Next Step: Complete Career Assessment"
            description="Your next step is to complete your Career Assessment to evaluate your current daily tasks and AI usage."
            ctaText="Start Assessment"
            ctaLink="/assessment"
            icon={ClipboardList}
          />
        )}

        {status === "NEEDS_3B" && (
          <ActionCard
            title="Recommended Next Step: Generate 3B Analysis"
            description="Your next step is to go to the 3B page to generate your personalized 3B analysis (Build, Bot, Blend)."
            ctaText="Go to 3B Analysis"
            ctaLink="/3b-analysis"
            icon={CheckCircle2}
          />
        )}

        {status === "NEEDS_REPORT" && (
          <ActionCard
            title="Recommended Next Step: Generate Intelligence Report"
            description="Based on your 3B analysis you can generate your Intelligence report to get actionable career insights."
            ctaText="Generate Report"
            ctaLink="/report"
            icon={Sparkles}
          />
        )}
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
}: {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-[#FDFBF2] border border-[#E8C96A]/40 rounded-2xl px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <Icon className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1.5">
          <span className="text-[15px] font-bold text-[#0A121F]">
            {title}
          </span>
          <span className="text-[14px] text-muted-foreground">
            {description}
          </span>
        </div>
      </div>
      <div className="shrink-0 mt-2 md:mt-0">
        <Button
          asChild
          size="sm"
          className="w-full md:w-auto bg-[#E8C96A] hover:bg-[#F3D782] text-[#0a121f] rounded-full h-10 px-5 font-semibold text-[14px] border-none shadow-none"
        >
          <Link to={ctaLink}>
            {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
