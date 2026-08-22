import { X, Check, ArrowRight } from "lucide-react";

const comparisons = [
  {
    myth: "AI will take my job.",
    reality:
      "AI replaces repetitive tasks—not human judgment, emotional intelligence, and relationship building that AI cannot replicate.",
  },
  {
    myth: "I need to learn to code to survive.",
    reality:
      "You need to learn how to blend AI into your specific role to automate data-heavy tasks and free up time for strategic thinking.",
  },
  {
    myth: "Generic AI training is enough.",
    reality:
      "An HR Manager's AI journey is completely different from a Financial Controller's. You need role-specific, task-level clarity.",
  },
];

export function MythVsReality() {
  return (
    <div className="py-6">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          The AI Myth vs Reality
        </h2>
        <p className="text-lg text-muted-foreground">Separate the fear from the facts and understand how AI actually impacts your career.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {comparisons.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            {/* Myth Section */}
            <div className="p-6 bg-red-500/5 border-b border-red-500/10 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <X className="w-5 h-5 text-red-500" strokeWidth={3} />
                <span className="font-bold text-xs uppercase tracking-widest text-red-500">
                  Myth
                </span>
              </div>
              <p className="text-foreground/80 font-medium italic">"{item.myth}"</p>
            </div>

            {/* Reality Section */}
            <div className="p-6 bg-green-500/5 flex-1 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full p-1 shadow-sm z-10">
                <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
                <span className="font-bold text-xs uppercase tracking-widest text-green-500">
                  Reality
                </span>
              </div>
              <p className="text-foreground leading-relaxed">{item.reality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
