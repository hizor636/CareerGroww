import { Course, Job, TrendingSkill, RoadmapStep, LiveSession, Mentor, NotificationItem } from '../types';

export const INITIAL_USER = {
  name: 'Alex Kumar',
  email: 'alex@email.com',
  role: 'Full Stack Developer Track',
  track: 'Full Stack Developer',
  profileStrength: 68,
  skillsCount: 12,
  certsCount: 3,
  avatarLetter: 'A',
  settings: {
    emailNotifications: true,
    jobAlerts: true,
    darkMode: true
  }
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Development',
    tag: 'Tech',
    desc: 'Master React, Node.js, MongoDB & more. Build 10 real-world projects.',
    price: '₹4,999',
    enrolled: true,
    progress: 45,
    thumbIcon: '💻',
    thumbGradient: 'linear-gradient(135deg, #1A1F3C, #2E3563)'
  },
  {
    id: 'datascience',
    title: 'Data Science & Machine Learning',
    tag: 'Data',
    desc: 'Python, Pandas, Scikit-learn, deep learning & AI fundamentals.',
    price: '₹5,999',
    enrolled: true,
    progress: 22,
    thumbIcon: '📊',
    thumbGradient: 'linear-gradient(135deg, #FF6B00, #FF8C35)'
  },
  {
    id: 'aws',
    title: 'AWS Cloud Practitioner',
    tag: 'Cloud',
    desc: 'Complete certification prep for AWS Cloud Practitioner & Solutions Architect.',
    price: '₹3,999',
    enrolled: true,
    progress: 10,
    thumbIcon: '☁️',
    thumbGradient: 'linear-gradient(135deg, #0A2647, #144272)'
  },
  {
    id: 'flutter',
    title: 'Flutter App Development',
    tag: 'Mobile',
    desc: 'Build cross-platform iOS & Android apps with Dart and Flutter.',
    price: '₹4,499',
    enrolled: false,
    thumbIcon: '📱',
    thumbGradient: 'linear-gradient(135deg, #1A1F3C, #4A0E8F)'
  },
  {
    id: 'digitalmarketing',
    title: 'Digital Marketing Mastery',
    tag: 'Business',
    desc: 'SEO, SEM, Social Media, Email Marketing & Growth Hacking strategies.',
    price: '₹2,999',
    enrolled: false,
    thumbIcon: '📈',
    thumbGradient: 'linear-gradient(135deg, #0D5C3A, #1A8A57)'
  },
  {
    id: 'uiux',
    title: 'UI/UX Design Professional',
    tag: 'Design',
    desc: 'Figma, user research, wireframing & creating award-winning designs.',
    price: '₹3,499',
    enrolled: false,
    thumbIcon: '🎨',
    thumbGradient: 'linear-gradient(135deg, #6B1A1A, #B03030)'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: 'Razorpay',
    location: 'Bengaluru',
    salary: '₹12-18 LPA',
    match: 94,
    tags: ['React', 'JavaScript', 'TypeScript'],
    icon: '🏢',
    applied: false
  },
  {
    id: 'job-2',
    title: 'Full Stack Engineer',
    company: 'CRED',
    location: 'Remote',
    salary: '₹15-22 LPA',
    match: 87,
    tags: ['Node.js', 'React', 'AWS'],
    icon: '🚀',
    applied: false
  },
  {
    id: 'job-3',
    title: 'React Developer',
    company: 'PhonePe',
    location: 'Bengaluru',
    salary: '₹10-16 LPA',
    match: 82,
    tags: ['React', 'Redux', 'CSS'],
    icon: '💳',
    applied: false
  },
  {
    id: 'job-4',
    title: 'Software Developer',
    company: 'Flipkart',
    location: 'Bengaluru',
    salary: '₹14-20 LPA',
    match: 79,
    tags: ['Java', 'React', 'Spring'],
    icon: '🛒',
    applied: false
  },
  {
    id: 'job-5',
    title: 'Backend Engineer',
    company: 'Swiggy',
    location: 'Bengaluru / Hybrid',
    salary: '₹16-24 LPA',
    match: 75,
    tags: ['Node.js', 'Go', 'Microservices'],
    icon: '🍔',
    applied: false
  },
  {
    id: 'job-6',
    title: 'Cloud DevOps Associate',
    company: 'Zomato',
    location: 'Gurugram / Remote',
    salary: '₹12-17 LPA',
    match: 72,
    tags: ['AWS', 'Docker', 'Kubernetes'],
    icon: '🍕',
    applied: false
  }
];

export const TRENDING_SKILLS: TrendingSkill[] = [
  { name: 'Artificial Intelligence', category: 'Technology', growth: '+45%', demand: 95 },
  { name: 'Machine Learning', category: 'Technology', growth: '+42%', demand: 92 },
  { name: 'Cloud Computing', category: 'Technology', growth: '+38%', demand: 88 },
  { name: 'Cybersecurity', category: 'Security', growth: '+40%', demand: 84 },
  { name: 'React/Next.js', category: 'Frontend', growth: '+30%', demand: 80 },
  { name: 'Data Science', category: 'Analytics', growth: '+35%', demand: 86 },
  { name: 'DevOps', category: 'Technology', growth: '+36%', demand: 82 },
  { name: 'Python', category: 'Programming', growth: '+28%', demand: 85 },
  { name: 'Kubernetes', category: 'Infrastructure', growth: '+33%', demand: 78 },
  { name: 'Generative AI', category: 'AI/ML', growth: '+60%', demand: 91 }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  { id: 1, stepNum: 1, title: 'HTML & CSS Fundamentals', desc: 'Build responsive, accessible modern web pages', tag: 'Completed', status: 'completed' },
  { id: 2, stepNum: 2, title: 'JavaScript ES6+', desc: 'Modern JS, async/await, closures, DOM manipulation', tag: 'Completed', status: 'completed' },
  { id: 3, stepNum: 3, title: 'Git & Version Control', desc: 'GitHub collaboration, branching strategies, CI/CD basics', tag: 'Completed', status: 'completed' },
  { id: 4, stepNum: 4, title: 'React.js Deep Dive', desc: 'Hooks, Context API, state machines, component architecture', tag: 'In Progress · 45%', status: 'current', progress: 45 },
  { id: 5, stepNum: 5, title: 'Node.js & Express', desc: 'REST APIs, middleware, security, JWT authentication', tag: 'Upcoming', status: 'upcoming' },
  { id: 6, stepNum: 6, title: 'MongoDB & Databases', desc: 'NoSQL, schema design, aggregation pipelines, Prisma/Mongoose', tag: 'Upcoming', status: 'upcoming' },
  { id: 7, stepNum: 7, title: 'AWS & Cloud Deployment', desc: 'EC2, S3, Docker containers, Lambda, serverless monitoring', tag: 'Upcoming', status: 'upcoming' },
  { id: 8, stepNum: 8, title: 'Full Stack Capstone Project', desc: 'Build, test, and deploy a production SaaS application', tag: 'Final Step', status: 'upcoming' }
];

export const LIVE_SESSIONS: LiveSession[] = [
  { id: 's1', title: 'React Hooks Masterclass', month: 'MAR', day: '18', time: '7:00 PM · Live Session', type: 'Live Session', gradient: 'linear-gradient(135deg, #7C3AED, #FF6B00)' },
  { id: 's2', title: '1:1 Mentor Session', month: 'MAR', day: '22', time: '5:30 PM · Video Call', type: 'Video Call', gradient: 'linear-gradient(135deg, #0EA5E9, #7C3AED)' },
  { id: 's3', title: 'System Design for Freshers', month: 'MAR', day: '26', time: '6:30 PM · Webinar', type: 'Webinar', gradient: 'linear-gradient(135deg, #10B981, #0EA5E9)' }
];

export const MENTORS: Mentor[] = [
  { id: 'm1', name: 'Rahul Sharma', role: 'Senior SDE · 8 yrs exp', exp: '8 yrs exp', company: 'Google', gradient: 'linear-gradient(135deg, #7C3AED, #FF6B00)' },
  { id: 'm2', name: 'Priya Nair', role: 'Data Scientist · 6 yrs', exp: '6 yrs exp', company: 'Amazon', gradient: 'linear-gradient(135deg, #0EA5E9, #7C3AED)' },
  { id: 'm3', name: 'Amit Joshi', role: 'DevOps Lead · 10 yrs', exp: '10 yrs exp', company: 'Microsoft', gradient: 'linear-gradient(135deg, #10B981, #0EA5E9)' },
  { id: 'm4', name: 'Sneha Roy', role: 'Product Architect · 9 yrs', exp: '9 yrs exp', company: 'Atlassian', gradient: 'linear-gradient(135deg, #F43F5E, #9333EA)' },
  { id: 'm5', name: 'Vikram Mehta', role: 'Staff Engineer · 11 yrs', exp: '11 yrs exp', company: 'Uber', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
  { id: 'm6', name: 'Kavita Das', role: 'Frontend Lead · 7 yrs', exp: '7 yrs exp', company: 'Stripe', gradient: 'linear-gradient(135deg, #3B82F6, #10B981)' }
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'Course milestone reached!', desc: 'You completed Module 3 of React.js Deep Dive', time: '2 hours ago', icon: '✅', bg: 'rgba(16,185,129,.15)', read: false },
  { id: 'n2', title: 'New job match', desc: 'Frontend Developer at Razorpay – 94% match with your profile', time: '5 hours ago', icon: '💼', bg: 'rgba(255,107,0,.15)', read: false },
  { id: 'n3', title: 'Session reminder', desc: 'React Hooks Masterclass tomorrow at 7:00 PM', time: '1 day ago', icon: '📅', bg: 'rgba(124,58,237,.15)', read: false },
  { id: 'n4', title: 'Mentor request confirmed', desc: 'Your 1:1 with Rahul Sharma is scheduled for March 22', time: '2 days ago', icon: '🤝', bg: 'rgba(59,130,246,.15)', read: true },
  { id: 'n5', title: 'Achievement unlocked!', desc: 'You earned the "7-Day Learning Streak" badge', time: '3 days ago', icon: '🏆', bg: 'rgba(245,158,11,.15)', read: true }
];

export const GAP_DATA: Record<string, { title: string; items: { skill: string; have: boolean; level: string }[] }> = {
  fullstack: {
    title: 'Full Stack Developer',
    items: [
      { skill: 'React.js', have: true, level: 'Intermediate' },
      { skill: 'Node.js', have: false, level: 'Required' },
      { skill: 'MongoDB', have: false, level: 'Required' },
      { skill: 'TypeScript', have: false, level: 'Preferred' },
      { skill: 'REST APIs', have: true, level: 'Intermediate' },
      { skill: 'AWS/Cloud', have: false, level: 'Preferred' },
      { skill: 'Docker', have: false, level: 'Preferred' },
      { skill: 'Git', have: true, level: 'Advanced' },
      { skill: 'JavaScript', have: true, level: 'Advanced' },
      { skill: 'HTML/CSS', have: true, level: 'Advanced' }
    ]
  },
  frontend: {
    title: 'Frontend Developer',
    items: [
      { skill: 'React.js', have: true, level: 'Required' },
      { skill: 'TypeScript', have: false, level: 'Preferred' },
      { skill: 'CSS/Tailwind', have: true, level: 'Advanced' },
      { skill: 'Next.js', have: false, level: 'Preferred' },
      { skill: 'Testing/Jest', have: false, level: 'Preferred' },
      { skill: 'Figma', have: false, level: 'Nice to have' },
      { skill: 'JavaScript', have: true, level: 'Advanced' },
      { skill: 'Git', have: true, level: 'Advanced' }
    ]
  },
  backend: {
    title: 'Backend Developer',
    items: [
      { skill: 'Node.js / Express', have: false, level: 'Required' },
      { skill: 'PostgreSQL / SQL', have: true, level: 'Intermediate' },
      { skill: 'MongoDB', have: false, level: 'Required' },
      { skill: 'System Design', have: false, level: 'Required' },
      { skill: 'Redis Caching', have: false, level: 'Preferred' },
      { skill: 'Docker & Kubernetes', have: false, level: 'Preferred' },
      { skill: 'API Security & OAuth', have: true, level: 'Intermediate' }
    ]
  },
  ds: {
    title: 'Data Scientist',
    items: [
      { skill: 'Python', have: true, level: 'Intermediate' },
      { skill: 'Machine Learning', have: false, level: 'Required' },
      { skill: 'Pandas/NumPy', have: false, level: 'Required' },
      { skill: 'SQL', have: true, level: 'Basic' },
      { skill: 'Statistics', have: false, level: 'Required' },
      { skill: 'TensorFlow', have: false, level: 'Preferred' },
      { skill: 'Data Visualisation', have: false, level: 'Required' },
      { skill: 'Jupyter', have: false, level: 'Preferred' }
    ]
  },
  devops: {
    title: 'DevOps Engineer',
    items: [
      { skill: 'Linux Administration', have: true, level: 'Intermediate' },
      { skill: 'Docker Containerization', have: false, level: 'Required' },
      { skill: 'Kubernetes Orchestration', have: false, level: 'Required' },
      { skill: 'CI/CD Pipelines (GitHub Actions)', have: true, level: 'Intermediate' },
      { skill: 'Terraform (IaC)', have: false, level: 'Preferred' },
      { skill: 'Cloud Architecture (AWS/GCP)', have: false, level: 'Required' },
      { skill: 'Monitoring (Prometheus/Grafana)', have: false, level: 'Preferred' }
    ]
  },
  ml: {
    title: 'Machine Learning Engineer',
    items: [
      { skill: 'Python & PyTorch', have: true, level: 'Intermediate' },
      { skill: 'Model Training & Evaluation', have: false, level: 'Required' },
      { skill: 'Data Preprocessing Pipelines', have: false, level: 'Required' },
      { skill: 'Deep Neural Networks', have: false, level: 'Required' },
      { skill: 'LLM Fine-tuning & Embeddings', have: false, level: 'Preferred' },
      { skill: 'MLOps & Model Serving', have: false, level: 'Preferred' }
    ]
  }
};

export const BOT_RESPONSES = {
  resume: "Great question! For a strong resume:\n\n• Keep it to 1 page for <5 years experience\n• Use action verbs (Built, Led, Improved)\n• Quantify achievements (e.g. 'Improved load time by 40%')\n• Tailor keywords for each job description\n\nWant me to review specific sections?",
  interview: "Here's your interview prep guide:\n\n**Technical Round:**\n• Practice DSA on LeetCode (Easy/Medium)\n• Review system design basics\n• Know your projects deeply\n\n**HR Round:**\n• Prepare STAR format answers\n• Research the company thoroughly\n• Have questions ready for them\n\nWhich company are you interviewing at?",
  salary: "Salary negotiation tips:\n\n• Research market rates on Glassdoor/LinkedIn\n• Always negotiate — 70% of employers expect it\n• Give a range, not a number\n• Consider total comp: equity, benefits, WFH\n\nFor Full Stack in Bengaluru:\n• Fresher: ₹6-10 LPA\n• 2-3 years: ₹12-20 LPA\n• 5+ years: ₹25-45 LPA",
  career: "Thinking of switching careers? Here's my advice:\n\n• Identify transferable skills first\n• Start with side projects to build portfolio\n• Network actively on LinkedIn\n• Consider a structured bootcamp (like Career Groww!)\n• Target companies known for career switchers\n\nWhat field are you switching to?",
  skills: "Based on your profile, I recommend focusing on:\n\n1. **React.js** — You're at 65%, aim for 85%+\n2. **Node.js** — Critical for Full Stack roles\n3. **TypeScript** — In high demand at top companies\n4. **AWS basics** — Adds 15-20% to salary\n\nStart with completing your React course this week!",
  roadmap: "Your current roadmap looks great! Here's what I suggest:\n\n✅ HTML/CSS — Done\n✅ JavaScript ES6+ — Done\n🔄 React.js — 45% (Focus here this week!)\n⬜ Node.js — Up next\n⬜ MongoDB — After Node\n⬜ AWS — Final stretch\n\nAt your current pace, you'll be job-ready in ~8 weeks!",
  default: "That's a great question! Based on your profile as an aspiring Full Stack Developer, I'd say:\n\n• Stay consistent with your React.js learning (45% → 100%)\n• Your JavaScript skills are strong — great foundation!\n• Start applying to junior positions in 4-6 weeks\n• Join developer communities (GitHub, Dev.to, Twitter)\n\nIs there anything specific about your career journey I can help with?"
};
