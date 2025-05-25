
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { TrendingUp, Clock, Check, X, AlertCircle, Bitcoin } from 'lucide-react';

export const ProposalsSection: React.FC = () => {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const proposals = [
    {
      id: '1',
      title: 'Acquisto 0.5 BTC',
      type: 'Bitcoin',
      amount: 0.5,
      price: 21000,
      totalValue: 21000,
      status: 'pending',
      validUntil: '30 Gen 2024',
      description: 'Proposta di acquisto Bitcoin al prezzo corrente di mercato',
      icon: Bitcoin,
      color: 'text-orange-600'
    },
    {
      id: '2', 
      title: 'Acquisto 100 STRF',
      type: 'STRF Shares',
      amount: 100,
      price: 50,
      totalValue: 5000,
      status: 'pending',
      validUntil: '2 Feb 2024',
      description: 'Investimento in azioni privilegiate STRF con dividendo garantito',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: '3',
      title: 'Vendita 0.2 BTC',
      type: 'Bitcoin',
      amount: 0.2,
      price: 42500,
      totalValue: 8500,
      status: 'accepted',
      validUntil: '15 Gen 2024',
      description: 'Vendita parziale Bitcoin per realizzare profitti',
      icon: Bitcoin,
      color: 'text-orange-600'
    }
  ];

  const handleAccept = (proposalId: string) => {
    if (!confirmationChecked) return;
    console.log('Accepting proposal:', proposalId);
    setIsDialogOpen(false);
    setConfirmationChecked(false);
    setSelectedProposal(null);
  };

  const handleReject = (proposalId: string) => {
    console.log('Rejecting proposal:', proposalId);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'accepted':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const pendingProposals = proposals.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Proposte di Investimento</h1>
        <p className="text-slate-200">Gestisci le tue opportunità di investimento</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-200">{pendingProposals} proposte in attesa</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => {
          const Icon = proposal.icon;
          return (
            <Card key={proposal.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className={`text-lg ${proposal.color} flex items-center gap-3`}>
                  <Icon className="w-6 h-6" />
                  {proposal.title}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {proposal.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  {getStatusBadge(proposal.status)}
                  {getStatusIcon(proposal.status)}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Quantità:</span>
                    <span className="font-medium text-slate-800">
                      {proposal.type === 'Bitcoin' ? `₿ ${proposal.amount}` : `${proposal.amount} azioni`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Prezzo unitario:</span>
                    <span className="font-medium text-slate-800">€{proposal.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Valore totale:</span>
                    <span className="font-bold text-slate-800">€{proposal.totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Valida fino al:</span>
                    <span className="font-medium text-slate-800">{proposal.validUntil}</span>
                  </div>
                </div>

                {proposal.status === 'pending' && (
                  <div className="flex gap-2 pt-2">
                    <Dialog open={isDialogOpen && selectedProposal === proposal.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedProposal(proposal.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accetta
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Conferma Proposta</DialogTitle>
                          <DialogDescription>
                            Stai per accettare la seguente proposta di investimento:
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <h3 className="font-medium text-slate-800">{proposal.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{proposal.description}</p>
                            <div className="mt-3 space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Valore totale:</span>
                                <span className="font-bold">€{proposal.totalValue.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
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
                              Confermo di aver letto e compreso i termini dell'investimento in piena consapevolezza
                            </label>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setIsDialogOpen(false);
                                setConfirmationChecked(false);
                                setSelectedProposal(null);
                              }}
                              className="flex-1"
                            >
                              Annulla
                            </Button>
                            <Button
                              onClick={() => handleAccept(proposal.id)}
                              disabled={!confirmationChecked}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                              Conferma Investimento
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      onClick={() => handleReject(proposal.id)}
                      className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Rifiuta
                    </Button>
                  </div>
                )}

                {proposal.status === 'accepted' && (
                  <div className="pt-2">
                    <Button
                      disabled
                      className="w-full bg-green-100 text-green-800 cursor-not-allowed"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Proposta Accettata
                    </Button>
                  </div>
                )}

                {proposal.status === 'rejected' && (
                  <div className="pt-2">
                    <Button
                      disabled
                      variant="outline"
                      className="w-full border-red-300 text-red-700 cursor-not-allowed"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Proposta Rifiutata
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Cronologia Proposte</CardTitle>
          <CardDescription className="text-slate-600">
            Storico di tutte le proposte ricevute
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={`history-${proposal.id}`} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(proposal.status)}
                  <div>
                    <div className="font-medium text-slate-800">{proposal.title}</div>
                    <div className="text-sm text-slate-600">
                      Valore: €{proposal.totalValue.toLocaleString()} • Valida fino al {proposal.validUntil}
                    </div>
                  </div>
                </div>
                {getStatusBadge(proposal.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
