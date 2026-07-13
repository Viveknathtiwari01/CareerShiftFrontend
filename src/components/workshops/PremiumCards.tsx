import { motion } from "framer-motion";
import { Brain, Briefcase, Zap, ShieldCheck } from "lucide-react";

const features = [
  {
    name: "Learn Practical AI",
    description: "Understand how professionals use AI every day to solve real problems.",
    icon: Brain,
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    name: "AI for Your Job",
    description: "See role-specific AI workflows instead of generic tutorials.",
    icon: Briefcase,
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
  },
  {
    name: "Real Productivity",
    description: "Learn how AI saves hours without replacing your expertise.",
    icon: Zap,
    color: "from-warm/20 to-warm/5",
    iconColor: "text-warm",
  },
  {
    name: "Future-Proof Your Career",
    description: "Develop the skills employers expect in the AI era.",
    icon: ShieldCheck,
    color: "from-teal-500/20 to-teal-500/5",
    iconColor: "text-teal-500",
  },
];

export function PremiumCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="py-12">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Why This Workshop?
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          We don't teach you how to build AI. We teach you how to use it practically to advance your
          career.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={feature.name}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all shadow-soft overflow-hidden flex flex-col sm:flex-row gap-5"
          >
            {/* Background glow on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div
              className={`relative shrink-0 rounded-xl bg-muted p-3 h-fit border border-border group-hover:bg-background transition-colors`}
            >
              <feature.icon className={`h-6 w-6 ${feature.iconColor}`} aria-hidden="true" />
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
