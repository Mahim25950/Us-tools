import React, { useState } from 'react';
import { ToolItem, ToolCategory } from '../types';
import { TOOLS, POPULAR_TOOLS, CATEGORIES_LIST } from '../data/tools';
import { ToolIcon } from './ToolIcon';
import { HeroIllustration } from './HeroIllustration';
import {
  Search,
  ArrowRight,
  Zap,
  Smartphone,
  ShieldCheck,
  Heart,
  Rocket,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

interface DashboardViewProps {
  onSelectTool: (toolId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ToolCategory;
  setSelectedCategory: (cat: ToolCategory) => void;
}

export function DashboardView({
  onSelectTool,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: DashboardViewProps) {
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handlePopularSearchClick = (term: string, toolId?: string) => {
    setSearchInput(term);
    setSearchQuery(term);
    if (toolId) {
      onSelectTool(toolId);
    }
  };

  // Filter tools if user is searching or has a category selected
  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== 'all';

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section matching the image */}
      <section className="relative pt-6 pb-4 sm:pt-10 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, subtext, search bar, popular searches */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Green pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Free • Fast • Easy to Use</span>
            </div>

            {/* Big Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
              All the Essential Tools <br className="hidden sm:block" />
              You Need —{' '}
              <span className="text-zinc-900 dark:text-zinc-50">In One Place</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              Calculate, convert, plan and get things done with our free online tools. Designed for everyday life in the USA.
            </p>

            {/* Search Input Box matching the image */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center shadow-md shadow-blue-500/5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
                <Search className="w-5 h-5 text-zinc-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search tools (e.g. tax calculator, mortgage, PDF, etc.)"
                  className="w-full px-3 py-2 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular searches row matching the image */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">
                Popular searches:
              </span>
              <button
                type="button"
                onClick={() => handlePopularSearchClick('tax calculator', 'tax')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                tax calculator
              </button>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <button
                type="button"
                onClick={() => handlePopularSearchClick('mortgage calculator', 'mortgage')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                mortgage calculator
              </button>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <button
                type="button"
                onClick={() => handlePopularSearchClick('tip calculator', 'tip')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                tip calculator
              </button>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <button
                type="button"
                onClick={() => handlePopularSearchClick('pdf converter', 'pdf')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                pdf converter
              </button>
            </div>
          </div>

          {/* Right Column: Hero Illustration (Statue of Liberty + Skyline + Flag) */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* If search query is active, show matching tools first */}
      {isFiltering && (
        <section className="p-6 bg-blue-50/50 dark:bg-blue-950/30 rounded-3xl border border-blue-100 dark:border-blue-900/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Search & Filter Results ({filteredTools.length})
              </h2>
              {searchQuery && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Showing results for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchInput('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-sm">
              No tools matched your criteria. Try another search or view all tools below.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 cursor-pointer transition shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <ToolIcon name={tool.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 2. "Browse by Category" Section (12 Categories Grid) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Browse by Category
          </h2>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES_LIST.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                // Map category to related tools or activate category filter
                setSelectedCategory(cat.id);
                // Scroll to filtered section
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/80 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${cat.iconBg} ${cat.iconColor} group-hover:scale-105 transition-transform`}
                >
                  <ToolIcon name={cat.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    {cat.count}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Four Value Propositions / Trust Pillars Container matching the image */}
      <section className="rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {/* Pillar 1: Fast & Accurate */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">
              Fast & Accurate
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Get instant results with reliable calculations.
            </p>
          </div>

          {/* Pillar 2: Mobile Friendly */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">
              Mobile Friendly
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Works perfectly on all devices.
            </p>
          </div>

          {/* Pillar 3: 100% Free */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">
              100% Free
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              No hidden fees. No sign up required.
            </p>
          </div>

          {/* Pillar 4: Made for You */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-sm">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">
              Made for You
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Built to make your daily life easier.
            </p>
          </div>
        </div>
      </section>

      {/* 4. "Popular Tools" Section (6 Cards with Blue Buttons) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Popular Tools
          </h2>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 6 Popular Tools Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {POPULAR_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/60 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Icon in colored box */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${tool.iconBg} ${tool.iconColor}`}
                >
                  <ToolIcon name={tool.iconName} className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-snug">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Action button */}
              <button
                type="button"
                onClick={() => onSelectTool(tool.id)}
                className="mt-5 w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1 shadow-xs"
              >
                <span>{tool.buttonText || 'Use Tool →'}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. "Need More Tools?" Call to Action Banners matching the image */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Orange Rocket Banner */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-orange-100/70 dark:from-amber-950/40 dark:via-orange-950/40 dark:to-orange-900/30 border border-orange-200/80 dark:border-orange-900/60 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
              <Rocket className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100">
                Need More Tools?
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-md leading-relaxed">
                Explore 50+ free tools including tax calculators, loan calculators, PDF tools, converters and much more!
              </p>
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/30 transition flex items-center gap-1.5"
            >
              <span>View All Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {/* Visual burst lines */}
            <div className="absolute -right-3 -top-2 text-orange-400 text-xs font-bold pointer-events-none hidden sm:block">
              ✨
            </div>
          </div>
        </div>

        {/* Right Lightbulb Banner */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
            Smart tools. <br />
            Better decisions. <br />
            <span className="text-blue-600 dark:text-blue-400">A smoother life.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
