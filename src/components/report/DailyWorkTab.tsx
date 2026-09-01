import { motion } from "framer-motion";
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h3 className="font-display text-3xl font-medium text-[#0A121F] mb-3">Weekly Work Pattern</h3>
        <p className="text-[#718096] text-[16px] font-light">
          {tasks.length} tasks · ~{total} hours/week analyzed
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            key={`${task.title}-${idx}`}
            className="flex flex-col justify-between gap-6 rounded-[2rem] border border-[#EDF2F7] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div>
              <div className="font-display font-medium text-[#0A121F] text-xl mb-4">{task.title}</div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="uppercase tracking-widest text-[10px] font-bold text-[#C9A84C] mb-1">Category</span>
                  <span className="font-medium text-[#0A121F] text-[14px]">{task.category ?? "General"}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="uppercase tracking-widest text-[10px] font-bold text-[#C9A84C] mb-1">Complexity</span>
                  <span className="font-medium text-[#0A121F] text-[14px]">{task.complexity ?? "medium"}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-[#EDF2F7] pt-6 flex items-end justify-between">
              <div>
                <div className="uppercase tracking-widest text-[10px] font-bold text-[#C9A84C] mb-1">Time Spent</div>
                <div className="font-display font-medium text-3xl text-[#0A121F] leading-none">{task.hours_per_week ?? 0} <span className="text-lg text-[#718096] font-light">h/wk</span></div>
              </div>
              {task.ai_assistance ? (
                <div className="flex flex-col text-right">
                  <span className="uppercase tracking-widest text-[10px] font-bold text-[#C9A84C] mb-1">AI Assist</span>
                  <span className="font-medium text-[#0A121F] text-[14px]">{task.ai_assistance}</span>
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
