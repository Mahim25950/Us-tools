import React, { useState } from 'react';
import { DollarSign, Percent, RotateCcw, Copy, Check, Info } from 'lucide-react';

export function PaycheckCalculator() {
  const [gross, setGross] = useState<string>('3500');
  const [frequency, setFrequency] = useState<number>(26); // Bi-weekly default
  const [taxRate, setTaxRate] = useState<string>('18');
  const [preTaxDeductions, setPreTaxDeductions] = useState<string>('150'); // e.g. 401k/health
  const [copied, setCopied] = useState(false);

  const grossNum = parseFloat(gross) || 0;
  const preTaxNum = Math.min(parseFloat(preTaxDeductions) || 0, grossNum);
  const taxableBase = Math.max(0, grossNum - preTaxNum);
  const taxRateNum = Math.min(60, Math.max(0, parseFloat(taxRate) || 0));

  const ficaRate = 7.65;
  const ssTax = taxableBase * 0.062;
  const medTax = taxableBase * 0.0145;
  const ficaTotal = ssTax + medTax;
  const fedStateTax = taxableBase * (taxRateNum / 100);
  const totalDeductions = preTaxNum + ficaTotal + fedStateTax;
  const netTakeHome = Math.max(0, grossNum - totalDeductions);

  // Annualized
  const annualGross = grossNum * frequency;
  const annualNet = netTakeHome * frequency;

  const handleCopy = () => {
    const text = `Paycheck Estimate:
Gross: $${grossNum.toFixed(2)}
Pre-tax: -$${preTaxNum.toFixed(2)}
Fed + State Tax (~${taxRateNum}%): -$${fedStateTax.toFixed(2)}
FICA (7.65%): -$${ficaTotal.toFixed(2)}
Net Take-Home Pay: $${netTakeHome.toFixed(2)} per paycheck (~$${annualNet.toFixed(2)}/yr)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setGross('3500');
    setFrequency(26);
    setTaxRate('18');
    setPreTaxDeductions('150');
  };

  const netPercent = grossNum > 0 ? (netTakeHome / grossNum) * 100 : 0;
  const taxPercent = grossNum > 0 ? (fedStateTax / grossNum) * 100 : 0;
  const ficaPercent = grossNum > 0 ? (ficaTotal / grossNum) * 100 : 0;
  const preTaxPercent = grossNum > 0 ? (preTaxNum / grossNum) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">US Paycheck Calculator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Estimate your net take-home salary after taxes and FICA</p>
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
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Gross Pay (per paycheck)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
              <input
                type="number"
                value={gross}
                onChange={(e) => setGross(e.target.value)}
                placeholder="3000"
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Pay Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              >
                <option value={52}>Weekly (52 / yr)</option>
                <option value={26}>Bi-Weekly (26 / yr)</option>
                <option value={24}>Semi-Monthly (24 / yr)</option>
                <option value={12}>Monthly (12 / yr)</option>
                <option value={1}>Annually (1 / yr)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Pre-tax Deductions (401k, Health)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
                <input
                  type="number"
                  value={preTaxDeductions}
                  onChange={(e) => setPreTaxDeductions(e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Estimated Fed + State Tax Rate (%)
              </label>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{taxRateNum}%</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                min="0"
                max="60"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
            {/* Quick tax presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                { label: '0% State (TX/FL/WA)', val: '12' },
                { label: 'Moderate State', val: '18' },
                { label: 'High State (CA/NY)', val: '26' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setTaxRate(p.val)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <span>
              FICA is fixed by federal law at <strong>7.65%</strong> (6.2% Social Security up to annual limit + 1.45% Medicare).
            </span>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Estimated Take-Home Pay
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ${netTakeHome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm font-medium text-zinc-500">/ check</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              ~${annualNet.toLocaleString('en-US', { maximumFractionDigits: 0 })} / year net
            </div>

            {/* Visual breakdown progress bar */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <span>Income Distribution</span>
                <span>{netPercent.toFixed(1)}% Take-Home</span>
              </div>
              <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden flex">
                <div style={{ width: `${netPercent}%` }} className="bg-emerald-500 transition-all duration-300" title="Net Pay" />
                <div style={{ width: `${taxPercent}%` }} className="bg-blue-500 transition-all duration-300" title="Income Tax" />
                <div style={{ width: `${ficaPercent}%` }} className="bg-amber-500 transition-all duration-300" title="FICA" />
                <div style={{ width: `${preTaxPercent}%` }} className="bg-purple-500 transition-all duration-300" title="Pre-tax" />
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Net Pay</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Taxes</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> FICA</span>
                {preTaxNum > 0 && (
                  <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Pre-Tax</span>
                )}
              </div>
            </div>

            {/* Line items */}
            <div className="mt-5 space-y-2 text-sm border-t border-zinc-200 dark:border-zinc-700/80 pt-4">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Gross Pay</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${grossNum.toFixed(2)}</span>
              </div>
              {preTaxNum > 0 && (
                <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                  <span>Pre-tax Deductions</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">-${preTaxNum.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Federal + State Taxes</span>
                <span className="font-medium text-rose-600 dark:text-rose-400">-${fedStateTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>FICA (SS & Medicare)</span>
                <span className="font-medium text-amber-600 dark:text-amber-400">-${ficaTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700/80 grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/40">
              <div className="text-[11px] text-zinc-500">Monthly Gross</div>
              <div className="font-bold text-zinc-800 dark:text-zinc-200">
                ${((annualGross) / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="p-2 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200/60 dark:border-zinc-700/40">
              <div className="text-[11px] text-zinc-500">Monthly Net</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">
                ${((annualNet) / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
