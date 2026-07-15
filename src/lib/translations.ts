export const translations = {
  en: {
    professionalSummary: "Professional Summary",
    workExperience: "Work Experience",
    education: "Education",
    projects: "Projects & Courses",
    skills: "Skills",
    languages: "Languages",
    references: "References",
    appliedFor: "Applied for",
    present: "Present",
    contact: "Contact",
    socials: "Socials",
    profile: "Profile",
    tel: "Tel",
    email: "Email"
  },
  km: {
    professionalSummary: "ប្រវត្តិរូបសង្ខេប",
    workExperience: "បទពិសោធន៍ការងារ",
    education: "ការសិក្សា",
    projects: "គម្រោង និង វគ្គសិក្សា",
    skills: "ជំនាញ",
    languages: "ភាសា",
    references: "ឯកសារយោង",
    appliedFor: "ដាក់ពាក្យសម្រាប់តំណែង",
    present: "បច្ចុប្បន្ន",
    contact: "ទំនាក់ទំនង",
    socials: "បណ្តាញសង្គម",
    profile: "ប្រវត្តិរូប",
    tel: "ទូរស័ព្ទ",
    email: "អ៊ីមែល"
  }
};

export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: "en" | "km" = "en"): string {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || "";
}
