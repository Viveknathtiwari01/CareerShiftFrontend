import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { WhyCareerShift } from "@/components/dashboard/WhyCareerShift";
import { MythVsReality } from "@/components/dashboard/MythVsReality";
import { CareerShiftJourney } from "@/components/dashboard/CareerShiftJourney";
import { AISuccessStories } from "@/components/dashboard/AISuccessStories";
import { DailyInsight } from "@/components/dashboard/DailyInsight";
import { PersonalizedGuidance } from "@/components/dashboard/PersonalizedGuidance";
import { FeaturedWorkshop } from "@/components/dashboard/FeaturedWorkshop";
import { Principles } from "@/components/dashboard/Principles";
import { MotivationBanner } from "@/components/dashboard/MotivationBanner";
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <PersonalizedGuidance />
      <DashboardHero />
      <WhyCareerShift />
      <MythVsReality />
      <CareerShiftJourney />
      <AISuccessStories />
      <div className="grid gap-8 lg:grid-cols-2">
        <DailyInsight />
        <FeaturedWorkshop />
      </div>
      <Principles />
      <MotivationBanner />
      <DashboardNavigation />
    </div>
  );
}
