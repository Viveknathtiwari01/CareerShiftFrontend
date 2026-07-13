import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";

export function WorkshopHero() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section className="relative overflow-hidden rounded-3xl surface-card px-6 py-20 sm:px-10 lg:px-16 text-center shadow-2xl my-6">
      <div className="absolute inset-0 bg-hero opacity-30 mix-blend-overlay" />

      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl"
      >
        <motion.div variants={itemVars} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/30 backdrop-blur-sm">
            AI + Professional Collaboration
          </span>
        </motion.div>

        <motion.h1
          variants={itemVars}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white"
        >
          Your Assessment Is Complete.
          <br />
          <span className="text-primary">Your Growth Starts Now.</span>
        </motion.h1>

        <motion.p
          variants={itemVars}
          className="mt-6 text-lg leading-8 text-white/80 max-w-2xl mx-auto"
        >
          CareerShift has shown you where you are today. Now let's help you become the professional
          AI will never replace.
        </motion.p>

        <motion.div
          variants={itemVars}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-full w-full sm:w-auto text-base h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Explore Workshop
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-full sm:w-auto text-base h-12 px-8 group border-primary/50 text-white hover:text-primary-foreground hover:bg-primary bg-white/5 backdrop-blur-sm"
          >
            Watch Free Preview
            <Play className="ml-2 h-4 w-4 transition-transform group-hover:scale-110 fill-current" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
