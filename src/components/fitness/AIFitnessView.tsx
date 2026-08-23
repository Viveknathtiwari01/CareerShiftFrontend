import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Loader2,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import type { AIFitnessResult } from "@/api/readiness";
import { PortfolioMixChart, ReadinessFactorChart } from "@/components/readiness/ReadinessCharts";

function FactorGrid({ factors }: { factors: AIFitnessResult["factors"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {factors.map((factor) => (
        <div key={factor.key} className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            {factor.label}
          </div>
          <div className="text-3xl font-display font-bold text-primary">{factor.score}</div>
          <p className="text-xs text-muted-foreground mt-2 font-medium leading-relaxed">
            {factor.summary}
          </p>
        </div>
      ))}
    </div>
  );
}

export function AIFitnessView({
  data,
  showFooterLink = true,
}: {
  data: AIFitnessResult;
  showFooterLink?: boolean;
}) {
  const radarData = data.dimensions.map((d) => ({
    subject: d.subject,
    A: d.score,
    fullMark: 100,
  }));

  return (
    <div className="space-y-10">
      <div className="hero-ink p-8 text-center md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Overall AI Fitness
        </p>
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary/30 bg-sidebar-foreground/5 mb-5">
          <div className="font-display text-4xl font-bold text-primary">
            {data.overall_score}
            <span className="text-lg text-sidebar-foreground/50">/100</span>
          </div>
        </div>
        <h3 className="font-display text-2xl font-bold mb-1">{data.tier_label}</h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-3">
          {data.tier} readiness · {data.tier === "High" ? "70+" : data.tier === "Medium" ? "40–69" : "0–39"}
        </p>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-sidebar-foreground/75">
          {data.summary}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-6 font-display text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand" /> Score breakdown
          </h3>
          <FactorGrid factors={data.factors} />
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 shadow-soft flex flex-col">
          <h3 className="mb-4 font-display text-lg font-bold text-center">Readiness radar</h3>
          <div className="w-full flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
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

      <div className="grid lg:grid-cols-2 gap-8">
        <ReadinessFactorChart factors={data.factors} />
        <PortfolioMixChart mix={data.portfolio_mix} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand" /> Strengths
          </h3>
          <div className="space-y-3">
            {data.strengths.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-brand/20 bg-brand/5 p-4 shadow-soft"
              >
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">{item.title}</span>
                  {item.detail && (
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" /> Improvement areas
          </h3>
          <div className="space-y-3">
            {data.improvements.map((area) => (
              <div
                key={area.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 shadow-soft"
              >
                <span className="font-medium">{area.title}</span>
                <div className="flex items-center gap-5 text-xs font-semibold">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                      Difficulty
                    </span>
                    <span className={area.difficulty === "High" ? "text-primary" : "text-muted-foreground"}>
                      {area.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                      Impact
                    </span>
                    <span className={area.impact === "High" ? "text-brand" : "text-primary"}>
                      {area.impact}
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
          <Lightbulb className="h-5 w-5" /> AI insight
        </h3>
        <p className="text-lg leading-relaxed text-foreground/90">{data.insight}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-background p-8 shadow-soft">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <AlertTriangle className="h-6 w-6" />
            <h3 className="font-display text-xl font-bold">Career risk</h3>
          </div>
          <div className="text-3xl font-display font-bold text-primary mb-4">{data.career_risk}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.career_risk_detail}</p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-8 shadow-soft">
          <div className="flex items-center gap-2 mb-4 text-brand">
            <TrendingUp className="h-6 w-6" />
            <h3 className="font-display text-xl font-bold">Career opportunity</h3>
          </div>
          <div className="text-3xl font-display font-bold text-brand mb-4">{data.career_opportunity}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.career_opportunity_detail}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" /> Recommended tools
          </h3>
          <div className="space-y-3">
            {data.recommended_tools.map((tool) => (
              <div key={tool.name} className="rounded-xl border border-border bg-background p-5 shadow-soft">
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
                      Suggested use
                    </div>
                    <div className="font-medium text-brand">{tool.use_case}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xl font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-brand" /> Quick wins
          </h3>
          <div className="space-y-3">
            {data.quick_wins.map((win, idx) => (
              <div
                key={`${win}-${idx}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-soft"
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

      {showFooterLink && (
        <div className="flex justify-end pt-8 border-t border-border">
          <Link
            to="/report"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
          >
            View full report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function AIFitnessLoading() {
  return (
    <div className="flex flex-col items-center py-20 text-muted-foreground">
      <Loader2 className="h-10 w-10 animate-spin text-brand" />
      <p className="mt-4 text-sm">Calculating your AI fitness score…</p>
    </div>
  );
}

export function AIFitnessEmpty({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 px-6 py-14 text-center">
      <p className="text-muted-foreground">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
