import { BrainCircuit, Target, Lightbulb, Compass, Zap } from "lucide-react";
import { motion } from "framer-motion";

const truths = [
  { text: "Replace AI anxiety with specific, actionable clarity.", icon: Lightbulb },
  { text: "Diagnose your exact daily tasks (BUILD, BOT, or BLEND).", icon: Target },
  { text: "Avoid generic advice like 'learn AI' and focus on your role.", icon: Compass },
  { text: "Cut through the 'AI Fog' and know exactly where to start.", icon: BrainCircuit },
  { text: "Provide a personalized roadmap you can execute in hours.", icon: Zap },
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
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhyCareerShift() {
  return (
    <div className="py-10">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10">
        {/* Left Side: Text Content */}
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 md:p-12 shadow-sm flex flex-col justify-center">
          <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-wide text-[#0A121F] mb-6">
            Why We Built CareerShift
          </h2>
          <div className="space-y-6 text-base sm:text-[17px] text-[#4A5568] leading-relaxed font-light">
            <p>
              We built CareerShift to solve a massive problem:{" "}
              <strong className="text-[#0A121F] font-semibold">The "AI Fog."</strong>
            </p>
            <p>
              Professionals feel AI anxiety but lack specificity. You read headlines about AI
              replacing jobs, but you have no idea whether your specific daily tasks are at risk.
              Generic advice like "just learn AI" or "get certified" doesn't help because it ignores
              your unique, role-specific reality.
            </p>
            <p>
              CareerShift exists to bridge the gap between awareness that AI is changing work, and
              giving you the actionable clarity on exactly what to do about it:
            </p>
          </div>
        </div>

        {/* Right Side: List of Truths */}
        <div className="flex flex-col justify-center">
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {truths.map((truth, idx) => (
              <motion.div
                variants={itemVariants}
                key={idx}
                className="flex items-center gap-4 p-4 md:px-6 md:py-5 bg-white rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-2 bg-[#FDFBF2] rounded-full text-[#C9A84C] shrink-0 border border-[#E8C96A]/20">
                  <truth.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="text-[15px] font-medium text-[#2D3748] leading-snug">
                  {truth.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
