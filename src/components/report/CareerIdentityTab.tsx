import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function CareerIdentityTab({ report }: Props) {
  const c = report.career_identity;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-background p-8">
        <div className="text-sm font-bold uppercase tracking-wider text-brand mb-2">Identity</div>
        <h3 className="font-display text-3xl font-bold">{c.identity_title}</h3>
        <p className="mt-2 text-muted-foreground">{c.executive_summary}</p>
        <div className="mt-4 inline-flex rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
          {c.confidence_pct}% confidence
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Ideal Roles" items={c.ideal_roles} />
        <Section title="Superpowers" items={c.superpowers} />
        <Section title="Blind Spots" items={c.blind_spots} />
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h4 className="font-bold mb-2">Growth Strategy</h4>
        <p className="text-muted-foreground">{c.growth_strategy}</p>
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border p-6">
      <h4 className="font-bold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
