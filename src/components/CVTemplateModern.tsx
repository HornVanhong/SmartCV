import React from "react";
import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { t } from "@/lib/translations";

interface CVTemplateModernProps {
  data: CVData;
}

export const CVTemplateModern = React.forwardRef<HTMLDivElement, CVTemplateModernProps>(
  ({ data }, ref) => {
    const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
    const primaryColor = data.theme?.primaryColor || "#2563eb";
    const lang = data.theme?.language || "en";

    return (
      <div
        ref={ref}
        className="w-full bg-white text-slate-800 p-8 sm:p-12 font-sans selection:bg-slate-100 print:p-16"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <header className="border-b-2 border-slate-900 pb-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {personalInfo.photo && (
              <div className={`shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-xs ${
                data.theme?.photoAspectRatio === "4:6"
                  ? "h-36 w-24 print:h-30 print:w-20"
                  : "h-32 w-24 print:h-28 print:w-20"
              }`}>
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                  {personalInfo.fullName || "Your Name"}
                </h1>
                <p className="text-lg font-medium text-slate-600 mt-1">
                  {personalInfo.jobTitle || "Professional Title"}
                </p>
                {personalInfo.targetRole && (
                  <p className="text-xs font-bold mt-1 uppercase tracking-wider" style={{ color: primaryColor }}>
                    {t("appliedFor", lang)}: {personalInfo.targetRole}
                  </p>
                )}
              </div>
              
              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1.5 text-xs text-slate-650 w-full md:w-auto md:text-right">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 justify-start md:justify-end hover:text-slate-900 transition-colors">
                    <span>{personalInfo.email}</span>
                    <Mail className="h-3.5 w-3.5 text-slate-400 print:hidden" />
                  </a>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5 justify-start md:justify-end">
                    <span>{personalInfo.phone}</span>
                    <Phone className="h-3.5 w-3.5 text-slate-400 print:hidden" />
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1.5 justify-start md:justify-end">
                    <span>{personalInfo.location}</span>
                    <MapPin className="h-3.5 w-3.5 text-slate-400 print:hidden" />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-x-3 gap-y-1 justify-start md:justify-end col-span-full md:col-span-1 mt-1 text-[11px] font-semibold text-slate-500">
                  {personalInfo.github && (
                    <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                      <Github className="h-3 w-3 print:hidden" />
                      <span>{personalInfo.github.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>
                    </a>
                  )}
                  {personalInfo.linkedin && (
                    <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                      <Linkedin className="h-3 w-3 print:hidden" />
                      <span>{personalInfo.linkedin.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>
                    </a>
                  )}
                  {personalInfo.portfolio && (
                    <a href={`https://${personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                      <Globe className="h-3 w-3 print:hidden" />
                      <span>{personalInfo.portfolio.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content sections */}
        <div className="space-y-6 print:space-y-4">
          {/* Professional Summary */}
          {professionalSummary && (
            <section className="space-y-2 print:space-y-1">
              <h2 className="text-sm font-bold tracking-wider uppercase border-b pb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("professionalSummary", lang)}
              </h2>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                {professionalSummary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-3 print:space-y-2">
              <h2 className="text-sm font-bold tracking-wider uppercase border-b pb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("workExperience", lang)}
              </h2>
              <div className="space-y-4 print:space-y-2">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1.5 break-inside-avoid">
                    <div className="flex justify-between items-start text-xs sm:text-sm font-semibold">
                      <h3 className="text-slate-900 font-bold">
                        {exp.position} <span className="text-slate-400 font-normal">at</span> {exp.company}
                      </h3>
                      <span className="text-slate-500 font-medium whitespace-nowrap text-xs">
                        {exp.startDate} – {exp.endDate || t("present", lang)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-650 leading-relaxed whitespace-pre-line text-justify">
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
            <section className="space-y-3 print:space-y-2">
              <h2 className="text-sm font-bold tracking-wider uppercase border-b pb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("education", lang)}
              </h2>
              <div className="space-y-3 print:space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-start text-xs sm:text-sm font-semibold">
                      <h3 className="text-slate-900 font-bold">
                        {edu.major}
                      </h3>
                      <span className="text-slate-500 font-medium whitespace-nowrap text-xs">
                        {edu.startDate} – {edu.endDate || t("present", lang)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 font-medium">
                      {edu.school}
                    </div>
                    {edu.description && (
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
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
            <section className="space-y-3 print:space-y-2">
              <h2 className="text-sm font-bold tracking-wider uppercase border-b pb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("projects", lang)}
              </h2>
              <div className="space-y-3 print:space-y-1.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-start text-xs sm:text-sm font-semibold">
                      <h3 className="text-slate-900 font-bold flex items-center gap-1.5">
                        {proj.name}
                        {proj.link && (
                          <span className="text-slate-400 font-normal text-xs print:hidden">
                            ({proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")})
                          </span>
                        )}
                      </h3>
                      {proj.link && (
                        <a
                          href={`https://${proj.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs hover:underline font-medium print:block hidden"
                          style={{ color: primaryColor }}
                        >
                          {proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")}
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && (
                      <div className="text-xs text-slate-500 font-medium mt-1">
                        <span className="text-slate-700 font-semibold">Tech:</span> {proj.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Grid Layout for Skills & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4 break-inside-avoid">
            {/* Skills */}
            {skills && skills.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold tracking-wider uppercase border-b pb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                  {t("skills", lang)}
                </h2>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-semibold print:bg-transparent print:border print:border-slate-300 print:text-slate-900 print:px-2 print:py-0"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold tracking-wider uppercase border-b pb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                  {t("languages", lang)}
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                  {languages.map((langItem) => (
                    <div key={langItem.id} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800">{langItem.name}</span>
                      <span className="text-slate-500 font-medium italic">{langItem.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* References */}
          {references && references.length > 0 && (
            <section className="space-y-2 pt-2 break-inside-avoid">
              <h2 className="text-sm font-bold tracking-wider uppercase border-b pb-1.5" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("references", lang)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-1">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 break-inside-avoid text-xs sm:text-sm">
                    <h3 className="text-slate-900 font-bold">{ref.name}</h3>
                    {ref.relationship && ref.company ? (
                      <p className="text-slate-600 font-medium text-xs">{ref.relationship} at {ref.company}</p>
                    ) : ref.relationship || ref.company ? (
                      <p className="text-slate-600 font-medium text-xs">{ref.relationship || ref.company}</p>
                    ) : null}
                    <div className="text-slate-500 text-xs flex flex-wrap gap-x-2 mt-0.5 font-medium">
                      {ref.email && (
                        <a href={`mailto:${ref.email}`} className="hover:text-slate-900 transition-colors">
                          {t("email", lang)}: {ref.email}
                        </a>
                      )}
                      {ref.email && ref.phone && <span className="text-slate-300">•</span>}
                      {ref.phone && <span>{t("tel", lang)}: {ref.phone}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
);

CVTemplateModern.displayName = "CVTemplateModern";
