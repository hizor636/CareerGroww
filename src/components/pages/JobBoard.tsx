import React, { useState } from 'react';
import { Job, PageType } from '../../types';

interface JobBoardProps {
  jobs: Job[];
  onNavigate: (page: PageType) => void;
  onShowToast: (msg: string) => void;
}

export const JobBoard: React.FC<JobBoardProps> = ({ jobs, onNavigate, onShowToast }) => {
  const [appliedMap, setAppliedMap] = useState<Record<string, boolean>>({});

  const handleApply = (job: Job) => {
    setAppliedMap((prev) => ({ ...prev, [job.id]: true }));
    onShowToast(`Applied to ${job.company} for ${job.title}!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          Job Board
        </h2>
        <p className="text-[#8892B0] text-sm sm:text-base">
          Personalised job openings matched to your current tech stack and verified assessment scores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Jobs List */}
        <div className="lg:col-span-2 space-y-4">
          {jobs.map((job) => {
            const isApplied = appliedMap[job.id];
            return (
              <div
                key={job.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#7C3AED]/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#1e3a5f] to-[#2d5986] flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                      {job.icon}
                    </div>
                    <div>
                      <h4 className="font-syne font-bold text-base text-white">{job.title}</h4>
                      <p className="text-xs text-[#8892B0] mt-0.5">
                        {job.company} · {job.location} · <span className="text-[#FF8C35] font-semibold">{job.salary}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] whitespace-nowrap">
                    {job.match}% match
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap mb-4">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-0.5 rounded-md bg-white/5 text-[#8892B0] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-xs text-[#8892B0]">Direct Recruiter Pipeline</span>
                  <button
                    onClick={() => handleApply(job)}
                    disabled={isApplied}
                    className={`px-5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      isApplied
                        ? 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981]'
                        : 'bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white hover:opacity-90 shadow-md'
                    }`}
                  >
                    {isApplied ? '✓ Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Match Score Summary Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center sticky top-24">
          <div className="border-b border-white/10 pb-4 mb-6">
            <h3 className="font-syne font-bold text-base text-white">🎯 Match Score</h3>
          </div>

          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <defs>
                <linearGradient id="jobMatchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#FF6B00" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#jobMatchGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * 68) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-syne font-extrabold text-2xl text-white">68%</span>
              <span className="text-[10px] text-[#8892B0]">Avg Match</span>
            </div>
          </div>

          <p className="text-xs text-[#8892B0] leading-relaxed mb-6">
            Complete your React.js and Node.js milestone projects to increase your average hiring match to <span className="text-white font-semibold">85%+</span>.
          </p>

          <button
            onClick={() => onNavigate('courses')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white font-semibold text-xs sm:text-sm shadow-md hover:opacity-90 transition cursor-pointer"
          >
            Boost Profile
          </button>
        </div>
      </div>
    </div>
  );
};
