import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportHero } from "@/components/report/ReportHero";
import { OverviewTab } from "@/components/report/OverviewTab";
import { CompetencyTab } from "@/components/report/CompetencyTab";
import { DailyWorkTab } from "@/components/report/DailyWorkTab";
import { ThreeBAnalysisTab } from "@/components/report/ThreeBAnalysisTab";
import { AIReadinessTab } from "@/components/report/AIReadinessTab";
import { LearningRoadmapTab } from "@/components/report/LearningRoadmapTab";
import { AIToolsTab } from "@/components/report/AIToolsTab";
import { CareerIdentityTab } from "@/components/report/CareerIdentityTab";
import { ActionPlanTab } from "@/components/report/ActionPlanTab";
import { HealthIndicators } from "@/components/report/HealthIndicators";
import { ReportFooter } from "@/components/report/ReportFooter";
import { useReportData } from "@/hooks/use-report-data";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "competencies", label: "Competencies" },
  { id: "work", label: "Daily Work" },
  { id: "3b", label: "3B Analysis" },
  { id: "readiness", label: "AI Readiness" },
  { id: "identity", label: "Career Identity" },
  { id: "roadmap", label: "Learning Roadmap" },
  { id: "tools", label: "AI Tools" },
  { id: "action", label: "Action Plan" },
];

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const report = useReportData();

  if (report.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
        <p className="mt-4 text-sm">Generating your career intelligence report…</p>
      </div>
    );
  }

  if (!report.assessmentId) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-16 text-center">
        <p className="text-muted-foreground">Complete your assessment to view the full report.</p>
        <Link
          to="/assessment"
          className="mt-4 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Go to Assessment
        </Link>
      </div>
    );
  }

  if (report.isError || !report.report) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-16 text-center">
        <p className="text-muted-foreground">
          {report.error?.message ||
            "Your career intelligence report has not been generated yet."}
        </p>
        <Link
          to="/3b-analysis"
          className="mt-4 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Complete & Submit Assessment
        </Link>
      </div>
    );
  }

  const data = report.report;
  const professionSummary = data.career_identity.narrative;

  return (
    <div className="min-h-screen bg-secondary/30 space-y-0">
      <ReportHeader
        assessmentId={report.assessmentId}
        readiness={report.readiness}
        completedAt={report.completedAt}
      />
      <ReportHero
        profile={report.profile}
        readiness={report.readiness}
        professionSummary={professionSummary}
        automationPct={report.automationPct}
      />

      <div className="sticky top-0 z-20 mb-10 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-sm p-2 md:p-3">
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-base rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px] mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <OverviewTab
                profile={report.profile}
                readiness={report.readiness}
                taskCount={data.daily_work.tasks.length}
                competencyCount={data.competencies.reduce(
                  (sum, group) => sum + group.items.length,
                  0,
                )}
                automationPct={report.automationPct}
              />
            )}
            {activeTab === "competencies" && <CompetencyTab groups={data.competencies} />}
            {activeTab === "work" && <DailyWorkTab dailyWork={data.daily_work} />}
            {activeTab === "3b" && <ThreeBAnalysisTab />}
            {activeTab === "readiness" && <AIReadinessTab readiness={report.readiness} />}
            {activeTab === "identity" && <CareerIdentityTab identity={data.career_identity} />}
            {activeTab === "roadmap" && <LearningRoadmapTab roadmap={data.upskill_roadmap} />}
            {activeTab === "tools" && <AIToolsTab toolkit={data.ai_toolkit} />}
            {activeTab === "action" && <ActionPlanTab actionPlan={data.action_plan} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <HealthIndicators readiness={report.readiness} profile={report.profile} />
      <ReportFooter
        generatedAt={report.completedAt}
        reportVersion={report.reportVersion}
        strategicNote={report.strategicNote}
      />
    </div>
  );
}
