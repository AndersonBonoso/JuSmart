
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  User, 
  Building,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock data - replace with real data from Supabase
  const clients = [
    {
      id: 1,
      name: 'Maria Silva Santos',
      type: 'PF',
      document: '123.456.789-00',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      processes: 3,
      status: 'Ativo'
    },
    {
      id: 2,
      name: 'João Oliveira Ltda',
      type: 'PJ',
      document: '12.345.678/0001-90',
      email: 'contato@joao.com',
      phone: '(11) 88888-8888',
      processes: 1,
      status: 'Ativo'
    },
    {
      id: 3,
      name: 'Ana Costa',
      type: 'PF',
      document: '987.654.321-00',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      processes: 2,
      status: 'Inativo'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm)
  );

  const handleNewClient = () => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  const handleFilter = () => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Clientes - JustiFy</title>
        <meta name="description" content="Gerencie todos os seus clientes em um só lugar" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
            <p className="text-slate-600">Gerencie todos os seus clientes</p>
          </div>
          <Button onClick={handleNewClient}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome ou documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/app/clients/${client.id}`}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {client.type === 'PF' ? (
                          <User className="h-5 w-5 text-primary" />
                        ) : (
                          <Building className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{client.name}</h3>
                        <p className="text-sm text-slate-500">{client.document}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {client.email}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {client.phone}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Processos:</span>
                      <span className="font-medium text-slate-900">{client.processes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-slate-600 mb-4">
              {searchTerm ? 'Tente ajustar sua busca' : 'Comece cadastrando seu primeiro cliente'}
            </p>
            <Button onClick={handleNewClient}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientsPage;
