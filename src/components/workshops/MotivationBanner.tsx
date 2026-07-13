import { motion } from "framer-motion";

export function MotivationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24"
    >
      <div className="relative rounded-[2.5rem] overflow-hidden surface-card p-10 md:p-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <blockquote className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-8">
            <span className="text-primary/50">"</span>
            AI will not replace people who know their profession.{" "}
            <span className="text-gradient-brand">
              People who learn to collaborate with AI will lead the future.
            </span>
            <span className="text-primary/50">"</span>
          </blockquote>

          <div className="w-16 h-1 bg-gradient-brand mx-auto rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
