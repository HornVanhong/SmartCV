"use client";

import React, { useState } from "react";
import { CVData, PersonalInfo, Education, Experience, Project, Language, Reference, CVTheme } from "@/types/cv";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X, GraduationCap, Briefcase, FolderGit2, Languages, User, Award, FileText, Upload, UserCheck, Palette } from "lucide-react";

interface CVFormProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const [skillInput, setSkillInput] = useState("");
  const [photoError, setPhotoError] = useState("");

  // Photo handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setPhotoError("Image size exceeds 2MB limit.");
        return;
      }
      setPhotoError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePersonalInfoChange("photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    handlePersonalInfoChange("photo", "");
    setPhotoError("");
  };

  // Personal Info helpers
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  // Summary helper
  const handleSummaryChange = (value: string) => {
    onChange({
      ...data,
      professionalSummary: value,
    });
  };

  // List manipulation helpers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      school: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange({
      ...data,
      experience: [...data.experience, newExp],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: "",
      description: "",
      technologies: "",
      link: "",
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      name: "",
      level: "",
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang],
    });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    });
  };

  const addReference = () => {
    const newRef: Reference = {
      id: `ref-${Date.now()}`,
      name: "",
      relationship: "",
      company: "",
      email: "",
      phone: "",
    };
    onChange({
      ...data,
      references: [...(data.references || []), newRef],
    });
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onChange({
      ...data,
      references: (data.references || []).map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref)),
    });
  };

  const removeReference = (id: string) => {
    onChange({
      ...data,
      references: (data.references || []).filter((ref) => ref.id !== id),
    });
  };

  const handleThemeChange = (field: keyof CVTheme, value: string) => {
    onChange({
      ...data,
      theme: {
        templateId: data.theme?.templateId || "modern",
        primaryColor: data.theme?.primaryColor || "#2563eb",
        [field]: value,
      },
    });
  };

  // Skills helpers
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = skillInput.trim();
    if (cleanSkill && !data.skills.includes(cleanSkill)) {
      onChange({
        ...data,
        skills: [...data.skills, cleanSkill],
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900">CV Editor</h2>
        <p className="text-xs text-slate-500 mt-0.5">Fill in your information to update the preview instantly.</p>
      </div>

      <div className="p-6 lg:overflow-y-auto lg:max-h-[calc(100vh-280px)] space-y-6">
        <Accordion multiple defaultValue={["theme", "personal"]} className="w-full space-y-3 border-none">
          
          {/* Design & Layout (Templates & Colors) */}
          <AccordionItem value="theme" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <Palette className="h-4.5 w-4.5 text-indigo-550" />
                Design & Templates
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-5">
              
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">Select Layout Template</Label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: "modern", name: "Modern", desc: "Double column" },
                    { id: "minimalist", name: "Minimalist", desc: "Traditional layout" },
                    { id: "creative", name: "Creative", desc: "Split sidebar" }
                  ] as const).map((temp) => {
                    const active = (data.theme?.templateId || "modern") === temp.id;
                    return (
                      <button
                        key={temp.id}
                        type="button"
                        onClick={() => handleThemeChange("templateId", temp.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          active
                            ? "border-blue-600 bg-blue-50/40 shadow-xs"
                            : "border-slate-200 hover:border-slate-350 hover:bg-slate-50/50"
                        }`}
                      >
                        <span className={`text-xs font-bold ${active ? "text-blue-600" : "text-slate-800"}`}>
                          {temp.name}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 leading-tight">
                          {temp.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Customization */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <Label className="text-xs font-bold text-slate-700">Primary Theme Color</Label>
                
                {/* Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { hex: "#2563eb", name: "Royal Blue" },
                    { hex: "#059669", name: "Emerald" },
                    { hex: "#4f46e5", name: "Indigo" },
                    { hex: "#7c3aed", name: "Violet" },
                    { hex: "#e11d48", name: "Rose" },
                    { hex: "#d97706", name: "Amber" },
                    { hex: "#0f172a", name: "Charcoal" }
                  ].map((color) => {
                    const active = (data.theme?.primaryColor || "#2563eb") === color.hex;
                    return (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => handleThemeChange("primaryColor", color.hex)}
                        title={color.name}
                        style={{ backgroundColor: color.hex }}
                        className={`h-7 w-7 rounded-full border transition-all cursor-pointer ${
                          active 
                            ? "ring-2 ring-offset-2 ring-blue-600 scale-110 border-white" 
                            : "border-transparent hover:scale-105"
                        }`}
                      />
                    );
                  })}

                  {/* Custom Picker */}
                  <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                    <input
                      type="color"
                      id="customColorPicker"
                      value={data.theme?.primaryColor || "#2563eb"}
                      onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                      className="h-7 w-7 rounded-full border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent"
                    />
                    <Label htmlFor="customColorPicker" className="text-[10px] font-semibold text-slate-500 cursor-pointer">
                      Custom
                    </Label>
                  </div>
                </div>
              </div>

            </AccordionContent>
          </AccordionItem>

          {/* Personal Information */}
          <AccordionItem value="personal" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <User className="h-4.5 w-4.5 text-blue-500" />
                Personal Information
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              {/* Profile Photo Upload */}
              <div className="space-y-2 pb-2 border-b border-slate-100">
                <Label className="text-xs font-semibold text-slate-600">Profile Photo</Label>
                <div className="flex items-center gap-4">
                  {data.personalInfo.photo ? (
                    <div className="relative h-20 w-16 rounded-xl border border-slate-200 overflow-hidden group">
                      <img
                        src={data.personalInfo.photo}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white rounded-xl"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20 w-16 rounded-xl border border-dashed border-slate-350 bg-slate-50/50 text-slate-400">
                      <Upload className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="text-xs h-9 w-full max-w-[240px] cursor-pointer file:text-xs file:font-semibold"
                    />
                    {photoError ? (
                      <span className="text-[10px] text-rose-500 font-medium">{photoError}</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Recommended: Square image, PNG or JPG, max 2MB.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-semibold text-slate-600">Full Name</Label>
                  <Input
                    id="fullName"
                    value={data.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                    placeholder="John Doe"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="jobTitle" className="text-xs font-semibold text-slate-600">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={data.personalInfo.jobTitle}
                    onChange={(e) => handlePersonalInfoChange("jobTitle", e.target.value)}
                    placeholder="Senior Developer"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="targetRole" className="text-xs font-semibold text-slate-600">Target Role / Applied For</Label>
                  <Input
                    id="targetRole"
                    value={data.personalInfo.targetRole || ""}
                    onChange={(e) => handlePersonalInfoChange("targetRole", e.target.value)}
                    placeholder="e.g. Staff Architect"
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-600">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    placeholder="john@example.com"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold text-slate-600">Phone Number</Label>
                  <Input
                    id="phone"
                    value={data.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location" className="text-xs font-semibold text-slate-600">Location</Label>
                  <Input
                    id="location"
                    value={data.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                    placeholder="City, State"
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="github" className="text-xs font-semibold text-slate-600">GitHub Profile</Label>
                  <Input
                    id="github"
                    value={data.personalInfo.github}
                    onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                    placeholder="github.com/username"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="linkedin" className="text-xs font-semibold text-slate-600">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/username"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="portfolio" className="text-xs font-semibold text-slate-600">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    value={data.personalInfo.portfolio}
                    onChange={(e) => handlePersonalInfoChange("portfolio", e.target.value)}
                    placeholder="portfolio.com"
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Professional Summary */}
          <AccordionItem value="summary" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <FileText className="h-4.5 w-4.5 text-blue-500" />
                Professional Summary
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="space-y-1.5">
                <Label htmlFor="summaryText" className="text-xs font-semibold text-slate-600">About Me</Label>
                <Textarea
                  id="summaryText"
                  rows={4}
                  value={data.professionalSummary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  placeholder="Summarize your professional experience, key strengths, and career highlights..."
                  className="text-xs resize-none"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Work Experience */}
          <AccordionItem value="experience" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <Briefcase className="h-4.5 w-4.5 text-blue-500" />
                Work Experience
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="relative p-4 border border-slate-200 rounded-xl bg-slate-50/30 space-y-4">
                  <div className="absolute top-3 right-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(exp.id)}
                      className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Entry #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Company Name</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Company Inc."
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Position / Job Title</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        placeholder="Senior Software Engineer"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Start Date</Label>
                      <Input
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        placeholder="e.g., 2021-06 or June 2021"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">End Date</Label>
                      <Input
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        placeholder="e.g., Present or June 2023"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-600">Description</Label>
                    <Textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Detail your responsibilities, key projects, and achievements..."
                      className="text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addExperience}
                className="w-full flex items-center justify-center gap-2 h-9 text-xs font-semibold border-dashed border-slate-350 hover:bg-slate-50 text-slate-600"
              >
                <Plus className="h-4 w-4" />
                Add Experience
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Education */}
          <AccordionItem value="education" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <GraduationCap className="h-4.5 w-4.5 text-blue-500" />
                Education
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="relative p-4 border border-slate-200 rounded-xl bg-slate-50/30 space-y-4">
                  <div className="absolute top-3 right-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(edu.id)}
                      className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Entry #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">School / University</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                        placeholder="University Name"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Major / Degree</Label>
                      <Input
                        value={edu.major}
                        onChange={(e) => updateEducation(edu.id, "major", e.target.value)}
                        placeholder="B.S. in Computer Science"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Start Date</Label>
                      <Input
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                        placeholder="e.g., 2016-09"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">End Date</Label>
                      <Input
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                        placeholder="e.g., 2020-05"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-600">Additional Description</Label>
                    <Textarea
                      rows={2}
                      value={edu.description}
                      onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                      placeholder="Graduated with honors, GPA, key courses..."
                      className="text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addEducation}
                className="w-full flex items-center justify-center gap-2 h-9 text-xs font-semibold border-dashed border-slate-350 hover:bg-slate-50 text-slate-600"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Projects */}
          <AccordionItem value="projects" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <FolderGit2 className="h-4.5 w-4.5 text-blue-500" />
                Projects
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              {data.projects.map((proj, index) => (
                <div key={proj.id} className="relative p-4 border border-slate-200 rounded-xl bg-slate-50/30 space-y-4">
                  <div className="absolute top-3 right-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProject(proj.id)}
                      className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Entry #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Project Name</Label>
                      <Input
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                        placeholder="E-commerce Web App"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Project Link</Label>
                      <Input
                        value={proj.link}
                        onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                        placeholder="github.com/yourusername/project"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-600">Technologies Used</Label>
                    <Input
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, "technologies", e.target.value)}
                      placeholder="Next.js, Tailwind CSS, TypeScript"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-600">Description</Label>
                    <Textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                      placeholder="Explain what you built, what challenge you resolved, and final results..."
                      className="text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addProject}
                className="w-full flex items-center justify-center gap-2 h-9 text-xs font-semibold border-dashed border-slate-350 hover:bg-slate-50 text-slate-600"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Skills */}
          <AccordionItem value="skills" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <Award className="h-4.5 w-4.5 text-blue-500" />
                Skills
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g. Next.js, Docker, Webpack"
                  className="h-9 text-xs flex-1"
                />
                <Button type="submit" size="sm" className="h-9 text-xs bg-slate-900 hover:bg-slate-800 text-white font-medium">
                  Add Skill
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 pt-1">
                {data.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 border-none font-semibold transition-colors"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {data.skills.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No skills added yet.</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Languages */}
          <AccordionItem value="languages" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <Languages className="h-4.5 w-4.5 text-blue-500" />
                Languages
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              {data.languages.map((lang, index) => (
                <div key={lang.id} className="relative p-4 border border-slate-200 rounded-xl bg-slate-50/30 space-y-4">
                  <div className="absolute top-3 right-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLanguage(lang.id)}
                      className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Language #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Language Name</Label>
                      <Input
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                        placeholder="e.g. English, French"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Proficiency Level</Label>
                      <Input
                        value={lang.level}
                        onChange={(e) => updateLanguage(lang.id, "level", e.target.value)}
                        placeholder="e.g. Native, Bilingual, Fluent, Basic"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addLanguage}
                className="w-full flex items-center justify-center gap-2 h-9 text-xs font-semibold border-dashed border-slate-350 hover:bg-slate-50 text-slate-600"
              >
                <Plus className="h-4 w-4" />
                Add Language
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* References */}
          <AccordionItem value="references" className="border border-slate-200 rounded-xl px-4 py-1 bg-white shadow-none">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
                <UserCheck className="h-4.5 w-4.5 text-blue-500" />
                References
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              {(data.references || []).map((ref, index) => (
                <div key={ref.id} className="relative p-4 border border-slate-200 rounded-xl bg-slate-50/30 space-y-4">
                  <div className="absolute top-3 right-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeReference(ref.id)}
                      className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reference #{index + 1}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Reference Name</Label>
                      <Input
                        value={ref.name}
                        onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                        placeholder="John Doe"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Relationship</Label>
                      <Input
                        value={ref.relationship}
                        onChange={(e) => updateReference(ref.id, "relationship", e.target.value)}
                        placeholder="e.g. Former Manager, Mentor"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-1">
                      <Label className="text-xs font-semibold text-slate-600">Company</Label>
                      <Input
                        value={ref.company}
                        onChange={(e) => updateReference(ref.id, "company", e.target.value)}
                        placeholder="e.g. Stripe"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Email</Label>
                      <Input
                        value={ref.email}
                        onChange={(e) => updateReference(ref.id, "email", e.target.value)}
                        placeholder="john.doe@company.com"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-slate-600">Phone</Label>
                      <Input
                        value={ref.phone}
                        onChange={(e) => updateReference(ref.id, "phone", e.target.value)}
                        placeholder="+1 (555) 012-3456"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addReference}
                className="w-full flex items-center justify-center gap-2 h-9 text-xs font-semibold border-dashed border-slate-350 hover:bg-slate-50 text-slate-600"
              >
                <Plus className="h-4 w-4" />
                Add Reference
              </Button>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
};
