import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onOpenSignup: () => void;
  onExploreCourses: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSignup, onScrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero', 'features', 'how', 'courses', 'testimonials'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(26,31,60,0.1)] border-b border-[#FF6B00]/10' 
        : 'bg-white/90 backdrop-blur-sm border-b border-transparent'
    }`}>
      {/* Logo */}
      <a 
        href="#hero" 
        onClick={(e) => { e.preventDefault(); onScrollTo('hero'); }}
        className="flex items-center gap-2.5 font-syne font-extrabold text-2xl text-[#1A1F3C] no-underline group"
      >
        <div className="w-10 h-10 rounded-full bg-[#1A1F3C] flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M3 17L9 11L13 15L21 7" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 7H21V11" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex tracking-tight">
          <span className="text-[#1A1F3C]">Career</span>
          <span className="text-[#FF6B00]">Groww</span>
        </div>
      </a>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {[
          { id: 'hero', label: 'Home' },
          { id: 'features', label: 'Features' },
          { id: 'how', label: 'How It Works' },
          { id: 'courses', label: 'Courses' },
          { id: 'testimonials', label: 'Reviews' },
        ].map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onScrollTo(item.id)}
              className={`text-sm font-medium transition-colors relative py-1 cursor-pointer bg-transparent border-none ${
                activeSection === item.id ? 'text-[#FF6B00] font-semibold' : 'text-[#1A1F3C] hover:text-[#FF6B00]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B00] rounded-full animate-fade-in" />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSignup}
          className="bg-[#FF6B00] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer shadow-[0_4px_18px_rgba(255,107,0,0.35)] hover:bg-[#FF8C35] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,0,0.45)] transition-all"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};
