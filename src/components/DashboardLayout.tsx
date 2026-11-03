import React, { useState } from 'react';
import { PageType, User } from '../types';

interface DashboardLayoutProps {
  user: User;
  activePage: PageType;
  onPageChange: (page: PageType) => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  activePage,
  onPageChange,
  onLogout,
  searchQuery,
  onSearchChange,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { section: 'Main', items: [
      { id: 'dashboard' as PageType, label: 'Dashboard', icon: '🏠' },
      { id: 'gap' as PageType, label: 'Skill Gap Engine', icon: '🎯' },
      { id: 'roadmap' as PageType, label: 'Career Roadmap', icon: '🗺️' },
      { id: 'resume' as PageType, label: 'Resume Analyzer', icon: '📄' },
    ]},
    { section: 'Build & Prep', items: [
      { id: 'projects' as PageType, label: 'AI Project Lab', icon: '🧪', badge: 'New' },
      { id: 'interview' as PageType, label: 'Interview Studio', icon: '🎤' },
      { id: 'mentor' as PageType, label: 'AI & Mentors', icon: '🤝', badge: 'Live' }
    ]},
    { section: 'Career & Learn', items: [
      { id: 'courses' as PageType, label: 'My Courses', icon: '🎓' },
      { id: 'jobs' as PageType, label: 'Job Board', icon: '💼', badge: '12' },
      { id: 'skills' as PageType, label: 'Trending Skills', icon: '⚡' }
    ]},
    { section: 'Account', items: [
      { id: 'notifications' as PageType, label: 'Notifications', icon: '🔔', badge: '3' },
      { id: 'profile' as PageType, label: 'Profile', icon: '👤' }
    ]}
  ];

  const pageTitles: Record<PageType, string> = {
    dashboard: 'Dashboard',
    resume: 'Resume Analyzer',
    gap: 'Skill Gap Engine',
    roadmap: 'Career Roadmap',
    projects: 'AI Project Lab',
    interview: 'Interview Studio',
    mentor: 'AI & Mentors',
    courses: 'My Courses',
    jobs: 'Job Board',
    skills: 'Trending Skills',
    notifications: 'Notifications',
    profile: 'My Profile'
  };

  const handleNavClick = (page: PageType) => {
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-[#E2E8FF] flex">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-gradient-to-b from-[#1a0d35] to-[#120926] border-r border-white/10 flex flex-col fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1A1F3C] flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M3 17L9 11L13 15L21 7" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 7H21V11" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="font-syne font-extrabold text-xl tracking-tight">
              <span className="text-white">Career</span>
              <span className="text-[#FF6B00]">Groww</span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-[#8892B0] hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
          {navItems.map((sec) => (
            <div key={sec.section}>
              <div className="text-[10px] font-bold tracking-wider uppercase text-[#8892B0] px-3 mb-1.5">
                {sec.section}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#7C3AED]/30 to-[#FF6B00]/15 text-white border border-[#7C3AED]/40 shadow-sm'
                          : 'text-[#8892B0] hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] text-white shadow-xs' 
                          : 'bg-white/5 text-[#E2E8FF]'
                      }`}>
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          item.badge === 'Live' 
                            ? 'bg-[#FF6B00] text-white' 
                            : item.badge === 'New'
                            ? 'bg-[#10B981] text-white'
                            : 'bg-[#7C3AED]/40 text-[#9D5FFF]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-white/10">
          <div 
            onClick={() => handleNavClick('profile')}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] flex items-center justify-center font-bold text-white text-xs flex-shrink-0 shadow-sm">
              {user.avatarLetter}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-xs sm:text-sm text-white truncate">{user.name}</div>
              <div className="text-[11px] text-[#8892B0] truncate">{user.track}</div>
            </div>
            <span className="text-[#8892B0] text-base">›</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#0f0a1e]/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 cursor-pointer"
            >
              ☰
            </button>
            <h1 className="font-syne font-bold text-xl text-white tracking-tight">
              {pageTitles[activePage]}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative hidden sm:flex items-center w-64 md:w-80">
              <span className="absolute left-3 text-sm opacity-60">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search courses, skills, jobs, projects..."
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-[#8892B0] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-xs text-[#8892B0] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Notification Icon */}
            <button
              onClick={() => onPageChange('notifications')}
              className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-sm cursor-pointer transition-all hover:border-[#7C3AED]"
              title="Notifications"
            >
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF6B00] border border-[#0f0a1e]" />
            </button>

            {/* Profile Icon */}
            <button
              onClick={() => onPageChange('profile')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-sm cursor-pointer transition-all hover:border-[#7C3AED]"
              title="Profile"
            >
              👤
            </button>

            {/* Logout Icon */}
            <button
              onClick={onLogout}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF4B8B]/20 text-[#FF4B8B] flex items-center justify-center text-base cursor-pointer transition-all hover:border-[#FF4B8B]/40"
              title="Logout"
            >
              ⏻
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
