export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  photo?: string;
  targetRole?: string;
  dob?: string;
  nationality?: string;
}

export interface Education {
  id: string;
  school: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Reference {
  id: string;
  name: string;
  relationship: string;
  company: string;
  email: string;
  phone: string;
}

export interface CVTheme {
  templateId: "modern" | "minimalist" | "creative" | "professional";
  primaryColor: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  education: Education[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  languages: Language[];
  references?: Reference[];
  theme?: CVTheme;
}

