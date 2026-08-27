import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTaskAnalysis } from "@/api/analysis";

interface Props {
  assessmentId?: string | null;
}

export function ThreeBAnalysisHero({ assessmentId }: Props) {
  const { data } = useQuery({
    queryKey: ["assessment-analysis", assessmentId],
    queryFn: () => getTaskAnalysis(assessmentId!),
    enabled: !!assessmentId,
    staleTime: 60_000,
  });

  const hoursSummary = data?.hours_summary;
  const totalHours = data?.total_hours || 0;

  const buildH = hoursSummary?.BUILD?.weekly_hours || 0;
  const blendH = hoursSummary?.BLEND?.weekly_hours || 0;
  const botH = hoursSummary?.BOT?.weekly_hours || 0;
  const total = totalHours || 1; // prevent div by zero

  const buildPct = Math.round((buildH / total) * 100);
  const blendPct = Math.round((blendH / total) * 100);
  const botPct = Math.round((botH / total) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-[1rem] bg-gradient-to-br from-[#E2B75A] to-[#C99933] p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/90">

          CareerShift Core Engine
        </div>

        <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-white drop-shadow-sm">
          My Future Work Design
        </h2>

        <p className="mt-4 text-lg text-white/90 font-medium">
          {totalHours} hours today, redistributed by what technology can now do.
        </p>

        {/* Progress Bar */}
        <div className="mt-10 mb-6 flex h-4 w-full overflow-hidden rounded-full bg-black/20 backdrop-blur-sm">
          <div className="bg-[#0F3460] transition-all duration-1000" style={{ width: `${botPct}%` }} />
          <div className="bg-[#4BB5CC] transition-all duration-1000" style={{ width: `${blendPct}%` }} />
          <div className="bg-[#FFFFFF] transition-all duration-1000" style={{ width: `${buildPct}%` }} />
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BOT */}
          <div className="rounded-xl bg-[#1A365D]/90 p-5 backdrop-blur-xs border border-white/10 shadow-lg text-left">
            <div className="text-3xl font-bold text-white drop-shadow-sm mb-1">{botH} hrs <span className="text-xl">BOT</span></div>
            <div className="text-sm font-medium text-white/80">(automate within 30 days)</div>
          </div>
          {/* BLEND */}
          <div className="rounded-xl bg-[#00B4D8]/90 p-5 backdrop-blur-xs border border-white/10 shadow-lg text-left">
            <div className="text-3xl font-bold text-white drop-shadow-sm mb-1">{blendH} hrs <span className="text-xl">BLEND</span></div>
            <div className="text-sm font-medium text-white/80">(augmentable with AI)</div>
          </div>
          {/* BUILD */}
          <div className="rounded-xl bg-white/95 p-5 backdrop-blur-xs shadow-lg text-left">
            <div className="text-3xl font-bold text-[#C99933] drop-shadow-sm mb-1">{buildH} hrs <span className="text-xl">BUILD</span></div>
            <div className="text-sm font-bold text-black/70">(human capability central)</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
