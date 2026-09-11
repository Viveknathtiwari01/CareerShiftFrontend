import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getPasswordRuleStatus,
  getPasswordStrength,
} from "@/lib/passwordPolicy";

type PasswordRequirementsProps = {
  password: string;
  confirmPassword?: string;
  showConfirmMatch?: boolean;
  visible?: boolean;
  className?: string;
};

export function PasswordRequirements({
  password,
  confirmPassword = "",
  showConfirmMatch = false,
  visible = true,
  className,
}: PasswordRequirementsProps) {
  const rules = getPasswordRuleStatus(password);
  const strength = getPasswordStrength(password);
  const confirmTouched = confirmPassword.length > 0;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const progress = (strength.score / 5) * 100;

  const strengthColor =
    strength.score <= 1
      ? "bg-rose-400"
      : strength.score === 2
        ? "bg-amber-400"
        : strength.score === 3
          ? "bg-[#FDCF58]"
          : strength.score === 4
            ? "bg-teal-500"
            : "bg-emerald-500";

  const strengthText =
    strength.score <= 1
      ? "text-rose-600"
      : strength.score === 2
        ? "text-amber-600"
        : strength.score === 3
          ? "text-[#B8962E]"
          : strength.score === 4
            ? "text-teal-700"
            : "text-emerald-700";

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          key="password-requirements"
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn("overflow-hidden", className)}
        >
          <div className="rounded-xl border border-[#E6EDF5] bg-[#F8FAFC]/90 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-[#E8EEF5]">
                <motion.div
                  className={cn("h-full rounded-full", strengthColor)}
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span
                className={cn(
                  "shrink-0 text-[11px] font-semibold tabular-nums transition-colors duration-200",
                  password ? strengthText : "text-[#5B7C99]",
                )}
              >
                {password ? strength.label : "Strength"}
              </span>
            </div>

            <ul className="mt-2 grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2">
              {rules.map((rule) => (
                <li key={rule.id} className="flex min-w-0 items-center gap-1.5">
                  <RuleDot met={rule.met} />
                  <span
                    className={cn(
                      "truncate text-[12px] leading-tight transition-colors duration-200",
                      rule.met ? "font-medium text-[#0B1D3A]" : "text-[#5B7C99]",
                    )}
                  >
                    {shortLabel(rule.id, rule.label)}
                  </span>
                </li>
              ))}
            </ul>

            {showConfirmMatch ? (
              <div className="mt-1.5 flex items-center gap-1.5 border-t border-[#E6EDF5] pt-1.5">
                <RuleDot
                  met={passwordsMatch}
                  warn={confirmTouched && !passwordsMatch}
                />
                <span
                  className={cn(
                    "text-[12px] leading-tight transition-colors duration-200",
                    passwordsMatch
                      ? "font-medium text-[#0B1D3A]"
                      : confirmTouched
                        ? "font-medium text-rose-600"
                        : "text-[#5B7C99]",
                  )}
                >
                  {passwordsMatch
                    ? "Passwords match"
                    : confirmTouched
                      ? "Passwords do not match"
                      : "Passwords must match"}
                </span>
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function shortLabel(
  id: string,
  fallback: string,
): string {
  switch (id) {
    case "length":
      return "8+ characters";
    case "uppercase":
      return "Uppercase letter";
    case "lowercase":
      return "Lowercase letter";
    case "digit":
      return "One number";
    case "special":
      return "Special character";
    default:
      return fallback;
  }
}

function RuleDot({ met, warn = false }: { met: boolean; warn?: boolean }) {
  return (
    <span
      className={cn(
        "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full transition-all duration-200",
        met
          ? "bg-emerald-500 text-white"
          : warn
            ? "bg-rose-500 text-white"
            : "border border-[#C5D3E0] bg-white",
      )}
      aria-hidden
    >
      {met || warn ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
    </span>
  );
}
