import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sprout,
  Bot,
  Blend,
  Cog,
  Users,
  Compass,
  BookOpen,
  MessageCircle,
  MessageSquare,
} from "lucide-react";

function CircleArrow({ tone = "cream" }: { tone?: "cream" | "muted" }) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
        tone === "cream"
          ? "bg-[#F7F0E4] text-[#0B1D3A] group-hover:bg-[#F2C94C]"
          : "bg-[#EEF2F7] text-[#0B1D3A] group-hover:bg-[#E2E8F0]"
      }`}
    >
      <ArrowRight className="h-4 w-4" />
    </span>
  );
}

export function OverviewExploreSections() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="font-serif text-[26px] font-semibold tracking-tight text-[#0B1D3A] sm:text-[28px]">
          Explore What&apos;s Possible
        </h2>
        <p className="mt-1 text-[14px] text-[#64748B]">
          Different parts of your work will evolve differently. See how.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Link
            to="/3b-analysis"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EDE9FE]">
              <Sprout className="h-5 w-5 text-[#7C3AED]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#0B1D3A]">
                Build It
              </h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">
                Strengthen the capabilities that matter most.
              </p>
            </div>
            <CircleArrow />
          </Link>

          <Link
            to="/3b-analysis"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#CCFBF1]">
              <Bot className="h-5 w-5 text-[#0D9488]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#0B1D3A]">
                Bot It
              </h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">
                Automate tasks that can be delegated.
              </p>
            </div>
            <CircleArrow />
          </Link>

          <Link
            to="/3b-analysis"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FEF3C7]">
              <Blend className="h-5 w-5 text-[#D97706]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-bold uppercase tracking-wide text-[#0B1D3A]">
                Blend It
              </h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">
                Work better with AI for greater impact.
              </p>
            </div>
            <CircleArrow />
          </Link>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-[26px] font-semibold tracking-tight text-[#0B1D3A] sm:text-[28px]">
              Your Recommended Toolkit
            </h2>
            <p className="mt-1 text-[14px] text-[#64748B]">
              Tools matched to the work you do. (Available after analysis)
            </p>
          </div>
          <Link
            to="/toolkit"
            className="inline-flex items-center text-[13px] font-semibold text-[#2563EB] hover:underline"
          >
            View all tools
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Link
            to="/toolkit"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EEF2F7]">
              <Cog className="h-5 w-5 text-[#0B1D3A]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#0B1D3A]">Tools for Automation</h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">
                Relevant to your BOT IT opportunities.
              </p>
            </div>
            <CircleArrow tone="muted" />
          </Link>

          <Link
            to="/toolkit"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#CCFBF1]">
              <Users className="h-5 w-5 text-[#0D9488]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#0B1D3A]">Tools for Augmentation</h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">
                Relevant to your BLEND IT opportunities.
              </p>
            </div>
            <CircleArrow tone="muted" />
          </Link>

          <Link
            to="/toolkit"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EEF2F7]">
              <Compass className="h-5 w-5 text-[#0B1D3A]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#0B1D3A]">Explore All Tools</h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">
                Browse the complete tool library.
              </p>
            </div>
            <CircleArrow tone="muted" />
          </Link>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-[26px] font-semibold tracking-tight text-[#0B1D3A] sm:text-[28px]">
          Need Help?
        </h2>
        <p className="mt-1 text-[14px] text-[#64748B]">We&apos;re here to support you.</p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <a
            href="/#contact"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EEF2F7]">
              <BookOpen className="h-5 w-5 text-[#0B1D3A]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#0B1D3A]">Visit Help Center</h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">Guides and FAQs</p>
            </div>
            <CircleArrow tone="muted" />
          </a>

          <a
            href="mailto:hello@careershift3b.com"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EEF2F7]">
              <MessageCircle className="h-5 w-5 text-[#0B1D3A]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#0B1D3A]">Contact Support</h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">Get in touch</p>
            </div>
            <CircleArrow tone="muted" />
          </a>

          <a
            href="mailto:hello@careershift3b.com?subject=CareerShift%20Feedback"
            className="group flex items-center gap-4 rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EEF2F7]">
              <MessageSquare className="h-5 w-5 text-[#0B1D3A]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#0B1D3A]">Share Feedback</h3>
              <p className="mt-0.5 text-[13px] text-[#64748B]">Help us improve</p>
            </div>
            <CircleArrow tone="muted" />
          </a>
        </div>
      </section>
    </div>
  );
}
