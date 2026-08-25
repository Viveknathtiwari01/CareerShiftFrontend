import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const BRAND = "#c9a84c";
const BRAND_FILL = "rgba(201, 168, 76, 0.4)";
const GRID = "rgba(201, 168, 76, 0.22)";
const AXIS = "#334155";

export type RadarDimension = {
  subject: string;
  A: number;
  fullMark: number;
};

type Props = {
  data: RadarDimension[];
  height?: number;
  showHeader?: boolean;
};

export function AIFitnessRadarChart({ data, height = 380, showHeader = true }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand/25 bg-gradient-to-br from-slate-900/5 via-card to-brand/10 p-6 shadow-soft lg:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-teal/10 blur-3xl" />

      {showHeader ? (
        <div className="relative mb-6">
          <h3 className="type-card-title">Dimension profile</h3>
          <p className="type-body-sm mt-1 text-muted-foreground">
            Your scores across each readiness dimension (0–100)
          </p>
        </div>
      ) : null}

      <div className="relative w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="52%" outerRadius="72%" data={data}>
            <PolarGrid gridType="polygon" stroke={GRID} strokeWidth={1.5} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: AXIS, fontSize: 14, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickCount={5}
            />
            <Radar
              name="Score"
              dataKey="A"
              stroke={BRAND}
              strokeWidth={3}
              fill={BRAND_FILL}
              fillOpacity={0.75}
              dot={{ r: 6, fill: BRAND, stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 8, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                boxShadow: "0 8px 24px rgba(10, 18, 31, 0.08)",
                fontSize: 14,
              }}
              formatter={(value: number) => [`${value} / 100`, "Score"]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {data.map((item) => (
          <span
            key={item.subject}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-sm font-semibold text-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-brand" />
            {item.subject}
            <span className="text-brand">{item.A}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
