import { X, Check } from "lucide-react";

const comparisons = [
  {
    myth: `"AI will take my job."`,
    reality: "AI replaces repetitive tasks—not human judgment, emotional intelligence, and relationship building that AI cannot replicate."
  },
  {
    myth: `"I need to learn to code to survive."`,
    reality: "You need to learn how to blend AI into your specific role to automate data-heavy tasks and free up time for strategic thinking."
  },
  {
    myth: `"Generic AI training is enough."`,
    reality: "An HR Manager's AI journey is completely different from a Financial Controller's. You need role-specific, task-level clarity."
  }
];

export function MythVsReality() {
  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">The AI Myth vs Reality</h2>
        <p className="mt-1 text-sm text-muted-foreground">Separate the fear from the facts.</p>
      </div>

      <div className="space-y-4">
        {comparisons.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-destructive">
                <X className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-wider">Myth</span>
              </div>
              <p className="text-foreground text-sm">{item.myth}</p>
            </div>

            <div className="flex-1 bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Check className="w-4 h-4" />
                <span className="font-bold text-xs uppercase tracking-wider">Reality</span>
              </div>
              <p className="text-foreground text-sm">{item.reality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
