import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  Hammer,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import {
  formatCostBand,
  formatFeasibilityLabel,
  getComponentTools,
  updateTaskStatus,
  type AnalyzedTask,
  type ThreeBCategory,
  type ToolOption,
} from "@/api/analysis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const FRAMEWORK = {
  BUILD: {
    label: "BUILD",
    icon: Hammer,
    accent: "text-build",
    accentBg: "bg-build",
    soft: "bg-build-soft",
    bg: "bg-build-soft/80",
    bgStrong: "bg-blue-100/90",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-900 border-blue-300",
    header: "bg-build-soft border-blue-200",
    bar: "bg-build",
    ring: "ring-build/40",
    gradient: "from-blue-100 via-build-soft to-white",
    statCell: "border-blue-200 bg-build-soft/70",
    step: "border-blue-300 bg-white text-build",
    emptyNote: "border-blue-200 bg-build-soft/50",
  },
  BLEND: {
    label: "BLEND",
    icon: Sparkles,
    accent: "text-blend",
    accentBg: "bg-blend",
    soft: "bg-blend-soft",
    bg: "bg-blend/12",
    bgStrong: "bg-blend/18",
    border: "border-blend/30",
    badge: "bg-blend/15 text-amber-900 border-blend/35",
    header: "bg-blend/10 border-blend/25",
    bar: "bg-blend",
    ring: "ring-blend/35",
    gradient: "from-blend/25 via-blend/10 to-transparent",
    statCell: "border-border/80 bg-muted/25",
    step: "border-blend/35 bg-background text-amber-900",
    emptyNote: "border-border bg-muted/15",
  },
  BOT: {
    label: "BOT",
    icon: Bot,
    accent: "text-bot-accent",
    accentBg: "bg-bot-accent",
    soft: "bg-bot-soft",
    bg: "bg-bot-accent/[0.08]",
    bgStrong: "bg-bot-accent/12",
    border: "border-bot-accent/25",
    badge: "bg-bot-accent/10 text-bot-accent border-bot-accent/25",
    header: "bg-bot-accent/[0.07] border-bot-accent/20",
    bar: "bg-bot-accent",
    ring: "ring-bot-accent/30",
    gradient: "from-bot-accent/20 via-bot-accent/8 to-transparent",
    statCell: "border-border/80 bg-muted/25",
    step: "border-bot-accent/30 bg-background text-bot-accent",
    emptyNote: "border-border bg-muted/15",
  },
} as const;

function feasibilityClass(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes("self")) return "bg-emerald-500/10 text-emerald-700 border-emerald-500/25";
  if (t.includes("company")) return "bg-blue-500/10 text-blue-700 border-blue-500/25";
  if (t.includes("org")) return "bg-amber-500/10 text-amber-800 border-amber-500/25";
  return "bg-violet-500/10 text-violet-700 border-violet-500/25";
}

function isFreeBand(band: string) {
  const b = band.toLowerCase();
  return b === "free" || b === "freemium";
}

function ToolCard({ tool }: { tool: ToolOption }) {
  const free = isFreeBand(String(tool.cost_band));
  return (
    <div className="group relative rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50/50 p-2 -mx-2 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="shrink-0 pt-0.5 w-28">
          <span
            className={`inline-flex w-full justify-center rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm ${feasibilityClass(
              tool.feasibility,
            )}`}
          >
            {formatFeasibilityLabel(tool.feasibility)}
          </span>
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center flex-wrap gap-2">
            <span className="font-bold text-[15px] text-slate-800">{tool.name}</span>
            {tool.cost_band && (
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {tool.cost_band}
              </span>
            )}
          </div>
          {tool.credibility_note && (
            <p className="mb-3 text-[13px] text-slate-600 leading-relaxed">{tool.credibility_note}</p>
          )}
          
          {(tool.pros?.length > 0 || tool.cons?.length > 0) && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
              <div>
                {tool.pros?.map((pro, idx) => (
                  <p key={idx} className="text-teal-700 flex items-start mt-1">
                    <span className="mr-1.5 font-bold">+</span> <span className="leading-tight">{pro}</span>
                  </p>
                ))}
              </div>
              <div>
                {tool.cons?.map((con, idx) => (
                  <p key={idx} className="text-orange-700 flex items-start mt-1">
                    <span className="mr-1.5 font-bold">−</span> <span className="leading-tight">{con}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {tool.feasibility?.toLowerCase().includes("org") && (
            <p className="mt-3 text-[11px] font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded border border-amber-200 inline-block">
              Discuss with IT or your manager before adopting.
            </p>
          )}
          <div className="mt-4 text-[11px] italic text-slate-400 font-medium pb-2">
            {tool.name} is a typical tool used for this capability.
          </div>
        </div>
      </div>
    </div>
  );
}

export function CollapsibleTaskCard({
  task,
  category,
  assessmentId,
  defaultOpen = false,
  hideCategoryBadge = false,
}: {
  task: AnalyzedTask;
  category: ThreeBCategory;
  assessmentId?: string | null;
  defaultOpen?: boolean;
  hideCategoryBadge?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = FRAMEWORK[category];
  const components = task.components ?? [];
  const feasibilityClassStr = feasibilityClass(task.feasibilityTierVal || "");
  const velocityStr = task.velocityVal || "Unknown";
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (status: "PLANNED" | "DONE") => updateTaskStatus(assessmentId!, task.id, status),
    onSuccess: () => {
      if (assessmentId) {
        queryClient.invalidateQueries({ queryKey: ["assessment-analysis", assessmentId] });
      }
    },
  });

  const handleStatusUpdate = (status: "PLANNED" | "DONE") => {
    if (!assessmentId) return;
    statusMutation.mutate(status);
  };

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`overflow-hidden rounded-2xl border bg-white shadow-soft transition-shadow duration-300 hover:shadow-elevated border-border`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 bg-white hover:bg-muted/30"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            {!hideCategoryBadge && (
              <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${meta.badge}`}>
                {meta.label}
              </span>
            )}
            <h4 className="font-display text-lg font-bold leading-snug text-foreground truncate">
              {task.title}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {task.weeklyHours} hrs/wk · {task.importanceVal}
            </p>
          </div>
          <div className={`hidden md:inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${feasibilityClassStr}`}>
            {formatFeasibilityLabel(task.feasibilityTierVal)}
          </div>
          <div className="hidden md:inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border-border/80">
            {velocityStr}
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 p-5">
              
              {/* Components & Capabilities Pills */}
              {components.length > 0 && (
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Work Components</h5>
                    <div className="flex flex-wrap gap-2.5">
                      {components.map((c, i) => (
                        <span key={i} className="rounded-full bg-[#faf9f6] border border-[#e5e0d8] px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-[#f3f0e9]">
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Capability Required</h5>
                    <div className="flex flex-wrap gap-2.5">
                      {Array.from(new Set(components.map(c => c.capability).filter(Boolean))).map((cap, i) => (
                        <span key={i} className="rounded-full bg-[#f8fafc] border border-slate-200 px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100">
                          {cap as string}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Solution Options */}
              {components.some(c => getComponentTools(c).length > 0) && (
                <div className="space-y-6 mt-10">
                  <div className="flex items-center justify-between border-b border-border/80 pb-3">
                    <h5 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Solution Options — By Component</h5>
                    <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Verified Jul 2026</span>
                  </div>
                  {components.map((comp, i) => {
                    const tools = getComponentTools(comp);
                    if (tools.length === 0) return null;
                    return (
                      <div key={i} className="rounded-xl border border-border/60 bg-white shadow-sm overflow-hidden">
                        <div className="bg-slate-50/80 px-5 py-4 border-b border-border/40">
                          <h6 className="font-bold text-base text-slate-800">{comp.name}</h6>
                          {comp.capability && <p className="text-xs font-medium text-slate-500 mt-0.5">Capability: {comp.capability}</p>}
                        </div>
                        <div className="flex flex-col space-y-5 p-5">
                          {tools.map((tool, j) => (
                            <ToolCard key={j} tool={tool} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Text Blocks Grid */}
              <div className="space-y-6 pt-6 mt-4">
                <div>
                  <h5 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Can this person do it?</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-bold text-amber-800">{formatFeasibilityLabel(task.feasibilityTierVal)}.</span> {task.feasibility_note}
                  </p>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Human Capability to Strengthen</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{task.human_capability}</p>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Pace of Change</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-bold text-foreground">{velocityStr}.</span> {task.velocity_note}
                  </p>
                </div>
              </div>

              {/* Action Block */}
              {task.next_action && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-amber-200/60 bg-[#fdfaf5] p-5">
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-bold">Next best action:</span> {task.next_action}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-3">
                    <button 
                      onClick={() => handleStatusUpdate("PLANNED")}
                      disabled={statusMutation.isPending || task.status === "PLANNED"}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${task.status === "PLANNED" ? "border-amber-600 text-amber-700 bg-amber-50" : "border-amber-400 text-amber-700 hover:bg-amber-50"}`}
                    >
                      Mark as planned
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate("DONE")}
                      disabled={statusMutation.isPending || task.status === "DONE"}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${task.status === "DONE" ? "border-teal-600 text-teal-700 bg-teal-50" : "border-teal-400 text-teal-700 hover:bg-teal-50"}`}
                    >
                      Mark as done
                    </button>
                  </div>
                </div>
              )}

              {/* Learning Implication */}
              <div className="rounded-xl bg-[#1A202C] text-white p-5 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#63B3ED]">Learning Implication</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <span className="text-white/60 font-semibold block mb-0.5">Gap:</span>
                    <span className="text-white/90">{task.learn_gap}</span>
                  </div>
                  <div>
                    <span className="text-[#F56565] font-semibold block mb-0.5">Don't learn:</span>
                    <span className="text-white/90">{task.learn_dont}</span>
                  </div>
                  <div>
                    <span className="text-[#48BB78] font-semibold block mb-0.5">Learn:</span>
                    <span className="text-white/90">{task.learn_do}</span>
                  </div>
                  <div>
                    <span className="text-white/60 font-semibold block mb-0.5">Where:</span>
                    <span className="text-white/90">{task.where_to_learn}</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export { FRAMEWORK as THREE_B_FRAMEWORK };
