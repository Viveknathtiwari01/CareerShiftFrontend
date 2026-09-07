import { motion } from "framer-motion";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { CareerShiftJourney } from "@/components/dashboard/CareerShiftJourney";
import { OverviewTopBar } from "@/components/dashboard/OverviewTopBar";
import { OverviewQuickAccess } from "@/components/dashboard/OverviewQuickAccess";
import { OverviewCareerGlance } from "@/components/dashboard/OverviewCareerGlance";
import { OverviewReportBanner } from "@/components/dashboard/OverviewReportBanner";
import { OverviewExploreSections } from "@/components/dashboard/OverviewExploreSections";
import { OverviewFooter } from "@/components/dashboard/OverviewFooter";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Dashboard() {
  return (
    <motion.div
      className="w-full space-y-8 pb-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="space-y-3">
        <OverviewTopBar />
        <div className="space-y-5">
          <DashboardHero />
          <CareerShiftJourney />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <OverviewQuickAccess />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <OverviewCareerGlance />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <OverviewReportBanner />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <OverviewExploreSections />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <OverviewFooter />
      </motion.div>
    </motion.div>
  );
}
