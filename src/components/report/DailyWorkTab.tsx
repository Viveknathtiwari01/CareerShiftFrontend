<<<<<<< HEAD
import type { CareerIntelligenceReport } from "@/api/report";
=======
import { motion } from "framer-motion";
import { Clock, Briefcase, Zap, ShieldCheck, PieChart } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { ReportDailyWorkSection } from "@/api/report";
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962

type Props = { report: CareerIntelligenceReport };

<<<<<<< HEAD
export function DailyWorkTab({ report }: Props) {
  const tasks = report.daily_work.tasks as Array<{
    title?: string;
    hours_per_week?: number;
    category?: string;
    complexity?: string;
    ai_assistance?: string;
  }>;
  const total = report.daily_work.total_hours_per_week;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-background p-6">
        <h3 className="font-display text-xl font-bold mb-2">Weekly Work Pattern</h3>
        <p className="text-muted-foreground text-sm mb-6">
          {tasks.length} tasks · ~{total} hours/week analyzed
        </p>
        <div className="space-y-3">
          {tasks.map((task, idx) => (
            <div
              key={`${task.title}-${idx}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4"
            >
              <div>
                <div className="font-semibold">{task.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {task.category ?? "General"} · {task.complexity ?? "medium"} complexity
=======
const AI_USAGE_COLORS: Record<string, string> = {
  High: "text-brand",
  Medium: "text-primary",
  Low: "text-muted-foreground",
  None: "text-muted-foreground",
};

const COLOR_MAP: Record<string, string> = {
  brand: "var(--color-brand)",
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  muted: "var(--color-muted-foreground)",
};

export function DailyWorkTab({ dailyWork }: { dailyWork: ReportDailyWorkSection | null }) {
  if (!dailyWork || dailyWork.tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
        Daily work breakdown will appear here once tasks are saved and analyzed.
      </div>
    );
  }

  const chartData = dailyWork.time_allocation.map((slice) => ({
    name: slice.name,
    value: slice.value,
    color: COLOR_MAP[slice.color] ?? COLOR_MAP.primary,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-border bg-background p-6 shadow-sm"
          >
            <h3 className="font-display text-xl font-bold flex items-center gap-2 mb-6">
              <PieChart className="h-5 w-5 text-primary" /> Time Allocation
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    itemStyle={{ fontWeight: "bold" }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-border bg-primary/5 p-6 shadow-sm"
          >
            <div className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
              Total Weekly Hours
            </div>
            <div className="text-5xl font-display font-black text-foreground">
              {dailyWork.total_hours}
              <span className="text-2xl text-muted-foreground">h</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3 font-medium">{dailyWork.summary}</p>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display text-2xl font-bold mb-6">Confirmed Daily Tasks</h3>
          {dailyWork.tasks.map((task, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              key={`${task.name}-${idx}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <h4 className="font-bold text-lg">{task.name}</h4>
                {task.category_3b && (
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {task.category_3b}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Time
                  </span>
                  <span className="text-foreground">{task.time_label}/wk</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> Criticality
                  </span>
                  <span
                    className={
                      CRITICALITY_COLORS[task.criticality ?? "Medium"] || "text-muted-foreground"
                    }
                  >
                    {task.criticality ?? "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <Zap className="h-3 w-3" /> AI Usage
                  </span>
                  <span className={AI_USAGE_COLORS[task.ai_usage ?? "Low"] || "text-muted-foreground"}>
                    {task.ai_usage ?? "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Confidence
                  </span>
                  <span className="text-primary">{task.confidence ?? "—"}</span>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="font-semibold">{task.hours_per_week ?? 0}h/wk</div>
                {task.ai_assistance ? (
                  <div className="text-xs text-muted-foreground">AI: {task.ai_assistance}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
