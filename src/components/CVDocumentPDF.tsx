import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

// Create styles mimicking CVTemplateModern
const styles = StyleSheet.create({
  page: {
    padding: 36, // approx 13mm margin
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
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a", // slate-950
    lineHeight: 1.15,
  },
  title: {
    fontSize: 12,
    color: "#475569",
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
});

interface CVDocumentPDFProps {
  data: CVData;
}

export const CVDocumentPDF: React.FC<CVDocumentPDFProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, skills, projects, experience, languages, references } = data;

  const cleanLink = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "");
  };

  return (
    <Document title={`${personalInfo.fullName.replace(/\s+/g, "_")}_CV`}>
      <Page size="A4" style={styles.page}>
        
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
                <Text style={styles.targetRole}>Applied for: {personalInfo.targetRole}</Text>
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

        {/* Content sections */}
        
        {/* Summary */}
        {professionalSummary ? (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{professionalSummary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {experience && experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
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
            <Text style={styles.sectionTitle}>Education</Text>
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
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer} wrap={false}>
                <View style={styles.projectHeader}>
                  <View style={styles.projectNameContainer}>
                    <Text style={styles.itemTitle}>{proj.name}</Text>
                  </View>
                  {proj.link ? (
                    <Link src={`https://${proj.link}`} style={styles.projectLink}>
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
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.badgeContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.badge}>{skill}</Text>
                ))}
              </View>
            </View>
          ) : null}

          {/* Languages */}
          {languages && languages.length > 0 ? (
            <View style={styles.languagesColumn}>
              <Text style={styles.sectionTitle}>Languages</Text>
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
            <Text style={styles.sectionTitle}>References</Text>
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

      </Page>
    </Document>
  );
};
