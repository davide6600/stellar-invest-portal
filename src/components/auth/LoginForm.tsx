
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Errore di accesso",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Accesso effettuato",
          description: "Benvenuto in E-Bridge Capital!",
        });
      }
    } catch (error) {
      toast({
        title: "Errore di accesso",
        description: "Si è verificato un errore imprevisto",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        toast({
          title: "Errore",
          description: "Errore durante il login con Google",
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

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-2xl border-0 rounded-xl overflow-hidden">
      <CardHeader className="text-center pb-6 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <span className="text-2xl font-bold text-white">EB</span>
        </div>
        <CardTitle className="text-2xl text-slate-800 font-semibold">E-Bridge Capital</CardTitle>
        <CardDescription className="text-slate-600 text-base">
          Accedi al tuo portafoglio di investimenti
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        <Button 
          onClick={handleGoogleLogin}
          variant="outline" 
          className="w-full h-12 border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continua con Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-500 font-medium">oppure</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tua@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border-slate-300 focus:border-slate-600 focus:ring-slate-600 bg-white text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-slate-300 focus:border-slate-600 focus:ring-slate-600 bg-white text-slate-800"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all duration-200 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Accesso...' : 'Accedi'}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-slate-600">
            Non hai un account?{' '}
            <button 
              onClick={onToggleMode}
              className="text-slate-800 hover:text-slate-600 font-semibold hover:underline transition-colors"
            >
              Registrati
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-600 text-center mb-2">
            <strong>Account Demo:</strong>
          </p>
          <div className="space-y-1 text-xs text-slate-600">
            <p><strong>Amministratore:</strong> admin@ebridge.ee</p>
            <p><strong>Cliente:</strong> cliente@ebridge.ee</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
