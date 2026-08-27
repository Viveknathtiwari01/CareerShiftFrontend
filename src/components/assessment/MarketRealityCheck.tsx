import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MarketReality } from "@/api/analysis";

interface Props {
  data?: MarketReality | null;
}

export function MarketRealityCheck({ data }: Props) {
  const [showPivot, setShowPivot] = useState(false);

  const trendText = data?.trend_text?.trim();
  const pivotRoles = data?.pivot_roles ?? [];
  if (!trendText && pivotRoles.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#1f2735] text-white rounded-xl px-5 py-4 md:px-6 md:py-5 shadow-lg mt-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
        <h3 className="text-lg font-bold font-serif text-white">Market Reality Check</h3>
        <span className="text-[11px] text-white/50">
          Based on your profile and task mix — not live labor-market statistics
        </span>
      </div>

      {trendText && (
        <p className="text-white/80 text-sm leading-relaxed mb-3">{trendText}</p>
      )}

      {pivotRoles.length > 0 && (
        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <p className="text-xs text-white/60">
            Adjacent roles that reuse your strongest capabilities
          </p>
          <button
            type="button"
            onClick={() => setShowPivot(!showPivot)}
            className="shrink-0 text-xs font-semibold border border-white/35 hover:bg-white/10 text-white py-1 px-3 rounded-full transition-colors"
          >
            {showPivot ? "Hide pivot map" : "Show pivot map"}
          </button>
        </div>
      )}

      <AnimatePresence>
        {showPivot && pivotRoles.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pivotRoles.map((role, i) => (
                  <div
                    key={i}
                    className="bg-[#2D3748]/50 rounded-lg p-3 border border-white/5"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <h5 className="font-semibold text-sm text-[#63B3ED]">{role.name}</h5>
                      <span className="text-[10px] bg-[#4A5568] px-2 py-0.5 rounded text-white/90">
                        {role.transfer_strength} Transfer
                      </span>
                    </div>
                    <p className="text-xs text-white/80 mb-1">
                      <span className="text-white/50">Reuses:</span> {role.reuses}
                    </p>
                    <p className="text-[11px] text-white/60 italic">{role.note}</p>
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
