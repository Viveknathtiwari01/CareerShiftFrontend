import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  AIReadinessEmpty,
  AIReadinessView,
} from "@/components/readiness/AIReadinessView";
import type { AIReadinessResult } from "@/api/readiness";

export function AIReadinessTab({ readiness }: { readiness: AIReadinessResult | null }) {
  if (!readiness) {
    return (
      <AIReadinessEmpty
        message="Complete 3B analysis and generate your report to see AI readiness here."
        action={
          <Link
            to="/3b-analysis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            Complete 3B analysis <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
    );
  }

  return <AIReadinessView data={readiness} showFooterLink={false} />;
}
