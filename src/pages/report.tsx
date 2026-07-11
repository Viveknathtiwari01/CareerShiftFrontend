import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        
        <ReportHeader />
        <ReportHero />

        {/* Tab Navigation */}
        <div className="sticky top-[72px] z-30 mb-10 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-sm p-2 md:p-3">
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 ${
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

        {/* Tab Content Area */}
        <div className="min-h-[600px] mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "competencies" && <CompetencyTab />}
              {activeTab === "work" && <DailyWorkTab />}
              {activeTab === "3b" && <ThreeBAnalysisTab />}
              {activeTab === "readiness" && <AIReadinessTab />}
              {activeTab === "identity" && <CareerIdentityTab />}
              {activeTab === "roadmap" && <LearningRoadmapTab />}
              {activeTab === "tools" && <AIToolsTab />}
              {activeTab === "action" && <ActionPlanTab />}
            </motion.div>
          </AnimatePresence>
        </div>

        <HealthIndicators />
        <ReportFooter />
        
      </div>
    </div>
  );
}
