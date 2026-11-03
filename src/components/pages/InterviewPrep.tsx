import React, { useState } from 'react';
import { InterviewQuestion } from '../../types';

interface InterviewPrepProps {
  onOpenCoachWithPrompt: (prompt: string) => void;
  onShowToast: (msg: string) => void;
}

const QUESTIONS_DATA: InterviewQuestion[] = [
  {
    id: 'q1',
    category: 'technical',
    role: 'Full Stack / Frontend',
    question: 'Explain the React Fiber reconciler architecture and how Concurrent Mode prioritizes updates without blocking the main UI thread.',
    difficulty: 'Hard',
    framework: 'React Internal Architecture & Event Loop',
    tips: [
      'Explain cooperative multitasking and time-slicing using requestIdleCallback / MessageChannel',
      'Distinguish the render phase (interruptible, pure) from the commit phase (synchronous, DOM mutations)',
      'Mention useTransition and useDeferredValue as developer APIs'
    ],
    sampleAnswer: 'React Fiber is a complete rewrite of React\'s core reconciliation engine that represents the component tree as a linked-list of fiber nodes. Unlike the legacy recursive stack reconciler which blocked the browser thread until the entire virtual DOM tree was compared, Fiber breaks work into small units. During the render phase, Fiber checks how much time remains in the current 5ms frame slice. If higher priority events (like user clicks or keypresses) arrive, React can pause, yield control to the browser, and resume lower priority work later.'
  },
  {
    id: 'q2',
    category: 'system-design',
    role: 'Full Stack / Backend',
    question: 'Design a real-time URL shortening service (like Bitly) handling 100M new URLs created per month and a 10:1 read-to-write ratio.',
    difficulty: 'Medium',
    framework: 'Back-of-the-envelope Estimation + High-Level Architecture',
    tips: [
      'Calculate queries per second (QPS): 100M / (30 * 86,400) ≈ 40 writes/sec, 400 reads/sec',
      'Choose encoding scheme: Base62 (62^6 = 56.8B combinations for 6 characters)',
      'Discuss pre-generating unique sequence IDs with ZooKeeper or Snowflake ID generators to avoid DB collisions',
      'Layer Redis for hot URLs (80/20 rule) to achieve <10ms lookup latency'
    ],
    sampleAnswer: 'For a 10:1 read-to-write ratio, the system is read-heavy. We adopt a 7-character Base62 encoding scheme (a-z, A-Z, 0-9) yielding 3.5 trillion unique slugs. To avoid race conditions, a centralized Key Generation Service (KGS) pre-allocates sequences in memory. The storage layer uses PostgreSQL partitioned by hash key with a Redis LRU cache caching the top 20% most accessed URLs. Reads resolve through Cloudflare edge caching, minimizing origin server traffic.'
  },
  {
    id: 'q3',
    category: 'hr',
    role: 'All Roles',
    question: 'Tell me about a time you faced a critical production bug or disagreement with a senior engineer. How did you resolve it?',
    difficulty: 'Medium',
    framework: 'STAR Method (Situation, Task, Action, Result)',
    tips: [
      'Situation: Set the context briefly (e.g. latency spike before a product launch)',
      'Task: Clearly state your responsibility and what was at risk',
      'Action: Focus on collaborative data-driven action, not emotional arguments',
      'Result: Conclude with quantified business outcome and lessons learned'
    ],
    sampleAnswer: 'Situation: Two days before our holiday campaign, our payment service experienced intermittent 504 timeouts under peak load. A senior engineer believed increasing server CPU size was sufficient, but I suspected unindexed database queries. Task: I needed to diagnose the bottleneck without delaying the rollout. Action: I set up automated query logging with EXPLAIN ANALYZE and proved a full-table scan was occurring on unindexed foreign keys. I proposed adding composite indexes and prepared a staging benchmark showing query latency dropped from 1,200ms to 4ms. Result: The team adopted the index migration, our launch proceeded with zero downtime, and we saved $3,000/month in unwarranted server upgrades.'
  },
  {
    id: 'q4',
    category: 'technical',
    role: 'Full Stack / Backend',
    question: 'How do you handle database concurrency and race conditions when multiple users attempt to purchase the last item in stock simultaneously?',
    difficulty: 'Hard',
    framework: 'ACID Transactions & Distributed Locking',
    tips: [
      'Explain pessimistic locking (SELECT ... FOR UPDATE) vs. optimistic locking (version column)',
      'Compare database row locks with Redis distributed locks (Redlock)',
      'Mention idempotency keys to handle duplicate payment retries'
    ],
    sampleAnswer: 'To prevent overselling, we avoid reading stock into application memory before updating. Instead, we use an atomic SQL conditional query: UPDATE inventory SET stock = stock - 1 WHERE product_id = :id AND stock >= 1. If row count is 0, the product is sold out. For complex checkout workflows spanning multiple steps, we wrap the transaction in serializable isolation or acquire a 5-second distributed lock in Redis keyed to product ID.'
  }
];

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ onOpenCoachWithPrompt, onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'system-design' | 'hr'>('all');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const filtered = selectedCategory === 'all'
    ? QUESTIONS_DATA
    : QUESTIONS_DATA.filter((q) => q.category === selectedCategory);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePracticeWithAI = (q: InterviewQuestion) => {
    const prompt = `Can you conduct a mock interview with me on this question: "${q.question}"? Please give me the question, wait for my response, and grade me on clarity, technical accuracy, and structure.`;
    onOpenCoachWithPrompt(prompt);
    onShowToast('Interview session sent to AI Career Coach!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
            🎯 Interview Preparation Studio
          </h2>
          <p className="text-[#8892B0] text-sm sm:text-base">
            Master high-impact technical rounds, system design architectures, and behavioral STAR responses.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 flex-wrap">
          {(['all', 'technical', 'system-design', 'hr'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#FF6B00] text-white shadow-xs'
                  : 'text-[#8892B0] hover:text-white'
              }`}
            >
              {cat === 'system-design' ? 'System Design' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-5">
        {filtered.map((item) => {
          const isRevealed = revealedIds[item.id];
          return (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#7C3AED]/40 transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    item.category === 'technical'
                      ? 'bg-[#0EA5E9]/15 text-[#0EA5E9]'
                      : item.category === 'system-design'
                      ? 'bg-[#7C3AED]/15 text-[#9D5FFF]'
                      : 'bg-[#10B981]/15 text-[#10B981]'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-[#8892B0] font-medium">{item.role}</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                  item.difficulty === 'Hard' ? 'bg-[#FF4B8B]/15 text-[#FF4B8B]' : 'bg-[#FF6B00]/15 text-[#FF6B00]'
                }`}>
                  {item.difficulty}
                </span>
              </div>

              <h3 className="font-syne font-bold text-base sm:text-lg text-white leading-snug">
                {item.question}
              </h3>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF8C35] mb-1.5">
                  Framework: {item.framework}
                </div>
                <ul className="space-y-1 list-disc list-inside text-xs text-[#8892B0]">
                  {item.tips.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              {isRevealed && (
                <div className="p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 space-y-2 animate-fade-in">
                  <span className="text-xs font-bold text-[#9D5FFF] block">
                    ✨ High-Scoring Benchmark Answer:
                  </span>
                  <p className="text-xs sm:text-sm text-[#E2E8FF] leading-relaxed">
                    {item.sampleAnswer}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-white/10 flex-wrap gap-2">
                <button
                  onClick={() => toggleReveal(item.id)}
                  className="text-xs font-semibold text-[#8892B0] hover:text-white transition cursor-pointer"
                >
                  {isRevealed ? '▲ Hide Sample Answer' : '▼ View Model Answer & Architecture'}
                </button>

                <button
                  onClick={() => handlePracticeWithAI(item)}
                  className="bg-white/10 hover:bg-[#7C3AED]/30 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 border border-white/10"
                >
                  <span>🤖</span>
                  <span>Practice with AI Coach</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
