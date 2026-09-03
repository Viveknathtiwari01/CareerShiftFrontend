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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden group hover:shadow-md transition-all"
    >
      <div className="absolute top-0 left-0 h-full w-1.5 bg-[#0B1D3A]"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pl-3">
        <h3 className="text-xl font-display font-bold text-foreground">
          Market Reality Check
        </h3>
        <span className="text-[11px] font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full border border-border">
          Based on your profile and task mix
        </span>
      </div>

      <div className="pl-3">
        {trendText && (
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-5">{trendText}</p>
        )}

        {pivotRoles.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground">
              Adjacent roles that reuse your strongest capabilities
            </p>
            <button
              type="button"
              onClick={() => setShowPivot(!showPivot)}
              className="shrink-0 text-xs font-semibold border border-border bg-secondary hover:bg-secondary/80 text-foreground py-1.5 px-4 rounded-full transition-colors"
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
              <div className="pt-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pivotRoles.map((role, i) => (
                    <div
                      key={i}
                      className="bg-background rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-[15px] text-foreground">{role.name}</h5>
                        <span className="text-[10px] font-bold tracking-wide uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                          {role.transfer_strength} Transfer
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1.5">
                        <span className="font-medium text-foreground">Reuses:</span> {role.reuses}
                      </p>
                      <p className="text-[12px] text-muted-foreground/80 italic">{role.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
