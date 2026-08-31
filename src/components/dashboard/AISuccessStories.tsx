import { User, Award } from "lucide-react";

const stories = [
  {
    role: "Backend Developer",
    impact: "Used AI for documentation and code reviews. Saved 8 hours every week.",
  },
  {
    role: "HR Manager",
    impact: "Uses AI for job descriptions, interview questions, and policy drafting.",
  },
  {
    role: "Marketing Manager",
    impact: "Uses AI for campaign planning and content creation.",
  },
];

export function AISuccessStories() {
  return (
    <div className="py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#0A121F] mb-3">
          AI Success Stories
        </h2>
        <p className="text-[17px] text-[#4A5568] font-light">
          Real professionals using AI to multiply their output.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="bg-[#E6FFFA] p-2.5 rounded-full text-[#38B2AC] shrink-0 border border-[#38B2AC]/10 group-hover:bg-[#B2F5EA] transition-colors duration-300">
                <User className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-[20px] font-medium text-[#0A121F]">{story.role}</h3>
            </div>
            <p className="text-[15px] text-[#4A5568] font-light leading-relaxed">{story.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
