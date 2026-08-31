import { motion } from "framer-motion";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { WhyCareerShift } from "@/components/dashboard/WhyCareerShift";
import { MythVsReality } from "@/components/dashboard/MythVsReality";
import { CareerShiftJourney } from "@/components/dashboard/CareerShiftJourney";
import { AISuccessStories } from "@/components/dashboard/AISuccessStories";
import { PersonalizedGuidance } from "@/components/dashboard/PersonalizedGuidance";
import { FeaturedWorkshop } from "@/components/dashboard/FeaturedWorkshop";
import { Principles } from "@/components/dashboard/Principles";
import { MotivationBanner } from "@/components/dashboard/MotivationBanner";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Dashboard() {
  return (
    <motion.div 
      className="space-y-12 pb-10"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <section className="relative flex flex-col items-center pb-8">
        <motion.div variants={fadeInUp} className="w-full max-w-7xl px-4 sm:px-6 pt-4 z-20">
          <PersonalizedGuidance />
        </motion.div>

        <motion.div variants={fadeInUp} className="w-full">
          <DashboardHero />
        </motion.div>
      </section>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <WhyCareerShift />
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <Principles />
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <MotivationBanner />
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <MythVsReality />
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <CareerShiftJourney />
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <AISuccessStories />
      </motion.div>

      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <FeaturedWorkshop />
      </motion.div>
    </motion.div>
  );
}
