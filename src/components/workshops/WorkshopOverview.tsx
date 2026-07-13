import { motion } from "framer-motion";
import { Clock, Globe, Signal, Infinity, Award, Users } from "lucide-react";

export function WorkshopOverview() {
  const details = [
    { label: "Duration", value: "6 Hours", icon: Clock },
    { label: "Level", value: "Beginner to Intermediate", icon: Signal },
    { label: "Lifetime Access", value: "Yes", icon: Infinity },
    { label: "Certificate", value: "Included", icon: Award },
    { label: "Community", value: "Included", icon: Users },
    { label: "Language", value: "English", icon: Globe },
  ];

  return (
    <div className="py-12">
      <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Workshop Overview</h2>
          <p className="text-lg text-muted-foreground">Everything you need to master AI for everyday work.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {details.map((detail, idx) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="flex flex-col items-center p-4 rounded-xl bg-muted/50 border border-border/50 text-center hover:bg-muted transition-colors hover-lift"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-3 text-primary">
                <detail.icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{detail.label}</p>
              <p className="text-base font-semibold text-foreground">{detail.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
