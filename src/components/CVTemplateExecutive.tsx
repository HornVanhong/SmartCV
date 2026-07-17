import React from "react";
import { CVData } from "@/types/cv";
import { t } from "@/lib/translations";
import { Mail, Phone, MapPin, Calendar, Flag } from "lucide-react";
import { formatUrl } from "@/lib/utils";

interface CVTemplateExecutiveProps {
  data: CVData;
}

export const CVTemplateExecutive = React.forwardRef<HTMLDivElement, CVTemplateExecutiveProps>(
  ({ data }, ref) => {
    const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
    const primaryColor = data.theme?.primaryColor || "#2563eb";
    const lang = data.theme?.language || "en";

    return (
      <div
        ref={ref}
        className="w-full text-slate-800 font-sans selection:bg-slate-100 min-h-[inherit] flex flex-col sm:flex-row print:flex-row print:p-0"
        style={{ boxSizing: "border-box" }}
      >
        {/* Left Sidebar (Dark background panel) */}
        <aside className="w-full sm:w-[270px] print:w-[250px] text-white p-6 sm:p-8 print:p-8 flex flex-col gap-6 shrink-0" style={{ backgroundColor: primaryColor }}>
          {personalInfo.photo && (
            <div className={`overflow-hidden border-2 border-white/20 shadow-lg rounded-xl mx-auto shrink-0 ${
              data.theme?.photoAspectRatio === "4:6" ? "h-36 w-24" : "h-32 w-24"
            }`}>
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="text-center sm:text-left print:text-left space-y-1">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide leading-tight">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {personalInfo.jobTitle || "Professional Title"}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3.5 text-xs text-white/95">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white/50 border-b border-white/10 pb-1">
              {t("contact", lang)}
            </h3>
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-white/60 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-white/60 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-white/60 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.dob && (
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-white/60 shrink-0" />
                <span>{lang === "km" ? "ថ្ងៃកំណើត" : "DOB"}: {personalInfo.dob}</span>
              </div>
            )}
            {personalInfo.nationality && (
              <div className="flex items-center gap-2">
                <Flag className="h-3.5 w-3.5 text-white/60 shrink-0" />
                <span>{lang === "km" ? "សញ្ជាតិ" : "Nat."}: {personalInfo.nationality}</span>
              </div>
            )}
          </div>

          {/* Skills (sidebar list) */}
          {skills && skills.length > 0 && (
            <div className="space-y-3 text-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-white/50 border-b border-white/10 pb-1">
                {t("skills", lang)}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span key={index} className="px-2 py-0.5 bg-white/10 border border-white/15 rounded text-[10px] font-semibold text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages (sidebar list) */}
          {languages && languages.length > 0 && (
            <div className="space-y-3 text-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-white/50 border-b border-white/10 pb-1">
                {t("languages", lang)}
              </h3>
              <div className="space-y-2">
                {languages.map((langItem) => (
                  <div key={langItem.id} className="flex justify-between items-center text-white/90">
                    <span className="font-semibold">{langItem.name}</span>
                    <span className="text-[10px] text-white/60 italic">{langItem.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Body (White background) */}
        <main className="flex-1 p-6 sm:p-8 print:p-8 flex flex-col gap-6">
          {personalInfo.targetRole && (
            <div className="px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50/50 self-start text-xs font-bold text-slate-500 uppercase tracking-widest">
              {t("appliedFor", lang)}: <span style={{ color: primaryColor }}>{personalInfo.targetRole}</span>
            </div>
          )}

          {/* Profile */}
          {professionalSummary && (
            <section className="space-y-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1" style={{ borderColor: `${primaryColor}20`, color: primaryColor }}>
                {t("profile", lang)}
              </h2>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                {professionalSummary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1" style={{ borderColor: `${primaryColor}20`, color: primaryColor }}>
                {t("workExperience", lang)}
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-start text-xs sm:text-sm">
                      <h4 className="font-bold text-slate-900">
                        {exp.position} <span className="font-medium text-slate-500">at</span> {exp.company}
                      </h4>
                      <span className="text-xs text-slate-500 font-semibold shrink-0 ml-4">
                        {exp.startDate} – {exp.endDate || t("present", lang)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1" style={{ borderColor: `${primaryColor}20`, color: primaryColor }}>
                {t("education", lang)}
              </h2>
              <div className="space-y-3.5">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-start text-xs sm:text-sm">
                      <h4 className="font-bold text-slate-900">{edu.major}</h4>
                      <span className="text-xs text-slate-500 font-semibold shrink-0 ml-4">
                        {edu.startDate} – {edu.endDate || t("present", lang)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">{edu.school}</div>
                    {edu.description && (
                      <p className="text-xs text-slate-650 leading-relaxed text-justify mt-0.5">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1" style={{ borderColor: `${primaryColor}20`, color: primaryColor }}>
                {t("projects", lang)}
              </h2>
              <div className="space-y-3.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-xs sm:text-sm">
                      <h4 className="font-bold text-slate-900">{proj.name}</h4>
                      {proj.link && (
                        <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:underline shrink-0 ml-4" style={{ color: primaryColor }}>
                          {proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")}
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references && references.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b pb-1" style={{ borderColor: `${primaryColor}20`, color: primaryColor }}>
                {t("references", lang)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 break-inside-avoid text-xs sm:text-sm">
                    <h3 className="text-slate-900 font-bold">{ref.name}</h3>
                    {ref.relationship && ref.company ? (
                      <p className="text-slate-500 font-semibold text-[10px] leading-tight">{ref.relationship} at {ref.company}</p>
                    ) : ref.relationship || ref.company ? (
                      <p className="text-slate-500 font-semibold text-[10px] leading-tight">{ref.relationship || ref.company}</p>
                    ) : null}
                    <div className="text-slate-500 text-[10px] space-y-0.5 mt-1 font-medium">
                      {ref.email && <span className="block">{t("email", lang)}: {ref.email}</span>}
                      {ref.phone && <span className="block">{t("tel", lang)}: {ref.phone}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }
);

CVTemplateExecutive.displayName = "CVTemplateExecutive";
