import React from 'react';
import { motion } from 'framer-motion';
import type { NavigationTab } from '@/types/ui.types';

interface NavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  canNavigateTo: (tab: NavigationTab) => boolean;
}

const tabs: { id: NavigationTab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'vision', label: 'Vision' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'insights', label: 'Insights' },
  { id: 'settings', label: 'Settings' },
];

export const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  canNavigateTo 
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex justify-around items-center">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const canNavigate = canNavigateTo(tab.id);
        
        return (
          <motion.div
            key={tab.id}
            onClick={() => canNavigate ? onTabChange(tab.id) : null}
            className={`flex flex-col items-center p-2 transition-all ${
              isActive ? 'text-primary-500' : 'text-gray-400'
            } ${canNavigate ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            whileTap={canNavigate ? { scale: 0.95 } : {}}
            whileHover={canNavigate ? { scale: 1.05 } : {}}
          >
            <motion.div 
              className={`w-6 h-6 mb-1 rounded-full ${
                isActive ? 'bg-primary-500' : 'bg-current'
              }`}
              animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="text-xs font-medium capitalize">{tab.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
};