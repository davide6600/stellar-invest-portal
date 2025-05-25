
import { useState, createContext, useContext, ReactNode } from 'react';

export type NavigationSection = 
  | 'dashboard' 
  | 'portfolio' 
  | 'documents' 
  | 'proposals' 
  | 'chat'
  | 'clients'
  | 'settings';

interface NavigationContextType {
  activeSection: NavigationSection;
  navigateTo: (section: NavigationSection) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<NavigationSection>('dashboard');

  const navigateTo = (section: NavigationSection) => {
    console.log('Navigating to:', section);
    setActiveSection(section);
  };

  return (
    <NavigationContext.Provider value={{ activeSection, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
