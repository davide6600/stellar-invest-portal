
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, MessageCircle, Paperclip, Check, CheckCheck } from 'lucide-react';

export const ChatSection: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState([
    {
      id: 1,
      sender: 'admin',
      message: 'Benvenuto in E-Bridge Capital! Come possiamo aiutarti oggi?',
      timestamp: '10:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'client',
      message: 'Ciao, vorrei informazioni sulla mia proposta di investimento in Bitcoin.',
      timestamp: '10:32',
      status: 'delivered'
    },
    {
      id: 3,
      sender: 'admin',
      message: 'Certamente! Ho controllato il tuo profilo. La proposta per l\'acquisto di 0.5 BTC è ancora valida fino al 30 gennaio. Vuoi procedere?',
      timestamp: '10:35',
      status: 'read'
    },
    {
      id: 4,
      sender: 'client',
      message: 'Sì, sono interessato. Quali sono i prossimi passaggi?',
      timestamp: '10:37',
      status: 'sent'
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold mb-2">Chat Supporto</h1>
            <p className="text-slate-200">Comunicazione diretta con il tuo consulente</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-sm text-slate-200">Consulente online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat principale */}
        <div className="lg:col-span-3">
          <Card className="h-96 flex flex-col">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversazione con Marco Rossi
              </CardTitle>
              <CardDescription className="text-slate-600">
                Consulente Senior - Disponibile ora
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'client'
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">{msg.timestamp}</span>
                        {msg.sender === 'client' && (
                          <div className="text-xs">
                            {msg.status === 'sent' && <Check className="w-3 h-3" />}
                            {msg.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                            {msg.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-400" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-600 hover:text-slate-800"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Scrivi un messaggio..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar informazioni */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-800">Il tuo Consulente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">MR</span>
                </div>
                <h3 className="font-medium text-slate-800">Marco Rossi</h3>
                <p className="text-sm text-slate-600">Consulente Senior</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Specializzazione:</strong> Bitcoin e Criptovalute</p>
                <p><strong>Esperienza:</strong> 8 anni</p>
                <p><strong>Lingue:</strong> Italiano, Inglese</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-slate-800">Azioni Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                Richiedi Chiamata
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Paperclip className="w-4 h-4 mr-2" />
                Invia Documento
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Nuova Proposta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
