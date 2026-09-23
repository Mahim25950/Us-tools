import React, { useState } from 'react';
import { Cake, RotateCcw, Copy, Check, Sparkles, Clock, Calendar } from 'lucide-react';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('1998-06-15');
  const [copied, setCopied] = useState<boolean>(false);

  const calculateAgeDetails = () => {
    if (!birthDate) return null;
    const dob = new Date(birthDate + 'T00:00:00');
    const now = new Date();

    if (isNaN(dob.getTime()) || dob > now) {
      return null;
    }

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days lived
    const diffTime = Math.abs(now.getTime() - dob.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    // Next birthday countdown
    let nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < now) {
      nextBday = new Date(now.getFullYear() + 1, dob.getMonth(), dob.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const nextBdayDayName = nextBday.toLocaleDateString('en-US', { weekday: 'long' });

    // Generation
    const birthYear = dob.getFullYear();
    let generation = 'Generation';
    if (birthYear >= 2013) generation = 'Gen Alpha (2013+)';
    else if (birthYear >= 1997) generation = 'Gen Z (1997–2012)';
    else if (birthYear >= 1981) generation = 'Millennial (1981–1996)';
    else if (birthYear >= 1965) generation = 'Gen X (1965–1980)';
    else if (birthYear >= 1946) generation = 'Baby Boomer (1946–1964)';
    else generation = 'Silent Generation';

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      daysUntilBirthday,
      nextBdayDayName,
      generation,
    };
  };

  const details = calculateAgeDetails();

  const handleCopy = () => {
    if (!details) return;
    const text = `Age Milestone:
Exact Age: ${details.years} Years, ${details.months} Months, ${details.days} Days
Total Days Lived: ${details.totalDays.toLocaleString()} Days (${details.totalWeeks.toLocaleString()} Weeks)
Next Birthday: In ${details.daysUntilBirthday} days (falls on a ${details.nextBdayDayName})
Generation: ${details.generation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Age & Milestone Calculator</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Exact chronological age, milestone countdowns, and life statistics</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBirthDate('1998-06-15')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handleCopy}
            disabled={!details}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition disabled:opacity-50"
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
              Select Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition outline-none"
            />
          </div>

          {details && (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Next Birthday Countdown</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  {details.daysUntilBirthday}
                </span>
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  days to go
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Your next birthday will fall on a <strong>{details.nextBdayDayName}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 flex flex-col justify-between p-5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 dark:from-zinc-900 dark:to-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          {details ? (
            <>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Current Chronological Age
                </span>
                <div className="mt-2 flex items-baseline gap-3">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
                      {details.years}
                    </span>
                    <span className="block text-[11px] font-semibold text-zinc-400 uppercase">Years</span>
                  </div>
                  <span className="text-2xl text-zinc-300 dark:text-zinc-700 font-light">•</span>
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
                      {details.months}
                    </span>
                    <span className="block text-[11px] font-semibold text-zinc-400 uppercase">Months</span>
                  </div>
                  <span className="text-2xl text-zinc-300 dark:text-zinc-700 font-light">•</span>
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100">
                      {details.days}
                    </span>
                    <span className="block text-[11px] font-semibold text-zinc-400 uppercase">Days</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                    <div className="text-zinc-400">Total Days Lived</div>
                    <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {details.totalDays.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                    <div className="text-zinc-400">Total Weeks</div>
                    <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      ~{details.totalWeeks.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                    <div className="text-zinc-400">Total Hours</div>
                    <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      ~{details.totalHours.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
                    <div className="text-zinc-400">Generation</div>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5 truncate">
                      {details.generation}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-zinc-400 text-sm">
              Please enter a valid birth date in the past.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
