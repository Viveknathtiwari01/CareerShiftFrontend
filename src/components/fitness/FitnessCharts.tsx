import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AIFitnessResult } from "@/api/readiness";

const MIX_COLORS = {
  BUILD: "var(--color-build)",
  BLEND: "var(--color-blend)",
  BOT: "var(--color-bot-accent)",
};

export function ReadinessFactorChart({ factors }: { factors: AIFitnessResult["factors"] }) {
  const data = factors.map((f) => ({
    name: f.label.split(" ")[0],
    fullName: f.label,
    score: f.score,
    contribution: f.contribution,
  }));

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
      <h3 className="mb-4 font-display text-lg font-bold text-center">Factor scores</h3>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const row = payload[0].payload as (typeof data)[0];
                return (
                  <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-soft">
                    <p className="font-semibold text-foreground">{row.fullName}</p>
                    <p className="text-muted-foreground">Score: {row.score}/100</p>
                    <p className="text-brand">Contribution: {row.contribution}</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="var(--color-brand)" maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PortfolioMixChart({ mix }: { mix: Record<string, number> }) {
  const total = (mix.BUILD ?? 0) + (mix.BLEND ?? 0) + (mix.BOT ?? 0);
  if (total === 0) return null;

  const data = [
    { key: "BUILD", label: "Build", value: mix.BUILD ?? 0, pct: Math.round(((mix.BUILD ?? 0) / total) * 100) },
    { key: "BLEND", label: "Blend", value: mix.BLEND ?? 0, pct: Math.round(((mix.BLEND ?? 0) / total) * 100) },
    { key: "BOT", label: "Bot", value: mix.BOT ?? 0, pct: Math.round(((mix.BOT ?? 0) / total) * 100) },
  ].filter((d) => d.value > 0);

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
      <h3 className="mb-4 font-display text-lg font-bold text-center">3B portfolio mix</h3>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" hide domain={[0, total]} />
            <YAxis
              type="category"
              dataKey="label"
              width={52}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const row = payload[0].payload as (typeof data)[0];
                return (
                  <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-soft">
                    <p className="font-semibold">{row.label}: {row.value} tasks</p>
                    <p className="text-muted-foreground">{row.pct}% of portfolio</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {data.map((entry) => (
                <Cell key={entry.key} fill={MIX_COLORS[entry.key as keyof typeof MIX_COLORS]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
