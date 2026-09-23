import React, { useState } from 'react';
import { Landmark, RotateCcw, Copy, Check } from 'lucide-react';

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('25000');
  const [interestRate, setInterestRate] = useState<string>('7.25');
  const [loanMonths, setLoanMonths] = useState<number>(60);
  const [copied, setCopied] = useState<boolean>(false);

  const principal = Math.max(0, parseFloat(loanAmount) || 0);
  const rate = Math.max(0, parseFloat(interestRate) || 0);
  const months = Math.max(1, loanMonths || 1);

  const monthlyRate = rate / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1);
  } else {
    monthlyPayment = principal / months;
  }

  const totalCost = monthlyPayment * months;
  const totalInterest = Math.max(0, totalCost - principal);

  const handleCopy = () => {
    const text = `Loan Estimate:
Amount: $${principal.toLocaleString()}
Interest Rate: ${rate}%
Term: ${months} Months (${(months / 12).toFixed(1)} Years)
Monthly Payment: $${monthlyPayment.toFixed(2)}
Total Interest: $${totalInterest.toFixed(2)}
Total Cost: $${totalCost.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLoanAmount('25000');
    setInterestRate('7.25');
    setLoanMonths(60);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Personal & Auto Loan Calculator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Calculate monthly loan payments, financing charges, and payoff schedules</p>
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
              Loan Amount ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="20000"
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {['10000', '25000', '40000', '60000'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setLoanAmount(val)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition"
                >
                  ${parseInt(val) / 1000}k
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Loan Term ({months} mo / {(months / 12).toFixed(1)} yr)
              </label>
              <select
                value={loanMonths}
                onChange={(e) => setLoanMonths(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              >
                <option value={24}>24 Months (2 Years)</option>
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
                <option value={72}>72 Months (6 Years)</option>
                <option value={84}>84 Months (7 Years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Monthly Payment
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                ${monthlyPayment.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-zinc-500">/ mo</span>
            </div>

            <div className="mt-5 space-y-2 text-sm border-t border-zinc-200 dark:border-zinc-700/80 pt-4">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Principal Loan</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${principal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Total Interest Paid</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">${totalInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">Total Repaid</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">${totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Interest Ratio</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200">
              {principal > 0 ? ((totalInterest / principal) * 100).toFixed(1) : 0}% of principal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
