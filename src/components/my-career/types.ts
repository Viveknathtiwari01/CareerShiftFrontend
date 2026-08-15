export interface WizardData {
  // Step 1
  jobTitle: string;
  job_title_id?: string;
  industry: string;
  sector_id?: string;
  businessFunction: string;
  department_id?: string;
  domain: string;
  functional_domain_id?: string;
  specialization: string;
  specialization_id?: string;

  // Step 2
  experience: string;
  salary: string;
  salary_currency?: string;

  // Step 3
  technicalSkills: string[];
  professionalSkills: string[];
  softSkills: string[];
  behaviouralSkills: string[];
  digitalSkills: string[];

  // Step 4

  // Step 5
  aiFrequency: string;
  aiTools: string[];
  suggestedAiTools?: string[];
  aiComfortLevel: number;
}
