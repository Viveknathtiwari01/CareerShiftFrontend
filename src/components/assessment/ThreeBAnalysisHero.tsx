import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getTaskAnalysis } from "@/api/analysis";

interface Props {
  assessmentId?: string | null;
}

const BLEND_BAR = "#c9a84c";
const BLEND_CARD = "#b8923a";

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
  const total = totalHours || 1;

  const buildPct = Math.round((buildH / total) * 100);
  const blendPct = Math.round((blendH / total) * 100);
  const botPct = Math.round((botH / total) * 100);

  const buildAnnual = hoursSummary?.BUILD?.annual_hours || 0;
  const blendAnnual = hoursSummary?.BLEND?.annual_hours || 0;
  const botAnnual = hoursSummary?.BOT?.annual_hours || 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card px-6 py-8 md:px-10 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-75"></div>
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
          CareerShift Core Engine
        </p>

        <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl text-foreground">
          My Future Work Design
        </h2>

        <p className="mt-2 text-[15px] text-muted-foreground">
          {totalHours} hours today, redistributed by what technology can now do.
        </p>

        <div className="mt-8 mb-6 flex h-3 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div initial={{ width: 0 }} animate={{ width: `${botPct}%` }} transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }} className="bg-blue-600" />
          <motion.div initial={{ width: 0 }} animate={{ width: `${blendPct}%` }} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} className="bg-amber-500" />
          <motion.div initial={{ width: 0 }} animate={{ width: `${buildPct}%` }} transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} className="bg-emerald-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div whileHover={{ y: -2 }} className="rounded-xl bg-blue-50 border border-blue-200 px-5 py-4 text-left shadow-sm transition-transform">
            <div className="text-2xl font-bold text-blue-900 leading-tight">
              {botH} hrs <span className="text-[15px] font-semibold text-blue-700">BOT</span>
            </div>
            <div className="text-xs font-medium text-blue-600/80 mt-1.5">
              {botAnnual} hrs/yr · automate within 30 days
            </div>
          </motion.div>
          
          <motion.div whileHover={{ y: -2 }} className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-left shadow-sm transition-transform">
            <div className="text-2xl font-bold text-amber-900 leading-tight">
              {blendH} hrs <span className="text-[15px] font-semibold text-amber-700">BLEND</span>
            </div>
            <div className="text-xs font-medium text-amber-700/80 mt-1.5">
              {blendAnnual} hrs/yr · augmentable with AI
            </div>
          </motion.div>
          
          <motion.div whileHover={{ y: -2 }} className="rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-left shadow-sm transition-transform">
            <div className="text-2xl font-bold text-emerald-900 leading-tight">
              {buildH} hrs <span className="text-[15px] font-semibold text-emerald-700">BUILD</span>
            </div>
            <div className="text-xs font-medium text-emerald-700/80 mt-1.5">
              {buildAnnual} hrs/yr · human capability central
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
