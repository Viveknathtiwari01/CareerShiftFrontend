import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function WorkshopCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 mb-20"
    >
      <div className="hero-ink rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-teal/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-sidebar-foreground mb-6 tracking-tight">
            Ready to Build Your AI Future?
          </h2>
          <p className="text-lg md:text-xl text-sidebar-foreground/80 mb-10 leading-relaxed">
            Join CareerShift's practical AI workshop and start using AI confidently in your everyday
            work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full w-full sm:w-auto text-lg h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105"
            >
              Enroll in Workshop
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-full sm:w-auto text-lg h-14 px-8 group border-sidebar-foreground/30 text-sidebar-foreground hover:text-primary-foreground hover:bg-primary bg-white/5 backdrop-blur-sm font-semibold transition-all"
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 fill-current" />
              Watch Preview Again
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
