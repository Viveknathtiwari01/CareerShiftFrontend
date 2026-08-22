import { motion } from "framer-motion";
import { BrainCircuit, Hammer, Sparkles, Bot } from "lucide-react";

const PILLARS = [
  { key: "BUILD", icon: Hammer, label: "mastery" },
  { key: "BLEND", icon: Sparkles, label: "co-pilot" },
  { key: "BOT", icon: Bot, label: "automate" },
] as const;

export function ThreeBAnalysisHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="hero-ink relative p-8 text-center md:p-10 lg:p-12"
    >
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-bot-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.1),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/95 backdrop-blur-sm">
          <BrainCircuit className="h-3.5 w-3.5" />
          CareerShift Core Engine
        </div>

        <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
          Your personalized 3B intelligence map
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
          Daily work routed into what to deepen, augment, or automate — grounded in your reviewed
          tasks, hours, and role context.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {PILLARS.map(({ key, icon: Icon, label }) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="font-bold text-white">{key}</span>
              <span className="text-white/70">· {label}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
