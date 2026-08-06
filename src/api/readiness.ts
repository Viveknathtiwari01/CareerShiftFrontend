import { fetchApi } from "@/lib/api";

export interface ReadinessFactor {
  key: string;
  label: string;
  score: number;
  weight: number;
  contribution: number;
  summary: string;
}

export interface ReadinessDimension {
  subject: string;
  score: number;
}

export interface ReadinessStrength {
  title: string;
  detail?: string | null;
}

export interface ReadinessImprovement {
  title: string;
  difficulty: string;
  impact: string;
}

export interface ReadinessToolRecommendation {
  name: string;
  fit: string;
  use_case: string;
}

export interface AIReadinessResult {
  overall_score: number;
  tier: string;
  tier_label: string;
  summary: string;
  factors: ReadinessFactor[];
  dimensions: ReadinessDimension[];
  strengths: ReadinessStrength[];
  improvements: ReadinessImprovement[];
  insight: string;
  career_risk: string;
  career_risk_detail: string;
  career_opportunity: string;
  career_opportunity_detail: string;
  recommended_tools: ReadinessToolRecommendation[];
  quick_wins: string[];
  portfolio_mix: Record<string, number>;
}

export async function getAIReadiness(assessmentId: string): Promise<AIReadinessResult> {
  const response = await fetchApi(`/assessment/${assessmentId}/readiness`);
  return response.data;
}
