import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";

type Props = {
  assessmentId: string | null;
  /** @deprecated use showFooterLinks on Step3BAnalysis directly */
  impressMode?: boolean;
  showFooterLinks?: boolean;
  variant?: "page" | "embedded";
};

/** @deprecated Use Step3BAnalysis directly */
export default function ThreeBAnalysisView({
  assessmentId,
  showFooterLinks = false,
  variant,
  impressMode,
}: Props) {
  return (
    <Step3BAnalysis
      assessmentId={assessmentId}
      showFooterLinks={showFooterLinks || variant === "page" || impressMode}
      embedded={variant === "page" || impressMode}
    />
  );
}
