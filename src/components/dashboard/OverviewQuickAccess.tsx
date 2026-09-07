import { Link } from "react-router-dom";
import {
  FileText,
  BarChart3,
  ClipboardList,
  Wrench,
  ArrowRight,
} from "lucide-react";

const ITEMS = [
  {
    title: "My Work",
    description: "View and edit your roles, tasks and skills.",
    to: "/assessment",
    cta: "Open",
    icon: ClipboardList,
    iconClass: "text-[#0D9488]",
    bgClass: "bg-[#CCFBF1]",
  },
  {
    title: "My Analysis",
    description: "See your Build, Bot or Blend opportunities.",
    to: "/3b-analysis",
    cta: "Open",
    icon: BarChart3,
    iconClass: "text-[#7C3AED]",
    bgClass: "bg-[#EDE9FE]",
  },
  {
    title: "My Report",
    description: "Access your CareerShift report.",
    to: "/report",
    cta: "View",
    icon: FileText,
    iconClass: "text-[#2563EB]",
    bgClass: "bg-[#DBEAFE]",
  },
  {
    title: "My Toolkit",
    description: "Explore recommended AI tools and solutions.",
    to: "/toolkit",
    cta: "Open",
    icon: Wrench,
    iconClass: "text-[#0891B2]",
    bgClass: "bg-[#CFFAFE]",
  },
] as const;

export function OverviewQuickAccess() {
  return (
    <section>
      <h2 className="font-serif text-[26px] font-semibold tracking-tight text-[#0B1D3A] sm:text-[28px]">
        Quick Access
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              to={item.to}
              className="group flex flex-col rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div
                className={`mb-4 grid h-11 w-11 place-items-center rounded-full ${item.bgClass}`}
              >
                <Icon className={`h-5 w-5 ${item.iconClass}`} strokeWidth={1.75} />
              </div>
              <h3 className="text-[16px] font-semibold text-[#0B1D3A]">{item.title}</h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#64748B]">
                {item.description}
              </p>
              <span className="mt-4 inline-flex items-center text-[13px] font-semibold text-[#0B1D3A] transition-colors group-hover:text-[#C9A84C]">
                {item.cta}
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
