<<<<<<< HEAD
import type { CareerIntelligenceReport } from "@/api/report";

type Props = { report: CareerIntelligenceReport };

export function CareerIdentityTab({ report }: Props) {
  const c = report.career_identity;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-background p-8">
        <div className="text-sm font-bold uppercase tracking-wider text-brand mb-2">Identity</div>
        <h3 className="font-display text-3xl font-bold">{c.identity_title}</h3>
        <p className="mt-2 text-muted-foreground">{c.executive_summary}</p>
        <div className="mt-4 inline-flex rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
          {c.confidence_pct}% confidence
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Ideal Roles" items={c.ideal_roles} />
        <Section title="Superpowers" items={c.superpowers} />
        <Section title="Blind Spots" items={c.blind_spots} />
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h4 className="font-bold mb-2">Growth Strategy</h4>
        <p className="text-muted-foreground">{c.growth_strategy}</p>
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border p-6">
      <h4 className="font-bold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
=======
import { motion } from "framer-motion";
import { Sparkles, Target, Compass, Star, EyeOff, CheckCircle2, ChevronRight } from "lucide-react";
import type { ReportCareerIdentitySection } from "@/api/report";

export function CareerIdentityTab({ identity }: { identity: ReportCareerIdentitySection | null }) {
  if (!identity) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
        Career identity insights will appear after your report is generated.
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12 shadow-sm relative overflow-hidden backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Target className="h-40 w-40" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6 shadow-sm">
            Career Identity
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 mb-2">
            {identity.title}
          </h3>
          <p className="text-xl md:text-2xl font-bold text-primary mb-8">{identity.subtitle}</p>
          <p className="text-lg leading-relaxed text-muted-foreground font-medium max-w-4xl">
            {identity.narrative}
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 to-background p-8 shadow-sm relative overflow-hidden"
        >
          <h3 className="mb-8 font-display text-2xl font-bold flex items-center gap-3 text-brand">
            <div className="p-2.5 bg-brand/20 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-brand" />
            </div>
            Career Strengths
          </h3>
          <div className="space-y-4 text-lg font-semibold text-foreground">
            {identity.strengths.map((power, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 drop-shadow-[0_0_8px_rgba(var(--brand),0.5)]" />
                {power}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-background p-8 shadow-sm relative overflow-hidden"
        >
          <h3 className="mb-8 font-display text-2xl font-bold flex items-center gap-3 text-primary">
            <div className="p-2.5 bg-primary/20 rounded-xl">
              <EyeOff className="h-6 w-6 text-primary" />
            </div>
            Blind Spots
          </h3>
          <div className="space-y-4 text-lg font-semibold text-foreground">
            {identity.blind_spots.map((spot, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <EyeOff className="h-5 w-5 text-primary shrink-0 drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                {spot}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="mb-6 font-display text-2xl font-bold flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          Career Roadmap
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl border border-primary/10 bg-gradient-to-r from-background to-primary/5 p-10 shadow-sm">
          {identity.roadmap_nodes.map((node, i, arr) => (
            <div
              key={node.label}
              className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
            >
              <div className="flex flex-col items-center text-center group cursor-default">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                  {node.label}
                </span>
                <span
                  className={`font-bold text-xl px-6 py-3 rounded-2xl transition-all ${i === arr.length - 1 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105" : "bg-background border border-border text-foreground hover:border-primary/50"}`}
                >
                  {node.role}
                </span>
              </div>
              {i < arr.length - 1 && (
                <ChevronRight className="h-8 w-8 text-muted-foreground/30 rotate-90 md:rotate-0 my-4 md:my-0 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="mb-6 font-display text-2xl font-bold flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-xl">
            <Star className="h-6 w-6 text-brand" />
          </div>
          Ideal Future Roles
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {identity.ideal_roles.map((role) => (
            <div
              key={role.role}
              className="flex flex-col rounded-3xl border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-xl mb-3">{role.role}</h4>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed flex-1">
                {role.reason}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl bg-primary p-10 md:p-14 text-center shadow-lg text-primary-foreground"
      >
        <Sparkles className="h-12 w-12 text-brand mx-auto mb-6" />
        <p className="text-xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto">
          {identity.closing_note}
        </p>
      </motion.div>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962
    </div>
  );
}
