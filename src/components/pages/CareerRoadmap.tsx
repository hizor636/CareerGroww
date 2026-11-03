import React, { useState } from 'react';
import { RoadmapStep, LiveSession } from '../../types';
import { ROADMAP_STEPS, LIVE_SESSIONS } from '../../data/mockData';

interface CareerRoadmapProps {
  onShowToast: (msg: string) => void;
}

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({ onShowToast }) => {
  const [steps, setSteps] = useState<RoadmapStep[]>(ROADMAP_STEPS);
  const [sessions] = useState<LiveSession[]>(LIVE_SESSIONS);

  const completedSteps = steps.filter((s) => s.status === 'completed').length;
  const progressPct = Math.round((completedSteps / steps.length) * 100);

  const toggleStep = (id: number) => {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id === id) {
          const nextStatus = step.status === 'completed' ? 'upcoming' : 'completed';
          onShowToast(`Milestone marked as ${nextStatus === 'completed' ? 'Done' : 'Upcoming'}`);
          return {
            ...step,
            status: nextStatus,
            tag: nextStatus === 'completed' ? 'Completed' : 'Upcoming'
          };
        }
        return step;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          Career Roadmap
        </h2>
        <p className="text-[#8892B0] text-sm sm:text-base">
          Your personalised step-by-step learning path to becoming a Senior Full Stack Engineer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 8-Step Timeline */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>🗺️</span> Learning Path
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7C3AED]/20 text-[#9D5FFF] border border-[#7C3AED]/30">
              {progressPct}% Complete
            </span>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative flex items-start gap-4 group">
                {idx < steps.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] via-[#FF6B00]/40 to-transparent -translate-x-1/2" />
                )}

                <button
                  onClick={() => toggleStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 transition-transform group-hover:scale-110 cursor-pointer shadow-md ${
                    step.status === 'completed'
                      ? 'bg-[#10B981] text-white'
                      : step.status === 'current'
                      ? 'bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] text-white animate-ring-pulse'
                      : 'bg-white/10 text-[#8892B0] border border-white/15 hover:border-white/40'
                  }`}
                  title="Click to toggle status"
                >
                  {step.status === 'completed' ? '✓' : step.stepNum}
                </button>

                <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 hover:border-white/15 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="font-syne font-bold text-sm text-white">
                      {step.title}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      step.status === 'completed'
                        ? 'bg-[#10B981]/15 text-[#10B981]'
                        : step.status === 'current'
                        ? 'bg-[#FF6B00]/15 text-[#FF6B00]'
                        : 'bg-white/10 text-[#8892B0]'
                    }`}>
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#8892B0] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Sessions & Achievements */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
                <span>📅</span> Upcoming Sessions
              </h3>
            </div>
            <div className="space-y-3">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                  <div 
                    className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white shadow-xs"
                    style={{ background: sess.gradient }}
                  >
                    <span className="text-[9px] uppercase tracking-wider opacity-80">{sess.month}</span>
                    <span className="text-sm font-extrabold leading-tight">{sess.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-white truncate">{sess.title}</h4>
                    <p className="text-[11px] text-[#8892B0] truncate">{sess.time}</p>
                  </div>
                  <button
                    onClick={() => onShowToast(`Registered for ${sess.title}!`)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white font-semibold hover:opacity-90 transition cursor-pointer flex-shrink-0"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="border-b border-white/10 pb-4 mb-4">
              <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
                <span>🏆</span> Achievements
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF6B00]/30 transition-all">
                <div className="text-3xl mb-1">🥇</div>
                <div className="text-xs font-semibold text-white">JS Master</div>
                <div className="text-[10px] text-[#8892B0]">ES6+ Certified</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF6B00]/30 transition-all">
                <div className="text-3xl mb-1">🔥</div>
                <div className="text-xs font-semibold text-white">7-Day Streak</div>
                <div className="text-[10px] text-[#8892B0]">Daily Coding</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF6B00]/30 transition-all">
                <div className="text-3xl mb-1">⭐</div>
                <div className="text-xs font-semibold text-white">Top Learner</div>
                <div className="text-[10px] text-[#8892B0]">Top 5% Cohort</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 opacity-40 hover:opacity-100 transition-all">
                <div className="text-3xl mb-1">🎯</div>
                <div className="text-xs font-semibold text-white">Job Ready</div>
                <div className="text-[10px] text-[#8892B0]">In Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
