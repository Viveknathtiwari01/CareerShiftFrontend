import {
  Activity,
  AlertTriangle,
  Award,
  Brain,
  Briefcase,
  ChevronRight,
  Clock,
  Compass,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CareerIdentity() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="mb-3 font-display text-4xl font-bold tracking-tight">
          Your Career Identity
        </h2>
        <p className="max-w-6xl text-lg text-muted-foreground">
          Based on your experience, competencies, work patterns, and AI readiness, CareerShift has
          created a personalized career identity that reflects where you are today and where you can
          grow next.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-background p-8 md:p-12 shadow-soft">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Target className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-brand px-4 py-1.5 text-sm font-semibold text-foreground">
              AI Generated Identity
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-sm font-semibold text-primary-foreground">
              94% Confidence
            </div>
          </div>

          <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            AI-Augmented Backend Engineer
          </h3>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-8">
            Healthcare Technology Specialist
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Backend", "Healthcare", "Leadership", "Cloud", "AI Ready"].map((badge) => (
              <span
                key={badge}
                className="rounded-md bg-background/80 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-lg leading-relaxed text-foreground/90 max-w-3xl">
            You are a technically strong backend engineer who combines architecture thinking with
            practical software delivery. Your growing AI adoption and problem-solving abilities
            position you well for senior engineering and AI-enabled solution design roles.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            label: "Role",
            value: "Senior Backend Engineer",
            icon: Briefcase,
            color: "text-primary",
          },
          {
            label: "Primary Strength",
            value: "Backend Architecture",
            icon: Zap,
            color: "text-brand",
          },
          { label: "Industry", value: "Healthcare", icon: Activity, color: "text-primary" },
          { label: "Experience", value: "8 Years", icon: Clock, color: "text-primary" },
          { label: "Leadership", value: "Emerging", icon: Users, color: "text-primary" },
          { label: "AI Maturity", value: "Advanced", icon: Brain, color: "text-brand" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-sm"
          >
            <div
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted ${item.color}`}
            >
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </div>
              <div className="font-medium text-foreground">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-6 font-display text-2xl font-bold flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" /> Future Career Direction
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-background p-8 shadow-sm">
          {[
            { label: "Today", role: "Senior Backend Engineer" },
            { label: "Near Term", role: "AI-Augmented Engineer" },
            { label: "Mid Term", role: "Solution Architect" },
            { label: "Long Term", role: "AI Solutions Architect" },
          ].map((node, i, arr) => (
            <div
              key={node.label}
              className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {node.label}
                </span>
                <span
                  className={`font-semibold ${i === arr.length - 1 ? "text-primary text-lg" : "text-foreground"}`}
                >
                  {node.role}
                </span>
              </div>
              {i < arr.length - 1 && (
                <ChevronRight className="h-5 w-5 text-muted-foreground/50 rotate-90 md:rotate-0 my-4 md:my-0 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-6 font-display text-2xl font-bold flex items-center gap-2">
          <Star className="h-6 w-6 text-brand" /> Ideal Roles
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              role: "AI Backend Engineer",
              reason:
                "Leverages your deep backend skills while integrating AI services natively into applications.",
            },
            {
              role: "Platform Engineer",
              reason:
                "Fits your strong architectural thinking and desire to improve developer productivity.",
            },
            {
              role: "Solutions Architect",
              reason:
                "A natural progression for your system design strengths and emerging leadership.",
            },
            {
              role: "Engineering Manager",
              reason:
                "Capitalizes on your solid technical foundation to guide and mentor technical teams.",
            },
            {
              role: "AI Solutions Consultant",
              reason:
                "Combines your domain expertise (Healthcare) with cutting-edge AI implementation.",
            },
          ].map((role) => (
            <div
              key={role.role}
              className="flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="font-bold text-lg mb-2">{role.role}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{role.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 shadow-sm">
          <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2 text-brand">
            <Zap className="h-6 w-6" /> Superpowers
          </h3>
          <div className="space-y-4">
            {[
              "System Design",
              "API Development",
              "Leadership Potential",
              "Technical Decision Making",
              "AI Adaptability",
            ].map((power) => (
              <div key={power} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
                <span className="font-medium text-foreground">{power}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 shadow-sm">
          <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2 text-primary">
            <EyeOff className="h-6 w-6" /> Blind Spots
          </h3>
          <div className="space-y-4">
            {[
              "Prompt Engineering",
              "AI Workflow Automation",
              "Strategic Leadership",
              "Data Storytelling",
              "Business Thinking",
            ].map((spot) => (
              <div key={spot} className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-foreground">{spot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-6 font-display text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-brand" /> Personalized Growth Strategy
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 pb-4 border-b border-border">
              Next 30 Days
            </div>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Learn advanced prompting.
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Use AI daily for documentation.
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 pb-4 border-b border-border">
              Next 90 Days
            </div>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                Build an AI-integrated project.
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                Learn LangChain.
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                Use AI for architecture reviews.
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 pb-4 border-b border-border">
              Next 12 Months
            </div>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Lead AI initiatives.
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Mentor AI adoption.
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Move into Solution Architecture.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary bg-primary/5 p-8 shadow-soft">
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-primary">
          <Award className="h-6 w-6" /> CareerShift Recommendation
        </h3>
        <p className="text-lg leading-relaxed text-foreground/90 font-medium">
          Continue strengthening your technical expertise while expanding into AI-assisted software
          engineering. Focus on leadership, system thinking, and workflow automation to future-proof
          your career.
        </p>
      </div>

      <div className="rounded-2xl bg-primary p-8 md:p-12 text-center shadow-lg text-primary-foreground">
        <Sparkles className="h-10 w-10 text-brand mx-auto mb-6" />
        <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto">
          AI is not replacing your career. It is changing how exceptional professionals create
          value. Your strongest advantage will come from combining deep domain expertise with
          intelligent AI collaboration.
        </p>
      </div>

      <div className="flex justify-end pt-8 border-t border-border mt-12">
        <Link
          to="/report"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          View Career Intelligence Report
        </Link>
      </div>
    </div>
  );
}
