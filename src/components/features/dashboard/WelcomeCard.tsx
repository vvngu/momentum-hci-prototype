import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeCardProps {
  totalStreak: number;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ totalStreak }) => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning!', emoji: '🌅' };
    if (hour < 17) return { text: 'Good Afternoon!', emoji: '☀️' };
    return { text: 'Good Evening!', emoji: '🌙' };
  };

  const greeting = getTimeBasedGreeting();

  return (
    <motion.div 
      className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-5 rounded-2xl mb-5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-lg font-bold mb-2">
        {greeting.text} {greeting.emoji}
      </div>
      <div className="text-sm opacity-90">
        You're doing great - {totalStreak} total streak days!
      </div>
    </motion.div>
  );
};