import { motion } from "framer-motion";

export function MotivationBanner() {
  return (
    <div className="bg-[#0A1525] py-12 md:py-16 rounded-3xl text-center px-6 shadow-2xl relative overflow-hidden border border-white/5">
      {/* Subtle glow effects matching the hero */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#040810]/50 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-medium">
          The future doesn't belong to people who fear AI.
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c96a] to-[#c9a84c] italic block mt-4 font-bold drop-shadow-lg">
            It belongs to professionals who learn how to work alongside it.
          </span>
        </h2>
      </div>
    </div>
  );
}
