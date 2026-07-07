"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { CVTemplateModern } from "@/components/CVTemplateModern";

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Visual Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50/50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-slate-700">Live Preview</span>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
          A4 Standard Layout
        </span>
      </div>

      {/* Preview Canvas Container */}
      <div className="flex-1 bg-slate-100 p-4 sm:p-8 overflow-y-auto flex justify-center items-start min-h-[500px]">
        {/* A4 Sheet Mock */}
        <div className="w-full max-w-[800px] bg-white shadow-md hover:shadow-lg transition-shadow border border-slate-200/80 rounded-sm overflow-hidden min-h-[29.7cm] flex flex-col">
          <CVTemplateModern data={data} />
        </div>
      </div>
    </div>
  );
};
