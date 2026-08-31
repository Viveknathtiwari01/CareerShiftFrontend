import {
  User,
  ClipboardList,
  Briefcase,
  Sparkles,
  FileText,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { step: 1, title: "Understand Yourself", name: "Career Profile", icon: User },
  { step: 2, title: "Analyze Your Work", name: "AI Assessment", icon: ClipboardList },
  {
    step: 3,
    title: "Discover AI Opportunities",
    name: "Task Routing (BUILD, BOT, BLEND)",
    icon: Briefcase,
  },
  {
    step: 4,
    title: "Create Your Career Identity",
    name: "Career Intelligence Report",
    icon: FileText,
  },
  { step: 5, title: "Learn", name: "Workshops & Upskill Roadmap", icon: BookOpen },
  { step: 6, title: "Grow", name: "Continuous Improvement", icon: TrendingUp },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CareerShiftJourney() {
  return (
    <div className="py-10">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#0A121F] mb-3">
          How CareerShift Helps You
        </h2>
        <p className="text-[17px] text-[#4A5568] font-light">
          Your step-by-step roadmap to achieving AI fluency and career resilience.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {steps.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="flex items-center gap-5 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0 text-[#475569] group-hover:bg-[#E2E8F0] group-hover:text-[#0A121F] transition-colors duration-300">
              <item.icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            
            <div className="flex flex-col">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1.5">
                STEP {item.step}
              </div>
              <h3 className="font-display text-[20px] font-medium text-[#0A121F] leading-tight mb-1">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#718096] font-light">
                {item.name}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
