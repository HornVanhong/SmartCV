import React from "react";
import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { t } from "@/lib/translations";
import { formatUrl, getLinkLabel, isLightColor, renderMarkdownHTML } from "@/lib/utils";

interface CVTemplateCreativeProps {
  data: CVData;
}

export const CVTemplateCreative = React.forwardRef<HTMLDivElement, CVTemplateCreativeProps>(
  ({ data }, ref) => {
    const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
    const primaryColor = data.theme?.primaryColor || "#2563eb";
    const lang = data.theme?.language || "en";
    
    const isLight = !data.theme?.sidebarBackgroundColor || isLightColor(data.theme.sidebarBackgroundColor);
    const textNameClass = isLight ? "text-slate-900" : "text-white";
    const textTitleClass = isLight ? "text-slate-500" : "text-slate-300";
    const textHeaderClass = isLight ? "text-slate-400" : "text-white/60";
    const textBodyClass = isLight ? "text-slate-650" : "text-slate-200/90";
    const textMutedClass = isLight ? "text-slate-500" : "text-slate-300";
    const borderClass = isLight ? "border-slate-200/60" : "border-white/15";
    const sidebarBg = data.theme?.sidebarBackgroundColor || "rgba(241, 245, 249, 0.7)";

    return (
      <div
        ref={ref}
        className="w-full text-slate-800 font-sans selection:bg-slate-100 min-h-[inherit] flex flex-col sm:flex-row print:flex-row"
        style={{ boxSizing: "border-box", backgroundColor: data.theme?.backgroundColor || "#ffffff" }}
      >
        {/* Left Sidebar */}
        <aside 
          className={`w-full sm:w-[280px] print:w-[260px] border-r p-6 sm:p-8 print:p-8 flex flex-col gap-6 shrink-0`}
          style={{ boxSizing: "border-box", backgroundColor: sidebarBg, borderColor: isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.1)" }}
        >
          
          {/* Profile Photo */}
          {personalInfo.photo && (
            <div className={`rounded-2xl overflow-hidden border shadow-xs mx-auto shrink-0 ${
              data.theme?.photoAspectRatio === "4:6"
                ? "h-36 w-24"
                : "h-32 w-24"
            }`}
            style={{ borderColor: isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.15)" }}
            >
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Name & Title */}
          <div className="text-center sm:text-left print:text-left space-y-1">
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${textNameClass}`}>
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
              {personalInfo.jobTitle || "Professional Title"}
            </p>
            {personalInfo.targetRole && (
              <p className={`text-[10px] font-bold uppercase tracking-widest pt-0.5 ${textMutedClass}`}>
                {t("appliedFor", lang)}: {personalInfo.targetRole}
              </p>
            )}
          </div>
 
          {/* Contact Details */}
          <div className={`space-y-3 pt-2 border-t ${borderClass}`}>
            <h3 className={`text-[10px] font-extrabold uppercase tracking-widest ${textHeaderClass}`}>{t("contact", lang)}</h3>
            <div className={`space-y-2 text-xs ${textBodyClass}`}>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className={`flex items-center gap-2 transition-colors ${isLight ? "hover:text-slate-950" : "hover:text-white"}`}>
                  <Mail className={`h-3.5 w-3.5 shrink-0 ${isLight ? "text-slate-400" : "text-slate-350"}`} />
                  <span className="truncate">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className={`h-3.5 w-3.5 shrink-0 ${isLight ? "text-slate-400" : "text-slate-350"}`} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className={`h-3.5 w-3.5 shrink-0 ${isLight ? "text-slate-400" : "text-slate-350"}`} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
 
          {/* Social Links */}
          <div className={`space-y-3 pt-2 border-t ${borderClass}`}>
            <h3 className={`text-[10px] font-extrabold uppercase tracking-widest ${textHeaderClass}`}>Socials</h3>
            <div className={`space-y-2 text-xs ${textBodyClass}`}>
              {personalInfo.github && (
                <a href={formatUrl(personalInfo.github)} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 transition-colors ${isLight ? "hover:text-slate-950" : "hover:text-white"}`}>
                  <Github className={`h-3.5 w-3.5 shrink-0 ${isLight ? "text-slate-400" : "text-slate-350"}`} />
                  <span className="truncate">{getLinkLabel(personalInfo.github)}</span>
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 transition-colors ${isLight ? "hover:text-slate-950" : "hover:text-white"}`}>
                  <Linkedin className={`h-3.5 w-3.5 shrink-0 ${isLight ? "text-slate-400" : "text-slate-350"}`} />
                  <span className="truncate">{getLinkLabel(personalInfo.linkedin)}</span>
                </a>
              )}
              {personalInfo.portfolio && (
                <a href={formatUrl(personalInfo.portfolio)} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 transition-colors ${isLight ? "hover:text-slate-950" : "hover:text-white"}`}>
                  <Globe className={`h-3.5 w-3.5 shrink-0 ${isLight ? "text-slate-400" : "text-slate-350"}`} />
                  <span className="truncate">{getLinkLabel(personalInfo.portfolio)}</span>
                </a>
              )}
            </div>
          </div>
 
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className={`space-y-3 pt-2 border-t ${borderClass}`}>
              <h3 className={`text-[10px] font-extrabold uppercase tracking-widest ${textHeaderClass}`}>{t("skills", lang)}</h3>
              <div className="space-y-2 text-xs">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
                    <span className={`font-semibold text-[11px] ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className={`space-y-3 pt-2 border-t ${borderClass}`}>
              <h3 className={`text-[10px] font-extrabold uppercase tracking-widest ${textHeaderClass}`}>{t("languages", lang)}</h3>
              <div className="space-y-1.5">
                {languages.map((langItem) => (
                  <div key={langItem.id} className={`flex justify-between items-center text-xs`}>
                    <span className={`font-bold ${isLight ? "text-slate-700" : "text-slate-200"}`}>{langItem.name}</span>
                    <span className={`font-medium italic text-[11px] ${textMutedClass}`}>{langItem.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 p-6 sm:p-8 print:p-8 space-y-6">
          
          {/* Professional Summary */}
          {professionalSummary && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                {t("professionalSummary", lang)}
              </h2>
              {renderMarkdownHTML(professionalSummary, "text-xs sm:text-sm text-slate-650")}
            </section>
          )}

          {/* Career Focus & Objective Pitch */}
          {data.theme?.showPitch && data.theme?.professionalPitch && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                {t("careerObjective", lang)}
              </h2>
              <div 
                className="p-3 rounded-lg text-xs sm:text-sm text-slate-700 leading-relaxed text-justify"
                style={{ backgroundColor: `${primaryColor}03` }}
              >
                {data.theme.professionalPitch}
              </div>
            </section>
          )}

          {/* Dynamic Section Ordering */}
          {data.theme?.experienceLevel === "entry" ? (
            <>
              {/* Education */}
              {education && education.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                    {t("education", lang)}
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1 break-inside-avoid">
                        <div className="flex justify-between items-baseline text-xs sm:text-sm">
                          <h3 className="text-slate-900 font-bold">{edu.major}</h3>
                          <span className="text-slate-500 font-semibold whitespace-nowrap text-xs pl-2">
                            {edu.startDate} – {edu.endDate || t("present", lang)}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 font-bold">{edu.school}</div>
                        {edu.description && (
                          <div className="mt-0.5">
                            {renderMarkdownHTML(edu.description, "text-xs text-slate-500")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                    {t("projects", lang)}
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1 break-inside-avoid">
                        <div className="flex justify-between items-baseline text-xs sm:text-sm">
                          <h3 className="text-slate-900 font-bold flex items-center gap-1.5 leading-snug">
                            {proj.name}
                            {proj.link && (
                              <span className="text-slate-400 font-normal text-xs print:hidden">
                                ({proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")})
                              </span>
                            )}
                          </h3>
                          {proj.link && (
                            <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline font-semibold print:block hidden shrink-0 pl-2" style={{ color: primaryColor }}>
                              {proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")}
                            </a>
                          )}
                        </div>
                        {proj.description && (
                          <div className="mt-0.5">
                            {renderMarkdownHTML(proj.description, "text-xs sm:text-sm text-slate-650")}
                          </div>
                        )}
                        {proj.technologies && (
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            <span className="text-slate-700 font-bold">Tech:</span> {proj.technologies}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Work Experience */}
              {experience && experience.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                    {t("workExperience", lang)}
                  </h2>
                  <div className="space-y-4 print:space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1 break-inside-avoid">
                        <div className="flex justify-between items-start text-xs sm:text-sm">
                          <h3 className="text-slate-900 font-bold leading-snug">
                            {exp.position} <span className="text-slate-400 font-normal">at</span> {exp.company}
                          </h3>
                          <span className="text-slate-500 font-semibold whitespace-nowrap text-xs pl-2">
                            {exp.startDate} – {exp.endDate || t("present", lang)}
                          </span>
                        </div>
                        {exp.description && (
                          <div className="mt-0.5">
                            {renderMarkdownHTML(exp.description, "text-xs sm:text-sm text-slate-650")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
              {/* Work Experience */}
              {experience && experience.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                    {t("workExperience", lang)}
                  </h2>
                  <div className="space-y-4 print:space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1 break-inside-avoid">
                        <div className="flex justify-between items-start text-xs sm:text-sm">
                          <h3 className="text-slate-900 font-bold leading-snug">
                            {exp.position} <span className="text-slate-400 font-normal">at</span> {exp.company}
                          </h3>
                          <span className="text-slate-500 font-semibold whitespace-nowrap text-xs pl-2">
                            {exp.startDate} – {exp.endDate || t("present", lang)}
                          </span>
                        </div>
                        {exp.description && (
                          <div className="mt-0.5">
                            {renderMarkdownHTML(exp.description, "text-xs sm:text-sm text-slate-650")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                    {t("education", lang)}
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-1 break-inside-avoid">
                        <div className="flex justify-between items-baseline text-xs sm:text-sm">
                          <h3 className="text-slate-900 font-bold">{edu.major}</h3>
                          <span className="text-slate-500 font-semibold whitespace-nowrap text-xs pl-2">
                            {edu.startDate} – {edu.endDate || t("present", lang)}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 font-bold">{edu.school}</div>
                        {edu.description && (
                          <div className="mt-0.5">
                            {renderMarkdownHTML(edu.description, "text-xs text-slate-500")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {projects && projects.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                    {t("projects", lang)}
                  </h2>
                  <div className="space-y-3 print:space-y-2">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1 break-inside-avoid">
                        <div className="flex justify-between items-baseline text-xs sm:text-sm">
                          <h3 className="text-slate-900 font-bold flex items-center gap-1.5 leading-snug">
                            {proj.name}
                            {proj.link && (
                              <span className="text-slate-400 font-normal text-xs print:hidden">
                                ({proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")})
                              </span>
                            )}
                          </h3>
                          {proj.link && (
                            <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline font-semibold print:block hidden shrink-0 pl-2" style={{ color: primaryColor }}>
                              {proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")}
                            </a>
                          )}
                        </div>
                        {proj.description && (
                          <div className="mt-0.5">
                            {renderMarkdownHTML(proj.description, "text-xs sm:text-sm text-slate-650")}
                          </div>
                        )}
                        {proj.technologies && (
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            <span className="text-slate-700 font-bold">Tech:</span> {proj.technologies}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* References inside main panel */}
          {references && references.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                {t("references", lang)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
                {references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5 break-inside-avoid text-xs sm:text-sm">
                    <h3 className="text-slate-900 font-bold">{ref.name}</h3>
                    {ref.relationship && ref.company ? (
                      <p className="text-slate-600 font-semibold text-xs leading-none">{ref.relationship} at {ref.company}</p>
                    ) : ref.relationship || ref.company ? (
                      <p className="text-slate-600 font-semibold text-xs leading-none">{ref.relationship || ref.company}</p>
                    ) : null}
                    <div className="text-slate-500 text-xs flex flex-wrap gap-x-2 mt-0.5 font-medium">
                      {ref.email && (
                        <a href={`mailto:${ref.email}`} className="hover:text-slate-950 transition-colors">
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
        </main>
      </div>
    );
  }
);

CVTemplateCreative.displayName = "CVTemplateCreative";
