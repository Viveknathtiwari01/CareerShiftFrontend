import { motion } from "framer-motion";
import { Clock, Briefcase, Zap, ShieldCheck, PieChart } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const CRITICALITY_COLORS: Record<string, string> = {
  High: 'text-brand',
  Medium: 'text-primary',
  Low: 'text-muted-foreground'
};

const AI_USAGE_COLORS: Record<string, string> = {
  High: 'text-brand',
  Medium: 'text-primary',
  Low: 'text-muted-foreground',
  None: 'text-muted-foreground'
};

export function DailyWorkTab() {
  const tasks = [
    { name: "API Endpoint Design", time: "10h", criticality: "High", ai: "High", confidence: "95%" },
    { name: "Database Schema Updates", time: "5h", criticality: "High", ai: "Low", confidence: "90%" },
    { name: "Code Review & PRs", time: "8h", criticality: "Medium", ai: "Medium", confidence: "85%" },
    { name: "Writing Documentation", time: "4h", criticality: "Low", ai: "None", confidence: "70%" },
    { name: "Bug Fixing", time: "8h", criticality: "High", ai: "Medium", confidence: "80%" },
    { name: "Team Meetings", time: "5h", criticality: "Medium", ai: "None", confidence: "100%" },
  ];

  const chartData = [
    { name: "Coding & Arch", value: 23, color: "var(--color-brand)" },
    { name: "Reviews", value: 8, color: "var(--color-primary)" },
    { name: "Docs", value: 4, color: "var(--color-accent)" },
    { name: "Meetings", value: 5, color: "var(--color-muted-foreground)" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
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
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ fontWeight: 'bold' }}
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
            <div className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Total Weekly Hours</div>
            <div className="text-5xl font-display font-black text-foreground">40<span className="text-2xl text-muted-foreground">h</span></div>
            <p className="text-sm text-muted-foreground mt-3 font-medium">
              Based on your reported tasks, you spend the majority of your time on deep technical work.
            </p>
          </motion.div>
        </div>

        {/* Task List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display text-2xl font-bold mb-6">Confirmed Daily Tasks</h3>
          {tasks.map((task, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (idx * 0.05) }}
              key={task.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <h4 className="font-bold text-lg">{task.name}</h4>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1"><Clock className="h-3 w-3"/> Time</span>
                  <span className="text-foreground">{task.time}/wk</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1"><Briefcase className="h-3 w-3"/> Criticality</span>
                  <span className={CRITICALITY_COLORS[task.criticality] || 'text-muted-foreground'}>{task.criticality}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1"><Zap className="h-3 w-3"/> AI Usage</span>
                  <span className={AI_USAGE_COLORS[task.ai] || 'text-muted-foreground'}>{task.ai}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1"><ShieldCheck className="h-3 w-3"/> Confidence</span>
                  <span className="text-primary">{task.confidence}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
