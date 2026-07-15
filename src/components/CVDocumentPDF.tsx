import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import { CVData } from "@/types/cv";
import { t } from "@/lib/translations";

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
  const lang = data.theme?.language || "en";

  const cleanLink = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "");
  };

  // Render Modern Layout
  const renderModern = () => (
    <View style={{ padding: 36 }}>
      {/* Header */}
      <View style={styles.header}>
        {personalInfo.photo ? (
          <Image
            src={personalInfo.photo}
            style={[
              styles.photo,
              data.theme?.photoAspectRatio === "4:6"
                ? { width: 60, height: 90 }
                : { width: 66, height: 88 }
            ]}
          />
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
          <Image
            src={personalInfo.photo}
            style={[
              styles.photo,
              { borderRadius: 6, marginBottom: 8 },
              data.theme?.photoAspectRatio === "4:6"
                ? { width: 60, height: 90 }
                : { width: 66, height: 88 }
            ]}
          />
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
          <Image
            src={personalInfo.photo}
            style={[
              styles.photo,
              { borderRadius: 6, marginBottom: 12, marginLeft: "auto", marginRight: "auto" },
              data.theme?.photoAspectRatio === "4:6"
                ? { width: 60, height: 90 }
                : { width: 66, height: 88 }
            ]}
          />
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
          <Image
            src={personalInfo.photo}
            style={[
              styles.photo,
              { borderWidth: 3, borderColor: "#ffffff", borderRadius: 2, zIndex: 10 },
              data.theme?.photoAspectRatio === "4:6"
                ? { width: 60, height: 90, marginBottom: -46 }
                : { width: 66, height: 88, marginBottom: -42 }
            ]}
          />
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
                <Text style={{ fontSize: 8, color: "#475569" }}>{lang === "km" ? "ថ្ងៃកំណើត" : "DOB"}: {personalInfo.dob}</Text>
              </View>
            ) : null}
            {personalInfo.nationality ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <View style={{ width: 14, height: 14, backgroundColor: primaryColor, borderRadius: 2, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#ffffff", fontSize: 7, fontFamily: "Helvetica-Bold" }}>N</Text>
                </View>
                <Text style={{ fontSize: 8, color: "#475569" }}>{lang === "km" ? "សញ្ជាតិ" : "Nat."}: {personalInfo.nationality}</Text>
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
              <Text style={[styles.sidebarSectionTitle, { backgroundColor: primaryColor, color: "#ffffff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, borderBottomWidth: 0 }]}>{t("education", lang)}</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#1e293b" }}>{edu.major}</Text>
                  <Text style={{ fontSize: 7.5, color: "#475569" }}>{edu.school}</Text>
                  <Text style={{ fontSize: 7, color: "#64748b" }}>{edu.startDate} - {edu.endDate || t("present", lang)}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {skills && skills.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={[styles.sidebarSectionTitle, { backgroundColor: primaryColor, color: "#ffffff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, borderBottomWidth: 0 }]}>{t("skills", lang)}</Text>
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
              <Text style={[styles.sidebarSectionTitle, { backgroundColor: primaryColor, color: "#ffffff", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, borderBottomWidth: 0 }]}>{t("languages", lang)}</Text>
              {languages.map((langItem) => (
                <View key={langItem.id} style={[styles.languageRow, { borderBottomColor: "#cbd5e1" }]}>
                  <Text style={[styles.languageName, { fontSize: 8 }]}>{langItem.name}</Text>
                  <Text style={[styles.languageLevel, { fontSize: 7.5 }]}>{langItem.level}</Text>
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
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>{t("profile", lang)}</Text>
              <Text style={styles.summaryText}>{professionalSummary}</Text>
            </View>
          ) : null}

          {/* Work Experience */}
          {experience && experience.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>{t("workExperience", lang)}</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={{ flexDirection: "row", gap: 10, marginBottom: 8 }} wrap={false}>
                  <View style={{ width: 90, flexShrink: 0 }}>
                    <Text style={{ fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#64748b" }}>{exp.startDate} – {exp.endDate || t("present", lang)}</Text>
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
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>{t("projects", lang)}</Text>
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
              <Text style={[styles.sectionTitle, { color: "#0f172a", borderBottomColor: `${primaryColor}20`, fontFamily: "Helvetica-Bold" }]}>{t("references", lang)}</Text>
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
                        <Text style={styles.referenceContact}>{t("email", lang)}: {ref.email}</Text>
                      ) : null}
                      {ref.email && ref.phone ? (
                        <Text style={[styles.referenceContact, { color: "#cbd5e1" }]}>|</Text>
                      ) : null}
                      {ref.phone ? (
                        <Text style={styles.referenceContact}>{t("tel", lang)}: {ref.phone}</Text>
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

  // Render Elegant Layout
  const renderElegant = () => (
    <View style={{ padding: 36 }}>
      {/* Centered serif-style header */}
      <View style={{ alignItems: "center", borderBottomWidth: 2, borderBottomColor: primaryColor, paddingBottom: 15, marginBottom: 15 }}>
        {personalInfo.photo ? (
          <Image
            src={personalInfo.photo}
            style={[
              styles.photo,
              { borderRadius: 2, marginBottom: 8 },
              data.theme?.photoAspectRatio === "4:6" ? { width: 60, height: 90 } : { width: 66, height: 88 }
            ]}
          />
        ) : null}
        <Text style={{ fontSize: 22, color: primaryColor, fontFamily: "Helvetica-Bold", textTransform: "uppercase" }}>{personalInfo.fullName || "Your Name"}</Text>
        <Text style={{ fontSize: 10, color: "#64748b", marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>{personalInfo.jobTitle || "Professional Title"}</Text>
        {personalInfo.targetRole ? (
          <Text style={{ fontSize: 7.5, color: "#94a3b8", textTransform: "uppercase", marginTop: 2, letterSpacing: 0.5 }}>
            {t("appliedFor", lang)}: {personalInfo.targetRole}
          </Text>
        ) : null}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 10, fontSize: 8, color: "#475569" }}>
          {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
          {personalInfo.phone ? <Text>• {personalInfo.phone}</Text> : null}
          {personalInfo.location ? <Text>• {personalInfo.location}</Text> : null}
        </View>
      </View>

      <View style={{ gap: 15 }}>
        {professionalSummary ? (
          <View style={{ gap: 4 }} wrap={false}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("professionalSummary", lang)}</Text>
            <Text style={styles.summaryText}>{professionalSummary}</Text>
          </View>
        ) : null}

        {experience && experience.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("workExperience", lang)}</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 4 }} wrap={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{exp.position} at {exp.company}</Text>
                  <Text style={{ fontSize: 8, color: "#64748b" }}>{exp.startDate} - {exp.endDate || t("present", lang)}</Text>
                </View>
                {exp.description ? <Text style={styles.itemDescription}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {education && education.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("education", lang)}</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 4 }} wrap={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{edu.major} at {edu.school}</Text>
                  <Text style={{ fontSize: 8, color: "#64748b" }}>{edu.startDate} - {edu.endDate || t("present", lang)}</Text>
                </View>
                {edu.description ? <Text style={styles.itemDescription}>{edu.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {projects && projects.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("projects", lang)}</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 4 }} wrap={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{proj.name}</Text>
                  {proj.link ? <Text style={{ fontSize: 8, color: primaryColor }}>{cleanLink(proj.link)}</Text> : null}
                </View>
                {proj.description ? <Text style={styles.itemDescription}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        <View style={{ flexDirection: "row", gap: 20 }} wrap={false}>
          {skills && skills.length > 0 ? (
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("skills", lang)}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
                {skills.map((skill, idx) => (
                  <Text key={idx} style={{ fontSize: 8, paddingHorizontal: 4, paddingVertical: 1, backgroundColor: "#f1f5f9", color: "#475569", borderRadius: 2 }}>{skill}</Text>
                ))}
              </View>
            </View>
          ) : null}

          {languages && languages.length > 0 ? (
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("languages", lang)}</Text>
              {languages.map((langItem) => (
                <View key={langItem.id} style={{ flexDirection: "row", justifyContent: "space-between", fontSize: 8, marginBottom: 2 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: "#334155" }}>{langItem.name}</Text>
                  <Text style={{ color: "#64748b", fontStyle: "italic" }}>{langItem.level}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {references && references.length > 0 ? (
          <View style={{ gap: 6 }} wrap={false}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("references", lang)}</Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              {references.map((ref) => (
                <View key={ref.id} style={{ flex: 1, fontSize: 8 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{ref.name}</Text>
                  {ref.relationship || ref.company ? <Text style={{ color: "#64748b" }}>{ref.relationship} {ref.company ? `at ${ref.company}` : ""}</Text> : null}
                  {ref.email ? <Text>{t("email", lang)}: {ref.email}</Text> : null}
                  {ref.phone ? <Text>{t("tel", lang)}: {ref.phone}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );

  // Render Executive Layout
  const renderExecutive = () => (
    <View style={{ flexDirection: "row", height: "100%" }}>
      {/* Left Sidebar */}
      <View style={{ width: 170, backgroundColor: primaryColor, padding: 20, color: "#ffffff" }}>
        {personalInfo.photo ? (
          <Image
            src={personalInfo.photo}
            style={[
              styles.photo,
              { borderRadius: 6, borderWidth: 2, borderColor: "#ffffff", marginLeft: "auto", marginRight: "auto", marginBottom: 12 },
              data.theme?.photoAspectRatio === "4:6" ? { width: 60, height: 90 } : { width: 66, height: 88 }
            ]}
          />
        ) : null}
        <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold", color: "#ffffff", textTransform: "uppercase", textAlign: "center" }}>{personalInfo.fullName || "Your Name"}</Text>
        <Text style={{ fontSize: 8, color: "#f1f5f9", textAlign: "center", marginTop: 2, textTransform: "uppercase" }}>{personalInfo.jobTitle || "Professional Title"}</Text>
        
        <View style={{ marginTop: 20, gap: 10, fontSize: 7.5 }}>
          <Text style={{ fontFamily: "Helvetica-Bold", color: "#e2e8f0", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "rgba(255,255,255,0.2)", paddingBottom: 2 }}>{t("contact", lang)}</Text>
          {personalInfo.phone ? <Text>P: {personalInfo.phone}</Text> : null}
          {personalInfo.email ? <Text>E: {personalInfo.email}</Text> : null}
          {personalInfo.location ? <Text>L: {personalInfo.location}</Text> : null}
          {personalInfo.dob ? <Text>D: {personalInfo.dob}</Text> : null}
          {personalInfo.nationality ? <Text>N: {personalInfo.nationality}</Text> : null}
        </View>

        {skills && skills.length > 0 ? (
          <View style={{ marginTop: 20, gap: 6 }}>
            <Text style={{ fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#e2e8f0", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "rgba(255,255,255,0.2)", paddingBottom: 2 }}>{t("skills", lang)}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
              {skills.map((skill, idx) => (
                <Text key={idx} style={{ fontSize: 7, paddingHorizontal: 3, paddingVertical: 1, backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff", borderRadius: 2 }}>{skill}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {languages && languages.length > 0 ? (
          <View style={{ marginTop: 20, gap: 4, fontSize: 7.5 }}>
            <Text style={{ fontFamily: "Helvetica-Bold", color: "#e2e8f0", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "rgba(255,255,255,0.2)", paddingBottom: 2 }}>{t("languages", lang)}</Text>
            {languages.map((langItem) => (
              <View key={langItem.id} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#ffffff" }}>{langItem.name}</Text>
                <Text style={{ color: "#cbd5e1" }}>{langItem.level}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Right Column */}
      <View style={{ flex: 1, padding: 25, gap: 15 }}>
        {personalInfo.targetRole ? (
          <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("appliedFor", lang)}: {personalInfo.targetRole}</Text>
        ) : null}

        {professionalSummary ? (
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0", paddingBottom: 2 }}>{t("profile", lang)}</Text>
            <Text style={styles.summaryText}>{professionalSummary}</Text>
          </View>
        ) : null}

        {experience && experience.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0", paddingBottom: 2 }}>{t("workExperience", lang)}</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 4 }} wrap={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                  <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{exp.position} at {exp.company}</Text>
                  <Text style={{ fontSize: 7.5, color: "#64748b" }}>{exp.startDate} - {exp.endDate || t("present", lang)}</Text>
                </View>
                {exp.description ? <Text style={styles.itemDescription}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {education && education.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0", paddingBottom: 2 }}>{t("education", lang)}</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 4 }} wrap={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                  <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{edu.major} at {edu.school}</Text>
                  <Text style={{ fontSize: 7.5, color: "#64748b" }}>{edu.startDate} - {edu.endDate || t("present", lang)}</Text>
                </View>
                {edu.description ? <Text style={styles.itemDescription}>{edu.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {projects && projects.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0", paddingBottom: 2 }}>{t("projects", lang)}</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 4 }} wrap={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                  <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{proj.name}</Text>
                  {proj.link ? <Text style={{ fontSize: 7.5, color: primaryColor }}>{cleanLink(proj.link)}</Text> : null}
                </View>
                {proj.description ? <Text style={styles.itemDescription}>{proj.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {references && references.length > 0 ? (
          <View style={{ gap: 6 }} wrap={false}>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0", paddingBottom: 2 }}>{t("references", lang)}</Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              {references.map((ref) => (
                <View key={ref.id} style={{ flex: 1, fontSize: 8 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{ref.name}</Text>
                  {ref.relationship || ref.company ? <Text style={{ color: "#64748b" }}>{ref.relationship} {ref.company ? `at ${ref.company}` : ""}</Text> : null}
                  {ref.email ? <Text>{t("email", lang)}: {ref.email}</Text> : null}
                  {ref.phone ? <Text>{t("tel", lang)}: {ref.phone}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );

  // Render Fancy Grid Layout
  const renderFancyGrid = () => (
    <View style={{ padding: 25, backgroundColor: "#f8fafc", gap: 15 }}>
      {/* Top Header Card */}
      <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {personalInfo.photo ? (
            <Image
              src={personalInfo.photo}
              style={[
                styles.photo,
                { borderRadius: 6 },
                data.theme?.photoAspectRatio === "4:6" ? { width: 50, height: 75 } : { width: 55, height: 73 }
              ]}
            />
          ) : null}
          <View>
            <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{personalInfo.fullName || "Your Name"}</Text>
            <Text style={{ fontSize: 8, color: "#64748b", textTransform: "uppercase", marginTop: 2 }}>{personalInfo.jobTitle || "Professional Title"}</Text>
            {personalInfo.targetRole ? (
              <Text style={{ fontSize: 7, color: "#94a3b8", textTransform: "uppercase", marginTop: 2 }}>{t("appliedFor", lang)}: {personalInfo.targetRole}</Text>
            ) : null}
          </View>
        </View>
        <View style={{ fontSize: 7.5, color: "#475569", alignItems: "flex-end" }}>
          {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
          {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
          {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
        </View>
      </View>

      {/* Main split grid */}
      <View style={{ flexDirection: "row", gap: 15 }}>
        {/* Left column */}
        <View style={{ width: 160, gap: 15 }}>
          {professionalSummary ? (
            <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 12, gap: 4 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("profile", lang)}</Text>
              <Text style={{ fontSize: 7.5, color: "#475569" }}>{professionalSummary}</Text>
            </View>
          ) : null}

          {skills && skills.length > 0 ? (
            <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 12, gap: 6 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("skills", lang)}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
                {skills.map((skill, idx) => (
                  <Text key={idx} style={{ fontSize: 7, paddingHorizontal: 3, paddingVertical: 1, backgroundColor: "#f1f5f9", color: "#475569", borderRadius: 2 }}>{skill}</Text>
                ))}
              </View>
            </View>
          ) : null}

          {languages && languages.length > 0 ? (
            <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 12, gap: 4 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("languages", lang)}</Text>
              {languages.map((langItem) => (
                <View key={langItem.id} style={{ flexDirection: "row", justifyContent: "space-between", fontSize: 7.5 }}>
                  <Text style={{ color: "#334155", fontFamily: "Helvetica-Bold" }}>{langItem.name}</Text>
                  <Text style={{ color: "#64748b" }}>{langItem.level}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* Right column */}
        <View style={{ flex: 1, gap: 15 }}>
          {experience && experience.length > 0 ? (
            <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 12, gap: 6 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("workExperience", lang)}</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 4 }} wrap={false}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{exp.position} at {exp.company}</Text>
                    <Text style={{ fontSize: 7, color: "#64748b" }}>{exp.startDate} - {exp.endDate || t("present", lang)}</Text>
                  </View>
                  {exp.description ? <Text style={{ fontSize: 7.5, color: "#475569" }}>{exp.description}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {education && education.length > 0 ? (
            <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 12, gap: 6 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("education", lang)}</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 4 }} wrap={false}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{edu.major}</Text>
                    <Text style={{ fontSize: 7, color: "#64748b" }}>{edu.startDate} - {edu.endDate || t("present", lang)}</Text>
                  </View>
                  <Text style={{ fontSize: 7.5, color: "#64748b" }}>{edu.school}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {projects && projects.length > 0 ? (
            <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 12, gap: 6 }}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("projects", lang)}</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 4 }} wrap={false}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{proj.name}</Text>
                    {proj.link ? <Text style={{ fontSize: 7, color: primaryColor }}>{cleanLink(proj.link)}</Text> : null}
                  </View>
                  {proj.description ? <Text style={{ fontSize: 7.5, color: "#475569" }}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {references && references.length > 0 ? (
            <View style={{ backgroundColor: "#ffffff", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 8, padding: 12, gap: 6 }} wrap={false}>
              <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase" }}>{t("references", lang)}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {references.map((ref) => (
                  <View key={ref.id} style={{ flex: 1, fontSize: 7.5 }}>
                    <Text style={{ fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{ref.name}</Text>
                    {ref.relationship || ref.company ? <Text style={{ color: "#64748b" }}>{ref.relationship} {ref.company ? `at ${ref.company}` : ""}</Text> : null}
                    {ref.email ? <Text>{ref.email}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  // Render Simple Left Layout
  const renderSimpleLeft = () => (
    <View style={{ padding: 36, gap: 20 }}>
      {/* Header simple top */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#cbd5e1", paddingBottom: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {personalInfo.photo ? (
            <Image
              src={personalInfo.photo}
              style={[
                styles.photo,
                { borderRadius: 2 },
                data.theme?.photoAspectRatio === "4:6" ? { width: 50, height: 75 } : { width: 55, height: 73 }
              ]}
            />
          ) : null}
          <View>
            <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{personalInfo.fullName || "Your Name"}</Text>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", marginTop: 2 }}>{personalInfo.jobTitle || "Professional Title"}</Text>
            {personalInfo.targetRole ? (
              <Text style={{ fontSize: 7.5, color: "#94a3b8", textTransform: "uppercase", marginTop: 2 }}>{t("appliedFor", lang)}: {personalInfo.targetRole}</Text>
            ) : null}
          </View>
        </View>
        <View style={{ fontSize: 8, color: "#64748b", alignItems: "flex-end" }}>
          {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
          {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
          {personalInfo.location ? <Text>{personalInfo.location}</Text> : null}
        </View>
      </View>

      {/* Row layout sections */}
      <View style={{ gap: 15 }}>
        {professionalSummary ? (
          <View style={{ flexDirection: "row", gap: 20 }} wrap={false}>
            <Text style={{ width: 100, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" }}>{t("profile", lang)}</Text>
            <Text style={[styles.summaryText, { flex: 1 }]}>{professionalSummary}</Text>
          </View>
        ) : null}

        {experience && experience.length > 0 ? (
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Text style={{ width: 100, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" }}>{t("workExperience", lang)}</Text>
            <View style={{ flex: 1, gap: 8 }}>
              {experience.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 4 }} wrap={false}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{exp.position} at {exp.company}</Text>
                    <Text style={{ fontSize: 8, color: "#64748b" }}>{exp.startDate} - {exp.endDate || t("present", lang)}</Text>
                  </View>
                  {exp.description ? <Text style={styles.itemDescription}>{exp.description}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {education && education.length > 0 ? (
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Text style={{ width: 100, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" }}>{t("education", lang)}</Text>
            <View style={{ flex: 1, gap: 8 }}>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 4 }} wrap={false}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{edu.major}</Text>
                    <Text style={{ fontSize: 8, color: "#64748b" }}>{edu.startDate} - {edu.endDate || t("present", lang)}</Text>
                  </View>
                  <Text style={{ fontSize: 8, color: "#64748b" }}>{edu.school}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {projects && projects.length > 0 ? (
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Text style={{ width: 100, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" }}>{t("projects", lang)}</Text>
            <View style={{ flex: 1, gap: 8 }}>
              {projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 4 }} wrap={false}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                    <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{proj.name}</Text>
                    {proj.link ? <Text style={{ fontSize: 8, color: primaryColor }}>{cleanLink(proj.link)}</Text> : null}
                  </View>
                  {proj.description ? <Text style={styles.itemDescription}>{proj.description}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {skills && skills.length > 0 ? (
          <View style={{ flexDirection: "row", gap: 20 }} wrap={false}>
            <Text style={{ width: 100, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" }}>{t("skills", lang)}</Text>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
              {skills.map((skill, idx) => (
                <Text key={idx} style={{ fontSize: 8, paddingHorizontal: 5, paddingVertical: 1.5, backgroundColor: "#f1f5f9", color: "#475569", borderRadius: 2 }}>{skill}</Text>
              ))}
            </View>
          </View>
        ) : null}

        {languages && languages.length > 0 ? (
          <View style={{ flexDirection: "row", gap: 20 }} wrap={false}>
            <Text style={{ width: 100, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" }}>{t("languages", lang)}</Text>
            <View style={{ flex: 1, flexDirection: "row", gap: 15 }}>
              {languages.map((langItem) => (
                <View key={langItem.id} style={{ flexDirection: "row", gap: 4, fontSize: 8 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: "#334155" }}>{langItem.name}</Text>
                  <Text style={{ color: "#64748b" }}>({langItem.level})</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {references && references.length > 0 ? (
          <View style={{ flexDirection: "row", gap: 20 }} wrap={false}>
            <Text style={{ width: 100, fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" }}>{t("references", lang)}</Text>
            <View style={{ flex: 1, flexDirection: "row", gap: 15 }}>
              {references.map((ref) => (
                <View key={ref.id} style={{ flex: 1, fontSize: 8 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{ref.name}</Text>
                  {ref.relationship || ref.company ? <Text style={{ color: "#64748b" }}>{ref.relationship} {ref.company ? `at ${ref.company}` : ""}</Text> : null}
                  {ref.email ? <Text>{ref.email}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );

  // Render Timeline Layout
  const renderTimeline = () => (
    <View style={{ padding: 36, gap: 15 }}>
      {/* Header left border */}
      <View style={{ borderLeftWidth: 3, borderLeftColor: primaryColor, paddingLeft: 12, marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: "#0f172a", textTransform: "uppercase" }}>{personalInfo.fullName || "Your Name"}</Text>
        <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase", marginTop: 2 }}>{personalInfo.jobTitle || "Professional Title"}</Text>
        {personalInfo.targetRole ? (
          <Text style={{ fontSize: 7.5, color: "#94a3b8", textTransform: "uppercase", marginTop: 2 }}>{t("appliedFor", lang)}: {personalInfo.targetRole}</Text>
        ) : null}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8, fontSize: 7.5, color: "#64748b" }}>
          {personalInfo.email ? <Text>Email: {personalInfo.email}</Text> : null}
          {personalInfo.phone ? <Text>Tel: {personalInfo.phone}</Text> : null}
          {personalInfo.location ? <Text>Location: {personalInfo.location}</Text> : null}
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 20 }}>
        {/* Left column */}
        <View style={{ flex: 2, gap: 15 }}>
          {professionalSummary ? (
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("profile", lang)}</Text>
              <Text style={styles.summaryText}>{professionalSummary}</Text>
            </View>
          ) : null}

          {experience && experience.length > 0 ? (
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("workExperience", lang)}</Text>
              <View style={{ borderLeftWidth: 1, borderLeftColor: `${primaryColor}40`, paddingLeft: 10, marginLeft: 3, gap: 8 }}>
                {experience.map((exp) => (
                  <View key={exp.id} wrap={false}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                      <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{exp.position} at {exp.company}</Text>
                      <Text style={{ fontSize: 7.5, color: "#64748b" }}>{exp.startDate} - {exp.endDate || t("present", lang)}</Text>
                    </View>
                    {exp.description ? <Text style={styles.itemDescription}>{exp.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {education && education.length > 0 ? (
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("education", lang)}</Text>
              <View style={{ borderLeftWidth: 1, borderLeftColor: `${primaryColor}40`, paddingLeft: 10, marginLeft: 3, gap: 8 }}>
                {education.map((edu) => (
                  <View key={edu.id} wrap={false}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                      <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{edu.major}</Text>
                      <Text style={{ fontSize: 7.5, color: "#64748b" }}>{edu.startDate} - {edu.endDate || t("present", lang)}</Text>
                    </View>
                    <Text style={{ fontSize: 7.5, color: "#64748b" }}>{edu.school}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>

        {/* Right column */}
        <View style={{ flex: 1, gap: 15 }}>
          {personalInfo.photo ? (
            <Image
              src={personalInfo.photo}
              style={[
                styles.photo,
                { borderRadius: 6, marginBottom: 5 },
                data.theme?.photoAspectRatio === "4:6" ? { width: 60, height: 90 } : { width: 66, height: 88 }
              ]}
            />
          ) : null}

          {skills && skills.length > 0 ? (
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("skills", lang)}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
                {skills.map((skill, idx) => (
                  <Text key={idx} style={{ fontSize: 7, paddingHorizontal: 3, paddingVertical: 1, backgroundColor: "#f1f5f9", color: "#475569", borderRadius: 2 }}>{skill}</Text>
                ))}
              </View>
            </View>
          ) : null}

          {languages && languages.length > 0 ? (
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("languages", lang)}</Text>
              {languages.map((langItem) => (
                <View key={langItem.id} style={{ flexDirection: "row", justifyContent: "space-between", fontSize: 7.5 }}>
                  <Text style={{ color: "#334155", fontFamily: "Helvetica-Bold" }}>{langItem.name}</Text>
                  <Text style={{ color: "#64748b" }}>{langItem.level}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {projects && projects.length > 0 ? (
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("projects", lang)}</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={{ fontSize: 7.5, marginBottom: 4 }} wrap={false}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{proj.name}</Text>
                  {proj.link ? <Text style={{ color: primaryColor }}>{cleanLink(proj.link)}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}

          {references && references.length > 0 ? (
            <View style={{ gap: 4 }} wrap={false}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase", borderBottomWidth: 0.5, borderBottomColor: "#cbd5e1", paddingBottom: 2 }}>{t("references", lang)}</Text>
              {references.map((ref) => (
                <View key={ref.id} style={{ fontSize: 7, marginBottom: 4 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{ref.name}</Text>
                  <Text style={{ color: "#64748b" }}>{ref.email}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  // Helper for Initials
  const getInitials = (name: string) => {
    const cleanName = name || "Your Name";
    const parts = cleanName.trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return "YN";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[parts.length - 1]?.[0] || "")).toUpperCase();
  };

  // Render Portfolio Layout
  const renderPortfolio = () => (
    <View style={{ padding: 36, gap: 15 }}>
      {/* Header initials badge */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#cbd5e1", paddingBottom: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {personalInfo.photo ? (
            <Image
              src={personalInfo.photo}
              style={[
                styles.photo,
                { borderRadius: 50 },
                data.theme?.photoAspectRatio === "4:6" ? { width: 60, height: 60 } : { width: 60, height: 60 }
              ]}
            />
          ) : (
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: primaryColor, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#ffffff", fontSize: 14, fontFamily: "Helvetica-Bold" }}>{getInitials(personalInfo.fullName)}</Text>
            </View>
          )}
          <View>
            <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{personalInfo.fullName || "Your Name"}</Text>
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: primaryColor, textTransform: "uppercase", marginTop: 2 }}>{personalInfo.jobTitle || "Professional Title"}</Text>
            {personalInfo.targetRole ? (
              <Text style={{ fontSize: 7.5, color: "#94a3b8", textTransform: "uppercase", marginTop: 2 }}>{t("appliedFor", lang)}: {personalInfo.targetRole}</Text>
            ) : null}
          </View>
        </View>
        <View style={{ fontSize: 8, color: "#64748b", alignItems: "flex-end" }}>
          {personalInfo.email ? <Text>{personalInfo.email}</Text> : null}
          {personalInfo.phone ? <Text>{personalInfo.phone}</Text> : null}
        </View>
      </View>

      <View style={{ gap: 15 }}>
        {professionalSummary ? (
          <View style={{ gap: 4 }} wrap={false}>
            <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase" }}>{t("profile", lang)}</Text>
            <Text style={styles.summaryText}>{professionalSummary}</Text>
          </View>
        ) : null}

        {experience && experience.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase" }}>{t("workExperience", lang)}</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ flexDirection: "row", gap: 15, marginBottom: 4 }} wrap={false}>
                <Text style={{ width: 100, fontSize: 8, color: "#64748b", fontFamily: "Helvetica-Bold" }}>{exp.startDate} - {exp.endDate || t("present", lang)}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{exp.position} at {exp.company}</Text>
                  {exp.description ? <Text style={styles.itemDescription}>{exp.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {education && education.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase" }}>{t("education", lang)}</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ flexDirection: "row", gap: 15, marginBottom: 4 }} wrap={false}>
                <Text style={{ width: 100, fontSize: 8, color: "#64748b", fontFamily: "Helvetica-Bold" }}>{edu.startDate} - {edu.endDate || t("present", lang)}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{edu.major} at {edu.school}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {projects && projects.length > 0 ? (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase" }}>{t("projects", lang)}</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={{ flexDirection: "row", gap: 15, marginBottom: 4 }} wrap={false}>
                <Text style={{ width: 100, fontSize: 8, color: primaryColor, fontFamily: "Helvetica-Bold" }}>{proj.link ? cleanLink(proj.link) : "Project"}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{proj.name}</Text>
                  {proj.description ? <Text style={styles.itemDescription}>{proj.description}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        <View style={{ flexDirection: "row", gap: 20 }} wrap={false}>
          {skills && skills.length > 0 ? (
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase" }}>{t("skills", lang)}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
                {skills.map((skill, idx) => (
                  <Text key={idx} style={{ fontSize: 7.5, paddingHorizontal: 4, paddingVertical: 1, backgroundColor: "#f1f5f9", color: "#475569", borderRadius: 2 }}>{skill}</Text>
                ))}
              </View>
            </View>
          ) : null}

          {languages && languages.length > 0 ? (
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase" }}>{t("languages", lang)}</Text>
              {languages.map((langItem) => (
                <View key={langItem.id} style={{ flexDirection: "row", justifyContent: "space-between", fontSize: 7.5 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{langItem.name}</Text>
                  <Text style={{ color: "#64748b" }}>{langItem.level}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {references && references.length > 0 ? (
          <View style={{ gap: 6 }} wrap={false}>
            <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#94a3b8", textTransform: "uppercase" }}>{t("references", lang)}</Text>
            <View style={{ flexDirection: "row", gap: 15 }}>
              {references.map((ref) => (
                <View key={ref.id} style={{ flex: 1, fontSize: 8 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", color: "#0f172a" }}>{ref.name}</Text>
                  {ref.relationship || ref.company ? <Text style={{ color: "#64748b" }}>{ref.relationship} {ref.company ? `at ${ref.company}` : ""}</Text> : null}
                  {ref.email ? <Text>{ref.email}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
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
      case "elegant":
        return renderElegant();
      case "executive":
        return renderExecutive();
      case "fancygrid":
        return renderFancyGrid();
      case "simpleleft":
        return renderSimpleLeft();
      case "timeline":
        return renderTimeline();
      case "portfolio":
        return renderPortfolio();
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
