export interface RoleSkillDef {
  name: string;
  weight: number; // 1.0 = Required, 0.6 = Preferred, 0.3 = Nice-to-have
  category: string;
  description: string;
}

export interface GapAnalysisResult {
  roleTitle: string;
  readinessScore: number;
  totalSkillsRequired: number;
  haveCount: number;
  missingCount: number;
  criticalBlockers: RoleSkillDef[];
  preferredGaps: RoleSkillDef[];
  skillsAcquired: RoleSkillDef[];
  estimatedWeeks: number;
  recommendations: string[];
}

export const ROLE_DEFINITIONS: Record<string, { title: string; skills: RoleSkillDef[] }> = {
  fullstack: {
    title: 'Full Stack Developer',
    skills: [
      { name: 'JavaScript ES6+', weight: 1.0, category: 'Core', description: 'Modern JS, async/await, closures, prototypes' },
      { name: 'React.js', weight: 1.0, category: 'Frontend', description: 'Hooks, state management, component architecture' },
      { name: 'Node.js & Express', weight: 1.0, category: 'Backend', description: 'REST APIs, middleware, JWT auth, routing' },
      { name: 'MongoDB / PostgreSQL', weight: 1.0, category: 'Database', description: 'Schema design, indexes, aggregation, CRUD' },
      { name: 'HTML5 & CSS3 / Tailwind', weight: 1.0, category: 'Frontend', description: 'Responsive layouts, accessibility, flex/grid' },
      { name: 'Git & GitHub', weight: 0.6, category: 'Tools', description: 'Branching, PRs, merge conflict resolution' },
      { name: 'TypeScript', weight: 0.6, category: 'Core', description: 'Static typing, generics, interfaces' },
      { name: 'REST & API Security', weight: 0.6, category: 'Backend', description: 'CORS, rate limiting, sanitization' },
      { name: 'AWS / Cloud Deployment', weight: 0.3, category: 'DevOps', description: 'S3, EC2/Render, environment vars, CDN' },
      { name: 'Docker Basics', weight: 0.3, category: 'DevOps', description: 'Containerization, Dockerfiles, compose' },
    ]
  },
  frontend: {
    title: 'Frontend Developer',
    skills: [
      { name: 'HTML5 & CSS3 / Tailwind', weight: 1.0, category: 'Core', description: 'Semantic markup, modern layout models, responsive UI' },
      { name: 'JavaScript ES6+', weight: 1.0, category: 'Core', description: 'DOM manipulation, Event loop, Async patterns' },
      { name: 'React.js', weight: 1.0, category: 'Framework', description: 'Custom hooks, Context API, state machines' },
      { name: 'TypeScript', weight: 0.6, category: 'Core', description: 'Type safety in React components and API models' },
      { name: 'Next.js / SSR', weight: 0.6, category: 'Framework', description: 'Server components, client hydration, routing' },
      { name: 'Web Performance & SEO', weight: 0.6, category: 'Optimization', description: 'Core Web Vitals, lazy loading, asset compression' },
      { name: 'Git & Version Control', weight: 0.6, category: 'Tools', description: 'Collaborative development and CI/CD basics' },
      { name: 'UI/UX & Figma', weight: 0.3, category: 'Design', description: 'Wireframing, design systems, handoff' },
      { name: 'Unit Testing (Jest/Vitest)', weight: 0.3, category: 'Testing', description: 'Component testing and user interaction assertions' },
    ]
  },
  backend: {
    title: 'Backend Developer',
    skills: [
      { name: 'Node.js / Express', weight: 1.0, category: 'Runtime', description: 'Event-driven I/O, micro-frameworks, streams' },
      { name: 'PostgreSQL / SQL', weight: 1.0, category: 'Database', description: 'Complex joins, transactions, ACID, indexing' },
      { name: 'System Design Basics', weight: 1.0, category: 'Architecture', description: 'Caching, load balancing, horizontal scaling' },
      { name: 'REST & GraphQL APIs', weight: 1.0, category: 'API', description: 'API contract design, documentation, validation' },
      { name: 'Redis Caching', weight: 0.6, category: 'Performance', description: 'In-memory key-value caching, session store' },
      { name: 'Authentication & OAuth2', weight: 0.6, category: 'Security', description: 'JWT, refresh tokens, role-based access' },
      { name: 'Docker & Microservices', weight: 0.6, category: 'DevOps', description: 'Isolated service packaging and orchestration' },
      { name: 'CI/CD Pipelines', weight: 0.3, category: 'DevOps', description: 'Automated test and build automation' },
    ]
  },
  ds: {
    title: 'Data Scientist',
    skills: [
      { name: 'Python Programming', weight: 1.0, category: 'Core', description: 'OOP, functions, data structures, scientific stack' },
      { name: 'Pandas & NumPy', weight: 1.0, category: 'Data', description: 'Vectorized computing, wrangling, matrix ops' },
      { name: 'Statistics & Probability', weight: 1.0, category: 'Math', description: 'Hypothesis testing, distributions, regression' },
      { name: 'Machine Learning (Scikit-Learn)', weight: 1.0, category: 'ML', description: 'Supervised/unsupervised algorithms, evaluation' },
      { name: 'SQL Querying', weight: 0.6, category: 'Database', description: 'Aggregations, window functions, CTEs' },
      { name: 'Data Visualization', weight: 0.6, category: 'Analytics', description: 'Matplotlib, Seaborn, interactive dashboards' },
      { name: 'Deep Learning Basics', weight: 0.3, category: 'AI', description: 'Neural networks, PyTorch fundamentals' },
    ]
  },
  devops: {
    title: 'DevOps Engineer',
    skills: [
      { name: 'Linux Administration', weight: 1.0, category: 'OS', description: 'Shell scripting, bash, permissions, network tools' },
      { name: 'Docker Containerization', weight: 1.0, category: 'Containers', description: 'Multi-stage builds, networking, image security' },
      { name: 'Kubernetes Orchestration', weight: 1.0, category: 'Cloud', description: 'Pods, Deployments, Services, Ingress, Helm' },
      { name: 'CI/CD (GitHub Actions)', weight: 1.0, category: 'Automation', description: 'Automated build, test, and release pipelines' },
      { name: 'Cloud Infrastructure (AWS/GCP)', weight: 1.0, category: 'Cloud', description: 'VPC, IAM, compute, storage, DNS' },
      { name: 'Terraform (IaC)', weight: 0.6, category: 'Automation', description: 'Declarative resource provisioning and state' },
      { name: 'Observability (Prometheus/Grafana)', weight: 0.6, category: 'Monitoring', description: 'Metrics, alerts, tracing, log aggregation' },
    ]
  },
  ml: {
    title: 'Machine Learning Engineer',
    skills: [
      { name: 'Python & PyTorch', weight: 1.0, category: 'Core', description: 'Tensors, autograd, custom layers, GPU training' },
      { name: 'Data Preprocessing Pipelines', weight: 1.0, category: 'Data', description: 'Feature scaling, embedding tokenization, clean data' },
      { name: 'Deep Neural Architectures', weight: 1.0, category: 'AI', description: 'CNNs, Transformers, attention mechanisms' },
      { name: 'MLOps & Model Serving', weight: 0.6, category: 'Deployment', description: 'FastAPI model endpoints, Triton, ONNX, latency' },
      { name: 'Vector Databases & Embeddings', weight: 0.6, category: 'AI', description: 'Semantic search, RAG, pgvector, similarity' },
      { name: 'Model Evaluation & Fine-tuning', weight: 0.6, category: 'AI', description: 'Quantization, LoRA, BLEU/ROUGE scoring' },
    ]
  }
};

export function computeSkillGap(roleKey: string, userSkillNames: string[]): GapAnalysisResult {
  const roleDef = ROLE_DEFINITIONS[roleKey] || ROLE_DEFINITIONS.fullstack;
  const userSet = new Set(userSkillNames.map((s) => s.toLowerCase().trim()));

  let totalWeight = 0;
  let matchedWeight = 0;

  const criticalBlockers: RoleSkillDef[] = [];
  const preferredGaps: RoleSkillDef[] = [];
  const skillsAcquired: RoleSkillDef[] = [];

  for (const skill of roleDef.skills) {
    totalWeight += skill.weight;
    // Check if user has this skill (exact or partial keyword match)
    const isMatched = Array.from(userSet).some((userSkill) =>
      skill.name.toLowerCase().includes(userSkill) || userSkill.includes(skill.name.toLowerCase().split(' ')[0])
    );

    if (isMatched) {
      matchedWeight += skill.weight;
      skillsAcquired.push(skill);
    } else {
      if (skill.weight >= 1.0) {
        criticalBlockers.push(skill);
      } else {
        preferredGaps.push(skill);
      }
    }
  }

  const readinessScore = Math.min(100, Math.round((matchedWeight / totalWeight) * 100));
  const estimatedWeeks = Math.max(2, Math.ceil((criticalBlockers.length * 2.5) + (preferredGaps.length * 1.2)));

  const recommendations: string[] = [];
  if (criticalBlockers.length > 0) {
    recommendations.push(`Priority #1: Master ${criticalBlockers[0].name} to satisfy hard recruiter screening criteria.`);
  }
  if (criticalBlockers.length > 1) {
    recommendations.push(`Pair ${criticalBlockers[0].name} with ${criticalBlockers[1].name} to build a full-stack portfolio item.`);
  }
  if (preferredGaps.length > 0) {
    recommendations.push(`Target ${preferredGaps[0].name} once core competencies are solidified to unlock senior compensation tiers.`);
  }
  if (criticalBlockers.length === 0) {
    recommendations.push('You meet all critical technical prerequisites! Focus on interview practice and project demonstrations.');
  }

  return {
    roleTitle: roleDef.title,
    readinessScore,
    totalSkillsRequired: roleDef.skills.length,
    haveCount: skillsAcquired.length,
    missingCount: criticalBlockers.length + preferredGaps.length,
    criticalBlockers,
    preferredGaps,
    skillsAcquired,
    estimatedWeeks,
    recommendations
  };
}
