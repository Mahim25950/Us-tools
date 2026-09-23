import React, { useState } from 'react';
import { Package, RotateCcw, Copy, Check, Truck, ShieldCheck, Zap } from 'lucide-react';

export function ShippingCalculator() {
  const [weightLbs, setWeightLbs] = useState<string>('4.5');
  const [zone, setZone] = useState<string>('regional');
  const [packageSize, setPackageSize] = useState<'standard' | 'large'>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const weight = Math.max(0.1, parseFloat(weightLbs) || 0.1);

  // Multipliers by destination zone
  const zoneMultipliers: Record<string, { mult: number; label: string; daysGround: string }> = {
    local: { mult: 1.0, label: 'Local / Same State (Zones 1-2)', daysGround: '2-3 days' },
    regional: { mult: 1.25, label: 'Regional (Zones 3-4)', daysGround: '3-4 days' },
    cross: { mult: 1.6, label: 'Cross-Country / Coast to Coast (Zones 5-8)', daysGround: '4-6 days' },
    offshore: { mult: 1.95, label: 'Alaska / Hawaii / PR (Zone 9)', daysGround: '5-7 days' },
  };

  const currentZone = zoneMultipliers[zone] || zoneMultipliers.regional;
  const sizeSurcharge = packageSize === 'large' ? 4.5 : 0;

  // Modern USPS 2026 domestic rates model
  const uspsGroundBase = (6.8 + weight * 1.35 + sizeSurcharge) * currentZone.mult;
  const uspsPriorityBase = (9.85 + weight * 2.15 + sizeSurcharge) * currentZone.mult;
  const uspsExpressBase = (29.5 + weight * 4.4 + sizeSurcharge) * currentZone.mult;
  const upsGroundEstimate = (8.5 + weight * 1.5 + sizeSurcharge) * currentZone.mult;

  const handleCopy = () => {
    const text = `US Domestic Shipping Estimate:
Weight: ${weight} lbs
Destination: ${currentZone.label}
USPS Ground Advantage (${currentZone.daysGround}): $${uspsGroundBase.toFixed(2)}
USPS Priority Mail (1-3 days): $${uspsPriorityBase.toFixed(2)}
USPS Priority Mail Express (Overnight): $${uspsExpressBase.toFixed(2)}
UPS Ground Estimate: $${upsGroundEstimate.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setWeightLbs('4.5');
    setZone('regional');
    setPackageSize('standard');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">US Shipping Estimator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Compare domestic shipping rates, speeds, and carrier tiers</p>
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
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Package Weight (lbs)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                placeholder="2.5"
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {['0.5', '2.0', '5.0', '10.0', '20.0'].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeightLbs(w)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition"
                >
                  {w} lbs
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Destination Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
            >
              <option value="local">Local / Same State (Zones 1-2)</option>
              <option value="regional">Regional / Neighboring (Zones 3-4)</option>
              <option value="cross">Coast to Coast / Cross Country (Zones 5-8)</option>
              <option value="offshore">Hawaii / Alaska / Puerto Rico (Zone 9)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
              Parcel Dimension Class
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPackageSize('standard')}
                className={`p-3 rounded-xl border text-left transition ${
                  packageSize === 'standard'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="text-xs font-bold">Standard Box</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">Under 1 cubic foot</div>
              </button>
              <button
                type="button"
                onClick={() => setPackageSize('large')}
                className={`p-3 rounded-xl border text-left transition ${
                  packageSize === 'large'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="text-xs font-bold">Large / Bulky Box</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">Dimensional surcharge</div>
              </button>
            </div>
          </div>
        </div>

        {/* Carrier Rates Comparison List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">USPS Ground Advantage</div>
                <div className="text-xs text-zinc-500">{currentZone.daysGround} • Includes $100 insurance</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                ${uspsGroundBase.toFixed(2)}
              </div>
              <div className="text-[10px] text-zinc-400">Best Value</div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">USPS Priority Mail</div>
                <div className="text-xs text-zinc-500">1–3 business days • Free boxes</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                ${uspsPriorityBase.toFixed(2)}
              </div>
              <div className="text-[10px] text-zinc-400">Fast & Tracked</div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">USPS Priority Express</div>
                <div className="text-xs text-zinc-500">Next-Day / Guaranteed 6 PM</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-purple-600 dark:text-purple-400">
                ${uspsExpressBase.toFixed(2)}
              </div>
              <div className="text-[10px] text-zinc-400">Overnight</div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xs">
                UPS
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">UPS Ground (Est.)</div>
                <div className="text-xs text-zinc-500">1–5 business days to commercial/residential</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400">
                ${upsGroundEstimate.toFixed(2)}
              </div>
              <div className="text-[10px] text-zinc-400">Commercial Standard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
