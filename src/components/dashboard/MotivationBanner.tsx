import { motion } from "framer-motion";

export function MotivationBanner() {
  return (
    <div className="hero-ink py-8 md:py-10 rounded-3xl text-center px-6 shadow-xl relative overflow-hidden">
      {/* Subtle glow effects matching the hero */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed">
          The future doesn't belong to people who fear AI.
          <br className="hidden md:block" />
          <span className="text-[#e8c96a] italic block mt-3">
            It belongs to professionals who learn how to work alongside it.
          </span>
        </h2>
      </div>
    </div>
  );
}
