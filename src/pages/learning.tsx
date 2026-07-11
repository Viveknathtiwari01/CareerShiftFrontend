import { BookOpen, Clock } from "lucide-react";

const WEEKS = [
  { w: "Weeks 1–2", title: "AI foundations", desc: "How LLMs work, prompting basics, safety." },
  { w: "Weeks 3–4", title: "Prompt engineering", desc: "Patterns, chaining, evaluation." },
  { w: "Weeks 5–6", title: "Tools in your workflow", desc: "Integrate 2 tools into daily work." },
  { w: "Weeks 7–8", title: "Automation & agents", desc: "Automate a real task end-to-end." },
  { w: "Weeks 9–10", title: "Domain deep dive", desc: "AI in your specific role & industry." },
  { w: "Weeks 11–12", title: "Ship & measure", desc: "Publish results, calculate ROI." },
];

function Learning() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Your 12-week learning roadmap
      </h1>
      <p className="mt-2 text-muted-foreground">A pragmatic path from curious to fluent.</p>
      <ol className="mt-8 space-y-4">
        {WEEKS.map((w, i) => (
          <li key={w.w} className="surface-card flex gap-4 p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand">
              {i + 1}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Clock className="mr-1 inline h-3 w-3" /> {w.w}
              </p>
              <h3 className="mt-0.5 font-display text-base font-bold">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
            </div>
            <BookOpen className="ml-auto hidden h-5 w-5 shrink-0 text-muted-foreground sm:block" />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Learning;
