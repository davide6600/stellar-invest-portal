
import { useState } from 'react';

export type NavigationSection = 
  | 'dashboard' 
  | 'portfolio' 
  | 'documents' 
  | 'proposals' 
  | 'chat'
  | 'clients'
  | 'settings';

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState<NavigationSection>('dashboard');

  const navigateTo = (section: NavigationSection) => {
    console.log('Navigating to:', section);
    setActiveSection(section);
  };

  return {
    activeSection,
    navigateTo
  };
};
