
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const FinancialPage = () => {
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  // Mock data - replace with real data from Supabase
  const stats = [
    {
      title: 'Total Recebido',
      value: 'R$ 45.230,00',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'A Receber',
      value: 'R$ 23.450,00',
      change: '+5%',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Em Atraso',
      value: 'R$ 3.200,00',
      change: '-2%',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 2.850,00',
      change: '+8%',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  const transactions = [
    {
      id: 1,
      client: 'Maria Silva Santos',
      description: 'Honorários - Processo Trabalhista',
      amount: 5000,
      status: 'received',
      date: '2024-01-20',
      due_date: '2024-01-20'
    },
    {
      id: 2,
      client: 'João Oliveira Ltda',
      description: 'Honorários - Consultoria Jurídica',
      amount: 3500,
      status: 'pending',
      date: null,
      due_date: '2024-02-15'
    },
    {
      id: 3,
      client: 'Ana Costa',
      description: 'Honorários - Processo Cível',
      amount: 8000,
      status: 'received',
      date: '2024-01-15',
      due_date: '2024-01-15'
    },
    {
      id: 4,
      client: 'Carlos Santos',
      description: 'Honorários - Processo Trabalhista',
      amount: 2200,
      status: 'overdue',
      date: null,
      due_date: '2024-01-10'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'received':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'received':
        return 'Recebido';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Em Atraso';
      default:
        return 'Desconhecido';
    }
  };

  const handleNewTransaction = () => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  const handleExport = () => {
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
        <title>Financeiro - JustiFy</title>
        <meta name="description" content="Controle financeiro completo do seu escritório de advocacia" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Financeiro</h1>
            <p className="text-slate-600">Controle de honorários e recebimentos</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={handleNewTransaction}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Lançamento
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change} este mês</p>
                </div>
                <div className={`p-3 rounded-full bg-slate-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="received">Recebido</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="overdue">Em Atraso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200"
        >
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold">Lançamentos Financeiros</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Data Pagamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {transaction.client}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        R$ {transaction.amount.toLocaleString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {transaction.due_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {transaction.date || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Chart placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Evolução dos Recebimentos
          </h2>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            <p className="text-slate-500">Gráfico de evolução será implementado aqui</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FinancialPage;
