import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Clock,
  Cpu,
  Lightbulb,
  Map,
  Activity,
  CheckSquare,
  Award,
  Wrench,
  Zap,
  ShieldAlert,
} from "lucide-react";

export function OverviewTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Overall Score", value: "76", icon: Activity, color: "text-brand" },
          { label: "Tasks Analyzed", value: "18", icon: CheckSquare, color: "text-primary" },
          { label: "Competencies", value: "24", icon: Award, color: "text-primary" },
          { label: "AI Tools Used", value: "3", icon: Wrench, color: "text-primary" },
          { label: "Automation %", value: "31%", icon: Zap, color: "text-brand" },
          { label: "Career Risk", value: "Medium", icon: ShieldAlert, color: "text-primary" },
        ].map((kpi, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={kpi.label}
            className="rounded-2xl border border-border bg-background p-4 shadow-sm"
          >
            <kpi.icon className={`h-5 w-5 mb-3 ${kpi.color}`} />
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="text-xs font-medium text-muted-foreground mt-1">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Career Snapshot */}
      <div>
        <h3 className="mb-6 font-display text-2xl font-bold">Career Snapshot</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: "Current Role", value: "Senior Backend Engineer", icon: Briefcase },
            { label: "Industry", value: "Healthcare Technology", icon: Building2 },
            { label: "Experience", value: "8 Years", icon: Clock },
            { label: "Primary Skills", value: "Node.js, PostgreSQL, AWS", icon: Cpu },
            { label: "Current AI Usage", value: "Daily (Coding Assistant)", icon: Lightbulb },
            { label: "Career Stage", value: "Mid-to-Senior", icon: Map },
          ].map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              key={item.label}
              className="flex items-center gap-4 rounded-xl border border-border bg-background/50 p-5 shadow-sm hover:bg-muted/50 transition-colors"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {item.label}
                </div>
                <div className="font-semibold text-foreground">{item.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
