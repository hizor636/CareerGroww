import React, { useState } from 'react';
import { Mentor } from '../../types';
import { MENTORS } from '../../data/mockData';

interface MentorBookingProps {
  onShowToast: (msg: string) => void;
  onOpenChat: () => void;
}

export const MentorBooking: React.FC<MentorBookingProps> = ({ onShowToast, onOpenChat }) => {
  const [mentors] = useState<Mentor[]>(MENTORS);
  const [bookedMentors, setBookedMentors] = useState<Record<string, boolean>>({});

  const handleBook = (mentor: Mentor) => {
    setBookedMentors((prev) => ({ ...prev, [mentor.id]: true }));
    onShowToast(`Session request sent to ${mentor.name}!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          AI &amp; Industry Mentors
        </h2>
        <p className="text-[#8892B0] text-sm sm:text-base">
          Get personalised guidance from our 24/7 AI coach and top leaders from tier-1 tech companies.
        </p>
      </div>

      {/* AI Mentor Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#1e0b3e] via-[#2d1060] to-[#1a0535] border border-[#7C3AED]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/30 border border-[#7C3AED]/50 text-[#9D5FFF] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            24/7 Active
          </div>
          <h3 className="font-syne font-bold text-xl text-white mb-1">
            Your AI Career Mentor is ready 🤖
          </h3>
          <p className="text-[#8892B0] text-xs sm:text-sm max-w-xl">
            Ask anything — resume critiques, behavioral interview answers, salary benchmarks, and tailored learning paths.
          </p>
        </div>
        <button
          onClick={onOpenChat}
          className="relative z-10 bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:opacity-90 hover:-translate-y-0.5 transition cursor-pointer flex-shrink-0"
        >
          💬 Start Chat
        </button>
      </div>

      {/* Human Mentors Grid */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>🤝</span> Top Human Mentors
            </h3>
            <p className="text-xs text-[#8892B0] mt-0.5">Book a 1:1 video session with industry engineers</p>
          </div>
          <span className="text-xs text-[#10B981] font-semibold bg-[#10B981]/15 px-3 py-1 rounded-full">
            Available this week
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentors.map((m) => {
            const isBooked = bookedMentors[m.id];
            return (
              <div
                key={m.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#7C3AED]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                    style={{ background: m.gradient }}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <h4 className="font-syne font-bold text-base text-white mb-1">
                    {m.name}
                  </h4>
                  <div className="text-xs text-[#8892B0] mb-2">{m.role}</div>
                  <div className="text-xs font-bold text-[#FF6B00] mb-4">
                    {m.company}
                  </div>
                </div>

                <button
                  onClick={() => handleBook(m)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isBooked
                      ? 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981]'
                      : 'bg-gradient-to-r from-[#7C3AED]/30 to-[#FF6B00]/20 border border-[#7C3AED]/40 text-white hover:from-[#7C3AED] hover:to-[#FF6B00] hover:border-transparent'
                  }`}
                >
                  {isBooked ? '✓ Request Sent' : 'Book Session'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
