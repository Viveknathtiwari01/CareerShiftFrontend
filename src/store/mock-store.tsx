import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/auth-session";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  industry?: string;
  yearsExp?: number;
  onboarded?: boolean;
};

export type Task = {
  id: string;
  title: string;
  hoursPerWeek: number;
  complexity: "low" | "medium" | "high";
  creativity: "low" | "medium" | "high";
  humanTouch: "low" | "medium" | "high";
  category?: string;
  description?: string;
  confidence?: number;
  selected?: boolean;
  source?: "AI_GENERATED" | "USER";
  frequency?: "Multiple times daily" | "Daily" | "Weekly" | "Monthly" | "Occasionally";
  businessCriticality?: "Mission Critical" | "High" | "Medium" | "Low";
  timeAllocation?: number;
  aiAssistance?: "Never" | "Sometimes" | "Frequently" | "Always";
  confidenceScore?: number;
  manualNotes?: string;
};

export type Assessment = {
  role: string;
  industry: string;
  yearsExp: number;
  tools: string[];
  goals: string[];
  tasks: Task[];
  aiUsage: "none" | "some" | "daily";
  attitude: number; // 1..10
  competencies: string[];
  completedAt?: string;
};

const emptyAssessment: Assessment = {
  role: "",
  industry: "",
  yearsExp: 0,
  tools: [],
  goals: [],
  tasks: [],
  aiUsage: "none",
  attitude: 5,
  competencies: [],
};

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const AuthContext = createContext<AuthCtx | null>(null);
const USER_KEY = "careershift.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const persist = useCallback((next: User | null, accessToken?: string, refreshToken?: string) => {
    setUser(next);
    if (typeof window === "undefined") return;
    if (next && accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(next));
    } else if (!next) {
      clearAuthSession();
    }
  }, []);

  const fetchUser = useCallback(async () => {
    if (!getAccessToken()) {
      setLoading(false);
      return;
    }
    try {
      const { fetchApi } = await import("@/lib/api");
      const res = await fetchApi("/users/me");
      const u: User = {
        id: res.data.id,
        name: res.data.first_name ? `${res.data.first_name} ${res.data.last_name || ""}`.trim() : res.data.username,
        email: res.data.email,
        onboarded: !!res.data.first_name,
      };
      const refresh = getRefreshToken();
      if (refresh) {
        persist(u, getAccessToken() || undefined, refresh);
      } else {
        persist(null);
      }
    } catch {
      persist(null);
    } finally {
      setLoading(false);
    }
  }, [persist]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback<AuthCtx["login"]>(
    async (email, password) => {
      const { fetchApi } = await import("@/lib/api");
      const res = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const accessToken = res.data.access_token as string;
      const refreshToken = res.data.refresh_token as string;

      const userRes = await fetchApi("/users/me");

      const u: User = {
        id: userRes.data.id,
        name: userRes.data.first_name ? `${userRes.data.first_name} ${userRes.data.last_name || ""}`.trim() : userRes.data.username,
        email: userRes.data.email,
        onboarded: !!userRes.data.first_name,
      };
      persist(u, accessToken, refreshToken);
      return u;
    },
    [persist],
  );

  const register = useCallback<AuthCtx["register"]>(
    async (name, email, password) => {
      // In the real flow, the register method here might not be called directly since it's a 2-step process.
      // But we'll leave this to mock the creation or you can handle it inside Auth.tsx.
      throw new Error("Use step-by-step registration in Auth.tsx");
    },
    [persist],
  );

  const logout = useCallback(async () => {
    try {
      const { fetchApi } = await import("@/lib/api");
      const refreshToken = getRefreshToken();
      await fetchApi("/auth/logout", {
        method: "POST",
        body: JSON.stringify(refreshToken ? { refresh_token: refreshToken } : {}),
      });
    } catch {
      // Ignore errors, we clear local storage anyway
    } finally {
      persist(null);
    }
  }, [persist]);

  const updateUser = useCallback<AuthCtx["updateUser"]>((patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, updateUser }),
    [user, loading, login, register, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Assessment                                                          */
/* ------------------------------------------------------------------ */

type AssessCtx = {
  draft: Assessment;
  setDraft: (patch: Partial<Assessment>) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  reset: () => void;
};

const AssessContext = createContext<AssessCtx | null>(null);
const DRAFT_KEY = "careershift.assessment.draft";

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<Assessment>(emptyAssessment);

  useEffect(() => {
    try {
      const d = localStorage.getItem(DRAFT_KEY);
      if (d) setDraftState({ ...emptyAssessment, ...JSON.parse(d) });
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* noop */
    }
  }, [draft]);

  const setDraft = useCallback<AssessCtx["setDraft"]>((patch) => {
    setDraftState((prev) => ({ ...prev, ...patch }));
  }, []);

  const addTask = useCallback<AssessCtx["addTask"]>((task) => {
    setDraftState((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
  }, []);

  const updateTask = useCallback<AssessCtx["updateTask"]>((id, patch) => {
    setDraftState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  }, []);

  const removeTask = useCallback<AssessCtx["removeTask"]>((id) => {
    setDraftState((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== id) }));
  }, []);

  const reset = useCallback(() => {
    setDraftState(emptyAssessment);
    try {
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem("careershift.assessment.submitted");
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo(
    () => ({ draft, setDraft, addTask, updateTask, removeTask, reset }),
    [draft, setDraft, addTask, updateTask, removeTask, reset],
  );

  return <AssessContext.Provider value={value}>{children}</AssessContext.Provider>;
}

export function useAssessment() {
  const ctx = useContext(AssessContext);
  if (!ctx) throw new Error("useAssessment must be used within <AssessmentProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Report derivation (mocked scoring)                                  */
/* ------------------------------------------------------------------ */

export type TaskRouting = "automate" | "augment" | "master";

export type DerivedReport = {
  score: number;
  automate: number;
  augment: number;
  master: number;
  hoursSaved: number;
  routed: (Task & { routing: TaskRouting })[];
  strengths: string[];
  risks: string[];
};

export function deriveReport(a: Assessment | null): DerivedReport {
  if (!a || a.tasks.length === 0) {
    return {
      score: 62,
      automate: 30,
      augment: 45,
      master: 25,
      hoursSaved: 8,
      routed: [],
      strengths: ["Curious about AI", "Open to learning new tools"],
      risks: ["Limited data — complete an assessment for personalized results"],
    };
  }

  const routed = a.tasks.map((t) => {
    const cScore = t.complexity === "low" ? 0 : t.complexity === "medium" ? 1 : 2;
    const crScore = t.creativity === "low" ? 0 : t.creativity === "medium" ? 1 : 2;
    const hScore = t.humanTouch === "low" ? 0 : t.humanTouch === "medium" ? 1 : 2;
    const augScore = cScore + crScore + hScore;

    let routing: TaskRouting;
    if (augScore <= 1) routing = "automate";
    else if (augScore >= 5) routing = "master";
    else routing = "augment";
    return { ...t, routing };
  });

  const totalHours = routed.reduce((s, t) => s + t.hoursPerWeek, 0) || 1;
  const autoH = routed
    .filter((t) => t.routing === "automate")
    .reduce((s, t) => s + t.hoursPerWeek, 0);
  const augH = routed
    .filter((t) => t.routing === "augment")
    .reduce((s, t) => s + t.hoursPerWeek, 0);
  const masterH = routed
    .filter((t) => t.routing === "master")
    .reduce((s, t) => s + t.hoursPerWeek, 0);

  const automate = Math.round((autoH / totalHours) * 100);
  const augment = Math.round((augH / totalHours) * 100);
  const master = Math.round((masterH / totalHours) * 100);

  const usageBoost = a.aiUsage === "daily" ? 20 : a.aiUsage === "some" ? 10 : 0;
  const attitudeBoost = Math.round((a.attitude - 5) * 2);
  const toolBoost = Math.min(a.tools.length * 2, 15);
  const raw = 55 + usageBoost + attitudeBoost + toolBoost + augment * 0.15 - automate * 0.05;
  const score = Math.max(20, Math.min(98, Math.round(raw)));

  const hoursSaved = Math.round(autoH * 0.7 + augH * 0.35);

  return {
    score,
    automate,
    augment,
    master,
    hoursSaved,
    routed,
    strengths: [
      a.aiUsage === "daily" ? "Already using AI daily" : "Familiar with modern tools",
      a.tools.length > 3 ? "Broad tool fluency" : "Focused workflow",
      augment > 40 ? "High augmentation potential" : "Strong human-centred work",
    ],
    risks: [
      automate > 40 ? "Significant task automation exposure" : "Low automation exposure",
      a.attitude < 5 ? "Low reported openness to AI change" : "Keep learning cadence steady",
    ],
  };
}
