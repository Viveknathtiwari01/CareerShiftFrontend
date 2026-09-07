import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type AssessmentHeroProps = {
  actions?: ReactNode;
};

export function AssessmentHero({ actions }: AssessmentHeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[1.25rem] bg-[#F5F2EC]">
      <img
        src="/overview_background.jpeg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[75%_center] lg:object-right"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F5F2EC] from-0% via-[#F5F2EC]/78 via-[28%] to-transparent to-[55%]"
        aria-hidden
      />

      <div className="relative z-10 grid min-h-[240px] grid-cols-1 content-end gap-6 px-6 py-8 sm:min-h-[280px] sm:px-8 sm:py-9 lg:min-h-[310px] lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:pb-11 lg:pt-9">
        <div className="max-w-[38rem]">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0B1D3A] transition-colors hover:text-[#C9A84C]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to Home
          </Link>

          <h1 className="mt-4 font-serif text-[34px] font-semibold leading-[1.12] tracking-[-0.01em] text-[#0B1D3A] sm:text-[42px] lg:text-[48px]">
            AI Based Career
            <br />
            Assessment
          </h1>

          <p className="mt-4 max-w-[32rem] text-[15px] leading-[1.65] text-[#4A5568] sm:mt-5 sm:text-[16px]">
            Understand how AI will impact your career, analyze your daily work, and get a
            personalized CareerShift roadmap.
          </p>

          {actions ? <div className="mt-5">{actions}</div> : null}
        </div>

        <div className="hidden flex-col items-end lg:absolute lg:right-10 lg:top-9 lg:flex">
          <p className="w-[11.5rem] text-right text-[12px] font-semibold uppercase leading-[1.45] tracking-[0.14em] text-[#8AA0B8]">
            Turn today&apos;s work
            <br />
            into tomorrow&apos;s
            <br />
            opportunities.
          </p>
          <div className="mt-2.5 h-[3px] w-[4.75rem] rounded-full bg-[#F2C94C]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
