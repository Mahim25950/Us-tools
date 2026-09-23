import React from 'react';
import { ToolItem, ToolCategory } from '../types';
import { TOOLS, CATEGORIES } from '../data/tools';
import { ToolIcon } from './ToolIcon';
import { X, Search, ChevronRight } from 'lucide-react';

interface ToolSidebarProps {
  activeToolId: string | null;
  onSelectTool: (toolId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ToolSidebar({
  activeToolId,
  onSelectTool,
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}: ToolSidebarProps) {
  const filteredTools = TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Drawer Container (Mobile Slide-out & Desktop Collapsible / Side menu) */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-20 h-full md:h-[calc(100vh-4rem)] w-72 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out shrink-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header inside drawer */}
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            All Utilities ({TOOLS.length})
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search inside drawer */}
        <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter utilities..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-blue-500 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none"
            />
          </div>
        </div>

        {/* Scrollable list of tools */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredTools.length === 0 ? (
            <div className="p-4 text-center text-xs text-zinc-400">
              No matching tools found
            </div>
          ) : (
            filteredTools.map((tool) => {
              const isActive = tool.id === activeToolId;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition flex items-center gap-3 group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}
                  >
                    <ToolIcon name={tool.iconName} className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate flex items-center gap-1.5">
                      <span className={isActive ? 'font-bold' : 'font-medium'}>{tool.name}</span>
                      {tool.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 translate-x-0.5'
                        : 'text-zinc-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
