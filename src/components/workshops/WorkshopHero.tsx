import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function WorkshopHero() {
  return (
    <section className="bg-card border border-border rounded-xl px-6 py-12 sm:px-10 lg:px-16 text-center text-card-foreground shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          Your Assessment Is Complete.<br /> Your Growth Starts Now.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          CareerShift has shown you where you are today. Now let's help you become the professional AI will never replace.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-4">
          <Button size="default" className="rounded-md">
            Explore Workshop
          </Button>
          <Button variant="outline" size="default" className="rounded-md group">
            Watch Free Preview <Play className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
