import React from 'react';

const REVIEWS = [
  {
    stars: '★★★★★',
    quote: '"Career Groww completely transformed my career. Within 6 months I went from a fresher to a Software Engineer at a funded startup with a ₹10 LPA package!"',
    author: 'Riya Sharma',
    role: 'Software Engineer, Bengaluru',
    initial: 'R',
    bg: '#FF6B00'
  },
  {
    stars: '★★★★★',
    quote: '"The mentorship program is incredible. My mentor helped me crack interviews at 3 top MNCs. I got placed at ₹12 LPA — best investment I\'ve ever made!"',
    author: 'Arjun Patel',
    role: 'Data Analyst, Pune',
    initial: 'A',
    bg: '#1A1F3C'
  },
  {
    stars: '★★★★★',
    quote: '"The live projects made all the difference. I built a strong portfolio and received my first job offer before even finishing the course. Highly recommended!"',
    author: 'Priya Menon',
    role: 'Full Stack Developer, Chennai',
    initial: 'P',
    bg: '#2E3563'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-6 lg:px-16 bg-[#F7F8FC] text-[#1A1F3C]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest block mb-3">
            Student Stories
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-[#1A1F3C] mb-4">
            What Our Students Say
          </h2>
          <p className="text-[#8892B0] text-base leading-relaxed max-w-xl">
            Real results from real people who chose to grow with Career Groww.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-8 border border-[#E8EAF2] hover:shadow-[0_16px_48px_rgba(255,107,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-[#FF6B00] text-lg tracking-widest mb-3">
                  {rev.stars}
                </div>
                <p className="text-[#1A1F3C] text-sm leading-relaxed italic mb-6">
                  {rev.quote}
                </p>
              </div>
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#E8EAF2]">
                <div 
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-base flex-shrink-0"
                  style={{ background: rev.bg }}
                >
                  {rev.initial}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1A1F3C]">{rev.author}</div>
                  <div className="text-xs text-[#8892B0]">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
