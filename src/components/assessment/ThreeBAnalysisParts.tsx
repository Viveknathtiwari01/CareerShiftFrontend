import { forwardRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  Clock,
  Hammer,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  deriveAccessPathTag,
  formatFeasibilityLabel,
  formatVelocityLabel,
  getCategoryWhyCopy,
  getComponentTools,
  getToolFitDescription,
  getToolMarketNote,
  getToolPricingLine,
  getUniqueCapabilities,
  hasLearningContent,
  type AnalyzedTask,
  type TaskComponent,
  type ThreeBCategory,
  type ToolOption,
} from "@/api/analysis";

const CATEGORY_THEME = {
  BUILD: {
    label: "BUILD",
    icon: Hammer,
    badge: "bg-[#eef3fa] text-[#1e3a5f] border-[#b8cce8]",
    stripe: "bg-[#1e3a5f]",
    headerBg: "bg-[#f8fafc]",
    accentBorder: "border-[#1e3a5f]/20",
    pill: "bg-[#eef3fa] text-[#1e3a5f] border-[#c5d9f0]",
    tabActive: "bg-[#1e3a5f] text-white border-[#1e3a5f]",
  },
  BLEND: {
    label: "BLEND",
    icon: Sparkles,
    badge: "bg-[#faf6eb] text-[#92400e] border-[#e8d5a8]",
    stripe: "bg-[#c9a84c]",
    headerBg: "bg-[#fdfbf7]",
    accentBorder: "border-[#c9a84c]/30",
    pill: "bg-[#faf6eb] text-[#92400e] border-[#e8d5a8]",
    tabActive: "bg-[#c9a84c] text-white border-[#c9a84c]",
  },
  BOT: {
    label: "BOT",
    icon: Bot,
    badge: "bg-[#ecfdf5] text-[#0d9488] border-[#99f0e0]",
    stripe: "bg-[#0d9488]",
    headerBg: "bg-[#f0fdfa]",
    accentBorder: "border-[#0d9488]/25",
    pill: "bg-[#ecfdf5] text-[#0d9488] border-[#99f0e0]",
    tabActive: "bg-[#0d9488] text-white border-[#0d9488]",
  },
} as const;

const COMPONENT_BOX_BG = "bg-[#faf6eb] border-[#e8d5a8]";

export const FRAMEWORK = CATEGORY_THEME;

function feasibilityClass(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes("self")) return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (t.includes("company")) return "bg-blue-50 text-blue-800 border-blue-200";
  if (t.includes("org")) return "bg-amber-50 text-amber-900 border-amber-200";
  return "bg-violet-50 text-violet-800 border-violet-200";
}

function MetaPill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

/** Fixed-width step badge so all numbers align in one column */
function StepBadge({ step }: { step: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold leading-none text-white">
      {step}
    </span>
  );
}

/** Heading outside the content box — matches mockup layout */
function SectionBlock({
  step,
  title,
  trailing,
  children,
  variant = "default",
}: {
  step?: number;
  title: string;
  trailing?: ReactNode;
  children: ReactNode;
  variant?: "default" | "highlight" | "dark" | "plain";
}) {
  const boxStyles = {
    default: "rounded-xl border border-border/70 bg-white p-4 md:p-5",
    highlight: "rounded-xl border border-amber-200/70 bg-[#fdfaf5] p-4 md:p-5",
    dark: "rounded-xl border border-[#2d3748] bg-[#1A202C] p-4 md:p-5 text-white",
    plain: "",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {step != null && <StepBadge step={step} />}
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#8b7355]">
            {title}
          </h5>
        </div>
        {trailing}
      </div>
      <div
        className={`text-sm leading-relaxed ${variant === "dark" ? "text-white/90" : "text-slate-700"} ${boxStyles[variant]}`}
      >
        {children}
      </div>
    </div>
  );
}

function ToolOptionCard({ tool, index }: { tool: ToolOption; index: number }) {
  const pricingLine = getToolPricingLine(tool);
  const fitDescription = getToolFitDescription(tool);
  const marketNote = getToolMarketNote(tool);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${feasibilityClass(tool.feasibility)}`}
        >
          {formatFeasibilityLabel(tool.feasibility)}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Option {String.fromCharCode(65 + index)}
        </span>
      </div>
      <p className="mb-1 text-base font-bold text-slate-900">{tool.name}</p>
      {pricingLine && (
        <p className="mb-2 text-[13px] font-medium text-slate-600">{pricingLine}</p>
      )}
      {fitDescription && (
        <p className="mb-3 text-[13px] leading-relaxed text-slate-700">{fitDescription}</p>
      )}
      {(tool.pros?.length > 0 || tool.cons?.length > 0) && (
        <div className="grid grid-cols-1 gap-3 text-[13px] sm:grid-cols-2">
          <div className="space-y-1">
            {tool.pros?.map((pro, idx) => (
              <p key={idx} className="flex items-start text-teal-700">
                <span className="mr-1.5 font-bold">+</span>
                <span>{pro}</span>
              </p>
            ))}
          </div>
          <div className="space-y-1">
            {tool.cons?.map((con, idx) => (
              <p key={idx} className="flex items-start text-orange-700">
                <span className="mr-1.5 font-bold">−</span>
                <span>{con}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      {marketNote && (
        <p className="mt-3 text-[12px] italic leading-relaxed text-slate-500">{marketNote}</p>
      )}
      {tool.feasibility?.toLowerCase().includes("org") && (
        <p className="mt-3 inline-block rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-semibold text-amber-800">
          Discuss with IT or your manager before adopting.
        </p>
      )}
    </div>
  );
}

function CategoryWhySection({
  category,
  reason,
  rationale,
}: {
  category: ThreeBCategory;
  reason?: string | null;
  rationale?: string | null;
}) {
  const copy = getCategoryWhyCopy(category);
  const headline = rationale?.trim();
  const detail = reason?.trim();
  const showHeadline = Boolean(headline && headline !== detail);

  return (
    <div className="space-y-3">
      <p className="text-[13px] leading-relaxed text-slate-600">{copy.lead}</p>
      {showHeadline && (
        <p className="text-[15px] font-semibold leading-snug text-slate-900">{headline}</p>
      )}
      {detail && (
        <p className={`text-[14px] leading-relaxed text-slate-800 ${showHeadline ? "" : "mt-1"}`}>
          {detail}
        </p>
      )}
    </div>
  );
}

function ComponentSolutionBlock({ comp }: { comp: TaskComponent }) {
  const tools = getComponentTools(comp);
  const isHumanLed = comp.is_automatable === false;

  return (
    <div className={`overflow-hidden rounded-xl border shadow-sm ${COMPONENT_BOX_BG}`}>
      <div className="border-b border-[#e8d5a8]/60 px-4 py-3 md:px-5">
        <h6 className="font-bold text-[15px] text-[#1e3a5f]">{comp.name}</h6>
        {comp.capability && (
          <p className="mt-1 text-xs text-[#6b5a45]">
            <span className="font-semibold">Capability:</span> {comp.capability}
          </p>
        )}
        {comp.description && (
          <p className="mt-2 text-[13px] leading-relaxed text-[#5c4a32]">{comp.description}</p>
        )}
      </div>
      <div className="space-y-3 bg-white/60 p-4 md:p-5">
        {tools.length > 0 ? (
          tools.map((tool, j) => <ToolOptionCard key={j} tool={tool} index={j} />)
        ) : isHumanLed ? (
          <p className="text-[13px] leading-relaxed text-[#5c4a32]">
            <span className="font-semibold text-[#3d3225]">Stays human-led.</span>{" "}
            This component relies on judgment and context — focus on strengthening the capability
            rather than replacing it with a tool.
          </p>
        ) : (
          <p className="text-[13px] leading-relaxed text-[#5c4a32]">
            No tool options were generated for this component yet. Try re-analyzing your tasks or
            discuss augmentation options with your team.
          </p>
        )}
      </div>
    </div>
  );
}

export const CollapsibleTaskCard = forwardRef<
  HTMLElement,
  {
    task: AnalyzedTask;
    category: ThreeBCategory;
    assessmentId?: string | null;
    defaultOpen?: boolean;
    hideCategoryBadge?: boolean;
    isRecommendedFocus?: boolean;
    generatedAtLabel?: string;
    readOnly?: boolean;
  }
>(function CollapsibleTaskCard(
  {
    task,
    category,
    assessmentId,
    defaultOpen = false,
    hideCategoryBadge = false,
    isRecommendedFocus = false,
    generatedAtLabel,
    readOnly = false,
  },
  ref,
) {
  const [open, setOpen] = useState(defaultOpen);
  const theme = CATEGORY_THEME[category];
  const Icon = theme.icon;
  const isBuild = category === "BUILD";
  const whyCopy = getCategoryWhyCopy(category);
  const components = task.components ?? [];
  const capabilities = getUniqueCapabilities(components);
  const accessPathTag = deriveAccessPathTag(task);
  const showFeasibility = Boolean(task.feasibility_tier);
  const showVelocity = Boolean(task.velocity);

  const sections = {
    reason: Boolean(task.reason),
    humanBuild: isBuild && Boolean(task.human_capability),
    components: components.length > 0,
    capabilities: capabilities.length > 0,
    solutions: components.length > 0,
    humanBlend: !isBuild && Boolean(task.human_capability),
    feasibility: showFeasibility && Boolean(task.feasibility_note),
    velocity: showVelocity && Boolean(task.velocity_note),
    cost: Boolean(task.cost_of_staying_as_is?.narrative),
    action: Boolean(task.next_action),
    learning: hasLearningContent(task),
  };

  let step = 0;
  const stepFor = (key: keyof typeof sections) => (sections[key] ? ++step : 0);
  const reasonStep = stepFor("reason");
  const humanBuildStep = stepFor("humanBuild");
  const componentsStep = stepFor("components");
  const capabilitiesStep = stepFor("capabilities");
  const solutionsStep = stepFor("solutions");
  const humanBlendStep = stepFor("humanBlend");
  stepFor("feasibility");
  stepFor("velocity");
  stepFor("cost");
  const actionStep = stepFor("action");
  const learningStep = stepFor("learning");

  const showRecommendedBanner = isRecommendedFocus && !isBuild;

  return (
    <motion.article
      ref={ref}
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
        isRecommendedFocus ? "border-amber-300 ring-1 ring-amber-200/60" : "border-border"
      }`}
    >
      {showRecommendedBanner && (
        <div className="bg-[#c2911b] px-5 py-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-white">
          Recommended Focus
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full flex-col text-left transition-colors hover:opacity-95 ${theme.headerBg}`}
      >
        <div className="flex">
          <div className={`w-1.5 shrink-0 ${theme.stripe}`} />
          <div className="flex flex-1 items-start justify-between gap-3 px-4 py-3 md:px-5 md:py-3.5">
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {!hideCategoryBadge && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}
                  >
                    <Icon className="h-3 w-3" />
                    {theme.label}
                  </span>
                )}
              </div>
              <h4 className="font-display text-lg font-bold leading-snug text-slate-900">
                {task.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                <MetaPill className={theme.pill}>
                  <Clock className="h-3 w-3" />
                  {task.weeklyHours} hrs/wk
                </MetaPill>
                <MetaPill className={theme.pill}>
                  <Target className="h-3 w-3" />
                  {task.importanceVal}
                </MetaPill>
                {showFeasibility && (
                  <MetaPill className={feasibilityClass(task.feasibilityTierVal)}>
                    {formatFeasibilityLabel(task.feasibilityTierVal)}
                  </MetaPill>
                )}
                {showVelocity && (
                  <MetaPill className="bg-slate-100 text-slate-700 border-slate-200 capitalize">
                    <TrendingUp className="h-3 w-3" />
                    {formatVelocityLabel(task.velocityVal)}
                  </MetaPill>
                )}
                {accessPathTag && (
                  <MetaPill className="bg-[#faf6eb] text-[#92400e] border-[#e8d5a8]">
                    {accessPathTag}
                  </MetaPill>
                )}
              </div>
            </div>
            <ChevronDown
              className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
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
            <div className="space-y-5 border-t border-border/60 bg-[#faf9f7] p-4 md:space-y-6 md:p-5">
              {sections.reason && (
                <SectionBlock step={reasonStep} title={whyCopy.title}>
                  <CategoryWhySection
                    category={category}
                    reason={task.reason}
                    rationale={task.rationale}
                  />
                </SectionBlock>
              )}

              {sections.humanBuild && (
                <SectionBlock step={humanBuildStep} title="Human Capability to Strengthen">
                  <p className="font-medium text-slate-800">{task.human_capability}</p>
                </SectionBlock>
              )}

              {sections.components && (
                <SectionBlock step={componentsStep} title="Work Components" variant="plain">
                  <div className="flex flex-wrap gap-2">
                    {components.map((c, i) => (
                      <span
                        key={i}
                        className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium text-[#5c4a32] ${COMPONENT_BOX_BG}`}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </SectionBlock>
              )}

              {sections.capabilities && (
                <SectionBlock step={capabilitiesStep} title="Capability Required" variant="plain">
                  <div className="flex flex-wrap gap-2">
                    {capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-[#c5d9f0] bg-[#eef3fa] px-3.5 py-1.5 text-[13px] font-medium capitalize text-[#1e3a5f]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </SectionBlock>
              )}

              {sections.solutions && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <StepBadge step={solutionsStep} />
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#8b7355]">
                        Solution Options — By Component
                      </h5>
                    </div>
                    <span className="shrink-0 rounded-full border border-[#e8d5a8] bg-[#faf6eb] px-2.5 py-0.5 text-[10px] font-medium text-[#8b7355]">
                      {generatedAtLabel
                        ? `Generated ${generatedAtLabel}`
                        : "Verify before adopting"}
                    </span>
                  </div>
                  {components.map((comp, i) => (
                    <ComponentSolutionBlock key={i} comp={comp} />
                  ))}
                </div>
              )}

              {sections.humanBlend && (
                <SectionBlock step={humanBlendStep} title="Human Capability to Strengthen">
                  <p className="font-medium text-slate-800">{task.human_capability}</p>
                </SectionBlock>
              )}

              {(sections.feasibility || sections.velocity || sections.cost) && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {sections.feasibility && (
                    <SectionBlock title="Can This Person Do It?">
                      <p>{task.feasibility_note}</p>
                    </SectionBlock>
                  )}
                  {sections.velocity && (
                    <SectionBlock title="Pace of Change">
                      <p>
                        <span className="font-bold text-slate-900">
                          {formatVelocityLabel(task.velocityVal)}.
                        </span>{" "}
                        {task.velocity_note}
                      </p>
                    </SectionBlock>
                  )}
                  {sections.cost && (
                    <SectionBlock title="Cost of Staying As-Is" variant="highlight">
                      <p>
                        <span className="text-lg font-bold text-slate-900">
                          {task.cost_of_staying_as_is!.annual_hours} hrs/year
                        </span>
                        <span className="mt-1 block text-slate-600">
                          {task.cost_of_staying_as_is!.narrative}
                        </span>
                      </p>
                    </SectionBlock>
                  )}
                </div>
              )}

              {sections.action && (
                <SectionBlock step={actionStep} title="Next Best Action" variant="highlight">
                  <p className="text-[15px] font-medium text-slate-900">{task.next_action}</p>
                </SectionBlock>
              )}

              {sections.learning && (
                <SectionBlock step={learningStep} title="Learning Implication" variant="dark">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {task.learn_future && (
                      <div>
                        <span className="mb-1 block text-xs font-semibold text-white/50">
                          Future need
                        </span>
                        <span className="text-sm">{task.learn_future}</span>
                      </div>
                    )}
                    {task.learn_current && (
                      <div>
                        <span className="mb-1 block text-xs font-semibold text-white/50">
                          Current strength
                        </span>
                        <span className="text-sm">{task.learn_current}</span>
                      </div>
                    )}
                    {task.learn_gap && (
                      <div>
                        <span className="mb-1 block text-xs font-semibold text-[#63B3ED]">Gap</span>
                        <span className="text-sm">{task.learn_gap}</span>
                      </div>
                    )}
                    {task.learn_do && (
                      <div>
                        <span className="mb-1 block text-xs font-semibold text-[#48BB78]">
                          Learn
                        </span>
                        <span className="text-sm">{task.learn_do}</span>
                      </div>
                    )}
                    {task.learn_dont && (
                      <div>
                        <span className="mb-1 block text-xs font-semibold text-[#F56565]">
                          Don't learn
                        </span>
                        <span className="text-sm">{task.learn_dont}</span>
                      </div>
                    )}
                    {task.where_to_learn && (
                      <div>
                        <span className="mb-1 block text-xs font-semibold text-white/50">
                          Where
                        </span>
                        <span className="text-sm">{task.where_to_learn}</span>
                      </div>
                    )}
                  </div>
                </SectionBlock>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

export { CATEGORY_THEME as THREE_B_FRAMEWORK };

export function CategoryTabButton({
  category,
  active,
  count,
  onClick,
}: {
  category: ThreeBCategory | "ALL";
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  const theme = category !== "ALL" ? CATEGORY_THEME[category] : null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
        active
          ? category === "ALL"
            ? "border-slate-900 bg-slate-900 text-white shadow-sm"
            : theme!.tabActive
          : "border-border bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {category === "ALL" ? "All" : `${category}`}
      <span className={`ml-1.5 ${active ? "opacity-90" : "opacity-60"}`}>· {count}</span>
    </button>
  );
}
