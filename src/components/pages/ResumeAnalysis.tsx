import React, { useState } from 'react';
import { ExtractedSkill } from '../../types';

interface ResumeAnalysisProps {
  onShowToast: (msg: string) => void;
}

export const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ onShowToast }) => {
  const [fileName, setFileName] = useState<string | null>('alex_developer_resume.pdf');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchScore, setMatchScore] = useState(68);
  const [skills, setSkills] = useState<ExtractedSkill[]>([
    { name: 'JavaScript', score: 82 },
    { name: 'React.js', score: 65 },
    { name: 'HTML/CSS', score: 90 },
    { name: 'Node.js', score: 40 },
    { name: 'Git & GitHub', score: 75 },
    { name: 'Python', score: 30 }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setFileName(file.name);
    onShowToast('Analyzing resume with AI...');

    setTimeout(() => {
      setIsAnalyzing(false);
      setMatchScore(74);
      setSkills([
        { name: 'JavaScript', score: 88 },
        { name: 'React.js', score: 72 },
        { name: 'HTML/CSS', score: 95 },
        { name: 'Node.js', score: 45 },
        { name: 'Git & GitHub', score: 80 },
        { name: 'Python', score: 35 }
      ]);
      onShowToast('Resume analyzed successfully!');
    }, 1500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setFileName(file.name);
      onShowToast('Analyzing resume with AI...');
      setTimeout(() => {
        setIsAnalyzing(false);
        setMatchScore(76);
        onShowToast('Resume analyzed successfully!');
      }, 1500);
    }
  };

  // SVG ring circumference for r=45 is ~283
  const strokeDashoffset = 283 - (283 * matchScore) / 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          Resume Analysis
        </h2>
        <p className="text-[#8892B0] text-sm sm:text-base">
          Upload your resume for AI-powered skill extraction, scoring, and personalized career suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div className="border-b border-white/10 pb-4 mb-6">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>📤</span> Upload Resume
            </h3>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed border-[#7C3AED]/40 rounded-2xl p-8 sm:p-10 text-center bg-[#7C3AED]/5 hover:bg-[#7C3AED]/10 hover:border-[#7C3AED] transition-all cursor-pointer ${
              isAnalyzing ? 'opacity-50 pointer-events-none' : ''
            }`}
            onClick={() => document.getElementById('resumeFileInput')?.click()}
          >
            <input
              type="file"
              id="resumeFileInput"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="text-4xl mb-3">📄</div>
            <h3 className="font-syne font-bold text-base text-white mb-1.5">
              Drop your resume here
            </h3>
            <p className="text-xs text-[#8892B0] mb-5">
              Supports PDF, DOC, DOCX · Max 10MB
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('resumeFileInput')?.click();
              }}
              className="bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:opacity-90 transition cursor-pointer"
            >
              Choose File
            </button>
          </div>

          {/* Analysis Summary */}
          {fileName && (
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center gap-3 p-3.5 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl mb-6">
                <span className="text-xl">✅</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white truncate">{fileName}</div>
                  <div className="text-xs text-[#10B981]">
                    {isAnalyzing ? 'Analyzing with Gemini AI...' : 'Analysis complete'}
                  </div>
                </div>
              </div>

              {/* Match Ring */}
              <div className="relative w-28 h-28 mx-auto">
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
                    <linearGradient id="resumeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#FF6B00" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#resumeGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-syne font-extrabold text-xl text-white">
                    {matchScore}%
                  </span>
                  <span className="text-[10px] text-[#8892B0] font-medium">Match Score</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Extracted Skills Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between">
            <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
              <span>🧠</span> Extracted Skills
            </h3>
            <span className="text-xs text-[#8892B0]">From your resume</span>
          </div>

          <div className="space-y-4 flex-1">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center text-xs sm:text-sm mb-1.5">
                  <span className="font-medium text-[#E2E8FF]">{skill.name}</span>
                  <span className="font-bold text-[#FF6B00]">{skill.score}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#FF6B00] transition-all duration-1000"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#8892B0] flex items-center justify-between">
            <span>Evaluated against SDE-1 Benchmarks</span>
            <span className="text-[#10B981] font-semibold">6 skills matched</span>
          </div>
        </div>
      </div>

      {/* Detailed Skill Assessment */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="border-b border-white/10 pb-4 mb-6">
          <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
            <span>📊</span> Detailed Skill Assessment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <h4 className="font-syne font-bold text-sm text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Strong Skills
            </h4>
            <div className="space-y-2">
              {['HTML/CSS', 'JavaScript ES6+', 'Responsive Web Design', 'Git & Version Control'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-[#E2E8FF]">
                  <span className="text-[#10B981]">✓</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <h4 className="font-syne font-bold text-sm text-white mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" /> Needs Improvement
            </h4>
            <div className="space-y-2">
              {['Node.js REST APIs', 'MongoDB Aggregations', 'AWS Cloud Services', 'TypeScript Strict Mode'].map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-[#E2E8FF]">
                  <span className="text-[#FF6B00]">⚡</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30">
          <div className="font-semibold text-sm text-white mb-1.5 flex items-center gap-2">
            <span>💡</span> AI Recommendation
          </div>
          <p className="text-xs sm:text-sm text-[#8892B0] leading-relaxed">
            Your frontend skills are solid. Focus on Node.js and MongoDB to become job-ready for Full Stack roles. Consider taking the AWS certification to boost your overall profile score by +15%.
          </p>
        </div>
      </div>
    </div>
  );
};
