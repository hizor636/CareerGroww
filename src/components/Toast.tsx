import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-[90px] right-6 z-[600] pointer-events-none transition-all duration-300 animate-bounce">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-[0_8px_32px_rgba(124,58,237,0.4)] flex items-center gap-2 border border-white/20">
        <span>✨</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
