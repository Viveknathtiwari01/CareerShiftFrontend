import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Calendar,
  Building2,
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F8FA] text-[#0B1D3A]">
      <LegalNav />

      {/* Hero */}
      <section className="relative border-b border-black/5 bg-white pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#FFFAF0]/80 to-white" />

        <div className="container-page relative py-10 md:py-14">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <Link
                to="/"
                className="inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-semibold text-[#5B7C99] transition-colors hover:text-[#0B1D3A]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>

              <div className="ml-auto flex flex-wrap items-center justify-end gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FDF0D3] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9911A]">
                  <Icon className="h-3.5 w-3.5" />
                  {badge}
                </span>
                <Link
                  to={isPrivacy ? "/terms" : "/privacy"}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0B1D3A] transition-colors hover:bg-black/5"
                >
                  {isPrivacy ? "Terms & Conditions" : "Privacy Policy"}
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

            <div className="flex max-w-3xl flex-col gap-4">
              <h1 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-[#0B1D3A] sm:text-4xl md:text-[2.75rem]">
                {title}
              </h1>

              {description ? (
                <p className="max-w-2xl text-[15px] leading-relaxed text-[#3B4A72] sm:text-base">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="flex max-w-3xl flex-col gap-2 border-t border-black/8 pt-5 text-sm text-[#5B7C99] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-[#C9911A]" />
                Last updated: {lastUpdated}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#C9D2DF] sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 shrink-0 text-[#C9911A]" />
                Noorak Ventures FZE LLC
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container-page py-10 md:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[260px_minmax(0,1fr)]">
          {/* TOC — desktop */}
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B7C99]">
                  On this page
                </p>
                <nav className="mt-4 max-h-[calc(100vh-10rem)] space-y-0.5 overflow-y-auto pr-1">
                  {sections.map((s, index) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(s.id);
                      }}
                      className={`block rounded-lg px-3 py-2 text-[13px] leading-snug transition-colors ${
                        activeId === s.id
                          ? "bg-[#FDCF58]/15 font-semibold text-[#0B1D3A]"
                          : "text-[#3B4A72]/85 hover:bg-black/[0.03] hover:text-[#0B1D3A]"
                      }`}
                    >
                      <span className="mr-2 inline-block w-5 text-[11px] font-semibold text-[#8A9BB5]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {s.title.replace(/^\d+\.\s*/, "")}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <div className="min-w-0 space-y-5">
            {/* TOC — mobile */}
            {sections.length > 0 && (
              <div className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm lg:hidden">
                <label
                  htmlFor="legal-toc"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B7C99]"
                >
                  Jump to section
                </label>
                <select
                  id="legal-toc"
                  className="w-full rounded-xl border border-black/10 bg-[#F7F8FA] px-3 py-2.5 text-sm text-[#0B1D3A] outline-none focus:ring-2 focus:ring-[#FDCF58]/50"
                  value={activeId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setActiveId(id);
                    scrollToSection(id);
                  }}
                >
                  {sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Document body */}
            <article className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm">
              {Children.map(children, (child, index) => {
                if (!isValidElement(child)) return child;
                const props = child.props as { title?: string };
                if (typeof props.title !== "string") return child;
                return (
                  <div
                    key={slugify(props.title)}
                    className={index > 0 ? "border-t border-black/6" : undefined}
                  >
                    {child as ReactElement}
                  </div>
                );
              })}
            </article>
          </div>
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
  const displayTitle = title.replace(/^\d+\.\s*/, "");
  const numberMatch = title.match(/^(\d+)\./);
  const number = numberMatch?.[1];

  return (
    <section id={id} className="scroll-mt-28 px-5 py-7 sm:px-8 sm:py-8">
      <div className="flex items-start gap-3 sm:gap-4">
        {number ? (
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDCF58]/20 text-xs font-bold text-[#0B1D3A]">
            {number.padStart(2, "0")}
          </span>
        ) : (
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FDCF58]" />
        )}
        <h2 className="font-display text-lg font-bold tracking-tight text-[#0B1D3A] sm:text-xl">
          {displayTitle}
        </h2>
      </div>
      <div className="mt-4 space-y-3.5 pl-0 text-[15px] leading-[1.75] text-[#3B4A72] sm:pl-12 [&_a]:font-semibold [&_a]:text-[#0B1D3A] [&_a]:underline [&_a]:underline-offset-2 [&_li]:marker:text-[#C9911A] [&_p]:text-[#3B4A72] [&_strong]:font-semibold [&_strong]:text-[#0B1D3A] [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
