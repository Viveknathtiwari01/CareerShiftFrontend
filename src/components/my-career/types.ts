export interface WizardData {
  // Step 1
  jobTitle: string;
  industry: string;
  businessFunction: string;
  domain: string;
  specialization: string;

  // Step 2
  experience: string;
  location: string;
  salary: string;
  preferredLocation: string[];

  // Step 3
  technicalSkills: string[];
  professionalSkills: string[];
  softSkills: string[];
  behaviouralSkills: string[];
  aiSkills: string[];

  // Step 4
  dailyActivities: string[];

  // Step 5
  aiFrequency: string;
  aiTools: string[];
  aiComfortLevel: number;
}
