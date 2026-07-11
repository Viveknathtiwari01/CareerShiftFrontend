import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Lifetime Access to all 6 Modules",
  "CareerShift Official Certificate",
  "Future Updates Included",
  "Exclusive Community Access",
  "1-on-1 Mentor Q&A Session",
  "Templates & Cheat Sheets"
];

export function PricingCard() {
  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border shadow-sm flex flex-col md:flex-row overflow-hidden">
        <div className="p-8 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
          <h3 className="text-xl font-bold text-foreground mb-1">Complete Workshop</h3>
          <p className="text-sm text-muted-foreground mb-6">Everything you need to future-proof your career.</p>
          
          <div className="mb-6 flex items-baseline text-foreground">
            <span className="text-4xl font-extrabold tracking-tight">$149</span>
            <span className="ml-2 text-base text-muted-foreground line-through">$299</span>
          </div>
          
          <Button className="w-full font-semibold">
            Enroll Now
          </Button>
          
          <Button variant="ghost" className="w-full mt-2 text-muted-foreground">
            <Download className="w-4 h-4 mr-2" /> Download Syllabus
          </Button>
        </div>
        
        <div className="p-8 md:w-1/2 bg-muted/30">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">What's included</h4>
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm">
                <div className="flex-shrink-0 mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
