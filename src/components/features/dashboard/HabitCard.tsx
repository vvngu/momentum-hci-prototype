import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Habit } from '@/types/habit.types';

interface HabitCardProps {
  habit: Habit;
  onComplete: (habitId: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onComplete }) => {
  const handleComplete = () => {
    if (!habit.completedToday) {
      onComplete(habit.id);
    }
  };

  return (
    <motion.div 
      className="bg-gray-100 rounded-xl p-4 mb-3 border-l-4 border-green-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-base">
          {habit.emoji} {habit.name}
        </div>
        <div className="text-xs text-primary-500 ml-4">
          {habit.streak} day streak
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        Goal: {habit.goal}
      </div>
      
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-3">
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-emerald-400 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${habit.progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <motion.button
        onClick={handleComplete}
        disabled={habit.completedToday}
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          habit.completedToday 
            ? 'bg-gray-500 text-white cursor-default' 
            : 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md'
        }`}
        whileTap={habit.completedToday ? {} : { scale: 0.95 }}
        whileHover={habit.completedToday ? {} : { y: -1 }}
      >
        {habit.completedToday ? (
          <>
            <Check size={16} className="inline mr-2" />
            Completed Today
          </>
        ) : (
          'Mark Complete'
        )}
      </motion.button>
    </motion.div>
  );
};