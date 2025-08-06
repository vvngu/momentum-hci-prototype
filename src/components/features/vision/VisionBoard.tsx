import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { VisionBoard as VisionBoardType } from '@/types/vision.types';

interface VisionBoardProps {
  board: VisionBoardType;
}

export const VisionBoard: React.FC<VisionBoardProps> = ({ board }) => {
  return (
    <motion.div 
      className="bg-gray-50 rounded-xl p-4 mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="mb-3 text-gray-800 font-medium">
        {board.emoji} {board.title}
      </h4>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        {board.images.map((image, index) => (
          <motion.div
            key={image.id}
            className="aspect-square bg-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-400 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <span className="text-xl">{image.emoji}</span>
            <span className="text-xs mt-1">{image.label}</span>
          </motion.div>
        ))}
        
        <motion.div 
          className="aspect-square bg-primary-500 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer hover:bg-primary-600 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          <span className="text-xs mt-1">Add</span>
        </motion.div>
      </div>
      
      <div className="text-sm text-gray-600 italic text-center mt-2">
        "{board.statement}"
      </div>
    </motion.div>
  );
};