import React, { useState } from 'react';
import { Coins, RotateCcw, Copy, Check, Users, Plus, Minus } from 'lucide-react';

export function TipCalculator() {
  const [bill, setBill] = useState<string>('84.50');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [splitCount, setSplitCount] = useState<number>(2);
  const [roundTotal, setRoundTotal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const billNum = Math.max(0, parseFloat(bill) || 0);
  const activeTipRate = customTip !== '' ? Math.max(0, parseFloat(customTip) || 0) : tipPercent;

  let rawTip = billNum * (activeTipRate / 100);
  let rawTotal = billNum + rawTip;

  if (roundTotal && billNum > 0) {
    rawTotal = Math.ceil(rawTotal);
    rawTip = Math.max(0, rawTotal - billNum);
  }

  const effectiveTipPercent = billNum > 0 ? (rawTip / billNum) * 100 : activeTipRate;
  const perPersonTotal = splitCount > 0 ? rawTotal / splitCount : rawTotal;
  const perPersonTip = splitCount > 0 ? rawTip / splitCount : rawTip;
  const perPersonBill = splitCount > 0 ? billNum / splitCount : billNum;

  const handleCopy = () => {
    const text = `Dining Bill Split:
Subtotal: $${billNum.toFixed(2)}
Tip (${effectiveTipPercent.toFixed(1)}%): $${rawTip.toFixed(2)}
Total Amount: $${rawTotal.toFixed(2)}
People: ${splitCount}
Each Pays: $${perPersonTotal.toFixed(2)} ($${perPersonBill.toFixed(2)} bill + $${perPersonTip.toFixed(2)} tip)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setBill('84.50');
    setTipPercent(18);
    setCustomTip('');
    setSplitCount(2);
    setRoundTotal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Tip & Bill Splitter</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Calculate US tipping standards and divide checks seamlessly</p>
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
              Bill Subtotal ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 dark:text-zinc-500 font-semibold">$</span>
              <input
                type="number"
                step="0.01"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Tip Percentage
              </label>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {effectiveTipPercent.toFixed(1)}%
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {[15, 18, 20, 22, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => {
                    setTipPercent(pct);
                    setCustomTip('');
                  }}
                  className={`py-2 px-1 rounded-xl border text-center transition ${
                    customTip === '' && tipPercent === pct
                      ? 'border-blue-500 bg-blue-500 text-white font-bold'
                      : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                  }`}
                >
                  <div className="text-sm font-semibold">{pct}%</div>
                  <div className="text-[10px] opacity-80">
                    {pct === 15 ? 'Fair' : pct === 18 ? 'Good' : pct === 20 ? 'Great' : pct === 22 ? 'Super' : 'Star'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Custom Tip %
              </label>
              <input
                type="number"
                step="0.5"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="e.g. 17.5"
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                Split Check
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-bold text-zinc-800 dark:text-zinc-200">
                  {splitCount} {splitCount === 1 ? 'person' : 'people'}
                </div>
                <button
                  type="button"
                  onClick={() => setSplitCount(Math.min(30, splitCount + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={roundTotal}
                onChange={(e) => setRoundTotal(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Round up final bill to nearest whole dollar</span>
            </label>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {splitCount > 1 ? 'Each Person Pays' : 'Total Bill with Tip'}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ${(splitCount > 1 ? perPersonTotal : rawTotal).toFixed(2)}
              </span>
              {splitCount > 1 && <span className="text-xs text-zinc-500">per person</span>}
            </div>

            <div className="mt-5 space-y-2 text-sm border-t border-zinc-200 dark:border-zinc-700/80 pt-4">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Bill Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${billNum.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                <span>Tip Amount</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">+${rawTip.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-300 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">Grand Total</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">${rawTotal.toFixed(2)}</span>
              </div>

              {splitCount > 1 && (
                <div className="pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
                  <div className="flex justify-between text-zinc-500">
                    <span>Per person share:</span>
                    <span>${perPersonBill.toFixed(2)} subtotal + ${perPersonTip.toFixed(2)} tip</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-3 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 text-center">
            Standard US tip expectation for sit-down dining is <strong>18%–20%</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
