import { motion } from "framer-motion";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { WhyCareerShift } from "@/components/dashboard/WhyCareerShift";
import { MythVsReality } from "@/components/dashboard/MythVsReality";
import { CareerShiftJourney } from "@/components/dashboard/CareerShiftJourney";
import { PersonalizedProgress } from "@/components/dashboard/PersonalizedProgress";
import { AISuccessStories } from "@/components/dashboard/AISuccessStories";
import { DailyInsight } from "@/components/dashboard/DailyInsight";
import { PersonalizedGuidance } from "@/components/dashboard/PersonalizedGuidance";
import { FeaturedWorkshop } from "@/components/dashboard/FeaturedWorkshop";
import { Principles } from "@/components/dashboard/Principles";
import { MotivationBanner } from "@/components/dashboard/MotivationBanner";
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12 space-y-8">
        <DashboardHero />
        <WhyCareerShift />
        <MythVsReality />
        <CareerShiftJourney />
        <PersonalizedProgress />
        <AISuccessStories />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PersonalizedGuidance />
          </div>
          <div className="space-y-8">
            <DailyInsight />
            <FeaturedWorkshop />
          </div>
        </div>
        <Principles />
        <MotivationBanner />
        <DashboardNavigation />
      </div>
    </div>
  );
}
