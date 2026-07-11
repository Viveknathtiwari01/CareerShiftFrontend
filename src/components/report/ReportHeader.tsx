import { 
  Download, 
  Share2, 
  GitCompare, 
  MoreVertical, 
  Printer, 
  FileJson, 
  Save 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ReportHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border/40">
      <div>
        <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 mb-3">
          Career Intelligence Report
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed">
          Your personalized AI-powered career intelligence report based on your professional profile, competencies, work patterns, and AI readiness.
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
            <span className="text-muted-foreground">Date:</span> Oct 24, 2026
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
            <span className="text-muted-foreground">Version:</span> 2.4.1
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <span className="text-emerald-600/70">Score:</span> 76/100
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <span className="text-blue-600/70">Reading Time:</span> ~12 min
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
          <Download className="h-4 w-4" /> Download Report
        </button>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
          <Share2 className="h-4 w-4" /> Share
        </button>
        <button className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
          <GitCompare className="h-4 w-4" /> Compare
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-xl border border-border bg-background h-10 w-10 hover:bg-muted transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2 cursor-pointer font-medium">
              <Printer className="h-4 w-4 text-muted-foreground" /> Print Report
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer font-medium">
              <FileJson className="h-4 w-4 text-muted-foreground" /> Export JSON
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer font-medium">
              <Save className="h-4 w-4 text-muted-foreground" /> Save as Draft
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
