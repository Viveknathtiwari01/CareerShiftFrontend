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
<<<<<<< HEAD
    <div className="space-y-8">
=======
    <div className="space-y-8 pb-2">
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
      <DashboardHero />
      <WhyCareerShift />
      <MythVsReality />
      <CareerShiftJourney />
      <PersonalizedProgress />
      <AISuccessStories />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
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
  );
}
