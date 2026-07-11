import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function WorkshopCTA() {
  return (
    <div className="py-6">
      <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Ready to Build Your AI Future?
          </h2>
          
          <p className="text-sm text-muted-foreground">
            Join CareerShift's practical AI workshop and start using AI confidently in your everyday work.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button size="default" className="w-full sm:w-auto font-semibold">
              Enroll in Workshop <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            <Button variant="outline" size="default" className="w-full sm:w-auto">
              <Play className="mr-2 w-4 h-4" /> Watch Preview Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
