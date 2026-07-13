import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  Bot,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  Cpu,
  FileText,
  Map,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import AssessmentWizard from "@/components/AssessmentWizard";
import { useAssessment } from "@/store/mock-store";

export default function AssessmentPage() {
  const [view, setView] = useState<"dashboard" | "wizard">("dashboard");
  const { draft, submitted } = useAssessment();

  if (view === "wizard") {
    return <AssessmentWizard />;
  }

  const hasDraft = draft.tasks.length > 0 || draft.role !== "";
  const hasHistory = submitted !== null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
      >
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
            AI Based Career Assessment
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            Understand how AI will impact your career, analyze your daily work, measure your AI
            readiness, and receive a personalized career transformation roadmap.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            disabled={!hasDraft}
            onClick={() => setView("wizard")}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            Continue Draft
          </button>
          <button
            onClick={() => setView("wizard")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02]"
          >
            Start New Assessment <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Hero Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 p-8 lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">
              Your Career. Your Tasks. Your AI Strategy.
            </h2>
            <p className="mt-4 text-muted-foreground">
              CareerShift analyzes your professional role, competencies, daily work, and AI usage to
              determine which parts of your career should be Built, Bot-enabled, or Blended using
              AI.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium text-foreground">
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary">
                <PlayCircle className="h-4 w-4" />
                Estimated Assessment Time: 7–10 Minutes
              </span>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                What's Analyzed
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  "Career Intelligence",
                  "Competency Mapping",
                  "Task Analysis",
                  "AI Readiness Score",
                  "Career Identity",
                  "Personalized Learning Roadmap",
                ].map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand" /> {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-background p-8 md:border-l md:border-t-0">
            <h3 className="mb-6 font-display text-lg font-bold">Assessment Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Career Profile</span>
                <span className="flex items-center gap-1 font-medium text-foreground">
                  Completed <CheckCircle2 className="h-4 w-4 text-brand" />
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assessment</span>
                <span className="font-medium text-foreground">
                  {hasHistory ? "Completed" : "Not Started"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Assessment</span>
                <span className="font-medium text-foreground">
                  {hasHistory ? new Date(submitted!.completedAt!).toLocaleDateString() : "Never"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated Duration</span>
                <span className="font-medium text-foreground">7–10 Minutes</span>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assessment Progress</span>
                  <span className="font-medium text-brand">0%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[0%] bg-gradient-to-r from-brand to-teal" />
                </div>
              </div>
              <button
                onClick={() => setView("wizard")}
                className="mt-6 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Assessment Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="mb-8 font-display text-2xl font-bold tracking-tight">What You Will Gain</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BrainCircuit,
              title: "Career Intelligence",
              description: "Understand where you stand in the AI era.",
            },
            {
              icon: Compass,
              title: "Competency Mapping",
              description: "Discover your strengths and competency gaps.",
            },
            {
              icon: ClipboardList,
              title: "Daily Task Analysis",
              description: "Analyze how AI impacts your actual work.",
            },
            {
              icon: Cpu,
              title: "3B Framework",
              description: "Classify every task into Build, Bot, or Blend.",
            },
            {
              icon: BarChart,
              title: "AI Readiness Score",
              description: "Measure your readiness using CareerShift's proprietary framework.",
            },
            {
              icon: Map,
              title: "Career Roadmap",
              description: "Receive actionable recommendations to future-proof your career.",
            },
          ].map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-soft"
              >
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Assessment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="mb-8 font-display text-2xl font-bold tracking-tight">Assessment History</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-6 py-4 font-semibold text-foreground">Assessment Date</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Assessment Score</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Career Identity</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="transition-colors hover:bg-muted/20">
                  <td className="px-6 py-4 text-muted-foreground">12 Jul 2026</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 font-semibold text-brand">
                      74 / 100
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    AI-Augmented Backend Engineer
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/report"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                    >
                      View Report <ChevronRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-muted/20">
                  <td className="px-6 py-4 text-muted-foreground">18 Apr 2026</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 font-semibold text-amber-600 dark:text-amber-400">
                      69 / 100
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">Backend Engineer</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/report"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                    >
                      View Report <ChevronRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* What's Included Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="mb-8 font-display text-2xl font-bold tracking-tight">What's Included</h2>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-0.5 bg-border md:block" />
          <div className="space-y-6 md:space-y-8">
            {[
              {
                title: "Role Analysis",
                desc: "We anchor the assessment around your specific job title and industry.",
                icon: Briefcase,
              },
              {
                title: "Competency Mapping",
                desc: "Identify essential skills and tools you use.",
                icon: Compass,
              },
              {
                title: "Task Generation",
                desc: "Outline your primary responsibilities and weekly tasks.",
                icon: ClipboardList,
              },
              {
                title: "Task Review",
                desc: "Evaluate the complexity, creativity, and human touch required.",
                icon: CheckCircle2,
              },
              {
                title: "3B Analysis",
                desc: "Determine which tasks to Build, Bot, or Blend.",
                icon: Cpu,
              },
              {
                title: "AI Readiness Score",
                desc: "Calculate your current standing in the AI era.",
                icon: BarChart,
              },
              {
                title: "Career Identity",
                desc: "Define your future professional persona.",
                icon: Sparkles,
              },
              {
                title: "Personalized Report",
                desc: "Get actionable recommendations for your career.",
                icon: FileText,
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex items-start gap-6 md:gap-8"
              >
                <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-4 border-surface-2 bg-primary text-primary-foreground shadow-soft">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Step {idx + 1}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 max-w-lg text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Assessment Insights Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Current AI Readiness
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-foreground">
              {hasHistory ? "74" : "N/A"}
            </span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Career Profile
          </p>
          <div className="mt-2 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-teal" />
            <span className="font-display text-2xl font-bold text-foreground">Completed</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Assessments Completed
          </p>
          <div className="mt-2 font-display text-3xl font-bold text-foreground">
            {hasHistory ? "1" : "0"}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Last Assessment
          </p>
          <div className="mt-2 font-display text-2xl font-bold text-foreground">
            {hasHistory ? new Date(submitted!.completedAt!).toLocaleDateString() : "Never"}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12"
      >
        <div className="absolute right-0 top-0 opacity-10 blur-3xl">
          <Bot className="h-96 w-96 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl text-primary-foreground">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to Discover Your AI Career Potential?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Complete your first AI Career Assessment and receive personalized insights into your
            strengths, automation opportunities, AI readiness, and future career strategy.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setView("wizard")}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-elevated transition-transform hover:scale-[1.02]"
            >
              Start Assessment <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
