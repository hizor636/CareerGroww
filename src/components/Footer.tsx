import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0E1124] text-white pt-16 pb-8 px-6 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 font-syne font-extrabold text-2xl text-white no-underline mb-4">
              <div className="w-9 h-9 rounded-full bg-[#1A1F3C] flex items-center justify-center overflow-hidden flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M3 17L9 11L13 15L21 7" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 7H21V11" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex">
                <span className="text-white">Career</span>
                <span className="text-[#FF6B00]">Groww</span>
              </div>
            </a>
            <p className="text-[#8892B0] text-sm leading-relaxed max-w-sm">
              Empowering professionals across India to unlock their full career potential through world-class education, AI analytics, and mentorship.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-syne font-bold text-sm text-white mb-4">Courses</h4>
            <ul className="space-y-2.5 text-sm text-[#8892B0] list-none p-0 m-0">
              <li><a href="#courses" className="hover:text-[#FF6B00] transition-colors">Web Development</a></li>
              <li><a href="#courses" className="hover:text-[#FF6B00] transition-colors">Data Science</a></li>
              <li><a href="#courses" className="hover:text-[#FF6B00] transition-colors">Cloud Computing</a></li>
              <li><a href="#courses" className="hover:text-[#FF6B00] transition-colors">UI/UX Design</a></li>
              <li><a href="#courses" className="hover:text-[#FF6B00] transition-colors">Digital Marketing</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-syne font-bold text-sm text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-[#8892B0] list-none p-0 m-0">
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-syne font-bold text-sm text-white mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-[#8892B0] list-none p-0 m-0">
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8892B0]">
          <p>© 2025 <span className="text-[#FF6B00] font-semibold">Career Groww</span>. All rights reserved. Made with ❤️ in India.</p>
          <p className="text-[#FF6B00] font-semibold">Turning Potential into Profession!!</p>
        </div>
      </div>
    </footer>
  );
};
