import React from "react";
import { CVData } from "@/types/cv";
import { t } from "@/lib/translations";
import { formatUrl } from "@/lib/utils";

interface CVTemplateElegantProps {
  data: CVData;
}

export const CVTemplateElegant = React.forwardRef<HTMLDivElement, CVTemplateElegantProps>(
  ({ data }, ref) => {
    const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
    const primaryColor = data.theme?.primaryColor || "#2563eb";
    const lang = data.theme?.language || "en";

    return (
      <div
        ref={ref}
        className="w-full bg-white text-slate-900 p-8 sm:p-12 font-serif selection:bg-slate-100 min-h-[inherit] flex flex-col print:p-0 print:font-serif"
        style={{ boxSizing: "border-box" }}
      >
        {/* Header - Centered Serif */}
        <header className="flex flex-col items-center text-center pb-6 mb-6 border-b-3 border-double" style={{ borderColor: primaryColor }}>
          {personalInfo.photo && (
            <div className={`overflow-hidden border border-slate-200 shadow-xs mb-4 rounded-sm ${
              data.theme?.photoAspectRatio === "4:6" ? "h-36 w-24" : "h-32 w-24"
            }`}>
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl font-extrabold tracking-wide uppercase font-serif" style={{ color: primaryColor }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-sm font-medium italic text-slate-500 mt-1 uppercase tracking-widest font-sans">
            {personalInfo.jobTitle || "Professional Title"}
          </p>
          {personalInfo.targetRole && (
            <p className="text-xs font-bold mt-1 text-slate-400 uppercase tracking-widest font-sans">
              {t("appliedFor", lang)}: {personalInfo.targetRole}
            </p>
          )}

          {/* Clean contact row with bullet separators */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-4 text-xs font-sans text-slate-600 font-semibold">
            {personalInfo.email && <span className="hover:underline">{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.portfolio && <span>• {personalInfo.portfolio.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>}
          </div>
        </header>

        {/* Dynamic section blocks */}
        <div className="space-y-6 flex-1">
          {/* Summary */}
          {professionalSummary && (
            <section className="space-y-2">
              <h2 className="text-center text-sm font-bold tracking-widest uppercase border-b pb-1 font-sans" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("professionalSummary", lang)}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed text-justify">
                {professionalSummary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-center text-sm font-bold tracking-widest uppercase border-b pb-1 font-sans" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("workExperience", lang)}
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-sm font-bold text-slate-900">
                      <span>{exp.position} <span className="font-medium font-sans text-slate-500">at</span> {exp.company}</span>
                      <span className="text-xs font-sans text-slate-500 font-semibold">{exp.startDate} – {exp.endDate || t("present", lang)}</span>
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
              <h2 className="text-center text-sm font-bold tracking-widest uppercase border-b pb-1 font-sans" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("education", lang)}
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-sm font-bold text-slate-900">
                      <span>{edu.major} <span className="font-medium font-sans text-slate-500">at</span> {edu.school}</span>
                      <span className="text-xs font-sans text-slate-500 font-semibold">{edu.startDate} – {edu.endDate || t("present", lang)}</span>
                    </div>
                    {edu.description && (
                      <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
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
              <h2 className="text-center text-sm font-bold tracking-widest uppercase border-b pb-1 font-sans" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("projects", lang)}
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-sm font-bold text-slate-900">
                      <span>{proj.name}</span>
                      {proj.link && (
                        <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs font-sans hover:underline font-semibold" style={{ color: primaryColor }}>
                          {proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")}
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && (
                      <div className="text-xs font-sans text-slate-500 font-medium">
                        <span className="text-slate-700 font-bold">Tech:</span> {proj.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills & Languages Grid */}
          <div className="grid grid-cols-2 gap-8 break-inside-avoid">
            {skills && skills.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b pb-1 font-sans" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                  {t("skills", lang)}
                </h2>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold font-sans"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold tracking-widest uppercase border-b pb-1 font-sans" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                  {t("languages", lang)}
                </h2>
                <div className="grid grid-cols-1 gap-1.5 pt-1">
                  {languages.map((langItem) => (
                    <div key={langItem.id} className="flex justify-between items-center text-xs font-sans">
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
            <section className="space-y-3 break-inside-avoid">
              <h2 className="text-center text-sm font-bold tracking-widest uppercase border-b pb-1 font-sans" style={{ color: primaryColor, borderColor: `${primaryColor}20` }}>
                {t("references", lang)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-1">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 text-xs sm:text-sm">
                    <h3 className="text-slate-900 font-bold">{ref.name}</h3>
                    {ref.relationship && ref.company ? (
                      <p className="text-slate-500 font-semibold text-[10px] leading-tight font-sans">{ref.relationship} at {ref.company}</p>
                    ) : ref.relationship || ref.company ? (
                      <p className="text-slate-500 font-semibold text-[10px] leading-tight font-sans">{ref.relationship || ref.company}</p>
                    ) : null}
                    <div className="text-slate-500 text-[10px] space-y-0.5 mt-1 font-medium font-sans">
                      {ref.email && <span className="block">{t("email", lang)}: {ref.email}</span>}
                      {ref.phone && <span className="block">{t("tel", lang)}: {ref.phone}</span>}
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

CVTemplateElegant.displayName = "CVTemplateElegant";
