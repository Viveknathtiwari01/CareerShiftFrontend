import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  BrainCircuit,
  Hammer,
  Loader2,
  Sparkles,
} from "lucide-react";
import ThreeBAnalysisView from "@/components/assessment/ThreeBAnalysisView";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

const FRAMEWORK_PREVIEW = [
  {
    key: "BUILD",
    label: "BUILD",
    tagline: "Human mastery",
    icon: Hammer,
    cardClass: "border-primary/20 bg-primary/10 text-primary",
  },
  {
    key: "BLEND",
    label: "BLEND",
    tagline: "AI co-pilot",
    icon: Sparkles,
    cardClass: "border-brand/20 bg-brand/10 text-brand",
  },
  {
    key: "BOT",
    label: "BOT",
    tagline: "Automate now",
    icon: Bot,
    cardClass: "border-teal/30 bg-teal/10 text-teal",
  },
] as const;

export default function ThreeBAnalysisPage() {
  const { data: assessmentId, isLoading } = useActiveAssessmentId();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <Link
          to="/assessment"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Assessment
        </Link>
        <h2 className="mb-3 font-display text-4xl font-bold tracking-tight">3B Analysis</h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          CareerShift routes every task in your role into{" "}
          <span className="font-semibold text-primary">BUILD</span>,{" "}
          <span className="font-semibold text-brand">BLEND</span>, or{" "}
          <span className="font-semibold text-teal">BOT</span> — with reasoning and three concrete
          next actions per task.
        </p>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-brand p-8 text-center shadow-soft relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
            <BrainCircuit className="h-3.5 w-3.5" /> CareerShift Core Engine
          </div>
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Your personalized 3B intelligence map
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            This is the heart of your assessment — where daily work becomes a clear AI strategy:
            what to deepen, what to automate, and what to augment.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {FRAMEWORK_PREVIEW.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-xl border border-white/20 bg-white/10 p-4 text-white"
                >
                  <Icon className="mx-auto mb-2 h-5 w-5 opacity-90" />
                  <div className="font-display text-lg font-bold">{item.label}</div>
                  <div className="mt-1 text-xs text-white/75">{item.tagline}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {FRAMEWORK_PREVIEW.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className={`rounded-2xl border p-5 shadow-sm ${item.cardClass}`}
            >
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-background/70">
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display text-lg font-bold">{item.label}</div>
              <p className="mt-1 text-sm opacity-80">{item.tagline}</p>
            </div>
          );
        })}
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-brand" />
            <p className="mt-4 text-sm">Loading your assessment…</p>
          </div>
        ) : (
          <ThreeBAnalysisView
            assessmentId={assessmentId ?? null}
            impressMode
            showFooterLinks
          />
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/30 p-5">
        <p className="text-sm text-muted-foreground">
          Continue your journey with AI readiness scoring and your full career report.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/ai-readiness"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-muted"
          >
            AI Readiness Score <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            Full Report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
