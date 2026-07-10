
import { useState } from "react";
import { deriveReport, useAssessment } from "@/store/mock-store";



function ROI() {
  const { submitted } = useAssessment();
  const report = deriveReport(submitted);
  const [rate, setRate] = useState(75);
  const [toolCost, setToolCost] = useState(80);
  const weeklySavings = report.hoursSaved * rate;
  const monthlyNet = weeklySavings * 4 - toolCost;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="font-display text-3xl font-bold tracking-tight">Cost & ROI</h1>
      <p className="mt-2 text-muted-foreground">Estimate the payback of your AI adoption plan.</p>
      <div className="surface-card mt-8 grid gap-6 p-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium">Your hourly value ($)</span>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium">Monthly tool spend ($)</span>
          <input
            type="number"
            value={toolCost}
            onChange={(e) => setToolCost(Number(e.target.value))}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Metric label="Hours saved / wk" value={`${report.hoursSaved}h`} />
        <Metric label="Weekly value" value={`$${weeklySavings.toLocaleString()}`} />
        <Metric label="Net monthly ROI" value={`$${monthlyNet.toLocaleString()}`} tone />
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: boolean }) {
  return (
    <div className={`surface-card p-5 ${tone ? "bg-teal/5" : ""}`}>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

export default ROI;
