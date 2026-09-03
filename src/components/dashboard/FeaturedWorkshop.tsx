import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

export function FeaturedWorkshop() {
  return (
    <div className="bg-[#CFA844] rounded-[2rem] p-10 md:p-14 lg:p-16 shadow-sm">
      <div className="flex items-center mb-6">
        <span className="bg-[#0B1D3A]/10 text-[#0B1D3A] text-[12px] font-medium px-4 py-1.5 rounded-full">
          Featured Workshop
        </span>
      </div>

      <h2 className="font-display text-3xl sm:text-[40px] font-medium text-[#0B1D3A] leading-tight mb-4">
        Master AI for Everyday Professionals
      </h2>
      
      <p className="text-[17px] text-[#0B1D3A]/80 mb-8 max-w-4xl">
        Learn practical AI workflows that save time, improve productivity, and make you more valuable in your current role.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-10 text-[15px] text-[#0B1D3A]/80">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0B1D3A]" strokeWidth={2} /> 4 Hours Duration
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#0B1D3A]" strokeWidth={2} /> Beginner to Intermediate
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0B1D3A]" strokeWidth={2} /> Certificate Included
        </div>
      </div>

      <Button
        className="bg-[#0B1D3A] hover:bg-[#0b1d3a] text-white rounded-full px-8 h-12 text-[15px] font-semibold border-none shadow-md group"
      >
        Explore Workshop{" "}
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
