
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Users, Briefcase, FileText, DollarSign } from 'lucide-react';
    import { useAuth } from '@/contexts/SupabaseAuthContext';

    const DashboardPage = () => {
      const { user } = useAuth();

      const StatCard = ({ title, value, icon, description }) => (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-slate-500">{description}</p>
          </CardContent>
        </Card>
      );

      return (
        <>
          <Helmet>
            <title>Dashboard - JusSmart</title>
            <meta name="description" content="Visão geral do seu escritório no JusSmart." />
          </Helmet>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Clientes Ativos"
                value="12"
                description="+2 no último mês"
                icon={<Users className="h-4 w-4 text-slate-500" />}
              />
              <StatCard
                title="Processos em Andamento"
                value="35"
                description="+5% vs. mês passado"
                icon={<Briefcase className="h-4 w-4 text-slate-500" />}
              />
              <StatCard
                title="Contratos a Vencer"
                value="3"
                description="Nos próximos 30 dias"
                icon={<FileText className="h-4 w-4 text-slate-500" />}
              />
              <StatCard
                title="Faturamento (Mês)"
                value="R$ 15.231,89"
                description="+20.1% vs. mês passado"
                icon={<DollarSign className="h-4 w-4 text-slate-500" />}
              />
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visão Geral de Faturamento</CardTitle>
                  <CardDescription>Acompanhe a evolução do seu faturamento mensal.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <p className="text-sm text-slate-500">Gráfico de faturamento mensal será exibido aqui.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </>
      );
    };

    export default DashboardPage;
  