import { useState, useEffect } from "react";
import { FileBarChart2 } from "lucide-react";

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
      }, 500); // 500ms fade out transition
    }, 10000); // 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const currentQuote = QUOTES[quoteIndex].split('\n');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1D3A]/40 backdrop-blur-sm animate-in fade-in duration-300 p-4">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto bg-white rounded-[2rem] shadow-2xl p-10 sm:p-14 text-center relative overflow-hidden animate-in zoom-in-95 duration-500 ease-out">
        
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        {/* Animated Spinner Graphic */}
        <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
          {/* Inner pulsating circle */}
          <div className="absolute inset-4 bg-slate-50/80 rounded-full animate-pulse shadow-inner"></div>
          
          {/* Document Icon in the center */}
          <div className="relative z-10 text-[#0B1D3A]">
            <FileBarChart2 size={56} strokeWidth={1.5} />
          </div>

          {/* Outer rotating segmented ring */}
          <div className="absolute inset-0 border-[6px] border-transparent rounded-full border-t-[#3b82f6] border-r-[#fcd34d] border-b-[#2dd4bf] border-l-[#e2e8f0] animate-[spin_3s_linear_infinite] opacity-90" style={{ borderStyle: 'solid' }}></div>
          <div className="absolute inset-[-6px] border-4 border-transparent rounded-full border-t-transparent border-r-transparent border-b-[#3b82f6]/40 border-l-[#fcd34d]/40 animate-[spin_4s_linear_infinite_reverse] opacity-70" style={{ borderStyle: 'dotted' }}></div>
        </div>

        <h3 className="text-[22px] font-bold text-[#0B1D3A] mb-8 tracking-tight leading-snug">
          Creating your Career<br/>Intelligence Report...
        </h3>

        {/* Loading dots */}
        <div className="flex gap-2.5 mb-10 justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#5c6ac4] animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#00a896] animate-bounce shadow-sm" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#f2c94c] animate-bounce shadow-sm" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Quotes Section */}
        <div 
          className={`min-h-[100px] flex flex-col justify-center items-center w-full transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          <p className="text-[#0B1D3A] font-semibold text-lg leading-relaxed mb-2 px-2">
            {currentQuote[0]}
          </p>
          {currentQuote[1] && (
            <p className="text-muted-foreground text-[15px] leading-relaxed px-4">
              {currentQuote[1]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

