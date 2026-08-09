import { PageHeader } from "@/components/layout/PageHeader";
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
    <div className="w-full space-y-2 pb-8">
      <PageHeader
        eyebrow="Learning"
        title="Workshops"
        description="Practical AI training built on your CareerShift assessment — strengthen the skills your report recommends."
      />
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
