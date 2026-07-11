import { Brain, Briefcase, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    name: "Learn Practical AI",
    description: "Understand how professionals use AI every day to solve real problems.",
    icon: Brain,
  },
  {
    name: "AI for Your Job",
    description: "See role-specific AI workflows instead of generic tutorials.",
    icon: Briefcase,
  },
  {
    name: "Real Productivity",
    description: "Learn how AI saves hours without replacing your expertise.",
    icon: Zap,
  },
  {
    name: "Future-Proof Your Career",
    description: "Develop the skills employers expect in the AI era.",
    icon: ShieldCheck,
  },
];

export function PremiumCards() {
  return (
    <div className="py-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Why This Workshop?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We don't teach you how to build AI. We teach you how to use it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="bg-card rounded-xl p-5 border border-border shadow-sm flex gap-4"
          >
            <div className="rounded-md bg-primary/10 p-2 h-fit">
              <feature.icon className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{feature.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
