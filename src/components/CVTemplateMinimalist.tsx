import React from "react";
import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { t } from "@/lib/translations";

interface CVTemplateMinimalistProps {
  data: CVData;
}

export const CVTemplateMinimalist = React.forwardRef<HTMLDivElement, CVTemplateMinimalistProps>(
  ({ data }, ref) => {
    const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
    const primaryColor = data.theme?.primaryColor || "#2563eb";
    const lang = data.theme?.language || "en";

    return (
      <div
        ref={ref}
        className="w-full bg-white text-slate-850 p-8 sm:p-12 font-sans selection:bg-slate-100 print:p-16"
        style={{ boxSizing: "border-box" }}
      >
        {/* Header - Centered */}
        <header className="flex flex-col items-center text-center border-b pb-6 mb-6" style={{ borderColor: primaryColor }}>
          {personalInfo.photo && (
            <div className={`overflow-hidden border border-slate-200 shadow-xs mb-4 ${
              data.theme?.photoAspectRatio === "4:6"
                ? "h-36 w-24 rounded-xl"
                : "h-32 w-24 rounded-xl"
            }`}>
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-md font-semibold tracking-wide mt-1 uppercase" style={{ color: primaryColor }}>
            {personalInfo.jobTitle || "Professional Title"}
          </p>
          {personalInfo.targetRole && (
            <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
              {t("appliedFor", lang)}: {personalInfo.targetRole}
            </p>
          )}

          {/* Contact details inline */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-600 w-full mt-4">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                <Mail className="h-3.5 w-3.5 text-slate-400 print:hidden" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-slate-400 print:hidden" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400 print:hidden" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          {/* Social Links inline */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-500 mt-2">
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
        </header>

        {/* Content sections */}
        <div className="space-y-6 print:space-y-4">
          
          {/* Professional Summary */}
          {professionalSummary && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}30` }}>
                {t("professionalSummary", lang)}
              </h2>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                {professionalSummary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}30` }}>
                {t("workExperience", lang)}
              </h2>
              <div className="space-y-4 print:space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-xs sm:text-sm">
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
            <section className="space-y-3">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}30` }}>
                {t("education", lang)}
              </h2>
              <div className="space-y-3 print:space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-xs sm:text-sm">
                      <h3 className="text-slate-900 font-bold">{edu.major}</h3>
                      <span className="text-slate-500 font-medium whitespace-nowrap text-xs">
                        {edu.startDate} – {edu.endDate || t("present", lang)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-semibold">{edu.school}</div>
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
            <section className="space-y-3">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}30` }}>
                {t("projects", lang)}
              </h2>
              <div className="space-y-3 print:space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-xs sm:text-sm">
                      <h3 className="text-slate-900 font-bold flex items-center gap-1.5">
                        {proj.name}
                        {proj.link && (
                          <span className="text-slate-400 font-normal text-xs print:hidden">
                            ({proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")})
                          </span>
                        )}
                      </h3>
                      {proj.link && (
                        <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline font-medium print:block hidden" style={{ color: primaryColor }}>
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
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        <span className="text-slate-700 font-semibold">Tech:</span> {proj.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 break-inside-avoid">
            {skills && skills.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold tracking-wider uppercase border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}30` }}>
                  {t("skills", lang)}
                </h2>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded text-xs font-medium border"
                      style={{ borderColor: `${primaryColor}25`, backgroundColor: `${primaryColor}08`, color: primaryColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold tracking-wider uppercase border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}30` }}>
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
            <section className="space-y-3 pt-2">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b pb-1" style={{ color: primaryColor, borderColor: `${primaryColor}30` }}>
                {t("references", lang)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-1">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 break-inside-avoid text-xs sm:text-sm">
                    <h3 className="text-slate-900 font-bold">{ref.name}</h3>
                    {ref.relationship && ref.company ? (
                      <p className="text-slate-650 font-medium text-xs">{ref.relationship} at {ref.company}</p>
                    ) : ref.relationship || ref.company ? (
                      <p className="text-slate-650 font-medium text-xs">{ref.relationship || ref.company}</p>
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

CVTemplateMinimalist.displayName = "CVTemplateMinimalist";
