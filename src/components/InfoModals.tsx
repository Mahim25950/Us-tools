import React from 'react';
import { X, BookOpen, Info, Shield, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { ToolItem } from '../types';
import { TOOLS } from '../data/tools';
import { ToolIcon } from './ToolIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlogModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                US Life Tools Blog & Guides
              </h2>
              <p className="text-xs text-zinc-500">
                Practical financial, housing, and everyday advice for living in the USA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <article className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
              Taxes & Finance
            </span>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              Understanding Your 2026 Paycheck & FICA Deductions
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Why does your take-home pay differ from your gross salary? Discover how Federal withholding, Social Security (6.2%), Medicare (1.45%), and state income taxes work together.
            </p>
          </article>

          <article className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              Housing
            </span>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              The 30% Rent Rule & The 40x Landlord Requirement
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              In major US metro areas like New York, San Francisco, and Austin, landlords frequently require your annual gross income to be at least 40 times the monthly rent.
            </p>
          </article>

          <article className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-full">
              Dining & Etiquette
            </span>
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              US Tipping Culture: Standard Rates & Expectations
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Standard sit-down restaurant tipping in the US is typically 18% to 20% of the pre-tax total. Use our Tip Calculator to calculate and split bills with your group.
            </p>
          </article>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
        >
          Close Blog
        </button>
      </div>
    </div>
  );
}

export function AboutModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                About US Life Tools
              </h2>
              <p className="text-xs text-zinc-500">
                Simple Tools for a Better Life in the USA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            <strong>US Life Tools</strong> is a free, modern suite of calculators, converters, and utilities engineered specifically for everyday life, work, finance, and residency in the United States.
          </p>
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>100% Client-Side Privacy</span>
            </div>
            <p className="text-[11px] text-blue-800 dark:text-blue-300">
              All calculations, financial estimations, and PDF compilations execute 100% locally inside your browser. No sensitive income, loan, or tax numbers are stored or sent to any server.
            </p>
          </div>
          <ul className="space-y-1.5 pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Calibrated for 2026 IRS standard tax brackets</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full US Customary and Metric conversion standards</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Real-time US time zones across all 50 states</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectTool,
}: ModalProps & { onSelectTool: (id: string) => void }) {
  const [search, setSearch] = React.useState('');

  if (!isOpen) return null;

  const results = TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl w-full shadow-2xl p-4 sm:p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all US Life Tools..."
            className="w-full pl-11 pr-10 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1">
          {results.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-400">
              No matching tools found
            </div>
          ) : (
            results.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool.id);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <ToolIcon name={tool.iconName} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600">
                      {tool.name}
                    </div>
                    <div className="text-xs text-zinc-400 line-clamp-1">
                      {tool.description}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
