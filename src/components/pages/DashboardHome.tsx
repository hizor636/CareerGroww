import React from 'react';
import { PageType, User, Job, TrendingSkill, RoadmapStep } from '../../types';

interface DashboardHomeProps {
  user: User;
  onNavigate: (page: PageType) => void;
  trendingSkills: TrendingSkill[];
  roadmapSteps: RoadmapStep[];
  jobs: Job[];
  onOpenChat: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  user,
  onNavigate,
  trendingSkills,
  roadmapSteps,
  jobs,
  onOpenChat,
}) => {
  const topSkills = trendingSkills.slice(0, 4);
  const topRoadmap = roadmapSteps.slice(0, 4);
  const topJobs = jobs.slice(0, 2);

  const skillsProgress = [
    { name: 'JavaScript', val: 82, grad: 'from-[#7C3AED] to-[#FF6B00]' },
    { name: 'React.js', val: 65, grad: 'from-[#0EA5E9] to-[#7C3AED]' },
    { name: 'Node.js', val: 40, grad: 'from-[#10B981] to-[#0EA5E9]' },
    { name: 'MongoDB', val: 30, grad: 'from-[#F59E0B] to-[#10B981]' },
    { name: 'Git & DevOps', val: 55, grad: 'from-[#FF6B00] to-[#F59E0B]' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-7 sm:p-9 bg-gradient-to-r from-[#1e0b3e] via-[#2d1060] to-[#1a0535] border border-[#7C3AED]/30 shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.18),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Welcome back, <span className="text-[#FF6B00]">{user.name.split(' ')[0]}</span> 👋
            </h2>
            <p className="text-[#8892B0] text-sm sm:text-base">
              You're <span className="text-white font-semibold">{user.profileStrength}%</span> through your {user.track} roadmap. Keep going!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('resume')}
              className="bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:opacity-90 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>✨</span>
              <span>Analyze My Skills</span>
            </button>
            <button
              onClick={onOpenChat}
              className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>💬</span>
              <span>Ask AI Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Courses Enrolled', num: '4', badge: '+12%', up: true, icon: '📚', bg: 'rgba(124,58,237,.15)' },
          { label: 'Profile Strength', num: '68%', badge: '+8%', up: true, icon: '⚡', bg: 'rgba(255,107,0,.15)' },
          { label: 'Jobs Matched', num: '12', badge: '+5', up: true, icon: '💼', bg: 'rgba(16,185,129,.15)' },
          { label: 'Certificates Earned', num: '3', badge: '+2', up: true, icon: '🏆', bg: 'rgba(59,130,246,.15)' }
        ].map((stat, i) => (
          <div 
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#7C3AED]/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-xs"
                style={{ background: stat.bg }}
              >
                {stat.icon}
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981]">
                {stat.badge}
              </span>
            </div>
            <div className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-1">
              {stat.num}
            </div>
            <div className="text-xs sm:text-sm text-[#8892B0]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Navigation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'resume' as PageType, title: 'Resume Analysis', desc: 'AI-powered skill extraction from your resume', icon: '📤', grad: 'from-[#EC4899] to-[#9333EA]' },
          { id: 'gap' as PageType, title: 'Gap Analysis', desc: 'Identify missing skills for your dream role', icon: '🎯', grad: 'from-[#0EA5E9] to-[#06B6D4]' },
          { id: 'roadmap' as PageType, title: 'Career Roadmap', desc: 'Personalised learning path generation', icon: '🚀', grad: 'from-[#F43F5E] to-[#E11D48]' },
          { id: 'mentor' as PageType, title: 'AI Mentor', desc: '24/7 career guidance & mentor bookings', icon: '💬', grad: 'from-[#0891B2] to-[#0EA5E9]' },
        ].map((tile) => (
          <div
            key={tile.id}
            onClick={() => onNavigate(tile.id)}
            className="bg-white/5 border border-white/10 hover:border-[#7C3AED]/50 hover:bg-white/10 rounded-2xl p-6 cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${tile.grad} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-md`}>
              {tile.icon}
            </div>
            <h3 className="font-syne font-bold text-base text-white mb-1.5 group-hover:text-[#FF6B00] transition-colors">
              {tile.title}
            </h3>
            <p className="text-xs text-[#8892B0] leading-relaxed">
              {tile.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Two-Column Grid: Trending Skills & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Skills */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>🔥</span> Trending Skills in Tech
            </h3>
            <button
              onClick={() => onNavigate('skills')}
              className="text-xs font-semibold text-[#9D5FFF] hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              View all →
            </button>
          </div>
          <div className="p-6 space-y-3">
            {topSkills.map((skill) => (
              <div
                key={skill.name}
                onClick={() => onNavigate('skills')}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#7C3AED]/40 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#5B21B6] flex items-center justify-center text-sm shadow-xs">
                    ⚡
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{skill.name}</div>
                    <div className="text-xs text-[#8892B0]">{skill.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#10B981]/15 text-[#10B981] inline-block mb-0.5">
                    {skill.growth}
                  </span>
                  <div className="text-[11px] text-[#8892B0]">Demand: {skill.demand}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Preview */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>🗺️</span> My Career Roadmap
            </h3>
            <button
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-semibold text-[#9D5FFF] hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              Full roadmap →
            </button>
          </div>
          <div className="p-6 space-y-5">
            {topRoadmap.map((item, idx) => (
              <div key={item.id} className="relative flex items-start gap-3.5">
                {idx < topRoadmap.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] to-transparent -translate-x-1/2" />
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 shadow-sm ${
                  item.status === 'completed'
                    ? 'bg-[#10B981] text-white'
                    : item.status === 'current'
                    ? 'bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] text-white animate-ring-pulse'
                    : 'bg-white/10 text-[#8892B0] border border-white/10'
                }`}>
                  {item.status === 'completed' ? '✓' : item.stepNum}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-sm text-white truncate">{item.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'completed'
                        ? 'bg-[#10B981]/15 text-[#10B981]'
                        : item.status === 'current'
                        ? 'bg-[#FF6B00]/15 text-[#FF6B00]'
                        : 'bg-white/10 text-[#8892B0]'
                    }`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#8892B0] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Skill Progress & Top Job Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Progress */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>📊</span> Skill Progress
            </h3>
            <span className="text-xs text-[#8892B0]">Current evaluation</span>
          </div>
          <div className="space-y-4">
            {skillsProgress.map((sk) => (
              <div key={sk.name}>
                <div className="flex justify-between items-center text-xs sm:text-sm mb-1.5">
                  <span className="font-medium text-[#E2E8FF]">{sk.name}</span>
                  <span className="text-[#8892B0] font-semibold">{sk.val}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${sk.grad} transition-all duration-1000`}
                    style={{ width: `${sk.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Job Matches */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>💼</span> Top Job Matches
            </h3>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs font-semibold text-[#9D5FFF] hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {topJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onNavigate('jobs')}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#7C3AED]/50 hover:translate-x-1 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1e3a5f] to-[#2d5986] flex items-center justify-center text-lg flex-shrink-0">
                      {job.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{job.title}</h4>
                      <p className="text-xs text-[#8892B0]">{job.company} · {job.location} · {job.salary}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] whitespace-nowrap">
                    {job.match}% match
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {job.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 text-[#8892B0] border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
