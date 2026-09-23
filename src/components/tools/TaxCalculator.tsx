import React, { useState } from 'react';
import { ReceiptText, RotateCcw, Copy, Check, TrendingDown } from 'lucide-react';

interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}

export function TaxCalculator() {
  const [income, setIncome] = useState<string>('85000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'hoh'>('single');
  const [customDeduction, setCustomDeduction] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const grossIncome = Math.max(0, parseFloat(income) || 0);

  // Standard deductions
  const standardDeductions = {
    single: 14600,
    married: 29200,
    hoh: 21900,
  };

  const deductionUsed = customDeduction !== '' ? Math.max(0, parseFloat(customDeduction) || 0) : standardDeductions[filingStatus];
  const taxableIncome = Math.max(0, grossIncome - deductionUsed);

  // 2025/2026 Federal Brackets
  const brackets: Record<'single' | 'married' | 'hoh', TaxBracket[]> = {
    single: [
      { rate: 0.10, min: 0, max: 11925 },
      { rate: 0.12, min: 11925, max: 48475 },
      { rate: 0.22, min: 48475, max: 103350 },
      { rate: 0.24, min: 103350, max: 197300 },
      { rate: 0.32, min: 197300, max: 250525 },
      { rate: 0.35, min: 250525, max: 626350 },
      { rate: 0.37, min: 626350, max: Infinity },
    ],
    married: [
      { rate: 0.10, min: 0, max: 23850 },
      { rate: 0.12, min: 23850, max: 96950 },
      { rate: 0.22, min: 96950, max: 206700 },
      { rate: 0.24, min: 206700, max: 394600 },
      { rate: 0.32, min: 394600, max: 501050 },
      { rate: 0.35, min: 501050, max: 751600 },
      { rate: 0.37, min: 751600, max: Infinity },
    ],
    hoh: [
      { rate: 0.10, min: 0, max: 17000 },
      { rate: 0.12, min: 17000, max: 64850 },
      { rate: 0.22, min: 64850, max: 103350 },
      { rate: 0.24, min: 103350, max: 197300 },
      { rate: 0.32, min: 197300, max: 250500 },
      { rate: 0.35, min: 250500, max: 626350 },
      { rate: 0.37, min: 626350, max: Infinity },
    ],
  };

  const statusBrackets = brackets[filingStatus];

  let totalTax = 0;
  let marginalBracket = 10;
  const bracketBreakdown: { rate: number; taxedAmount: number; tax: number }[] = [];

  for (const b of statusBrackets) {
    if (taxableIncome > b.min) {
      const taxableInBracket = Math.min(taxableIncome, b.max) - b.min;
      const taxInBracket = taxableInBracket * b.rate;
      totalTax += taxInBracket;
      marginalBracket = Math.round(b.rate * 100);
      bracketBreakdown.push({
        rate: Math.round(b.rate * 100),
        taxedAmount: taxableInBracket,
        tax: taxInBracket,
      });
    }
  }

  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  const monthlyFedWithholding = totalTax / 12;

  const handleCopy = () => {
    const text = `Federal Tax Summary:
Gross Income: $${grossIncome.toLocaleString()}
Filing Status: ${filingStatus.toUpperCase()}
Deductions: -$${deductionUsed.toLocaleString()}
Taxable Income: $${taxableIncome.toLocaleString()}
Estimated Federal Tax: $${totalTax.toFixed(2)}
Effective Tax Rate: ${effectiveRate.toFixed(2)}%
Marginal Top Bracket: ${marginalBracket}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setIncome('85000');
    setFilingStatus('single');
    setCustomDeduction('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Federal Tax Calculator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Estimate your progressive income tax, standard deduction, and marginal bracket</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Annual Gross Income ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="75000"
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {['50000', '75000', '100000', '150000'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setIncome(val)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition"
                >
                  ${parseInt(val) / 1000}k
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Filing Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'single', label: 'Single', ded: '$14,600' },
                { id: 'married', label: 'Married Joint', ded: '$29,200' },
                { id: 'hoh', label: 'Head of House', ded: '$21,900' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFilingStatus(s.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    filingStatus === s.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{s.label}</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{s.ded} ded.</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Custom / Itemized Deduction ($) (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
              <input
                type="number"
                value={customDeduction}
                onChange={(e) => setCustomDeduction(e.target.value)}
                placeholder={`Default: $${standardDeductions[filingStatus].toLocaleString()}`}
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
          </div>

          {/* Tax Bracket Table */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden text-xs">
            <div className="px-3 py-2 bg-zinc-100/70 dark:bg-zinc-800/60 font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
              <span>Federal Tax Brackets Breakdown</span>
              <span>Effective: {effectiveRate.toFixed(1)}%</span>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
              {bracketBreakdown.map((b) => (
                <div key={b.rate} className="px-3 py-1.5 flex justify-between items-center text-zinc-600 dark:text-zinc-300">
                  <span className="font-medium inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {b.rate}% Bracket
                  </span>
                  <span>${b.taxedAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })} taxed</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">+${b.tax.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Estimated Federal Tax
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                ${totalTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm font-medium text-zinc-500">/ yr</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Effective Rate</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {effectiveRate.toFixed(2)}%
                </div>
                <div className="text-[10px] text-zinc-400">Total tax / gross</div>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Marginal Bracket</div>
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                  {marginalBracket}%
                </div>
                <div className="text-[10px] text-zinc-400">Next dollar taxed</div>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-sm border-t border-zinc-200 dark:border-zinc-700/80 pt-4">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Gross Income</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${grossIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Standard Deduction</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">-${deductionUsed.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Taxable Income</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${taxableIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Est. Monthly Withholding</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">${monthlyFedWithholding.toFixed(2)} / mo</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> Calculation applies standard federal brackets and standard deductions. Actual liability may vary with credits (Child Tax Credit, EITC) and state taxes.
          </div>
        </div>
      </div>
    </div>
  );
}
