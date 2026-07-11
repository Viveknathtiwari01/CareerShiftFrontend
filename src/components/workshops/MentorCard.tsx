import { UserCircle2 } from "lucide-react";

export function MentorCard() {
  return (
    <div className="py-6">
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col sm:flex-row">
        <div className="sm:w-1/3 bg-muted flex items-center justify-center p-8 border-b sm:border-b-0 sm:border-r border-border">
          <UserCircle2 className="w-24 h-24 text-muted-foreground/50" strokeWidth={1} />
        </div>
        
        <div className="sm:w-2/3 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-lg font-bold text-foreground mb-1">Meet Your Mentor</h2>
          
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground">Alex Mercer</h3>
            <p className="text-sm text-primary font-medium">Founder of CareerShift & AI Consultant</p>
          </div>
          
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              "I created CareerShift after watching countless talented professionals worry about AI replacing them. The truth is, AI isn't here to take your job—it's here to supercharge it."
            </p>
            <p>
              Our mission is simple: Help professionals work <strong>with</strong> AI instead of fearing it. This workshop distills years of consulting into practical, everyday skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
