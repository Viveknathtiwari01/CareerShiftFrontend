import { useState, useEffect } from "react";
import { useAuth } from "@/store/mock-store";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";
import { 
  Loader2, 
  ShieldCheck, 
  User as UserIcon, 
  Blocks, 
  Bell, 
  CheckCircle2,
  Pencil,
  Eye,
  EyeOff
} from "lucide-react";

type Tab = "profile" | "security";

export default function Profile() {
  const { user, updateUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Security state
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
          phone 
        }),
      });
      
      const fullName = `${res.data.first_name || ""} ${res.data.last_name || ""}`.trim();
      updateUser({ name: fullName || user?.name });
      setUpdatedAt(res.data.updated_at);
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
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
          confirm_password: confirmPassword
        }),
      });
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditingPassword(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', 
      hour: 'numeric', minute: 'numeric', hour12: true 
    });
  };

  return (
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

        {/* Main Content Area */}
        <main className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-soft">
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
            Account Settings
          </h1>

          {activeTab === "profile" && (
            <div className="animate-fade-in">
              <div className="mb-6 flex items-center gap-2 text-brand">
                <UserIcon className="h-5 w-5" />
                <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              </div>
              
              {!isEditingProfile ? (
                <div className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <DisplayField label="First name" value={firstName} />
                    <DisplayField label="Last name" value={lastName} />
                  </div>
                  <DisplayField label="Email address" value={user?.email || ""} icon />
                  <DisplayField label="Phone number" value={phone} />
                  
                  <div className="pt-4 flex items-center justify-between border-t border-border mt-8">
                    <p className="text-xs text-muted-foreground">
                      {updatedAt ? `Last updated: ${formatDate(updatedAt)}` : "Never updated"}
                    </p>
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-base transition-colors hover:brightness-110"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-6 animate-fade-in-up">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <InputField label="First name" value={firstName} onChange={setFirstName} />
                    <InputField label="Last name" value={lastName} onChange={setLastName} />
                  </div>
                  <InputField label="Email address" value={user?.email ?? ""} onChange={() => {}} disabled />
                  <InputField label="Phone number" value={phone} onChange={setPhone} />
                  
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-border mt-8">
                    <button 
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      disabled={savingProfile}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:opacity-70"
                    >
                      {savingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-fade-in">
              <div className="mb-6 flex items-center gap-2 text-brand">
                <ShieldCheck className="h-5 w-5" />
                <h2 className="text-lg font-semibold text-foreground">Security Settings</h2>
              </div>
              
              {!isEditingPassword ? (
                <div className="space-y-6">
                  <DisplayField label="Password" value="••••••••••••" />
                  
                  <div className="pt-4 flex justify-end border-t border-border mt-8">
                    <button 
                      onClick={() => setIsEditingPassword(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-base transition-colors hover:brightness-110"
                    >
                      <Pencil className="h-4 w-4" />
                      Change Password
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSavePassword} className="space-y-6 animate-fade-in-up">
                  <InputField label="Current password" type="password" value={oldPassword} onChange={setOldPassword} required />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <InputField label="New password" type="password" value={newPassword} onChange={setNewPassword} required />
                    <InputField label="Confirm new password" type="password" value={confirmPassword} onChange={setConfirmPassword} required />
                  </div>
                  
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-border mt-8">
                    <button 
                      type="button"
                      onClick={() => setIsEditingPassword(false)}
                      disabled={savingPassword}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingPassword}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:opacity-70"
                    >
                      {savingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </main>

        {/* Right Sidebar: User Profile Card */}
        <aside className="rounded-2xl border border-border bg-white overflow-hidden shadow-soft">
          <div className="h-28 bg-gradient-to-br from-brand/30 via-cream to-teal/20" />
          <div className="px-6 pb-8 text-center flex flex-col items-center">
            <div className="relative -mt-14 mb-4">
              <div className="grid h-28 w-28 place-items-center rounded-full border-4 border-white bg-primary font-display text-4xl font-bold text-primary-foreground shadow-sm">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">{user?.name || "User"}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
            
            <div className="mt-4 flex justify-center">
               <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal border border-teal/20">
                 <CheckCircle2 className="h-3.5 w-3.5" />
                 Verified Account
               </span>
            </div>

            <button className="mt-8 w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-slate-100">
              Upload New Photo
            </button>
          </div>
        </aside>
        
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

function SidebarButton({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
        active 
          ? "bg-slate-50 text-foreground shadow-sm" 
          : "text-muted-foreground hover:bg-slate-50/50 hover:text-foreground"
      }`}
    >
      <div className={active ? "text-brand" : "text-slate-400"}>
        {icon}
      </div>
      {label}
      {active && (
        <div className="ml-auto h-4 w-1 rounded-full bg-brand" />
      )}
    </button>
  );
}

function DisplayField({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="w-full">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      <div className="border-b border-slate-200 pb-2 text-sm font-medium text-foreground min-h-[28px] flex items-center">
        {value || <span className="text-slate-300 italic">Not provided</span>}
      </div>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  type?: string;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="block w-full">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          disabled={disabled}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-brand/50 focus:bg-white focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </label>
  );
}
