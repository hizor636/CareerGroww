import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { BOT_RESPONSES } from '../data/mockData';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'bot',
      text: "Hi Alex! 👋 I'm your Career AI Mentor. I can help you with:\n\n• Resume tips & feedback\n• Interview preparation\n• Career path guidance\n• Skill gap analysis\n• Salary negotiation\n\nWhat would you like to explore today?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const getBotResponse = (text: string): string => {
    const l = text.toLowerCase();
    if (l.includes('resume') || l.includes('cv')) return BOT_RESPONSES.resume;
    if (l.includes('interview')) return BOT_RESPONSES.interview;
    if (l.includes('salary') || l.includes('package') || l.includes('ctc') || l.includes('negotiat')) return BOT_RESPONSES.salary;
    if (l.includes('switch') || l.includes('change') || l.includes('career')) return BOT_RESPONSES.career;
    if (l.includes('skill') || l.includes('learn') || l.includes('course')) return BOT_RESPONSES.skills;
    if (l.includes('roadmap') || l.includes('path') || l.includes('plan')) return BOT_RESPONSES.roadmap;
    return BOT_RESPONSES.default;
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: now
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setShowQuick(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponseText = getBotResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1100 + Math.random() * 500);
  };

  const renderFormattedText = (txt: string) => {
    const paragraphs = txt.split('\n\n');
    return (
      <div className="space-y-2">
        {paragraphs.map((p, pIdx) => {
          const lines = p.split('\n');
          return (
            <div key={pIdx}>
              {lines.map((line, lIdx) => {
                // Parse bold **text**
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <div key={lIdx} className={line.startsWith('•') ? 'ml-2 text-xs sm:text-sm' : 'text-xs sm:text-sm'}>
                    {parts.map((part, partIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={partIdx} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                      }
                      return <span key={partIdx}>{part}</span>;
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[500]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[90vw] max-w-[370px] h-[520px] bg-gradient-to-b from-[#1a0d35] to-[#120926] border border-[#7C3AED]/40 rounded-3xl flex flex-col overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6)] animate-fade-in z-50">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#7C3AED]/30 to-[#FF6B00]/15 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] flex items-center justify-center text-lg flex-shrink-0 shadow-md">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-syne font-bold text-sm text-white truncate">Career AI Mentor</h4>
              <p className="text-xs text-[#10B981] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Online · Ready to help
              </p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#8892B0] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-tr from-[#FF6B00] to-[#FF8C35]' 
                    : 'bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00]'
                }`}>
                  {msg.sender === 'user' ? '👤' : '🤖'}
                </div>
                <div>
                  <div className={`p-3 text-xs sm:text-sm leading-relaxed rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] text-white rounded-tr-sm shadow-md'
                      : 'bg-white/10 text-[#E2E8FF] rounded-tl-sm border border-white/5'
                  }`}>
                    {renderFormattedText(msg.text)}
                  </div>
                  <div className={`text-[10px] text-[#8892B0] mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] items-end">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] flex items-center justify-center text-xs">
                  🤖
                </div>
                <div className="p-3 bg-white/10 rounded-2xl rounded-tl-sm border border-white/5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#00C9B1] animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuick && (
            <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
              {['Resume tips', 'Interview prep', 'Salary guide', 'Career switch'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="text-xs px-2.5 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#9D5FFF] hover:bg-[#7C3AED]/40 hover:text-white transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input Row */}
          <div className="p-3 bg-black/20 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Ask anything about your career..."
              className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-[#8892B0] focus:border-[#7C3AED] focus:outline-none transition-all"
            />
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] text-white flex items-center justify-center text-sm hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0 shadow-md"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] text-white flex items-center justify-center text-2xl shadow-[0_8px_32px_rgba(124,58,237,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 animate-chat-glow cursor-pointer"
        title="Chat with AI Career Mentor"
      >
        💬
      </button>
    </div>
  );
};
