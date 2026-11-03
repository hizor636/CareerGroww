import React, { useState } from 'react';
import { NotificationItem } from '../../types';
import { NOTIFICATIONS } from '../../data/mockData';

interface NotificationsPageProps {
  onShowToast: (msg: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onShowToast }) => {
  const [notifs, setNotifs] = useState<NotificationItem[]>(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    onShowToast('All notifications marked as read');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
            Notifications
          </h2>
          <p className="text-[#8892B0] text-sm">
            Updates on your learning path, mentor appointments, and high-match job openings.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-[#9D5FFF] hover:text-[#FF6B00] transition cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 divide-y divide-white/10">
        {notifs.map((item) => (
          <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
              style={{ background: item.bg }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                <span className="text-[11px] text-[#8892B0] whitespace-nowrap">{item.time}</span>
              </div>
              <p className="text-xs text-[#8892B0] mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
