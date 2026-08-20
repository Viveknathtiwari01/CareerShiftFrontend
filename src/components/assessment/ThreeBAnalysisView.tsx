import Step3BAnalysis from "@/components/assessment/Step3BAnalysis";

type Props = {
  assessmentId: string | null;
  /** @deprecated use Step3BAnalysis directly */
  impressMode?: boolean;
  showFooterLinks?: boolean;
  variant?: "page" | "embedded";
};

/** Thin wrapper prefer Step3BAnalysis for new code. */
export default function ThreeBAnalysisView({
  assessmentId,
  showFooterLinks = false,
  impressMode,
}: Props) {
  return (
    <Step3BAnalysis
      assessmentId={assessmentId}
      showFooterLinks={showFooterLinks}
      embedded={!!impressMode}
    />
  );
}
