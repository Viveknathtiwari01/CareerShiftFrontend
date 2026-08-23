import React from "react";
import { cn } from "@/lib/utils";

interface AppLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  logoSrc?: string;
}

export function AppLoader({ className, size = "md", logoSrc = "/spinner_image.png" }: AppLoaderProps) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40",
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      {/* Spinning outer ring with two brand colors to simulate the reference image */}
      <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-brand border-l-brand border-b-ink border-r-ink animate-[spin_1.5s_linear_infinite] opacity-90" />
      
      {/* Inner stationary container with logo */}
      <div className="flex flex-col items-center justify-center bg-card rounded-full h-[88%] w-[88%] shadow-sm z-10 p-2 overflow-hidden">
        <img src={logoSrc} alt="Loading..." className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
