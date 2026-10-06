import { motion } from "framer-motion";
import { WizardData } from "./types";
import { Input } from "@/components/ui/input";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
}

const FIELDS: { key: keyof WizardData; label: string; wide?: boolean }[] = [
  { key: "industry", label: "Industry" },
  { key: "businessFunction", label: "Department" },
  { key: "domain", label: "Functional domain" },
  { key: "specialization", label: "Specialization" },
  { key: "jobTitle", label: "Job title", wide: true },
];

const fieldClass =
  "h-11 rounded-lg border-slate-200 bg-white text-sm text-[#0B1D3A] shadow-none focus-visible:ring-[#0B1D3A]/20";

export function Step1CareerIdentity({ data, updateData }: Props) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <section className="rounded-xl border border-slate-200 bg-white px-6 py-6 sm:px-8 sm:py-7">
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1D3A] sm:text-2xl">Current career identity</h2>
          <p className="text-sm text-slate-500">Review the mapped details. Edit anything that is off.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          {FIELDS.map(({ key, label, wide }) => (
            <label key={key} className={wide ? "block space-y-3 sm:col-span-2" : "block space-y-3"}>
              <span className="block text-sm font-bold text-[#0B1D3A]">{label}</span>
              <Input
                id={key}
                value={typeof data[key] === "string" ? data[key] : ""}
                onChange={(event) => updateData({ [key]: event.target.value })}
                className={fieldClass}
              />
            </label>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
