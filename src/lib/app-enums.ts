/**
 * Application enums fixed UX vocabulary shared with backend string fields.
 * These are NOT master/business data (job titles, industries, taxonomy).
 * Keep in sync with profile/assessment schema allowed values.
 */

export const EXPERIENCE_LEVELS = [
  "0-1 Years",
  "1-3 Years",
  "3-5 Years",
  "5-8 Years",
  "8-12 Years",
  "12+ Years",
] as const;

export const DAILY_ACTIVITIES = [
  "Software Development",
  "Team Management",
  "Client Communication",
  "Technical Architecture",
  "Code Review",
  "AI Development",
  "Data Analysis",
  "Product Design",
  "Project Management",
  "Business Analysis",
  "Testing / Quality Assurance",
  "Deployment & DevOps",
  "Technical Support",
  "Sales & Business Development",
  "Marketing & Branding",
  "HR & Recruitment",
  "Finance & Budgeting",
  "Operations Management",
  "Research & Innovation",
  "Customer Success",
] as const;

export const AI_FREQUENCY = [
  "Never",
  "Rarely (Once a Month)",
  "Occasionally (2–3 Times a Month)",
  "Weekly",
  "Several Times a Week",
  "Daily",
  "Multiple Times a Day",
] as const;

export const AI_TOOLS = [
  "ChatGPT",
  "Claude",
  "Google Gemini",
  "Microsoft Copilot",
  "GitHub Copilot",
  "Perplexity AI",
  "Cursor AI",
  "Windsurf",
  "Lovable",
  "Bolt.new",
  "Midjourney",
  "DALL·E",
  "Canva AI",
  "Notion AI",
  "Grammarly AI",
  "ElevenLabs",
  "Runway ML",
  "Adobe Firefly",
  "Hugging Face",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
export type AiFrequency = (typeof AI_FREQUENCY)[number];
