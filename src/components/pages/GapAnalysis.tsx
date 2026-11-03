import React, { useState } from 'react';
import { computeSkillGap, ROLE_DEFINITIONS } from '../../engines/skillGapEngine';

interface GapAnalysisProps {
  onShowToast: (msg: string) => void;
  onNavigateToRoadmap?: () => void;
  onNavigateToProjects?: () => void;
}

export const GapAnalysis: React.FC<GapAnalysisProps> = ({
  onShowToast,
  onNavigateToRoadmap,
  onNavigateToProjects,
}) => {
  const [selectedRole, setSelectedRole] = useState('fullstack');
  // User's acquired skills (interactive checklist)
  const [userSkills, setUserSkills] = useState<string[]>([
    'JavaScript ES6+',
    'React.js',
    'HTML5 & CSS3 / Tailwind',
    'Git & GitHub',
    'REST & API Security'
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');

  const result = computeSkillGap(selectedRole, userSkills);

  const toggleSkill = (skillName: string) => {
    setUserSkills((prev) => {
      const exists = prev.some((s) => s.toLowerCase() === skillName.toLowerCase());
      if (exists) {
        onShowToast(`Removed ${skillName} from your profile`);
        return prev.filter((s) => s.toLowerCase() !== skillName.toLowerCase());
      } else {
        onShowToast(`Added ${skillName} to your profile!`);
        return [...prev, skillName];
      }
    });
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    if (userSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      onShowToast('Skill already in your profile');
      return;
    }
    setUserSkills((prev) => [...prev, trimmed]);
    setNewSkillInput('');
    onShowToast(`Added custom skill: ${trimmed}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
            Skill Gap Engine
          </h2>
          <p className="text-[#8892B0] text-sm sm:text-base">
            Deterministic weighted mathematical gap analysis between your profile and industry benchmarks.
          </p>
        </div>
        <div className="text-xs bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#9D5FFF] px-3.5 py-1.5 rounded-full font-semibold">
          ⚡ 100% Deterministic Engine
        </div>
      </div>

      {/* Target Role Selector & Live Skill Adder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
            <span>🎯</span> Select Target Career Track
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                onShowToast(`Target switched to ${ROLE_DEFINITIONS[e.target.value]?.title || e.target.value}`);
              }}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none cursor-pointer"
            >
              <option value="fullstack" className="bg-[#160d2e] text-white">Full Stack Developer</option>
              <option value="frontend" className="bg-[#160d2e] text-white">Frontend Developer</option>
              <option value="backend" className="bg-[#160d2e] text-white">Backend Developer</option>
              <option value="ds" className="bg-[#160d2e] text-white">Data Scientist</option>
              <option value="devops" className="bg-[#160d2e] text-white">DevOps Engineer</option>
              <option value="ml" className="bg-[#160d2e] text-white">ML Engineer</option>
            </select>
          </div>

          <div className="pt-2">
            <div className="text-xs text-[#8892B0] mb-2 font-medium">Quick toggle skills you currently possess:</div>
            <div className="flex gap-2 flex-wrap">
              {ROLE_DEFINITIONS[selectedRole]?.skills.map((s) => {
                const active = userSkills.some((us) => us.toLowerCase().includes(s.name.toLowerCase().split(' ')[0]));
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => toggleSkill(s.name)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? 'bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] font-semibold'
                        : 'bg-white/5 border-white/10 text-[#8892B0] hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span>{active ? '✓' : '+'}</span>
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add Custom Skill Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-syne font-bold text-base text-white mb-2 flex items-center gap-2">
              <span>➕</span> Add Custom Skill
            </h3>
            <p className="text-xs text-[#8892B0] mb-4">
              Add specialized frameworks, databases, or cloud tools to your learner record.
            </p>
            <form onSubmit={handleAddCustomSkill} className="space-y-3">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="e.g. GraphQL, Tailwind, Redis"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-[#8892B0] focus:border-[#7C3AED] outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white rounded-xl text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
              >
                Add Skill
              </button>
            </form>
          </div>
          <div className="text-[11px] text-[#8892B0] mt-4 pt-3 border-t border-white/5">
            Active Skills: <span className="text-white font-semibold">{userSkills.length} verified</span>
          </div>
        </div>
      </div>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#10B981] mb-1">
            {result.haveCount}
          </div>
          <div className="text-xs text-[#8892B0]">Skills Acquired</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#FF4B8B] mb-1">
            {result.criticalBlockers.length}
          </div>
          <div className="text-xs text-[#8892B0]">Critical Blocker Gaps</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#FF8C35] mb-1">
            {result.readinessScore}%
          </div>
          <div className="text-xs text-[#8892B0]">Readiness Score</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#9D5FFF] mb-1">
            ~{result.estimatedWeeks}w
          </div>
          <div className="text-xs text-[#8892B0]">Estimated Time to Ready</div>
        </div>
      </div>

      {/* Two Column Breakdown: Critical Blockers vs Acquired */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing & Gaps */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>⚠️</span> Unresolved Skill Gaps
            </h3>
            <span className="text-xs text-[#FF4B8B] font-semibold">
              {result.missingCount} remaining
            </span>
          </div>

          <div className="space-y-3">
            {result.criticalBlockers.map((skill) => (
              <div
                key={skill.name}
                className="p-3.5 rounded-xl bg-[#FF4B8B]/10 border border-[#FF4B8B]/30 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-sm text-white">{skill.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF4B8B]/20 text-[#FF4B8B]">
                      Critical (Weight 1.0)
                    </span>
                  </div>
                  <p className="text-xs text-[#8892B0]">{skill.description}</p>
                </div>
                <button
                  onClick={() => toggleSkill(skill.name)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition flex-shrink-0 cursor-pointer"
                  title="Mark as acquired"
                >
                  Mark Done
                </button>
              </div>
            ))}

            {result.preferredGaps.map((skill) => (
              <div
                key={skill.name}
                className="p-3.5 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-sm text-white">{skill.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF6B00]">
                      Preferred (Weight {skill.weight})
                    </span>
                  </div>
                  <p className="text-xs text-[#8892B0]">{skill.description}</p>
                </div>
                <button
                  onClick={() => toggleSkill(skill.name)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition flex-shrink-0 cursor-pointer"
                  title="Mark as acquired"
                >
                  Mark Done
                </button>
              </div>
            ))}

            {result.missingCount === 0 && (
              <div className="text-center py-8 text-sm text-[#10B981] font-semibold">
                🎉 Congratulations! You have acquired 100% of the skills required for {result.roleTitle}!
              </div>
            )}
          </div>
        </div>

        {/* Acquired Skills */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>✅</span> Verified Skills Acquired
            </h3>
            <span className="text-xs text-[#10B981] font-semibold">
              {result.skillsAcquired.length} verified
            </span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {result.skillsAcquired.map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/25 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <div>
                    <h4 className="font-semibold text-xs text-white">{skill.name}</h4>
                    <p className="text-[11px] text-[#8892B0]">{skill.category}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#10B981] uppercase">Ready</span>
              </div>
            ))}
          </div>

          {/* Quick Action Navigation */}
          <div className="pt-4 border-t border-white/10 flex gap-3">
            {onNavigateToRoadmap && (
              <button
                onClick={onNavigateToRoadmap}
                className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition text-center cursor-pointer"
              >
                View Roadmap Steps →
              </button>
            )}
            {onNavigateToProjects && (
              <button
                onClick={onNavigateToProjects}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white text-xs font-semibold transition text-center cursor-pointer shadow-md"
              >
                Build in Project Lab 🧪
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI Recommendation Strategy */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1e0b3e] to-[#2d1060] border border-[#7C3AED]/40">
        <h4 className="font-syne font-bold text-sm text-white mb-2 flex items-center gap-2">
          <span>💡</span> Algorithmic Next-Step Action Plan
        </h4>
        <div className="space-y-1.5">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#E2E8FF]">
              <span className="text-[#FF8C35] font-bold">●</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
