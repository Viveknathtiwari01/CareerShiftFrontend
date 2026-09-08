import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  FileText,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Footer } from "@/components/layout/Footer";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  description?: string;
  badge?: string;
  children: ReactNode;
};

const NAV_LINKS = [
  { label: "CareerShift Way", to: "/#framework" },
  { label: "How It Works", to: "/#how" },
  { label: "What's Inside", to: "/#features" },
  { label: "Pricing", to: "/#pricing" },
  { label: "About Us", to: "/about" },
] as const;

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalPageLayout({
  title,
  lastUpdated,
  description,
  badge = "Legal",
  children,
}: LegalPageLayoutProps) {
  const location = useLocation();
  const isPrivacy = location.pathname.includes("privacy");
  const Icon = isPrivacy ? ShieldCheck : FileText;

  const sections = useMemo(() => {
    const items: { id: string; title: string }[] = [];
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      const props = child.props as { title?: string };
      if (typeof props.title === "string") {
        items.push({ id: slugify(props.title), title: props.title });
      }
    });
    return items;
  }, [children]);

  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!sections.length) return;

    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0B1D3A]">
      <LegalNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-br from-[#FFFAF0] via-white to-white pt-16">
        <div className="pointer-events-none absolute -right-[12%] top-0 h-[420px] w-[420px] rounded-full bg-[#FDCF58]/15 blur-[90px]" />
        <div className="pointer-events-none absolute -left-[8%] bottom-0 h-[280px] w-[280px] rounded-full bg-[#0B1D3A]/5 blur-[80px]" />

        <div className="container-page relative py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B4A72] transition-colors hover:text-[#0B1D3A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full bg-[#FDF0D3] px-[1.1rem] py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9911A]">
              <Icon className="h-3.5 w-3.5" />
              {badge}
            </span>

            <h1 className="mt-6 font-display text-[2.35rem] font-bold leading-[1.12] tracking-tight text-[#0B1D3A] sm:text-5xl">
              {title}
            </h1>

            {description ? (
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#3B4A72] sm:text-[16px]">
                {description}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-medium text-[#3B4A72] shadow-sm">
                Last updated: {lastUpdated}
              </span>
              <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-medium text-[#3B4A72] shadow-sm">
                Noorak Ventures FZE LLC
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={isPrivacy ? "/terms" : "/privacy"}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0B1D3A] transition-colors hover:bg-black/5"
              >
                {isPrivacy ? "View Terms & Conditions" : "View Privacy Policy"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FDCF58] px-4 py-2 text-sm font-semibold text-[#0B1D3A] shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#ebd593]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container-page py-12 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[260px_minmax(0,1fr)]">
          {/* TOC */}
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B7C99]">
                  On this page
                </p>
                <nav className="mt-4 max-h-[calc(100vh-8rem)] space-y-0.5 overflow-y-auto pr-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(s.id)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className={`block rounded-lg border-l-2 px-3 py-2 text-[13px] leading-snug transition-colors ${
                        activeId === s.id
                          ? "border-[#FDCF58] bg-[#FDCF58]/10 font-semibold text-[#0B1D3A]"
                          : "border-transparent text-[#3B4A72]/80 hover:border-black/10 hover:bg-black/[0.03] hover:text-[#0B1D3A]"
                      }`}
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <article className="mx-auto w-full max-w-3xl space-y-6 lg:mx-0">
            {Children.map(children, (child) => {
              if (!isValidElement(child)) return child;
              const props = child.props as { title?: string };
              if (typeof props.title !== "string") return child;
              return child as ReactElement;
            })}
          </article>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

function LegalNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/new_logo11.png" alt="CareerShift Logo" className="h-14 object-contain" />
        </Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-black/80 transition-colors hover:text-black"
            >
              {l.label}
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

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#FDCF58]/40 bg-[#FDCF58] text-[#0B1D3A] shadow-lg transition-all hover:scale-105 hover:bg-[#ebd593]"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  const id = slugify(title);

  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-black/[0.06] bg-gradient-to-br from-[#FFFAF0]/60 via-white to-white p-6 shadow-[0_1px_0_rgba(11,29,58,0.04)] sm:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-6 w-1.5 shrink-0 rounded-full bg-[#FDCF58]" />
        <h2 className="font-display text-xl font-bold tracking-tight text-[#0B1D3A] sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-4 pl-0 text-[15px] leading-[1.75] text-[#3B4A72] sm:pl-[0.875rem] [&_a]:font-semibold [&_a]:text-[#0B1D3A] [&_a]:underline [&_a]:underline-offset-2 [&_li]:marker:text-[#FDCF58] [&_strong]:font-semibold [&_strong]:text-[#0B1D3A] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}
