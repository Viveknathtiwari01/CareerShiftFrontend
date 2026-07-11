import { Button } from "@/components/ui/button";
import { Play, Sparkles, BrainCircuit } from "lucide-react";

export function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-muted/30 p-8 sm:p-12 shadow-md transition-all hover:shadow-lg">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-6xl flex flex-col">
        {/* Badge */}
        <div className="mb-6 self-center inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>Welcome to your new career advantage</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground leading-tight">
          AI Is Not Here to Replace You.<br className="hidden sm:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600">
            {" "}It's Here to Redefine How You Work.
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-6xl mx-auto">
          Most professionals fear AI because they don't know how to use it effectively. 
          CareerShift gives you a personalized diagnosis of your AI exposure, and pairs it with the exact tools, courses, and timelines to upskill.
        </p>
        
        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl">
            <BrainCircuit className="mr-2 h-5 w-5" />
            Start My AI Journey
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto group transition-all hover:bg-muted/80 border-border/60">
            <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110 text-primary" />
            Watch 2-Min Intro
          </Button>
        </div>
      </div>
    </section>
  );
}
