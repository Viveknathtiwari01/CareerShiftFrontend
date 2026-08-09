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
import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";
import { SubmitAssessmentButton } from "@/components/assessment/SubmitAssessmentButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { useActiveAssessmentId } from "@/hooks/use-active-assessment";

const FRAMEWORK_PREVIEW = [
  {
    key: "BUILD",
    label: "BUILD IT",
    tagline: "Deepen human mastery",
    icon: Hammer,
    cardClass: "border-primary/20 bg-primary/5 text-primary",
  },
  {
    key: "BLEND",
    label: "BLEND IT",
    tagline: "Human + AI co-pilot",
    icon: Sparkles,
    cardClass: "border-brand/20 bg-brand/5 text-brand",
  },
  {
    key: "BOT",
    label: "BOT IT",
    tagline: "Automate within 30 days",
    icon: Bot,
    cardClass: "border-teal/20 bg-teal/5 text-teal",
  },
] as const;

export default function ThreeBAnalysisPage() {
  const { data: assessmentId, isLoading } = useActiveAssessmentId();

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <Link
          to="/assessment"
          className="type-body-sm mb-6 inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Assessment
        </Link>
        <PageHeader
          title="3B Analysis"
          description={
            <>
              CareerShift routes every task in your role into{" "}
              <span className="font-semibold text-primary">BUILD</span>,{" "}
              <span className="font-semibold text-brand">BLEND</span>, or{" "}
              <span className="font-semibold text-teal">BOT</span> — with reasoning and three
              concrete next actions per task.
            </>
          }
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-brand p-8 text-center shadow-soft">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white">
            <BrainCircuit className="h-4 w-4" /> CareerShift Core Engine
          </div>
          <h3 className="type-section-title text-white">Your personalized 3B intelligence map</h3>
          <p className="type-body-sm mx-auto mt-4 max-w-2xl text-white/90">
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
                  <div className="type-card-title">{item.label}</div>
                  <div className="type-body-sm mt-1 text-white/80">{item.tagline}</div>
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
            <div key={item.key} className={`rounded-2xl border p-5 shadow-sm ${item.cardClass}`}>
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-background/70">
                <Icon className="h-5 w-5" />
              </div>
              <div className="type-card-title">{item.label}</div>
              <p className="type-body-sm mt-2 opacity-80">{item.tagline}</p>
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
          <Step3BAnalysis
            assessmentId={assessmentId ?? null}
            embedded
            showFooterLinks
          />
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/30 p-6">
        <p className="type-body-sm text-muted-foreground">
          Submit to generate your Career Intelligence Report from live assessment data.
        </p>
        <div className="flex flex-wrap gap-3">
          {assessmentId ? (
            <SubmitAssessmentButton
              assessmentId={assessmentId}
              className="type-body inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
            />
          ) : null}
          <Link
            to="/ai-readiness"
            className="type-body inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold hover:bg-muted"
          >
            AI Readiness Score <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
