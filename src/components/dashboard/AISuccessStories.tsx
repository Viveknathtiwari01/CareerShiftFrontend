import { User } from "lucide-react";

const stories = [
  {
    role: "Backend Developer",
    impact: "Used AI for documentation and code reviews. Saved 8 hours every week."
  },
  {
    role: "HR Manager",
    impact: "Uses AI for job descriptions, interview questions, and policy drafting."
  },
  {
    role: "Marketing Manager",
    impact: "Uses AI for campaign planning and content creation."
  }
];

export function AISuccessStories() {
  return (
    <div className="py-6">
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">AI Success Stories</h2>
        <p className="mt-2 text-base text-muted-foreground">Real professionals using AI to multiply their output.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stories.map((story, idx) => (
          <div key={idx} className="bg-card border border-border p-4 rounded-xl shadow-sm flex gap-3">
            <div className="bg-muted p-2 rounded-lg h-min">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base mb-1">{story.role}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{story.impact}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
