import React from "react";
import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Calendar, Flag, Briefcase, Award, BookOpen, User } from "lucide-react";

interface CVTemplateProfessionalProps {
  data: CVData;
}

export const CVTemplateProfessional = React.forwardRef<HTMLDivElement, CVTemplateProfessionalProps>(
  ({ data }, ref) => {
    const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
    const primaryColor = data.theme?.primaryColor || "#2563eb";

    return (
      <div
        ref={ref}
        className="w-full bg-white text-slate-800 font-sans selection:bg-slate-100 min-h-[inherit] flex flex-col print:p-0"
        style={{ boxSizing: "border-box" }}
      >
        {/* Full-width Solid Header Banner */}
        <header className="relative w-full text-white px-8 py-8 sm:py-10 print:py-8 flex items-center justify-between" style={{ backgroundColor: primaryColor }}>
          <div className="flex flex-col sm:flex-row items-center gap-6 z-10">
            {/* White border Photo offset */}
            {personalInfo.photo && (
              <div className="h-32 w-28 rounded-sm overflow-hidden border-3 border-white bg-white shadow-md sm:-mb-14 print:-mb-14">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="text-center sm:text-left print:text-left sm:pl-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase">
                {personalInfo.fullName || "Your Name"}
              </h1>
              <p className="text-sm font-semibold tracking-widest uppercase text-white/80 mt-1">
                {personalInfo.jobTitle || "Professional Title"}
              </p>
            </div>
          </div>
        </header>

        {/* Layout Split Container */}
        <div className="flex-1 flex flex-col sm:flex-row print:flex-row px-8 py-10 sm:pt-16 print:pt-16 sm:pb-8 print:pb-8 gap-8">
          
          {/* Left Column (Sidebar) */}
          <aside className="w-full sm:w-[260px] print:w-[240px] flex flex-col gap-6 shrink-0">
            
            {/* Contact Information block */}
            <div className="space-y-3">
              <div className="space-y-2 text-xs font-medium text-slate-700">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 shrink-0 rounded-sm flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2.5 hover:text-slate-900 transition-colors">
                    <div className="h-6 w-6 shrink-0 rounded-sm flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo.dob && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 shrink-0 rounded-sm flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <span>Date of Birth: {personalInfo.dob}</span>
                  </div>
                )}
                {personalInfo.nationality && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 shrink-0 rounded-sm flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <Flag className="h-3.5 w-3.5" />
                    </div>
                    <span>Nationality: {personalInfo.nationality}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 shrink-0 rounded-sm flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Education Section (Solid box title) */}
            {education && education.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded-sm" style={{ backgroundColor: primaryColor }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5 text-xs">
                      <h4 className="font-bold text-slate-900 leading-snug">{edu.major}</h4>
                      <p className="text-slate-500 font-semibold text-[10px]">{edu.school}</p>
                      <p className="text-slate-400 font-semibold text-[9px]">{edu.startDate} - {edu.endDate || "Present"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section (Solid box title) */}
            {skills && skills.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded-sm" style={{ backgroundColor: primaryColor }}>
                  Skills
                </h2>
                <ul className="list-disc pl-4 space-y-1 text-xs font-medium text-slate-700">
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages Section (Solid box title) */}
            {languages && languages.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded-sm" style={{ backgroundColor: primaryColor }}>
                  Languages
                </h2>
                <div className="space-y-1.5">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800">{lang.name}</span>
                      <span className="text-slate-500 font-medium italic text-[11px]">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Right Column (Main Panel) */}
          <main className="flex-1 flex flex-col gap-6">
            
            {/* Profile/Summary */}
            {professionalSummary && (
              <section className="space-y-2">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b pb-1" style={{ borderColor: `${primaryColor}20` }}>
                  <User className="h-4.5 w-4.5" style={{ color: primaryColor }} />
                  Profile
                </h2>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed text-justify">
                  {professionalSummary}
                </p>
              </section>
            )}

            {/* Work Experience */}
            {experience && experience.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b pb-1" style={{ borderColor: `${primaryColor}20` }}>
                  <Briefcase className="h-4.5 w-4.5" style={{ color: primaryColor }} />
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="flex flex-col sm:flex-row print:flex-row gap-2 sm:gap-4 print:gap-4 break-inside-avoid">
                      {/* Left dates column */}
                      <div className="w-[100px] shrink-0 text-xs font-bold text-slate-600 sm:text-left print:text-left">
                        {exp.startDate} <br className="hidden sm:inline print:inline" /> - <br className="hidden sm:inline print:inline" /> {exp.endDate || "Present"}
                      </div>
                      {/* Right desc column */}
                      <div className="flex-1 space-y-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {exp.position} at <span className="font-semibold text-slate-700">{exp.company}</span>
                        </h4>
                        {exp.description && (
                          <p className="text-xs sm:text-sm text-slate-650 leading-relaxed whitespace-pre-line text-justify">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects / Training Courses */}
            {projects && projects.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b pb-1" style={{ borderColor: `${primaryColor}20` }}>
                  <Award className="h-4.5 w-4.5" style={{ color: primaryColor }} />
                  Projects & Courses
                </h2>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1 break-inside-avoid text-xs">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        {proj.name}
                        {proj.link && (
                          <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-[10px] hover:underline font-semibold" style={{ color: primaryColor }}>
                            ({proj.link.replace(/^(https?:\/\/)?(www\.)?/, "")})
                          </a>
                        )}
                      </h4>
                      {proj.description && (
                        <p className="text-slate-650 leading-relaxed text-justify">
                          {proj.description}
                        </p>
                      )}
                      {proj.technologies && (
                        <div className="text-[10px] text-slate-500 font-medium">
                          <span className="text-slate-700 font-bold">Tech:</span> {proj.technologies}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* References */}
            {references && references.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b pb-1" style={{ borderColor: `${primaryColor}20` }}>
                  <BookOpen className="h-4.5 w-4.5" style={{ color: primaryColor }} />
                  References
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
                  {references.map((ref) => (
                    <div key={ref.id} className="space-y-0.5 break-inside-avoid text-xs">
                      <h3 className="text-slate-900 font-bold">{ref.name}</h3>
                      {ref.relationship && ref.company ? (
                        <p className="text-slate-600 font-semibold text-[10px] leading-tight">{ref.relationship} at {ref.company}</p>
                      ) : ref.relationship || ref.company ? (
                        <p className="text-slate-600 font-semibold text-[10px] leading-tight">{ref.relationship || ref.company}</p>
                      ) : null}
                      <div className="text-slate-500 text-[10px] space-y-0.5 mt-1 font-medium">
                        {ref.email && (
                          <a href={`mailto:${ref.email}`} className="hover:text-slate-950 transition-colors block">
                            Email: {ref.email}
                          </a>
                        )}
                        {ref.phone && <span className="block">Tel: {ref.phone}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </main>
        </div>
      </div>
    );
  }
);

CVTemplateProfessional.displayName = "CVTemplateProfessional";
