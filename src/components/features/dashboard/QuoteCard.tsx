import React from 'react';
import { motion } from 'framer-motion';
import type { Quote } from '@/types/ui.types';

interface QuoteCardProps {
  quote: Quote;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-yellow-200 to-orange-300 p-4 rounded-xl mb-5 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="italic text-base mb-2">"{quote.text}"</div>
      <div className="text-xs text-gray-600">- {quote.author}</div>
    </motion.div>
  );
};