import React from 'react';
import type { Habit } from '@/types';

interface InsightsProps {
  habits: Habit[];
}

export const Insights: React.FC<InsightsProps> = ({ habits }) => {
  // Hardcoded analytics for prototype
  const stats = {
    completionRate: 78,
    totalDays: 19,
    bestStreak: 12,
    averageStreak: 6
  };

  const weeklyData = [
    { day: 'Mon', rate: 85 },
    { day: 'Tue', rate: 92 },
    { day: 'Wed', rate: 78 },
    { day: 'Thu', rate: 95 },
    { day: 'Fri', rate: 88 },
    { day: 'Sat', rate: 70 },
    { day: 'Sun', rate: 82 }
  ];

  return (
    <div className="h-full overflow-y-auto p-5 pb-32">
      <div className="text-center mb-5 text-sm font-bold text-primary-500 uppercase tracking-wide ">
        Insights & Analytics
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 rounded-xl p-4 text-center border shine-effect relative overflow-hidden">
          <div className="text-3xl font-bold text-green-500 mb-1">{stats.completionRate}%</div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 text-center border shine-effect relative overflow-hidden">
          <div className="text-3xl font-bold text-blue-500 mb-1">{stats.totalDays}</div>
          <div className="text-sm text-gray-600">Total Days</div>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 text-center border shine-effect relative overflow-hidden">
          <div className="text-3xl font-bold text-purple-500 mb-1">{stats.bestStreak}</div>
          <div className="text-sm text-gray-600">Best Streak</div>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 text-center border shine-effect relative overflow-hidden">
          <div className="text-3xl font-bold text-orange-500 mb-1">{stats.averageStreak}</div>
          <div className="text-sm text-gray-600">Avg Streak</div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-xl p-4 mb-6 border">
        <h3 className="font-semibold text-gray-800 mb-4">This Week</h3>
        <div className="flex justify-between items-end h-24">
          {weeklyData.map(data => (
            <div key={data.day} className="flex flex-col items-center w-8">
              <div className="w-full bg-gray-200 rounded-full mb-2" style={{ height: '60px' }}>
                <div 
                  className="bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                  style={{ height: `${data.rate}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 mb-1">{data.day}</div>
              <div className="text-xs font-medium">{data.rate}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Habit Performance */}
      <div className="bg-white rounded-xl p-4 mb-6 border">
        <h3 className="font-semibold text-gray-800 mb-4">Performance</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">💧 Drink Water</span>
            <span className="text-sm font-medium text-green-600">Excellent</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">🏃‍♂️ Morning Run</span>
            <span className="text-sm font-medium text-green-600">Excellent</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">📚 Read</span>
            <span className="text-sm font-medium text-orange-600">Getting Started</span>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-white shine-effect relative overflow-hidden">
        <h3 className="font-semibold mb-2">💡 Insight</h3>
        <p className="text-sm opacity-90 text-center">
          You're maintaining great consistency! 
        <span className="italic font-semibold"> Your morning routine is especially strong.</span>
        </p>
      </div>
    </div>
  );
};