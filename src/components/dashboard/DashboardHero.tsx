import { useAuth } from "@/store/mock-store";

export function DashboardHero() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <section className="relative isolate overflow-hidden rounded-[1.25rem] bg-[#F5F2EC]">
      {/* Full-bleed banner — art weighted to the right like the reference */}
      <img
        src="/overview_background.jpeg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[75%_center] lg:object-right"
      />

      {/* Soft left readability wash — keeps mountains visible on the right */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F5F2EC] from-0% via-[#F5F2EC]/78 via-[28%] to-transparent to-[55%]"
        aria-hidden
      />

      <div className="relative z-10 grid min-h-[240px] grid-cols-1 content-end gap-6 px-6 py-8 sm:min-h-[280px] sm:px-8 sm:py-9 lg:min-h-[310px] lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:pb-11 lg:pt-9">
        <div className="max-w-[36rem]">
          <p className="text-[20px] font-semibold text-[#0B1D3A]">
            Welcome back, {firstName} 👋
          </p>

          <h1 className="mt-3 font-serif text-[34px] font-semibold leading-[1.12] tracking-[-0.01em] text-[#0B1D3A] sm:text-[42px] lg:text-[48px]">
            Your CareerShift
            <br />
            continues here.
          </h1>

          <div className="mt-3 h-[3px] w-14 rounded-full bg-[#F2C94C] sm:mt-3.5 sm:h-[3.5px] sm:w-16" aria-hidden />

          <p className="mt-4 max-w-[30rem] text-[15px] leading-[1.65] text-[#4A5568] sm:mt-5 sm:text-[16px]">
            Understand your work. Discover your opportunities.
            <br />
            Know what to do next.
          </p>
        </div>

        <div className="hidden flex-col items-end lg:absolute lg:right-10 lg:top-9 lg:flex">
          <p className="w-[10rem] text-right text-[15px] font-semibold uppercase leading-[1.5] tracking-[0.17em] text-[#8AA0B8]">
            Same you.
            <br />
            A broader
            <br />
            tomorrow.
          </p>
          <div className="mt-2.5 h-[3px] w-[4.75rem] rounded-full bg-[#F2C94C]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
