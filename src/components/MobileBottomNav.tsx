import React from 'react';
import { Grid, Landmark, Home, Compass, Sun, Moon, FileText } from 'lucide-react';
import { ToolItem } from '../types';

interface MobileBottomNavProps {
  activeToolId: string | null;
  onGoHome: () => void;
  onOpenSidebar: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onSelectTool: (id: string) => void;
}

export function MobileBottomNav({
  activeToolId,
  onGoHome,
  onOpenSidebar,
  darkMode,
  toggleDarkMode,
  onSelectTool,
}: MobileBottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200/90 dark:border-zinc-800/90 px-2 py-1 safe-area-bottom shadow-lg">
      <div className="grid grid-cols-5 gap-1 text-center">
        <button
          onClick={onGoHome}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
            !activeToolId
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">All Tools</span>
        </button>

        <button
          onClick={() => onSelectTool('paycheck')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
            activeToolId === 'paycheck' || activeToolId === 'tax' || activeToolId === 'loan'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <Landmark className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Finance</span>
        </button>

        <button
          onClick={() => onSelectTool('mortgage')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
            activeToolId === 'mortgage' || activeToolId === 'rent'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Housing</span>
        </button>

        <button
          onClick={() => onSelectTool('tip')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
            activeToolId === 'tip' || activeToolId === 'timezone' || activeToolId === 'unit'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Daily</span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="flex flex-col items-center justify-center py-1.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 transition"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          <span className="text-[10px] mt-0.5">{darkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}
