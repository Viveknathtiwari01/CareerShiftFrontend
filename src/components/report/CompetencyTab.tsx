import { motion } from "framer-motion";
import { Terminal, Briefcase, Users, Brain, ChevronRight } from "lucide-react";
import type { CareerIntelligenceReport } from "@/api/report";

const ICONS: Record<string, typeof Terminal> = {
  Technical: Terminal,
  Business: Briefcase,
  Leadership: Users,
  Behavioural: Brain,
  Behavioral: Brain,
  Digital: Terminal,
};

type Props = { report: CareerIntelligenceReport };

export function CompetencyTab({ report }: Props) {
  const groups = report.competencies;

  if (!groups.length) {
    return (
      <p className="text-[#718096] text-center py-12 font-light">No competency data in this report.</p>
    );
  }

  return (
    <div className="space-y-12">
      {groups.map((group, gIdx) => {
        const Icon = ICONS[group.category] ?? Terminal;
        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gIdx * 0.06 }}
            className="mb-16"
          >
            <div className="flex flex-col items-center justify-center gap-4 mb-10 text-center">
              <h3 className="font-display text-3xl font-medium text-[#0A121F] flex items-center gap-3">
                <Icon className="h-7 w-7 text-[#C9A84C]" /> {group.category} Competencies
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  key={String(item.name)} 
                  className="rounded-[2rem] border border-[#EDF2F7] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="flex-grow">
                    <div className="font-display font-medium text-[#0A121F] text-xl mb-4">{item.name}</div>
                    <div className="flex items-center justify-between">
                      {item.importance ? (
                        <div className="flex flex-col">
                          <span className="font-bold text-[10px] uppercase tracking-widest text-[#C9A84C] mb-1">Importance</span>
                          <span className="text-[#0A121F] font-medium text-[14px]">{item.importance}</span>
                        </div>
                      ) : null}
                      {item.expected_level ? (
                        <div className="flex flex-col text-right">
                          <span className="font-bold text-[10px] uppercase tracking-widest text-[#C9A84C] mb-1">Expected</span>
                          <span className="text-[#0A121F] font-medium text-[14px]">{item.expected_level}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {item.why_it_matters ? (
                    <p className="text-[14px] text-[#718096] font-light mt-6 leading-relaxed border-t border-[#EDF2F7] pt-6">{item.why_it_matters}</p>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
