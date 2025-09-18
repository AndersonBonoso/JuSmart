
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  FileText,
  DollarSign,
  Upload,
  MessageCircle,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const ClientDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock data - replace with real data from Supabase
  const client = {
    id: 1,
    name: 'Maria Silva Santos',
    type: 'PF',
    document: '123.456.789-00',
    email: 'maria@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    status: 'Ativo',
    created_at: '2024-01-10'
  };

  const processes = [
    {
      id: 1,
      number: '1234567-89.2024.8.26.0001',
      area: 'Trabalhista',
      status: 'Em andamento',
      value: 15000,
      paid: 5000,
      pending: 10000,
      created_at: '2024-01-15'
    },
    {
      id: 2,
      number: '9876543-21.2024.8.26.0002',
      area: 'Cível',
      status: 'Concluído',
      value: 8000,
      paid: 8000,
      pending: 0,
      created_at: '2024-01-05'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Contrato de Honorários.pdf',
      type: 'PDF',
      size: '245 KB',
      uploaded_at: '2024-01-15'
    },
    {
      id: 2,
      name: 'Documentos Pessoais.pdf',
      type: 'PDF',
      size: '1.2 MB',
      uploaded_at: '2024-01-12'
    }
  ];

  const financial = [
    {
      id: 1,
      description: 'Honorários - Processo Trabalhista',
      amount: 5000,
      type: 'received',
      date: '2024-01-20'
    },
    {
      id: 2,
      description: 'Honorários - Processo Cível',
      amount: 8000,
      type: 'received',
      date: '2024-01-10'
    },
    {
      id: 3,
      description: 'Saldo pendente - Processo Trabalhista',
      amount: 10000,
      type: 'pending',
      date: '2024-02-15'
    }
  ];

  const handleEdit = () => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  const handleWhatsApp = () => {
    const phone = client.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá ${client.name}, como posso ajudá-lo?`);
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  const handleUpload = () => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  const handleDownload = (doc) => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>{client.name} - JustiFy</title>
        <meta name="description" content={`Detalhes do cliente ${client.name}`} />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/app/clients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{client.name}</h1>
              <p className="text-slate-600">{client.document}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleWhatsApp}>
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>

        {/* Client Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600">Tipo</p>
                <p className="font-medium">{client.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-medium">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600">Telefone</p>
                <p className="font-medium">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600">Endereço</p>
                <p className="font-medium">{client.address}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="processes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="processes">Processos</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
          </TabsList>

          {/* Processes Tab */}
          <TabsContent value="processes">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200"
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Processos</h2>
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Novo Processo
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-slate-200">
                {processes.map((process) => (
                  <div key={process.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-slate-900">{process.number}</h3>
                        <p className="text-sm text-slate-600">{process.area}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        process.status === 'Em andamento' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {process.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Valor Total</p>
                        <p className="font-medium">R$ {process.value.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Pago</p>
                        <p className="font-medium text-green-600">R$ {process.paid.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Pendente</p>
                        <p className="font-medium text-orange-600">R$ {process.pending.toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200"
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Documentos</h2>
                  <Button size="sm" onClick={handleUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-slate-200">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-slate-400" />
                      <div>
                        <h3 className="font-medium text-slate-900">{doc.name}</h3>
                        <p className="text-sm text-slate-600">{doc.size} • {doc.uploaded_at}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc)}>
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200"
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold">Financeiro do Cliente</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {financial.map((item) => (
                  <div key={item.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        item.type === 'received' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        <DollarSign className={`h-4 w-4 ${
                          item.type === 'received' ? 'text-green-600' : 'text-orange-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">{item.description}</h3>
                        <p className="text-sm text-slate-600">{item.date}</p>
                      </div>
                    </div>
                    <div className={`text-right ${
                      item.type === 'received' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      <p className="font-medium">
                        R$ {item.amount.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-xs">
                        {item.type === 'received' ? 'Recebido' : 'Pendente'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ClientDetailPage;
