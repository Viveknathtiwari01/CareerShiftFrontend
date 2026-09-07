import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  "Your role, task and skill analysis",
  "Build, Bot and Blend recommendations",
  "Relevant tools and solutions",
  "Practical next actions for your career",
];

function ReportBooklet() {
  return (
    <div
      className="relative mx-auto w-[220px] sm:w-[250px] lg:w-[270px]"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative origin-center"
        style={{
          transform: "rotateY(-18deg) rotateZ(2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft shadow under booklet */}
        <div
          className="pointer-events-none absolute -bottom-4 left-[6%] right-[-4%] h-8 rounded-[100%] bg-[#0B1D3A]/20 blur-lg"
          aria-hidden
        />

        {/* Back white pages */}
        <div
          className="absolute inset-y-2 -right-3 left-3 rounded-[3px] bg-white shadow-md"
          style={{ transform: "translateZ(-8px)" }}
          aria-hidden
        />
        <div
          className="absolute inset-y-1 -right-1.5 left-1.5 rounded-[3px] bg-[#F8FAFC] shadow-sm"
          style={{ transform: "translateZ(-4px)" }}
          aria-hidden
        />

        {/* Spine edge */}
        <div
          className="absolute inset-y-0 left-0 w-2 rounded-l-[4px] bg-[#061225]"
          style={{ transform: "rotateY(90deg) translateZ(0px)", transformOrigin: "left center" }}
          aria-hidden
        />

        {/* Front cover */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-[#0B1D3A] shadow-[12px_18px_40px_rgba(11,29,58,0.28)]">
          <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
            <img
              src="/new_logo_white1.png"
              alt="CareerShift"
              className="h-9 w-auto max-w-[150px] object-contain object-left sm:h-10 sm:max-w-[165px]"
            />

            <div className="mt-auto pb-1">
              <h3 className="font-serif text-[22px] font-semibold leading-[1.15] text-white sm:text-[26px]">
                Your CareerShift
                <br />
                Report
              </h3>
              <div className="mt-3 h-[3px] w-12 rounded-full bg-[#F2C94C]" aria-hidden />
              <p className="mt-4 max-w-[10.5rem] text-[10px] leading-relaxed text-white/75 sm:text-[11px]">
                Your Work. New Possibilities.
                <br />
                A Clearer Tomorrow.
              </p>
            </div>
          </div>

          {/* Gold swoosh */}
          <svg
            className="pointer-events-none absolute -bottom-1 -right-4 h-[58%] w-[78%]"
            viewBox="0 0 220 180"
            fill="none"
            aria-hidden
          >
            <path
              d="M18 168C52 138 78 92 108 62C138 32 172 18 218 28"
              stroke="url(#bookletSwoosh)"
              strokeWidth="34"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="bookletSwoosh"
                x1="18"
                y1="168"
                x2="218"
                y2="28"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F2C94C" />
                <stop offset="0.45" stopColor="#E8B63F" />
                <stop offset="1" stopColor="#C9A84C" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function OverviewReportBanner() {
  return (
    <section className="relative overflow-hidden rounded-[1.5rem] bg-[#F6F1E9]">
      <div className="relative z-10 grid items-center gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-12 lg:py-14">
        <div className="max-w-xl">
          <h2 className="font-serif text-[30px] font-semibold tracking-tight text-[#0B1D3A] sm:text-[36px] lg:text-[40px]">
            Your CareerShift Report
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#5B6B7C] sm:text-[16px]">
            A personalized view of your work, opportunities and next steps.
          </p>

          <ul className="mt-7 space-y-3.5">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-[14px] text-[#4A5568] sm:text-[15px]"
              >
                <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#F59E0B]">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <Button
            asChild
            className="mt-8 h-12 rounded-full bg-[#0B1D3A] px-7 text-[15px] font-semibold text-white hover:bg-[#152A4F]"
          >
            <Link to="/report">
              View My Report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex justify-center lg:justify-end lg:pr-6">
          <ReportBooklet />
        </div>
      </div>
    </section>
  );
}
