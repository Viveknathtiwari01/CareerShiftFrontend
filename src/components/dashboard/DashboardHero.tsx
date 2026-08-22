import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DashboardHero() {
  return (
    <section className="hero-ink p-8 sm:p-12">
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-12 items-center w-full">
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-[#C9A84C]/20 px-3 py-1 text-sm font-medium text-[#C9A84C] shadow-sm backdrop-blur-sm">
            <span>Welcome to your new career advantage</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight">
            AI Is Not Here to Replace You.
            <br className="hidden sm:block" />
            It's Here to Redefine How You Work.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
            Most professionals fear AI because they don't know how to use it effectively. CareerShift
            gives you a personalized diagnosis of your AI exposure, and pairs it with the exact tools,
            courses, and timelines to upskill.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
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

        <div className="hidden lg:flex w-full max-w-[340px] xl:max-w-[380px] aspect-square relative mx-auto items-center justify-center shrink-0">
          <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 340 340">
            <g transform="translate(0,0)">
              <circle cx="170" cy="170" r="150" fill="none" stroke="rgba(241,245,249,.08)" strokeWidth="1"/>
              <g className="origin-center animate-[spin_12s_linear_infinite]">
                <circle cx="170" cy="170" r="128" fill="none" stroke="#1a273d" strokeWidth="20" strokeDasharray="80 188" strokeLinecap="round" transform="rotate(-90 170 170)"/>
                <circle cx="170" cy="170" r="128" fill="none" stroke="#c9a84c" strokeWidth="20" strokeDasharray="80 188" strokeLinecap="round" transform="rotate(30 170 170)"/>
                <circle cx="170" cy="170" r="128" fill="none" stroke="#0d9488" strokeWidth="20" strokeDasharray="80 188" strokeLinecap="round" transform="rotate(150 170 170)"/>
              </g>
              <circle cx="170" cy="170" r="86" fill="#0a121f" stroke="rgba(241,245,249,.1)"/>
              <text x="170" y="163" textAnchor="middle" fill="#f1f5f9" className="font-mono text-[10px] tracking-[0.2em] font-semibold">THE 3B</text>
              <text x="170" y="182" textAnchor="middle" fill="#e8c96a" className="font-serif italic text-[17px]">Framework</text>
              <text x="80" y="52" fill="#8fa2b8" className="font-mono text-[11px] font-semibold tracking-[0.1em]">BUILD</text>
              <text x="248" y="80" fill="#e8c96a" className="font-mono text-[11px] font-semibold tracking-[0.1em]">BLEND</text>
              <text x="118" y="308" fill="#4fc3b8" className="font-mono text-[11px] font-semibold tracking-[0.1em]">BOT</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
