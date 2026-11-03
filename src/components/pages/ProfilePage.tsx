import React, { useState } from 'react';
import { User } from '../../types';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (updated: Partial<User>) => void;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onLogout,
  onShowToast,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [track, setTrack] = useState(user.track);

  const [emailNotifs, setEmailNotifs] = useState(user.settings.emailNotifications);
  const [jobAlerts, setJobAlerts] = useState(user.settings.jobAlerts);
  const [darkMode, setDarkMode] = useState(user.settings.darkMode);

  const handleSaveProfile = () => {
    onUpdateUser({
      name,
      track,
      avatarLetter: name.trim().charAt(0).toUpperCase() || 'A',
      settings: {
        emailNotifications: emailNotifs,
        jobAlerts,
        darkMode
      }
    });
    setIsEditing(false);
    onShowToast('Profile updated successfully!');
  };

  const handleToggle = (key: 'email' | 'jobs' | 'dark') => {
    if (key === 'email') {
      setEmailNotifs(!emailNotifs);
      onShowToast(`Email notifications ${!emailNotifs ? 'enabled' : 'disabled'}`);
    } else if (key === 'jobs') {
      setJobAlerts(!jobAlerts);
      onShowToast(`Job alerts ${!jobAlerts ? 'enabled' : 'disabled'}`);
    } else {
      setDarkMode(!darkMode);
      onShowToast(`Dark mode ${!darkMode ? 'enabled' : 'disabled'}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          My Profile
        </h2>
        <p className="text-[#8892B0] text-sm">
          Manage your account preferences, credentials, and notification settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* User Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center flex flex-col justify-between">
          <div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#FF6B00] flex items-center justify-center font-syne font-extrabold text-3xl text-white mx-auto mb-4 shadow-xl">
              {user.avatarLetter}
            </div>

            {isEditing ? (
              <div className="space-y-3 mb-6 text-left">
                <div>
                  <label className="text-xs text-[#8892B0] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#8892B0] block mb-1">Career Track</label>
                  <input
                    type="text"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-syne font-extrabold text-xl text-white mb-1">
                  {user.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#8892B0] mb-6">
                  {user.track}
                </p>
              </>
            )}

            {/* Stats row */}
            <div className="flex justify-center items-center gap-6 py-4 border-y border-white/10 mb-6">
              <div className="text-center">
                <div className="font-syne font-extrabold text-xl text-white">{user.profileStrength}%</div>
                <div className="text-xs text-[#8892B0]">Profile</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center">
                <div className="font-syne font-extrabold text-xl text-white">{user.skillsCount}</div>
                <div className="text-xs text-[#8892B0]">Skills</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center">
                <div className="font-syne font-extrabold text-xl text-white">{user.certsCount}</div>
                <div className="text-xs text-[#8892B0]">Certs</div>
              </div>
            </div>
          </div>

          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white text-xs font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="font-syne font-bold text-base text-white flex items-center gap-2">
                <span>⚙️</span> Settings &amp; Preferences
              </h3>
            </div>

            <div className="space-y-4 mb-6">
              {/* Email Notifications Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs sm:text-sm text-white font-medium">Email Notifications</span>
                <button
                  type="button"
                  onClick={() => handleToggle('email')}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    emailNotifs ? 'bg-[#7C3AED]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      emailNotifs ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Job Alerts Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs sm:text-sm text-white font-medium">Job Alerts</span>
                <button
                  type="button"
                  onClick={() => handleToggle('jobs')}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    jobAlerts ? 'bg-[#7C3AED]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      jobAlerts ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs sm:text-sm text-white font-medium">Dark Mode</span>
                <button
                  type="button"
                  onClick={() => handleToggle('dark')}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    darkMode ? 'bg-[#7C3AED]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      darkMode ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-3 rounded-xl bg-[#FF4B8B]/10 border border-[#FF4B8B]/30 hover:bg-[#FF4B8B]/20 text-[#FF4B8B] font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
