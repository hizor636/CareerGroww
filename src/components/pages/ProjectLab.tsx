import React, { useState } from 'react';
import { ProjectSpec } from '../../types';

interface ProjectLabProps {
  onShowToast: (msg: string) => void;
}

const SAMPLE_PROJECTS: ProjectSpec[] = [
  {
    id: 'proj-1',
    title: 'Distributed E-Commerce API & Inventory Engine',
    role: 'Full Stack / Backend',
    skillGapsResolved: ['Node.js & Express', 'MongoDB / PostgreSQL', 'REST & API Security', 'Redis Caching'],
    difficulty: 'Intermediate',
    timeEstimate: '2–3 weeks',
    problemStatement: 'Build a high-concurrency order placement and inventory reservation service capable of preventing race conditions and double-selling during flash sales.',
    architecture: [
      'Client: React 19 Frontend with optimistic UI updates',
      'API Gateway: Express / Node.js with rate limiting and JWT verification',
      'Database: PostgreSQL with strict serializable transactions and row-level locking',
      'Cache: Redis distributed locks (Redlock) for fast inventory availability checks'
    ],
    techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    milestones: [
      { step: 1, title: 'Database Schema & Idempotent Migrations', tasks: ['Design products, inventory_locks, and orders tables', 'Write seed scripts with 500 test SKUs'], completed: true },
      { step: 2, title: 'Atomic Reservation Endpoints', tasks: ['Implement POST /api/orders with Redis atomic decrement', 'Handle checkout timeouts with automatic rollback'], completed: false },
      { step: 3, title: 'Security & Rate Limiting', tasks: ['Add Helmet headers, CORS policies, and token-bucket middleware', 'Unit test edge cases for expired vouchers'], completed: false },
      { step: 4, title: 'Docker Packaging & Production Deployment', tasks: ['Multi-stage Dockerfile build under 80MB', 'Deploy on Render / Vercel with automated health checks'], completed: false }
    ],
    starterSnippet: `// Order Reservation Transaction with Atomic Locking
import { prisma } from './lib/prisma';
import { redis } from './lib/redis';

export async function createOrder(userId: string, productId: string, quantity: number) {
  const lockKey = \`lock:inventory:\${productId}\`;
  const acquired = await redis.set(lockKey, 'locked', 'PX', 5000, 'NX');
  
  if (!acquired) {
    throw new Error('High inventory contention. Please retry in a moment.');
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: productId } });
      if (!product || product.stock < quantity) {
        throw new Error('Insufficient stock for order');
      }

      await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } }
      });

      return await tx.order.create({
        data: { userId, productId, quantity, status: 'CONFIRMED' }
      });
    });
  } finally {
    await redis.del(lockKey);
  }
}`
  },
  {
    id: 'proj-2',
    title: 'Real-Time Collaborative Whiteboard & Presence Engine',
    role: 'Frontend / Full Stack',
    skillGapsResolved: ['React.js Deep Dive', 'WebSockets / Realtime', 'TypeScript', 'State Machines'],
    difficulty: 'Advanced',
    timeEstimate: '3 weeks',
    problemStatement: 'Develop a 60fps multiplayer whiteboard with real-time cursor tracking, shape drawing, undo/redo stacks, and conflict resolution.',
    architecture: [
      'Canvas Renderer: HTML5 Canvas / SVG with requestAnimationFrame pipeline',
      'State Engine: Immutable state snapshots with operational transformation (OT)',
      'Transport: Binary WebSocket protocol sending delta packets',
      'Presence: Ephemeral cursor heartbeat broadcast every 50ms'
    ],
    techStack: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Vite'],
    milestones: [
      { step: 1, title: 'Vector Canvas Core', tasks: ['Draw paths, rectangles, and text with custom bounding boxes', 'Implement zoom, pan, and transform matrices'], completed: true },
      { step: 2, title: 'Multiplayer Synchronization', tasks: ['Broadcast cursor position with linear interpolation smoothing', 'Handle client disconnect and reconnect reconciliation'], completed: false },
      { step: 3, title: 'Undo / Redo History Stack', tasks: ['Implement command pattern with memory-efficient action diffs', 'Keyboard shortcut listener for Ctrl+Z and Ctrl+Y'], completed: false }
    ],
    starterSnippet: `// Real-Time Smooth Cursor Interpolation Hook
import { useEffect, useRef } from 'react';

export function useSmoothCursor(targetX: number, targetY: number) {
  const currentPos = useRef({ x: targetX, y: targetY });

  useEffect(() => {
    let animId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetX, 0.25);
      currentPos.current.y = lerp(currentPos.current.y, targetY, 0.25);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [targetX, targetY]);

  return currentPos.current;
}`
  },
  {
    id: 'proj-3',
    title: 'AI Semantic Search & RAG Knowledge Assistant',
    role: 'Data / ML / Full Stack',
    skillGapsResolved: ['Python / TypeScript', 'Vector Databases & Embeddings', 'AI Prompt Engineering', 'Next.js'],
    difficulty: 'Intermediate',
    timeEstimate: '2 weeks',
    problemStatement: 'Ingest company PDFs, generate dense embeddings, store them in pgvector, and build a conversational assistant with source citations.',
    architecture: [
      'Document Parser: Recursive text chunking with 200-token sliding overlap',
      'Embeddings: Gemini / HuggingFace free text embeddings API',
      'Vector Storage: PostgreSQL with pgvector cosine distance extension',
      'RAG Controller: Top-K semantic retrieval concatenated into system prompt'
    ],
    techStack: ['TypeScript', 'Gemini API', 'PostgreSQL', 'pgvector', 'Next.js'],
    milestones: [
      { step: 1, title: 'Document Chunking Pipeline', tasks: ['Extract raw text from uploaded PDFs', 'Chunk text cleanly respecting sentence boundaries'], completed: false },
      { step: 2, title: 'pgvector Integration', tasks: ['Enable extension and create HNSW index for sub-10ms lookup', 'Cosine distance search for user queries'], completed: false },
      { step: 3, title: 'Grounded Streaming Chat', tasks: ['Inject relevant chunks with explicit citation metadata', 'Render markdown responses with source footnotes'], completed: false }
    ],
    starterSnippet: `// Semantic Retrieval with Postgres pgvector
import { prisma } from './lib/prisma';
import { generateEmbedding } from './lib/embeddings';

export async function searchKnowledgeBase(query: string, limit = 4) {
  const queryVector = await generateEmbedding(query);
  const vectorString = \`[\${queryVector.join(',')}]\`;

  // Raw SQL query leveraging pgvector cosine distance operator (<=>)
  return await prisma.$queryRaw\`
    SELECT id, title, content, 
           1 - (embedding <=> \${vectorString}::vector) AS similarity
    FROM document_chunks
    WHERE 1 - (embedding <=> \${vectorString}::vector) > 0.72
    ORDER BY similarity DESC
    LIMIT \${limit};
  \`;
}`
  }
];

export const ProjectLab: React.FC<ProjectLabProps> = ({ onShowToast }) => {
  const [projects, setProjects] = useState<ProjectSpec[]>(SAMPLE_PROJECTS);
  const [activeProject, setActiveProject] = useState<ProjectSpec>(SAMPLE_PROJECTS[0]);
  const [copied, setCopied] = useState(false);

  const toggleTask = (projId: string, stepIndex: number) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projId) {
          const newMilestones = [...proj.milestones];
          newMilestones[stepIndex] = {
            ...newMilestones[stepIndex],
            completed: !newMilestones[stepIndex].completed
          };
          onShowToast(`Milestone ${stepIndex + 1} marked as ${newMilestones[stepIndex].completed ? 'done' : 'in progress'}`);
          return { ...proj, milestones: newMilestones };
        }
        return proj;
      })
    );

    setActiveProject((prev) => {
      if (prev.id === projId) {
        const newMilestones = [...prev.milestones];
        newMilestones[stepIndex] = {
          ...newMilestones[stepIndex],
          completed: !newMilestones[stepIndex].completed
        };
        return { ...prev, milestones: newMilestones };
      }
      return prev;
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onShowToast('Starter boilerplate copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
            🧪 AI Project Lab
          </h2>
          <p className="text-[#8892B0] text-sm sm:text-base">
            Bridge your specific skill gaps by building portfolio-grade production applications with guided specifications.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] px-4 py-2 rounded-xl text-xs font-semibold">
          <span>🛡️</span> Zero Boilerplate Fatigue
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj) => {
          const isSelected = activeProject.id === proj.id;
          const completedCount = proj.milestones.filter((m) => m.completed).length;
          const progress = Math.round((completedCount / proj.milestones.length) * 100);

          return (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-[#1e0b3e] to-[#2d1060] border-[#7C3AED] shadow-[0_8px_32px_rgba(124,58,237,0.3)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FF6B00]">
                    {proj.role}
                  </span>
                  <span className="text-xs text-[#8892B0] font-medium">{proj.difficulty}</span>
                </div>
                <h3 className="font-syne font-bold text-sm text-white mb-2 line-clamp-2">
                  {proj.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-[#8892B0]">Milestone Progress</span>
                  <span className="font-semibold text-white">{progress}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#FF6B00] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Project Full Specification Card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#7C3AED]/20 text-[#9D5FFF] border border-[#7C3AED]/40">
                Target Role: {activeProject.role}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-[#E2E8FF]">
                ⏱️ Estimated: {activeProject.timeEstimate}
              </span>
            </div>
            <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white">
              {activeProject.title}
            </h3>
          </div>

          <button
            onClick={() => onShowToast(`Started project "${activeProject.title}"!`)}
            className="bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md hover:opacity-90 transition cursor-pointer flex-shrink-0"
          >
            🚀 Launch In Development
          </button>
        </div>

        {/* Skill Gaps Resolved */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8892B0] mb-2.5">
            🎯 Specific Skill Gaps Target by this Project
          </h4>
          <div className="flex gap-2 flex-wrap">
            {activeProject.skillGapsResolved.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1 rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-medium"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Problem Statement */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
          <h4 className="font-syne font-bold text-sm text-white mb-1.5 flex items-center gap-2">
            <span>💡</span> Real-World Industry Problem
          </h4>
          <p className="text-xs sm:text-sm text-[#8892B0] leading-relaxed">
            {activeProject.problemStatement}
          </p>
        </div>

        {/* Two Column Layout: Architecture & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Architecture */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/5 space-y-4">
            <h4 className="font-syne font-bold text-sm text-white flex items-center gap-2">
              <span>🏗️</span> Production Architecture Blueprint
            </h4>
            <div className="space-y-2.5">
              {activeProject.architecture.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E2E8FF]">
                  <span className="text-[#FF6B00] font-bold mt-0.5">●</span>
                  <span className="leading-relaxed">{arch}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-xs text-[#8892B0] block mb-2 font-medium">Recommended Tech Stack:</span>
              <div className="flex gap-1.5 flex-wrap">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-white font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Milestones */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/5 space-y-4">
            <h4 className="font-syne font-bold text-sm text-white flex items-center gap-2">
              <span>📋</span> Implementation Checklist
            </h4>
            <div className="space-y-3">
              {activeProject.milestones.map((m, mIdx) => (
                <div
                  key={m.step}
                  onClick={() => toggleTask(activeProject.id, mIdx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    m.completed
                      ? 'bg-[#10B981]/10 border-[#10B981]/30'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs mt-0.5 transition-colors ${
                    m.completed ? 'bg-[#10B981] text-white' : 'border border-white/30 text-transparent'
                  }`}>
                    ✓
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className={`font-semibold text-xs ${m.completed ? 'text-[#10B981] line-through' : 'text-white'}`}>
                      Milestone {m.step}: {m.title}
                    </h5>
                    <ul className="mt-1 space-y-0.5 list-disc list-inside text-[11px] text-[#8892B0]">
                      {m.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Starter Boilerplate Snippet */}
        <div className="bg-[#0f0a1e] rounded-xl border border-white/10 overflow-hidden">
          <div className="px-4 py-2.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-[#8892B0]">starter-snippet.ts</span>
            <button
              onClick={() => copyCode(activeProject.starterSnippet)}
              className="text-xs px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition cursor-pointer"
            >
              {copied ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-[#E2E8FF] overflow-x-auto leading-relaxed max-h-64">
            <code>{activeProject.starterSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
