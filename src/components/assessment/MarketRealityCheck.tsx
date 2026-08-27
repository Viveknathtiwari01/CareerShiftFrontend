import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MarketReality } from "@/api/analysis";

interface Props {
  data?: MarketReality | null;
}

export function MarketRealityCheck({ data }: Props) {
  const [showPivot, setShowPivot] = useState(false);

  // If there's no data, we'll still render the frame with fallback text based on the design mockup
  const fallbackTrendText = "Roles matching your profile have seen postings soften as companies automate the BOT and BLEND share of this work — down roughly 12% year over year, with AI-tool fluency now named in 3x more listings than two years ago. That's a signal to act on, not a verdict.";
  const trendText = data?.trend_text || fallbackTrendText;

  return (
    <div className="bg-[#1f2735] text-white rounded-xl p-6 md:p-8 shadow-xl mt-6">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
        <h3 className="text-[22px] font-bold font-serif text-white">Market Reality Check</h3>
        <span className="text-[12px] text-white/50">Illustrative — production version uses live labor-market trend data</span>
      </div>
      
      <p className="text-white/80 text-[14px] leading-relaxed mb-6">
        {trendText}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div className="bg-transparent rounded-lg p-5 border border-white/20">
          <h4 className="font-bold text-[15px] text-white mb-1.5">Strengthen your position here</h4>
          <p className="text-[13px] text-white/70 mb-5 leading-snug">Your BUILD tasks are exactly what makes you harder to replace. Start there.</p>
          <button className="text-[13px] font-semibold bg-[#c2911b] hover:bg-[#a67c17] text-white py-1.5 px-4 rounded-full transition-colors">
            Open your top BUILD task
          </button>
        </div>
        
        <div className="bg-transparent rounded-lg p-5 border border-white/20">
          <h4 className="font-bold text-[15px] text-white mb-1.5">Know your options, just in case</h4>
          <p className="text-[13px] text-white/70 mb-5 leading-snug">A self-directed look at adjacent roles that reuse your strongest capabilities — worth knowing, not a plan to leave.</p>
          <button 
            onClick={() => setShowPivot(!showPivot)}
            className="text-[13px] font-semibold border border-white/40 hover:bg-white/10 text-white py-1.5 px-4 rounded-full transition-colors"
          >
            {showPivot ? "Hide pivot map" : "Show pivot map"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPivot && data?.pivot_roles && data.pivot_roles.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-white/10 mt-4 space-y-4">
              <h4 className="font-semibold text-white">Adjacent roles mapping</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.pivot_roles.map((role, i) => (
                  <div key={i} className="bg-[#2D3748]/50 rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-[#63B3ED]">{role.name}</h5>
                      <span className="text-xs bg-[#4A5568] px-2 py-1 rounded text-white/90">
                        {role.transfer_strength} Transfer
                      </span>
                    </div>
                    <p className="text-sm text-white/80 mb-2"><span className="text-white/50">Reuses:</span> {role.reuses}</p>
                    <p className="text-xs text-white/60 italic">{role.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

