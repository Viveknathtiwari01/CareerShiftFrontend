import { motion } from "framer-motion";
import { Terminal, Briefcase, Users, Brain } from "lucide-react";

const IMPORTANCE_COLORS: Record<string, string> = {
  High: "text-brand",
  Medium: "text-primary",
  Low: "text-muted-foreground",
};

const PROFICIENCY_COLORS = (prof: number) => {
  if (prof >= 80) return "bg-brand";
  if (prof >= 60) return "bg-primary";
  return "bg-muted-foreground";
};

const GROWTH_STYLES: Record<string, string> = {
  "Critical Focus": "bg-brand/10 text-brand border border-brand/20",
  Mastery: "bg-primary/10 text-primary border border-primary/20",
  Expand: "bg-secondary text-secondary-foreground border border-border",
  Develop: "bg-secondary text-secondary-foreground border border-border",
  Leverage: "bg-secondary text-secondary-foreground border border-border",
  Optimize: "bg-secondary text-secondary-foreground border border-border",
  Maintain: "bg-secondary text-secondary-foreground border border-border",
};

export function CompetencyTab() {
  const groups = [
    {
      title: "Technical",
      icon: Terminal,
      color: "text-primary",
      bg: "bg-primary/10",
      items: [
        { name: "Backend Architecture", proficiency: 90, importance: "High", growth: "Mastery" },
        { name: "API Development", proficiency: 85, importance: "High", growth: "Optimize" },
        { name: "Cloud Infrastructure", proficiency: 70, importance: "Medium", growth: "Expand" },
        {
          name: "AI Prompt Engineering",
          proficiency: 40,
          importance: "High",
          growth: "Critical Focus",
        },
      ],
    },
    {
      title: "Business",
      icon: Briefcase,
      color: "text-brand",
      bg: "bg-brand/10",
      items: [
        {
          name: "Domain Knowledge (Healthcare)",
          proficiency: 80,
          importance: "High",
          growth: "Leverage",
        },
        { name: "Product Strategy", proficiency: 50, importance: "Medium", growth: "Develop" },
        { name: "Cost Optimization", proficiency: 60, importance: "Low", growth: "Maintain" },
      ],
    },
    {
      title: "Leadership",
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      items: [
        { name: "Technical Mentoring", proficiency: 75, importance: "High", growth: "Expand" },
        { name: "Cross-functional Comms", proficiency: 65, importance: "High", growth: "Develop" },
        {
          name: "AI Change Management",
          proficiency: 20,
          importance: "High",
          growth: "Critical Focus",
        },
      ],
    },
    {
      title: "Behavioral",
      icon: Brain,
      color: "text-primary",
      bg: "bg-primary/10",
      items: [
        { name: "Problem Solving", proficiency: 95, importance: "High", growth: "Mastery" },
        { name: "Adaptability", proficiency: 85, importance: "High", growth: "Leverage" },
        { name: "Continuous Learning", proficiency: 90, importance: "High", growth: "Maintain" },
      ],
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {groups.map((group, groupIdx) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIdx * 0.1 }}
          key={group.title}
          className="rounded-3xl border border-border bg-background shadow-sm overflow-hidden"
        >
          <div className="border-b border-border p-6 flex items-center gap-3 bg-muted/30">
            <div className={`p-2 rounded-xl ${group.bg}`}>
              <group.icon className={`h-6 w-6 ${group.color}`} />
            </div>
            <h3 className="font-display text-xl font-bold">{group.title} Competencies</h3>
          </div>

          <div className="p-6 grid gap-6">
            {group.items.map((item, idx) => (
              <div key={idx} className="grid md:grid-cols-[1fr_2fr_1fr] gap-6 items-center">
                <div>
                  <h4 className="font-bold text-foreground">{item.name}</h4>
                  <div className="flex gap-3 mt-1.5 text-xs font-semibold">
                    <span className="text-muted-foreground uppercase tracking-wider">
                      Importance:
                    </span>
                    <span className={IMPORTANCE_COLORS[item.importance] || "text-primary"}>
                      {item.importance}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Proficiency</span>
                    <span>{item.proficiency}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.proficiency}%` }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                      className={`h-full rounded-full ${PROFICIENCY_COLORS(item.proficiency)}`}
                    />
                  </div>
                </div>

                <div className="md:text-right">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                    Growth Opportunity
                  </div>
                  <div
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      GROWTH_STYLES[item.growth] ||
                      "bg-secondary text-secondary-foreground border border-border"
                    }`}
                  >
                    {item.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
