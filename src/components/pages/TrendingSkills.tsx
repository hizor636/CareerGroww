import React, { useState } from 'react';
import { TrendingSkill } from '../../types';

interface TrendingSkillsProps {
  skills: TrendingSkill[];
}

export const TrendingSkills: React.FC<TrendingSkillsProps> = ({ skills }) => {
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filtered = selectedCat === 'All' 
    ? skills 
    : skills.filter((s) => s.category === selectedCat);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          Trending Skills in Tech
        </h2>
        <p className="text-[#8892B0] text-sm sm:text-base">
          Real-time hiring trends and industry demand analytics across tech sectors.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedCat === cat
                ? 'bg-[#FF6B00] text-white shadow-xs'
                : 'bg-white/5 text-[#8892B0] hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#7C3AED]/40 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#5B21B6] flex items-center justify-center text-base shadow-sm">
                ⚡
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">{skill.name}</h4>
                <p className="text-xs text-[#8892B0]">{skill.category}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#10B981]/15 text-[#10B981] inline-block mb-1">
                {skill.growth}
              </span>
              <div className="text-xs text-[#8892B0]">Demand: {skill.demand}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
