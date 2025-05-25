
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, MessageCircle, FileText, Eye } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  kycStatus: 'approved' | 'pending' | 'rejected';
  portfolioValue: number;
  lastActivity: string;
  documentsCount: number;
  unreadMessages: number;
}

export const ClientsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clients: Client[] = [
    {
      id: '1',
      name: 'Marco Rossi',
      email: 'marco.rossi@email.com',
      joinDate: '15 Gen 2024',
      kycStatus: 'approved',
      portfolioValue: 45750,
      lastActivity: '2 ore fa',
      documentsCount: 4,
      unreadMessages: 2
    },
    {
      id: '2',
      name: 'Laura Bianchi',
      email: 'laura.bianchi@email.com',
      joinDate: '18 Gen 2024',
      kycStatus: 'pending',
      portfolioValue: 23400,
      lastActivity: '1 giorno fa',
      documentsCount: 2,
      unreadMessages: 0
    },
    {
      id: '3',
      name: 'Giuseppe Verdi',
      email: 'giuseppe.verdi@email.com',
      joinDate: '20 Gen 2024',
      kycStatus: 'approved',
      portfolioValue: 67800,
      lastActivity: '3 ore fa',
      documentsCount: 4,
      unreadMessages: 1
    },
    {
      id: '4',
      name: 'Anna Neri',
      email: 'anna.neri@email.com',
      joinDate: '22 Gen 2024',
      kycStatus: 'rejected',
      portfolioValue: 0,
      lastActivity: '1 settimana fa',
      documentsCount: 3,
      unreadMessages: 5
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const approvedClients = clients.filter(c => c.kycStatus === 'approved').length;
  const pendingClients = clients.filter(c => c.kycStatus === 'pending').length;
  const totalPortfolioValue = clients.reduce((sum, c) => sum + c.portfolioValue, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Gestione Clienti</h1>
        <p className="text-slate-200">Panoramica e gestione di tutti i clienti</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-sm text-slate-300">Clienti Totali</div>
            <div className="text-2xl font-bold">{clients.length}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-sm text-slate-300">KYC Approvati</div>
            <div className="text-2xl font-bold text-green-400">{approvedClients}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-sm text-slate-300">Valore Totale</div>
            <div className="text-2xl font-bold">€{totalPortfolioValue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Filtri e ricerca */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Ricerca Clienti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Cerca per nome o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-300"
              />
            </div>
            <Button variant="outline" className="border-slate-300">
              <Users className="w-4 h-4 mr-2" />
              Tutti i Clienti
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista clienti */}
      <div className="grid grid-cols-1 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-slate-600">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{client.name}</div>
                    <div className="text-sm text-slate-600">{client.email}</div>
                    <div className="text-xs text-slate-500">Iscritto il {client.joinDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Portafoglio</div>
                    <div className="font-semibold text-slate-800">
                      €{client.portfolioValue.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-slate-600">KYC Status</div>
                    <Badge className={getKycStatusColor(client.kycStatus)}>
                      {getKycStatusText(client.kycStatus)}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-slate-600">Ultima Attività</div>
                    <div className="text-sm text-slate-800">{client.lastActivity}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 relative"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {client.unreadMessages > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {client.unreadMessages}
                        </span>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 relative"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {client.documentsCount}
                      </span>
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => setSelectedClient(client)}
                      className="bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Dettagli
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <div className="text-slate-600">Nessun cliente trovato</div>
            <div className="text-sm text-slate-500">Prova a modificare i criteri di ricerca</div>
          </CardContent>
        </Card>
      )}

      {/* Dettaglio cliente selezionato */}
      {selectedClient && (
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Dettagli Cliente: {selectedClient.name}
            </CardTitle>
            <CardDescription>
              Informazioni complete e attività recenti
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Informazioni Personali</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-600">Email:</span> {selectedClient.email}</div>
                  <div><span className="text-slate-600">Data Iscrizione:</span> {selectedClient.joinDate}</div>
                  <div><span className="text-slate-600">Ultima Attività:</span> {selectedClient.lastActivity}</div>
                  <div>
                    <span className="text-slate-600">Stato KYC:</span>{' '}
                    <Badge className={getKycStatusColor(selectedClient.kycStatus)}>
                      {getKycStatusText(selectedClient.kycStatus)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Portafoglio</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-600">Valore Totale:</span> €{selectedClient.portfolioValue.toLocaleString()}</div>
                  <div><span className="text-slate-600">Bitcoin:</span> ₿ 0.75</div>
                  <div><span className="text-slate-600">STRF:</span> 120 azioni</div>
                  <div><span className="text-slate-600">STRK:</span> 60 azioni</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Attività</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-600">Documenti:</span> {selectedClient.documentsCount}/4 caricati</div>
                  <div><span className="text-slate-600">Messaggi non letti:</span> {selectedClient.unreadMessages}</div>
                  <div><span className="text-slate-600">Proposte attive:</span> 2</div>
                  <div><span className="text-slate-600">Operazioni totali:</span> 8</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
              <Button className="bg-slate-800 hover:bg-slate-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Invia Messaggio
              </Button>
              <Button variant="outline" className="border-slate-300">
                <FileText className="w-4 h-4 mr-2" />
                Visualizza Documenti
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedClient(null)}
                className="border-slate-300"
              >
                Chiudi
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
