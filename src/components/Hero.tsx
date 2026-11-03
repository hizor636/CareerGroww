import React, { useState, useEffect } from 'react';

interface HeroProps {
  onLogin: (email: string) => void;
  onOpenSignup: () => void;
  onExploreCourses: () => void;
  onHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onLogin,
  onOpenSignup,
  onExploreCourses,
  onHowItWorks,
}) => {
  const [email, setEmail] = useState('alex@email.com');
  const [password, setPassword] = useState('password123');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Animated counters
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [placementRate, setPlacementRate] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStudentsCount(Math.floor(progress * 50));
      setCoursesCount(Math.floor(progress * 40));
      setPlacementRate(Math.floor(progress * 95));

      if (step >= steps) {
        clearInterval(timer);
        setStudentsCount(50);
        setCoursesCount(40);
        setPlacementRate(95);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);
      setTimeout(() => {
        onLogin(email);
      }, 700);
    }, 1000);
  };

  return (
    <section id="hero" className="min-h-screen bg-[#1A1F3C] text-white pt-32 pb-20 px-6 lg:px-16 relative overflow-hidden flex items-center">
      {/* Background Animated Blobs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.28),transparent_70%)] -top-28 -right-16 pointer-events-none animate-blob-1" />
      <div className="absolute w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(85,100,255,0.22),transparent_70%)] -bottom-20 left-[6%] pointer-events-none animate-blob-2" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Hero Copy */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/15 border border-[#FF6B00]/35 text-[#FF8C35] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse-dot" />
            #1 Career Growth Platform in India
          </div>

          <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] mb-6">
            Turning <span className="text-[#FF6B00]">Potential</span><br className="hidden sm:inline" /> into Profession
          </h1>

          <p className="text-[#8892B0] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            Unlock your dream career with expert-led courses, real-world projects, AI-powered skill analysis, and personalized mentorship — all in one powerful platform.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
            <button
              onClick={onExploreCourses}
              className="bg-[#FF6B00] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base cursor-pointer shadow-[0_4px_22px_rgba(255,107,0,0.4)] hover:shadow-[0_10px_32px_rgba(255,107,0,0.55)] hover:-translate-y-0.5 transition-all"
            >
              Explore Courses
            </button>
            <button
              onClick={onHowItWorks}
              className="bg-transparent text-white px-8 py-3.5 rounded-xl border border-white/25 font-semibold text-sm sm:text-base cursor-pointer hover:bg-white/10 hover:border-[#FF6B00] transition-all"
            >
              How It Works
            </button>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 pt-6 border-t border-white/10">
            <div>
              <div className="font-syne text-2xl sm:text-3xl font-extrabold text-white flex items-baseline">
                {studentsCount}k<span className="text-[#FF6B00]">+</span>
              </div>
              <div className="text-xs sm:text-sm text-[#8892B0] mt-1">Students Enrolled</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <div className="font-syne text-2xl sm:text-3xl font-extrabold text-white flex items-baseline">
                {coursesCount}<span className="text-[#FF6B00]">+</span>
              </div>
              <div className="text-xs sm:text-sm text-[#8892B0] mt-1">Expert Courses</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <div className="font-syne text-2xl sm:text-3xl font-extrabold text-white flex items-baseline">
                {placementRate}<span className="text-[#FF6B00]">%</span>
              </div>
              <div className="text-xs sm:text-sm text-[#8892B0] mt-1">Placement Rate</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Login Card */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="bg-white text-[#1A1F3C] rounded-3xl p-8 sm:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] max-w-md w-full border border-white/20 relative">
            <div className="flex items-center gap-2.5 justify-center mb-1">
              <div className="flex items-end gap-[3px] h-5">
                <span className="w-1.5 h-2.5 rounded-sm bg-[#FF6B00]"></span>
                <span className="w-1.5 h-4 rounded-sm bg-[#1A1F3C]"></span>
                <span className="w-1.5 h-5 rounded-sm bg-[#1A1F3C]"></span>
                <span className="w-1.5 h-4 rounded-sm bg-[#1A1F3C]"></span>
              </div>
              <span className="font-syne font-extrabold text-xl text-[#1A1F3C]">Career Groww</span>
            </div>
            <p className="text-center text-[#8892B0] text-sm mb-6">Login into your account</p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1F3C] mb-1.5">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@email.com"
                    required
                    className="w-full px-4 py-2.5 pr-10 border border-[#E8EAF2] rounded-lg text-sm bg-[#F7F8FC] text-[#1A1F3C] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm opacity-60">✉️</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1F3C] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2.5 pr-10 border border-[#E8EAF2] rounded-lg text-sm bg-[#F7F8FC] text-[#1A1F3C] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm opacity-60">🔒</span>
                </div>
                <div className="flex justify-end mt-1">
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password is: password123'); }} className="text-xs text-[#FF6B00] hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn || loginSuccess}
                className={`w-full py-3.5 rounded-xl font-syne font-bold text-sm text-white transition-all shadow-[0_4px_18px_rgba(255,107,0,0.35)] cursor-pointer mt-2 ${
                  loginSuccess 
                    ? 'bg-[#10B981]' 
                    : 'bg-[#FF6B00] hover:bg-[#FF8C35] hover:shadow-[0_8px_24px_rgba(255,107,0,0.45)] hover:-translate-y-0.5'
                }`}
              >
                {isLoggingIn ? 'Logging in...' : loginSuccess ? '✓ Welcome Back!' : 'Login now'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <span className="flex-1 h-[1px] bg-[#E8EAF2]" />
              <span className="text-xs text-[#8892B0] uppercase font-semibold">OR</span>
              <span className="flex-1 h-[1px] bg-[#E8EAF2]" />
            </div>

            <button
              type="button"
              onClick={onOpenSignup}
              className="w-full py-3 rounded-xl border-1.5 border-[#FF6B00] text-[#FF6B00] font-semibold text-sm hover:bg-[#FF6B00] hover:text-white transition-all cursor-pointer"
            >
              Signup now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
