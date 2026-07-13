import { CheckCircle2, Circle, ArrowRightCircle, Sparkles } from "lucide-react";

const progressSteps = [
  { name: "Career Profile", status: "Completed", icon: CheckCircle2, color: "text-emerald-500" },
  { name: "AI Assessment", status: "Completed", icon: CheckCircle2, color: "text-emerald-500" },
  { name: "Career Intelligence Report", status: "Ready", icon: Sparkles, color: "text-amber-500" },
  { name: "Learning Roadmap", status: "Next", icon: ArrowRightCircle, color: "text-primary" },
  { name: "Workshop", status: "Recommended", icon: Circle, color: "text-muted-foreground" },
  {
    name: "Career Transformation",
    status: "In Progress",
    icon: Circle,
    color: "text-muted-foreground",
  },
];

export function PersonalizedProgress() {
  return (
    <div className="py-6 border-y border-border my-6">
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Your Career Journey</h2>
        </div>

        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border text-center max-w-2xl mx-auto">
          <p className="text-base font-medium text-foreground">
            "You've already completed the most difficult step—understanding where you stand. Now
            let's focus on building where you're going."
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {progressSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-3 text-center bg-card rounded-lg border border-border shadow-sm"
            >
              <step.icon className={`h-6 w-6 mb-2 ${step.color}`} />
              <p className="text-xs font-semibold text-foreground mb-1 leading-tight">
                {step.name}
              </p>
              <p
                className={`text-[10px] font-medium uppercase tracking-wider ${step.status === "Next" || step.status === "Ready" ? "text-primary" : "text-muted-foreground"}`}
              >
                {step.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
