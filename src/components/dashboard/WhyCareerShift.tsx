import { BrainCircuit, Target, Lightbulb, Compass, Zap } from "lucide-react";

const truths = [
  { text: "Replace AI anxiety with specific, actionable clarity.", icon: Lightbulb },
  { text: "Diagnose your exact daily tasks (BUILD, BOT, or BLEND).", icon: Target },
  { text: "Avoid generic advice like 'learn AI' and focus on your role.", icon: Compass },
  { text: "Cut through the 'AI Fog' and know exactly where to start.", icon: BrainCircuit },
  { text: "Provide a personalized roadmap you can execute in hours.", icon: Zap },
];

export function WhyCareerShift() {
  return (
    <div className="py-6">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="grid lg:grid-cols-2">
          {/* Left Side: Text Content */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
              Why We Built CareerShift
            </h2>
            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                We built CareerShift to solve a massive problem:{" "}
                <strong className="text-foreground">The "AI Fog."</strong>
              </p>
              <p>
                Professionals feel AI anxiety but lack specificity. You read headlines about AI
                replacing jobs, but you have no idea whether your specific daily tasks are at risk.
                Generic advice like "just learn AI" or "get certified" doesn't help because it ignores
                your unique, role-specific reality.
              </p>
              <p>
                CareerShift exists to bridge the gap between awareness that AI is changing work, and
                giving you the actionable clarity on exactly what to do about it:
              </p>
            </div>
          </div>

          {/* Right Side: List of Truths */}
          <div className="bg-muted/30 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center">
            <div className="space-y-4">
              {truths.map((truth, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border shadow-sm hover:border-primary/50 transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0 mt-0.5">
                    <truth.icon className="h-5 w-5" />
                  </div>
                  <span className="text-base font-medium text-foreground leading-snug">
                    {truth.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
