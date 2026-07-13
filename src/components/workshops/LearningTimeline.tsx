import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";

const modules = [
  {
    title: "Understanding AI",
    description: "Demystify AI, learn what it can (and can't) do, and understand its role in the modern workplace.",
    duration: "45 mins",
  },
  {
    title: "Prompt Engineering",
    description: "Master the art of talking to AI. Learn frameworks to get the exact output you need, every time.",
    duration: "1.5 hours",
  },
  {
    title: "Daily AI Workflows",
    description: "Integrate AI into your daily routines. From email management to meeting summaries and research.",
    duration: "1 hour",
  },
  {
    title: "Using AI at Work",
    description: "Role-specific applications. See how marketers, managers, and analysts use AI to multiply their output.",
    duration: "1 hour",
  },
  {
    title: "AI Productivity Tools",
    description: "Beyond ChatGPT. Explore the ecosystem of AI tools for presentations, data analysis, and automation.",
    duration: "1 hour",
  },
  {
    title: "Career Growth Strategy",
    description: "Position yourself as an AI-augmented professional. Update your resume and LinkedIn to reflect your new skills.",
    duration: "45 mins",
  },
];

const outcomes = [
  "Learn practical AI",
  "Save hours every week",
  "Build AI confidence",
  "Increase productivity",
  "Improve employability",
  "Future-proof your career"
];

export function LearningTimeline() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">What You Will Learn</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A step-by-step curriculum designed to transform how you work, taking you from beginner to confident AI user.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Timeline */}
        <div className="lg:w-2/3">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
          >
            {modules.map((mod, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                  <span className="font-bold text-sm">M{index + 1}</span>
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card p-6 rounded-2xl border border-border shadow-soft group-hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground text-lg">{mod.title}</h3>
                    <div className="flex items-center gap-1.5 text-primary text-sm font-medium bg-primary/10 px-2 py-1 rounded">
                      <Clock className="w-3.5 h-3.5" />
                      {mod.duration}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{mod.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Outcomes Grid */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-card rounded-3xl border border-border p-8 shadow-elevated">
            <h3 className="text-xl font-bold text-foreground mb-6">Workshop Outcomes</h3>
            <div className="grid gap-4">
              {outcomes.map((outcome, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-foreground font-medium">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
