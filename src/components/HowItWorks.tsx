import React from 'react';

const STEPS_DATA = [
  {
    num: 1,
    title: 'Create Account',
    desc: 'Sign up free in 30 seconds. No credit card required to start exploring.'
  },
  {
    num: 2,
    title: 'Choose Your Path',
    desc: 'Pick a career track and let our AI build the perfect learning roadmap for you.'
  },
  {
    num: 3,
    title: 'Learn & Build',
    desc: 'Complete courses, work on live projects, and earn industry-recognised certificates.'
  },
  {
    num: 4,
    title: 'Get Placed',
    desc: 'Connect with 500+ hiring partners and land your dream role with full support.'
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how" className="py-24 px-6 lg:px-16 bg-[#1A1F3C] text-white">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest block mb-3">
          Simple Process
        </span>
        <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Your Journey in 4 Steps
        </h2>
        <p className="text-[#8892B0] text-base leading-relaxed max-w-lg mx-auto mb-16">
          Getting started is easier than you think.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting gradient line on desktop */}
          <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#FF6B00] via-[#7C3AED] to-[#2E3563] z-0" />

          {STEPS_DATA.map((step) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full mb-6 bg-[#252B50] border-4 border-[#2E3563] flex items-center justify-center font-syne font-extrabold text-2xl text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white group-hover:border-[#FF6B00] group-hover:scale-110 transition-all duration-300 shadow-lg">
                {step.num}
              </div>
              <h3 className="font-syne font-bold text-lg text-white mb-2">
                {step.title}
              </h3>
              <p className="text-[#8892B0] text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
