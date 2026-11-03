import React from 'react';

interface CtaSectionProps {
  onStartFree: () => void;
  onBrowseCourses: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartFree, onBrowseCourses }) => {
  return (
    <section id="cta" className="py-24 px-6 lg:px-16 bg-[#1A1F3C] text-white text-center relative overflow-hidden">
      {/* Glow Center */}
      <div className="absolute w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.18),transparent_65%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
          Ready to <span className="text-[#FF6B00]">Grow Your Career?</span>
        </h2>
        <p className="text-[#8892B0] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Join 50,000+ professionals who've already transformed their careers with Career Groww. Start free today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartFree}
            className="bg-[#FF6B00] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base cursor-pointer shadow-[0_4px_22px_rgba(255,107,0,0.4)] hover:shadow-[0_12px_36px_rgba(255,107,0,0.55)] hover:-translate-y-0.5 transition-all"
          >
            Start Free Today
          </button>
          <button
            onClick={onBrowseCourses}
            className="bg-transparent text-white px-8 py-3.5 rounded-xl border border-white/25 font-semibold text-sm sm:text-base cursor-pointer hover:bg-white/10 hover:border-[#FF6B00] transition-all"
          >
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  );
};
