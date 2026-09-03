import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";

export function DailyInsight() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Today's Insight
        </h3>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed mb-4">
        "Professionals who combine domain expertise with AI consistently outperform those who rely
        on either one alone."
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded">
          2 Min Read
        </span>
        <Button
          variant="ghost"
          className="px-3 h-8 bg-[#0B1D3A] text-[#F9F7F3] text-xs font-semibold hover:bg-[#0B1D3A] hover:text-white rounded rounded-lg"
        >
          Learn More <ArrowRight className="ml-2 w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
