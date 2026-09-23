import React, { useState, useEffect } from 'react';
import { TOOLS } from './data/tools';
import { ToolItem, ToolCategory } from './types';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { ActiveToolContainer } from './components/ActiveToolContainer';
import { Footer } from './components/Footer';
import { BlogModal, AboutModal, SearchModal } from './components/InfoModals';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('us_life_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [blogModalOpen, setBlogModalOpen] = useState<boolean>(false);
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Sync dark mode class on html document element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('us_life_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('us_life_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSelectTool = (toolId: string) => {
    setActiveToolId(toolId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveToolId(null);
    setSearchQuery('');
    setSelectedCategory('all');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveToolId(null);
    setSelectedCategory(categoryId as ToolCategory);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const activeTool = activeToolId
    ? TOOLS.find((t) => t.id === activeToolId) || null
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeTool={activeTool}
        onGoHome={handleGoHome}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBlog={() => setBlogModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onViewAllTools={() => {
          setActiveToolId(null);
          setSelectedCategory('all');
          setSearchQuery('');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {activeTool ? (
          <ActiveToolContainer
            tool={activeTool}
            onGoHome={handleGoHome}
            onSelectTool={handleSelectTool}
          />
        ) : (
          <DashboardView
            onSelectTool={handleSelectTool}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </main>

      {/* Footer matching image */}
      <Footer
        onGoHome={handleGoHome}
        onViewAllTools={() => {
          setActiveToolId(null);
          setSelectedCategory('all');
          setSearchQuery('');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
        onOpenBlog={() => setBlogModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenContact={() => setAboutModalOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeToolId={activeToolId}
        onGoHome={handleGoHome}
        onOpenSidebar={() => setMobileMenuOpen(true)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onSelectTool={handleSelectTool}
      />

      {/* Modals for Blog, About, and Search */}
      <BlogModal isOpen={blogModalOpen} onClose={() => setBlogModalOpen(false)} />
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
