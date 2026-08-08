import { TrendingUp } from "lucide-react";

const INSIGHTS = [
  {
    title: "AI-augmented roles up 62% YoY",
    body: "Postings mentioning AI tools are growing across every sector.",
  },
  { title: "Prompt engineering: table stakes", body: "Employers now expect fluency, not novelty." },
  {
    title: "The augmentation premium",
    body: "AI-augmented workers report 30–40% productivity lift.",
  },
];

function Insights() {
  return (
<<<<<<< HEAD
    <div className="w-full">
=======
    <div>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
      <h1 className="font-display text-3xl font-bold tracking-tight">Market insights</h1>
      <p className="mt-2 text-muted-foreground">What's happening in your field, curated weekly.</p>
      <div className="mt-8 space-y-4">
        {INSIGHTS.map((i) => (
          <div key={i.title} className="surface-card flex gap-4 p-5">
            <TrendingUp className="h-5 w-5 shrink-0 text-brand" />
            <div>
              <h3 className="font-display text-lg font-bold">{i.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{i.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Insights;
