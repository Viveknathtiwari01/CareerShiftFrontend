import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/mock-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OverviewTopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.name?.split(" ")[0] || "User";
  const initials = (user?.name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <header className="flex h-12 items-center justify-end">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-full text-[#334155] transition-colors hover:bg-[#0B1D3A]/[0.04] hover:text-[#0B1D3A]"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
          <span
            className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full bg-[#F2C94C] ring-[1.5px] ring-[#F8FAFC]"
            aria-hidden
          />
        </button>

        <div className="h-5 w-px bg-[#E2E8F0]" aria-hidden />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 text-left outline-none transition-colors hover:bg-[#0B1D3A]/[0.04] focus-visible:ring-2 focus-visible:ring-[#F2C94C]/60"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F2C94C] text-[12px] font-semibold tracking-wide text-[#0B1D3A] shadow-[0_1px_2px_rgba(11,29,58,0.08)]">
                {initials}
              </span>
              <span className="hidden text-[14px] font-medium text-[#0B1D3A] sm:inline">
                {firstName}
              </span>
              <ChevronDown
                className="h-3.5 w-3.5 text-[#64748B] transition-transform duration-200 group-data-[state=open]:rotate-180"
                strokeWidth={2}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-52 rounded-xl border border-[#E8EDF5] bg-white p-1.5 shadow-[0_8px_24px_rgba(11,29,58,0.08)]"
          >
            <div className="px-2.5 py-2">
              <p className="truncate text-[13px] font-semibold text-[#0B1D3A]">{user?.name}</p>
              <p className="truncate text-[12px] text-[#64748B]">{user?.email}</p>
            </div>
            <DropdownMenuSeparator className="my-1 bg-[#E8EDF5]" />
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-2.5 py-2 text-[13px]">
              <Link to="/profile" className="flex items-center gap-2.5">
                <User className="h-4 w-4 text-[#64748B]" strokeWidth={1.75} />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer rounded-lg px-2.5 py-2 text-[13px] text-[#B91C1C] focus:bg-red-50 focus:text-[#B91C1C]"
              onSelect={() => {
                logout();
                navigate("/", { replace: true });
              }}
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
