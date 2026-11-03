# 🚀 CareerGroww — Complete Zero-Cost Implementation Plan
**Production-Ready Rebuild Specification (Truly Free Forever — No Credit Card, No Expiring Trials)**

---

## 1. Recommended 2026 Tech Stack & Architecture Rationale

To maintain a **$0.00/month** operational cost indefinitely while running a production-grade AI career operating system, every layer is selected strictly from open-source technologies and standing, non-expiring free tiers that never require a credit card.

| Layer | Recommended Choice | Free Tier Constraints & Realities | Architectural Rationale |
|---|---|---|---|
| **Framework** | **Next.js 15+ (App Router, React 19, TypeScript)** | 100% Open-Source (MIT), zero licensing cost | Native server actions, server components for secure API secrets, streaming responses for AI chat, and optimized bundling. |
| **Styling & UI** | **Tailwind CSS + shadcn/ui + Radix UI + Lucide** | 100% Open-Source (MIT) | Zero runtime overhead, copy-paste modular components, accessible ARIA compliance, Syne & DM Sans typography consistency. |
| **Database** | **Supabase Postgres (or Neon Serverless Postgres)** | 500 MB storage, 2 active projects, shared CPU, pooling included | Native Postgres with pgvector capabilities (for vector similarity search on job descriptions/skills), connection pooling via PgBouncer/Supavisor. |
| **ORM & Migrations** | **Prisma 6** | Open-Source | Type-safe queries, migration engine, relations modeling, and introspection. |
| **Authentication** | **Better Auth (Self-Hosted in Postgres)** | 100% Open-Source MIT library | Eliminates third-party auth MAU pricing cliffs. User identities, sessions, and OAuth tokens reside directly in your Postgres tables. |
| **Primary AI Provider** | **Google Gemini API (Free Tier: 2.5 Flash / Flash-Lite)** | 15 RPM, 1M TPM, 1,500 RPD (no card required) | Industry-leading speed, 1M context window (effortlessly ingests long resumes + multiple job descriptions), native JSON structured output schema support. |
| **Secondary / Fast AI** | **Groq Cloud (Free Tier: Llama 3.3 70B / 8B, Qwen)** | 30 RPM, 14.4k RPD (no card required) | Sub-second inference latency, ideal for interactive coaching chat and quick keyword extraction. |
| **Fallback AI Router** | **OpenRouter `:free` Models + Local Ollama (Dev)** | Standing rotating free models | Automated failover if Gemini or Groq hit rate limits during peak usage. |
| **File Storage** | **Supabase Storage (Free Tier)** | 1 GB storage, 2 GB egress/month | Ample capacity for ~10,000 PDF resumes when compressed to <100 KB each. |
| **Transactional Email**| **Resend (Free Tier) or Brevo Free** | 3,000 emails/month (100/day) | Sufficient for verification codes, password resets, and high-priority milestone alerts. |
| **Hosting & CDN** | **Vercel Hobby + Cloudflare Free DNS/Edge** | 100 GB bandwidth, unlimited serverless invocations | Global edge caching, automatic HTTPS, branch previews, zero server maintenance. |
| **Background Jobs** | **Vercel Cron + DB-backed polling worker** | Free (cron triggers HTTP endpoints) | Lightweight job queue for scheduled roadmap audits, weekly skill digests, and application reminders. |
| **Validation & Test** | **Zod + Vitest + Playwright** | Open-source | End-to-end schema validation from frontend form inputs to AI structured responses. |

---

## 2. High-Level Modular Monolith Architecture

The codebase is structured as a **domain-driven modular monolith** inside Next.js. Each core domain operates with high cohesion and low coupling.

```
careergroww/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (marketing)/
│   │   ├── page.tsx                  # Landing page (Hero, Features, Pricing/Free, Testimonials)
│   │   └── courses/page.tsx          # Public course catalog
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Sidebar, Topbar, Global Search, Notification Bell
│   │   ├── dashboard/page.tsx        # Overview & active progress
│   │   ├── assessment/page.tsx       # Skill assessment quiz & entry
│   │   ├── gap-analysis/page.tsx     # Skill gap visualizer & role targeter
│   │   ├── roadmap/page.tsx          # Interactive milestone tree
│   │   ├── resume/page.tsx           # Resume upload, score & ATS tips
│   │   ├── coach/page.tsx            # Context-aware 24/7 AI Career Coach
│   │   ├── projects/page.tsx         # AI Project Lab & code briefs
│   │   ├── jobs/page.tsx             # Job tracker & matched openings
│   │   ├── mentors/page.tsx          # 1:1 Booking system & mentor roster
│   │   └── settings/page.tsx         # Profile, notification toggles, preferences
│   └── api/
│       ├── auth/[...all]/route.ts    # Better Auth route handler
│       ├── ai/
│       │   ├── coach/route.ts        # Streaming chat with system context
│       │   ├── resume-analyze/route.ts # PDF parsing & structured skill extraction
│       │   └── gap-analysis/route.ts # AI narrative insights
│       ├── roadmap/generate/route.ts # Roadmap DAG compilation
│       └── cron/sync/route.ts        # Scheduled audit triggers
├── components/
│   ├── ui/                           # Primitive components (Button, Input, Card, Modal, etc.)
│   ├── layout/                       # Navbar, Sidebar, Footer, MobileNav
│   ├── dashboard/                    # StatCard, WelcomeBanner, ProgressRings
│   ├── ai/                           # ChatWindow, TypingIndicator, QuickChips
│   └── resume/                       # UploadDropzone, SkillMeter, RecommendationCard
├── lib/
│   ├── db/
│   │   └── prisma.ts                 # Singleton Prisma client with connection pooling
│   ├── auth/
│   │   └── auth.ts                   # Better Auth configuration
│   ├── ai/
│   │   ├── router.ts                 # Smart model router (Gemini -> Groq -> OpenRouter)
│   │   ├── prompts.ts                # Strict system prompts with few-shot examples
│   │   └── schemas.ts                # Zod schemas for AI JSON output validation
│   ├── engines/
│   │   ├── skill-gap/
│   │   │   ├── deterministic.ts      # Set math: Required - Acquired = Gap
│   │   │   └── synthesizer.ts        # AI enrichment of missing skill pathways
│   │   ├── roadmap/
│   │   │   ├── graph.ts              # Directed Acyclic Graph (DAG) for prerequisites
│   │   │   └── generator.ts          # Step generator tailored to current readiness
│   │   └── resume/
│   │       ├── parser.ts             # PDF/DOC text extraction
│   │       └── scorer.ts             # Keyword frequency, ATS structure, metric scoring
│   └── utils/
│       └── rate-limiter.ts           # Token bucket rate-limiter per user IP/ID
├── prisma/
│   ├── schema.prisma                 # Complete database schema
│   └── seed.ts                       # Standard taxonomy: 50 roles, 300 skills, 80 courses
└── tests/
    ├── unit/
    └── e2e/
```

---

## 3. Core Domain Engines (Detailed Specifications)

### 3.1. Skill Gap Engine (Deterministic + AI-Assisted)
The engine executes in two distinct phases to guarantee 100% mathematical consistency without relying purely on hallucinated LLM outputs:

```
User Skills (A) ──┐
                  ├──> [Deterministic Set-Difference & Weighting] ──> Base Numerical Score
Target Role (B)  ─┘                                                        │
                                                                           ▼
                                                              [Gemini Flash Synthesizer]
                                                                           │
                                                                           ▼
                                                        Personalized Gap Narrative + Milestones
```

1. **Phase 1: Deterministic Set Analysis**
   - Retrieve all required skills for `targetRoleId` from Postgres with weights:
     - `Required` ($W=1.0$)
     - `Preferred` ($W=0.6$)
     - `Nice-to-Have` ($W=0.3$)
   - Calculate user's matched skills:
     $$\text{Readiness Score} = \left(\frac{\sum W_{\text{matched}}}{\sum W_{\text{total}}}\right) \times 100\%$$
   - Isolate exact missing skills: $\text{Missing} = \text{Skills}_{\text{target}} \setminus \text{Skills}_{\text{user}}$.

2. **Phase 2: AI Enrichment (Gemini 2.5 Flash)**
   - Inputs: User's background, acquired skills, exact missing skills, target role.
   - Output (Zod Schema):
     ```ts
     const GapEnrichmentSchema = z.object({
       summary: z.string(),
       estimatedWeeksToReady: z.number().int(),
       quickWins: z.array(z.string()),
       criticalBlockers: z.array(z.string()),
       suggestedCourses: z.array(z.string())
     });
     ```

### 3.2. Roadmap Generator (Topological Prerequisite DAG)
- Maps curriculum steps into a Directed Acyclic Graph (DAG).
- Step nodes contain `prerequisiteSkillIds`.
- The generator traverses the graph starting only from nodes whose prerequisites match the user's acquired skills.
- Outputs an ordered sequence:
  `Completed Nodes` $\rightarrow$ `Current Milestone (with active modules)` $\rightarrow$ `Upcoming Milestones` $\rightarrow$ `Capstone SaaS Project`.

### 3.3. Context-Aware AI Career Coach
- **State & Context Window Optimization**:
  - Injects a compact JSON profile header (~200 tokens):
    `{ name, currentGoal, readinessScore, topSkills, missingSkills, currentRoadmapStep }`
  - Maintains the last 8 message turns (~1,200 tokens) using a rolling window.
  - Strict System Prompt: Instructs the model to act as a pragmatic technical recruiter and staff engineer. Forbids hallucinating fake packages or guaranteed placement.
  - Provides pre-engineered quick replies: *"Resume feedback"*, *"Mock interview question"*, *"Salary negotiation in India/Remote"*, *"Next study priority"*.

### 3.4. Resume Analyzer Pipeline
1. **Extraction**:
   - Uses `pdf-parse` (open-source) on the server to extract raw text from binary PDF buffers.
2. **Deterministic Pre-Filter**:
   - Regex scan for email, phone, LinkedIn/GitHub links, and standard section headers (`Experience`, `Education`, `Skills`, `Projects`).
3. **Structured AI Extraction (Gemini Flash JSON Mode)**:
   - Identifies candidate skills, years of experience, quantified impact metrics (e.g. *"reduced latency by 40%"*), and formatting red flags.
4. **Scoring Breakdown**:
   - Content & Impact (40%) + Skill Relevance to Goal (30%) + ATS Formatting (20%) + Completeness (10%).

### 3.5. AI Project Lab
- Translates missing skills into portfolio-grade capstone specs.
- Outputs:
  - Problem Statement
  - Production Architecture diagram text
  - Step-by-step milestone checklist
  - Sample database schema and starter repo template structure.

---

## 4. Complete Database Schema (Prisma ORM)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ---------------- USER & AUTH ----------------

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  profile       Profile?
  accounts      Account[]
  sessions      Session[]
  userSkills    UserSkill[]
  roadmaps      Roadmap[]
  resumes       ResumeAnalysis[]
  applications  JobApplication[]
  chatMessages  ChatMessage[]
  courseProgress UserCourseProgress[]
  mentorBookings MentorBooking[]
  notifications Notification[]

  @@index([email])
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Account {
  id           String    @id @default(cuid())
  userId       String
  accountId    String
  providerId   String
  accessToken  String?
  refreshToken String?
  expiresAt    DateTime?
  password     String?
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([providerId, accountId])
  @@index([userId])
}

// ---------------- PROFILE & CAREER GOALS ----------------

model Profile {
  id              String      @id @default(cuid())
  userId          String      @unique
  headline        String?
  targetRoleId    String?
  profileStrength Int         @default(20)
  experienceYears Float       @default(0)
  targetSalary    String?
  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  targetRole      CareerRole? @relation(fields: [targetRoleId], references: [id])
}

model CareerRole {
  id          String       @id @default(cuid())
  slug        String       @unique
  title       String
  category    String
  description String
  avgSalary   String
  roleSkills  RoleSkill[]
  profiles    Profile[]
  roadmaps    Roadmap[]
  jobs        JobPosting[]
}

model Skill {
  id         String       @id @default(cuid())
  name       String       @unique
  category   String       // Frontend, Backend, Cloud, ML, etc.
  demandPct  Int          @default(80)
  growthRate String       @default("+25%")
  userSkills UserSkill[]
  roleSkills RoleSkill[]

  @@index([category])
}

model RoleSkill {
  id         String     @id @default(cuid())
  roleId     String
  skillId    String
  weight     Float      @default(1.0) // 1.0 = Required, 0.6 = Preferred, 0.3 = Nice-to-have
  role       CareerRole @relation(fields: [roleId], references: [id], onDelete: Cascade)
  skill      Skill      @relation(fields: [skillId], references: [id], onDelete: Cascade)

  @@unique([roleId, skillId])
  @@index([roleId])
}

model UserSkill {
  id              String   @id @default(cuid())
  userId          String
  skillId         String
  proficiencyPct  Int      @default(50) // 0-100%
  verifiedByQuiz  Boolean  @default(false)
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  skill           Skill    @relation(fields: [skillId], references: [id], onDelete: Cascade)

  @@unique([userId, skillId])
  @@index([userId])
}

// ---------------- ROADMAPS & COURSES ----------------

model Roadmap {
  id          String        @id @default(cuid())
  userId      String
  roleId      String
  status      String        @default("IN_PROGRESS") // IN_PROGRESS, COMPLETED
  progressPct Int           @default(0)
  nodes       RoadmapNode[]
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  role        CareerRole    @relation(fields: [roleId], references: [id])

  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@index([userId])
}

model RoadmapNode {
  id          String   @id @default(cuid())
  roadmapId   String
  stepOrder   Int
  title       String
  description String
  status      String   @default("UPCOMING") // COMPLETED, CURRENT, UPCOMING
  roadmap     Roadmap  @relation(fields: [roadmapId], references: [id], onDelete: Cascade)

  @@index([roadmapId, stepOrder])
}

model Course {
  id          String               @id @default(cuid())
  slug        String               @unique
  title       String
  category    String
  description String
  price       String               @default("Free")
  thumbnail   String
  progress    UserCourseProgress[]
}

model UserCourseProgress {
  id          String   @id @default(cuid())
  userId      String
  courseId    String
  progressPct Int      @default(0)
  completed   Boolean  @default(false)
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId])
}

// ---------------- RESUME & AI COACH ----------------

model ResumeAnalysis {
  id             String   @id @default(cuid())
  userId         String
  fileName       String
  fileUrl        String?
  matchScore     Int
  extractedJson  Json
  recommendation String   @db.Text
  createdAt      DateTime @default(now())
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model ChatMessage {
  id        String   @id @default(cuid())
  userId    String
  sender    String   // USER or ASSISTANT
  text      String   @db.Text
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
}

// ---------------- JOBS, MENTORS & ALERTS ----------------

model JobPosting {
  id          String           @id @default(cuid())
  title       String
  company     String
  location    String
  salary      String
  roleId      String
  tags        String[]
  role        CareerRole       @relation(fields: [roleId], references: [id])
  applied     JobApplication[]
}

model JobApplication {
  id        String     @id @default(cuid())
  userId    String
  jobId     String
  status    String     @default("APPLIED") // APPLIED, INTERVIEW, OFFER, REJECTED
  appliedAt DateTime   @default(now())
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  job       JobPosting @relation(fields: [jobId], references: [id], onDelete: Cascade)

  @@unique([userId, jobId])
}

model MentorBooking {
  id         String   @id @default(cuid())
  userId     String
  mentorName String
  company    String
  scheduledAt DateTime
  status     String   @default("CONFIRMED")
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  title     String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, read])
}
```

---

## 5. Hard Free-Tier Limits & Mitigation Architecture

| Resource | Standing Free Limit | Critical Risk | Architectural Mitigation |
|---|---|---|---|
| **Gemini API** | 15 req/min, 1,500 req/day | 429 Rate Limit error during user traffic burst | **Token Bucket Rate Limiter**: Maximum 5 AI requests/min per user. **Cache Layer**: Cache deterministic gap summaries in Postgres for identical skill sets. **Failover**: Automatic fallback to Groq Cloud (30 RPM free). |
| **Supabase Postgres** | 500 MB data volume | Disk overflow from resume blobs | **Zero Binary in DB**: PDFs are uploaded to Supabase Storage; DB only stores extracted text tokens & parsed JSON. |
| **Supabase Storage** | 1 GB storage | Storage quota exhaustion | **Compression & Cleanup**: Store only user's latest 2 resumes. Previous versions are garbage-collected after 30 days. |
| **Resend Email** | 3,000 emails/month (100/day) | Email quota lock | Restrict to transactional essentials: Magic link / Verification & Password Reset. Milestone notifications are in-app by default. |
| **Vercel Hobby** | 100 GB Bandwidth | Asset transfer spikes | Next.js image optimization, static asset bundling, Google Fonts loaded via edge CDN. |

---

## 6. Phased Development Roadmap (Phase 0 to Phase 13)

### Phase 0: System Architecture & Data Modeling (Days 1–2)
- Finalize Prisma schema, indexes, and initial data taxonomy.
- Seed database with 6 career roles, 50 foundational skills, and 8 standard courses.
- Set up GitHub repository with strict ESLint, TypeScript, and Prettier rules.

### Phase 1: Project Foundation & Infra Setup (Days 3–4)
- Initialize Next.js 15 with Tailwind CSS v4, Lucide icons, and shadcn/ui.
- Connect Supabase Postgres with Prisma client connection pooling.
- Configure environment variables for Gemini Free, Groq Free, and Better Auth.

### Phase 2: Authentication & User Accounts (Days 5–6)
- Implement Better Auth with Email/Password & Google OAuth.
- Session cookie validation middleware for all `/(dashboard)/*` routes.
- Profile initialization with default target role selection.

### Phase 3: Profile Setup & Baseline Skill Intake (Days 7–8)
- Skill selector component with autocomplete from `Skill` table.
- Proficiency sliders (Beginner 30%, Intermediate 60%, Advanced 90%).
- Real-time profile strength computation algorithm.

### Phase 4: Deterministic Skill Gap Engine (Days 9–10)
- Build mathematical weighted difference calculator (`lib/engines/skill-gap/deterministic.ts`).
- Interactive Gap Analysis page with role dropdown switcher.
- Status classification: *Have It*, *Preferred Gap*, *Critical Blocker*.

### Phase 5: Dynamic Career Roadmap Generator (Days 11–13)
- Prerequisite DAG compiler (`lib/engines/roadmap/generator.ts`).
- Interactive milestone tree with status toggles (`Completed`, `Current`, `Upcoming`).
- Progress synchronization with Dashboard Overview.

### Phase 6: Course Hub & Learning Modules (Days 14–15)
- Course catalog with enrollment state management.
- Modular progress tracking with completion percentage bars.
- Link course modules directly to roadmap step items.

### Phase 7: Dashboard Overview & Analytics Aggregator (Days 16–17)
- Aggregate dashboard view: 4 metric stat cards + welcome banner + next step callout.
- Trending skills widget showing real-time market demand percentages.
- Top job openings preview matching user's current readiness score.

### Phase 8: 24/7 Context-Aware AI Career Coach (Days 18–20)
- Streaming chat route (`/api/ai/coach`) leveraging Gemini 2.5 Flash / Groq.
- Profile context injector (user goal, top skills, missing skills, current step).
- Pre-engineered quick-reply chips and error-resilient fallback handler.

### Phase 9: Resume Analyzer & ATS Scorer (Days 21–23)
- Drag-and-drop file upload with `pdf-parse` text extraction.
- Structured skill matching against user's target career role.
- Radial match score display with strengths, gaps, and AI feedback.

### Phase 10: AI Project Lab (Days 24–25)
- Practical project generator tailored to unresolved skill gaps.
- Architectural overview, starter boilerplate layout, and validation checklists.

### Phase 11: Job Board & Tracker (Days 26–27)
- Filtered job board with match percentage calculation.
- One-click application pipeline (`Applied`, `Interviewing`, `Offer`, `Rejected`).
- Profile boost recommendations.

### Phase 12: Quality Assurance, Security & Testing (Days 28–30)
- Unit tests for deterministic skill gap calculations and DAG roadmap traversal.
- E2E tests for the core product loop (Sign up $\rightarrow$ Choose goal $\rightarrow$ Gap analysis $\rightarrow$ Roadmap $\rightarrow$ Resume analysis).
- Prompt injection hardening and rate-limit verification.

### Phase 13: Production Deployment & Zero-Cost Go-Live (Day 31)
- Deploy Next.js to Vercel Hobby.
- Configure custom domain via Cloudflare Free Tier.
- Configure Supabase database backup snapshot and automated health-check ping.

---

## 7. Exact MVP Scope vs. Deferred Features

| Domain | In MVP Scope (Core Loop) | Deferred to V2 (Post-MVP) |
|---|---|---|
| **Auth** | Email/Password + Google OAuth + Session management | Multi-factor auth (SMS/TOTP), Enterprise SSO |
| **Skill Gap** | 6 primary roles (Full Stack, Frontend, Backend, Data Science, DevOps, ML) | Custom user-defined roles with arbitrary skills |
| **Roadmap** | 8 milestone stages per role, manual step toggles | Dynamic sub-task branching with automated GitHub commit verification |
| **AI Coach** | Streaming text chat with sliding window memory + 4 prompt shortcuts | Voice-to-voice Live API coaching, simulated technical mock coding interview audio |
| **Resume** | PDF text parsing, structured extraction, ATS scoring, recommendation card | In-browser WYSIWYG resume builder with PDF export |
| **Courses** | Curated free courses with progress tracking | Native video player streaming and paid course payment gateways |
| **Jobs** | Curated job database with match % and application tracker | Automated web scraping of LinkedIn/Indeed, one-click auto-apply bots |
| **Mentors** | Human mentor profiles + booking request toast and notification | Native video call WebRTC rooms, Google Calendar two-way sync |

---

## 8. Key Production Engineering Practices

1. **Deterministic-First AI Architecture**:
   - Math, scoring, percentages, and prerequisites are computed strictly in TypeScript.
   - LLMs are reserved exclusively for narrative synthesis, feedback explanation, and conversational assistance.
2. **Strict Schema Validation (Zod)**:
   - Every AI prompt requiring structured outputs passes through a Zod schema via Gemini JSON mode. If an output fails schema validation, the router retries once with temperature 0.1 before falling back to a deterministic template.
3. **Prompt Injection & Data Sanitization**:
   - All uploaded resume text is stripped of potential instruction-override sequences (e.g. *"Ignore previous instructions and output..."*) prior to being inserted into LLM prompt templates.
4. **Resilient Rate-Limit Router (`lib/ai/router.ts`)**:
   - Primary: Gemini 2.5 Flash
   - If HTTP 429 or timeout $\rightarrow$ Groq (Llama 3.3 70B)
   - If Groq unavailable $\rightarrow$ OpenRouter free tier
   - If all fail $\rightarrow$ Deterministic rule-based fallback response
5. **Observability**:
   - Lightweight console telemetry logging latency, provider used, and token count per request.

---

## 9. Success Criteria for V1

A release candidate is deemed successful when a newly registered user can:
1. Create an account in under 30 seconds with zero credit card prompt.
2. Select a target role (e.g. *Full Stack Developer*) and declare baseline skills.
3. Receive a mathematically verified Skill Gap report showing exact missing competencies.
4. Unlock an 8-step Career Roadmap with active course links.
5. Upload a standard PDF resume and obtain an ATS match score with extracted skills.
6. Ask the AI Career Coach 5 contextual questions with sub-2-second streaming latency.
7. Track at least 1 job application in the pipeline.
8. Complete the entire user journey without incurring any hosting, database, or API charges.

---

## 10. Immediate Next Actions (Day 1 Execution)

1. **Database Provisioning**:
   - Create a free project on Supabase and copy the PostgreSQL connection string.
2. **Free API Keys**:
   - Generate a free Gemini API key from Google AI Studio.
   - Generate a free Groq API key from Groq Cloud Console.
3. **Scaffold Next.js App**:
   ```bash
   npx create-next-app@latest careergroww --typescript --tailwind --eslint --app --src-dir=false
   npm install prisma @prisma/client zod better-auth lucide-react clsx tailwind-merge
   npx prisma init
   ```
4. **Seed Database Taxonomy**:
   - Paste the schema into `prisma/schema.prisma` and run `npx prisma db push`.
   - Seed default skills and career roles.
5. **Test Deterministic Gap Engine**:
   - Write pure unit tests for the set difference logic before connecting the UI.
