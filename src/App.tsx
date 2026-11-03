import React, { useState, useEffect } from 'react';
import { PageType, User, Course, Job } from './types';
import { INITIAL_USER, INITIAL_COURSES, INITIAL_JOBS, TRENDING_SKILLS, ROADMAP_STEPS } from './data/mockData';

// Landing Page Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { CoursesSection } from './components/CoursesSection';
import { Testimonials } from './components/Testimonials';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { SignupModal } from './components/SignupModal';

// Dashboard Components
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './components/pages/DashboardHome';
import { ResumeAnalysis } from './components/pages/ResumeAnalysis';
import { GapAnalysis } from './components/pages/GapAnalysis';
import { CareerRoadmap } from './components/pages/CareerRoadmap';
import { ProjectLab } from './components/pages/ProjectLab';
import { InterviewPrep } from './components/pages/InterviewPrep';
import { MentorBooking } from './components/pages/MentorBooking';
import { CoursesPage } from './components/pages/CoursesPage';
import { JobBoard } from './components/pages/JobBoard';
import { TrendingSkills } from './components/pages/TrendingSkills';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { ProfilePage } from './components/pages/ProfilePage';

// Shared Components
import { Chatbot } from './components/Chatbot';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [activePage, setActivePage] = useState<PageType>('dashboard');
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('careergroww_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [jobs] = useState<Job[]>(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress for landing page
  useEffect(() => {
    const handleScroll = () => {
      if (currentView === 'landing') {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleLogin = (_email: string) => {
    setCurrentView('dashboard');
    setActivePage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleSignupSuccess = (name: string, email: string) => {
    const newUser: User = {
      ...user,
      name,
      email,
      avatarLetter: name.trim().charAt(0).toUpperCase() || 'A',
    };
    setUser(newUser);
    localStorage.setItem('careergroww_user', JSON.stringify(newUser));
    setCurrentView('dashboard');
    setActivePage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Account created! Welcome to CareerGroww, ${name}!`);
  };

  const handleLogout = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Logged out successfully');
  };

  const handleEnrollCourse = (course: Course) => {
    if (currentView === 'landing') {
      setIsSignupOpen(true);
      return;
    }
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, enrolled: true, progress: c.progress || 5 } : c))
    );
    showToast(`Enrolled in ${course.title}!`);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('careergroww_user', JSON.stringify(next));
      return next;
    });
  };

  const openCoachWithPrompt = (promptText: string) => {
    const bubble = document.querySelector('button[title="Chat with AI Career Mentor"]') as HTMLButtonElement;
    if (bubble) {
      bubble.click();
      setTimeout(() => {
        const input = document.querySelector('input[placeholder*="Ask anything"]') as HTMLInputElement;
        if (input) {
          input.value = promptText;
          input.focus();
        }
      }, 300);
    }
  };

  // Filter items based on global search in dashboard
  const filteredCourses = searchQuery.trim()
    ? courses.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;

  const filteredJobs = searchQuery.trim()
    ? jobs.filter((j) =>
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : jobs;

  const filteredSkills = searchQuery.trim()
    ? TRENDING_SKILLS.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TRENDING_SKILLS;

  return (
    <div className="min-h-screen bg-[#0f0a1e] font-sans antialiased text-[#E2E8FF]">
      {/* Toast Notification Container */}
      <Toast message={toastMessage} />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSignupSuccess={handleSignupSuccess}
      />

      {/* Floating 24/7 AI Career Mentor Chatbot */}
      <Chatbot />

      {/* VIEW: LANDING PAGE */}
      {currentView === 'landing' && (
        <div className="bg-white text-[#1A1F3C]">
          {/* Top Scroll Progress Bar */}
          <div
            className="fixed top-0 left-0 h-1 bg-[#FF6B00] z-[9999] transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />

          <Navbar
            onOpenSignup={() => setIsSignupOpen(true)}
            onExploreCourses={() => handleScrollToSection('courses')}
            onScrollTo={handleScrollToSection}
          />

          <Hero
            onLogin={handleLogin}
            onOpenSignup={() => setIsSignupOpen(true)}
            onExploreCourses={() => handleScrollToSection('courses')}
            onHowItWorks={() => handleScrollToSection('how')}
          />

          <Features />

          <HowItWorks />

          <CoursesSection
            courses={courses}
            onEnroll={handleEnrollCourse}
          />

          <Testimonials />

          <CtaSection
            onStartFree={() => setIsSignupOpen(true)}
            onBrowseCourses={() => handleScrollToSection('courses')}
          />

          <Footer />
        </div>
      )}

      {/* VIEW: DASHBOARD */}
      {currentView === 'dashboard' && (
        <DashboardLayout
          user={user}
          activePage={activePage}
          onPageChange={(page) => {
            setActivePage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        >
          {activePage === 'dashboard' && (
            <DashboardHome
              user={user}
              onNavigate={(page) => {
                setActivePage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              trendingSkills={filteredSkills}
              roadmapSteps={ROADMAP_STEPS}
              jobs={filteredJobs}
              onOpenChat={() => {
                const bubble = document.querySelector('button[title="Chat with AI Career Mentor"]') as HTMLButtonElement;
                if (bubble) bubble.click();
              }}
            />
          )}

          {activePage === 'gap' && (
            <GapAnalysis
              onShowToast={showToast}
              onNavigateToRoadmap={() => {
                setActivePage('roadmap');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToProjects={() => {
                setActivePage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activePage === 'roadmap' && (
            <CareerRoadmap onShowToast={showToast} />
          )}

          {activePage === 'resume' && (
            <ResumeAnalysis onShowToast={showToast} />
          )}

          {activePage === 'projects' && (
            <ProjectLab onShowToast={showToast} />
          )}

          {activePage === 'interview' && (
            <InterviewPrep
              onOpenCoachWithPrompt={openCoachWithPrompt}
              onShowToast={showToast}
            />
          )}

          {activePage === 'mentor' && (
            <MentorBooking
              onShowToast={showToast}
              onOpenChat={() => {
                const bubble = document.querySelector('button[title="Chat with AI Career Mentor"]') as HTMLButtonElement;
                if (bubble) bubble.click();
              }}
            />
          )}

          {activePage === 'courses' && (
            <CoursesPage
              courses={filteredCourses}
              onEnroll={handleEnrollCourse}
              onShowToast={showToast}
            />
          )}

          {activePage === 'jobs' && (
            <JobBoard
              jobs={filteredJobs}
              onNavigate={(page) => {
                setActivePage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onShowToast={showToast}
            />
          )}

          {activePage === 'skills' && (
            <TrendingSkills skills={filteredSkills} />
          )}

          {activePage === 'notifications' && (
            <NotificationsPage onShowToast={showToast} />
          )}

          {activePage === 'profile' && (
            <ProfilePage
              user={user}
              onUpdateUser={updateUser}
              onLogout={handleLogout}
              onShowToast={showToast}
            />
          )}
        </DashboardLayout>
      )}
    </div>
  );
};

export default App;
