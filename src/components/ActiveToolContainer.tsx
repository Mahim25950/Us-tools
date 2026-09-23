import React from 'react';
import { ToolItem } from '../types';
import { TOOLS } from '../data/tools';
import { ArrowLeft, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { ToolIcon } from './ToolIcon';

import { PaycheckCalculator } from './tools/PaycheckCalculator';
import { TaxCalculator } from './tools/TaxCalculator';
import { MortgageCalculator } from './tools/MortgageCalculator';
import { RentCalculator } from './tools/RentCalculator';
import { TipCalculator } from './tools/TipCalculator';
import { LoanCalculator } from './tools/LoanCalculator';
import { TimezoneConverter } from './tools/TimezoneConverter';
import { UnitConverter } from './tools/UnitConverter';
import { ShippingCalculator } from './tools/ShippingCalculator';
import { AgeCalculator } from './tools/AgeCalculator';
import { DateCalculator } from './tools/DateCalculator';
import { PdfTools } from './tools/PdfTools';

interface ActiveToolContainerProps {
  tool: ToolItem;
  onGoHome: () => void;
  onSelectTool: (id: string) => void;
}

export function ActiveToolContainer({
  tool,
  onGoHome,
  onSelectTool,
}: ActiveToolContainerProps) {
  const currentIndex = TOOLS.findIndex((t) => t.id === tool.id);
  const prevTool = currentIndex > 0 ? TOOLS[currentIndex - 1] : TOOLS[TOOLS.length - 1];
  const nextTool = currentIndex < TOOLS.length - 1 ? TOOLS[currentIndex + 1] : TOOLS[0];

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'paycheck':
        return <PaycheckCalculator />;
      case 'tax':
        return <TaxCalculator />;
      case 'mortgage':
        return <MortgageCalculator />;
      case 'rent':
        return <RentCalculator />;
      case 'tip':
        return <TipCalculator />;
      case 'loan':
        return <LoanCalculator />;
      case 'timezone':
        return <TimezoneConverter />;
      case 'unit':
        return <UnitConverter />;
      case 'shipping':
        return <ShippingCalculator />;
      case 'age':
        return <AgeCalculator />;
      case 'date':
        return <DateCalculator />;
      case 'pdf':
        return <PdfTools />;
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Tool Action Bar */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Utilities</span>
        </button>

        {/* Quick next/prev navigation */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onSelectTool(prevTool.id)}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs flex items-center gap-1 transition"
            title={`Previous: ${prevTool.name}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-medium">{prevTool.name}</span>
          </button>
          <button
            onClick={() => onSelectTool(nextTool.id)}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs flex items-center gap-1 transition"
            title={`Next: ${nextTool.name}`}
          >
            <span className="hidden sm:inline text-[11px] font-medium">{nextTool.name}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Card with Tool Content */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl shadow-xs p-5 sm:p-7">
        {renderToolComponent()}
      </div>
    </div>
  );
}
