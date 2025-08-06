import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PhoneFrameProps {
  children: ReactNode;
  title?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, title }) => {
  return (
    <div className="relative">
      {title && (
        <div className="absolute -top-12 left-0 right-0 text-center text-white text-sm font-semibold bg-black/30 rounded-lg px-4 py-2">
          {title}
        </div>
      )}
      <motion.div 
        className="w-80 h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
};