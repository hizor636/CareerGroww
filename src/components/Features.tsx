import React from 'react';

const FEATURES_DATA = [
  {
    icon: '🎓',
    title: 'Expert-Led Courses',
    desc: 'Learn from industry professionals with 10+ years of experience at Google, Amazon, and Infosys.'
  },
  {
    icon: '🎯',
    title: 'AI-Personalised Learning',
    desc: 'Smart learning paths adapted to your goals, current skill level, and preferred pace of learning.'
  },
  {
    icon: '💼',
    title: 'Placement Assistance',
    desc: 'Dedicated placement cell with 500+ hiring partners actively recruiting from our network.'
  },
  {
    icon: '🏆',
    title: 'Industry Certificates',
    desc: 'Globally recognised certifications that make your resume stand out to top recruiters instantly.'
  },
  {
    icon: '🤝',
    title: '1-on-1 Mentorship',
    desc: 'Personal guidance sessions from mentors working at top product and service-based companies.'
  },
  {
    icon: '⚡',
    title: 'Live Projects',
    desc: 'Build a portfolio that impresses with hands-on projects mirroring real-world industry challenges.'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 lg:px-16 bg-[#F7F8FC] text-[#1A1F3C]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest block mb-3">
            Why Career Groww
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-[#1A1F3C] mb-4 max-w-xl">
            Everything You Need to Grow Your Career
          </h2>
          <p className="text-[#8892B0] text-base leading-relaxed max-w-xl">
            End-to-end career support from skill-building to placement with top industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 border border-[#E8EAF2] hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(255,107,0,0.12)] hover:border-[#FF8C35]/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center text-2xl mb-6 group-hover:bg-[#FF6B00] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <span>{feat.icon}</span>
              </div>
              <h3 className="font-syne font-bold text-lg text-[#1A1F3C] mb-2.5">
                {feat.title}
              </h3>
              <p className="text-[#8892B0] text-sm leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
