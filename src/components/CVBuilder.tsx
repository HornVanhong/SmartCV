"use client";

import React, { useState, useEffect } from "react";
import { CVData } from "@/types/cv";
import { defaultCVData } from "@/lib/default-cv";
import { CVForm } from "@/components/CVForm";
import { CVPreview } from "@/components/CVPreview";
import { ExportButton } from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save, ArrowLeft, Check, FileText } from "lucide-react";
import Link from "next/link";

export const CVBuilder: React.FC = () => {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "info">("success");
  const [showResetModal, setShowResetModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("smart_cv_data");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCvData(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved CV data, loading default.", err);
        setCvData(defaultCVData);
      }
    } else {
      setCvData(defaultCVData);
    }
  }, []);

  // Save to localStorage automatically on data changes
  useEffect(() => {
    if (cvData) {
      localStorage.setItem("smart_cv_data", JSON.stringify(cvData));
    }
  }, [cvData]);

  const handleSaveDraft = () => {
    if (cvData) {
      localStorage.setItem("smart_cv_data", JSON.stringify(cvData));
      triggerToast("Draft saved successfully!", "success");
    }
  };

  const handleResetConfirm = () => {
    localStorage.removeItem("smart_cv_data");
    setCvData(defaultCVData);
    setShowResetModal(false);
    triggerToast("CV successfully reset to default template.", "info");
  };

  const triggerToast = (message: string, type: "success" | "info") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  };

  if (!cvData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-900 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">Loading CV Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
            toastType === "success" 
              ? "bg-emerald-50 border-emerald-250 text-emerald-900" 
              : "bg-blue-50 border-blue-250 text-blue-900"
          }`}>
            <Check className={`h-4 w-4 ${toastType === "success" ? "text-emerald-600" : "text-blue-600"}`} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900">Reset CV Template?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to reset your CV? This will clear all changes and restore the default professional data. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <Button 
                variant="ghost" 
                onClick={() => setShowResetModal(false)}
                className="h-9 text-xs font-semibold text-slate-500"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleResetConfirm}
                className="h-9 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white"
              >
                Yes, Reset Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500 hover:text-slate-950 hover:bg-slate-100">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-slate-950 text-white p-1.5 rounded-lg">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-slate-950 tracking-tight text-base sm:text-lg">Smart CV Builder</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1.5 h-9 text-xs font-semibold border-slate-250 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 h-9 text-xs font-semibold border-slate-250 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save <span className="hidden sm:inline">Draft</span></span>
          </Button>

          <ExportButton data={cvData} />
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor */}
          <section className="lg:col-span-5 xl:col-span-5 h-full">
            <CVForm data={cvData} onChange={setCvData} />
          </section>

          {/* Right Column: Live A4 Preview */}
          <section className="lg:col-span-7 xl:col-span-7 sticky top-24">
            <CVPreview data={cvData} />
          </section>
        </div>
      </main>
    </div>
  );
};
