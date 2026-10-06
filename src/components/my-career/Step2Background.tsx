import { useState } from "react";
import { motion } from "framer-motion";
import { WizardData } from "./types";
import { EXPERIENCE_LEVELS } from "@/lib/app-enums";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";

const CURRENCIES = [
  { value: "INR", label: "INR", flag: "in", keywords: "India" },
  { value: "USD", label: "USD", flag: "us", keywords: "United States" },
  { value: "EUR", label: "EUR", flag: "eu", keywords: "Euro" },
  { value: "GBP", label: "GBP", flag: "gb", keywords: "United Kingdom" },
  { value: "JPY", label: "JPY", flag: "jp", keywords: "Japan" },
  { value: "CNY", label: "CNY", flag: "cn", keywords: "China" },
  { value: "AUD", label: "AUD", flag: "au", keywords: "Australia" },
  { value: "CAD", label: "CAD", flag: "ca", keywords: "Canada" },
  { value: "CHF", label: "CHF", flag: "ch", keywords: "Switzerland" },
  { value: "HKD", label: "HKD", flag: "hk", keywords: "Hong Kong" },
  { value: "SGD", label: "SGD", flag: "sg", keywords: "Singapore" },
  { value: "NZD", label: "NZD", flag: "nz", keywords: "New Zealand" },
  { value: "KRW", label: "KRW", flag: "kr", keywords: "South Korea" },
  { value: "AED", label: "AED", flag: "ae", keywords: "United Arab Emirates" },
  { value: "SAR", label: "SAR", flag: "sa", keywords: "Saudi Arabia" },
  { value: "QAR", label: "QAR", flag: "qa", keywords: "Qatar" },
  { value: "KWD", label: "KWD", flag: "kw", keywords: "Kuwait" },
  { value: "BHD", label: "BHD", flag: "bh", keywords: "Bahrain" },
  { value: "OMR", label: "OMR", flag: "om", keywords: "Oman" },
  { value: "THB", label: "THB", flag: "th", keywords: "Thailand" },
  { value: "MYR", label: "MYR", flag: "my", keywords: "Malaysia" },
  { value: "IDR", label: "IDR", flag: "id", keywords: "Indonesia" },
  { value: "PHP", label: "PHP", flag: "ph", keywords: "Philippines" },
  { value: "VND", label: "VND", flag: "vn", keywords: "Vietnam" },
  { value: "PKR", label: "PKR", flag: "pk", keywords: "Pakistan" },
  { value: "BDT", label: "BDT", flag: "bd", keywords: "Bangladesh" },
  { value: "LKR", label: "LKR", flag: "lk", keywords: "Sri Lanka" },
  { value: "NPR", label: "NPR", flag: "np", keywords: "Nepal" },
  { value: "BRL", label: "BRL", flag: "br", keywords: "Brazil" },
  { value: "MXN", label: "MXN", flag: "mx", keywords: "Mexico" },
  { value: "ARS", label: "ARS", flag: "ar", keywords: "Argentina" },
  { value: "CLP", label: "CLP", flag: "cl", keywords: "Chile" },
  { value: "COP", label: "COP", flag: "co", keywords: "Colombia" },
  { value: "PEN", label: "PEN", flag: "pe", keywords: "Peru" },
  { value: "ZAR", label: "ZAR", flag: "za", keywords: "South Africa" },
  { value: "NGN", label: "NGN", flag: "ng", keywords: "Nigeria" },
  { value: "EGP", label: "EGP", flag: "eg", keywords: "Egypt" },
  { value: "KES", label: "KES", flag: "ke", keywords: "Kenya" },
  { value: "MAD", label: "MAD", flag: "ma", keywords: "Morocco" },
  { value: "TRY", label: "TRY", flag: "tr", keywords: "Turkey" },
  { value: "RUB", label: "RUB", flag: "ru", keywords: "Russia" },
  { value: "UAH", label: "UAH", flag: "ua", keywords: "Ukraine" },
  { value: "PLN", label: "PLN", flag: "pl", keywords: "Poland" },
  { value: "CZK", label: "CZK", flag: "cz", keywords: "Czechia" },
  { value: "SEK", label: "SEK", flag: "se", keywords: "Sweden" },
  { value: "NOK", label: "NOK", flag: "no", keywords: "Norway" },
  { value: "DKK", label: "DKK", flag: "dk", keywords: "Denmark" },
  { value: "HUF", label: "HUF", flag: "hu", keywords: "Hungary" },
  { value: "ILS", label: "ILS", flag: "il", keywords: "Israel" },
];

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
  prefilledFromResume?: boolean;
}

export function Step2Background({ data, updateData, prefilledFromResume = false }: Props) {
  const [showOtherExp, setShowOtherExp] = useState(false);

  const handleExpChange = (val: string) => {
    if (val === "Other") {
      setShowOtherExp(true);
      updateData({ experience: "" });
    } else {
      setShowOtherExp(false);
      updateData({ experience: val });
    }
  };

  const isExpCustom = showOtherExp || (data.experience ? !EXPERIENCE_LEVELS.includes(data.experience) : false);

  const fieldClass =
    "h-11 rounded-lg border-slate-200 bg-white text-sm text-[#0B1D3A] shadow-none focus-visible:ring-[#0B1D3A]/20";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <section className="rounded-xl border border-slate-200 bg-white px-6 py-6 sm:px-8 sm:py-7">
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight text-[#0B1D3A] sm:text-2xl">Professional background</h2>
          <p className="text-sm text-slate-500">
            {prefilledFromResume && data.experience
              ? "Experience came from your resume. Adjust it if needed."
              : "Experience is required. Salary is optional."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-bold text-[#0B1D3A]">Total experience</p>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map((level) => {
                const selected = !isExpCustom && data.experience === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleExpChange(level)}
                    className={
                      selected
                        ? "rounded-lg border border-[#0B1D3A] bg-[#0B1D3A] px-3 py-1.5 text-sm text-white"
                        : "rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300"
                    }
                  >
                    {level}
                  </button>
                );
              })}
            </div>
            {isExpCustom ? (
              <Input
                placeholder="Enter years of experience"
                value={data.experience}
                onChange={(event) => updateData({ experience: event.target.value })}
                className={`${fieldClass} mt-2`}
              />
            ) : null}
          </div>

          <div className="space-y-3">
            <Label htmlFor="salary" className="block text-sm font-bold text-[#0B1D3A]">
              Salary
            </Label>
            <div className="grid grid-cols-[8.25rem_1fr] items-center gap-2">
              <Combobox
                options={CURRENCIES}
                value={data.salary_currency}
                onChange={(val) => updateData({ salary_currency: val })}
                placeholder="INR"
                searchPlaceholder="Currency"
                emptyText="Not found"
                className="h-11 rounded-lg px-3 text-sm shadow-none sm:h-11"
              />
              <Input
                id="salary"
                inputMode="numeric"
                placeholder="Amount"
                value={data.salary}
                onChange={(event) => updateData({ salary: event.target.value })}
                className={fieldClass}
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
