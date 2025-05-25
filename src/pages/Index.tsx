
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AppLayout } from '@/components/layout/AppLayout';
import { ClientDashboard } from '@/components/client/ClientDashboard';
import { PortfolioSection } from '@/components/client/PortfolioSection';
import { DocumentsSection } from '@/components/client/DocumentsSection';
import { ProposalsSection } from '@/components/client/ProposalsSection';
import { ChatSection } from '@/components/client/ChatSection';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ClientsSection } from '@/components/admin/ClientsSection';
import { useNavigation } from '@/hooks/useNavigation';

const Index = () => {
  const { user, profile, isLoading } = useAuth();
  const { activeSection } = useNavigation();
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
            <span className="text-2xl font-bold text-white">EB</span>
          </div>
          <div className="text-slate-700 font-medium text-lg">Caricamento...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isLoginMode ? (
            <LoginForm onToggleMode={() => setIsLoginMode(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLoginMode(true)} />
          )}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    const userRole = profile?.role || (user?.email === 'admin@ebridge.ee' ? 'admin' : 'client');

    if (userRole === 'admin') {
      switch (activeSection) {
        case 'clients':
          return <ClientsSection />;
        case 'proposals':
          return <ProposalsSection />;
        case 'documents':
          return <DocumentsSection />;
        case 'settings':
          return <div className="text-center py-8 text-slate-600">Sezione Impostazioni in sviluppo</div>;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (activeSection) {
        case 'portfolio':
          return <PortfolioSection />;
        case 'documents':
          return <DocumentsSection />;
        case 'proposals':
          return <ProposalsSection />;
        case 'chat':
          return <ChatSection />;
        default:
          return <ClientDashboard />;
      }
    }
  };

  return (
    <AppLayout>
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
