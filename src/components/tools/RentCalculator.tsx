import React, { useState } from 'react';
import { Building2, RotateCcw, Copy, Check, ShieldAlert, Sparkles } from 'lucide-react';

export function RentCalculator() {
  const [annualIncome, setAnnualIncome] = useState<string>('65000');
  const [monthlyDebts, setMonthlyDebts] = useState<string>('300');
  const [copied, setCopied] = useState<boolean>(false);

  const annual = Math.max(0, parseFloat(annualIncome) || 0);
  const debts = Math.max(0, parseFloat(monthlyDebts) || 0);
  const monthlyGross = annual / 12;

  // The 30% rule: Gross income * 0.30
  const max30Rent = monthlyGross * 0.30;
  // Conservative: 25%
  const conservativeRent = monthlyGross * 0.25;
  // Max stretch: 33%
  const aggressiveRent = monthlyGross * 0.33;
  // 40x rule standard in NYC/SF/Chicago: Rent = Annual / 40
  const rule40x = annual / 40;

  // With debt considerations (Rent + Debt <= 43% of gross)
  const remainingDebtCapacity = Math.max(0, (monthlyGross * 0.43) - debts);

  const handleCopy = () => {
    const text = `Rent Affordability Analysis:
Annual Gross Income: $${annual.toLocaleString()}
Monthly Gross: $${monthlyGross.toFixed(2)}
Conservative (25%): $${conservativeRent.toFixed(2)}/mo
Standard Recommended (30% Rule): $${max30Rent.toFixed(2)}/mo
Max Stretch (33%): $${aggressiveRent.toFixed(2)}/mo
40x Landlord Requirement: $${rule40x.toFixed(2)}/mo`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAnnualIncome('65000');
    setMonthlyDebts('300');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Rent Affordability Calculator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Calculate realistic rental limits based on standard US landlord criteria</p>
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
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                placeholder="60000"
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {['45000', '65000', '90000', '120000'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAnnualIncome(val)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition"
                >
                  ${parseInt(val) / 1000}k
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Monthly Debt Payments (Auto, Student Loans, Cards)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
              <input
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              US Landlord Qualification Rules
            </div>
            <p>
              • <strong>30% Rule:</strong> Spend no more than 30% of your gross monthly paycheck on housing.
            </p>
            <p>
              • <strong>40x Income Rule:</strong> Many landlords in competitive rental markets (NYC, Boston, Seattle, LA) require gross annual income to be at least 40 times the monthly rent.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Recommended Max Monthly Rent
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                ${max30Rent.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
              <span className="text-sm font-medium text-zinc-500">/ mo</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Based on standard 30% gross income rule
            </div>

            <div className="mt-5 space-y-2.5 text-sm border-t border-zinc-200 dark:border-zinc-700/80 pt-4">
              <div className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Conservative (25%)</div>
                  <div className="text-[11px] text-zinc-500">Ideal for high savings or aggressive investing</div>
                </div>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${conservativeRent.toFixed(0)}/mo
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Max Stretch (33%)</div>
                  <div className="text-[11px] text-zinc-500">Upper limit for high-cost-of-living metro areas</div>
                </div>
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                  ${aggressiveRent.toFixed(0)}/mo
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-800/90 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">40x Landlord Cap</div>
                  <div className="text-[11px] text-zinc-500">Standard landlord qualification ceiling</div>
                </div>
                <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                  ${rule40x.toFixed(0)}/mo
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>Monthly Gross Income</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">${monthlyGross.toFixed(0)} / mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
