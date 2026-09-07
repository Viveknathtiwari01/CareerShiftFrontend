import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  UserRound,
  ListChecks,
  Star,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { getProfile } from "@/api/profile";
import { useJourneyStatus } from "@/hooks/use-journey-status";

function skillCount(profile: Awaited<ReturnType<typeof getProfile>> | undefined) {
  if (!profile) return 0;
  return (
    (profile.technicalSkills?.length ?? 0) +
    (profile.professionalSkills?.length ?? 0) +
    (profile.softSkills?.length ?? 0) +
    (profile.behaviouralSkills?.length ?? 0) +
    (profile.digitalSkills?.length ?? 0)
  );
}

export function OverviewCareerGlance() {
  const status = useJourneyStatus();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile-me"],
    queryFn: getProfile,
  });

  const industry = profile?.industry?.trim() || "—";
  const role = profile?.jobTitle?.trim() || "—";
  const skills = skillCount(profile);
  const profileReady = status !== "LOADING" && status !== "NEEDS_PROFILE";
  const assessmentDone =
    status === "NEEDS_3B" || status === "NEEDS_REPORT" || status === "COMPLETED";
  const analysisReady = status === "NEEDS_REPORT" || status === "COMPLETED";

  const tasksValue = assessmentDone ? "Mapped" : profileReady ? "— In Progress" : "—";
  const skillsValue =
    skills > 0 ? `${skills} skills` : profileReady ? "— In Progress" : "—";

  const glanceItems = [
    {
      label: "Industry",
      value: isLoading ? "…" : industry,
      icon: Briefcase,
      iconClass: "text-[#7C3AED]",
      bgClass: "bg-[#EDE9FE]",
    },
    {
      label: "Current Role",
      value: isLoading ? "…" : role,
      icon: UserRound,
      iconClass: "text-[#0D9488]",
      bgClass: "bg-[#CCFBF1]",
    },
    {
      label: "Key Tasks Added",
      value: tasksValue,
      icon: ListChecks,
      iconClass: "text-[#7C3AED]",
      bgClass: "bg-[#EDE9FE]",
      muted: !assessmentDone,
    },
    {
      label: "Key Skills",
      value: skillsValue,
      icon: Star,
      iconClass: "text-[#0891B2]",
      bgClass: "bg-[#CFFAFE]",
      muted: skills === 0,
    },
  ] as const;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
      <section className="rounded-2xl border border-[#E8EDF5] bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-serif text-[22px] font-semibold tracking-tight text-[#0B1D3A] sm:text-[24px]">
              Your Career at a Glance
            </h2>
            <p className="mt-1 text-[13px] text-[#64748B]">
              Based on your profile and work mapping
            </p>
          </div>
          <Link
            to="/my-profile"
            className="inline-flex items-center text-[13px] font-semibold text-[#2563EB] hover:underline"
          >
            Edit Profile
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {glanceItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex gap-3 xl:px-4 ${index > 0 ? "xl:border-l xl:border-[#E8EDF5]" : "xl:pl-0"}`}
              >
                <div
                  className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ${item.bgClass}`}
                >
                  <Icon className={`h-4 w-4 ${item.iconClass}`} strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-[#64748B]">{item.label}</p>
                  <p
                    className={`mt-0.5 truncate text-[14px] font-semibold ${
                      "muted" in item && item.muted
                        ? "text-[#94A3B8]"
                        : "text-[#0B1D3A]"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-[#F0E6D4] bg-[#FBF7F0] p-5 shadow-soft sm:p-6">
        <h2 className="font-serif text-[22px] font-semibold tracking-tight text-[#0B1D3A] sm:text-[24px]">
          Your Work Potential
        </h2>
        <p className="mt-1 text-[13px] text-[#64748B]">
          {analysisReady
            ? "Your Build, Bot and Blend insights are ready."
            : "Insights will appear here after analysis."}
        </p>

        <div className="mt-5 flex items-start gap-4 rounded-xl border border-white/80 bg-white p-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#DBEAFE]">
            <BarChart3 className="h-5 w-5 text-[#2563EB]" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] leading-relaxed text-[#4A5568]">
              {analysisReady
                ? "Open your analysis to explore personalized Build, Bot and Blend opportunities."
                : "Complete your work mapping to see your Build, Bot and Blend opportunities with personalized insights."}
            </p>
            <Link
              to={analysisReady ? "/3b-analysis" : "/assessment"}
              className="mt-3 inline-flex items-center text-[13px] font-semibold text-[#0B1D3A] hover:text-[#C9A84C]"
            >
              {analysisReady ? "Open Analysis" : "Continue Mapping"}
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
