import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Award, Clock } from "lucide-react";

export function FeaturedWorkshop() {
  return (
    <div className="bg-[#C9A84C] rounded-xl p-5 border border-transparent shadow-elevated">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#0A121F]/10 text-[#0A121F] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Featured Workshop
        </span>
      </div>
      
      <h3 className="text-sm font-bold text-[#0A121F] mb-2 leading-tight">Master AI for Everyday Professionals</h3>
      <p className="text-xs text-[#0A121F]/80 mb-4 line-clamp-3">
        Learn practical AI workflows that save time, improve productivity, and make you more valuable in your current role.
      </p>
      
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center text-[10px] text-[#0A121F]/70">
          <Clock className="w-3 h-3 text-[#0A121F] mr-2" /> 6 Hours Duration
        </div>
        <div className="flex items-center text-[10px] text-[#0A121F]/70">
          <PlayCircle className="w-3 h-3 text-[#0A121F] mr-2" /> Beginner to Intermediate
        </div>
        <div className="flex items-center text-[10px] text-[#0A121F]/70">
          <Award className="w-3 h-3 text-[#0A121F] mr-2" /> Certificate Included
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full text-xs font-semibold group bg-[#0A121F] text-[#F9F7F3] border-transparent hover:bg-[#141F32] hover:text-white">
        Explore Workshop <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
