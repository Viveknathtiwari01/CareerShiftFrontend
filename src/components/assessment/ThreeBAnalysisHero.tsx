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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-xl bg-gradient-to-br from-[#E2B75A] to-[#C99933] px-5 py-5 md:px-8 md:py-6 text-white shadow-lg relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/85 mb-2">
          CareerShift Core Engine
        </p>

        <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl text-white">
          My Future Work Design
        </h2>

        <p className="mt-1.5 text-sm text-white/90">
          {totalHours} hours today, redistributed by what technology can now do.
        </p>

        <div className="mt-5 mb-4 flex h-2.5 w-full overflow-hidden rounded-full bg-black/20">
          <div className="bg-[#0F3460]" style={{ width: `${botPct}%` }} />
          <div style={{ width: `${blendPct}%`, backgroundColor: BLEND_BAR }} />
          <div className="bg-white" style={{ width: `${buildPct}%` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg bg-[#1A365D]/90 px-4 py-3 border border-white/10 text-left">
            <div className="text-xl font-bold text-white leading-tight">
              {botH} hrs <span className="text-base font-bold">BOT</span>
            </div>
            <div className="text-xs font-medium text-white/75 mt-0.5">
              {botAnnual} hrs/yr · automate within 30 days
            </div>
          </div>
          <div
            className="rounded-lg px-4 py-3 border border-white/20 text-left"
            style={{ backgroundColor: BLEND_CARD }}
          >
            <div className="text-xl font-bold text-white leading-tight">
              {blendH} hrs <span className="text-base font-bold">BLEND</span>
            </div>
            <div className="text-xs font-medium text-white/85 mt-0.5">
              {blendAnnual} hrs/yr · augmentable with AI
            </div>
          </div>
          <div className="rounded-lg bg-white/95 px-4 py-3 shadow-sm text-left">
            <div className="text-xl font-bold text-[#C99933] leading-tight">
              {buildH} hrs <span className="text-base font-bold">BUILD</span>
            </div>
            <div className="text-xs font-semibold text-black/65 mt-0.5">
              {buildAnnual} hrs/yr · human capability central
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
