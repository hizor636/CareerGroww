export type PageType = 
  | 'dashboard' 
  | 'resume' 
  | 'gap' 
  | 'roadmap' 
  | 'projects'
  | 'interview'
  | 'mentor' 
  | 'courses' 
  | 'jobs' 
  | 'skills' 
  | 'notifications' 
  | 'profile';

export interface User {
  name: string;
  email: string;
  role: string;
  track: string;
  profileStrength: number;
  skillsCount: number;
  certsCount: number;
  avatarLetter: string;
  settings: {
    emailNotifications: boolean;
    jobAlerts: boolean;
    darkMode: boolean;
  };
}

export interface UserSkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100%
  verified: boolean;
}

export interface Course {
  id: string;
  title: string;
  tag: string;
  desc: string;
  price: string;
  enrolled: boolean;
  progress?: number;
  thumbIcon: string;
  thumbGradient: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  tags: string[];
  icon: string;
  applied?: boolean;
}

export interface TrendingSkill {
  name: string;
  category: string;
  growth: string;
  demand: number;
}

export interface RoadmapStep {
  id: number;
  stepNum: number;
  title: string;
  desc: string;
  tag: string;
  status: 'completed' | 'current' | 'upcoming';
  progress?: number;
  skillsTaught?: string[];
  coursesLinked?: string[];
}

export interface LiveSession {
  id: string;
  title: string;
  month: string;
  day: string;
  time: string;
  type: string;
  gradient: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  exp: string;
  company: string;
  gradient: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
  bg: string;
  read?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export interface ExtractedSkill {
  name: string;
  score: number;
}

export interface ProjectSpec {
  id: string;
  title: string;
  role: string;
  skillGapsResolved: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  problemStatement: string;
  architecture: string[];
  techStack: string[];
  milestones: { step: number; title: string; tasks: string[]; completed?: boolean }[];
  starterSnippet: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'technical' | 'hr' | 'system-design';
  role: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  framework: string; // e.g., "STAR Method", "High-Level Architecture", "Big-O Time Complexity"
  tips: string[];
  sampleAnswer: string;
}
