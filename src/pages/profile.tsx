import { useState, useEffect } from "react";
import { useAuth } from "@/store/mock-store";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Loader2,
  ShieldCheck,
  User as UserIcon,
  CheckCircle2,
  Pencil,
  Eye,
  EyeOff,
  Mail,
  Phone,
} from "lucide-react";

function getInitials(firstName: string, lastName: string, fallback?: string) {
  const first = firstName.trim()[0]?.toUpperCase() ?? "";
  const last = lastName.trim()[0]?.toUpperCase() ?? "";
  if (first && last) return `${first}${last}`;
  if (first) return first;
  return fallback?.trim()[0]?.toUpperCase() ?? "U";
}

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetchApi("/users/me");
        setFirstName(res.data.first_name || "");
        setLastName(res.data.last_name || "");
        setPhone(res.data.phone || "");
        setUpdatedAt(res.data.updated_at);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (savingProfile) return;
    setSavingProfile(true);
    try {
      const res = await fetchApi("/users/me", {
        method: "PUT",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone,
        }),
      });

      const fullName = `${res.data.first_name || ""} ${res.data.last_name || ""}`.trim();
      updateUser({ name: fullName || user?.name });
      setUpdatedAt(res.data.updated_at);
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleSavePassword(e: React.FormEvent) {
    e.preventDefault();
    if (savingPassword) return;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setSavingPassword(true);
    try {
      await fetchApi("/users/me/password", {
        method: "PUT",
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditingPassword(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to change password";
      toast.error(message);
    } finally {
      setSavingPassword(false);
    }
  }

  const displayName =
    `${firstName} ${lastName}`.trim() || user?.name || "User";
  const initials = getInitials(firstName, lastName, user?.name);

  return (
<<<<<<< HEAD
    <div className="w-full space-y-8">
      <PageHeader
        title="Account Settings"
        description="Manage your personal information and account security."
      />
=======
    <div>
      
      <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_300px]">
        
        {/* Left Sidebar Menu */}
        <aside className="rounded-2xl border border-border bg-white p-4 shadow-soft hidden md:block">
          <nav className="space-y-1">
            <SidebarButton 
              icon={<UserIcon className="h-4 w-4" />} 
              label="Profile" 
              active={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")} 
            />
            <SidebarButton 
              icon={<ShieldCheck className="h-4 w-4" />} 
              label="Account Security" 
              active={activeTab === "security"} 
              onClick={() => setActiveTab("security")} 
            />
          </nav>
        </aside>
>>>>>>> 9ce78241cdcadf8a8ff9a2d4d098b916476f5962

      {/* Profile summary */}
      <section className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:gap-6">
        <div
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground"
          aria-hidden
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {displayName}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{user?.email}</span>
          </p>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified account
            </span>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 md:grid-cols-2">
        <SettingsSection
          icon={<UserIcon className="h-5 w-5" />}
          title="Personal Information"
          description="Update your name and contact details."
          action={
            !isEditingProfile ? (
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            ) : null
          }
        >
          {!isEditingProfile ? (
            <div className="space-y-5">
              <ReadOnlyField label="First name" value={firstName} />
              <ReadOnlyField label="Last name" value={lastName} />
              <ReadOnlyField label="Email address" value={user?.email ?? ""} />
              <ReadOnlyField label="Phone number" value={phone} icon={<Phone className="h-4 w-4" />} />
              {updatedAt ? (
                <p className="border-t border-border pt-4 text-xs text-muted-foreground">
                  Last updated {formatDate(updatedAt)}
                </p>
              ) : null}
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <InputField label="First name" value={firstName} onChange={setFirstName} />
              <InputField label="Last name" value={lastName} onChange={setLastName} />
              <InputField
                label="Email address"
                value={user?.email ?? ""}
                onChange={() => {}}
                disabled
                hint="Email cannot be changed here."
              />
              <InputField label="Phone number" value={phone} onChange={setPhone} />
              <FormActions
                onCancel={() => setIsEditingProfile(false)}
                submitLabel="Save changes"
                loading={savingProfile}
              />
            </form>
          )}
        </SettingsSection>

        <SettingsSection
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Password & Security"
          description="Keep your account secure with a strong password."
          action={
            !isEditingPassword ? (
              <button
                type="button"
                onClick={() => setIsEditingPassword(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
                Change password
              </button>
            ) : null
          }
        >
          {!isEditingPassword ? (
            <ReadOnlyField label="Password" value="••••••••••••" masked />
          ) : (
            <form onSubmit={handleSavePassword} className="space-y-5">
              <InputField
                label="Current password"
                type="password"
                value={oldPassword}
                onChange={setOldPassword}
                required
              />
              <InputField
                label="New password"
                type="password"
                value={newPassword}
                onChange={setNewPassword}
                required
              />
              <InputField
                label="Confirm new password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
              />
              <FormActions
                onCancel={() => setIsEditingPassword(false)}
                submitLabel="Update password"
                loading={savingPassword}
              />
            </form>
          )}
        </SettingsSection>
      </div>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  action,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-3">
          <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
            {icon}
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {action}
      </div>
      <div className="flex flex-1 flex-col px-5 py-4">{children}</div>
    </section>
  );
}

function ReadOnlyField({
  label,
  value,
  icon,
  masked,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  masked?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 flex min-h-[1.5rem] items-center gap-2 text-sm font-medium text-foreground">
        {icon ? <span className="text-muted-foreground">{icon}</span> : null}
        {value ? (
          masked ? (
            <span className="tracking-widest text-muted-foreground">{value}</span>
          ) : (
            value
          )
        ) : (
          <span className="font-normal italic text-muted-foreground/70">Not provided</span>
        )}
      </dd>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          disabled={disabled}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-brand/50 focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70"
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p> : null}
    </label>
  );
}

function FormActions({
  onCancel,
  submitLabel,
  loading,
}: {
  onCancel: () => void;
  submitLabel: string;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-70"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {submitLabel}
      </button>
    </div>
  );
}
