import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DashboardHero() {
  return (
    <section className="hero-ink p-8 sm:p-12">
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Welcome to your career advantage
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight">
          AI Is Not Here to Replace You.
          <br className="hidden sm:block" />
          It's Here to Redefine How You Work.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-sidebar-foreground/75 leading-relaxed">
          CareerShift gives you a personalized diagnosis of your AI exposure, with the tools,
          courses, and timelines to upskill with confidence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto font-semibold">
            <Link to="/my-profile">Start My AI Journey</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-sidebar-foreground/20 bg-transparent text-sidebar-foreground hover:bg-white/8 hover:text-sidebar-foreground"
          >
            Watch 2-Min Intro
          </Button>
        </div>
      </div>
    </section>
  );
}
