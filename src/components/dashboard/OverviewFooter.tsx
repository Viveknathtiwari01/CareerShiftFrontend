import { Link } from "react-router-dom";

export function OverviewFooter() {
  return (
    <footer className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E8EDF5] bg-white px-5 py-4 text-center shadow-soft sm:flex-row sm:text-left">
      <Link to="/dashboard" className="shrink-0">
        <img
          src="/new_logo11.png"
          alt="CareerShift"
          className="h-8 w-auto object-contain"
        />
      </Link>
      <p className="text-[13px] font-medium text-[#64748B]">
        Bridge Your Career to the AI Future.
      </p>
      <a
        href="https://careershift3b.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] font-semibold text-[#0B1D3A] hover:text-[#C9A84C]"
      >
        careershift3b.com
      </a>
    </footer>
  );
}
