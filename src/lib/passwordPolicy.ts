/** Matches Backend PASSWORD_REGEX: 8+ chars, upper, lower, digit, special. */

export type PasswordRuleId =
  | "length"
  | "uppercase"
  | "lowercase"
  | "digit"
  | "special";

export type PasswordRule = {
  id: PasswordRuleId;
  label: string;
  test: (password: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (p) => p.length >= 8,
  },
  {
    id: "uppercase",
    label: "One uppercase letter (A–Z)",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lowercase",
    label: "One lowercase letter (a–z)",
    test: (p) => /[a-z]/.test(p),
  },
  {
    id: "digit",
    label: "One number (0–9)",
    test: (p) => /\d/.test(p),
  },
  {
    id: "special",
    label: "One special character (!@#$…)",
    test: (p) => /[\W_]/.test(p),
  },
];

export function getPasswordRuleStatus(password: string) {
  return PASSWORD_RULES.map((rule) => ({
    ...rule,
    met: rule.test(password),
  }));
}

export function isPasswordValid(password: string): boolean {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}

export function getPasswordStrength(password: string): {
  score: number;
  label: "Too weak" | "Weak" | "Fair" | "Strong" | "Excellent";
} {
  if (!password) {
    return { score: 0, label: "Too weak" };
  }
  const met = PASSWORD_RULES.filter((rule) => rule.test(password)).length;
  if (met <= 1) return { score: met, label: "Too weak" };
  if (met === 2) return { score: 2, label: "Weak" };
  if (met === 3) return { score: 3, label: "Fair" };
  if (met === 4) return { score: 4, label: "Strong" };
  return { score: 5, label: "Excellent" };
}
