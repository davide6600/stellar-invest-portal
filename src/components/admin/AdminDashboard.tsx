
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const AdminDashboard: React.FC = () => {
  const clients = [
    {
      id: '1',
      name: 'Marco Rossi',
      email: 'marco.rossi@email.com',
      kycStatus: 'approved',
      portfolioValue: 45750,
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Giulia Bianchi',
      email: 'giulia.bianchi@email.com',
      kycStatus: 'pending',
      portfolioValue: 23400,
      joinDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Alessandro Verdi',
      email: 'alessandro.verdi@email.com',
      kycStatus: 'approved',
      portfolioValue: 78900,
      joinDate: '2024-01-10'
    },
    {
      id: '4',
      name: 'Sofia Neri',
      email: 'sofia.neri@email.com',
      kycStatus: 'pending',
      portfolioValue: 12000,
      joinDate: '2024-01-25'
    }
  ];

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'rejected': return 'bg-danger text-white';
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

  const totalClients = clients.length;
  const approvedClients = clients.filter(c => c.kycStatus === 'approved').length;
  const pendingClients = clients.filter(c => c.kycStatus === 'pending').length;
  const totalAUM = clients.reduce((sum, client) => sum + client.portfolioValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-bg text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Dashboard Amministratore</h1>
        <p className="text-brand-light">Gestione clienti E-Bridge Capital</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Clienti Totali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-navy">{totalClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">KYC Approvati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{approvedClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">KYC Pendenti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{pendingClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AUM Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-navy">
              €{totalAUM.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestione Clienti</CardTitle>
            <CardDescription>Elenco e stato di tutti i clienti</CardDescription>
          </div>
          <Button className="bg-brand-navy hover:bg-brand-dark">
            Nuovo Cliente
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status KYC</TableHead>
                <TableHead>Valore Portafoglio</TableHead>
                <TableHead>Data Iscrizione</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Badge className={getKycStatusColor(client.kycStatus)}>
                      {getKycStatusText(client.kycStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell>€{client.portfolioValue.toLocaleString()}</TableCell>
                  <TableCell>{new Date(client.joinDate).toLocaleDateString('it-IT')}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifica
                      </Button>
                      <Button variant="outline" size="sm">
                        Messaggi
                      </Button>
                      <Button variant="outline" size="sm">
                        Proposte
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Proposte Recenti</CardTitle>
            <CardDescription>Ultime proposte inviate ai clienti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Acquisto Bitcoin 0.2 BTC</div>
                  <div className="text-sm text-muted-foreground">Marco Rossi</div>
                </div>
                <Badge className="bg-warning text-white">In attesa</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Vendita STRF 50 azioni</div>
                  <div className="text-sm text-muted-foreground">Alessandro Verdi</div>
                </div>
                <Badge className="bg-success text-white">Accettata</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documenti da Verificare</CardTitle>
            <CardDescription>KYC in attesa di approvazione</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Passaporto + Proof of Address</div>
                  <div className="text-sm text-muted-foreground">Giulia Bianchi</div>
                </div>
                <Button variant="outline" size="sm">
                  Verifica
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Source of Funds</div>
                  <div className="text-sm text-muted-foreground">Sofia Neri</div>
                </div>
                <Button variant="outline" size="sm">
                  Verifica
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
