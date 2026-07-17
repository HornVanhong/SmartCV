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
    email: "Email",
    careerObjective: "Career Focus & Objective",
    defaultPitch: "Highly motivated, eager-to-learn, and results-driven entry-level professional. Ready to leverage a strong academic foundation and hands-on personal/academic projects to contribute immediately and grow within a collaborative team environment."
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
    email: "អ៊ីមែល",
    careerObjective: "គោលដៅ និងទិសដៅអាជីព",
    defaultPitch: "ជានិស្សិតបញ្ចប់ការសិក្សាដែលមានការតាំងចិត្តខ្ពស់ រៀនសូត្ររហ័ស និងផ្តោតលើលទ្ធផលការងារ។ ខ្ញុំមានការត្រៀមខ្លួនជាស្រេចក្នុងការប្រើប្រាស់មូលដ្ឋានគ្រឹះចំណេះដឹងសិក្សា និងបទពិសោធន៍គម្រោងផ្ទាល់ខ្លួន ដើម្បីចូលរួមចំណែកភ្លាមៗ និងអភិវឌ្ឍខ្លួននៅក្នុងបរិយាកាសការងារក្រុមលំដាប់ថ្នាក់ខ្ពស់។"
  }
};

export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: "en" | "km" = "en"): string {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || "";
}
