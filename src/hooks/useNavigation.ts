import { useState, useCallback } from 'react';
import type { NavigationTab } from '@/types/ui.types';

export const useNavigation = (initialTab: NavigationTab = 'dashboard') => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(initialTab);

  const navigateTo = useCallback((tab: NavigationTab) => {
    // Track navigation for HCI research
    console.log('Navigation:', { from: activeTab, to: tab, timestamp: new Date().toISOString() });
    
    setActiveTab(tab);
  }, [activeTab]);

  const canNavigateTo = useCallback((tab: NavigationTab) => {
    return ['dashboard', 'vision', 'calendar', 'insights','settings'].includes(tab);
  }, []);

  return {
    activeTab,
    navigateTo,
    canNavigateTo
  };
};