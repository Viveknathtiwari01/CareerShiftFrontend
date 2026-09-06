import { useState, useEffect } from "react";
import { FileBarChart2, AlertCircle } from "lucide-react";

const QUOTES = [
  "You've taken the first step. That matters.\nYou chose clarity over simply wondering what comes next.",
  "You didn't wait for change to find you.\nYou chose to understand it first.",
  "This is what taking charge looks like.\nNot having every answer - being willing to find better ones.",
  "You've done your part. We're doing ours.\nCareerShift is working through your information and connecting the dots.",
  "Your career deserves more than guesswork.\nWe're looking beyond your job title into the work you actually do.",
  "You're not starting over. You're looking further.\nYour experience, skills and work are part of what comes next.",
  "You've moved from wondering to finding out.\nThat's already a shift.",
  "Stay curious. Something useful is taking shape.\nYour work is being turned into clearer possibilities.",
  "You don't need to predict the future.\nYou need enough clarity to make a better next move.",
  "Same you. A broader tomorrow.\nAnd you've already taken the first step towards it.",
  "You've already made one good career decision today.\nYou chose to understand before deciding what comes next.",
  "A few minutes now can bring clarity to what's ahead.\nWe're looking closely at the work that makes your career uniquely yours.",
  "Your next move doesn't have to be a big one.\nSometimes seeing your possibilities clearly is enough to change your direction.",
  "You came here with questions. Stay with us.\nWe're turning what you told us about your work into insights you can actually use.",
  "The future of your work deserves your attention.\nAnd by being here, you've already given it that.",
];

export function LoadingQuotesOverlay() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
        setIsFading(false);
      }, 600); // 600ms fade out transition for smoother easing
    }, 8000); // 8 seconds per quote

    return () => clearInterval(intervalId);
  }, []);

  const currentQuote = QUOTES[quoteIndex].split('\n');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1D3A]/60 backdrop-blur-md animate-in fade-in duration-500 p-4">
      <div className="flex flex-col items-center w-full max-w-[520px] mx-auto bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 sm:p-10 text-center relative overflow-hidden animate-in zoom-in-[0.98] duration-700 ease-out">
        
        {/* Subtle background decoration */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        {/* Animated Spinner Graphic */}
        <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
          {/* Inner pulsating circle */}
          <div className="absolute inset-2 bg-slate-50 rounded-full animate-pulse shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]"></div>
          
          {/* Document Icon in the center */}
          <div className="relative z-10 text-[#0B1D3A]">
            <FileBarChart2 size={36} strokeWidth={1.5} />
          </div>

          {/* Clean rotating ring */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#E2E8F0" strokeWidth="3" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#0B1D3A" strokeWidth="3" strokeDasharray="75 226" strokeLinecap="round" />
          </svg>
          {/* Inner accent ring */}
          <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_4s_linear_infinite_reverse] opacity-60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="150 150" strokeLinecap="round" />
          </svg>
        </div>

        <h3 className="text-[22px] font-bold text-[#0B1D3A] mb-5 tracking-tight leading-snug">
          Creating your Career<br/>Intelligence Report...
        </h3>

        {/* Warning Message */}
        <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 mb-6 mx-auto w-full max-w-[420px] text-left flex items-start gap-3 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[13px] leading-relaxed text-amber-900/90 font-medium">
            <strong className="block text-amber-950 font-semibold mb-0.5 text-[14px]">Action Required: Please Wait</strong>
            Do not refresh or close the page during 3B analysis. It may take 2-3 minutes, so please wait for a better result.
          </div>
        </div>

        {/* Quotes Section */}
        <div 
          className={`min-h-[80px] flex flex-col justify-center items-center w-full transition-all duration-700 ease-in-out ${isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          <p className="text-[#0B1D3A] font-semibold text-[16px] leading-relaxed mb-1.5 px-4">
            {currentQuote[0]}
          </p>
          {currentQuote[1] && (
            <p className="text-muted-foreground text-[14px] leading-relaxed px-6">
              {currentQuote[1]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

