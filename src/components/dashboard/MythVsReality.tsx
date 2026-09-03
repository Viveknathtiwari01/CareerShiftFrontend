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
    <div className="py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#0B1D3A] mb-3">
          The AI Myth vs Reality
        </h2>
        <p className="text-[17px] text-[#4A5568] font-light">
          Separate the fear from the facts and understand how AI actually impacts your career.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {comparisons.map((item, idx) => (
          <div key={idx} className="flex flex-col bg-white rounded-[2rem] shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-500 group">
            {/* Myth Section */}
            <div className="p-8 bg-[#FFF5F5] border-b border-red-100 flex-1">
              <div className="flex items-center gap-2 mb-5">
                <X className="w-4 h-4 text-[#E53E3E]" strokeWidth={2} />
                <span className="font-semibold text-[11px] uppercase tracking-wider text-[#E53E3E]">
                  MYTH
                </span>
              </div>
              <p className="text-[#2D3748] text-[15px] font-medium italic">"{item.myth}"</p>
            </div>

            {/* Reality Section */}
            <div className="p-8 bg-white flex-1">
              <div className="flex items-center gap-2 mb-5">
                <Check className="w-4 h-4 text-[#38A169]" strokeWidth={2} />
                <span className="font-semibold text-[11px] uppercase tracking-wider text-[#38A169]">
                  REALITY
                </span>
              </div>
              <p className="text-[#4A5568] text-[15px] font-light leading-relaxed">{item.reality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
