const modules = [
  {
    title: "Understanding AI",
    description: "Demystify AI, learn what it can (and can't) do, and understand its role in the modern workplace.",
    duration: "45 mins",
  },
  {
    title: "Prompt Engineering",
    description: "Master the art of talking to AI. Learn frameworks to get the exact output you need, every time.",
    duration: "1.5 hours",
  },
  {
    title: "Daily AI Workflows",
    description: "Integrate AI into your daily routines. From email management to meeting summaries and research.",
    duration: "1 hour",
  },
  {
    title: "Using AI at Work",
    description: "Role-specific applications. See how marketers, managers, and analysts use AI to multiply their output.",
    duration: "1 hour",
  },
  {
    title: "AI Productivity Tools",
    description: "Beyond ChatGPT. Explore the ecosystem of AI tools for presentations, data analysis, and automation.",
    duration: "1 hour",
  },
  {
    title: "Career Growth Strategy",
    description: "Position yourself as an AI-augmented professional. Update your resume and LinkedIn to reflect your new skills.",
    duration: "45 mins",
  },
];

export function LearningTimeline() {
  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">What You Will Learn</h2>
        <p className="mt-1 text-sm text-muted-foreground">A step-by-step curriculum to transform how you work.</p>
      </div>

      <div className="space-y-4">
        {modules.map((mod, index) => (
          <div 
            key={index}
            className="bg-card border border-border p-4 rounded-xl shadow-sm flex gap-4"
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{index + 1}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="text-sm font-semibold text-foreground">{mod.title}</h3>
                <span className="text-xs font-medium text-muted-foreground mt-1 sm:mt-0">
                  {mod.duration}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{mod.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
