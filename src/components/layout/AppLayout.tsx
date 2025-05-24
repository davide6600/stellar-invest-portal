
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Errore",
          description: "Errore durante il logout",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore imprevisto",
        variant: "destructive",
      });
    }
  };

  // Determina il ruolo dall'email per gli account demo
  const userRole = user?.email === 'admin@ebridge.ee' ? 'admin' : 'client';

  const menuItems = userRole === 'admin' ? [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Clienti', href: '#clients' },
    { label: 'Proposte', href: '#proposals' },
    { label: 'Documenti', href: '#documents' },
    { label: 'Impostazioni', href: '#settings' }
  ] : [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Portafoglio', href: '#portfolio' },
    { label: 'Documenti', href: '#documents' },
    { label: 'Proposte', href: '#proposals' },
    { label: 'Chat', href: '#chat' }
  ];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">EB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-brand-navy">E-Bridge Capital</h1>
                <p className="text-sm text-muted-foreground">Investment Management</p>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <Button key={item.label} variant="ghost" className="text-brand-navy hover:bg-slate-100">
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium text-brand-navy">
                {user?.user_metadata?.full_name || user?.email}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={userRole === 'admin' ? 'default' : 'secondary'}>
                  {userRole === 'admin' ? 'Amministratore' : 'Cliente'}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy hover:text-white"
            >
              Esci
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy text-white py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="font-bold text-brand-dark">EB</span>
                </div>
                <span className="text-lg font-bold">E-Bridge Capital</span>
              </div>
              <p className="text-brand-light text-sm">
                Specializzati in investimenti Bitcoin e azioni privilegiate STRF/STRK
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contatti</h3>
              <div className="space-y-2 text-sm text-brand-light">
                <p>info@ebridge.ee</p>
                <p>+372 123 4567</p>
                <p>Tallinn, Estonia</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <div className="space-y-2 text-sm text-brand-light">
                <p>Licenza OÜ Estonia</p>
                <p>Registrazione: 12345678</p>
                <p>Autorizzazione FIU</p>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-gold/20 mt-8 pt-6 text-center text-sm text-brand-light">
            © 2024 E-Bridge Capital OÜ. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
};
