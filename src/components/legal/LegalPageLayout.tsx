import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-[#f6f5ec]/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/log_text.jpeg" alt="CareerShift Logo" className="h-12 object-contain" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-brand">Legal</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          <article className="prose-legal mt-10 space-y-8">{children}</article>
        </div>
      </main>

      <footer className="border-t border-border bg-[#0A1525]">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-8 text-sm text-white/60 sm:flex-row sm:items-center md:text-base">
          <span>© {new Date().getFullYear()} CareerShift. All rights reserved.</span>
          <span>Built for professionals navigating the AI shift.</span>
        </div>
      </footer>
    </div>
  );
}

type LegalSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
