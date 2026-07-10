
import { ExternalLink } from "lucide-react";



const TOOLS = [
  { name: "ChatGPT", cat: "Chat & reasoning", use: "Drafting, summaries, brainstorming" },
  { name: "Claude", cat: "Long-context writing", use: "Docs, research synthesis" },
  { name: "Cursor", cat: "Code", use: "Pair-programming in your editor" },
  { name: "Perplexity", cat: "Research", use: "Cited, up-to-date answers" },
  { name: "Notion AI", cat: "Docs", use: "In-line writing & summarizing" },
  { name: "Zapier", cat: "Automation", use: "Wire AI into your workflows" },
];

function Toolkit() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="font-display text-3xl font-bold tracking-tight">Your AI toolkit</h1>
      <p className="mt-2 text-muted-foreground">Curated tools matched to your role and tasks.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <div key={t.name} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">{t.name}</h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand">{t.cat}</p>
            <p className="mt-3 text-sm text-muted-foreground">{t.use}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toolkit;
