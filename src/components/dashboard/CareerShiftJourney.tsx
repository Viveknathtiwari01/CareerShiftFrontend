import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useJourneyStatus, type JourneyStatus } from "@/hooks/use-journey-status";
import { cn } from "@/lib/utils";

type StepState = "completed" | "current" | "upcoming";

const STEPS = [
  { id: "profile", label: "Profile" },
  { id: "work", label: "Work Mapping" },
  { id: "analysis", label: "Analysis" },
  { id: "report", label: "Your Report" },
] as const;

function getStepStates(status: JourneyStatus): StepState[] {
  if (status === "LOADING" || status === "NEEDS_PROFILE") {
    return ["current", "upcoming", "upcoming", "upcoming"];
  }
  if (status === "NEEDS_ASSESSMENT") {
    return ["completed", "current", "upcoming", "upcoming"];
  }
  if (status === "NEEDS_3B") {
    return ["completed", "completed", "current", "upcoming"];
  }
  if (status === "NEEDS_REPORT") {
    return ["completed", "completed", "completed", "current"];
  }
  return ["completed", "completed", "completed", "completed"];
}

function getCta(status: JourneyStatus): { text: string; to: string; blurb: string } {
  switch (status) {
    case "NEEDS_PROFILE":
      return {
        text: "Complete My Profile",
        to: "/my-profile",
        blurb: "Start by completing your profile so we can understand your professional background.",
      };
    case "NEEDS_ASSESSMENT":
      return {
        text: "Continue My Work Mapping",
        to: "/assessment",
        blurb: "You're on your way! Complete your work mapping to see your full analysis and CareerShift report.",
      };
    case "NEEDS_3B":
      return {
        text: "Generate 3B Analysis",
        to: "/3b-analysis",
        blurb: "Great progress! Generate your Build, Bot and Blend analysis to unlock personalized opportunities.",
      };
    case "NEEDS_REPORT":
      return {
        text: "Generate My Report",
        to: "/report",
        blurb: "Your analysis is ready. Generate your CareerShift report for clear next actions.",
      };
    case "COMPLETED":
      return {
        text: "View My Report",
        to: "/report",
        blurb: "Your CareerShift journey is complete. Explore your report, toolkit, and next steps.",
      };
    default:
      return {
        text: "Continue",
        to: "/my-profile",
        blurb: "Loading your progress…",
      };
  }
}

export function CareerShiftJourney() {
  const status = useJourneyStatus();
  const states = getStepStates(status);
  const cta = getCta(status);
  const isLoading = status === "LOADING";

  return (
    <section className="overflow-hidden rounded-2xl bg-[#0B1D3A] px-5 py-6 text-white shadow-elevated sm:px-7 sm:py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1 overflow-hidden lg:pr-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Your CareerShift Journey
          </h2>

          <div className="relative mt-6 overflow-hidden">
            <div className="relative grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
              {STEPS.map((step, index) => {
                const state = states[index];
                const prevCompleted = index > 0 && states[index - 1] === "completed";
                const isLast = index === STEPS.length - 1;

                return (
                  <div key={step.id} className="relative flex flex-col items-center text-center">
                    {/* Line from previous step → this step (desktop only) */}
                    {index > 0 && (
                      <div
                        className="absolute right-1/2 top-5 hidden h-[2px] w-full -translate-y-1/2 sm:block"
                        aria-hidden
                      >
                        <div
                          className={cn(
                            "h-full w-full rounded-full",
                            prevCompleted ? "bg-[#F2C94C]" : "bg-white/20",
                          )}
                        />
                      </div>
                    )}
                    {/* Soft stop so nothing paints past the last step */}
                    {!isLast && (
                      <div
                        className="absolute left-1/2 top-5 hidden h-[2px] w-full -translate-y-1/2 sm:block"
                        aria-hidden
                      >
                        <div
                          className={cn(
                            "h-full w-full rounded-full",
                            state === "completed" ? "bg-[#F2C94C]" : "bg-white/20",
                          )}
                        />
                      </div>
                    )}

                    <div
                      className={cn(
                        "relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                        state === "completed" && "bg-white text-[#0B1D3A]",
                        state === "current" && "bg-[#F2C94C] text-[#0B1D3A] ring-4 ring-[#F2C94C]/25",
                        state === "upcoming" &&
                          "border-2 border-white/35 bg-[#0B1D3A] text-white/80",
                      )}
                    >
                      {state === "completed" ? (
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <p
                      className={cn(
                        "mt-2.5 text-[13px] font-semibold leading-tight",
                        state === "current" ? "text-[#F2C94C]" : "text-white",
                      )}
                    >
                      {step.label}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-[11px] font-medium",
                        state === "completed" && "text-white/55",
                        state === "current" && "text-[#F2C94C]/90",
                        state === "upcoming" && "text-white/40",
                      )}
                    >
                      {state === "completed"
                        ? "Completed"
                        : state === "current"
                          ? "In Progress"
                          : "Not Started"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 border-t border-white/10 pt-5 lg:w-[280px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:w-[300px]">
          <p className="text-[13px] leading-relaxed text-white/70">
            {isLoading ? "Checking your progress…" : cta.blurb}
          </p>
          {isLoading ? (
            <Button
              disabled
              className="h-11 w-full rounded-full bg-[#F2C94C] px-5 text-[14px] font-semibold text-[#0B1D3A] opacity-60"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              asChild
              className="h-11 w-full rounded-full bg-[#F2C94C] px-5 text-[14px] font-semibold text-[#0B1D3A] hover:bg-[#F7D76A]"
            >
              <Link to={cta.to}>
                {cta.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
