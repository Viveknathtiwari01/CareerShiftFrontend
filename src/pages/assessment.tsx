import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart,
  Bot,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Compass,
  Cpu,
  FileText,
  Map,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Loader2,
} from "lucide-react";
import AssessmentWizard from "@/components/AssessmentWizard";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import { useAssessment } from "@/store/mock-store";
import { getCurrentAssessment, listAssessments, startAssessment, type AssessmentStartResponse } from "@/api/assessment";
import { getProfileStatus } from "@/api/profile";

export default function AssessmentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState<"dashboard" | "wizard">("dashboard");
  const [wizardKey, setWizardKey] = useState(0);
  const [prefetchedSession, setPrefetchedSession] = useState<AssessmentStartResponse | null>(null);
  const [wizardLoading, setWizardLoading] = useState(false);
  const { draft } = useAssessment();

  const { data: profileStatus, isLoading: profileLoading } = useQuery({
    queryKey: ["profile-status"],
    queryFn: getProfileStatus,
  });

  const profileComplete = profileStatus?.is_completed ?? false;

  const { data: currentAssessment } = useQuery({
    queryKey: ["assessment-current"],
    queryFn: getCurrentAssessment,
    enabled: profileComplete && view === "dashboard",
  });

  const { data: assessments = [] } = useQuery({
    queryKey: ["assessments-list"],
    queryFn: listAssessments,
    enabled: profileComplete && view === "dashboard",
  });

  const hasSavedAssessment =
    currentAssessment?.reused_existing === true &&
    currentAssessment?.status === "COMPLETED";

  const assessmentStatusLabel = !profileComplete
    ? "Profile incomplete"
    : currentAssessment?.status === "PROCESSING"
      ? "In progress"
      : hasSavedAssessment
        ? "Ready to continue"
        : "Not started";

  const assessmentProgress = !profileComplete
    ? 0
    : currentAssessment?.status === "PROCESSING"
      ? 40
      : hasSavedAssessment
        ? 75
        : profileComplete
          ? 15
          : 0;

  useEffect(() => {
    if (!profileComplete || profileLoading) return;
    if (location.state?.openWizard) {
      navigate("/assessment", { replace: true, state: {} });
      setPrefetchedSession(null);
      setView("wizard");
    }
  }, [profileComplete, profileLoading, location.state, navigate]);

  async function openWizard(fresh = false) {
    if (!profileComplete) {
      navigate("/my-profile");
      return;
    }

    if (fresh) {
      setWizardLoading(true);
      try {
        const result = await startAssessment({ force: true });
        sessionStorage.setItem("careershift.assessment.active", result.assessment_id);
        setPrefetchedSession(result);
        setWizardKey((k) => k + 1);
        setView("wizard");
      } catch (err) {
        console.error("Failed to start new assessment", err);
      } finally {
        setWizardLoading(false);
      }
      return;
    }

    setPrefetchedSession(null);
    setView("wizard");
  }

  function handleRegenerateFromScratch() {
    const confirmed = window.confirm(
      "Regenerate from scratch? This runs a new AI competency analysis and replaces your current task list. Your profile must be up to date.",
    );
    if (confirmed) void openWizard(true);
  }

  if (profileLoading || wizardLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (view === "wizard") {
    return (
      <AssessmentWizard key={wizardKey} prefetchedSession={prefetchedSession} />
    );
  }

  const hasDraft = draft.tasks.length > 0 || draft.role !== "";

  return (
    <div className="w-full">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col items-start justify-between gap-4 px-4 sm:px-6 md:flex-row md:items-center"
      >
        <div>
          <h1 className="type-page-title text-foreground">
            AI Based Career Assessment
          </h1>
          <p className="type-page-lead mt-3 max-w-3xl text-muted-foreground">
            Understand how AI will impact your career, analyze your daily work, measure your AI
            readiness, and receive a personalized career transformation roadmap.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {!profileComplete && (
            <Link
              to="/my-profile"
              className="text-sm font-medium text-brand hover:underline"
            >
              Complete My Career profile first
            </Link>
          )}
          {hasSavedAssessment && (
            <button
              type="button"
              onClick={handleRegenerateFromScratch}
              disabled={!profileComplete || wizardLoading}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              Regenerate from scratch
            </button>
          )}
        </div>
      </motion.div>

      {/* Hero Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="panel mb-12 overflow-hidden"
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

          <div className="border-t border-border bg-muted/20 p-6 md:border-l md:border-t-0 lg:p-8">
            <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
              <div className="mb-6 flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">Assessment Status</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Track where you are in the journey
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">Career profile</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
                    {profileComplete ? (
                      <>
                        Completed <CheckCircle2 className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      "Incomplete"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">Assessment</span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      hasSavedAssessment
                        ? "bg-brand/15 text-brand"
                        : currentAssessment?.status === "PROCESSING"
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {assessmentStatusLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">Estimated duration</span>
                  <span className="text-sm font-semibold text-foreground">7–10 minutes</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">Overall progress</span>
                  <span className="font-semibold text-brand">{assessmentProgress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-teal transition-all duration-500"
                    style={{ width: `${assessmentProgress}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => openWizard(false)}
                disabled={!profileComplete || wizardLoading}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {hasSavedAssessment ? "Continue Assessment" : "Start Assessment"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {hasDraft && !hasSavedAssessment ? (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  You have a draft in progress — continue where you left off.
                </p>
              ) : null}
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

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="hero-ink p-8 md:p-12"
      >
        <div className="absolute right-0 top-0 opacity-10 blur-3xl pointer-events-none">
          <Bot className="h-96 w-96 text-sidebar-foreground" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to Discover Your AI Career Potential?
          </h2>
          <p className="mt-4 text-base text-sidebar-foreground/75">
            Complete your first AI Career Assessment and receive personalized insights into your
            strengths, automation opportunities, AI readiness, and future career strategy.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openWizard(false)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              {hasSavedAssessment ? "Continue Assessment" : "Start Assessment"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-sidebar-foreground/20 px-6 py-3 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-white/8"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
