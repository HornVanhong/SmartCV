import React from "react";
import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";

interface CVTemplateCreativeProps {
  data: CVData;
}

export const CVTemplateCreative = React.forwardRef<HTMLDivElement, CVTemplateCreativeProps>(
  ({ data }, ref) => {
    const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
    const primaryColor = data.theme?.primaryColor || "#2563eb";

    return (
      <div
        ref={ref}
        className="w-full bg-white text-slate-800 font-sans selection:bg-slate-100 min-h-[inherit] flex flex-col sm:flex-row print:flex-row"
        style={{ boxSizing: "border-box" }}
      >
        {/* Left Sidebar */}
        <aside className="w-full sm:w-[280px] print:w-[260px] bg-slate-50/70 border-r border-slate-200/60 p-6 sm:p-8 print:p-8 flex flex-col gap-6 shrink-0">
          
          {/* Profile Photo */}
          {personalInfo.photo && (
            <div className="h-28 w-24 rounded-2xl overflow-hidden border border-slate-200 shadow-xs mx-auto shrink-0">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Name & Title */}
          <div className="text-center sm:text-left print:text-left space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
              {personalInfo.jobTitle || "Professional Title"}
            </p>
            {personalInfo.targetRole && (
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-0.5">
                Target: {personalInfo.targetRole}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-3 pt-2 border-t border-slate-200/60">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Contact</h3>
            <div className="space-y-2 text-xs text-slate-650">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-slate-950 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2 border-t border-slate-200/60">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Socials</h3>
            <div className="space-y-2 text-xs text-slate-650">
              {personalInfo.github && (
                <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-slate-950 transition-colors">
                  <Github className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{personalInfo.github.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-slate-950 transition-colors">
                  <Linkedin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{personalInfo.linkedin.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>
                </a>
              )}
              {personalInfo.portfolio && (
                <a href={`https://${personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-slate-950 transition-colors">
                  <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{personalInfo.portfolio.replace(/^(https?:\/\/)?(www\.)?/, "")}</span>
                </a>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-200/60">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold border"
                    style={{ borderColor: `${primaryColor}20`, backgroundColor: `${primaryColor}06`, color: primaryColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-200/60">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Languages</h3>
              <div className="space-y-1.5">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{lang.name}</span>
                    <span className="text-slate-500 font-medium italic text-[11px]">{lang.level}</span>
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
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                {professionalSummary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                Work Experience
              </h2>
              <div className="space-y-4 print:space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-start text-xs sm:text-sm">
                      <h3 className="text-slate-900 font-bold leading-snug">
                        {exp.position} <span className="text-slate-400 font-normal">at</span> {exp.company}
                      </h3>
                      <span className="text-slate-500 font-semibold whitespace-nowrap text-xs pl-2">
                        {exp.startDate} – {exp.endDate || "Present"}
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
              <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                Education
              </h2>
              <div className="space-y-3 print:space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-baseline text-xs sm:text-sm">
                      <h3 className="text-slate-900 font-bold">{edu.major}</h3>
                      <span className="text-slate-500 font-semibold whitespace-nowrap text-xs pl-2">
                        {edu.startDate} – {edu.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-bold">{edu.school}</div>
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
              <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                Projects
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
                        <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline font-semibold print:block hidden shrink-0 pl-2" style={{ color: primaryColor }}>
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
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        <span className="text-slate-700 font-bold">Tech:</span> {proj.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References inside main panel */}
          {references && references.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold tracking-wider uppercase border-b-2 pb-1 text-slate-900" style={{ borderColor: primaryColor }}>
                References
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
                          {ref.email}
                        </a>
                      )}
                      {ref.email && ref.phone && <span className="text-slate-300">•</span>}
                      {ref.phone && <span>{ref.phone}</span>}
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
