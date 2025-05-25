
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Phone, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  sender: 'client' | 'admin';
  content: string;
  timestamp: string;
  type: 'text' | 'file';
  fileName?: string;
}

export const ChatSection: React.FC = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'admin',
      content: 'Benvenuto! Sono qui per assisterti con qualsiasi domanda sui tuoi investimenti.',
      timestamp: '10:30',
      type: 'text'
    },
    {
      id: '2',
      sender: 'admin',
      content: 'Ho notato che hai una nuova proposta di investimento Bitcoin. Hai domande al riguardo?',
      timestamp: '10:31',
      type: 'text'
    },
    {
      id: '3',
      sender: 'client',
      content: 'Sì, vorrei capire meglio i tempi di esecuzione della proposta.',
      timestamp: '10:35',
      type: 'text'
    },
    {
      id: '4',
      sender: 'admin',
      content: 'Perfetto! Una volta accettata, l\'esecuzione avviene entro 24 ore lavorative. Ti invierò una conferma via email.',
      timestamp: '10:37',
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'client',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'text'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simula risposta admin
      setIsTyping(true);
      setTimeout(() => {
        const adminResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'admin',
          content: 'Grazie per il tuo messaggio. Il nostro team ti risponderà a breve.',
          timestamp: new Date().toLocaleTimeString('it-IT', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          type: 'text'
        };
        setMessages(prev => [...prev, adminResponse]);
        setIsTyping(false);
      }, 2000);
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Chat & Supporto</h1>
            <p className="text-slate-200">Comunicazione diretta con il tuo consulente</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Phone className="w-4 h-4 mr-2" />
              Chiama
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Video className="w-4 h-4 mr-2" />
              Video
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat principale */}
        <div className="lg:col-span-3">
          <Card className="border-slate-200 shadow-sm h-[600px] flex flex-col">
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Consulente E-Bridge
              </CardTitle>
              <CardDescription className="text-slate-600">Online - Risponde di solito in pochi minuti</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messaggi */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === 'client'
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.sender === 'client' ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input messaggio */}
              <div className="border-t border-slate-200 p-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 border-slate-300"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
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
        <div className="space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">Il Tuo Consulente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-600">MC</span>
                </div>
                <div className="font-medium text-slate-800">Marco Consulente</div>
                <div className="text-sm text-slate-600">Senior Investment Advisor</div>
                <Badge className="bg-green-100 text-green-800 mt-2">Online</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">Orari di Supporto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Lun - Ven</span>
                <span>9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sabato</span>
                <span>9:00 - 13:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domenica</span>
                <span>Chiuso</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">FAQ Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto p-3 border-slate-300"
              >
                <div>
                  <div className="font-medium text-slate-800">Tempi di esecuzione</div>
                  <div className="text-xs text-slate-600">Quanto tempo per gli ordini?</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto p-3 border-slate-300"
              >
                <div>
                  <div className="font-medium text-slate-800">Commissioni</div>
                  <div className="text-xs text-slate-600">Struttura delle commissioni</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-left h-auto p-3 border-slate-300"
              >
                <div>
                  <div className="font-medium text-slate-800">Sicurezza</div>
                  <div className="text-xs text-slate-600">Come proteggere il conto</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
