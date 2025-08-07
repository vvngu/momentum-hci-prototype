import React from 'react';
import type { Habit } from '@/types';

interface CalendarProps {
  habits: Habit[];
}

export const Calendar: React.FC<CalendarProps> = ({ habits }) => {
  // Hardcoded calendar data
  const monthName = "July 2025";
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const firstDayOfWeek = 2;
  const daysInMonth = 31;
  const calendarGrid = [];
  
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarGrid.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day);
  }

  const completedDays = [1, 2, 4, 6, 7, 8, 11, 12, 14, 18, 19, 22, 23, 24, 26];
  const partialDays = [15, 16, 17, 25];
  const currentDay = 27; 

  return (
    <div className="h-full overflow-y-auto p-5 pb-32">
      <div className="text-center mb-5 text-sm font-bold text-primary-500 uppercase tracking-wide">
        Habit Calendar
      </div>
      
      {/* Month Header */}
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 text-2xl">‹</button>
        <h2 className="text-lg font-bold text-gray-800">{monthName}</h2>
        <button className="text-gray-500 text-2xl">›</button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {calendarGrid.map((day, index) => {
          if (day === null) {
            return <div key={index} className="aspect-square"></div>;
          }
          
          const isToday = day === currentDay;
          const isCompleted = completedDays.includes(day);
          const isPartial = partialDays.includes(day);
          
          return (
            <div key={day} className="aspect-square relative">
              <div className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium border ${
                isToday ? 'border-primary-500 border-2 bg-primary-50 text-primary-600' : 
                isCompleted ? 'border-green-200 bg-green-100 text-green-700' :
                isPartial ? 'border-yellow-200 bg-yellow-100 text-yellow-700' : 
                'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}>
                {day}
                {isCompleted && !isToday && (
                  <div className="absolute top-1 right-1 text-green-500 text-xs">✓</div>
                )}
                {isToday && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-500 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <h3 className="font-semibold mb-3 text-gray-800">Legend</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
            <span className="text-xs">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary-50 border-2 border-primary-500 rounded mr-2"></div>
            <span className="text-xs">Today</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-yellow-200 bg-yellow-100 text-yellow-700 rounded mr-2"></div>
            <span className="text-xs">Partial</span>
          </div>
        </div>
      </div>

      {/* Current Streaks - Use actual habit data */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold mb-3 text-gray-800">Current Streaks</h3>
        {habits.map(habit => (
          <div key={habit.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
            <span className="text-sm">{habit.emoji} {habit.name}</span>
            <span className="text-sm font-medium text-primary-500">{habit.streak} days</span>
          </div>
        ))}
      </div>
    </div>
  );
};