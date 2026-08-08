import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
  const { report, isLoading, isError, error, assessmentId } = useReportData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-border bg-background p-8 text-center shadow-soft">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-4 font-display text-xl font-bold">Report not available</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Complete your assessment and submit to generate your Career Intelligence Report."}
          </p>
          <Link
            to="/assessment"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Go to Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 w-full">
      <div className="w-full">
        <ReportHeader report={report} />
        <ReportHero report={report} />

        <div className="sticky top-[72px] z-30 mb-10 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-sm p-2 md:p-3">
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
              {activeTab === "overview" && <OverviewTab report={report} />}
              {activeTab === "competencies" && <CompetencyTab report={report} />}
              {activeTab === "work" && <DailyWorkTab report={report} />}
              {activeTab === "3b" && <ThreeBAnalysisTab report={report} />}
              {activeTab === "readiness" && <AIReadinessTab report={report} />}
              {activeTab === "identity" && <CareerIdentityTab report={report} />}
              {activeTab === "roadmap" && <LearningRoadmapTab report={report} />}
              {activeTab === "tools" && <AIToolsTab report={report} />}
              {activeTab === "action" && <ActionPlanTab report={report} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <HealthIndicators report={report} />
        <ReportFooter
          assessmentId={assessmentId ?? report.assessment_id}
          generatedAt={report.generated_at}
          version={report.report_version}
        />
      </div>
    </div>
  );
}
