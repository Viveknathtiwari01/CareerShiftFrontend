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
import { AppLoader } from "@/components/ui/app-loader";
import AssessmentWizard from "@/components/AssessmentWizard";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import { useAssessment } from "@/store/mock-store";
import { getCurrentAssessment, listAssessments, startAssessment, type AssessmentStartResponse } from "@/api/assessment";
import { getProfileStatus } from "@/api/profile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    void openWizard(true);
  }

  if (profileLoading || wizardLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <AppLoader size="lg" />
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
        className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-start"
      >
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-[#0A121F] mb-4">
            AI Based Career Assessment
          </h1>
          <p className="text-[17px] text-[#4A5568] font-light leading-relaxed">
            Understand how AI will impact your career, analyze your daily work, measure your AI
            readiness, and receive a personalized career transformation roadmap.
          </p>
        </div>
        
        <div className="flex shrink-0 items-center gap-3 md:mt-2">
          {!profileComplete && (
            <Link
              to="/my-profile"
              className="text-[15px] font-medium text-[#C9A84C] hover:underline"
            >
              Complete My Career profile first
            </Link>
          )}
          {hasSavedAssessment && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  disabled={!profileComplete || wizardLoading}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-[14px] font-medium text-[#0A121F] shadow-sm transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Regenerate from scratch
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Regenerate from scratch?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This runs a new AI competency analysis and replaces your current task list. Your profile must be up to date.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRegenerateFromScratch}>
                    Regenerate
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </motion.div>

      {/* Overview Cards Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid lg:grid-cols-12 gap-6 mb-16"
      >
        {/* Left Card - What's Analyzed */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#EDF2F7]">
          <h2 className="font-display text-[26px] font-medium text-[#0A121F] mb-4">
            Your Career. Your Tasks. Your AI Strategy.
          </h2>
          <p className="text-[16px] text-[#4A5568] font-light mb-6 leading-relaxed">
            CareerShift analyzes your professional role, competencies, daily work, and AI usage to
            determine which parts of your career should be Built, Bot-enabled, or Blended using AI.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-[#FDFBF2] text-[#C9A84C] px-4 py-2 rounded-full text-[13px] font-medium mb-10 border border-[#E8C96A]/20">
            <PlayCircle className="h-4 w-4" />
            Estimated Assessment Time: 7–10 Minutes
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#718096] mb-4">
              What's Analyzed
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                "Career Intelligence",
                "Competency Mapping",
                "Task Analysis",
              ].map((feature) => (
                <span
                  key={feature}
                  className="flex items-center gap-2 text-[14px] text-[#0A121F] font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#C9A84C]" /> {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card - Status Panel */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#EDF2F7] flex flex-col h-full">
          <div className="mb-6 flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#FDFBF2] text-[#C9A84C]">
              <ClipboardList className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-xl font-medium text-[#0A121F]">Assessment Status</h3>
              <p className="mt-1 text-[13px] text-[#718096] font-light">
                Track where you are in the journey
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between rounded-xl border border-[#EDF2F7] bg-[#F8FAFC] px-4 py-3">
              <span className="text-[13px] font-medium text-[#4A5568]">Career profile</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6FFFA] px-3 py-1 text-[12px] font-medium text-[#38B2AC]">
                {profileComplete ? (
                  <>
                    Completed <CheckCircle2 className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <span className="text-[#E53E3E]">Incomplete</span>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#EDF2F7] bg-[#F8FAFC] px-4 py-3">
              <span className="text-[13px] font-medium text-[#4A5568]">Assessment</span>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${
                  hasSavedAssessment
                    ? "bg-[#FDFBF2] text-[#C9A84C]"
                    : currentAssessment?.status === "PROCESSING"
                      ? "bg-[#FEFCF1] text-[#D69E2E]"
                      : "bg-white text-[#718096] border border-[#E2E8F0]"
                }`}
              >
                {assessmentStatusLabel}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#EDF2F7] bg-[#F8FAFC] px-4 py-3">
              <span className="text-[13px] font-medium text-[#4A5568]">Estimated duration</span>
              <span className="text-[13px] font-semibold text-[#0A121F]">7–10 minutes</span>
            </div>
          </div>

          <div className="mb-8 mt-auto">
            <div className="mb-2 flex items-center justify-between text-[13px]">
              <span className="font-medium text-[#4A5568]">Overall progress</span>
              <span className="font-bold text-[#C9A84C]">{assessmentProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#EDF2F7]">
              <div
                className="h-full rounded-full bg-[#38B2AC] transition-all duration-700 ease-out"
                style={{ width: `${assessmentProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => openWizard(false)}
            disabled={!profileComplete || wizardLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D6AD42] hover:bg-[#C9A84C] px-6 py-3.5 text-[14px] font-medium text-[#0A121F] transition-all disabled:cursor-not-allowed disabled:opacity-50"
          >
            {hasSavedAssessment ? "Continue Assessment" : "Start Assessment"}
            <ArrowRight className="h-4 w-4" />
          </button>
          
          {hasDraft && !hasSavedAssessment ? (
            <p className="mt-4 text-center text-[13px] text-[#718096]">
              You have a draft in progress. Continue where you left off.
            </p>
          ) : null}
        </div>
      </motion.div>

      {/* Assessment Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#0A121F] mb-3">
            What You Will Gain
          </h2>
        </div>
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
                className="bg-white p-8 rounded-3xl shadow-sm text-center flex flex-col items-center justify-center min-h-[220px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
              >
                <div className="bg-[#FDFBF2] border border-[#E8C96A]/20 p-3.5 rounded-full mb-6 text-[#C9A84C] group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[20px] font-medium text-[#0A121F] mb-2">{benefit.title}</h3>
                <p className="text-[14px] text-[#4A5568] font-light leading-relaxed">{benefit.description}</p>
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
        className="mb-24 bg-[#FDFBF2] py-16 px-4 md:px-8 rounded-[3rem]"
      >
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#0A121F] mb-3">
            What's Included
          </h2>
          <p className="text-[17px] text-[#4A5568] font-light">
            A comprehensive, step-by-step evaluation of your professional profile.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
              title: "Personalized Report",
              desc: "Get actionable recommendations for your career.",
              icon: FileText,
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6"
            >
              <div className="shrink-0 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#F8FAFC] text-[#718096]">
                <step.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#D6AD42] mb-1.5">
                  Step {idx + 1}
                </p>
                <h3 className="font-display text-[20px] font-medium text-[#0A121F] mb-1">{step.title}</h3>
                <p className="text-[14px] text-[#718096] font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#1B2533] rounded-[2rem] p-10 md:p-14 lg:p-16 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
          
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-white leading-tight mb-6">
            Ready to Discover Your AI Career Potential?
          </h2>
          <p className="text-[17px] text-white/70 font-light mb-10 max-w-2xl leading-relaxed">
            Complete your first AI Career Assessment and receive personalized insights into your
            strengths, automation opportunities, AI fitness, and future career strategy.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => openWizard(false)}
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C] hover:bg-[#F3D782] text-[#0A121F] px-8 py-4 text-[15px] font-semibold shadow-md transition-all hover:-translate-y-0.5 group"
            >
              {hasSavedAssessment ? "Continue Assessment" : "Start Assessment"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
