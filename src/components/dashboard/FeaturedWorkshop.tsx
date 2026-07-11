import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Award, Clock } from "lucide-react";

export function FeaturedWorkshop() {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Featured Workshop
        </span>
      </div>
      
      <h3 className="text-sm font-bold text-foreground mb-2 leading-tight">Master AI for Everyday Professionals</h3>
      <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
        Learn practical AI workflows that save time, improve productivity, and make you more valuable in your current role.
      </p>
      
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center text-[10px] text-muted-foreground">
          <Clock className="w-3 h-3 text-primary mr-2" /> 6 Hours Duration
        </div>
        <div className="flex items-center text-[10px] text-muted-foreground">
          <PlayCircle className="w-3 h-3 text-primary mr-2" /> Beginner to Intermediate
        </div>
        <div className="flex items-center text-[10px] text-muted-foreground">
          <Award className="w-3 h-3 text-primary mr-2" /> Certificate Included
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full text-xs font-semibold group">
        Explore Workshop <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
