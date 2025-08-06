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
    // Only dashboard and vision are implemented for prototype
    return ['dashboard', 'vision'].includes(tab);
  }, []);

  return {
    activeTab,
    navigateTo,
    canNavigateTo
  };
};