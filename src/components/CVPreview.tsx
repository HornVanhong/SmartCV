"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { CVTemplateModern } from "@/components/CVTemplateModern";
import { CVTemplateMinimalist } from "@/components/CVTemplateMinimalist";
import { CVTemplateCreative } from "@/components/CVTemplateCreative";
import { CVTemplateProfessional } from "@/components/CVTemplateProfessional";
import { CVTemplateElegant } from "@/components/CVTemplateElegant";
import { CVTemplateExecutive } from "@/components/CVTemplateExecutive";
import { CVTemplateFancyGrid } from "@/components/CVTemplateFancyGrid";
import { CVTemplateSimpleLeft } from "@/components/CVTemplateSimpleLeft";
import { CVTemplateTimeline } from "@/components/CVTemplateTimeline";
import { CVTemplatePortfolio } from "@/components/CVTemplatePortfolio";

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  const templateId = data.theme?.templateId || "modern";

  const renderTemplate = () => {
    switch (templateId) {
      case "minimalist":
        return <CVTemplateMinimalist data={data} />;
      case "creative":
        return <CVTemplateCreative data={data} />;
      case "professional":
        return <CVTemplateProfessional data={data} />;
      case "elegant":
        return <CVTemplateElegant data={data} />;
      case "executive":
        return <CVTemplateExecutive data={data} />;
      case "fancygrid":
        return <CVTemplateFancyGrid data={data} />;
      case "simpleleft":
        return <CVTemplateSimpleLeft data={data} />;
      case "timeline":
        return <CVTemplateTimeline data={data} />;
      case "portfolio":
        return <CVTemplatePortfolio data={data} />;
      case "modern":
      default:
        return <CVTemplateModern data={data} />;
    }
  };

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
        <div className="w-full max-w-[800px] bg-white shadow-md hover:shadow-lg transition-shadow border border-slate-200/80 rounded-sm overflow-hidden min-h-[auto] lg:min-h-[29.7cm] print:min-h-[29.7cm] flex flex-col">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
