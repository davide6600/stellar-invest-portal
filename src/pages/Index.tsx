
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AppLayout } from '@/components/layout/AppLayout';
import { ClientDashboard } from '@/components/client/ClientDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

const Index = () => {
  const { user, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl font-bold text-white">EB</span>
          </div>
          <div className="text-brand-navy font-medium">Caricamento...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
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

  return (
    <AppLayout>
      {user.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />}
    </AppLayout>
  );
};

export default Index;
