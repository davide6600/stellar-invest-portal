
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigation, NavigationSection } from '@/hooks/useNavigation';
import { LayoutDashboard, Wallet, FileText, TrendingUp, MessageCircle, Users, Settings } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const { activeSection, navigateTo } = useNavigation();

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

  const userRole = profile?.role || (user?.email === 'admin@ebridge.ee' ? 'admin' : 'client');

  const clientMenuItems = [
    { key: 'dashboard' as NavigationSection, label: 'Dashboard', icon: LayoutDashboard },
    { key: 'portfolio' as NavigationSection, label: 'Portafoglio', icon: Wallet },
    { key: 'documents' as NavigationSection, label: 'Documenti', icon: FileText },
    { key: 'proposals' as NavigationSection, label: 'Proposte', icon: TrendingUp },
    { key: 'chat' as NavigationSection, label: 'Chat', icon: MessageCircle }
  ];

  const adminMenuItems = [
    { key: 'dashboard' as NavigationSection, label: 'Dashboard', icon: LayoutDashboard },
    { key: 'clients' as NavigationSection, label: 'Clienti', icon: Users },
    { key: 'proposals' as NavigationSection, label: 'Proposte', icon: TrendingUp },
    { key: 'documents' as NavigationSection, label: 'Documenti', icon: FileText },
    { key: 'settings' as NavigationSection, label: 'Impostazioni', icon: Settings }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : clientMenuItems;

  const handleMenuClick = (section: NavigationSection) => {
    console.log('Menu clicked:', section);
    navigateTo(section);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">EB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">E-Bridge Capital</h1>
                <p className="text-sm text-slate-600">Investment Management</p>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.key;
                return (
                  <Button 
                    key={item.key} 
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleMenuClick(item.key)}
                    className={`text-slate-700 hover:bg-slate-100 hover:text-slate-800 transition-colors ${
                      isActive 
                        ? 'bg-slate-800 text-white hover:bg-slate-700 hover:text-white' 
                        : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium text-slate-800">
                {profile?.full_name || user?.user_metadata?.full_name || user?.email}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={userRole === 'admin' ? 'default' : 'secondary'} className="bg-slate-800 text-white">
                  {userRole === 'admin' ? 'Amministratore' : 'Cliente'}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-800"
            >
              Esci
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 flex flex-wrap gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.key;
            return (
              <Button 
                key={item.key} 
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleMenuClick(item.key)}
                className={`text-slate-700 hover:bg-slate-100 hover:text-slate-800 ${
                  isActive 
                    ? 'bg-slate-800 text-white hover:bg-slate-700 hover:text-white' 
                    : ''
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="font-bold text-slate-800">EB</span>
                </div>
                <span className="text-lg font-bold">E-Bridge Capital</span>
              </div>
              <p className="text-slate-300 text-sm">
                Specializzati in investimenti Bitcoin e azioni privilegiate STRF/STRK
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contatti</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>info@ebridge.ee</p>
                <p>+372 123 4567</p>
                <p>Tallinn, Estonia</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>Licenza OÜ Estonia</p>
                <p>Registrazione: 12345678</p>
                <p>Autorizzazione FIU</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
            © 2024 E-Bridge Capital OÜ. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
};
