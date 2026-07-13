import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import {
  Activity,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Wrench,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AIReadiness() {
  const radarData = [
    { subject: "Technical Skills", A: 82, fullMark: 100 },
    { subject: "AI Skills", A: 79, fullMark: 100 },
    { subject: "Business Skills", A: 73, fullMark: 100 },
    { subject: "Leadership", A: 88, fullMark: 100 },
    { subject: "Adaptability", A: 67, fullMark: 100 },
    { subject: "Collaboration", A: 75, fullMark: 100 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="mb-3 font-display text-4xl font-bold tracking-tight">
          AI Readiness Assessment
        </h2>
        <p className="max-w-6xl text-lg text-muted-foreground">
          CareerShift evaluated your current AI adoption, work patterns, competencies, and career
          profile to estimate how prepared you are for the evolving AI workplace.
        </p>
      </div>

      <div className="mx-auto max-w-6xl rounded-2xl border border-primary/20 bg-brand p-8 text-center shadow-soft relative overflow-hidden">
        <div className="text-sm font-bold uppercase tracking-wider text-white mb-4">
          Overall AI Readiness
        </div>
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-primary/20 bg-background mb-6">
          <div className="text-4xl font-display font-bold text-brand">
            76<span className="text-xl text-muted-foreground">/100</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Good</h3>
        <p className="text-base text-white max-w-xl mx-auto leading-relaxed">
          You are ahead of many professionals in AI adoption, but there are several opportunities to
          strengthen your long-term career resilience.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand" /> AI Readiness Breakdown
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                AI Adoption
              </div>
              <div className="text-3xl font-display font-bold text-primary">82</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Strong daily tool usage.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Technical Readiness
              </div>
              <div className="text-3xl font-display font-bold text-primary">79</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Solid backend foundation.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Automation Readiness
              </div>
              <div className="text-3xl font-display font-bold text-primary">73</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Some workflows automated.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Learning Mindset
              </div>
              <div className="text-3xl font-display font-bold text-primary">88</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">Highly adaptable.</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Leadership Readiness
              </div>
              <div className="text-3xl font-display font-bold text-primary">67</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Needs strategic focus.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Future Adaptability
              </div>
              <div className="text-3xl font-display font-bold text-primary">75</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                Good long-term prospects.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm flex flex-col">
          <h3 className="mb-4 font-display text-lg font-bold text-center">Competency Radar</h3>
          <div className="w-full flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#888", fontSize: 11 }} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="var(--color-brand)"
                  strokeWidth={2}
                  fill="var(--color-brand)"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand" /> Strengths
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-4 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
              <span className="font-medium text-foreground">Strong Backend Engineering</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-4 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
              <span className="font-medium text-foreground">Good AI Tool Adoption</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-4 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
              <span className="font-medium text-foreground">Excellent Problem Solving</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-4 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
              <span className="font-medium text-foreground">High Technical Confidence</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" /> Improvement Areas
          </h3>
          <div className="space-y-3">
            {[
              { title: "Prompt Engineering", diff: "Medium", imp: "High" },
              { title: "Leadership", diff: "High", imp: "High" },
              { title: "AI Workflow Design", diff: "Medium", imp: "High" },
              { title: "AI Automation", diff: "Medium", imp: "Medium" },
              { title: "Data Interpretation", diff: "Low", imp: "Medium" },
            ].map((area) => (
              <div
                key={area.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 shadow-sm"
              >
                <span className="font-medium">{area.title}</span>
                <div className="flex items-center gap-5 text-xs font-semibold">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                      Difficulty
                    </span>
                    <span
                      className={area.diff === "High" ? "text-primary" : "text-muted-foreground"}
                    >
                      {area.diff}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                      Impact
                    </span>
                    <span className={area.imp === "High" ? "text-brand" : "text-primary"}>
                      {area.imp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 shadow-soft">
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-brand">
          <Lightbulb className="h-5 w-5" /> AI Insights
        </h3>
        <p className="text-lg leading-relaxed text-foreground/90">
          You already use AI daily for coding assistance, but you're not leveraging AI for
          documentation, planning, testing, or workflow automation. Expanding AI into these areas
          could significantly improve your productivity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <AlertTriangle className="h-6 w-6" />
            <h3 className="font-display text-xl font-bold">Career Risk Meter</h3>
          </div>
          <div className="text-3xl font-display font-bold text-primary mb-4">Medium Risk</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Routine development tasks are increasingly AI-assisted, but your architecture and
            leadership responsibilities remain valuable.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-brand">
            <TrendingUp className="h-6 w-6" />
            <h3 className="font-display text-xl font-bold">Career Opportunity</h3>
          </div>
          <div className="text-3xl font-display font-bold text-brand mb-4">
            High Growth Potential
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your combination of backend expertise and AI adoption positions you well for
            AI-augmented engineering roles.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" /> Recommended Tools
          </h3>
          <div className="space-y-3">
            {[
              {
                name: "ChatGPT",
                fit: "General problem solving & ideation",
                useCase: "Architecture planning",
              },
              {
                name: "Cursor",
                fit: "AI-first code editor",
                useCase: "Daily coding & refactoring",
              },
              {
                name: "GitHub Copilot",
                fit: "Inline code generation",
                useCase: "Boilerplate & unit tests",
              },
              {
                name: "Claude",
                fit: "Large context reasoning",
                useCase: "Log analysis & documentation",
              },
              { name: "Perplexity", fit: "AI search engine", useCase: "Researching new libraries" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-border bg-background p-5 shadow-sm"
              >
                <h4 className="font-bold text-foreground mb-3">{tool.name}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                      Why it fits
                    </div>
                    <div className="font-medium text-foreground/90">{tool.fit}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                      Suggested Use Case
                    </div>
                    <div className="font-medium text-brand">{tool.useCase}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-brand" /> Quick Wins
          </h3>
          <div className="space-y-3">
            {[
              "Learn Prompt Engineering",
              "Automate Documentation",
              "Build an AI Side Project",
              "Use AI for Code Reviews",
              "Practice AI-assisted Architecture Design",
            ].map((win, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-sm"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  {idx + 1}
                </div>
                <span className="font-medium text-foreground/90">{win}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8 border-t border-border mt-12">
        <Link
          to="/career-identity"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          View Career Identity <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
