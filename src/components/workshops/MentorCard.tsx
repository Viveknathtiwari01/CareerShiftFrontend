import { motion } from "framer-motion";
import { Award, Briefcase, Target, Quote } from "lucide-react";

export function MentorCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="surface-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-50" />

        <div className="flex flex-col md:flex-row relative z-10 gap-8 items-start">
          {/* Small Photo Section */}
          <div className="shrink-0 relative">
            <img
              src="/nc.jpeg"
              alt="Nureen Chaudhary"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-card shadow-elevated"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
              <Award className="w-5 h-5" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 text-primary font-semibold tracking-wide uppercase text-sm">
              Meet Your Mentor
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Nureen Chaudhary</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-primary" /> Founder of CareerShift
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-teal-400" /> AI Consultant
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-warm" /> 10+ Years Experience
              </span>
            </div>

            <div className="relative mb-6">
              <Quote className="absolute -top-4 -left-4 w-10 h-10 text-white/10 -z-10" />
              <p className="text-white text-lg leading-relaxed font-medium italic pl-4 border-l-2 border-primary/30">
                "I created CareerShift because I saw too many brilliant professionals holding
                themselves back out of fear of AI. The truth is, AI won't replace you—someone using
                AI will."
              </p>
            </div>

            <div className="bg-background/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
              <h4 className="text-white font-semibold flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" /> Our Mission
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                To help professionals across all industries learn how to seamlessly integrate AI
                into their daily workflows, working with it as a partner instead of fearing it as a
                replacement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
