import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Binoculars,
  Clock,
  HelpCircle,
  Instagram,
  Lightbulb,
  Linkedin,
  Menu,
  Mountain,
  Rocket,
  Search,
  ShieldCheck,
  Sun,
  Target,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/layout/Footer";
export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden bg-white text-[#0B1D3A]">
      <AboutNav />
      <AboutHero />
      <OurPurpose />
      <FounderStory />
      <OurValues />
      <RealShifts />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* ---------- NAV ---------- */
const NAV_LINKS = [
  { label: "CareerShift Way", to: "/#framework" },
  { label: "How It Works", to: "/#how" },
  { label: "What's Inside", to: "/#features" },
  { label: "Pricing", to: "/#pricing" },
  { label: "About Us", to: "/about" },
] as const;

function AboutNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 z-50 border-b border-black/5 bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/new_logo11.png" alt="CareerShift Logo" className="h-14 object-contain" />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-black ${
                l.to === "/about" ? "font-semibold text-[#0B1D3A]" : "text-black/80"
              }`}
            >
              {l.label}
              {l.to === "/about" && (
                <span className="mx-auto mt-1 block h-[3px] w-6 rounded-full bg-[#FDCF58]" />
              )}
            </Link>
          ))}
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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-black/80 hover:bg-black/5 hover:text-black"
              >
                {l.label}
              </Link>
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
                className="rounded-xl bg-[#FDCF58] px-4 py-2 text-center text-sm font-semibold text-black"
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

/* ---------- HERO ----------
   Reference technique: left-only large radius (not a floating full circle)
   border-radius: 200px 0 0 200px + cream edge gradient
*/
function AboutHero() {
  return (
    <section className="relative overflow-x-clip bg-gradient-to-br from-[#FFFAF0] via-white to-white">
      <div className="container-page grid items-center gap-8 py-14 md:gap-10 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#FDF0D3] px-[1.1rem] py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9911A]">
            About CareerShift
          </span>
          <h1 className="mt-6 font-display text-[2.35rem] font-bold leading-[1.12] tracking-tight text-[#0B1D3A] sm:text-5xl lg:text-[2.75rem] xl:text-[3rem]">
            A more relevant you
            <br />
            <span className="text-[#F2C94C]">for what&apos;s next.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-[#3B4A72] sm:text-[15.5px]">
            CareerShift exists to help individuals understand how their work is evolving, make
            informed decisions, and take practical action — so they can stay relevant, confident and
            in control in a world shaped by AI.
          </p>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[100px_0_0_100px] sm:min-h-[360px] sm:rounded-[140px_0_0_140px] lg:min-h-[420px] lg:rounded-[180px_0_0_180px]">
          <img
            src="/about.jpeg"
            alt="Woman looking out over mountains at sunrise"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,251,242,0.45) 0%, rgba(255,251,242,0) 28%, rgba(255,251,242,0) 55%, rgba(255,251,242,0.85) 86%, #fffbf2 100%)",
            }}
          />

          <div className="relative ml-auto flex h-full min-h-[300px] flex-col items-end justify-between px-6 py-7 text-right sm:min-h-[360px] sm:px-8 sm:py-9 lg:min-h-[420px] lg:px-9 lg:py-10">
            <div className="-rotate-[5deg]">
              <p
                className="text-[26px] leading-[1.2] text-[#0B1D3A] sm:text-[28px]"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
              >
                Same You.
                <br />
                A Broader
                <br />
                Tomorrow.
              </p>
              <div className="ml-auto mt-3 h-[7px] w-[110px] rounded-lg bg-[#FDCF58]" />
            </div>

            <div>
              <ul className="text-[11px] font-bold uppercase leading-[1.9] tracking-[0.28em] text-[#0B1D3A] sm:text-xs sm:tracking-[0.3em]">
                <li>Clarity</li>
                <li>Confidence</li>
                <li>Action</li>
              </ul>
              <div className="ml-auto mt-2.5 h-[6px] w-[86px] rounded-lg bg-[#FDCF58]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- OUR PURPOSE ---------- */
function OurPurpose() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page text-center">
        <span className="inline-flex items-center rounded-full bg-[#FDF0D3] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A4761A]">
          Our Purpose
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-[1.9rem]">
          Guiding people through change, with clarity.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-[1.9] text-[#59637F] sm:text-[15px]">
          We believe technology should create more opportunities for people — not{" "}
          <strong className="font-semibold text-[#0B1D3A]">more uncertainty</strong>. CareerShift
          helps you make sense of change, so you can navigate your career with confidence.
        </p>

        <div className="mt-11 grid gap-6 text-left md:grid-cols-2 md:gap-8">
          <article className="flex gap-5 rounded-2xl border border-[#EEF1F7] bg-white p-7 shadow-[0_10px_30px_rgba(11,29,58,0.06)] sm:p-8">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#FDF0D3]">
              <Target className="h-6 w-6 text-[#0B1D3A]" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A93AD]">
                Our Mission
              </p>
              <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-[#0B1D3A] sm:text-[19px]">
                To empower individuals with work intelligence for a more relevant and fulfilling
                future.
              </h3>
              <p className="mt-3.5 text-[13px] leading-[1.8] text-[#59637F]">
                We make the impact of technology on work easy to understand, personal to your role,
                and actionable for your next steps.
              </p>
            </div>
          </article>

          <article className="flex gap-5 rounded-2xl border border-[#EEF1F7] bg-white p-7 shadow-[0_10px_30px_rgba(11,29,58,0.06)] sm:p-8">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#E3EDFB]">
              <Binoculars className="h-6 w-6 text-[#0B1D3A]" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A93AD]">
                Our Vision
              </p>
              <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-[#0B1D3A] sm:text-[19px]">
                To be the global platform for career relevance in the age of intelligent work.
              </h3>
              <p className="mt-3.5 text-[13px] leading-[1.8] text-[#59637F]">
                A world where every individual — regardless of their role, industry or background —
                has the clarity, tools and confidence to design their future of work.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOUNDER STORY ---------- */
const JOURNEY = [
  {
    number: "01",
    title: "A simple question",
    description:
      "How can people stay relevant in a world where technology is changing work so quickly?",
    Icon: HelpCircle,
    color: "text-[#4338CA]",
    bg: "bg-[#EEF2FF]",
  },
  {
    number: "02",
    title: "Recognising the gap",
    description:
      "Saw a growing disconnect between the speed of change and the support available to individuals.",
    Icon: Search,
    color: "text-[#D97706]",
    bg: "bg-[#FFFBEB]",
  },
  {
    number: "03",
    title: "From insight to action",
    description: "Built CareerShift to turn complex ideas into practical guidance.",
    Icon: Rocket,
    color: "text-[#0D9488]",
    bg: "bg-[#F0FDFA]",
  },
  {
    number: "04",
    title: "A brighter future",
    description: "Continuing to expand access and impact globally.",
    Icon: Sun,
    color: "text-[#2563EB]",
    bg: "bg-[#EFF6FF]",
  },
] as const;

function FounderStory() {
  return (
    <section className="relative overflow-x-clip bg-[#FFFDF8] py-16 md:py-20 lg:py-24">
      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          {/* Left content */}
          <div>
            <span className="inline-flex items-center rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A4761A]">
              Founder Story
            </span>

            <h2 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0B1D3A] sm:text-5xl lg:text-[3.4rem]">
              A simple idea.
              <br />
              <span className="text-[#F2C94C]">A bigger purpose.</span>
            </h2>
            <div className="mt-5 h-1.5 w-48 rounded-full bg-[#FDCF58] sm:w-64 lg:w-72" />

            <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-7 text-[#59637F] sm:text-base">
              <p>
                CareerShift was born from a simple but powerful question — how do we help people stay
                relevant in a world where technology is changing work faster than career advice can
                keep up?
              </p>
              <p>
                Seeing the uncertainty, confusion and mixed messages around AI and the future of
                work, the founder set out to build a practical, independent and human-centred
                platform that focuses on the real work people do — not just job titles.
              </p>
              <p>
                Today, CareerShift combines deep research, a structured work intelligence framework
                and real-world tools to give individuals the clarity and confidence to take charge of
                their careers.
              </p>
            </div>

            {/* Handwritten close — Caveat, tilted + staggered */}
            <div className="mt-12 inline-block -rotate-[12deg]">
              <p
                className="text-[30px] leading-[1.2] text-[#0B1D3A] sm:text-[32px]"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
              >
                <span className="block">Real work.</span>
                <span className="ml-3 block sm:ml-4">Real change.</span>
                <span className="ml-6 block sm:ml-8">Real people.</span>
              </p>
              <svg
                width="140"
                height="16"
                viewBox="0 0 140 16"
                className="mt-1 ml-6 text-[#FDCF58] sm:ml-8"
                aria-hidden
              >
                <path
                  d="M2,11 Q35,4 70,9 Q105,15 138,6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Right journey — open on theme bg, no panel chrome */}
          <div className="relative min-h-[560px] overflow-hidden sm:min-h-[600px]">
            {/* Soft theme wash only */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#FDE68A]/20 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#0B1D3A]/[0.03] blur-2xl"
              aria-hidden
            />

            {/* Mountains + sun — muted theme tones */}
            <div
              className="pointer-events-none absolute right-0 top-4 max-w-full opacity-80 sm:top-6"
              aria-hidden
            >
              <svg
                className="h-auto w-full max-w-[360px]"
                viewBox="0 0 430 230"
                fill="none"
              >
                <path d="M150 215L280 55L430 215H150Z" fill="#E2E8F0" />
                <path d="M210 215L320 95L390 215H210Z" fill="#CBD5E1" opacity="0.9" />
                <path
                  d="M280 55L305 87L290 82L278 100L267 84L255 92L280 55Z"
                  fill="#F8FAFC"
                />
                <circle cx="340" cy="75" r="28" fill="#FDCF58" opacity="0.85" />
                <path
                  d="M340 22V8M340 142V128M288 75H274M406 75H392M304 40L294 30M376 40L386 30"
                  stroke="#F2C94C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path d="M280 55V32" stroke="#0B1D3A" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M280 32L300 39L280 46Z" fill="#0B1D3A" />
              </svg>
            </div>

            {/* Title */}
            <div className="relative z-10">
              <p
                className="text-[30px] leading-[1.1] text-[#0B1D3A] sm:text-[32px]"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
              >
                The Journey
              </p>
              <p
                className="mt-[-2px] text-[30px] leading-[1.1] text-[#F2C94C] sm:text-[32px]"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
              >
                So Far
              </p>
              <div className="mt-3 h-1 w-28 rounded-full bg-[#FDCF58]" />
            </div>

            {/* Winding road — soft cream path on theme bg */}
            <div className="absolute bottom-0 left-[8%] top-[160px] w-[80%] sm:left-[10%] sm:w-[78%]">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 500 500"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M70 480
                     C20 420 45 370 130 350
                     C220 330 400 350 400 270
                     C400 190 170 210 190 130
                     C205 80 300 70 330 30"
                  stroke="#F5E6C8"
                  strokeWidth="42"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.95"
                />
                <path
                  d="M70 480
                     C20 420 45 370 130 350
                     C220 330 400 350 400 270
                     C400 190 170 210 190 130
                     C205 80 300 70 330 30"
                  stroke="#E8D4A8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="0 14"
                  fill="none"
                  opacity="0.7"
                />
              </svg>
            </div>

            {/* Milestones */}
            <div className="relative z-10 mt-14 flex h-[480px] flex-col justify-between sm:mt-16 sm:h-[520px]">
              {[...JOURNEY].reverse().map((item, index) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={item.number}
                    className={`flex items-center gap-3 sm:gap-4 ${
                      index % 2 === 0 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-[0_6px_18px_rgba(11,29,58,0.1)] sm:h-14 sm:w-14 ${item.bg} ${item.color}`}
                    >
                      <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
                      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B1D3A] text-[9px] font-bold text-white sm:h-6 sm:w-6">
                        {item.number}
                      </span>
                    </div>
                    <div className="w-[min(100%,240px)] rounded-2xl border border-[#0B1D3A]/6 bg-white/90 p-3.5 shadow-[0_8px_24px_rgba(11,29,58,0.06)] backdrop-blur-[1px] sm:w-[260px] sm:p-4">
                      <h3 className="text-sm font-bold text-[#0B1D3A]">{item.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-[#64748B]">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- OUR VALUES ---------- */
const VALUES = [
  {
    title: "People First",
    body: "Real people, real work, real impact.",
    Icon: Users,
    bg: "bg-[#FDF0D3]",
  },
  {
    title: "Curiosity",
    body: "We stay open, ask better questions and keep learning.",
    Icon: Lightbulb,
    bg: "bg-[#E9E9FB]",
  },
  {
    title: "Practicality",
    body: "Insights that you can actually use.",
    Icon: Target,
    bg: "bg-[#E9E9FB]",
  },
  {
    title: "Integrity",
    body: "Honest, unbiased and built on real intelligence.",
    Icon: ShieldCheck,
    bg: "bg-[#DCEFEC]",
  },
];

function OurValues() {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container-page text-center">
        <span className="inline-flex items-center rounded-full bg-[#FDF0D3] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A4761A]">
          Our Values
        </span>
        <h2 className="mt-5 font-display text-[1.8rem] font-bold tracking-tight text-[#0B1D3A]">
          What drives us.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {VALUES.map((v, i) => {
            const Icon = v.Icon;
            return (
              <div
                key={v.title}
                className={`px-5 ${i < VALUES.length - 1 ? "lg:border-r lg:border-[#EEF1F7]" : ""}`}
              >
                <div className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${v.bg}`}>
                  <Icon className="h-6 w-6 text-[#0B1D3A]" strokeWidth={1.6} />
                </div>
                <h4 className="mt-4 text-[15px] font-semibold text-[#0B1D3A]">{v.title}</h4>
                <p className="mt-2.5 text-[12.5px] leading-[1.8] text-[#59637F]">{v.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- REAL SHIFTS ---------- */
const TESTIMONIALS = [
  {
    quote:
      "The CareerShift report gave me a clear view of how my work could evolve. It helped me focus on what really matters and explore tools I hadn't considered.",
    from: "From uncertainty →",
    to: "Clearer priorities",
    icon: Target,
    tint: "bg-[#FEF3C7]",
    name: "Aisha Rahman",
    initials: "AR",
    role: "Senior Marketing Manager · UAE",
  },
  {
    quote:
      "I loved how practical and relevant the insights were. It's not just more AI theory — it's about my actual role and what I can do next.",
    from: "From overwhelm →",
    to: "A clearer way forward",
    icon: Lightbulb,
    tint: "bg-[#EDE9FE]",
    name: "Rohan Mehta",
    initials: "RM",
    role: "Operations Manager · India",
  },
  {
    quote:
      "CareerShift helped me see opportunities I hadn't thought of before. It gave me the confidence to take the next step in my career journey.",
    from: "From career doubt →",
    to: "New possibilities",
    icon: Mountain,
    tint: "bg-[#CCFBF1]",
    name: "Sarah Ahmed",
    initials: "SA",
    role: "Finance Professional · Saudi Arabia",
  },
];

function RealShifts() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const n = TESTIMONIALS.length;
    const idx = ((i % n) + n) % n;
    setActive(idx);
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="relative overflow-x-clip bg-[#FFFDF8] py-16 md:py-20 lg:py-24">
      <div className="container-page relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B45309]">
            Real Shifts
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#0B1D3A] sm:text-[2.15rem]">
            What changed after <span className="text-[#F2C94C]">CareerShift?</span>
          </h2>
          <p className="mt-3 text-[15px] font-medium text-[#0B1D3A]/80">
            Real people. Real journeys. Real impact.
          </p>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#FDCF58]" />
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#64748B]">
            Not just what people thought of the report — what it helped them understand, decide or do
            differently.
          </p>
        </div>

        {/* Cards */}
        <div className="relative mt-12 md:mt-14">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(active - 1)}
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#0B1D3A]/6 bg-white text-[#0B1D3A] shadow-[0_8px_20px_rgba(11,29,58,0.08)] transition hover:border-[#FDCF58] hover:text-[#B45309] lg:grid"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(active + 1)}
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#0B1D3A]/6 bg-white text-[#0B1D3A] shadow-[0_8px_20px_rgba(11,29,58,0.08)] transition hover:border-[#FDCF58] hover:text-[#B45309] lg:grid"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t) => {
              const Icon = t.icon;
              return (
                <article
                  key={t.name}
                  className="flex w-[min(85vw,300px)] max-w-full shrink-0 snap-center flex-col rounded-2xl border border-[#0B1D3A]/[0.04] bg-white p-6 shadow-[0_12px_40px_rgba(11,29,58,0.06)] sm:p-7 md:w-auto"
                >
                  <span
                    className="select-none text-[28px] leading-none text-[#F2C94C]"
                    aria-hidden
                  >
                    “
                  </span>
                  <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-[#475569]">
                    {t.quote}
                  </p>

                  <div className="mt-6 border-t border-[#F1F5F9] pt-5">
                    <span className="inline-flex rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B45309]">
                      The Shift
                    </span>
                    <div className="mt-3 flex items-center gap-3">
                      <div
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${t.tint}`}
                      >
                        <Icon className="h-4 w-4 text-[#0B1D3A]" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[13px] text-[#94A3B8]">{t.from}</p>
                        <p className="text-[14.5px] font-bold text-[#0B1D3A]">{t.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full text-[12px] font-bold text-[#0B1D3A] ${t.tint}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0B1D3A]">{t.name}</div>
                      <div className="mt-0.5 text-xs text-[#94A3B8]">{t.role}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => goTo(active - 1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#0B1D3A]/8 bg-white text-[#0B1D3A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => goTo(active + 1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[#0B1D3A]/8 bg-white text-[#0B1D3A]"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-5 bg-[#FDCF58]" : "w-2 bg-[#E2E8F0]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



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
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#0B1D3A] text-white shadow-lg transition hover:bg-[#132a4d]"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
