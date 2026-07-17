"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
import { CVData, PersonalInfo, Education, Experience, Project, Language, Reference, CVTheme } from "@/types/cv";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X, GraduationCap, Briefcase, FolderGit2, Languages, User, Award, FileText, Upload, UserCheck, Palette } from "lucide-react";
import { translations } from "@/lib/translations";

const STANDARD_GOOGLE_FONTS = ["Inter", "Poppins", "Roboto", "Lora", "Playfair Display", "Noto Sans Khmer"];
const KHMER_GOOGLE_FONT_SUGGESTIONS = [
  "Angkor", "Battambang", "Bayon", "Bokor", "Chenla", "Content", "Dangrek", "Fasthand", "Freehand",
  "Hanuman", "Kantumruy", "Kantumruy Pro", "Kdam Thmor Pro", "Khmer", "Khula", "Koh Santepheap",
  "Koulen", "Krahand", "Moul", "Moulpali", "Noto Sans Khmer", "Noto Serif Khmer", "Odor Mean Chey",
  "Preahvihear", "Siemreap", "Srisakdi", "Suwannaphum", "Taprom"
];
const GOOGLE_FONT_SUGGESTIONS = Array.from(new Set([
  ...KHMER_GOOGLE_FONT_SUGGESTIONS,
  "ABeeZee", "Abril Fatface", "Alegreya", "Archivo", "Arimo", "Bebas Neue", "Bitter", "Cairo",
  "Cinzel", "Cormorant Garamond", "DM Sans", "DM Serif Display", "Dancing Script", "EB Garamond",
  "Exo 2", "Fira Sans", "Fjalla One", "Forum", "IBM Plex Sans", "IBM Plex Serif", "Inconsolata",
  "Indie Flower", "Inter", "Josefin Sans", "Kanit", "Lato", "Libre Baskerville", "Libre Franklin",
  "Lora", "Manrope", "Merriweather", "Montserrat", "Mukta", "Noto Sans", "Noto Sans Khmer",
  "Noto Serif Khmer", "Nunito", "Open Sans", "Oswald", "Outfit", "Pacifico", "Playfair Display",
  "Plus Jakarta Sans", "Poppins", "Prompt", "PT Sans", "Quicksand", "Raleway", "Roboto",
  "Roboto Condensed", "Roboto Slab", "Rubik", "Sarabun", "Source Sans 3", "Space Grotesk",
  "Teko", "Ubuntu", "Work Sans", "Yeseva One"
]));

interface CVFormProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const [skillInput, setSkillInput] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [logoError, setLogoError] = useState("");
  const [isCustomGoogleFont, setIsCustomGoogleFont] = useState(
    !STANDARD_GOOGLE_FONTS.includes(data.theme?.fontFamily || "Inter")
  );
  const selectedGoogleFont = data.theme?.fontFamily || "";
  const matchingGoogleFonts = GOOGLE_FONT_SUGGESTIONS.filter((font) =>
    font.toLowerCase().includes(selectedGoogleFont.trim().toLowerCase())
  ).slice(0, 30);
  
  // Template filter states
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [filterStyle, setFilterStyle] = useState<string>("All");
  const [filterLanguage, setFilterLanguage] = useState<string>("All");

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

  // Logo handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setLogoError("Image size exceeds 2MB limit.");
        return;
      }
      setLogoError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePersonalInfoChange("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    handlePersonalInfoChange("logo", "");
    setLogoError("");
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

  const handleHighlightTextarea = (textareaId: string, value: string, onChangeFn: (val: string) => void) => {
    const el = document.getElementById(textareaId) as HTMLTextAreaElement;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (start === end) {
      alert("Please select some text inside the text area first, then click this button to highlight it!");
      return;
    }
    const selectedText = value.substring(start, end);
    const newValue = value.substring(0, start) + `==${selectedText}==` + value.substring(end);
    onChangeFn(newValue);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start, end + 4);
    }, 50);
  };

  const renderHighlightButton = (textareaId: string, value: string, onChangeFn: (val: string) => void) => {
    return (
      <button
        type="button"
        onClick={() => handleHighlightTextarea(textareaId, value, onChangeFn)}
        className="text-[10px] text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors font-semibold shrink-0 ml-auto"
        title="Select text in the editor and click to highlight it in yellow"
      >
        <span>✨</span> Highlight Selection
      </button>
    );
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

  const updateEducation = (id: string, field: keyof Education, value: string | boolean | number) => {
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

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean | number) => {
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

  const updateProject = (id: string, field: keyof Project, value: string | boolean | number) => {
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

  const updateLanguage = (id: string, field: keyof Language, value: string | number) => {
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

  const updateReference = (id: string, field: keyof Reference, value: string | boolean | number) => {
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

  const handleThemeChange = (field: keyof CVTheme, value: string | number | boolean) => {
    onChange({
      ...data,
      theme: {
        templateId: data.theme?.templateId || "modern",
        primaryColor: data.theme?.primaryColor || "#2563eb",
        ...data.theme,
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
              
              <div className="space-y-4">
                {/* Category, Style, Language Filters */}
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  {/* Category Filter */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "Tech", "Executive", "Design", "General"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFilterCategory(cat)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                            filterCategory === cat
                              ? "bg-indigo-650 border-indigo-650 text-white shadow-xs"
                              : "bg-slate-55 border-slate-200 text-slate-650 hover:bg-slate-100 hover:border-slate-300"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Filter */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Style</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "Modern", "Minimalist", "Creative", "Professional"].map((sty) => (
                        <button
                          key={sty}
                          type="button"
                          onClick={() => setFilterStyle(sty)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                            filterStyle === sty
                              ? "bg-emerald-650 border-emerald-650 text-white shadow-xs"
                              : "bg-slate-55 border-slate-200 text-slate-650 hover:bg-slate-100 hover:border-slate-300"
                          }`}
                        >
                          {sty}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language Filter */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Language</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["All", "English", "Khmer"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setFilterLanguage(lang)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                            filterLanguage === lang
                              ? "bg-amber-650 border-amber-650 text-white shadow-xs"
                              : "bg-slate-55 border-slate-200 text-slate-650 hover:bg-slate-100 hover:border-slate-300"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Templates Grid Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs font-bold text-slate-700">Select Layout Template</Label>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterCategory("All");
                        setFilterStyle("All");
                        setFilterLanguage("All");
                      }}
                      className="text-[10px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                  
                  {(() => {
                    const templates = [
                      { id: "modern", name: "Modern Tech", desc: "Double column layout", category: "Tech", style: "Modern", languages: ["English", "Khmer"] },
                      { id: "minimalist", name: "Classic Minimalist", desc: "Clean centered layout", category: "General", style: "Minimalist", languages: ["English", "Khmer"] },
                      { id: "creative", name: "Creative Split", desc: "Modern split sidebar", category: "Design", style: "Creative", languages: ["English", "Khmer"] },
                      { id: "professional", name: "Professional Executive", desc: "Banner header design", category: "Executive", style: "Professional", languages: ["English", "Khmer"] },
                      { id: "elegant", name: "Elegant Academic", desc: "Serif font centered layout", category: "General", style: "Elegant", languages: ["English", "Khmer"] },
                      { id: "executive", name: "Executive Contrast", desc: "Dark panel sidebar style", category: "Executive", style: "Professional", languages: ["English", "Khmer"] },
                      { id: "fancygrid", name: "Fancy Grid", desc: "Card widget layout design", category: "Design", style: "Creative", languages: ["English", "Khmer"] },
                      { id: "simpleleft", name: "Simple Left Margin", desc: "Left sidebar headers layout", category: "General", style: "Minimalist", languages: ["English", "Khmer"] },
                      { id: "timeline", name: "Timeline Accent", desc: "Timeline dots experience list", category: "Tech", style: "Modern", languages: ["English", "Khmer"] },
                      { id: "portfolio", name: "Initial Portfolio", desc: "Initials branding badge header", category: "Design", style: "Creative", languages: ["English", "Khmer"] },
                      { id: "canvacolumn", name: "Canva Two Column", desc: "Elegant navy sidebar with linear progress and timeline dots", category: "Design", style: "Creative", languages: ["English", "Khmer"] },
                      { id: "kshrd", name: "Korea Software HRD", desc: "Official HRD center student background CV template", category: "Academic", style: "Professional", languages: ["English", "Khmer"] }
                    ] as const;

                    const filtered = templates.filter((temp) => {
                      const matchCategory = filterCategory === "All" || temp.category === filterCategory;
                      const matchStyle = filterStyle === "All" || temp.style === filterStyle;
                      const matchLanguage = filterLanguage === "All" || (temp.languages as readonly string[]).includes(filterLanguage);
                      return matchCategory && matchStyle && matchLanguage;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-6 text-xs text-slate-400 font-medium bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                          No templates match your filters.
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-2 gap-3">
                        {filtered.map((temp) => {
                          const active = (data.theme?.templateId || "modern") === temp.id;
                          return (
                            <button
                              key={temp.id}
                              type="button"
                              onClick={() => handleThemeChange("templateId", temp.id)}
                              className={`flex flex-col items-start justify-center p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                active
                                  ? "border-blue-600 bg-blue-50/30 shadow-xs ring-1 ring-blue-500/20"
                                  : "border-slate-200 hover:border-slate-350 hover:bg-slate-50/50"
                              }`}
                            >
                              <span className={`text-xs font-bold ${active ? "text-blue-600" : "text-slate-800"}`}>
                                {temp.name}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-1 leading-tight">
                                {temp.desc}
                              </span>
                              <div className="flex gap-1 mt-2 flex-wrap">
                                <span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-sm">{temp.category}</span>
                                <span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-sm">{temp.style}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Document Language */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <Label className="text-xs font-bold text-slate-700">Document Language</Label>
                <div className="flex gap-2">
                  {[
                    { code: "en", name: "English (EN)" },
                    { code: "km", name: "Khmer (KH)" }
                  ].map((langOpt) => {
                    const active = (data.theme?.language || "en") === langOpt.code;
                    return (
                      <button
                        key={langOpt.code}
                        type="button"
                        onClick={() => handleThemeChange("language", langOpt.code)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          active
                            ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                        }`}
                      >
                        {langOpt.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience Layout Mode */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <Label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span>Experience Layout Mode</span>
                  <span className="text-[10px] font-normal text-slate-400">(Order sections)</span>
                </Label>
                <div className="flex gap-2">
                  {[
                    { code: "experienced", name: "Experienced (Work First)", desc: "Show professional career history first" },
                    { code: "entry", name: "Entry-Level (Education First)", desc: "Show academic credentials & projects first" }
                  ].map((levelOpt) => {
                    const active = (data.theme?.experienceLevel || "experienced") === levelOpt.code;
                    return (
                      <button
                        key={levelOpt.code}
                        type="button"
                        onClick={() => handleThemeChange("experienceLevel", levelOpt.code)}
                        className={`flex-1 p-2.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-center gap-0.5 ${
                          active
                            ? "bg-indigo-50/40 border-indigo-600 ring-1 ring-indigo-500/20"
                            : "bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`text-xs font-bold ${active ? "text-indigo-650" : "text-slate-800"}`}>
                          {levelOpt.name}
                        </span>
                        <span className="text-[9px] text-slate-400 leading-tight">
                          {levelOpt.desc}
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

              {/* Document Background Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                {/* Main Column Background */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700">Main Content Background</Label>
                  
                  {/* Presets */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { hex: "#ffffff", name: "White" },
                      { hex: "#faf8f5", name: "Warm Cream" },
                      { hex: "#f0f9ff", name: "Baby Blue" },
                      { hex: "#fdf2f8", name: "Baby Pink" },
                      { hex: "#faf5ff", name: "Lavender" },
                      { hex: "#f0fdf4", name: "Soft Mint" },
                      { hex: "#f8fafc", name: "Pale Slate" }
                    ].map((color) => {
                      const active = (data.theme?.backgroundColor || "#ffffff") === color.hex;
                      return (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() => handleThemeChange("backgroundColor", color.hex)}
                          title={color.name}
                          style={{ backgroundColor: color.hex }}
                          className={`h-6 w-6 rounded-full border transition-all cursor-pointer shadow-xs ${
                            active 
                              ? "ring-2 ring-offset-1 ring-indigo-650 scale-110 border-white" 
                              : "border-slate-200 hover:scale-105"
                          }`}
                        />
                      );
                    })}

                    {/* Custom Picker */}
                    <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200">
                      <input
                        type="color"
                        id="customBgColorPicker"
                        value={data.theme?.backgroundColor || "#ffffff"}
                        onChange={(e) => handleThemeChange("backgroundColor", e.target.value)}
                        className="h-6 w-6 rounded-full border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent"
                      />
                      <Label htmlFor="customBgColorPicker" className="text-[10px] font-semibold text-slate-500 cursor-pointer">
                        Custom
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Sidebar Background (Only visible if the template has a sidebar) */}
                {["creative", "canvacolumn", "executive"].includes(data.theme?.templateId || "modern") ? (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700">Sidebar Column Background</Label>
                    
                    {/* Presets */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        { hex: "", name: "Default" },
                        { hex: "#ffffff", name: "White" },
                        { hex: "#f0f9ff", name: "Baby Blue" },
                        { hex: "#fdf2f8", name: "Baby Pink" },
                        { hex: "#faf5ff", name: "Lavender" },
                        { hex: "#f0fdf4", name: "Soft Mint" },
                        { hex: "#1e293b", name: "Slate Dark" }
                      ].map((color) => {
                        const active = (data.theme?.sidebarBackgroundColor || "") === color.hex;
                        return (
                          <button
                            key={color.hex}
                            type="button"
                            onClick={() => handleThemeChange("sidebarBackgroundColor", color.hex)}
                            title={color.name}
                            style={{ 
                              backgroundColor: color.hex || "#e2e8f0",
                              backgroundImage: color.hex ? "none" : "linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)",
                              backgroundSize: color.hex ? "auto" : "8px 8px",
                              backgroundPosition: color.hex ? "0 0" : "0 0, 0 4px, 4px -4px, -4px 0px"
                            }}
                            className={`h-6 w-6 rounded-full border transition-all cursor-pointer shadow-xs ${
                              active 
                                ? "ring-2 ring-offset-1 ring-indigo-650 scale-110 border-white" 
                                : "border-slate-200 hover:scale-105"
                            }`}
                          />
                        );
                      })}

                      {/* Custom Picker */}
                      <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200">
                        <input
                          type="color"
                          id="customSidebarBgColorPicker"
                          value={data.theme?.sidebarBackgroundColor || "#f1f5f9"}
                          onChange={(e) => handleThemeChange("sidebarBackgroundColor", e.target.value)}
                          className="h-6 w-6 rounded-full border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent"
                        />
                        <Label htmlFor="customSidebarBgColorPicker" className="text-[10px] font-semibold text-slate-500 cursor-pointer">
                          Custom
                        </Label>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-4">
                <Label className="text-xs font-bold text-slate-700">Document Typography</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="font-family" className="text-[11px] font-semibold text-slate-600">Google Font</Label>
                    <select
                      id="font-family"
                      value={isCustomGoogleFont ? "__custom" : (data.theme?.fontFamily || "Inter")}
                      onChange={(e) => {
                        if (e.target.value === "__custom") {
                          setIsCustomGoogleFont(true);
                          handleThemeChange("fontFamily", "");
                          return;
                        }
                        setIsCustomGoogleFont(false);
                        handleThemeChange("fontFamily", e.target.value);
                      }}
                      className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Lora">Lora</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Noto Sans Khmer">Noto Sans Khmer</option>
                      <option value="__custom">Other Google Font…</option>
                    </select>
                    {isCustomGoogleFont ? (
                      <div className="space-y-1.5">
                        <Input
                          value={selectedGoogleFont}
                          onChange={(e) => handleThemeChange("fontFamily", e.target.value)}
                          placeholder="Search Google Fonts, e.g. Roboto Condensed"
                          className="h-8 text-xs"
                          aria-label="Search Google Font family names"
                        />
                        <div className="max-h-44 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1">
                          <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                            {selectedGoogleFont ? "Matching Google Fonts" : "Khmer & Google Font Results"}
                          </p>
                          {matchingGoogleFonts.length > 0 ? matchingGoogleFonts.map((font) => (
                            <button
                              key={font}
                              type="button"
                              onClick={() => {
                                handleThemeChange("fontFamily", font);
                                setIsCustomGoogleFont(!STANDARD_GOOGLE_FONTS.includes(font));
                              }}
                              className="flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                              style={{ fontFamily: `"${font}", sans-serif` }}
                            >
                              {font}
                            </button>
                          )) : (
                            <p className="px-2 py-1.5 text-[11px] text-slate-400">No suggestion found. You can still use the font name you typed.</p>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="font-color" className="text-[11px] font-semibold text-slate-600">Text Color</Label>
                    <div className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2">
                      <input
                        id="font-color"
                        type="color"
                        value={data.theme?.fontColor || "#1e293b"}
                        onChange={(e) => handleThemeChange("fontColor", e.target.value)}
                        className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                      />
                      <span className="text-xs font-medium uppercase text-slate-500">{data.theme?.fontColor || "#1e293b"}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="text-[11px] font-semibold text-slate-600">Font Size</Label>
                    <span className="text-xs font-bold tabular-nums text-blue-700">{data.theme?.fontSize ?? 100}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-slate-400">Small</span>
                    <input
                      id="font-size"
                      type="range"
                      min="85"
                      max="115"
                      step="5"
                      value={data.theme?.fontSize ?? 100}
                      onChange={(e) => handleThemeChange("fontSize", Number(e.target.value))}
                      className="h-1.5 flex-1 cursor-pointer accent-blue-600"
                    />
                    <span className="text-[10px] font-medium text-slate-400">Large</span>
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
              <div className="space-y-4 pb-4 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
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
                      <Label className="text-xs font-semibold text-slate-650">Profile Photo</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="text-xs h-9 w-full max-w-[240px] cursor-pointer file:text-xs file:font-semibold"
                      />
                      {photoError ? (
                        <span className="text-[10px] text-rose-500 font-medium">{photoError}</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Recommended: Portrait image, PNG or JPG, max 2MB.</span>
                      )}
                    </div>
                  </div>

                  {/* Aspect Ratio Picker */}
                  <div className="space-y-1.5 shrink-0">
                    <Label className="text-xs font-semibold text-slate-650 block">Photo Size (Aspect Ratio)</Label>
                    <div className="flex gap-2">
                      {([
                        { id: "3:4", label: "3x4 Portrait" },
                        { id: "4:6", label: "4x6 Portrait" }
                      ] as const).map((ratio) => {
                        const active = (data.theme?.photoAspectRatio || "3:4") === ratio.id;
                        return (
                          <button
                            key={ratio.id}
                            type="button"
                            onClick={() => handleThemeChange("photoAspectRatio", ratio.id)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                              active
                                ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-50/50"
                            }`}
                          >
                            {ratio.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor="photo-scale" className="text-xs font-semibold text-slate-650">
                      Portrait Size <span className="font-normal text-slate-400">(KSHRD template)</span>
                    </Label>
                    <span className="text-xs font-bold tabular-nums text-blue-700">{data.theme?.photoScale ?? 100}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-slate-400">Small</span>
                    <input
                      id="photo-scale"
                      type="range"
                      min="80"
                      max="125"
                      step="5"
                      value={data.theme?.photoScale ?? 100}
                      onChange={(e) => handleThemeChange("photoScale", Number(e.target.value))}
                      className="h-1.5 flex-1 cursor-pointer accent-blue-600"
                      aria-label="KSHRD portrait size"
                    />
                    <span className="text-[10px] font-medium text-slate-400">Large</span>
                    <button
                      type="button"
                      onClick={() => handleThemeChange("photoScale", 100)}
                      className="text-[10px] font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor="logo-scale" className="text-xs font-semibold text-slate-650">
                      Logo Size <span className="font-normal text-slate-400">(KSHRD header)</span>
                    </Label>
                    <span className="text-xs font-bold tabular-nums text-blue-700">{data.theme?.logoScale ?? 100}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-slate-400">Small</span>
                    <input
                      id="logo-scale"
                      type="range"
                      min="80"
                      max="250"
                      step="10"
                      value={data.theme?.logoScale ?? 100}
                      onChange={(e) => handleThemeChange("logoScale", Number(e.target.value))}
                      className="h-1.5 flex-1 cursor-pointer accent-blue-600"
                      aria-label="KSHRD header logo size"
                    />
                    <span className="text-[10px] font-medium text-slate-400">Large</span>
                    <button
                      type="button"
                      onClick={() => handleThemeChange("logoScale", 100)}
                      className="text-[10px] font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                  {data.personalInfo.logo ? (
                    <div className="relative h-16 w-16 rounded-xl border border-slate-200 overflow-hidden group flex items-center justify-center bg-white p-1">
                      <img
                        src={data.personalInfo.logo}
                        alt="Logo Preview"
                        className="h-full w-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white rounded-xl cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-16 w-16 rounded-xl border border-dashed border-slate-350 bg-slate-50/50 text-slate-400">
                      <Upload className="h-4 w-4" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Label className="text-xs font-semibold text-slate-650">Custom Header Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="text-xs h-9 w-full max-w-[240px] cursor-pointer file:text-xs file:font-semibold"
                    />
                    {logoError ? (
                      <span className="text-[10px] text-rose-500 font-medium">{logoError}</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Optional: Replaces default HRD Center logo in KSHRD layout. PNG/JPG, max 2MB.</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="dob" className="text-xs font-semibold text-slate-600">Date of Birth</Label>
                  <Input
                    id="dob"
                    value={data.personalInfo.dob || ""}
                    onChange={(e) => handlePersonalInfoChange("dob", e.target.value)}
                    placeholder="e.g. Feb 19th, 2002"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nationality" className="text-xs font-semibold text-slate-600">Nationality</Label>
                  <Input
                    id="nationality"
                    value={data.personalInfo.nationality || ""}
                    onChange={(e) => handlePersonalInfoChange("nationality", e.target.value)}
                    placeholder="e.g. Cambodian"
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="gender" className="text-xs font-semibold text-slate-600">Gender / Sex</Label>
                  <Input
                    id="gender"
                    value={data.personalInfo.gender || ""}
                    onChange={(e) => handlePersonalInfoChange("gender", e.target.value)}
                    placeholder="e.g. Male"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="placeOfBirth" className="text-xs font-semibold text-slate-600">Place of Birth</Label>
                  <Input
                    id="placeOfBirth"
                    value={data.personalInfo.placeOfBirth || ""}
                    onChange={(e) => handlePersonalInfoChange("placeOfBirth", e.target.value)}
                    placeholder="e.g. Kohkong"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="maritalStatus" className="text-xs font-semibold text-slate-600">Marital Status</Label>
                  <Input
                    id="maritalStatus"
                    value={data.personalInfo.maritalStatus || ""}
                    onChange={(e) => handlePersonalInfoChange("maritalStatus", e.target.value)}
                    placeholder="e.g. Single"
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="health" className="text-xs font-semibold text-slate-600">Health Status</Label>
                  <Input
                    id="health"
                    value={data.personalInfo.health || ""}
                    onChange={(e) => handlePersonalInfoChange("health", e.target.value)}
                    placeholder="e.g. Excellent"
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
                <div className="flex justify-between items-center gap-2">
                  <Label htmlFor="summaryText" className="text-xs font-semibold text-slate-600">About Me</Label>
                  {renderHighlightButton("summaryText", data.professionalSummary, handleSummaryChange)}
                </div>
                <div data-color-mode="light" className="text-xs mt-1">
                  <MDEditor
                    value={data.professionalSummary}
                    onChange={(val) => handleSummaryChange(val || "")}
                    preview="edit"
                    height={160}
                    textareaProps={{
                      placeholder: "Summarize your professional experience, key strengths, and career highlights..."
                    }}
                  />
                </div>

                {data.theme?.pagesCount && data.theme.pagesCount > 1 ? (
                  <div className="flex items-center gap-2 pt-2">
                    <Label htmlFor="summary-pg" className="text-xs font-semibold text-slate-500">Show on Page:</Label>
                    <select
                      id="summary-pg"
                      value={data.theme.summaryPage || 1}
                      onChange={(e) => handleThemeChange("summaryPage", parseInt(e.target.value) || 1)}
                      className="h-7 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs focus-visible:outline-none cursor-pointer font-semibold text-slate-650"
                    >
                      {Array.from({ length: data.theme.pagesCount }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                      ))}
                    </select>
                  </div>
                ) : null}
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
              {/* Professional Pitch for Entry-Level / No Experience */}
              <div className="p-4 border border-indigo-100 rounded-xl bg-indigo-50/10 space-y-3">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="show-pitch-checkbox"
                    checked={!!data.theme?.showPitch}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      handleThemeChange("showPitch", checked);
                      // Pre-fill pitch if checking and empty
                      if (checked && !data.theme?.professionalPitch) {
                        const lang = data.theme?.language || "en";
                        const defaultPitch = lang === "km" 
                          ? translations.km.defaultPitch 
                          : translations.en.defaultPitch;
                        handleThemeChange("professionalPitch", defaultPitch);
                      }
                    }}
                    className="h-4 w-4 mt-0.5 rounded border-slate-350 text-indigo-650 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex flex-col gap-0.5">
                    <Label htmlFor="show-pitch-checkbox" className="text-xs font-bold text-slate-800 cursor-pointer select-none leading-none">
                      No work experience yet?
                    </Label>
                    <span className="text-[10px] text-slate-400">Show a compelling career objective/pitch to interest HR instead.</span>
                  </div>
                </div>

                {data.theme?.showPitch ? (
                  <div className="space-y-2 pt-2 border-t border-slate-100 animate-in fade-in slide-in-from-top-1.5 duration-200">
                    <div className="flex justify-between items-center gap-2">
                      <Label htmlFor="pitch-text" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Career Focus & Objective Pitch</Label>
                      <button
                        type="button"
                        onClick={() => {
                          const lang = data.theme?.language || "en";
                          const defaultPitch = lang === "km" 
                            ? translations.km.defaultPitch 
                            : translations.en.defaultPitch;
                          handleThemeChange("professionalPitch", defaultPitch);
                        }}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-855 cursor-pointer hover:underline"
                      >
                        Reset to default
                      </button>
                    </div>
                    <Textarea
                      id="pitch-text"
                      rows={3}
                      value={data.theme?.professionalPitch || ""}
                      onChange={(e) => handleThemeChange("professionalPitch", e.target.value)}
                      placeholder="Write 2-3 sentences to catch recruiter interest..."
                      className="text-xs resize-none"
                    />
                    <span className="text-[9px] text-slate-400 block leading-tight">
                      This statement is highlighted on your CV in place of work experience to grab the recruiter's interest immediately.
                    </span>
                  </div>
                ) : null}
              </div>

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
                    <div className="flex justify-between items-center gap-2">
                      <Label className="text-xs font-semibold text-slate-600">Description</Label>
                      {renderHighlightButton(`exp-desc-${exp.id}`, exp.description, (val) => updateExperience(exp.id, "description", val))}
                    </div>
                    <div data-color-mode="light" className="text-xs mt-1">
                      <MDEditor
                        value={exp.description}
                        onChange={(val) => updateExperience(exp.id, "description", val || "")}
                        preview="edit"
                        height={160}
                        textareaProps={{
                          placeholder: "Detail your responsibilities, key projects, and achievements..."
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`exp-pb-${exp.id}`}
                        checked={!!exp.pageBreakBefore}
                        onChange={(e) => updateExperience(exp.id, "pageBreakBefore", e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <Label htmlFor={`exp-pb-${exp.id}`} className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
                        Force page break before this item
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`exp-hl-${exp.id}`}
                        checked={!!exp.highlight}
                        onChange={(e) => updateExperience(exp.id, "highlight", e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <Label htmlFor={`exp-hl-${exp.id}`} className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
                        Highlight date/duration
                      </Label>
                    </div>

                    {data.theme?.pagesCount && data.theme.pagesCount > 1 ? (
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`exp-pg-${exp.id}`} className="text-xs font-semibold text-slate-500">Show on Page:</Label>
                        <select
                          id={`exp-pg-${exp.id}`}
                          value={exp.page || 1}
                          onChange={(e) => updateExperience(exp.id, "page", parseInt(e.target.value) || 1)}
                          className="h-7 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs focus-visible:outline-none cursor-pointer font-semibold text-slate-650"
                        >
                          {Array.from({ length: data.theme.pagesCount }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                          ))}
                        </select>
                      </div>
                    ) : null}
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
                    <div className="flex justify-between items-center gap-2">
                      <Label className="text-xs font-semibold text-slate-600">Additional Description</Label>
                      {renderHighlightButton(`edu-desc-${edu.id}`, edu.description, (val) => updateEducation(edu.id, "description", val))}
                    </div>
                    <div data-color-mode="light" className="text-xs mt-1">
                      <MDEditor
                        value={edu.description}
                        onChange={(val) => updateEducation(edu.id, "description", val || "")}
                        preview="edit"
                        height={140}
                        textareaProps={{
                          placeholder: "Graduated with honors, GPA, key courses..."
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`edu-pb-${edu.id}`}
                        checked={!!edu.pageBreakBefore}
                        onChange={(e) => updateEducation(edu.id, "pageBreakBefore", e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <Label htmlFor={`edu-pb-${edu.id}`} className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
                        Force page break before this item
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`edu-hl-${edu.id}`}
                        checked={!!edu.highlight}
                        onChange={(e) => updateEducation(edu.id, "highlight", e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <Label htmlFor={`edu-hl-${edu.id}`} className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
                        Highlight date/duration
                      </Label>
                    </div>

                    {data.theme?.pagesCount && data.theme.pagesCount > 1 ? (
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`edu-pg-${edu.id}`} className="text-xs font-semibold text-slate-500">Show on Page:</Label>
                        <select
                          id={`edu-pg-${edu.id}`}
                          value={edu.page || 1}
                          onChange={(e) => updateEducation(edu.id, "page", parseInt(e.target.value) || 1)}
                          className="h-7 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs focus-visible:outline-none cursor-pointer font-semibold text-slate-650"
                        >
                          {Array.from({ length: data.theme.pagesCount }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                          ))}
                        </select>
                      </div>
                    ) : null}
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
                    <div data-color-mode="light" className="text-xs mt-1">
                      <MDEditor
                        value={proj.description}
                        onChange={(val) => updateProject(proj.id, "description", val || "")}
                        preview="edit"
                        height={140}
                        textareaProps={{
                          placeholder: "Explain what you built, what challenge you resolved, and final results..."
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`proj-pb-${proj.id}`}
                        checked={!!proj.pageBreakBefore}
                        onChange={(e) => updateProject(proj.id, "pageBreakBefore", e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <Label htmlFor={`proj-pb-${proj.id}`} className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
                        Force page break before this item
                      </Label>
                    </div>

                    {data.theme?.pagesCount && data.theme.pagesCount > 1 ? (
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`proj-pg-${proj.id}`} className="text-xs font-semibold text-slate-500">Show on Page:</Label>
                        <select
                          id={`proj-pg-${proj.id}`}
                          value={proj.page || 1}
                          onChange={(e) => updateProject(proj.id, "page", parseInt(e.target.value) || 1)}
                          className="h-7 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs focus-visible:outline-none cursor-pointer font-semibold text-slate-650"
                        >
                          {Array.from({ length: data.theme.pagesCount }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                          ))}
                        </select>
                      </div>
                    ) : null}
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

              {data.theme?.pagesCount && data.theme.pagesCount > 1 ? (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-2">
                  <Label htmlFor="skills-pg" className="text-xs font-semibold text-slate-500">Show Skills on Page:</Label>
                  <select
                    id="skills-pg"
                    value={data.theme.skillsPage || 1}
                    onChange={(e) => handleThemeChange("skillsPage", parseInt(e.target.value) || 1)}
                    className="h-7 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs focus-visible:outline-none cursor-pointer font-semibold text-slate-650"
                  >
                    {Array.from({ length: data.theme.pagesCount }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                    ))}
                  </select>
                </div>
              ) : null}
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

                  {data.theme?.pagesCount && data.theme.pagesCount > 1 ? (
                    <div className="flex items-center gap-2 pt-1">
                      <Label htmlFor={`lang-pg-${lang.id}`} className="text-xs font-semibold text-slate-500">Show on Page:</Label>
                      <select
                        id={`lang-pg-${lang.id}`}
                        value={lang.page || 1}
                        onChange={(e) => updateLanguage(lang.id, "page", parseInt(e.target.value) || 1)}
                        className="h-7 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs focus-visible:outline-none cursor-pointer font-semibold text-slate-650"
                      >
                        {Array.from({ length: data.theme.pagesCount }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                        ))}
                      </select>
                    </div>
                  ) : null}
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

                  <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`ref-pb-${ref.id}`}
                        checked={!!ref.pageBreakBefore}
                        onChange={(e) => updateReference(ref.id, "pageBreakBefore", e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <Label htmlFor={`ref-pb-${ref.id}`} className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
                        Force page break before this item
                      </Label>
                    </div>

                    {data.theme?.pagesCount && data.theme.pagesCount > 1 ? (
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`ref-pg-${ref.id}`} className="text-xs font-semibold text-slate-500">Show on Page:</Label>
                        <select
                          id={`ref-pg-${ref.id}`}
                          value={ref.page || 1}
                          onChange={(e) => updateReference(ref.id, "page", parseInt(e.target.value) || 1)}
                          className="h-7 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs focus-visible:outline-none cursor-pointer font-semibold text-slate-650"
                        >
                          {Array.from({ length: data.theme.pagesCount }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                          ))}
                        </select>
                      </div>
                    ) : null}
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
