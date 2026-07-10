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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* noop */
    }
    setLoading(false);
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (typeof window === "undefined") return;
    if (next) localStorage.setItem(USER_KEY, JSON.stringify(next));
    else localStorage.removeItem(USER_KEY);
  }, []);

  const login = useCallback<AuthCtx["login"]>(
    async (email) => {
      await new Promise((r) => setTimeout(r, 400));
      const u: User = {
        id: crypto.randomUUID(),
        name: email.split("@")[0] ?? "there",
        email,
        onboarded: true,
      };
      persist(u);
      return u;
    },
    [persist],
  );

  const register = useCallback<AuthCtx["register"]>(
    async (name, email) => {
      await new Promise((r) => setTimeout(r, 500));
      const u: User = {
        id: crypto.randomUUID(),
        name,
        email,
        onboarded: false,
      };
      persist(u);
      return u;
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

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
  submitted: Assessment | null;
  setDraft: (patch: Partial<Assessment>) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  submit: () => void;
  reset: () => void;
};

const AssessContext = createContext<AssessCtx | null>(null);
const DRAFT_KEY = "careershift.assessment.draft";
const SUBMITTED_KEY = "careershift.assessment.submitted";

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<Assessment>(emptyAssessment);
  const [submitted, setSubmitted] = useState<Assessment | null>(null);

  useEffect(() => {
    try {
      const d = localStorage.getItem(DRAFT_KEY);
      if (d) setDraftState({ ...emptyAssessment, ...JSON.parse(d) });
      const s = localStorage.getItem(SUBMITTED_KEY);
      if (s) setSubmitted(JSON.parse(s));
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

  const submit = useCallback(() => {
    const done: Assessment = { ...draft, completedAt: new Date().toISOString() };
    setSubmitted(done);
    try {
      localStorage.setItem(SUBMITTED_KEY, JSON.stringify(done));
    } catch {
      /* noop */
    }
  }, [draft]);

  const reset = useCallback(() => {
    setDraftState(emptyAssessment);
    setSubmitted(null);
    try {
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem(SUBMITTED_KEY);
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo(
    () => ({ draft, submitted, setDraft, addTask, updateTask, removeTask, submit, reset }),
    [draft, submitted, setDraft, addTask, updateTask, removeTask, submit, reset],
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
