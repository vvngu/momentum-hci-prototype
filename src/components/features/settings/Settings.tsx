import React, { useState } from 'react';
import type { Habit } from '@/types';

interface SettingsProps {
  habits: Habit[];
}

export const Settings: React.FC<SettingsProps> = ({ habits }) => {
  // demo toggles
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dailyGoal, setDailyGoal] = useState('3');
  const [streaks, setStreaks] = useState(false);
  const [animations, setAnimations] = useState(false);

  const SettingRow = ({ 
    label, 
    children 
  }: { 
    label: string; 
    children: React.ReactNode 
  }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div>{children}</div>
    </div>
  );

  const Toggle = ({ 
    enabled, 
    onChange 
  }: { 
    enabled: boolean; 
    onChange: (value: boolean) => void 
  }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${
        enabled ? 'bg-primary-500' : 'bg-gray-300'
      }`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-0'
      }`} />
    </button>
  );

  return (
    <div className="h-full overflow-y-auto p-5 pb-32">
      <div className="text-center mb-5 text-sm font-bold text-primary-500 uppercase tracking-wide">
        Settings
      </div>

      {/* Profile Section */}
      <div className="bg-gray-100  rounded-xl p-4 mb-6 border">
        <h3 className="font-semibold text-gray-800 mb-4">Profile</h3>
        
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">👤</span>
          </div>
          <h4 className="font-semibold text-gray-800">@UserName</h4>
          <p className="text-sm text-gray-500">Habit Tracker User</p>
        </div>

        <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
          Edit Profile
        </button>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-xl p-4 mb-6 border">
        <h3 className="font-semibold text-gray-800 mb-4">Appearance</h3>
        
        <SettingRow label="Dark Mode">
        <div className="ml-2">
          <Toggle enabled={darkMode} onChange={setDarkMode} />
        </div>
        </SettingRow>
        
        <SettingRow label="Theme Color">
          <div className="flex space-x-2 justify-around ml-2 ">
            <div className="w-6 h-6 bg-primary-500 rounded-full border-2 border-primary-600"></div>
            <div className="w-6 h-6 bg-green-500 rounded-full border border-gray-200"></div>
            <div className="w-6 h-6 bg-pink-500  rounded-full border border-gray-200"></div>
          </div>
        </SettingRow>
      </div>

      {/* Habits */}
      <div className="bg-white rounded-xl p-4 mb-6 border">
        <h3 className="font-semibold text-gray-800 mb-4">Habits</h3>
        
        <SettingRow label="Daily Goal">
          <select 
            value={dailyGoal}
            onChange={(e) => setDailyGoal(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-s ml-2"
          >
            <option value="1">1 habit</option>
            <option value="2">2 habits</option>
            <option value="3">3 habits</option>
            <option value="5">5 habits</option>
          </select>
        </SettingRow>

        <SettingRow label="Show Streaks">
        <div className="ml-2">
          <Toggle enabled={streaks} onChange={setStreaks} />
        </div>
        </SettingRow>

        <SettingRow label="Progress Animations">
        <div className="ml-2">
          <Toggle enabled={animations} onChange={setAnimations} />
        </div>
        </SettingRow>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-4 mb-6 border">
        <h3 className="font-semibold text-gray-800 mb-4">Notifications</h3>
        
        <SettingRow label="Daily Reminders">
        <div className="ml-2">
          <Toggle enabled={notifications} onChange={setNotifications} />
        </div>
        </SettingRow>

        {notifications && (
          <>
            <SettingRow label="Reminder Time">
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm ml-2">
                <option>9:00 AM</option>
                <option>12:00 PM</option>
                <option>6:00 PM</option>
                <option>8:00 PM</option>
              </select>
            </SettingRow>

            <SettingRow label="Notification Style">
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm">
                <option>Gentle</option>
                <option>Persistent</option>
                <option>Motivational</option>
              </select>
            </SettingRow>
          </>
        )}

        {/* Mock notification preview */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <div className="text-xs text-gray-500 mb-2">Preview:</div>
          <div className="flex items-center text-sm">
            <span className="text-lg mr-2 p-2"> 🔔 </span>
            <span className= "ml-2">  Time to complete your habits! 💪</span>
          </div>
        </div>
      </div>
      </div>
  );
};