import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Briefcase, Building2, Sparkles } from "lucide-react";
import { useAuth } from "@/store/mock-store";



const INDUSTRIES = [
  "Software",
  "Design",
  "Marketing",
  "Finance",
  "Legal",
  "Healthcare",
  "Education",
  "Operations",
  "Other",
];

function Onboarding() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(user?.role ?? "");
  const [industry, setIndustry] = useState(user?.industry ?? "");
  const [years, setYears] = useState(user?.yearsExp ?? 3);

  function finish() {
    updateUser({ role, industry, yearsExp: years, onboarded: true });
    navigate({ to: "/assessment" });
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
      <div className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand">
        <Sparkles className="h-3.5 w-3.5" /> Step 1 of 2
      </div>
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Welcome, {user?.name}. Let's set up your profile.
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        A few details help us tailor your AI Career Readiness assessment and Report.
      </p>

      <div className="surface-card mt-10 space-y-6 p-6 md:p-8">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Briefcase className="h-4 w-4 text-muted-foreground" /> What's your current role?
          </span>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Senior Product Designer"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-soft outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <div>
          <span className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Building2 className="h-4 w-4 text-muted-foreground" /> Which industry?
          </span>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndustry(i)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  industry === i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Years of experience</span>
            <span className="font-display text-lg font-bold text-foreground">{years}</span>
          </div>
          <input
            type="range"
            min={0}
            max={30}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[color:var(--brand)]"
          />
        </label>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          Skip for now
        </button>
        <button
          disabled={!role || !industry}
          onClick={finish}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          Start assessment <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
