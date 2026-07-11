import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  FileText,
  Github,
  Linkedin,
  Menu,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustedBy />
      <Problem />
      <HowItWorks />
      <ReportPreview />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Sample report", href: "#report" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight">CareerShift</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/auth"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 px-1">
              <Link
                to="/auth"
                className="flex-1 rounded-lg border border-border px-4 py-2 text-center text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                to="/auth"
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
              >
                Start free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <div className="relative grid h-8 w-8 place-items-center rounded-lg bg-primary shadow-soft">
      <BrainCircuit className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.5} />
      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-warm ring-2 ring-background" />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page animate-fade-in-up relative grid gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            AI Career Readiness Report · Built for professionals
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Know exactly how <span className="text-brand">AI will change</span> your career.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Understand which parts of your work should be automated, augmented, or mastered — and
            receive a personalized AI Career Readiness Report with practical next steps.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02]"
            >
              Start free assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#report"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              View sample report
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
            {[
              { k: "12 min", v: "Avg assessment" },
              { k: "40+", v: "Data signals" },
              { k: "97%", v: "Would recommend" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-bold text-foreground">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand/20 via-teal/10 to-warm/10 blur-3xl opacity-30" />
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className = "",
  icon,
  title,
  value,
  trend,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}) {
  return (
    <div className={`surface-glass animate-float w-56 gap-3 p-4 shadow-elevated ${className}`}>
      <div className="flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-muted">{icon}</div>
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{trend}</div>
    </div>
  );
}

/* ---------- TRUSTED BY ---------- */
function TrustedBy() {
  const logos = ["Linear", "Notion", "Vercel", "Figma", "Stripe", "Ramp"];
  return (
    <section className="border-y border-border/60 bg-surface-2/50">
      <div className="container-page py-10">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by professionals from
        </p>
        <div className="mt-6 grid grid-cols-3 items-center gap-6 md:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l}
              className="text-center font-display text-lg font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROBLEM ---------- */
function Problem() {
  const items = [
    {
      icon: <Compass className="h-5 w-5 text-brand" />,
      title: "You don't know where to start",
      body: "Generic AI advice doesn't map to your role, industry, or daily workflow.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-teal" />,
      title: "You can't tell hype from risk",
      body: "Which tasks are actually at risk of automation — and which give you leverage?",
    },
    {
      icon: <Rocket className="h-5 w-5 text-warm" />,
      title: "You're missing a plan",
      body: "No clear roadmap of tools, skills, and moves that compound over the next 12 months.",
    },
  ];
  return (
    <section className="container-page animate-fade-in-up py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>The problem</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          AI anxiety is a planning problem, not an information problem.
        </h2>
        <p className="mt-4 text-muted-foreground">
          You've read the think-pieces. You need clarity on{" "}
          <span className="text-foreground">your</span> role,
          <span className="text-foreground"> your</span> tasks, and{" "}
          <span className="text-foreground">your</span> next move.
        </p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="surface-card p-6 hover-lift">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">{it.icon}</div>
            <h3 className="mt-5 font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: <FileText className="h-5 w-5" />,
      title: "Map your work",
      body: "A 12-minute guided assessment captures your role, tasks, time allocation, and goals.",
    },
    {
      n: "02",
      icon: <BrainCircuit className="h-5 w-5" />,
      title: "AI analyzes every task",
      body: "Each task is routed to Build, Bot, or Blend — with risk, leverage, and hours saved.",
    },
    {
      n: "03",
      icon: <Target className="h-5 w-5" />,
      title: "Get your action plan",
      body: "A personal roadmap: tools to adopt, skills to learn, and moves to make in the next 90 days.",
    },
  ];
  return (
    <section id="how" className="bg-surface-2/60 py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From curiosity to a career strategy in 12 minutes.
          </h2>
        </div>
        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute left-8 right-8 top-16 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {steps.map((s) => (
            <div key={s.n} className="surface-card relative p-7">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                  {s.icon}
                </div>
                <span className="font-display text-3xl font-bold text-muted-foreground/40">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- REPORT PREVIEW ---------- */
function ReportPreview() {
  return (
    <section id="report" className="container-page animate-fade-in-up py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <SectionEyebrow>Sample report</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A consulting-grade report — not another quiz result.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Every report is packed with visual insights: an AI Readiness Score, task-by-task
            routing, hours saved, recommended tools, salary premium data, and a 12-month learning
            roadmap.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Personalized AI Readiness Score with confidence band",
              "Task routing across Build · Bot · Blend",
              "Curated AI toolkit with pricing and ROI",
              "12-month learning roadmap and skill priorities",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            View a full sample report <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <ReportMockup />
      </div>
    </section>
  );
}

function ReportMockup() {
  return (
    <div className="surface-card relative overflow-hidden p-6 shadow-elevated">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">AI Career Readiness</p>
          <h3 className="mt-1 font-display text-lg font-semibold">Senior Marketing Manager</h3>
        </div>
        <span className="rounded-full bg-teal/10 px-2.5 py-1 text-xs font-medium text-teal">
          Report ready
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-[220px_1fr]">
        <ScoreRing score={82} />
        <div className="grid grid-cols-3 gap-3">
          <MiniStat label="Build" value="6" tint="brand" />
          <MiniStat label="Bot" value="9" tint="teal" />
          <MiniStat label="Blend" value="11" tint="warm" />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Hours saved / week</p>
          <p className="text-xs font-semibold text-foreground">11.5h</p>
        </div>
        <BarRow />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface-2 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-warm" /> Top recommendation
        </div>
        <p className="mt-2 text-sm text-foreground">
          Automate briefing docs with an AI writing workflow — saves ~4.2h/week and lifts throughput
          28%.
        </p>
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  return (
    <div className="relative mx-auto grid h-40 w-40 place-items-center">
      <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90">
        <circle cx="60" cy="60" r={r} className="fill-none stroke-muted" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          className="fill-none"
          stroke="url(#g)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.20 262)" />
            <stop offset="100%" stopColor="oklch(0.72 0.13 185)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-4xl font-bold">{score}</div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Readiness
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint: "brand" | "teal" | "warm";
}) {
  const dot = tint === "brand" ? "bg-brand" : tint === "teal" ? "bg-teal" : "bg-warm";
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="mt-1.5 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}

function BarRow() {
  const bars = [40, 65, 30, 80, 55, 72, 48];
  return (
    <div className="flex h-24 items-end gap-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-brand/70 to-teal/70"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const feats = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "AI Readiness Score",
      body: "A single, defensible number that captures your position — with the signals behind it.",
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: "Task Routing",
      body: "Every task categorized as Build, Bot, or Blend based on impact and automation potential.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI Toolkit",
      body: "Curated tools matched to your workflow — with pricing, ratings, and setup time.",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Learning Roadmap",
      body: "Prioritized skills and courses, sequenced across 30, 60, and 90-day horizons.",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Market Insights",
      body: "Salary premiums, demand trends, and role trajectories for your industry.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Private by design",
      body: "Your assessment data is encrypted and never used to train external models.",
    },
  ];
  return (
    <section id="features" className="bg-surface-2/60 py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Features</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to future-proof your role.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {feats.map((f) => (
            <div key={f.title} className="surface-card group p-6 hover-lift">
              <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
                {f.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    {
      quote:
        "The report was more useful than three months of newsletter reading. I finally know which two tools to actually adopt.",
      name: "Priya Menon",
      role: "Head of Marketing, Fintech",
    },
    {
      quote:
        "Task routing across Build / Bot / Blend gave my team a shared language for what to automate first.",
      name: "David Osei",
      role: "Ops Director, SaaS",
    },
    {
      quote:
        "Reads like a consulting brief. Confident, specific, and finally actionable — worth every minute.",
      name: "Elena Rossi",
      role: "Senior Consultant",
    },
  ];
  return (
    <section className="container-page animate-fade-in-up py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Testimonials</SectionEyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Professionals who stopped guessing.
        </h2>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="surface-card flex flex-col p-6">
            <div className="flex gap-0.5 text-warm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  const tiers = [
    {
      name: "Explorer",
      price: "Free",
      sub: "Try the assessment risk-free",
      features: [
        "12-minute AI assessment",
        "Basic readiness score",
        "3 tool recommendations",
        "Email report",
      ],
      cta: "Start free",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$29",
      per: "/ one-time",
      sub: "Full report + 12-month roadmap",
      features: [
        "Complete AI Readiness Report",
        "Task routing & hours-saved analysis",
        "Full AI Toolkit with ROI",
        "Learning roadmap (30/60/90-day)",
        "PDF export & shareable link",
      ],
      cta: "Get my report",
      highlighted: true,
    },
    {
      name: "Team",
      price: "$199",
      per: "/ mo",
      sub: "For teams of 5–50",
      features: [
        "Everything in Professional",
        "Team dashboard & analytics",
        "Role benchmarking",
        "Admin & SSO",
        "Priority support",
      ],
      cta: "Contact sales",
      highlighted: false,
    },
  ];
  return (
    <section id="pricing" className="bg-surface-2/60 py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing. Serious clarity.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade only when you want the full report and roadmap.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                t.highlighted
                  ? "border-transparent bg-primary text-primary-foreground shadow-elevated"
                  : "border-border bg-card text-foreground shadow-soft"
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warm px-3 py-1 text-xs font-semibold text-navy">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                {t.per && (
                  <span
                    className={
                      t.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
                    }
                  >
                    {t.per}
                  </span>
                )}
              </div>
              <p
                className={`mt-1 text-sm ${t.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}
              >
                {t.sub}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${
                        t.highlighted ? "text-teal" : "text-teal"
                      }`}
                    />
                    <span
                      className={t.highlighted ? "text-primary-foreground/90" : "text-foreground"}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  t.highlighted ? "bg-white text-navy" : "bg-primary text-primary-foreground"
                }`}
              >
                {t.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const qs = [
    {
      q: "How is CareerShift different from a generic AI chatbot?",
      a: "CareerShift is an assessment platform. It analyzes your specific tasks and role, then returns a structured report — not a conversation. You get a score, a task-routing breakdown, and a 12-month roadmap.",
    },
    {
      q: "How long does the assessment take?",
      a: "About 12 minutes on average. Progress is autosaved, so you can pause and resume anytime.",
    },
    {
      q: "Who is it built for?",
      a: "Mid-level and senior professionals with 5–20 years of experience — marketers, consultants, HR, finance, ops, and executives.",
    },
    {
      q: "Is my data private?",
      a: "Yes. Your data is encrypted in transit and at rest, and is never used to train third-party models.",
    },
    {
      q: "Can I share my report with my manager?",
      a: "Yes. Every paid report includes a PDF export and a private shareable link.",
    },
  ];
  return (
    <section id="faq" className="container-page animate-fade-in-up py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {qs.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

function HeroGraphic() {
  return (
    <div className="flex justify-center items-center relative min-h-[500px] overflow-visible w-full aspect-square max-w-[500px] mx-auto scale-[0.85] origin-center">
      {/* Concentric rings */}
      <div className="absolute w-[100%] h-[100%] rounded-full border border-white/[0.02] pointer-events-none"></div>
      <div className="absolute w-[75%] h-[75%] rounded-full border border-white/[0.03] pointer-events-none"></div>
      <div className="absolute w-[50%] h-[50%] rounded-full border border-white/[0.02] pointer-events-none"></div>

      {/* Connection Lines */}
      <div className="absolute w-[75%] h-[75%] rounded-full border border-white/[0.06] pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          viewBox="0 0 400 400"
        >
          <line
            x1="200"
            y1="200"
            x2="85"
            y2="36"
            stroke="currentColor"
            className="text-brand opacity-50"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="315"
            y2="36"
            stroke="currentColor"
            className="text-brand opacity-50"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="397"
            y2="235"
            stroke="currentColor"
            className="text-brand opacity-50"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="268"
            y2="388"
            stroke="currentColor"
            className="text-brand opacity-50"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="47"
            y2="329"
            stroke="currentColor"
            className="text-brand opacity-50"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Cards */}
        <div
          className="absolute pointer-events-auto"
          style={{ left: "21.25%", top: "9%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19]/90 backdrop-blur-md rounded-lg p-3 w-[110px] border border-transparent transition-all duration-300 hover:border-primary hover:-translate-y-1.5 cursor-pointer shadow-soft">
            <div className="text-white/60 text-[10px] font-semibold tracking-wider truncate">
              Loyalists
            </div>
            <div className="text-primary text-lg font-bold my-0.5 leading-none">11%</div>
            <div className="text-white/40 text-[8px] font-bold tracking-widest leading-none">
              HIGH LTV
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "11.75%", top: "82.25%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19]/90 backdrop-blur-md rounded-lg p-3 w-[110px] border border-transparent transition-all duration-300 hover:border-primary hover:-translate-y-1.5 cursor-pointer shadow-soft">
            <div className="text-white/60 text-[10px] font-semibold tracking-wider truncate">
              Researchers
            </div>
            <div className="text-primary text-lg font-bold my-0.5 leading-none">19%</div>
            <div className="text-white/40 text-[8px] font-bold tracking-widest leading-none">
              LONG CYCLE
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "99.25%", top: "58.75%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19]/90 backdrop-blur-md rounded-lg p-3 w-[110px] border border-transparent transition-all duration-300 hover:border-primary hover:-translate-y-1.5 cursor-pointer shadow-soft">
            <div className="text-white/60 text-[10px] font-semibold tracking-wider truncate">
              Impulse
            </div>
            <div className="text-primary text-lg font-bold my-0.5 leading-none">22%</div>
            <div className="text-white/40 text-[8px] font-bold tracking-widest leading-none">
              FAST CONVERT
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "67%", top: "97%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19]/90 backdrop-blur-md rounded-lg p-3 w-[110px] border border-transparent transition-all duration-300 hover:border-primary hover:-translate-y-1.5 cursor-pointer shadow-soft">
            <div className="text-white/60 text-[10px] font-semibold tracking-wider truncate">
              Churners
            </div>
            <div className="text-primary text-lg font-bold my-0.5 leading-none">20%</div>
            <div className="text-white/40 text-[8px] font-bold tracking-widest leading-none">
              AT-RISK
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "78.75%", top: "9%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19]/90 backdrop-blur-md rounded-lg p-3 w-[110px] border border-transparent transition-all duration-300 hover:border-primary hover:-translate-y-1.5 cursor-pointer shadow-soft">
            <div className="text-white/60 text-[10px] font-semibold tracking-wider truncate">
              Deal Hunters
            </div>
            <div className="text-primary text-lg font-bold my-0.5 leading-none">28%</div>
            <div className="text-white/40 text-[8px] font-bold tracking-widest leading-none">
              PRICE-DRIVEN
            </div>
          </div>
        </div>
      </div>

      {/* Center Node and Ripples */}
      <div className="absolute w-[35%] h-[35%] flex items-center justify-center pointer-events-none z-10">
        <div className="absolute w-full h-full rounded-full border border-primary/45 bg-primary/[0.01] animate-valRadarWave"></div>
        <div
          className="absolute w-full h-full rounded-full border border-primary/45 bg-primary/[0.01] animate-valRadarWave"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="w-[100px] h-[100px] rounded-full border border-primary/45 bg-[#080d16] flex flex-col items-center justify-center p-3 shadow-[0_0_25px_var(--color-primary)] pointer-events-auto">
          <BrainCircuit className="h-6 w-6 text-primary mb-1" strokeWidth={2.5} />
          <span className="text-white text-[8px] font-bold tracking-[0.2em] leading-none mb-0.5 mt-1">
            CAREER
          </span>
          <span className="text-primary/70 text-[6px] font-bold tracking-[0.1em] leading-none">
            AI ENGINE
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-elevated sm:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl opacity-30" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal/30 blur-3xl opacity-30" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Turn AI anxiety into an AI advantage.
          </h2>
          <p className="mt-4 text-primary-foreground/70">
            Take the 12-minute assessment. Get your personalized report. Own the next chapter of
            your career.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-soft transition-transform hover:scale-[1.02]"
            >
              Start free assessment
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#report"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-white/10"
            >
              See sample report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Features", "How it works", "Sample report", "Pricing", "Changelog"],
    },
    { title: "Resources", links: ["Blog", "AI toolkit", "Learning hub", "Guides", "FAQ"] },
    { title: "Company", links: ["About", "Careers", "Contact", "Press", "Partners"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA", "Cookies"] },
  ];
  return (
    <footer className="border-t border-border bg-surface-2/60">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-lg font-bold">CareerShift</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Bridge your career to the AI future — with clarity, confidence, and a plan.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} CareerShift. All rights reserved.</span>
          <span>Built for professionals navigating the AI shift.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SHARED ---------- */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
      {children}
    </span>
  );
}
