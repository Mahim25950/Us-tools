import React, { useState } from 'react';
import { Home, RotateCcw, Copy, Check, ShieldCheck } from 'lucide-react';

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>('450000');
  const [downPayment, setDownPayment] = useState<string>('90000');
  const [interestRate, setInterestRate] = useState<string>('6.75');
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [includePITI, setIncludePITI] = useState<boolean>(true);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>('5000');
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>('1500');
  const [copied, setCopied] = useState<boolean>(false);

  const price = Math.max(0, parseFloat(homePrice) || 0);
  const down = Math.min(price, Math.max(0, parseFloat(downPayment) || 0));
  const loanAmount = Math.max(0, price - down);
  const downPercent = price > 0 ? (down / price) * 100 : 0;

  const rate = Math.max(0, parseFloat(interestRate) || 0);
  const monthlyRate = rate / 100 / 12;
  const numPayments = loanTermYears * 12;

  let monthlyPI = 0;
  if (monthlyRate > 0 && numPayments > 0 && loanAmount > 0) {
    monthlyPI =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else if (numPayments > 0) {
    monthlyPI = loanAmount / numPayments;
  }

  const monthlyPropertyTax = includePITI ? (parseFloat(propertyTaxAnnual) || 0) / 12 : 0;
  const monthlyInsurance = includePITI ? (parseFloat(homeInsuranceAnnual) || 0) / 12 : 0;
  const totalMonthlyPITI = monthlyPI + monthlyPropertyTax + monthlyInsurance;

  const totalPayments = monthlyPI * numPayments;
  const totalInterest = Math.max(0, totalPayments - loanAmount);

  const handleDownPercentChange = (pct: number) => {
    setDownPayment(Math.round((price * pct) / 100).toString());
  };

  const handleCopy = () => {
    const text = `Mortgage Calculation:
Home Price: $${price.toLocaleString()}
Down Payment: $${down.toLocaleString()} (${downPercent.toFixed(1)}%)
Loan Amount: $${loanAmount.toLocaleString()}
Rate: ${rate}% (${loanTermYears} Years)
Monthly Principal & Interest: $${monthlyPI.toFixed(2)}
Total Monthly (PITI): $${totalMonthlyPITI.toFixed(2)}
Total Interest: $${totalInterest.toFixed(2)}
Total Lifetime Cost: $${(totalPayments + down).toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHomePrice('450000');
    setDownPayment('90000');
    setInterestRate('6.75');
    setLoanTermYears(30);
    setPropertyTaxAnnual('5000');
    setHomeInsuranceAnnual('1500');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Mortgage Calculator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Estimate your monthly mortgage, PITI breakdown, and total interest</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Home Purchase Price ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Down Payment
                </label>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{downPercent.toFixed(1)}%</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                />
              </div>
              <div className="flex gap-1.5 mt-2">
                {[5, 10, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handleDownPercentChange(pct)}
                    className="px-2 py-0.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Loan Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>
          </div>

          {/* Taxes & Insurance Toggle */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Include Property Tax & Home Insurance (PITI)
              </span>
              <input
                type="checkbox"
                checked={includePITI}
                onChange={(e) => setIncludePITI(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {includePITI && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">
                    Annual Property Tax ($)
                  </label>
                  <input
                    type="number"
                    value={propertyTaxAnnual}
                    onChange={(e) => setPropertyTaxAnnual(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">
                    Annual Homeowners Insurance ($)
                  </label>
                  <input
                    type="number"
                    value={homeInsuranceAnnual}
                    onChange={(e) => setHomeInsuranceAnnual(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Total Monthly Payment {includePITI && '(PITI)'}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                ${totalMonthlyPITI.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm font-medium text-zinc-500">/ mo</span>
            </div>

            <div className="mt-5 space-y-2 text-sm border-t border-zinc-200 dark:border-zinc-700/80 pt-4">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Principal & Interest</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${monthlyPI.toFixed(2)}</span>
              </div>
              {includePITI && (
                <>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                    <span>Property Taxes (Est.)</span>
                    <span className="text-zinc-700 dark:text-zinc-300">${monthlyPropertyTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                    <span>Home Insurance (Est.)</span>
                    <span className="text-zinc-700 dark:text-zinc-300">${monthlyInsurance.toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                <span>Financed Loan Amount</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Total Interest Paid</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Total Cost of Loan</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${totalPayments.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Payoff Date</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200">
              {new Date().getMonth() + 1} / {new Date().getFullYear() + loanTermYears}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
