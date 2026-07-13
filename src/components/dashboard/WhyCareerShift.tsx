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
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-6xl">
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Why We Built CareerShift
          </h2>
          <div className="space-y-4 text-medium text-muted-foreground leading-relaxed mb-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {truths.map((truth, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-[#141F32] rounded-full border border-[#E2E8F0]"
              >
                <truth.icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-medium font-medium text-white/80">{truth.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
