import { useState } from "react";
import { useAuth } from "@/store/mock-store";
import { toast } from "sonner";

function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [role, setRole] = useState(user?.role ?? "");
  const [industry, setIndustry] = useState(user?.industry ?? "");

  function save() {
    updateUser({ name, role, industry });
    toast.success("Profile updated");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="font-display text-3xl font-bold tracking-tight">Profile</h1>
      <p className="mt-2 text-muted-foreground">
        Keep your details current for sharper recommendations.
      </p>
      <div className="surface-card mt-8 space-y-5 p-6">
        <Field label="Full name" value={name} onChange={setName} />
        <Field label="Email" value={user?.email ?? ""} onChange={() => {}} disabled />
        <Field label="Role" value={role} onChange={setRole} />
        <Field label="Industry" value={industry} onChange={setIndustry} />
        <button
          onClick={save}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-elevated"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium">{label}</span>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
      />
    </label>
  );
}

export default Profile;
