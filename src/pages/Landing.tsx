import { Link } from "react-router-dom";
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
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Target,
  TrendingUp,
  Twitter,
  User,
  Video,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";
import logoImg from "@/assets/Logo.png";
import ownerPhoto from "@/assets/owner_photo.png";

export default Landing;

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Problem />
      <Framework3B />
      <HowItWorks />
      <ReportPreview />
      <Features />
      <Testimonials />
      <Pricing />
      <OurStory />
      <FAQ />
      <ContactUs />
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
    { label: "Workshop", href: "#workshop" },
    { label: "Pricing", href: "#pricing" },
    { label: "Our Story", href: "#our-story" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 animate-fade-in-up bg-[#f6f5ec]">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/log_text.jpeg" alt="CareerShift Logo" className="h-14 object-contain" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-black/90 transition-colors hover:text-black"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/auth" className="text-sm font-medium text-black/90 hover:text-black">
            Log in
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-elevated transition-transform hover:scale-[1.02]"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-black/10 text-black md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-black/10 bg-[#f6f5ec] md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-black/70 hover:bg-black/5 hover:text-black"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 px-1">
              <Link
                to="/auth"
                className="flex-1 rounded-lg border border-black/10 px-4 py-2 text-center text-sm font-medium text-black"
              >
                Log in
              </Link>
              <Link
                to="/auth"
                className="rounded-xl bg-primary/80 px-4 py-2 text-sm font-semibold text-black/90 shadow-soft transition-colors hover:bg-primary/20"
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
  return <img src={logoImg} alt="CareerShift Logo" className="h-10 object-contain" />;
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A1525]">
      <div className="container-page animate-fade-in-up relative grid gap-14 py-10 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-20 items-center">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 backdrop-blur">
            AI Career Readiness Report · Built for professionals
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Will AI take <span className="text-brand">your job?</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Find out exactly what to build, what to automate, and how to become the person companies
            fight to keep. Receive your personalized AI Career Readiness Report in minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-elevated transition-transform hover:scale-[1.02]"
            >
              Start free assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#report"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
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
                <dt className="font-display text-2xl font-bold text-white">{s.k}</dt>
                <dd className="mt-1 text-xs text-white/60">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand/20 via-primary/10 to-primary/10 blur-3xl opacity-30" />
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

/* ---------- PROBLEM ---------- */
function Problem() {
  const items = [
    {
      icon: <Compass className="h-5 w-5" />,
      title: "You don't know where to start",
      body: "Generic AI advice doesn't map to your actual role, industry, or daily workflow so you're guessing while others are adapting.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "You can't tell hype from risk",
      body: "Which tasks are about to be automated and which ones, if you master AI first, make you irreplaceable?",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "You're running without a roadmap.",
      body: "No clear roadmap of tools, skills, and moves that compound over the next 12 months.",
    },
  ];
  return (
    <section className="bg-background py-24">
      <div className="container-page animate-fade-in-up">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>The problem</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            AI won't take your job. But someone who uses AI might.
          </h2>
          <p className="mt-4 text-muted-foreground">
            The gap isn't knowledge. It's a plan. You need clarity on{" "}
            <span className="text-brand font-bold">your</span> role,
            <span className="text-brand font-bold"> your</span> tasks, and{" "}
            <span className="text-brand font-bold">your</span> next move.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="surface-card p-6 hover-lift">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
                {it.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-background">
                {it.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3B FRAMEWORK ---------- */
function Framework3B() {
  const items = [
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "BUILD IT",
      subtitle: "Human Mastery",
      body: "Tasks requiring human judgment, emotional intelligence, leadership, and relationships. AI cannot replace these you must develop and own them as human capabilities.",
      color: "border-brand/20",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "BOT IT",
      subtitle: "Full Automation",
      body: "Tasks that are repetitive, templated, or high-volume. AI handles these fully. Stop spending your energy here and deploy an AI tool to take over.",
      color: "border-primary/20",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "BLEND IT",
      subtitle: "Human + AI",
      body: "Tasks where you stay in the driver's seat, but AI accelerates your output. The crucial skill here is knowing how to direct AI, not working against it.",
      color: "border-foreground/20",
    },
  ];
  return (
    <section className="bg-[#0A1525] text-white py-24">
      <div className="container-page animate-fade-in-up">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow dark>The Engine</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            The 3B Framework
          </h2>
          <p className="mt-4 text-white/60">
            CareerShift analyzes every task in your role and routes it into one of three action
            categories, giving you a clear strategy for the age of AI.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:-translate-y-1 transition-transform"
            >
              <div className="inline-grid h-14 w-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-soft mb-2">
                {it.icon}
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">{it.title}</h3>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand">
                {it.subtitle}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60 flex-1">{it.body}</p>
            </div>
          ))}
        </div>
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
      body: "Each task is routed to Build, Bot, or Blend with risk, leverage, and hours saved.",
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
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
                  {s.icon}
                </div>
                <span className="font-display text-3xl font-bold text-muted-foreground/40">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-background">{s.title}</h3>
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
    <section id="report" className="bg-[#0A1525] text-white py-24">
      <div className="container-page animate-fade-in-up grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <SectionEyebrow dark>Sample report</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
            A consulting-grade report not another quiz result.
          </h2>
          <p className="mt-5 text-white/70">
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
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="text-white/90">{t}</span>
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
    <div className="bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden p-6 shadow-elevated">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-white/50">AI Career Readiness</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-white">
            Senior Marketing Manager
          </h3>
        </div>
        <span className="rounded-full bg-brand/20 px-2.5 py-1 text-xs font-medium text-brand">
          Report ready
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-[220px_1fr]">
        <ScoreRing score={82} />
        <div className="grid grid-cols-3 gap-3">
          <MiniStat label="Build" value="6" tint="brand" />
          <MiniStat label="Bot" value="9" tint="primary" />
          <MiniStat label="Blend" value="11" tint="muted" />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-white/50">Hours saved / week</p>
          <p className="text-xs font-semibold text-white">11.5h</p>
        </div>
        <BarRow />
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/50">
          <Zap className="h-3.5 w-3.5 text-brand" /> Top recommendation
        </div>
        <p className="mt-2 text-sm text-white/90">
          Automate briefing docs with an AI writing workflow saves ~4.2h/week and lifts throughput
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
        <circle cx="60" cy="60" r={r} className="fill-none stroke-white/10" strokeWidth="10" />
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
        <div className="font-display text-4xl font-bold text-white">{score}</div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-white/50">
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
  tint: "brand" | "primary" | "muted";
}) {
  const dot = tint === "brand" ? "bg-brand" : tint === "primary" ? "bg-primary" : "bg-white/30";
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-xs text-white/50">{label}</span>
      </div>
      <div className="mt-1.5 font-display text-2xl font-bold text-white">{value}</div>
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
          className="flex-1 rounded-t-md bg-gradient-to-t from-brand/70 to-primary/70"
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
      title: "Know exactly where you stand.",
      body: "A percentage score that measures your automation risk - with a full breakdown of what's driving it.",
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: "Build it. Bot it. Blend it.",
      body: "Every task mapped to one of three actions: <b>Build</b> (master the skill), <b>Bot</b> (automate it), or <b>Blend</b> (augment with AI) — ranked by impact and automation potential.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "The right tools, not the most popular ones.",
      body: "Hand-picked AI tools matched to your actual tasks — with real pricing, honest ratings, and realistic setup time.",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "A plan you can actually follow.",
      body: "Week-by-week skill building across 30, 60, and 90 days — sequenced so each step compounds into the next",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Cost & ROI Analysis",
      body: "<b>Know what this pays for itself.</b> A breakdown of tool costs vs. hours saved per week with payback period and annual value. No guesswork, just your actual task math.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Private by design",
      body: "Your assessment data is encrypted and never used to train external models.",
    },
  ];
  return (
    <section id="features" className="bg-background py-24 text-foreground">
      <div className="container-page animate-fade-in-up">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Features</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Your AI readiness, mapped end to end.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {feats.map((f) => (
            <div
              key={f.title}
              className="surface-card p-6 hover-lift group"
            >
              <div className="inline-grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
                {f.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-background">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: f.body }} />
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
        "Reads like a consulting brief. Confident, specific, and finally actionable worth every minute.",
      name: "Elena Rossi",
      role: "Senior Consultant",
    },
  ];
  return (
    <section className="bg-[#0A1525] py-24 text-white">
      <div className="container-page animate-fade-in-up">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow dark>Testimonials</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Professionals who stopped guessing.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-1 transition-transform group">
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white text-base ">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-brand-foreground">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-base text-white">{t.name}</div>
                  <div className="text-xs text-white/60">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  const tiers = [
    {
      name: 'Professional - "The Roadmap"',
      price: "$29",
      per: "/ one-time",
      sub: "Your complete 12-month plan. One-time purchase.",
      features: [
        "Full AI Readiness Report",
        "Complete breakdown across all task categories in your role",
        "Task Routing & Hours-Saved Analysis",
        "Every task mapped: Automate / Augment / Master + hours saved per week",
        "Full AI Toolkit with ROI",
        "5–8 curated tools, cost vs. time saved, payback period",
        "30/60/90-Day Learning Roadmap",
        "Week-by-week skill plan, not just a list",
        "PDF Export + Shareable Link",
        "For performance reviews, LinkedIn, or manager conversations"
      ],
      cta: "Get my report",
      highlighted: true,
    },
    {
      name: 'Enterprise - "The Workforce Plan"',
      price: "$199",
      per: "/ mo",
      sub: "Transform your team, not just your people.",
      features: [
       "Everything in Professional",
       "Per-employee reports and roadmaps",
       "Team Dashboard & Analytics",
       "Org-wide AI readiness heatmap, risk clusters, upskill gaps",
       "Role Benchmarking",
       "Compare roles against industry AI adoption standards",
       "Admin & SSO",
       "User provisioning, seat management, security",
       "Priority Support",
       "Dedicated onboarding + quarterly business reviews",
       "Custom Integrations",
       "API access, LMS/LXP integration, custom role libraries"
      ],
      cta: "Contact sales",
      highlighted: false,
    },
  ];
  return (
    <section id="pricing" className="animate-fade-in-up py-24">
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
        <div className="mx-auto mt-14 grid w-full max-w-5xl gap-14 md:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                t.highlighted
                  ? "border-transparent bg-primary text-primary-foreground shadow-elevated"
                  : "border-border bg-card text-card-foreground shadow-soft"
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-card px-3 py-1 text-xs font-semibold text-brand-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                {t.per && (
                  <span
                    className={
                      t.highlighted ? "text-primary-foreground/60" : "text-card-foreground/70"
                    }
                  >
                    {t.per}
                  </span>
                )}
              </div>
              <p
                className={`mt-1 text-sm ${t.highlighted ? "text-primary-foreground/70" : "text-card-foreground/70"}`}
              >
                {t.sub}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${
                        t.highlighted ? "text-primary-foreground" : "text-brand"
                      }`}
                    />
                    <span
                      className={
                        t.highlighted ? "text-primary-foreground/90" : "text-card-foreground"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  t.highlighted ? "bg-white text-primary" : "bg-primary text-primary-foreground"
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const qs = [
  {
    q: "Why I Built CareerShift",
    a: `I kept watching smart, capable people freeze.

Not because they were lazy. Not because they didn't care. But because every piece of AI advice fell into one of two traps: <b>too academic to act on</b>, or <b>so sensational it paralyzed them</b>.

I knew this because I lived it. I spent months chasing the <b>"right"</b> AI tools</b>, burning money on software that promised to transform my work but never fit my actual day. I was learning plenty. I just wasn't getting any clearer on what <b>I should do</b>.
<br/><br/>

Then I started noticing something in the rooms I facilitated. The same hesitation. The same quiet hope that maybe this wave would pass before it reached their desk. People weren't resisting change they were <b>missing a map</b>.
<br/><br/>

That's when it hit me:it doesn't matter when your organization officially starts optimizing with AI. The market is already moving. Your old skill set won't be irrelevant someday it's becoming irrelevant now.

I built CareerShift because I was tired of watching talented people get left behind by generic noise. I wanted something that didn't just explain AI, but told you exactly which parts of <b>your role to automate </b>, which human skills to double down on, and what your next 12 months should actually look like.
<br/><br/>
No more guesswork. No more hype. Just a clear, personal roadmap.
<br/><br/>
Because the goal isn't to turn you into an AI expert. It's to make sure <b>you're not replaced by one.</b>`,
  },
  {
    q: "How is CareerShift different from a generic AI chatbot?",
    a: `CareerShift isn't a chatbot, and it's not an LLM guessing at your job.

Generic AI tools will happily suggest random tasks to automate based on a prompt. CareerShift is built on a structured competency engine embedded with globally accepted skills and performance frameworks that organizations actually use as their talent backbone.
<br/><br/>
We anchor your assessment to real, validated job architecture. Our intelligence layer draws from globally accepted frameworks the same structured definitions of tasks, skills, and competencies used by governments and enterprises to map workforce capability. This isn't AI making up what it thinks you do. It's AI routing your actual role against verified industry standards.
<br/><br/>
The result? You don't get a conversation. You get a score, a task-routing breakdown (automate vs. augment vs. master), and a 12-month roadmap grounded in how talent actually gets measured and developed.
<br/><br/>
In short: Chatbots give opinions. CareerShift gives an assessment, direction, and guidance.`,
  },
  {
    q: "What is CareerShift?",
    a: `CareerShift is an AI readiness assessment platform. It analyzes your specific role and tasks, then delivers a structured report with your automation risk score, a task-routing breakdown, and a 12-month upskill roadmap grounded in real competency frameworks, not generic advice.
<br/><br/>
You can auto-generate tasks based on your role title, or manually enter your own and you have full control to edit, refine, or rewrite the final description of each task. That way, the tools and suggestions you get back are mapped to what you actually do, not what a database thinks you do.`,
  },
  {
    q: "Who is it built for?",
    a: "Mid-level and senior professionals with 5–20 years of experience marketers, consultants, HR, finance, ops, and executives. If you have a defined role with real tasks to analyze, CareerShift can map it.",
  },
  {
    q: "How long does the assessment take?",
    a: `12–20 minutes. Progress autosaves, so you can pause and resume anytime.
<br/><br/>
Most people finish in one sitting because the questions are tied to your actual tasks not abstract personality quizzes. You can auto-populate tasks or enter your own, and you control the final wording so the analysis maps to your real workflow. When you're done, your report generates instantly.`,
  },
  {
    q: "Is the $29 report really one-time?",
    a: `Yes. One payment. One comprehensive report.
<br/><br/>
No subscription, no hidden fees, and no "upgrade to unlock" games. We priced it like a book that changes your career because that's what it is.`,
  },
  {
    q: "Can my team or company use this?",
    a: `Absolutely.
<br/><br/>
For teams of 5–50, we offer an Enterprise tier with a team dashboard, role benchmarking, admin controls, and SSO.
<br/><br/>
For larger organizations, we build custom workforce readiness programs. Contact sales to learn more.`,
  },
  {
    q: "What if my role is niche?",
    a: `The assessment adapts to your inputs. Even if your title is uncommon, CareerShift maps your actual tasks against validated competency frameworks.
<br/><br/>
You can auto-generate a task list from your role, type in your own tasks from scratch, or mix both and you have full control to edit the final description of every task. The more specific and accurate you are about what you actually do, the sharper your tool recommendations and roadmap become.`,
  },
  {
    q: "Is my data private?",
    a: `Yes. Your data is encrypted in transit and at rest, and is never used to train third-party models.
<br/><br/>
Your report is yours. Period.`,
  },
  {
    q: "Can I share my report with my manager?",
    a: `Yes. Every paid report includes a PDF export and a private shareable link perfect for performance reviews, career conversations, or proving you're thinking ahead.`,
  },
  {
    q: "Who built this?",
    a: `CareerShift was built by Nureen Choudhary a talent and capability professional with 15+ years of experience at the intersection of AI transformation and workforce development.
<br/><br/>
After watching brilliant colleagues paralyzed by generic AI noise, she built the tool she wished existed: a personalized compass, not another conversation.`,
  },
  {
    q: "Do you offer workshops for teams or organizations?",
    a: `CareerShift workshops are built on your enterprise assessment data. We analyze your team's actual roles, tasks, and readiness scores first, then design the workshop around the specific gaps and opportunities in your organization.
<br/><br/>
You don't get a standard slide deck. You get a session mapped to your workflows, your tools, and your productivity bottlenecks so every minute drives real efficiency, not just awareness.
<br/><br/>
Workshops are available as part of our Enterprise tier. Contact sales to learn more.`,
  },
];
  return (
    <section id="faq" className="container-page animate-fade-in-up py-24">
      <div className="mx-auto w-full">
        <div className="text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card text-card-foreground w-full">
          {qs.map((item, index) => (
            <FaqItem
              key={item.q}
              {...item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="px-6">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-semibold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-card-foreground/70 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all ${
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="text-sm leading-relaxed text-card-foreground/80 faq-content" dangerouslySetInnerHTML={{ __html: a }} />
        </div>
      </div>
    </div>
  );
}

function HeroGraphic() {
  return (
    <div className="flex justify-center items-center relative overflow-hidden w-full aspect-square max-w-[500px] mx-auto scale-[0.65] sm:scale-[0.85] md:scale-100 origin-center">
      {/* Concentric rings */}
      <div className="absolute w-[100%] h-[100%] rounded-full border border-white/[0.04] pointer-events-none"></div>
      <div className="absolute w-[75%] h-[75%] rounded-full border border-white/[0.04] pointer-events-none"></div>
      <div className="absolute w-[50%] h-[50%] rounded-full border border-white/[0.04] pointer-events-none"></div>

      {/* Connection Lines */}
      <div className="absolute w-[75%] h-[75%] rounded-full border border-white/[0.06] pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          viewBox="0 0 400 400"
        >
          <line
            x1="200"
            y1="200"
            x2="62"
            y2="3"
            stroke="currentColor"
            className="text-white/30"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="338"
            y2="3"
            stroke="currentColor"
            className="text-white/30"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="436"
            y2="242"
            stroke="currentColor"
            className="text-white/30"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="282"
            y2="426"
            stroke="currentColor"
            className="text-white/30"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="200"
            y1="200"
            x2="16"
            y2="355"
            stroke="currentColor"
            className="text-white/30"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Cards */}
        <div
          className="absolute pointer-events-auto"
          style={{ left: "15.5%", top: "0.75%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19] rounded-2xl p-4 w-[140px] border border-white/5 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 cursor-pointer shadow-2xl">
            <div className="text-white/80 text-[11px] font-bold tracking-wide truncate">
              Bot Potential
            </div>
            <div className="text-brand text-2xl font-display font-bold my-1 leading-none">42%</div>
            <div className="text-white/40 text-[9px] font-bold tracking-widest uppercase leading-none mt-1">
              TASKS TO AUTOMATE
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "4%", top: "88.75%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19] rounded-2xl p-4 w-[140px] border border-white/5 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 cursor-pointer shadow-2xl">
            <div className="text-white/80 text-[11px] font-bold tracking-wide truncate">
              Human Mastery
            </div>
            <div className="text-brand text-2xl font-display font-bold my-1 leading-none">35%</div>
            <div className="text-white/40 text-[9px] font-bold tracking-widest uppercase leading-none mt-1">
              TASKS TO BUILD
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "109%", top: "60.5%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19] rounded-2xl p-4 w-[140px] border border-white/5 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 cursor-pointer shadow-2xl">
            <div className="text-white/80 text-[11px] font-bold tracking-wide truncate">
              AI Acceleration
            </div>
            <div className="text-brand text-2xl font-display font-bold my-1 leading-none">23%</div>
            <div className="text-white/40 text-[9px] font-bold tracking-widest uppercase leading-none mt-1">
              TASKS TO BLEND
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "70.5%", top: "106.5%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19] rounded-2xl p-4 w-[140px] border border-white/5 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 cursor-pointer shadow-2xl">
            <div className="text-white/80 text-[11px] font-bold tracking-wide truncate">
              Time Reclaimed
            </div>
            <div className="text-brand text-2xl font-display font-bold my-1 leading-none">
              11.5h
            </div>
            <div className="text-white/40 text-[9px] font-bold tracking-widest uppercase leading-none mt-1">
              SAVED PER WEEK
            </div>
          </div>
        </div>
        <div
          className="absolute pointer-events-auto"
          style={{ left: "84.5%", top: "0.75%", transform: "translate(-50%, -50%)" }}
        >
          <div className="bg-[#0b0f19] rounded-2xl p-4 w-[140px] border border-white/5 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 cursor-pointer shadow-2xl">
            <div className="text-white/80 text-[11px] font-bold tracking-wide truncate">
              AI Readiness
            </div>
            <div className="text-brand text-2xl font-display font-bold my-1 leading-none">82</div>
            <div className="text-white/40 text-[9px] font-bold tracking-widest uppercase leading-none mt-1">
              TOP 15% SCORE
            </div>
          </div>
        </div>
      </div>

      {/* Center Node and Ripples */}
      <div className="absolute w-[35%] h-[35%] flex items-center justify-center pointer-events-none z-10">
        <div className="absolute w-full h-full rounded-full border border-brand/20 bg-brand/[0.02] animate-valRadarWave"></div>
        <div
          className="absolute w-full h-full rounded-full border border-brand/20 bg-brand/[0.02] animate-valRadarWave"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="w-[110px] h-[110px] rounded-full border border-white/10 bg-[#0A1525] flex flex-col items-center justify-center p-3 shadow-2xl pointer-events-auto relative z-20">
          {/* <BrainCircuit className="h-7 w-7 text-brand mb-1" strokeWidth={2} /> */}
          <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] leading-none mb-1 mt-1">
            CAREER
          </span>
          <span className="text-white/40 text-[7px] font-bold tracking-[0.1em] leading-none">
            AI ENGINE
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- OUR STORY ---------- */
function OurStory() {
  return (
    <section id="our-story" className="bg-[#0A1525] py-24 text-white">
      <div className="container-page animate-fade-in-up">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow dark>Our Story</SectionEyebrow>
          <div className="mx-auto w-32 h-32 my-10 relative">
            <div className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-tr from-brand/20 to-primary/20 blur-xl opacity-60"></div>
            <img
              src="/nc.jpeg"
              alt="Owner of CareerShift"
              className="w-full h-full rounded-[2.5rem] shadow-elevated object-cover border-2 border-white/10"
            />
          </div>
          <div className="font-display font-semibold text-xl text-white mb-10">
            CareerShift Founder - Nurren Chaudhry
          </div>

          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:p-12 text-left shadow-soft mt-8 mx-auto">
             <div className="absolute -top-6 -left-6 md:-left-8 text-brand opacity-30">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
             </div>
             <div className="space-y-6 text-white/90 text-lg md:text-xl font-medium leading-relaxed italic relative z-10 md:px-8">
                <p>
                  "As a professional navigating the rapid advancements in AI, I saw brilliant
                  colleagues feeling overwhelmed and uncertain about their future. The advice out
                  there was either too academic or just sensationalist fear-mongering.
                </p>
                <p>
                  I realized we didn't need another generic AI tutorial. We needed a personalized
                  compass. We needed to know exactly which parts of our jobs to automate, and which
                  human skills to double down on.
                </p>
                <p>
                  That's why CareerShift was born. My mission is to empower professionals to move
                  from anxiety to advantage, giving them a clear, actionable roadmap to thrive in
                  the age of AI."
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT US ---------- */
function ContactUs() {
  return (
    <section id="contact" className="bg-[#0A1525] text-white py-24 border-y border-white/10">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow dark>Contact Us</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Let's talk about your next move.
          </h2>
          <p className="mt-4 text-white/60">
            Whether you're mapping your own AI readiness or building a workforce plan for your team, we're here to help you get clarity fast.
          </p>
        </div>

        <div className="mt-14 mx-auto max-w-5xl grid gap-10 md:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="font-display text-xl font-semibold mb-6 text-white">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <User className="w-4 h-4 text-brand" /> First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand text-white placeholder-white/30 transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <User className="w-4 h-4 text-brand" /> Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand text-white placeholder-white/30 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand" /> Email Address
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand text-white placeholder-white/30 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand" /> Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand text-white placeholder-white/30 transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground shadow-elevated transition-transform hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          </div>

          {/* Booking Options */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex-1">
              <h3 className="font-display text-xl font-semibold mb-2 text-white">
                Book an Appointment
              </h3>
              <p className="text-sm text-white/60 mb-8">
                Choose a time that works best for you. We offer video and phone consultations.
              </p>

              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand hover:bg-brand/10 group"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/20 text-brand">
                    <Video className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-brand transition-colors">
                      Google / Zoom Meeting
                    </h4>
                    <p className="text-xs text-white/50 mt-0.5">30 min video consultation</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-white/30 group-hover:text-brand transition-colors group-hover:translate-x-1" />
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-primary hover:bg-primary/20 group"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                      Phone Call
                    </h4>
                    <p className="text-xs text-white/50 mt-0.5">15 min quick chat</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-white/30 group-hover:text-primary transition-colors group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="container-page py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-elevated sm:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl opacity-30" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl opacity-30" />
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-soft transition-transform hover:scale-[1.02]"
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
      links: [
        { label: "For Teams", href: "#" },
        { label: "Workshops", href: "#workshops" },
      ],
    },
    { title: "Resources", links: [{ label: "FAQ", href: "#faq" }] },
    { title: "Company", links: [{ label: "About", href: "#our-story" }, { label: "Join Us", href: "#" }, { label: "Contact", href: "#contact" }] },
    { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Cookies", href: "#" }] },
  ];
  return (
    <footer className="border-t border-border bg-[#0A1525]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src="/Logo_text_.png" alt="CareerShift Logo" className="h-32 object-contain" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/45">
              Bridge your career to the AI future with clarity, confidence, and a plan.
            </p>
            <div className="mt-5 flex gap-2">
              {[Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/55 transition-colors hover:bg-white/10 hover:text-[#C9A84C]"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('/') ? (
                      <Link
                        to={l.href}
                        className="text-sm text-white/55 transition-colors hover:text-[#C9A84C]"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        onClick={(e) => {
                          if (l.href.startsWith("#") && l.href.length > 1) {
                            const el = document.querySelector(l.href);
                            if (el) {
                              e.preventDefault();
                              el.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }}
                        className="text-sm text-white/55 transition-colors hover:text-[#C9A84C]"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/6 pt-6 text-xs text-white/25 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} CareerShift. All rights reserved.</span>
          <span>Built for professionals navigating the AI shift.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SHARED ---------- */
function SectionEyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand ${dark ? "border-white/10 bg-white/5" : "border-border bg-card"}`}
    >
      {children}
    </span>
  );
}
