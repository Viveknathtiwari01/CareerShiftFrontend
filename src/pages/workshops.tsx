import { WorkshopHero } from "@/components/workshops/WorkshopHero";
import { InsightBanner } from "@/components/workshops/InsightBanner";
import { PremiumCards } from "@/components/workshops/PremiumCards";
import { MentorCard } from "@/components/workshops/MentorCard";
import { WorkshopOverview } from "@/components/workshops/WorkshopOverview";
import { LearningTimeline } from "@/components/workshops/LearningTimeline";
import { VideoPreviewSection } from "@/components/workshops/VideoPreviewSection";
import { TestimonialSection } from "@/components/workshops/TestimonialSection";
import { PricingCard } from "@/components/workshops/PricingCard";
import { FAQAccordion } from "@/components/workshops/FAQAccordion";
import { MotivationBanner } from "@/components/workshops/MotivationBanner";
import { WorkshopCTA } from "@/components/workshops/WorkshopCTA";

export default function Workshops() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12 space-y-2">
      <WorkshopHero />
      <InsightBanner />
      <PremiumCards />
      <MentorCard />
      <WorkshopOverview />
      <LearningTimeline />
      <VideoPreviewSection />
      <TestimonialSection />
      <PricingCard />
      <FAQAccordion />
      <MotivationBanner />
      <WorkshopCTA />
    </div>
  );
}
