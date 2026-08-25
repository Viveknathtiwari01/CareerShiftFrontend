import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { AppLoader } from "@/components/ui/app-loader";

import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportHero } from "@/components/report/ReportHero";
import { OverviewTab } from "@/components/report/OverviewTab";
import { CompetencyTab } from "@/components/report/CompetencyTab";
import { DailyWorkTab } from "@/components/report/DailyWorkTab";
import { ThreeBAnalysisTab } from "@/components/report/ThreeBAnalysisTab";

import { LearningRoadmapTab } from "@/components/report/LearningRoadmapTab";
import { AIToolsTab } from "@/components/report/AIToolsTab";
import { HealthIndicators } from "@/components/report/HealthIndicators";
import { ReportFooter } from "@/components/report/ReportFooter";
import { useReportData } from "@/hooks/use-report-data";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "competencies", label: "Competencies" },
  { id: "work", label: "Daily Work" },
  { id: "3b", label: "3B Analysis" },

  { id: "tools", label: "AI Tools" },
  { id: "roadmap", label: "Learning Roadmap" },
];

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { report, isLoading, isError, error, assessmentId } = useReportData();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <AppLoader size="lg" />
      </div>
    );
  }

  if (!assessmentId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-border bg-background p-8 text-center shadow-soft">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-4 font-display text-xl font-bold">No assessment found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete and submit your career assessment to generate your report.
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

  if (isError || !report) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
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
    <div className="w-full space-y-0">
      <ReportHeader report={report} />
      <ReportHero report={report} />

      <div className="sticky top-0 z-20 mb-10 rounded-2xl border border-border bg-background/95 p-2 shadow-sm backdrop-blur-xl md:p-3">
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200 md:px-5 md:py-2.5 md:text-sm ${
                activeTab === tab.id
                  ? "text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 -z-10 rounded-xl bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12 min-h-[600px]">
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

            {activeTab === "tools" && <AIToolsTab report={report} />}
            {activeTab === "roadmap" && <LearningRoadmapTab report={report} />}
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
  );
}
