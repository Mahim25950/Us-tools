import React, { useState, useEffect } from 'react';
import { Clock, RotateCcw, Copy, Check, Sun, Moon } from 'lucide-react';

interface ZoneDef {
  code: string;
  name: string;
  ianna: string;
  offsetApprox: string;
}

const US_ZONES: ZoneDef[] = [
  { code: 'ET', name: 'Eastern Time', ianna: 'America/New_York', offsetApprox: 'UTC-4 / UTC-5' },
  { code: 'CT', name: 'Central Time', ianna: 'America/Chicago', offsetApprox: 'UTC-5 / UTC-6' },
  { code: 'MT', name: 'Mountain Time', ianna: 'America/Denver', offsetApprox: 'UTC-6 / UTC-7' },
  { code: 'AZ', name: 'Arizona (No DST)', ianna: 'America/Phoenix', offsetApprox: 'UTC-7' },
  { code: 'PT', name: 'Pacific Time', ianna: 'America/Los_Angeles', offsetApprox: 'UTC-7 / UTC-8' },
  { code: 'AKT', name: 'Alaska Time', ianna: 'America/Anchorage', offsetApprox: 'UTC-8 / UTC-9' },
  { code: 'HST', name: 'Hawaii Time', ianna: 'Pacific/Honolulu', offsetApprox: 'UTC-10' },
];

export function TimezoneConverter() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    const isoString = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    return isoString;
  });
  const [baseZone, setBaseZone] = useState<string>('America/New_York');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live timer if live mode is enabled
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const now = new Date();
      const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setSelectedDate(iso);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive]);

  const targetDate = new Date(selectedDate);

  const getZoneTimeData = (iana: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: iana,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short',
      });
      const parts = formatter.formatToParts(targetDate);
      const hourPart = parts.find((p) => p.type === 'hour')?.value || '12';
      const minutePart = parts.find((p) => p.type === 'minute')?.value || '00';
      const dayPeriod = parts.find((p) => p.type === 'dayPeriod')?.value || 'AM';
      const tzName = parts.find((p) => p.type === 'timeZoneName')?.value || '';
      const dateStr = `${parts.find((p) => p.type === 'weekday')?.value}, ${parts.find((p) => p.type === 'month')?.value} ${parts.find((p) => p.type === 'day')?.value}`;

      // Check hour for status badge
      const hour24 = parseInt(
        new Intl.DateTimeFormat('en-US', { timeZone: iana, hour: 'numeric', hour12: false }).format(targetDate)
      );

      let status = 'Night';
      let isBusiness = false;
      if (hour24 >= 9 && hour24 < 17) {
        status = 'Business Hours';
        isBusiness = true;
      } else if (hour24 >= 6 && hour24 < 9) {
        status = 'Early Morning';
      } else if (hour24 >= 17 && hour24 < 22) {
        status = 'Evening';
      }

      return {
        timeFormatted: `${hourPart}:${minutePart} ${dayPeriod}`,
        tzAbbr: tzName,
        dateFormatted: dateStr,
        status,
        isBusiness,
        isNight: hour24 < 6 || hour24 >= 22,
      };
    } catch {
      return {
        timeFormatted: targetDate.toLocaleTimeString(),
        tzAbbr: '',
        dateFormatted: targetDate.toLocaleDateString(),
        status: 'Active',
        isBusiness: false,
        isNight: false,
      };
    }
  };

  const handleCopyAll = () => {
    const lines = US_ZONES.map((z) => {
      const d = getZoneTimeData(z.ianna);
      return `${z.name} (${d.tzAbbr}): ${d.timeFormatted} (${d.dateFormatted})`;
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedCode('ALL');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSetCurrent = () => {
    setIsLive(true);
    const now = new Date();
    setSelectedDate(
      new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">US Time Zone Converter</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">View and sync times across all major US time zones with daylight saving</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSetCurrent}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              isLive
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {isLive ? 'Live Sync Active' : 'Sync to Now'}
          </button>
          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
          >
            {copiedCode === 'ALL' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy All
          </button>
        </div>
      </div>

      {/* Date / Time controls */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
            Reference Date & Time
          </label>
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => {
              setIsLive(false);
              setSelectedDate(e.target.value);
            }}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
            Base Reference Zone
          </label>
          <select
            value={baseZone}
            onChange={(e) => setBaseZone(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
          >
            {US_ZONES.map((z) => (
              <option key={z.ianna} value={z.ianna}>
                {z.name} ({z.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of US Time Zones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {US_ZONES.map((z) => {
          const data = getZoneTimeData(z.ianna);
          const isBase = z.ianna === baseZone;

          return (
            <div
              key={z.code}
              className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                isBase
                  ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      {z.code}
                    </span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {z.name}
                    </span>
                  </div>
                  {isBase && (
                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-900/60 px-1.5 py-0.5 rounded">
                      Base
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {data.timeFormatted}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {data.tzAbbr}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                  {data.dateFormatted}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                    data.isBusiness
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                      : data.isNight
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                      : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {data.isNight ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                  {data.status}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${z.name} (${data.tzAbbr}): ${data.timeFormatted} - ${data.dateFormatted}`);
                    setCopiedCode(z.code);
                    setTimeout(() => setCopiedCode(null), 1500);
                  }}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
                  title="Copy this timezone"
                >
                  {copiedCode === z.code ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
