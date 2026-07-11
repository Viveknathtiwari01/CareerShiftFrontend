import { motion } from "framer-motion";

export function MotivationBanner() {
  return (
    <div className="py-8 bg-muted/50 rounded-xl border border-border text-center px-6 my-6 shadow-sm">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-snug">
          "The future doesn't belong to people who fear AI. <br className="hidden md:block" />
          <span className="text-primary">It belongs to professionals who learn how to work alongside it.</span>"
        </h2>
      </div>
    </div>
  );
}
