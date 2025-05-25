
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Bitcoin, TrendingUp, Calendar, DollarSign } from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  type: 'buy' | 'sell';
  asset: 'BTC' | 'STRF' | 'STRK';
  amount: number;
  price: number;
  totalValue: number;
  deadline: string;
  status: 'pending' | 'accepted' | 'rejected';
  description: string;
}

export const ProposalsSection: React.FC = () => {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<'accept' | 'reject'>('accept');
  const [confirmationChecked, setConfirmationChecked] = useState(false);

  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'Acquisto Bitcoin',
      type: 'buy',
      asset: 'BTC',
      amount: 0.5,
      price: 42000,
      totalValue: 21000,
      deadline: '25 Gen 2024',
      status: 'pending',
      description: 'Proposta di acquisto di 0.5 BTC al prezzo di mercato attuale. Ottima opportunità considerando il trend positivo.'
    },
    {
      id: '2',
      title: 'Investimento STRF',
      type: 'buy',
      asset: 'STRF',
      amount: 100,
      price: 50,
      totalValue: 5000,
      deadline: '28 Gen 2024',
      status: 'pending',
      description: 'Acquisto di azioni privilegiate STRF con dividend yield del 5.5% annuo.'
    },
    {
      id: '3',
      title: 'Vendita STRK',
      type: 'sell',
      asset: 'STRK',
      amount: 25,
      price: 48,
      totalValue: 1200,
      deadline: '22 Gen 2024',
      status: 'accepted',
      description: 'Vendita di azioni STRK per ottimizzazione del portafoglio.'
    }
  ];

  const handleProposalAction = (proposal: Proposal, action: 'accept' | 'reject') => {
    setSelectedProposal(proposal);
    setActionType(action);
    setShowConfirmDialog(true);
    setConfirmationChecked(false);
  };

  const handleConfirm = () => {
    if (confirmationChecked && selectedProposal) {
      console.log(`${actionType} proposal ${selectedProposal.id}`);
      setShowConfirmDialog(false);
      setSelectedProposal(null);
    }
  };

  const getAssetIcon = (asset: string) => {
    switch (asset) {
      case 'BTC':
        return <Bitcoin className="w-5 h-5 text-orange-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">In attesa</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">Accettata</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rifiutata</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800">Sconosciuto</Badge>;
    }
  };

  const pendingProposals = proposals.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Proposte di Investimento</h1>
        <p className="text-slate-200">Esamina e gestisci le proposte di investimento</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
            <span className="text-yellow-300 font-medium">{pendingProposals} proposte in attesa</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {getAssetIcon(proposal.asset)}
                  <div>
                    <CardTitle className="text-lg text-slate-800">{proposal.title}</CardTitle>
                    <CardDescription className="text-slate-600">
                      {proposal.type === 'buy' ? 'Acquisto' : 'Vendita'} • {proposal.asset}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(proposal.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">{proposal.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Quantità</div>
                    <div className="font-medium text-slate-800">
                      {proposal.asset === 'BTC' ? `₿ ${proposal.amount}` : `${proposal.amount} azioni`}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Prezzo</div>
                    <div className="font-medium text-slate-800">€{proposal.price.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Valore Totale</div>
                    <div className="font-medium text-slate-800">€{proposal.totalValue.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="text-sm text-slate-600">Scadenza</div>
                    <div className="font-medium text-slate-800">{proposal.deadline}</div>
                  </div>
                </div>
              </div>

              {proposal.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleProposalAction(proposal, 'accept')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Accetta Proposta
                  </Button>
                  <Button
                    onClick={() => handleProposalAction(proposal, 'reject')}
                    variant="outline"
                    className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Rifiuta
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'accept' ? 'Conferma Accettazione' : 'Conferma Rifiuto'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'accept' 
                ? 'Sei sicuro di voler accettare questa proposta di investimento?'
                : 'Sei sicuro di voler rifiutare questa proposta di investimento?'
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="py-4">
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <div className="font-medium text-slate-800">{selectedProposal.title}</div>
                <div className="text-sm text-slate-600">
                  {selectedProposal.type === 'buy' ? 'Acquisto' : 'Vendita'} di{' '}
                  {selectedProposal.asset === 'BTC' 
                    ? `₿ ${selectedProposal.amount}` 
                    : `${selectedProposal.amount} azioni ${selectedProposal.asset}`
                  }
                </div>
                <div className="text-sm text-slate-600">
                  Valore totale: €{selectedProposal.totalValue.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {actionType === 'accept' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmation"
                checked={confirmationChecked}
                onCheckedChange={(checked) => setConfirmationChecked(checked as boolean)}
              />
              <label
                htmlFor="confirmation"
                className="text-sm text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Confermo in piena consapevolezza di voler procedere con questa operazione
              </label>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-slate-300"
            >
              Annulla
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={actionType === 'accept' && !confirmationChecked}
              className={actionType === 'accept' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
              }
            >
              {actionType === 'accept' ? 'Conferma Accettazione' : 'Conferma Rifiuto'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
