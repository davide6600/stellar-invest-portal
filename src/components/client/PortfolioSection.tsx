
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const assets = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.85,
      value: 35700,
      change: 2.5,
      color: 'text-orange-600'
    },
    {
      name: 'STRF Shares',
      symbol: 'STRF',
      amount: 150,
      value: 7500,
      change: -1.2,
      color: 'text-blue-600'
    },
    {
      name: 'STRK Shares',
      symbol: 'STRK',
      amount: 75,
      value: 3750,
      change: 0.8,
      color: 'text-purple-600'
    }
  ];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Il Tuo Portafoglio</h1>
        <div className="text-3xl font-bold">€{totalValue.toLocaleString()}</div>
        <div className="text-green-400 text-sm mt-2 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          +2.3% questo mese
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Card key={asset.symbol} className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className={`text-lg ${asset.color} flex items-center gap-2`}>
                <span className={`w-3 h-3 rounded-full bg-current`}></span>
                {asset.name}
              </CardTitle>
              <CardDescription className="text-slate-600">{asset.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 mb-2">
                {asset.symbol === 'BTC' ? `₿ ${asset.amount}` : `${asset.amount} azioni`}
              </div>
              <div className="text-lg font-medium text-slate-700 mb-2">
                €{asset.value.toLocaleString()}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                asset.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {asset.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {asset.change > 0 ? '+' : ''}{asset.change}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Performance Storica</CardTitle>
          <CardDescription className="text-slate-600">Andamento negli ultimi 6 mesi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-slate-200 rounded-lg">
              <div>
                <div className="font-medium text-slate-800">Gennaio 2024</div>
                <div className="text-sm text-slate-600">€42,150</div>
              </div>
              <Badge className="bg-green-100 text-green-800">+5.2%</Badge>
            </div>
            <div className="flex justify-between items-center p-4 border border-slate-200 rounded-lg">
              <div>
                <div className="font-medium text-slate-800">Dicembre 2023</div>
                <div className="text-sm text-slate-600">€40,100</div>
              </div>
              <Badge className="bg-red-100 text-red-800">-2.1%</Badge>
            </div>
            <div className="flex justify-between items-center p-4 border border-slate-200 rounded-lg">
              <div>
                <div className="font-medium text-slate-800">Novembre 2023</div>
                <div className="text-sm text-slate-600">€41,000</div>
              </div>
              <Badge className="bg-green-100 text-green-800">+8.7%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
