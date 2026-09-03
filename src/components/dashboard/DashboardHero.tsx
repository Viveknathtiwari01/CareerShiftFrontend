import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function DashboardHero() {
  return (
    <section className="bg-[#0B1D3A] p-8 sm:p-12 md:p-14 lg:p-16 rounded-[2rem] overflow-hidden relative shadow-lg">
      <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-12 items-center w-full">
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-[#E8C96A]">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to your new career advantage</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] leading-[1.1] text-white font-normal tracking-wide">
            AI Is Not Here to Replace You.
            <br className="hidden sm:block" />
            It's Here to Redefine How You Work.
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-[16px] sm:text-[17px] text-white/70 leading-[1.7] max-w-[620px] font-light">
            Most professionals fear AI because they don't know how to use it effectively. CareerShift
            gives you a personalized diagnosis of your AI exposure, and pairs it with the exact tools,
            courses, and timelines to upskill.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto bg-[#E8C96A] hover:bg-[#F3D782] text-[#0B1D3A] rounded-full h-12 px-7 font-semibold text-[15px] border-none">
              <Link to="/my-profile">Start My AI Journey <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/20 bg-transparent text-white rounded-full h-12 px-7 hover:bg-white/10 text-[15px] hover:text-white"
            >
              <Play className="mr-2 w-4 h-4" fill="currentColor" /> Watch 2-Min Intro
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex w-full max-w-[340px] xl:max-w-[380px] aspect-square relative mx-auto items-center justify-center shrink-0">
          <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 340 340">
            <g transform="translate(0,0)">
              <circle cx="170" cy="170" r="150" fill="none" stroke="rgba(241,245,249,.08)" strokeWidth="1"/>
              <g className="origin-center animate-[spin_12s_linear_infinite]">
                <circle cx="170" cy="170" r="128" fill="none" stroke="#0B1D3A" strokeWidth="20" strokeDasharray="80 188" strokeLinecap="round" transform="rotate(-90 170 170)"/>
                <circle cx="170" cy="170" r="128" fill="none" stroke="#c9a84c" strokeWidth="20" strokeDasharray="80 188" strokeLinecap="round" transform="rotate(30 170 170)"/>
                <circle cx="170" cy="170" r="128" fill="none" stroke="#0d9488" strokeWidth="20" strokeDasharray="80 188" strokeLinecap="round" transform="rotate(150 170 170)"/>
              </g>
              <circle cx="170" cy="170" r="86" fill="#0B1D3A" stroke="rgba(241,245,249,.1)"/>
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
