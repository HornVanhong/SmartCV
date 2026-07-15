import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

// Create styles mimicking templates
const styles = StyleSheet.create({
  page: {
    padding: 0, // 0 padding for full-bleed layouts, templates handle padding individually
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#334155", // slate-700
    lineHeight: 1.45,
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#0f172a", // slate-900
    paddingBottom: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
  },
  photo: {
    width: 66,
    height: 88, // 3:4 aspect ratio
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1", // slate-300
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameTitleContainer: {
    flex: 1,
    flexDirection: "column",
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a", // slate-950
    lineHeight: 1.15,
  },
  title: {
    fontSize: 11,
    color: "#475569", // slate-600
    marginTop: 4,
    lineHeight: 1.2,
  },
  targetRole: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    textTransform: "uppercase",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  contactContainer: {
    alignItems: "flex-end",
    fontSize: 8.5,
    color: "#475569",
    gap: 2,
  },
  contactText: {
    color: "#475569",
    textDecoration: "none",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 0.8,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 3,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.4,
    textAlign: "justify",
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  itemDate: {
    fontSize: 8,
    color: "#64748b", // slate-500
  },
  itemSubtitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#334155",
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 8.5,
    color: "#475569",
    lineHeight: 1.35,
    textAlign: "justify",
  },
  skillsLanguagesGrid: {
    flexDirection: "row",
    gap: 20,
  },
  skillsColumn: {
    flex: 1,
  },
  languagesColumn: {
    flex: 1,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#f1f5f9", // slate-100
    borderWidth: 0.5,
    borderColor: "#e2e8f0",
    borderRadius: 4,
    fontSize: 7.5,
    color: "#1e293b", // slate-800
    fontFamily: "Helvetica-Bold",
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f5f9",
    fontSize: 8.5,
  },
  languageName: {
    fontFamily: "Helvetica-Bold",
    color: "#334155",
  },
  languageLevel: {
    color: "#64748b",
    fontStyle: "italic",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  projectNameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  projectLink: {
    fontSize: 7.5,
    color: "#2563eb", // blue-600
    textDecoration: "none",
  },
  techsUsed: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 2.5,
  },
  techsLabel: {
    fontFamily: "Helvetica-Bold",
    color: "#475569",
  },
  referencesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 4,
  },
  referenceItem: {
    width: "48%",
    marginBottom: 6,
  },
  referenceName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  referenceSub: {
    fontSize: 8,
    color: "#475569",
    fontFamily: "Helvetica-Bold",
  },
  referenceContact: {
    fontSize: 7.5,
    color: "#64748b",
    marginTop: 1,
  },

  // Minimalist & Creative Specific Styles
  centeredHeader: {
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
  },
  inlineContactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 8,
    fontSize: 8,
    color: "#475569",
  },
  splitLayout: {
    flexDirection: "row",
    gap: 20,
    height: "100%",
  },
  sidebarColumn: {
    width: 150,
    borderRightWidth: 0.8,
    borderRightColor: "#cbd5e1",
    paddingRight: 15,
  },
  mainColumn: {
    flex: 1,
  },
  sidebarSection: {
    marginBottom: 15,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
  },
  sidebarContactText: {
    fontSize: 8,
    color: "#475569",
    marginBottom: 3,
  },
  sidebarContactLink: {
    fontSize: 8,
    textDecoration: "none",
    marginBottom: 3,
  },
});

interface CVDocumentPDFProps {
  data: CVData;
}

export const CVDocumentPDF: React.FC<CVDocumentPDFProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;
  const primaryColor = data.theme?.primaryColor || "#2563eb";
  const templateId = data.theme?.templateId || "modern";

  const cleanLink = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "");
  };

  // Render Modern Layout
  const renderModern = () => (
    <View style={{ padding: 36 }}>
      {/* Header */}
      <View style={styles.header}>
        {personalInfo.photo ? (
          <Image src={personalInfo.photo} style={styles.photo} />
        ) : null}
        
        <View style={styles.headerTextContainer}>
          <View style={styles.nameTitleContainer}>
            <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
            <Text style={styles.title}>{personalInfo.jobTitle || "Professional Title"}</Text>
            {personalInfo.targetRole ? (
              <Text style={[styles.targetRole, { color: primaryColor }]}>Applied for: {personalInfo.targetRole}</Text>
            ) : null}
          </View>
          
          <View style={styles.contactContainer}>
            {personalInfo.email ? (
              <Link src={`mailto:${personalInfo.email}`} style={styles.contactText}>
                <Text>{personalInfo.email}</Text>
              </Link>
            ) : null}
            
            {personalInfo.phone ? (
              <Text style={styles.contactText}>{personalInfo.phone}</Text>
            ) : null}
            
            {personalInfo.location ? (
              <Text style={styles.contactText}>{personalInfo.location}</Text>
            ) : null}

            {personalInfo.portfolio ? (
              <Link src={`https://${personalInfo.portfolio}`} style={styles.contactText}>
                <Text>{cleanLink(personalInfo.portfolio)}</Text>
              </Link>
            ) : null}

            {personalInfo.github ? (
              <Link src={`https://${personalInfo.github}`} style={styles.contactText}>
                <Text>github: {cleanLink(personalInfo.github)}</Text>
              </Link>
            ) : null}

            {personalInfo.linkedin ? (
              <Link src={`https://${personalInfo.linkedin}`} style={styles.contactText}>
                <Text>linkedin: {cleanLink(personalInfo.linkedin)}</Text>
              </Link>
            ) : null}
          </View>
        </View>
      </View>

      {/* Summary */}
      {professionalSummary ? (
        <View style={styles.section} wrap={false}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Professional Summary
          </Text>
          <Text style={styles.summaryText}>{professionalSummary}</Text>
        </View>
      ) : null}

      {/* Experience */}
      {experience && experience.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Work Experience
          </Text>
          {experience.map((exp) => (
            <View key={exp.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {exp.position} <Text style={{ fontFamily: "Helvetica", color: "#94a3b8" }}>at</Text> {exp.company}
                </Text>
                <Text style={styles.itemDate}>{exp.startDate} – {exp.endDate || "Present"}</Text>
              </View>
              {exp.description ? (
                <Text style={styles.itemDescription}>{exp.description}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Education */}
      {education && education.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Education
          </Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.major}</Text>
                <Text style={styles.itemDate}>{edu.startDate} – {edu.endDate || "Present"}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{edu.school}</Text>
              {edu.description ? (
                <Text style={styles.itemDescription}>{edu.description}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Projects */}
      {projects && projects.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Projects
          </Text>
          {projects.map((proj) => (
            <View key={proj.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.projectHeader}>
                <View style={styles.projectNameContainer}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                </View>
                {proj.link ? (
                  <Link src={`https://${proj.link}`} style={[styles.projectLink, { color: primaryColor }]}>
                    <Text>{cleanLink(proj.link)}</Text>
                  </Link>
                ) : null}
              </View>
              {proj.description ? (
                <Text style={styles.itemDescription}>{proj.description}</Text>
              ) : null}
              {proj.technologies ? (
                <Text style={styles.techsUsed}>
                  <Text style={styles.techsLabel}>Technologies:</Text> {proj.technologies}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Grid layout for Skills & Languages */}
      <View style={styles.skillsLanguagesGrid} wrap={false}>
        {/* Skills */}
        {skills && skills.length > 0 ? (
          <View style={styles.skillsColumn}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Skills
            </Text>
            <View style={styles.badgeContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={[styles.badge, { borderColor: `${primaryColor}25`, backgroundColor: `${primaryColor}08`, color: primaryColor }]}>{skill}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* Languages */}
        {languages && languages.length > 0 ? (
          <View style={styles.languagesColumn}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Languages
            </Text>
            <View>
              {languages.map((lang) => (
                <View key={lang.id} style={styles.languageRow}>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>

      {/* References */}
      {references && references.length > 0 ? (
        <View style={[styles.section, { marginTop: 12 }]} wrap={false}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            References
          </Text>
          <View style={styles.referencesGrid}>
            {references.map((ref) => (
              <View key={ref.id} style={styles.referenceItem}>
                <Text style={styles.referenceName}>{ref.name}</Text>
                {ref.relationship && ref.company ? (
                  <Text style={styles.referenceSub}>{ref.relationship} at {ref.company}</Text>
                ) : ref.relationship || ref.company ? (
                  <Text style={styles.referenceSub}>{ref.relationship || ref.company}</Text>
                ) : null}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 1 }}>
                  {ref.email ? (
                    <Text style={styles.referenceContact}>{ref.email}</Text>
                  ) : null}
                  {ref.email && ref.phone ? (
                    <Text style={[styles.referenceContact, { color: "#cbd5e1" }]}>|</Text>
                  ) : null}
                  {ref.phone ? (
                    <Text style={styles.referenceContact}>{ref.phone}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );

  // Render Minimalist Layout
  const renderMinimalist = () => (
    <View style={{ padding: 36 }}>
      {/* Centered Header */}
      <View style={[styles.centeredHeader, { borderBottomColor: primaryColor }]}>
        {personalInfo.photo ? (
          <Image src={personalInfo.photo} style={[styles.photo, { borderRadius: 44, width: 60, height: 60, marginBottom: 8 }]} />
        ) : null}
        <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
        <Text style={[styles.title, { fontFamily: "Helvetica-Bold", color: primaryColor, fontSize: 10, textTransform: "uppercase" }]}>
          {personalInfo.jobTitle || "Professional Title"}
        </Text>
        {personalInfo.targetRole ? (
          <Text style={{ fontSize: 7.5, color: "#64748b", textTransform: "uppercase", marginTop: 2, letterSpacing: 0.5 }}>
            Applied for: {personalInfo.targetRole}
          </Text>
        ) : null}

        {/* Dynamic inline contacts row */}
        <View style={styles.inlineContactRow}>
          {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
          {personalInfo.phone ? <Text>•   {personalInfo.phone}</Text> : null}
          {personalInfo.location ? <Text>•   {personalInfo.location}</Text> : null}
        </View>
        <View style={[styles.inlineContactRow, { marginTop: 3 }]}>
          {personalInfo.portfolio ? <Text>{cleanLink(personalInfo.portfolio)}</Text> : null}
          {personalInfo.github ? <Text>•   github: {cleanLink(personalInfo.github)}</Text> : null}
          {personalInfo.linkedin ? <Text>•   linkedin: {cleanLink(personalInfo.linkedin)}</Text> : null}
        </View>
      </View>

      {/* Summary */}
      {professionalSummary ? (
        <View style={styles.section} wrap={false}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Professional Summary
          </Text>
          <Text style={styles.summaryText}>{professionalSummary}</Text>
        </View>
      ) : null}

      {/* Experience */}
      {experience && experience.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Work Experience
          </Text>
          {experience.map((exp) => (
            <View key={exp.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {exp.position} <Text style={{ fontFamily: "Helvetica", color: "#94a3b8" }}>at</Text> {exp.company}
                </Text>
                <Text style={styles.itemDate}>{exp.startDate} – {exp.endDate || "Present"}</Text>
              </View>
              {exp.description ? (
                <Text style={styles.itemDescription}>{exp.description}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Education */}
      {education && education.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Education
          </Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.major}</Text>
                <Text style={styles.itemDate}>{edu.startDate} – {edu.endDate || "Present"}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{edu.school}</Text>
              {edu.description ? (
                <Text style={styles.itemDescription}>{edu.description}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Projects */}
      {projects && projects.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            Projects
          </Text>
          {projects.map((proj) => (
            <View key={proj.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.link ? (
                  <Link src={`https://${proj.link}`} style={[styles.projectLink, { color: primaryColor }]}>
                    <Text>{cleanLink(proj.link)}</Text>
                  </Link>
                ) : null}
              </View>
              {proj.description ? (
                <Text style={styles.itemDescription}>{proj.description}</Text>
              ) : null}
              {proj.technologies ? (
                <Text style={styles.techsUsed}>
                  <Text style={styles.techsLabel}>Technologies:</Text> {proj.technologies}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Skills & Languages Grid */}
      <View style={styles.skillsLanguagesGrid} wrap={false}>
        {skills && skills.length > 0 ? (
          <View style={styles.skillsColumn}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Skills
            </Text>
            <View style={styles.badgeContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={[styles.badge, { borderColor: `${primaryColor}25`, backgroundColor: `${primaryColor}08`, color: primaryColor }]}>{skill}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {languages && languages.length > 0 ? (
          <View style={styles.languagesColumn}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Languages
            </Text>
            <View>
              {languages.map((lang) => (
                <View key={lang.id} style={styles.languageRow}>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>

      {/* References */}
      {references && references.length > 0 ? (
        <View style={[styles.section, { marginTop: 12 }]} wrap={false}>
          <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
            References
          </Text>
          <View style={styles.referencesGrid}>
            {references.map((ref) => (
              <View key={ref.id} style={styles.referenceItem}>
                <Text style={styles.referenceName}>{ref.name}</Text>
                {ref.relationship && ref.company ? (
                  <Text style={styles.referenceSub}>{ref.relationship} at {ref.company}</Text>
                ) : ref.relationship || ref.company ? (
                  <Text style={styles.referenceSub}>{ref.relationship || ref.company}</Text>
                ) : null}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 1 }}>
                  {ref.email ? (
                    <Text style={styles.referenceContact}>{ref.email}</Text>
                  ) : null}
                  {ref.email && ref.phone ? (
                    <Text style={[styles.referenceContact, { color: "#cbd5e1" }]}>|</Text>
                  ) : null}
                  {ref.phone ? (
                    <Text style={styles.referenceContact}>{ref.phone}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );

  // Render Creative Split Layout
  const renderCreative = () => (
    <View style={[styles.splitLayout, { padding: 36 }]}>
      {/* Sidebar Column */}
      <View style={styles.sidebarColumn}>
        {personalInfo.photo ? (
          <Image src={personalInfo.photo} style={[styles.photo, { width: 66, height: 88, borderRadius: 6, marginBottom: 12, marginLeft: "auto", marginRight: "auto" }]} />
        ) : null}

        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.name, { fontSize: 14, fontFamily: "Helvetica-Bold" }]}>{personalInfo.fullName || "Your Name"}</Text>
          <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: primaryColor, marginTop: 2, textTransform: "uppercase" }}>
            {personalInfo.jobTitle || "Professional Title"}
          </Text>
          {personalInfo.targetRole ? (
            <Text style={{ fontSize: 7, color: "#64748b", textTransform: "uppercase", marginTop: 2 }}>
              Target: {personalInfo.targetRole}
            </Text>
          ) : null}
        </View>

        {/* Contact info block */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Contact</Text>
          {personalInfo.email ? (
            <Link src={`mailto:${personalInfo.email}`} style={[styles.sidebarContactLink, { color: primaryColor }]}>
              <Text>{personalInfo.email}</Text>
            </Link>
          ) : null}
          {personalInfo.phone ? <Text style={styles.sidebarContactText}>{personalInfo.phone}</Text> : null}
          {personalInfo.location ? <Text style={styles.sidebarContactText}>{personalInfo.location}</Text> : null}
        </View>

        {/* Socials block */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Socials</Text>
          {personalInfo.portfolio ? (
            <Link src={`https://${personalInfo.portfolio}`} style={[styles.sidebarContactLink, { color: primaryColor }]}>
              <Text>{cleanLink(personalInfo.portfolio)}</Text>
            </Link>
          ) : null}
          {personalInfo.github ? (
            <Link src={`https://${personalInfo.github}`} style={[styles.sidebarContactLink, { color: primaryColor }]}>
              <Text>github: {cleanLink(personalInfo.github)}</Text>
            </Link>
          ) : null}
          {personalInfo.linkedin ? (
            <Link src={`https://${personalInfo.linkedin}`} style={[styles.sidebarContactLink, { color: primaryColor }]}>
              <Text>linkedin: {cleanLink(personalInfo.linkedin)}</Text>
            </Link>
          ) : null}
        </View>

        {/* Skills Block */}
        {skills && skills.length > 0 ? (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Skills</Text>
            <View style={styles.badgeContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={[styles.badge, { fontSize: 7, paddingHorizontal: 4, paddingVertical: 1.5, borderColor: `${primaryColor}25`, backgroundColor: `${primaryColor}08`, color: primaryColor }]}>{skill}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* Languages Block */}
        {languages && languages.length > 0 ? (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Languages</Text>
            {languages.map((lang) => (
              <View key={lang.id} style={[styles.languageRow, { borderBottomColor: "#cbd5e1" }]}>
                <Text style={[styles.languageName, { fontSize: 8 }]}>{lang.name}</Text>
                <Text style={[styles.languageLevel, { fontSize: 7.5 }]}>{lang.level}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Main Column */}
      <View style={styles.mainColumn}>
        {/* Professional Summary */}
        {professionalSummary ? (
          <View style={styles.section} wrap={false}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Professional Summary
            </Text>
            <Text style={styles.summaryText}>{professionalSummary}</Text>
          </View>
        ) : null}

        {/* Work Experience */}
        {experience && experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Work Experience
            </Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.itemContainer} wrap={false}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {exp.position} <Text style={{ fontFamily: "Helvetica", color: "#94a3b8" }}>at</Text> {exp.company}
                  </Text>
                  <Text style={styles.itemDate}>{exp.startDate} – {exp.endDate || "Present"}</Text>
                </View>
                {exp.description ? (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {education && education.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Education
            </Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.itemContainer} wrap={false}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.major}</Text>
                  <Text style={styles.itemDate}>{edu.startDate} – {edu.endDate || "Present"}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.school}</Text>
                {edu.description ? (
                  <Text style={styles.itemDescription}>{edu.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Projects */}
        {projects && projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              Projects
            </Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer} wrap={false}>
                <View style={styles.projectHeader}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                  {proj.link ? (
                    <Link src={`https://${proj.link}`} style={[styles.projectLink, { color: primaryColor }]}>
                      <Text>{cleanLink(proj.link)}</Text>
                    </Link>
                  ) : null}
                </View>
                {proj.description ? (
                  <Text style={styles.itemDescription}>{proj.description}</Text>
                ) : null}
                {proj.technologies ? (
                  <Text style={styles.techsUsed}>
                    <Text style={styles.techsLabel}>Technologies:</Text> {proj.technologies}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* References */}
        {references && references.length > 0 ? (
          <View style={[styles.section, { marginTop: 12 }]} wrap={false}>
            <Text style={[styles.sectionTitle, { color: primaryColor, borderBottomColor: `${primaryColor}20` }]}>
              References
            </Text>
            <View style={styles.referencesGrid}>
              {references.map((ref) => (
                <View key={ref.id} style={styles.referenceItem}>
                  <Text style={styles.referenceName}>{ref.name}</Text>
                  {ref.relationship && ref.company ? (
                    <Text style={styles.referenceSub}>{ref.relationship} at {ref.company}</Text>
                  ) : ref.relationship || ref.company ? (
                    <Text style={styles.referenceSub}>{ref.relationship || ref.company}</Text>
                  ) : null}
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 1 }}>
                    {ref.email ? (
                      <Text style={styles.referenceContact}>{ref.email}</Text>
                    ) : null}
                    {ref.email && ref.phone ? (
                      <Text style={[styles.referenceContact, { color: "#cbd5e1" }]}>|</Text>
                    ) : null}
                    {ref.phone ? (
                      <Text style={styles.referenceContact}>{ref.phone}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );

  // Render Professional Layout (Top Banner, Solid boxes)
  const renderProfessional = () => (
    <View style={{ flex: 1 }}>
      {/* Full-bleed Top Banner */}
      <View style={{ backgroundColor: primaryColor, paddingHorizontal: 36, paddingVertical: 20, flexDirection: "row", alignItems: "center", gap: 15 }}>
        {personalInfo.photo ? (
          <Image src={personalInfo.photo} style={[styles.photo, { width: 66, height: 88, borderWidth: 3, borderColor: "#ffffff", borderRadius: 2, marginBottom: -42, zIndex: 10 }]} />
        ) : null}
        <View style={{ flex: 1, marginLeft: personalInfo.photo ? 15 : 0 }}>
          <Text style={[styles.name, { color: "#ffffff", textTransform: "uppercase" }]}>{personalInfo.fullName || "Your Name"}</Text>
          <Text style={[styles.title, { color: "#f1f5f9", fontSize: 10, textTransform: "uppercase", marginTop: 2, fontFamily: "Helvetica-Bold" }]}>
            {personalInfo.jobTitle || "Professional Title"}
          </Text>
          {personalInfo.targetRole ? (
            <Text style={{ fontSize: 7.5, color: "#cbd5e1", textTransform: "uppercase", marginTop: 2, letterSpacing: 0.5 }}>
              Applied for: {personalInfo.targetRole}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Main split content below banner */}
      <View style={{ paddingHorizontal: 36, paddingTop: 35, paddingBottom: 20, flex: 1, flexDirection: "row", gap: 20 }}>
        {/* Left Sidebar */}
        <View style={styles.sidebarColumn}>
          {/* Contacts with small primary color icon box equivalent */}
          <View style={[styles.sidebarSection, { marginTop: 10 }]}>
            {personalInfo.phone ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <View style={{ width: 14, height: 14, backgroundColor: primaryColor, borderRadius: 2, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#ffffff", fontSize: 7, fontFamily: "Helvetica-Bold" }}>P</Text>
                </View>
                <Text style={{ fontSize: 8, color: "#475569" }}>{personalInfo.phone}</Text>
              </View>
            ) : null}
            {personalInfo.email ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <View style={{ width: 14, height: 14, backgroundColor: primaryColor, borderRadius: 2, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#ffffff", fontSize: 7, fontFamily: "Helvetica-Bold" }}>E</Text>
                </View>
                <Text style={{ fontSize: 8, color: "#475569" }}>{personalInfo.email}</Text>
              </View>
            ) : null}
            {personalInfo.dob ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <View style={{ width: 14, height: 14, backgroundColor: primaryColor, borderRadius: 2, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#ffffff", fontSize: 7, fontFamily: "Helvetica-Bold" }}>D</Text>
                </View>
                <Text style={{ fontSize: 8, color: "#475569" }}>{personalInfo.dob}</Text>
              </View>
            ) : null}
            {personalInfo.nationality ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <View style={{ width: 14, height: 14, backgroundColor: primaryColor, borderRadius: 2, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#ffffff", fontSize: 7, fontFamily: "Helvetica-Bold" }}>N</Text>
                </View>
                <Text style={{ fontSize: 8, color: "#475569" }}>{personalInfo.nationality}</Text>
              </View>
            ) : null}
            {personalInfo.location ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <View style={{ width: 14, height: 14, backgroundColor: primaryColor, borderRadius: 2, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#ffffff", fontSize: 7, fontFamily: "Helvetica-Bold" }}>L</Text>
                </View>
                <Text style={{ fontSize: 8, color: "#475569" }}>{personalInfo.location}</Text>
              </View>
            ) : null}
          </View>

          {/* Education */}
          {education && education.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={[styles.sidebarSectionTitle, { backgroundColor: primaryColor, color: "#ffffff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, borderBottomWidth: 0 }]}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#1e293b" }}>{edu.major}</Text>
                  <Text style={{ fontSize: 7.5, color: "#475569" }}>{edu.school}</Text>
                  <Text style={{ fontSize: 7, color: "#64748b" }}>{edu.startDate} - {edu.endDate || "Present"}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {skills && skills.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={[styles.sidebarSectionTitle, { backgroundColor: primaryColor, color: "#ffffff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, borderBottomWidth: 0 }]}>Skills</Text>
              <View style={{ gap: 2 }}>
                {skills.map((skill, index) => (
                  <Text key={index} style={{ fontSize: 8, color: "#475569" }}>• {skill}</Text>
                ))}
              </View>
            </View>
          ) : null}

          {/* Languages */}
          {languages && languages.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={[styles.sidebarSectionTitle, { backgroundColor: primaryColor, color: "#ffffff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, borderBottomWidth: 0 }]}>Languages</Text>
              {languages.map((lang) => (
                <View key={lang.id} style={[styles.languageRow, { borderBottomColor: "#cbd5e1" }]}>
                  <Text style={[styles.languageName, { fontSize: 8 }]}>{lang.name}</Text>
                  <Text style={[styles.languageLevel, { fontSize: 7.5 }]}>{lang.level}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* Right Main Column */}
        <View style={styles.mainColumn}>
          {/* Profile */}
          {professionalSummary ? (
            <View style={styles.section} wrap={false}>
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>Profile</Text>
              <Text style={styles.summaryText}>{professionalSummary}</Text>
            </View>
          ) : null}

          {/* Work Experience */}
          {experience && experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>Work Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={{ flexDirection: "row", gap: 10, marginBottom: 8 }} wrap={false}>
                  <View style={{ width: 90, flexShrink: 0 }}>
                    <Text style={{ fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#64748b" }}>{exp.startDate} – {exp.endDate || "Present"}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                      {exp.position} <Text style={{ fontFamily: "Helvetica", color: "#94a3b8" }}>at</Text> {exp.company}
                    </Text>
                    {exp.description ? (
                      <Text style={[styles.itemDescription, { marginTop: 2 }]}>{exp.description}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {/* Projects */}
          {projects && projects.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>Projects & Courses</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={styles.itemContainer} wrap={false}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.itemTitle}>{proj.name}</Text>
                    {proj.link ? (
                      <Link src={`https://${proj.link}`} style={[styles.projectLink, { color: primaryColor }]}>
                        <Text>{cleanLink(proj.link)}</Text>
                      </Link>
                    ) : null}
                  </View>
                  {proj.description ? (
                    <Text style={styles.itemDescription}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}

          {/* References */}
          {references && references.length > 0 ? (
            <View style={[styles.section, { marginTop: 8 }]} wrap={false}>
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>References</Text>
              <View style={styles.referencesGrid}>
                {references.map((ref) => (
                  <View key={ref.id} style={styles.referenceItem}>
                    <Text style={styles.referenceName}>{ref.name}</Text>
                    {ref.relationship && ref.company ? (
                      <Text style={styles.referenceSub}>{ref.relationship} at {ref.company}</Text>
                    ) : ref.relationship || ref.company ? (
                      <Text style={styles.referenceSub}>{ref.relationship || ref.company}</Text>
                    ) : null}
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 1 }}>
                      {ref.email ? (
                        <Text style={styles.referenceContact}>Email: {ref.email}</Text>
                      ) : null}
                      {ref.email && ref.phone ? (
                        <Text style={[styles.referenceContact, { color: "#cbd5e1" }]}>|</Text>
                      ) : null}
                      {ref.phone ? (
                        <Text style={styles.referenceContact}>Tel: {ref.phone}</Text>
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  const renderLayout = () => {
    switch (templateId) {
      case "minimalist":
        return renderMinimalist();
      case "creative":
        return renderCreative();
      case "professional":
        return renderProfessional();
      case "modern":
      default:
        return renderModern();
    }
  };

  return (
    <Document title={`${personalInfo.fullName.replace(/\s+/g, "_")}_CV`}>
      <Page size="A4" style={styles.page}>
        {renderLayout()}
      </Page>
    </Document>
  );
};
