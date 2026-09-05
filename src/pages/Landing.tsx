import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Cpu,
  FileText,
  Flame,
  Github,
  Globe,
  Layers,
  Linkedin,
  Instagram,
  Mail,
  Menu,
  MessageSquare,
  Network,
  Rocket,
  Settings,
  SlidersHorizontal,
  UserSearch,
  ShieldCheck,
  Signal,
  Sparkles,
  Target,
  Twitter,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { restoreSectionFromHash, scrollToSection } from "@/lib/scroll-to-section";
import heroImg from "@/assets/hero.jpg";
import logoImg from "@/assets/Logo.png";

export default Landing;

function Landing() {
  useEffect(() => {
    restoreSectionFromHash();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <MockStats />
      <Problem />
      <TheCareerShiftWay />
      <section id="how">
        <HowItWorks />
        <ReportPreview />
      </section>
      <WorkIntelligence />
      <Features />
      <Pricing />
      <FAQ />
      <ContactUs />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* ---------- NAV ---------- */
type NavLinkItem =
  | { label: string; sectionId: string }
  | { label: string; to: string };

const NAV_LINKS: NavLinkItem[] = [
  { label: "CareerShift Way", sectionId: "framework" },
  { label: "How It Works", sectionId: "how" },
  { label: "What's Inside", sectionId: "features" },
  { label: "Pricing", sectionId: "pricing" },
  { label: "About Us", to: "/about" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 animate-fade-in-up bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/new_logo11.png" alt="CareerShift Logo" className="h-14 object-contain" />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((l) =>
            "to" in l ? (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium text-black/80 transition-colors hover:text-black"
              >
                {l.label}
              </Link>
            ) : (
              <SectionLink
                key={l.label}
                sectionId={l.sectionId}
                className="text-sm font-medium text-black/80 transition-colors hover:text-black"
              >
                {l.label}
              </SectionLink>
            )
          )}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/auth" className="text-sm font-semibold text-black/80 hover:text-black">
            Log in
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FDCF58] px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-transform hover:scale-[1.02]"
          >
            Get My Report
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-black/10 text-black lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((l) =>
              "to" in l ? (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
                >
                  {l.label}
                </Link>
              ) : (
                <SectionLink
                  key={l.label}
                  sectionId={l.sectionId}
                  onNavigate={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
                >
                  {l.label}
                </SectionLink>
              )
            )}
            <div className="mt-2 flex gap-2 px-1">
              <Link
                to="/auth"
                className="flex-1 rounded-lg border border-black/10 px-4 py-2 text-center text-sm font-medium text-black"
              >
                Log in
              </Link>
              <Link
                to="/auth"
                className="rounded-xl bg-[#FDCF58] px-4 py-2 text-center text-sm font-semibold text-black shadow-sm transition-colors hover:bg-[#ebd593]"
              >
                Get My Report
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
    <section className="relative overflow-hidden bg-white">
      {/* Background soft gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -left-[20%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#FDCF58]/10 blur-[100px]" />
        <div className="absolute right-[5%] -top-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
      
      <div className="container-page animate-fade-in-up relative grid gap-10 pt-6 pb-6 md:gap-14 md:pt-10 md:pb-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-12 lg:pb-10 items-center">
        <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
          <div className="text-xs font-semibold tracking-widest text-black/50 uppercase">
            CAREER INTELLIGENCE FOR THE FUTURE OF WORK
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#0B1D3A] sm:text-5xl lg:text-6xl">
            Your work is changing.<br />
            <span className="text-[#D39933]">Know what to do next.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/70">
            CareerShift analyses your role, tasks and skills to show what to Build, Bot and Blend - and gives you practical tools and opportunities for what comes next.
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row lg:mr-auto max-w-2xl">
            <Link
              to="/auth"
              className="inline-flex w-full sm:w-auto whitespace-nowrap items-center justify-center gap-2 rounded-full bg-[#FDCF58] px-8 py-3.5 text-sm font-bold text-black shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#ebd593]"
            >
              Get my Career Intelligence Report
            </Link>
            <SectionLink
              sectionId="report"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-black/10 bg-transparent px-8 py-3.5 text-sm font-bold text-[#0B1D3A] transition-colors hover:bg-black/5"
            >
              View sample report
            </SectionLink>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-black/60 font-medium">
            <Clock className="h-4 w-4" />
            <span>One-time report · Takes about 20 minutes</span>
          </div>
        </div>

        <div className="relative w-full max-w-[600px] justify-self-center lg:justify-self-end mt-10 lg:mt-0">
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}

function MockStats() {
  return (
    <section className="relative z-0 -mt-2 bg-white pb-8 md:-mt-14 lg:-mt-8">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem] border border-black/5 bg-white p-6 md:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex flex-1 flex-col sm:flex-row items-center justify-around gap-6 w-full">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold tracking-tight text-[#0B1D3A]">40+</div>
                <div className="text-xs font-medium text-black/60">Industries mapped</div>
              </div>
            </div>
            
            <div className="hidden sm:block h-12 w-px bg-black/5"></div>
            
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-500">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold tracking-tight text-[#0B1D3A]">2,500+</div>
                <div className="text-xs font-medium text-black/60">Competencies structured</div>
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-black/5"></div>

            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-500">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold tracking-tight text-[#0B1D3A]">125K+</div>
                <div className="text-xs font-medium text-black/60">Tasks & skills mapped</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block h-16 w-px bg-black/10 mx-4"></div>

          <div className="w-full md:w-auto text-center md:text-left pt-4 md:pt-0 border-t md:border-none border-black/5">
            <div className="text-[10px] font-bold tracking-[0.2em] text-black/50 leading-loose">
              REAL INSIGHTS.<br />
              PRACTICAL ACTIONS.<br />
              A MORE RELEVANT YOU.
            </div>
          </div>
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

function Problem() {
  const items = [
    {
      num: "01",
      icon: <Compass className="h-6 w-6 text-[#0f172a]" />,
      iconBg: "bg-[#FEF3C7]",
      title: "You don't know where to start.",
      body: "There's too much information, too many tools and opinions - and no clear way to understand what actually applies to your role and industry.",
    },
    {
      num: "02",
      icon: <ShieldCheck className="h-6 w-6 text-[#0f172a]" />,
      iconBg: "bg-[#CCFBF1]",
      title: "You can't tell hype from impact.",
      body: "It's hard to know which tasks can be automated, where AI can genuinely help, and where human capability still matters - so you can focus on what really deserves your attention.",
    },
    {
      num: "03",
      icon: <Rocket className="h-6 w-6 text-[#0f172a]" />,
      iconBg: "bg-[#E0E7FF]",
      title: "You're running without a clear plan.",
      body: "Without a structured view of your tasks, skills and opportunities, it's easy to feel uncertain about what to do next.",
    },
  ];
  return (
    <section className="bg-background py-24">
      <div className="container-page animate-fade-in-up">
        <div className="relative mb-16">
          {/* Left Decorative - absolutely positioned so it doesn't affect centering */}
          <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 w-max xl:left-0 z-0">
            <div className="text-[32px] leading-[1.1] text-foreground -rotate-6" style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}>
              Change<br />
              is real.<br />
              So are your<br />
              opportunities.
            </div>
            <svg width="180" height="20" viewBox="0 0 180 20" className="absolute -bottom-4 left-2 text-[#FDCF58] -rotate-6 pointer-events-none">
              <path d="M0,15 Q90,-5 180,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          
          {/* Center Content */}
          <div className="mx-auto max-w-2xl text-center relative z-10">
            <SectionEyebrow>The problem</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              AI won't take your job. But someone who uses AI might.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The gap isn't knowledge. It's clarity. You need to understand what in your work can be automated, what still needs you, and how to stay ahead.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="surface-card p-6 hover-lift relative overflow-hidden">
              <div className="absolute top-6 right-6 text-4xl font-display font-bold text-muted-foreground/20 select-none">
                {it.num}
              </div>
              <div className={`grid h-14 w-14 place-items-center rounded-full ${it.iconBg} shadow-soft`}>
                {it.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground relative z-10">
                {it.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground relative z-10">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- THE CAREERSHIFT WAY ---------- */
function TheCareerShiftWay() {
  return (
    <section id="framework" className="bg-[#0B1D3A] text-white py-24 overflow-hidden font-sans">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionEyebrow dark>The Careershift way</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            Your job title doesn't tell the whole story. <span className="text-[#FDCF58]">Your work does.</span>
          </h2>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-3xl mx-auto">
            We analyse your role, tasks and skills, understand how you actually work, and show you what to <span className="text-[#FDCF58]">Build, Bot and Blend</span> - so you can make informed decisions about your future.
          </p>
        </div>

        {/* Graphic Area */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-0 mb-24">
          
          {/* Left Side Group */}
          <div className="flex flex-col xl:flex-row items-center justify-end flex-1 gap-8 xl:gap-4 xl:pr-6">
            {/* 1. Your Role Box */}
            <div className="w-[200px] shrink-0 bg-white rounded-3xl p-6 text-center shadow-lg relative z-10 flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-14 h-14 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7" />
              </div>
              <div className="text-[#0B1D3A] font-bold text-[17px] mb-2">Your Role</div>
              <div className="text-[#0B1D3A]/60 text-sm">e.g. Marketing Manager</div>
            </div>

            <ArrowRight className="hidden xl:block w-5 h-5 text-white/30 shrink-0" />
            <div className="xl:hidden w-px h-8 bg-white/20" />

            {/* 2. Your Work Box */}
            <div className="w-[220px] shrink-0 bg-white/5 rounded-3xl p-6 border border-white/10 relative z-10 flex flex-col min-h-[220px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <div className="text-white font-bold text-[16px]">Your Work</div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <FileText className="w-4 h-4" />, label: "Tasks" },
                  { icon: <Settings className="w-4 h-4" />, label: "Skills" },
                  { icon: <Clock className="w-4 h-4" />, label: "Time" },
                  { icon: <BarChart3 className="w-4 h-4" />, label: "Frequency" },
                  { icon: <Flame className="w-4 h-4" />, label: "Criticality" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 text-white/80 text-[15px]">
                    <div className="text-white/50">{item.icon}</div> <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <ArrowRight className="hidden xl:block w-5 h-5 text-white/30 shrink-0" />
            <div className="xl:hidden w-px h-8 bg-white/20" />
          </div>

          {/* 3. Center Engine */}
          <div className="w-[280px] h-[280px] shrink-0 relative flex items-center justify-center">
            {/* Glowing rings */}
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-4 rounded-full border border-white/10 shadow-[0_0_30px_rgba(253,207,88,0.1)]" />
            <div className="absolute inset-8 rounded-full border border-[#00E5FF]/30 border-r-[#FDCF58]/40 border-b-[#A855F7]/30 border-l-[#3B82F6]/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-12 rounded-full border border-white/5" />
            
            <div className="text-center z-10 relative">
              <div className="text-white font-bold text-[22px] tracking-wide mb-1">
                <span className="text-[#FDCF58]">Career</span>Shift3B
              </div>
              <div className="text-white/50 text-[11px] uppercase tracking-[0.15em] leading-relaxed">
                Work Intelligence<br />Engine
              </div>
            </div>

            {/* Curving paths to the 3Bs (Desktop only) */}
            <svg className="hidden xl:block absolute left-[98%] top-1/2 -translate-y-1/2 w-[60px] h-[180px] pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M0,90 C30,90 30,20 60,20" fill="none" stroke="#FDCF58" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
              <path d="M0,90 L60,90" fill="none" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
              <path d="M0,90 C30,90 30,160 60,160" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
              
              {/* Solid Dots at ends */}
              <circle cx="60" cy="20" r="3" fill="#FDCF58" />
              <circle cx="60" cy="90" r="3" fill="#14B8A6" />
              <circle cx="60" cy="160" r="3" fill="#8B5CF6" />
            </svg>
          </div>

          {/* Right Side Group */}
          <div className="flex flex-col xl:flex-row items-center justify-start flex-1 gap-8 xl:gap-4 xl:pl-8 mt-8 xl:mt-0">
            <div className="xl:hidden w-px h-8 bg-white/20" />

            {/* 4. The 3Bs Stack */}
            <div className="flex flex-col gap-4 shrink-0 relative z-10 w-[260px]">
              {/* Build It */}
              <div className="bg-[#FEF3C7] rounded-2xl p-4 flex items-center gap-4 shadow-lg border border-[#F59E0B]/20">
                <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0">
                  <Brain className="w-6 h-6 text-[#D97706]" />
                </div>
                <div>
                  <div className="text-[#D97706] font-bold text-[14px] uppercase tracking-wider mb-0.5">Build It</div>
                  <div className="text-[#0B1D3A]/70 text-[12px] leading-tight">Strengthen what stays human</div>
                </div>
              </div>
              {/* Bot It */}
              <div className="bg-[#CCFBF1] rounded-2xl p-4 flex items-center gap-4 shadow-lg border border-[#14B8A6]/20">
                <div className="w-12 h-12 rounded-full bg-[#14B8A6]/20 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-[#0F766E]" />
                </div>
                <div>
                  <div className="text-[#0F766E] font-bold text-[14px] uppercase tracking-wider mb-0.5">Bot It</div>
                  <div className="text-[#0B1D3A]/70 text-[12px] leading-tight">Identify what can be automated</div>
                </div>
              </div>
              {/* Blend It */}
              <div className="bg-[#E0E7FF] rounded-2xl p-4 flex items-center gap-4 shadow-lg border border-[#6366F1]/20">
                <div className="w-12 h-12 rounded-full bg-[#6366F1]/20 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#4338CA]" />
                </div>
                <div>
                  <div className="text-[#4338CA] font-bold text-[14px] uppercase tracking-wider mb-0.5">Blend It</div>
                  <div className="text-[#0B1D3A]/70 text-[12px] leading-tight">Find where human + AI work better together</div>
                </div>
              </div>
            </div>

            <ArrowRight className="hidden xl:block w-5 h-5 text-white/30 shrink-0" />
            <div className="xl:hidden w-px h-8 bg-white/20" />

            {/* 5. Result Box */}
            <div className="w-[230px] shrink-0 bg-white rounded-3xl p-7 shadow-lg relative z-10 flex flex-col min-h-[220px]">
              <div className="flex justify-center mb-6">
                 <div className="w-14 h-14 rounded-full bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center">
                   <FileText className="w-7 h-7" />
                 </div>
              </div>
              <div className="text-[#0B1D3A] font-bold text-[16px] text-center mb-6 leading-tight">
                Your Career Intelligence Report
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                {[
                  "Clarity on your work",
                  "Opportunities to act",
                  "Tools to explore"
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-[#0B1D3A]/70 text-[13px]">
                    <CheckCircle2 className="w-4 h-4 text-[#4338CA] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto border-t border-white/10 pt-12">
          <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full border border-[#FDCF58]/30 flex items-center justify-center shrink-0 bg-white/5">
               <Target className="w-5 h-5 text-[#FDCF58]" />
             </div>
             <div>
                <div className="text-white font-bold text-[15px] mb-1">Role-specific</div>
                <div className="text-white/50 text-[13px] leading-snug">Tailored to your industry and function</div>
             </div>
          </div>
          
          <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full border border-[#14B8A6]/30 flex items-center justify-center shrink-0 bg-white/5">
               <Zap className="w-5 h-5 text-[#14B8A6]" />
             </div>
             <div>
                <div className="text-white font-bold text-[15px] mb-1">Practical</div>
                <div className="text-white/50 text-[13px] leading-snug">Focused on real work, not generic advice</div>
             </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full border border-[#3B82F6]/30 flex items-center justify-center shrink-0 bg-white/5">
               <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
             </div>
             <div>
                <div className="text-white font-bold text-[15px] mb-1">Independent</div>
                <div className="text-white/50 text-[13px] leading-snug">Objective insights you can trust</div>
             </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full border border-[#FCD34D]/30 flex items-center justify-center shrink-0 bg-white/5">
               <Sparkles className="w-5 h-5 text-[#FCD34D]" />
             </div>
             <div>
                <div className="text-white font-bold text-[15px] mb-1">Actionable</div>
                <div className="text-white/50 text-[13px] leading-snug">Clear next steps, not just information</div>
             </div>
          </div>
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
      icon: <FileText className="h-4 w-4" strokeWidth={2} />,
      title: "Tell us about your work",
      body: "Enter your job role or upload a JD / resume.",
    },
    {
      n: "02",
      icon: <UserSearch className="h-4 w-4" strokeWidth={2} />,
      title: "Review & refine",
      body: "We map your tasks and you can edit and confirm.",
    },
    {
      n: "03",
      icon: <Layers className="h-4 w-4" strokeWidth={2} />,
      title: "Add how you work",
      body: "Tell us about time, frequency and criticality.",
    },
    {
      n: "04",
      icon: <BarChart3 className="h-4 w-4" strokeWidth={2} />,
      title: "Get your report",
      body: "Receive your personalised Career Intelligence Report.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#F8FAFC] py-20 md:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DBEAFE]/50 blur-3xl" />
      <div className="container-page animate-fade-in-up relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#FDE68A] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B1D3A]">
            How it works
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            Get your report in 4 simple steps.
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          {steps.map((s, i) => (
            <div key={s.n} className="contents">
              <div className="flex min-w-0 flex-1 items-center gap-3.5">
                <div className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full bg-[#E8F0FE]">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-[#3B82F6] text-white shadow-sm">
                    {s.icon}
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-[#0B1D3A]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-[#64748B]">{s.body}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="mx-1 hidden h-4 w-4 shrink-0 text-[#0B1D3A]/40 lg:block"
                  strokeWidth={2}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- REPORT PREVIEW ---------- */
function ReportPreview() {
  return (
    <div id="report" className="bg-[#F3F7FC] py-20 md:py-24">
      <div className="container-page animate-fade-in-up grid gap-12 lg:grid-cols-[0.85fr_1.25fr] lg:items-center lg:gap-8 xl:gap-12">
        <div className="max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B7C99]">
            Sample report
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            See what&apos;s inside.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#64748B]">
            A practical, easy-to-read report with insights, opportunities and tools - tailored to
            your work.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FDCF58] px-6 py-3.5 text-sm font-bold text-[#0B1D3A] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#ebd593]"
          >
            View sample report <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative min-w-0">
          <ReportCardsPreview />
          <div className="pointer-events-none absolute -right-10 bottom-8 hidden w-36 rotate-[10deg] xl:block 2xl:-right-16">
            <p
              className="text-[22px] leading-[1.15] text-[#0B1D3A]"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
            >
              Insights today.
              <br />
              A more
              <br />
              relevant
              <br />
              tomorrow.
            </p>
            <svg
              width="100"
              height="14"
              viewBox="0 0 100 14"
              className="mt-0.5 text-[#FDCF58]"
              aria-hidden
            >
              <path
                d="M2,10 Q50,0 98,9"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="mt-8 text-center xl:hidden">
            <p
              className="text-[20px] leading-tight text-[#0B1D3A]"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
            >
              Insights today. A more relevant tomorrow.
            </p>
            <svg
              width="140"
              height="12"
              viewBox="0 0 140 12"
              className="mx-auto mt-1 text-[#FDCF58]"
              aria-hidden
            >
              <path
                d="M2,8 Q70,0 138,7"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportCardsPreview() {
  const tasks = [
    { label: "Strategic Planning", pct: 32, color: "bg-[#3B82F6]" },
    { label: "Stakeholder Mgmt", pct: 24, color: "bg-[#F2C94C]" },
    { label: "Data Analysis", pct: 18, color: "bg-[#8B5CF6]" },
    { label: "Campaign Execution", pct: 14, color: "bg-[#EC4899]" },
    { label: "Reporting", pct: 10, color: "bg-[#F59E0B]" },
    { label: "Team Coaching", pct: 6, color: "bg-[#EF4444]" },
  ];

  const automations = [
    {
      label: "Report Generation",
      tag: "High potential",
      icon: <FileText className="h-3 w-3" />,
      iconBg: "bg-[#DBEAFE] text-[#2563EB]",
    },
    {
      label: "Data Processing",
      tag: "High potential",
      icon: <Settings className="h-3 w-3" />,
      iconBg: "bg-[#D1FAE5] text-[#059669]",
    },
    {
      label: "Meeting Notes",
      tag: "Medium potential",
      icon: <UserSearch className="h-3 w-3" />,
      iconBg: "bg-[#FEF3C7] text-[#D97706]",
    },
    {
      label: "Email Drafting",
      tag: "Medium potential",
      icon: <Mail className="h-3 w-3" />,
      iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    },
  ];

  const tools = [
    { name: "Copilot", initials: "Co", color: "bg-[#0B1D3A]" },
    { name: "Notion", initials: "No", color: "bg-[#111827]" },
    { name: "Zapier", initials: "Za", color: "bg-[#FF4A00]" },
    { name: "ChatGPT", initials: "CG", color: "bg-[#10A37F]" },
    { name: "Canva", initials: "Ca", color: "bg-[#00C4CC]" },
  ];

  const framework = [
    { label: "Build", value: "6", tone: "bg-[#FDCF58]/20 text-[#FDCF58]" },
    { label: "Bot", value: "9", tone: "bg-teal-400/20 text-teal-300" },
    { label: "Blend", value: "11", tone: "bg-white/10 text-white/80" },
  ];

  const cardBase =
    "flex h-[300px] w-[168px] shrink-0 flex-col rounded-2xl p-4 sm:w-[176px] xl:w-[180px]";
  const whiteCard = `${cardBase} relative border border-black/[0.04] bg-white shadow-[0_8px_28px_rgba(11,29,58,0.08)]`;

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:overflow-visible sm:px-0">
      <motion.div
        className="flex min-w-[700px] items-stretch gap-3 sm:min-w-0 lg:pr-28 xl:gap-3.5 xl:pr-36"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* Cover card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, rotate: -1, transition: { duration: 0.25 } }}
          className={`${cardBase} -rotate-2 justify-between bg-[#0B1D3A] shadow-[0_12px_32px_rgba(11,29,58,0.22)]`}
        >
          <div>
            <img
              src="/new_logo_white1.png"
              alt="CareerShift"
              className="h-9 w-full max-w-full object-contain object-left"
            />
            <span className="mt-3 inline-flex rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-white/70">
              Personalized report
            </span>
          </div>

          <div>
            <h3 className="font-display text-[17px] font-bold leading-[1.2] text-white sm:text-lg">
              Career
              <br />
              Intelligence
              <br />
              Report
            </h3>
            <p className="mt-2 text-[9px] leading-relaxed text-white/50">
              Task insights, automation opportunities &amp; recommended tools.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {framework.map((f) => (
              <div
                key={f.label}
                className={`rounded-lg px-1.5 py-1.5 text-center ${f.tone}`}
              >
                <div className="font-display text-sm font-bold leading-none">{f.value}</div>
                <div className="mt-0.5 text-[7px] font-medium uppercase tracking-wide opacity-80">
                  {f.label}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 h-0.5 w-8 rounded-full bg-[#FDCF58]" />
            <p className="text-[9px] font-medium leading-relaxed text-white/55">
              Your Opportunities
              <br />
              Your Next Move
            </p>
          </div>
        </motion.div>

        {/* Task Analysis */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className={whiteCard}
        >
          <div>
            <p className="text-[12px] font-bold text-[#0B1D3A]">Task Analysis</p>
            <p className="mt-0.5 text-[9px] text-[#94A3B8]">Your key work activities</p>
          </div>
          <div className="mt-3 flex flex-1 flex-col justify-between gap-1.5">
            {tasks.map((t, i) => (
              <div key={t.label} className="flex items-center gap-1.5">
                <span className="w-[72px] shrink-0 truncate text-[8px] font-medium text-[#64748B]">
                  {t.label}
                </span>
                <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
                  <motion.div
                    className={`h-full rounded-full ${t.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(t.pct * 2.8, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.35 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right text-[8px] font-semibold text-[#0B1D3A]">
                  {t.pct}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Automation Opportunities */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className={whiteCard}
        >
          <div>
            <p className="text-[12px] font-bold leading-snug text-[#0B1D3A]">
              Automation Opportunities
            </p>
            <p className="mt-0.5 text-[9px] text-[#94A3B8]">Tasks with potential for automation</p>
          </div>
          <div className="mt-3 flex flex-1 flex-col justify-between gap-2">
            {automations.map((a, i) => (
              <motion.div
                key={a.label}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              >
                <div
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${a.iconBg}`}
                >
                  {a.icon}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-[#0B1D3A]">{a.label}</p>
                  <p className="text-[8px] text-[#94A3B8]">{a.tag}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Tools */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className={whiteCard}
        >
          <div>
            <p className="text-[12px] font-bold text-[#0B1D3A]">Recommended</p>
            <p className="mt-0.5 text-[9px] text-[#94A3B8]">Tools for your work</p>
          </div>
          <div className="mt-3 flex flex-1 flex-col justify-between">
            {tools.map((t, i) => (
              <motion.div
                key={t.name}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
              >
                <div
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[9px] font-bold text-white ${t.color}`}
                >
                  {t.initials}
                </div>
                <span className="flex-1 text-[11px] font-medium text-[#0B1D3A]">{t.name}</span>
                <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#CBD5E1]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- WORK INTELLIGENCE ---------- */
function WorkIntelligence() {
  const stats = [
    {
      icon: <Building2 className="h-[18px] w-[18px]" strokeWidth={1.75} />,
      iconBg: "bg-[#FEF3C7] text-[#2563EB]",
      value: "40+",
      label: "Industries mapped",
    },
    {
      icon: <Network className="h-[18px] w-[18px]" strokeWidth={1.75} />,
      iconBg: "bg-[#D1FAE5] text-[#2563EB]",
      value: "2,500+",
      label: "Competencies structured",
    },
    {
      icon: <Users className="h-[18px] w-[18px]" strokeWidth={1.75} />,
      iconBg: "bg-[#E0E7FF] text-[#2563EB]",
      value: "125K+",
      label: "Tasks & skills mapped",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16">
      <div className="container-page animate-fade-in-up">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-[340px] shrink-0 lg:max-w-[380px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5B7C99]">
              Built on real work intelligence
            </p>
            <h2 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-[#0B1D3A] sm:text-[28px] sm:leading-tight">
              A deeper foundation. Better insights.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
              CareerShift is powered by a comprehensive and structured taxonomy of the world of
              work.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-4 lg:justify-end">
            {stats.map((s, i) => (
              <div key={s.label} className="contents">
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${s.iconBg}`}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold tracking-tight text-[#0B1D3A] sm:text-2xl">
                      {s.value}
                    </div>
                    <div className="text-[13px] text-[#64748B]">{s.label}</div>
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <ArrowRight
                    className="hidden h-3.5 w-3.5 shrink-0 text-[#0B1D3A]/35 sm:block"
                    strokeWidth={2}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURES / WHAT YOU WALK AWAY WITH ---------- */
function Features() {
  const feats = [
    {
      icon: <Brain className="h-5 w-5" strokeWidth={1.75} />,
      iconBg: "bg-[#CCFBF1] text-[#0F766E]",
      title: "Understand your work",
      body: "See how your time is spent and what truly matters.",
    },
    {
      icon: <BarChart3 className="h-5 w-5" strokeWidth={1.75} />,
      iconBg: "bg-[#FEF3C7] text-[#B45309]",
      title: "Discover opportunities",
      body: "Identify what can be automated or augmented.",
    },
    {
      icon: <Users className="h-5 w-5" strokeWidth={1.75} />,
      iconBg: "bg-[#E0E7FF] text-[#4338CA]",
      title: "Explore relevant solutions",
      body: "Get tool recommendations for your actual tasks.",
    },
    {
      icon: <SlidersHorizontal className="h-5 w-5" strokeWidth={1.75} />,
      iconBg: "bg-[#FDE68A] text-[#92400E]",
      title: "Know where you matter",
      body: "See the capabilities worth strengthening.",
    },
  ];

  return (
    <section id="features" className="bg-[#F3F7FC] py-20 md:py-24">
      <div className="container-page animate-fade-in-up">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#CCFBF1] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0F766E]">
            What you walk away with
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            More clarity. Greater control.
          </h2>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {feats.map((f) => (
            <div key={f.title} className="flex flex-col items-start">
              <div
                className={`grid h-12 w-12 place-items-center rounded-full ${f.iconBg}`}
              >
                {f.icon}
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-[#0B1D3A]">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  const included = [
    "Personalized to your role and work",
    "Task and skill analysis",
    "Automation and augmentation opportunities",
    "Relevant tools and solutions",
    "Clear next steps",
  ];

  return (
    <section id="pricing" className="bg-white py-20 md:py-24">
      <div className="container-page animate-fade-in-up">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_minmax(420px,1.15fr)_0.85fr] lg:items-center lg:gap-10 xl:gap-14">
          <div className="max-w-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
              Pricing
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
              One report. Real value.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#64748B]">
              Get a complete{" "}
              <span className="font-semibold text-[#0B1D3A]">Career Intelligence Report</span> for
              less than AED 100.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[480px] rounded-3xl border border-[#F2C94C]/50 bg-[#FFFBEB] px-10 py-9 text-center shadow-[0_8px_28px_rgba(242,201,76,0.12)] sm:px-12">
            <h3 className="font-display text-lg font-bold text-[#0B1D3A]">
              Career Intelligence Report
            </h3>
            <p className="mt-1.5 text-sm text-[#94A3B8]">One-time payment</p>
            <div className="mt-6 font-display text-4xl font-bold tracking-tight text-[#0B1D3A]">
              &lt; AED 100
            </div>
            <Link
              to="/auth"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FDCF58] px-5 py-3.5 text-sm font-bold text-[#0B1D3A] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#ebd593]"
            >
              Get My Report <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:border-l lg:border-[#E2E8F0] lg:pl-10 xl:pl-14">
            <ul className="space-y-3.5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#0B1D3A]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#14B8A6]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState(false);
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
      a: `CareerShift is an AI fitness assessment platform. It analyzes your specific role and tasks, then delivers a structured report with your automation risk score, a task-routing breakdown, and a 12-month upskill roadmap grounded in real competency frameworks, not generic advice.
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
      q: "Is the report really one-time?",
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section id="faq" className="bg-[#F3F7FC] py-16 md:py-20">
        <div className="container-page animate-fade-in-up flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
              Frequently asked questions
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
              Have questions?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#64748B]">
              Find answers to common questions about the report, process and more.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border-2 border-[#0B1D3A]/15 bg-white px-7 py-3 text-sm font-bold text-[#0B1D3A] transition-colors hover:border-[#0B1D3A]/30 hover:bg-white/80 sm:self-center"
          >
            View FAQ <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0B1D3A]/45 p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-modal-title"
        >
          <div
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-elevated sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748B]">
                  FAQ
                </p>
                <h3
                  id="faq-modal-title"
                  className="mt-1 font-display text-xl font-bold text-[#0B1D3A]"
                >
                  Frequently asked questions
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close FAQ"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-[#0B1D3A] transition-colors hover:bg-[#F8FAFC]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto divide-y divide-border">
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
        </div>
      )}
    </>
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
  const middleCards = [
    {
      key: "build",
      x: 140,
      bg: "bg-[#FFF9EA]",
      color: "text-[#D68822]",
      icon: <Brain className="h-6 w-6" />,
      title: "BUILD IT",
      body: "Strengthen what stays human",
    },
    {
      key: "bot",
      x: 325,
      bg: "bg-[#EAFDF8]",
      color: "text-[#129A84]",
      icon: <Bot className="h-6 w-6" />,
      title: "BOT IT",
      body: "Identify what can be automated",
    },
    {
      key: "blend",
      x: 510,
      bg: "bg-[#F3EEFF]",
      color: "text-[#6B46C1]",
      icon: <Cpu className="h-6 w-6" />,
      title: "BLEND IT",
      body: "Discover where AI can amplify your work",
    },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[650px] origin-center scale-90 font-sans sm:scale-100">
      {/* Decorative large circle outline */}
      <div className="pointer-events-none absolute left-[4%] top-[0%] h-full w-full rounded-full border-[4px] border-[#FDCF58]/50" />

      {/* Connection Lines */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 650 650"
      >
        {/* Top fork: from Your Work down to three cards */}
        <path d="M325 148 L325 205" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M140 205 L510 205" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M140 205 L140 248" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M325 205 L325 248" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M510 205 L510 248" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />

        <circle cx="325" cy="205" r="2" fill="#0B1D3A" />
        <circle cx="140" cy="248" r="2" fill="#0B1D3A" />
        <circle cx="325" cy="248" r="2" fill="#0B1D3A" />
        <circle cx="510" cy="248" r="2" fill="#0B1D3A" />

        {/* Bottom merge: from three cards down to Career Intelligence */}
        <path d="M140 372 L140 412" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M325 372 L325 412" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M510 372 L510 412" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M140 412 L510 412" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
        <path d="M325 412 L325 448" stroke="#0B1D3A" strokeWidth="1.4" strokeOpacity="0.8" fill="none" />

        <circle cx="140" cy="372" r="2" fill="#0B1D3A" />
        <circle cx="325" cy="372" r="2" fill="#0B1D3A" />
        <circle cx="510" cy="372" r="2" fill="#0B1D3A" />
        <circle cx="325" cy="412" r="2" fill="#0B1D3A" />
        <circle cx="325" cy="448" r="2" fill="#0B1D3A" />
      </svg>

      {/* Top Node */}
      <div
        className="absolute z-10 w-[260px] pointer-events-auto"
        style={{ left: "50%", top: "58px", transform: "translateX(-50%)" }}
      >
        <div className="flex items-center gap-3.5 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)]">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-100/50 text-blue-700">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-bold text-[#0B1D3A]">Your Work</div>
            <div className="mt-0.5 text-[10px] font-medium tracking-wide text-black/50">
              Role &nbsp;|&nbsp; Tasks &nbsp;|&nbsp; Skills
            </div>
          </div>
        </div>
      </div>

      {/* Middle Nodes - equal size, Blend as reference */}
      {middleCards.map((card) => (
        <div
          key={card.key}
          className="absolute z-10 w-[138px] pointer-events-auto"
          style={{ left: `${card.x}px`, top: "310px", transform: "translate(-50%, -50%)" }}
        >
          <div
            className={`${card.bg} flex h-[124px] flex-col items-center justify-center rounded-xl p-3 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md`}
          >
            <div className={`mb-1.5 grid h-8 w-8 place-items-center ${card.color}`}>
              {card.icon}
            </div>
            <div className={`mb-1 text-[11px] font-extrabold uppercase tracking-widest ${card.color}`}>
              {card.title}
            </div>
            <div className="text-[10px] font-medium leading-snug text-[#0B1D3A]/80">
              {card.body}
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Node */}
      <div
        className="absolute z-10 w-[290px] pointer-events-auto"
        style={{ left: "50%", bottom: "78px", transform: "translateX(-50%)" }}
      >
        <div className="flex items-center gap-3.5 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)]">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-indigo-100/50 text-indigo-700">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-bold text-[#0B1D3A]">Your Career Intelligence</div>
            <div className="mt-0.5 text-[10px] font-medium tracking-wide text-black/50">
              Tools &nbsp;|&nbsp; Opportunities &nbsp;|&nbsp; Actions
            </div>
          </div>
        </div>
      </div>

      {/* Hand-drawn text annotation */}
      <div className="pointer-events-none absolute -right-[15%] top-[5%] z-20 w-[250px] rotate-[18deg]">
        <div
          className="text-[28px] leading-tight text-[#222]"
          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
        >
          Navigate what&apos;s changing. Design your future work.
        </div>
        <svg width="60" height="20" viewBox="0 0 60 20" className="ml-8 mt-1 text-[#FDCF58]">
          <path
            d="M0,10 Q30,20 60,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ---------- CONTACT US ---------- */
function ContactUs() {
  return (
    <section id="contact" className="bg-white py-24 text-[#0B1D3A]">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Contact Us</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-4xl">
            Let&apos;s talk about your next move.
          </h2>
          <p className="mt-4 text-[#64748B]">
            Whether you&apos;re mapping your own AI fitness or building a workforce plan for your team,
            we&apos;re here to help you get clarity fast.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-xl">
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_8px_28px_rgba(11,29,58,0.06)]">
            <h3 className="mb-6 font-display text-xl font-semibold text-[#0B1D3A]">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#334155]">
                    <User className="h-4 w-4 text-[#D39933]" /> First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0B1D3A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#FDCF58] focus:ring-1 focus:ring-[#FDCF58]"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#334155]">
                    <User className="h-4 w-4 text-[#D39933]" /> Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0B1D3A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#FDCF58] focus:ring-1 focus:ring-[#FDCF58]"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#334155]">
                  <Mail className="h-4 w-4 text-[#D39933]" /> Email Address
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0B1D3A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#FDCF58] focus:ring-1 focus:ring-[#FDCF58]"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#334155]">
                  <MessageSquare className="h-4 w-4 text-[#D39933]" /> Message
                </label>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0B1D3A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#FDCF58] focus:ring-1 focus:ring-[#FDCF58]"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full rounded-full bg-[#FDCF58] px-4 py-3 text-sm font-bold text-[#0B1D3A] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#ebd593]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
type FooterLink =
  | { label: string; to: string }
  | { label: string; sectionId: string };

function Footer() {
  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { label: "CareerShift Way", sectionId: "framework" },
        { label: "How It Works", sectionId: "how" },
        { label: "Features", sectionId: "features" },
        { label: "Pricing", sectionId: "pricing" },
      ],
    },
    { title: "Resources", links: [{ label: "FAQ", sectionId: "faq" }] },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Contact", sectionId: "contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
      ],
    },
  ];

  const socials = [
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/company/careershift3b/",
      label: "CareerShift on LinkedIn",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/careershift3b/",
      label: "CareerShift on Instagram",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B1D3A] text-white">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full border border-white/[0.08]" />
      <div className="pointer-events-none absolute -left-10 top-1/2 h-[240px] w-[240px] -translate-y-1/2 rounded-full border border-white/[0.05]" />

      <div className="container-page relative py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr_0.9fr] lg:items-center lg:gap-12 xl:gap-16">
          {/* Left - headline, logo, tagline, socials */}
          <div className="max-w-sm">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
              Your next chapter starts with{" "}
              <span className="text-[#FDCF58]">clarity.</span>
            </h2>
            <Link to="/" className="mt-5 inline-flex">
              <img
                src="/new_logo_white1.png"
                alt="CareerShift Logo"
                className="h-16 w-auto object-contain sm:h-20"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55 sm:text-[15px]">
              Bridge your career to the AI future with clarity, confidence, and a plan.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-[#C9A84C]"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Middle - nav + CTA */}
          <div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
              {cols.map((c) => (
                <div key={c.title}>
                  <h4 className="font-display text-base font-bold tracking-wide text-white">
                    {c.title}
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {c.links.map((l) => (
                      <li key={l.label}>
                        {"to" in l ? (
                          <Link
                            to={l.to}
                            className="text-[15px] font-medium text-white/70 transition-colors hover:text-[#C9A84C]"
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <SectionLink
                            sectionId={l.sectionId}
                            className="text-[15px] font-medium text-white/70 transition-colors hover:text-[#C9A84C]"
                          >
                            {l.label}
                          </SectionLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3.5 border-t border-white/10 pt-8 text-center">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#FDCF58] px-8 py-3.5 text-base font-bold text-[#0B1D3A] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#ebd593]"
              >
                Get My Report <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center justify-center gap-2.5 text-[15px] text-white/70">
                <Clock className="h-4.5 w-4.5 shrink-0" />
                <span>One-time report · Takes about 20 minutes</span>
              </div>
            </div>
          </div>

          {/* Right - handwritten accent */}
          <div className="flex items-center justify-start lg:justify-center">
            <div className="w-[220px] rotate-[7deg] sm:w-[240px]">
              <p
                className="text-[34px] leading-[1.12] text-white sm:text-[38px]"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
              >
                Same you.
                <br />
                A broader
                <br />
                tomorrow.
              </p>
              <svg
                width="150"
                height="16"
                viewBox="0 0 150 16"
                className="mt-1.5 text-[#FDCF58]"
                aria-hidden
              >
                <path
                  d="M2,11 Q75,1 148,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm font-medium text-white/70 md:text-base">
          <span>© {new Date().getFullYear()} CareerShift. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SCROLL TO TOP ---------- */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand/30 bg-brand text-brand-foreground shadow-elevated transition-all hover:scale-105 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------- SHARED ---------- */
function SectionLink({
  sectionId,
  children,
  className,
  onNavigate,
}: {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToSection(sectionId);
        onNavigate?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

function SectionEyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand ${dark ? "border-white/10 bg-white/5" : "border-border bg-card"}`}
    >
      {children}
    </span>
  );
}
