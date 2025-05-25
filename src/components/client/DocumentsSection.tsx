
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Check, Clock, AlertCircle } from 'lucide-react';

export const DocumentsSection: React.FC = () => {
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  const documents = [
    {
      id: 'passport',
      name: 'Documento di Identità',
      description: 'Passaporto o carta d\'identità valida',
      status: 'completed' as const,
      uploadedDate: '15 Gen 2024'
    },
    {
      id: 'address',
      name: 'Prova di Residenza',
      description: 'Bolletta o estratto conto non più vecchio di 3 mesi',
      status: 'completed' as const,
      uploadedDate: '15 Gen 2024'
    },
    {
      id: 'funds',
      name: 'Origine dei Fondi',
      description: 'Dichiarazione di origine dei fondi da investire',
      status: 'pending' as const,
      uploadedDate: null
    },
    {
      id: 'tax',
      name: 'Dichiarazione Fiscale',
      description: 'Ultima dichiarazione dei redditi (opzionale)',
      status: 'pending' as const,
      uploadedDate: null
    }
  ];

  const handleUpload = (docId: string) => {
    setUploadingDoc(docId);
    // Simula upload
    setTimeout(() => {
      setUploadingDoc(null);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Approvato</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">In attesa</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rifiutato</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-800">Non caricato</Badge>;
    }
  };

  const completedDocs = documents.filter(doc => doc.status === 'completed').length;
  const kycProgress = (completedDocs / documents.length) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Gestione Documenti</h1>
        <p className="text-slate-200">Carica i documenti richiesti per completare la verifica KYC</p>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Progresso KYC</span>
            <span className="text-sm">{completedDocs}/{documents.length}</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${kycProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 flex items-center gap-3">
                {getStatusIcon(doc.status)}
                {doc.name}
              </CardTitle>
              <CardDescription className="text-slate-600">
                {doc.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                {getStatusBadge(doc.status)}
                {doc.uploadedDate && (
                  <span className="text-sm text-slate-600">
                    Caricato il {doc.uploadedDate}
                  </span>
                )}
              </div>
              
              {doc.status === 'pending' && (
                <Button
                  onClick={() => handleUpload(doc.id)}
                  disabled={uploadingDoc === doc.id}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                >
                  {uploadingDoc === doc.id ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Caricamento...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Carica Documento
                    </>
                  )}
                </Button>
              )}

              {doc.status === 'completed' && (
                <Button
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Visualizza Documento
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800">Note Importanti</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Tutti i documenti devono essere chiari e leggibili</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>I documenti di identità devono essere validi e non scaduti</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>La prova di residenza non deve essere più vecchia di 3 mesi</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>La verifica può richiedere fino a 2-3 giorni lavorativi</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
