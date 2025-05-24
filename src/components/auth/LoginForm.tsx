
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Accesso effettuato",
        description: "Benvenuto in E-Bridge Capital!",
      });
    } else {
      toast({
        title: "Errore di accesso",
        description: "Credenziali non valide. Prova: cliente@ebridge.ee / admin@ebridge.ee con password 'demo123'",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-brand-dark">EB</span>
        </div>
        <CardTitle className="text-2xl text-brand-navy">E-Bridge Capital</CardTitle>
        <CardDescription>
          Accedi al tuo portafoglio di investimenti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tua@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-brand-navy hover:bg-brand-dark"
            disabled={isLoading}
          >
            {isLoading ? 'Accesso...' : 'Accedi'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Non hai un account?{' '}
            <button 
              onClick={onToggleMode}
              className="text-brand-navy hover:text-brand-dark font-medium"
            >
              Registrati
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-brand-light rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Demo:</strong><br />
            Cliente: cliente@ebridge.ee<br />
            Admin: admin@ebridge.ee<br />
            Password: demo123
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
