
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

export const ClientDashboard: React.FC = () => {
  const { user, profile } = useAuth();

  const portfolioValue = 45750;
  const bitcoinHoldings = 0.85;
  const strfShares = 150;
  const strkShares = 75;

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600 text-white';
      case 'pending': return 'bg-yellow-600 text-white';
      case 'rejected': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getKycStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approvato';
      case 'pending': return 'In attesa';
      case 'rejected': return 'Rifiutato';
      default: return 'Sconosciuto';
    }
  };

  // Get user display name from profile or user metadata
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Cliente';
  
  // Get KYC status from profile
  const kycStatus = profile?.kyc_status || 'pending';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Benvenuto, {displayName}</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-200">Status KYC:</span>
          <Badge className={getKycStatusColor(kycStatus)}>
            {getKycStatusText(kycStatus)}
          </Badge>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">Valore Portafoglio</CardTitle>
            <CardDescription className="text-slate-600">Totale investimenti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">
              €{portfolioValue.toLocaleString()}
            </div>
            <div className="text-green-600 text-sm mt-2">
              +2.3% questo mese
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
              Bitcoin
            </CardTitle>
            <CardDescription className="text-slate-600">Holdings BTC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">
              ₿ {bitcoinHoldings}
            </div>
            <div className="text-sm text-slate-600">
              ≈ €{(bitcoinHoldings * 42000).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">Azioni Privilegiate</CardTitle>
            <CardDescription className="text-slate-600">STRF & STRK</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-700">STRF</span>
                <span className="font-medium text-slate-800">{strfShares} azioni</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">STRK</span>
                <span className="font-medium text-slate-800">{strkShares} azioni</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Azioni Rapide</CardTitle>
          <CardDescription className="text-slate-600">Gestisci il tuo account e investimenti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 border-slate-300 hover:bg-slate-50">
              <div className="text-center">
                <div className="font-medium text-slate-800">Carica Documenti</div>
                <div className="text-sm text-slate-600">KYC e verifiche</div>
              </div>
            </Button>
            <Button variant="outline" className="h-16 border-slate-300 hover:bg-slate-50">
              <div className="text-center">
                <div className="font-medium text-slate-800">Proposte</div>
                <div className="text-sm text-slate-600">Nuove opportunità</div>
              </div>
            </Button>
            <Button variant="outline" className="h-16 border-slate-300 hover:bg-slate-50">
              <div className="text-center">
                <div className="font-medium text-slate-800">Chat Supporto</div>
                <div className="text-sm text-slate-600">Assistenza diretta</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Allocation */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Allocazione Portafoglio</CardTitle>
          <CardDescription className="text-slate-600">Distribuzione dei tuoi investimenti</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-700">Bitcoin (₿)</span>
              <span className="text-slate-700">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-700">STRF Shares</span>
              <span className="text-slate-700">25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-700">STRK Shares</span>
              <span className="text-slate-700">10%</span>
            </div>
            <Progress value={10} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Attività Recente</CardTitle>
          <CardDescription className="text-slate-600">Ultime transazioni e operazioni</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <div className="font-medium text-slate-800">Acquisto Bitcoin</div>
                <div className="text-sm text-slate-600">15 Gen 2024</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-800">+0.15 ₿</div>
                <div className="text-sm text-green-600">Completato</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <div className="font-medium text-slate-800">Acquisto STRF</div>
                <div className="text-sm text-slate-600">12 Gen 2024</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-800">+50 azioni</div>
                <div className="text-sm text-green-600">Completato</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
