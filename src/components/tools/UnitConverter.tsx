import React, { useState } from 'react';
import { Ruler, ArrowLeftRight, RotateCcw, Copy, Check } from 'lucide-react';

interface ConversionOption {
  id: string;
  name: string;
  fromLabel: string;
  toLabel: string;
  convert: (val: number) => number;
  invert: (val: number) => number;
  unitFrom: string;
  unitTo: string;
}

const CONVERSIONS: Record<string, ConversionOption[]> = {
  weight: [
    {
      id: 'lb_kg',
      name: 'Pounds ⇄ Kilograms',
      fromLabel: 'Pounds (lbs)',
      toLabel: 'Kilograms (kg)',
      convert: (v) => v * 0.45359237,
      invert: (v) => v / 0.45359237,
      unitFrom: 'lbs',
      unitTo: 'kg',
    },
    {
      id: 'oz_g',
      name: 'Ounces ⇄ Grams',
      fromLabel: 'Ounces (oz)',
      toLabel: 'Grams (g)',
      convert: (v) => v * 28.3495,
      invert: (v) => v / 28.3495,
      unitFrom: 'oz',
      unitTo: 'g',
    },
  ],
  distance: [
    {
      id: 'mi_km',
      name: 'Miles ⇄ Kilometers',
      fromLabel: 'Miles (mi)',
      toLabel: 'Kilometers (km)',
      convert: (v) => v * 1.609344,
      invert: (v) => v / 1.609344,
      unitFrom: 'mi',
      unitTo: 'km',
    },
    {
      id: 'ft_m',
      name: 'Feet ⇄ Meters',
      fromLabel: 'Feet (ft)',
      toLabel: 'Meters (m)',
      convert: (v) => v * 0.3048,
      invert: (v) => v / 0.3048,
      unitFrom: 'ft',
      unitTo: 'm',
    },
    {
      id: 'in_cm',
      name: 'Inches ⇄ Centimeters',
      fromLabel: 'Inches (in)',
      toLabel: 'Centimeters (cm)',
      convert: (v) => v * 2.54,
      invert: (v) => v / 2.54,
      unitFrom: 'in',
      unitTo: 'cm',
    },
  ],
  temp: [
    {
      id: 'f_c',
      name: 'Fahrenheit ⇄ Celsius',
      fromLabel: 'Fahrenheit (°F)',
      toLabel: 'Celsius (°C)',
      convert: (v) => ((v - 32) * 5) / 9,
      invert: (v) => (v * 9) / 5 + 32,
      unitFrom: '°F',
      unitTo: '°C',
    },
  ],
  volume: [
    {
      id: 'gal_l',
      name: 'US Gallons ⇄ Liters',
      fromLabel: 'US Gallons (gal)',
      toLabel: 'Liters (L)',
      convert: (v) => v * 3.78541,
      invert: (v) => v / 3.78541,
      unitFrom: 'gal',
      unitTo: 'L',
    },
    {
      id: 'floz_ml',
      name: 'Fluid Ounces ⇄ Milliliters',
      fromLabel: 'Fluid Ounces (fl oz)',
      toLabel: 'Milliliters (mL)',
      convert: (v) => v * 29.5735,
      invert: (v) => v / 29.5735,
      unitFrom: 'fl oz',
      unitTo: 'mL',
    },
    {
      id: 'cup_ml',
      name: 'US Cups ⇄ Milliliters',
      fromLabel: 'US Cups (cup)',
      toLabel: 'Milliliters (mL)',
      convert: (v) => v * 236.588,
      invert: (v) => v / 236.588,
      unitFrom: 'cup',
      unitTo: 'mL',
    },
  ],
};

export function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState<string>('weight');
  const [selectedConversionId, setSelectedConversionId] = useState<string>('lb_kg');
  const [inputValue, setInputValue] = useState<string>('150');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const activeOptions = CONVERSIONS[activeCategory] || CONVERSIONS.weight;
  const currentConversion =
    activeOptions.find((c) => c.id === selectedConversionId) || activeOptions[0];

  const valNum = parseFloat(inputValue);
  let convertedResult = 0;
  if (!isNaN(valNum)) {
    convertedResult = isReversed
      ? currentConversion.invert(valNum)
      : currentConversion.convert(valNum);
  }

  const fromUnit = isReversed ? currentConversion.unitTo : currentConversion.unitFrom;
  const toUnit = isReversed ? currentConversion.unitFrom : currentConversion.unitTo;
  const fromLabel = isReversed ? currentConversion.toLabel : currentConversion.fromLabel;
  const toLabel = isReversed ? currentConversion.fromLabel : currentConversion.toLabel;

  const handleCopy = () => {
    const text = `${valNum} ${fromUnit} = ${convertedResult.toFixed(3)} ${toUnit}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputValue('1');
    setIsReversed(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Metric ⇄ US Customary Converter</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Instantly convert weights, temperatures, miles, and volume measurements</p>
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

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'weight', label: 'Weight (lb / kg)' },
          { id: 'distance', label: 'Length & Distance' },
          { id: 'temp', label: 'Temperature (°F / °C)' },
          { id: 'volume', label: 'Volume & Cooking' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedConversionId(CONVERSIONS[cat.id][0].id);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition ${
              activeCategory === cat.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Conversion Subtype Selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
          Select Measurement
        </label>
        <select
          value={selectedConversionId}
          onChange={(e) => setSelectedConversionId(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
        >
          {activeOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Interactive Two-Way Converter */}
      <div className="p-6 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* From Input */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <span>{fromLabel}</span>
              <span className="text-[11px] text-zinc-400">Input</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-lg font-bold text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                {fromUnit}
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              type="button"
              onClick={() => setIsReversed(!isReversed)}
              className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:rotate-180 transition-all shadow-sm"
              title="Reverse conversion direction"
            >
              <ArrowLeftRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </button>
          </div>

          {/* To Output */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <span>{toLabel}</span>
              <span className="text-[11px] text-zinc-400">Result</span>
            </label>
            <div className="relative">
              <div className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-lg font-bold text-blue-600 dark:text-blue-400 overflow-x-auto">
                {!isNaN(valNum)
                  ? activeCategory === 'temp'
                    ? convertedResult.toFixed(2)
                    : convertedResult.toLocaleString('en-US', { maximumFractionDigits: 4 })
                  : '0'}
              </div>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                {toUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Quick cheat sheet */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700/80 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            <strong>Reference:</strong> 1 lb = 0.454 kg
          </span>
          <span>•</span>
          <span>1 mi = 1.609 km</span>
          <span>•</span>
          <span>68°F = 20°C (Room temp)</span>
          <span>•</span>
          <span>1 Gallon = 3.785 L</span>
        </div>
      </div>
    </div>
  );
}
