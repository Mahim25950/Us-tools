import React from 'react';
import { Settings } from 'lucide-react';

interface FooterProps {
  onGoHome: () => void;
  onViewAllTools: () => void;
  onSelectCategory?: (categoryId: string) => void;
  onOpenBlog?: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
}

export function Footer({
  onGoHome,
  onViewAllTools,
  onOpenBlog,
  onOpenAbout,
  onOpenContact,
}: FooterProps) {
  return (
    <footer className="bg-[#0a152d] text-white pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          {/* Brand Logo */}
          <button
            onClick={onGoHome}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Settings className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-bold tracking-tight text-white leading-tight">
                <span className="text-blue-500 font-black">US </span>
                <span className="font-extrabold">Life Tools</span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal">
                Simple Tools for a Better Life
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-slate-300 font-medium">
            <button
              onClick={onGoHome}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={onViewAllTools}
              className="hover:text-white transition-colors"
            >
              All Tools
            </button>
            <button
              onClick={onViewAllTools}
              className="hover:text-white transition-colors"
            >
              Categories
            </button>
            <button
              onClick={onOpenBlog}
              className="hover:text-white transition-colors"
            >
              Blog
            </button>
            <button
              onClick={onOpenAbout}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Social Icons matching image */}
          <div className="flex items-center gap-4 text-slate-400">
            {/* Facebook */}
            <a
              href="#facebook"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-blue-600 hover:text-white transition flex items-center justify-center text-xs font-bold"
            >
              f
            </a>
            {/* X / Twitter */}
            <a
              href="#x"
              aria-label="X Twitter"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-black hover:text-white transition flex items-center justify-center text-xs font-bold"
            >
              𝕏
            </a>
            {/* Instagram */}
            <a
              href="#instagram"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-pink-600 hover:text-white transition flex items-center justify-center text-xs font-bold"
            >
              📸
            </a>
            {/* YouTube */}
            <a
              href="#youtube"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-red-600 hover:text-white transition flex items-center justify-center text-xs font-bold"
            >
              ▶
            </a>
            {/* Pinterest */}
            <a
              href="#pinterest"
              aria-label="Pinterest"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-red-700 hover:text-white transition flex items-center justify-center text-xs font-bold"
            >
              P
            </a>
          </div>
        </div>

        {/* Bottom Copyright and Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2025 US Life Tools. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAbout} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <span>|</span>
            <button onClick={onOpenAbout} className="hover:text-slate-200 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
