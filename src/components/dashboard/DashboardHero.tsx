import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function DashboardHero() {
  return (
    <section className="bg-card border border-border rounded-xl px-6 py-10 sm:px-10 lg:px-12 text-center shadow-sm">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground leading-tight">
          AI Is not Here to Replace You.<br /> It's Here to Redefine How You Work.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Most professionals fear AI because they don't know how to use it effectively. 
          CareerShift gives you a personalized, task-level diagnosis of your AI exposure, and pairs it with the exact tools, courses, and timelines to upskill.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="default" className="w-full sm:w-auto font-semibold">
            Start My AI Journey
          </Button>
          <Button variant="outline" size="default" className="w-full sm:w-auto group">
            Watch 2-Minute Introduction <Play className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
