import React, { useState } from 'react';
import { Settings, Search, ChevronDown, Sun, Moon, Menu, X, Globe, Sparkles } from 'lucide-react';
import { ToolItem } from '../types';
import { CATEGORIES_LIST } from '../data/tools';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTool: ToolItem | null;
  onGoHome: () => void;
  onSelectCategory?: (categoryId: string) => void;
  onOpenSearch?: () => void;
  onOpenBlog?: () => void;
  onOpenAbout?: () => void;
  onViewAllTools?: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Navbar({
  darkMode,
  toggleDarkMode,
  activeTool,
  onGoHome,
  onSelectCategory,
  onOpenSearch,
  onOpenBlog,
  onOpenAbout,
  onViewAllTools,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo matching the image: Blue gear badge + "US Life Tools" + "Simple Tools for a Better Life" */}
          <button
            onClick={onGoHome}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Settings className="w-6 h-6 animate-spin-slow stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold tracking-tight leading-tight">
                <span className="text-blue-600 font-black">US </span>
                <span className="text-zinc-900 dark:text-zinc-50 font-extrabold">Life Tools</span>
              </div>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                Simple Tools for a Better Life
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={onGoHome}
              className={`relative py-2 transition-colors ${
                !activeTool
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-blue-600'
              }`}
            >
              Home
              {!activeTool && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              onClick={onViewAllTools || onGoHome}
              className="py-2 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              All Tools
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdown(!categoriesDropdown)}
                className="py-2 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoriesDropdown && (
                <div
                  onMouseLeave={() => setCategoriesDropdown(false)}
                  className="absolute left-0 mt-2 w-64 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-1.5">
                    Browse Categories
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-72 overflow-y-auto">
                    {CATEGORIES_LIST.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          if (onSelectCategory) onSelectCategory(cat.id);
                          setCategoriesDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onOpenBlog}
              className="py-2 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Blog
            </button>

            <button
              onClick={onOpenAbout}
              className="py-2 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </button>
          </nav>

          {/* Right Action Icons: Search, Country Selector USA, Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              title="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* USA Country Dropdown matching the image */}
            <div className="relative">
              <button
                onClick={() => setCountryDropdown(!countryDropdown)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition border border-zinc-200 dark:border-zinc-800"
              >
                <span className="text-base leading-none">🇺🇸</span>
                <span>USA</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {countryDropdown && (
                <div
                  onMouseLeave={() => setCountryDropdown(false)}
                  className="absolute right-0 mt-2 w-48 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 text-xs"
                >
                  <div className="px-3 py-1.5 font-bold text-zinc-400 text-[10px] uppercase">
                    Supported Regions
                  </div>
                  <button
                    onClick={() => setCountryDropdown(false)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span>🇺🇸</span> United States (USD)
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </button>
                  <div className="px-3 py-2 text-[11px] text-zinc-500 italic">
                    All tools calibrated for 2026 US laws, IRS brackets, and customary units.
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
