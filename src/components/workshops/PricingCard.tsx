import { motion } from "framer-motion";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingCard() {
  const features = [
    "Lifetime Access to all 6 modules",
    "Verifiable Certificate of Completion",
    "All future updates included",
    "Access to exclusive Community",
    "Downloadable Prompts & Workflows",
    "Priority Support"
  ];

  return (
    <div className="py-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto surface-card rounded-[2.5rem] p-8 md:p-12 shadow-elevated relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        
        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-white mb-2">Master AI for Everyday Professionals</h2>
            <p className="text-white/70 mb-6">Invest in your career's future today.</p>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white">$149</span>
              <span className="text-xl text-white/50 line-through decoration-white/50">$299</span>
              <span className="text-sm font-medium text-teal-400 bg-teal-400/10 px-2 py-1 rounded ml-2">Save 50%</span>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full h-14 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                Enroll Now
              </Button>
              <Button variant="outline" size="lg" className="w-full h-14 text-base font-semibold rounded-xl border-white/20 text-white hover:text-primary-foreground hover:bg-primary">
                <Download className="w-4 h-4 mr-2" /> Download Syllabus
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-background/5 rounded-2xl -z-10 transform translate-x-4 translate-y-4" />
            <div className="bg-background/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">What's Included:</h3>
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-teal-500/20 p-1 rounded-full mt-0.5">
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
