import React, { useState } from 'react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupSuccess: (name: string, email: string) => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSignupSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSignupSuccess(fullName, email);
        onClose();
      }, 900);
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/75 z-[2000] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white text-[#1A1F3C] rounded-2xl p-8 max-w-sm w-full relative shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1F3C] text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 justify-center mb-1">
          <div className="flex items-end gap-[3px] h-5">
            <span className="w-1.5 h-2.5 rounded-sm bg-[#FF6B00]"></span>
            <span className="w-1.5 h-4 rounded-sm bg-[#1A1F3C]"></span>
            <span className="w-1.5 h-5 rounded-sm bg-[#1A1F3C]"></span>
            <span className="w-1.5 h-4 rounded-sm bg-[#1A1F3C]"></span>
          </div>
          <span className="font-syne font-extrabold text-xl text-[#1A1F3C]">Career Groww</span>
        </div>
        <p className="text-center text-[#8892B0] text-sm mb-6">Create your free account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A1F3C] mb-1">Full Name</label>
            <div className="relative">
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Kumar"
                required
                className="w-full px-3.5 py-2.5 pr-10 border border-[#E8EAF2] rounded-lg text-sm bg-[#F7F8FC] text-[#1A1F3C] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-60">👤</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1F3C] mb-1">Email address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@email.com"
                required
                className="w-full px-3.5 py-2.5 pr-10 border border-[#E8EAF2] rounded-lg text-sm bg-[#F7F8FC] text-[#1A1F3C] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-60">✉️</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1F3C] mb-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="w-full px-3.5 py-2.5 pr-10 border border-[#E8EAF2] rounded-lg text-sm bg-[#F7F8FC] text-[#1A1F3C] focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-60">🔒</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading || success}
            className={`w-full py-3 rounded-lg font-syne font-bold text-sm text-white transition-all shadow-md mt-2 ${
              success 
                ? 'bg-[#10B981]' 
                : 'bg-[#FF6B00] hover:bg-[#FF8C35] hover:-translate-y-0.5 hover:shadow-lg'
            }`}
          >
            {isLoading ? 'Creating Account...' : success ? '✓ Account Created!' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-[#8892B0] mt-4">
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={onClose} 
            className="text-[#FF6B00] font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
