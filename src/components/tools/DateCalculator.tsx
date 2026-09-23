import React, { useState } from 'react';
import { Calendar, RotateCcw, Copy, Check, Plus, Minus } from 'lucide-react';

export function DateCalculator() {
  const [mode, setMode] = useState<'diff' | 'add'>('diff');

  // Mode 1: Difference
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().slice(0, 10);
  });

  // Mode 2: Add/Subtract
  const [baseDate, setBaseDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [unitCount, setUnitCount] = useState<string>('30');
  const [unitType, setUnitType] = useState<'days' | 'weeks' | 'months'>('days');

  const [copied, setCopied] = useState<boolean>(false);

  // Calculation for difference
  const calcDifference = () => {
    if (!startDate || !endDate) return null;
    const d1 = new Date(startDate + 'T00:00:00');
    const d2 = new Date(endDate + 'T00:00:00');

    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;

    // Calculate business days (M-F)
    let businessDays = 0;
    const cur = new Date(Math.min(d1.getTime(), d2.getTime()));
    const target = new Date(Math.max(d1.getTime(), d2.getTime()));

    while (cur < target) {
      cur.setDate(cur.getDate() + 1);
      const dayOfWeek = cur.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
    }

    return {
      totalDays,
      weeks,
      remDays,
      businessDays,
      isEarlier: d2 < d1,
    };
  };

  // Calculation for Add/Subtract
  const calcAddSubtract = () => {
    if (!baseDate) return null;
    const base = new Date(baseDate + 'T00:00:00');
    const count = parseInt(unitCount) || 0;
    const multiplier = operation === 'add' ? 1 : -1;

    const res = new Date(base);
    if (unitType === 'days') {
      res.setDate(res.getDate() + count * multiplier);
    } else if (unitType === 'weeks') {
      res.setDate(res.getDate() + count * 7 * multiplier);
    } else if (unitType === 'months') {
      res.setMonth(res.getMonth() + count * multiplier);
    }

    const formatted = res.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      resultDate: res,
      formattedDate: formatted,
    };
  };

  const diffResult = calcDifference();
  const addResult = calcAddSubtract();

  const handleCopy = () => {
    let text = '';
    if (mode === 'diff' && diffResult) {
      text = `Date Difference:
From: ${startDate} To: ${endDate}
Total Days: ${diffResult.totalDays}
Weeks: ${diffResult.weeks} weeks, ${diffResult.remDays} days
Business Days (Mon-Fri): ${diffResult.businessDays} days`;
    } else if (mode === 'add' && addResult) {
      text = `Date Calculation:
Base: ${baseDate} ${operation.toUpperCase()} ${unitCount} ${unitType}
Target Result: ${addResult.formattedDate}`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Date Difference & Calculator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Calculate days between dates or project future deadlines</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setStartDate(new Date().toISOString().slice(0, 10));
              const d = new Date();
              d.setDate(d.getDate() + 30);
              setEndDate(d.toISOString().slice(0, 10));
            }}
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

      {/* Mode Switcher */}
      <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800/80 p-1 w-fit">
        <button
          type="button"
          onClick={() => setMode('diff')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
            mode === 'diff'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          Difference Between Dates
        </button>
        <button
          type="button"
          onClick={() => setMode('add')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
            mode === 'add'
              ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          Add / Subtract Days
        </button>
      </div>

      {mode === 'diff' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            {diffResult ? (
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Total Duration
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-blue-600 dark:text-blue-400">
                    {diffResult.totalDays}
                  </span>
                  <span className="text-base font-semibold text-zinc-600 dark:text-zinc-300">
                    Calendar Days
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                    <div className="text-zinc-400">Standard Weeks</div>
                    <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {diffResult.weeks} wk {diffResult.remDays} d
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                    <div className="text-zinc-400">Working / Business Days</div>
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {diffResult.businessDays} days
                    </div>
                    <div className="text-[10px] text-zinc-400">Mon-Fri (No weekends)</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Base Date
              </label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOperation('add')}
                className={`p-2.5 rounded-xl border text-center font-semibold text-xs transition ${
                  operation === 'add'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                + Add Time
              </button>
              <button
                type="button"
                onClick={() => setOperation('subtract')}
                className={`p-2.5 rounded-xl border text-center font-semibold text-xs transition ${
                  operation === 'subtract'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                - Subtract Time
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Amount
                </label>
                <input
                  type="number"
                  value={unitCount}
                  onChange={(e) => setUnitCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Unit
                </label>
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            {addResult && (
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Calculated Target Date
                </span>
                <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                  {addResult.formattedDate}
                </div>
                <div className="mt-3 text-xs text-zinc-500">
                  {operation === 'add' ? 'Added' : 'Subtracted'} {unitCount} {unitType} from {baseDate}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
