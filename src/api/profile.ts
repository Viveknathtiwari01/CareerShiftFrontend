import { fetchApi } from "@/lib/api";
import { WizardData } from "@/components/my-career/types";

function mapToBackend(data: Partial<WizardData>) {
  const mapped: any = {};
  if (data.jobTitle !== undefined) mapped.job_title = data.jobTitle;
  if (data.industry !== undefined) mapped.industry = data.industry;
  if (data.businessFunction !== undefined) mapped.business_function = data.businessFunction;
  if (data.domain !== undefined) mapped.domain = data.domain;
  if (data.specialization !== undefined) mapped.specialization = data.specialization;
  if (data.experience !== undefined) mapped.experience_years = parseInt(data.experience) || 0;
  if (data.salary !== undefined) mapped.salary = data.salary;
  if (data.technicalSkills !== undefined) mapped.technical_skills = data.technicalSkills;
  if (data.professionalSkills !== undefined) mapped.professional_skills = data.professionalSkills;
  if (data.softSkills !== undefined) mapped.soft_skills = data.softSkills;
  if (data.behaviouralSkills !== undefined) mapped.behavioural_skills = data.behaviouralSkills;
  if (data.digitalSkills !== undefined) mapped.digital_skills = data.digitalSkills;
  if (data.aiFrequency !== undefined) mapped.ai_frequency = data.aiFrequency;
  if (data.aiTools !== undefined) mapped.ai_tools = data.aiTools;
  if (data.aiComfortLevel !== undefined) mapped.ai_comfort_level = data.aiComfortLevel;
  return mapped;
}

function mapToFrontend(data: any): WizardData {
  return {
    jobTitle: data.job_title || "",
    industry: data.industry || "",
    businessFunction: data.business_function || "",
    domain: data.domain || "",
    specialization: data.specialization || "",
    experience: data.experience_years ? data.experience_years.toString() : "",
    salary: data.salary || "",
    technicalSkills: data.technical_skills || [],
    professionalSkills: data.professional_skills || [],
    softSkills: data.soft_skills || [],
    behaviouralSkills: data.behavioural_skills || [],
    digitalSkills: data.digital_skills || [],
    aiFrequency: data.ai_frequency || "",
    aiTools: data.ai_tools || [],
    aiComfortLevel: data.ai_comfort_level || 5,
  };
}

export async function getProfile(): Promise<WizardData | null> {
  try {
    const response = await fetchApi("/profile/me");
    return mapToFrontend(response.data);
  } catch (error: any) {
    if (error.message === "Profile not found") {
      return null;
    }
    throw error;
  }
}

export async function getProfileStatus(): Promise<{ is_completed: boolean }> {
  try {
    const response = await fetchApi("/profile/me/status");
    return response.data;
  } catch (error) {
    return { is_completed: false };
  }
}

export async function createProfile(data: WizardData): Promise<WizardData> {
  const response = await fetchApi("/profile/me", {
    method: "POST",
    body: JSON.stringify(mapToBackend(data)),
  });
  return mapToFrontend(response.data);
}

export async function updateProfile(data: Partial<WizardData>): Promise<WizardData> {
  const response = await fetchApi("/profile/me", {
    method: "PATCH",
    body: JSON.stringify(mapToBackend(data)),
  });
  return mapToFrontend(response.data);
}

export async function generateSkills(data: Partial<WizardData>): Promise<{
  technicalSkills: string[];
  professionalSkills: string[];
  softSkills: string[];
  behaviouralSkills: string[];
  digitalSkills: string[];
}> {
  const payload = {
    job_title: data.jobTitle || "",
    industry: data.industry || "",
    business_function: data.businessFunction || "",
    functional_domain: data.domain || "",
    specialization: data.specialization || "",
    experience: data.experience || ""
  };
  
  const response = await fetchApi("/profile/generate-skills", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response.data;
}
