
    import React, { useState } from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { 
      CheckCircle,
      ArrowRight,
      HelpCircle,
      ArrowLeft
    } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Switch } from '@/components/ui/switch';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    
    const PricingPage = () => {
      const [isYearly, setIsYearly] = useState(false);
      const { toast } = useToast();
    
      const plans = [
        {
          name: 'Individual',
          users: 1,
          monthlyPrice: 49.90,
          yearlyPrice: 34.90,
          features: [
            '1 usuário',
            'Clientes ilimitados',
            'Processos ilimitados',
            'Armazenamento de 10GB',
            'Suporte por email'
          ]
        },
        {
          name: 'Pro',
          users: 2,
          monthlyPrice: 89.90,
          yearlyPrice: 74.90,
          features: [
            '2 usuários',
            'Tudo do plano Individual',
            'Armazenamento de 25GB',
            'Suporte prioritário'
          ],
          popular: true
        },
        {
          name: 'Premium',
          users: 3,
          monthlyPrice: 129.90,
          yearlyPrice: 114.90,
          features: [
            '3 usuários',
            'Tudo do plano Pro',
            'Armazenamento de 50GB',
            'Suporte premium por telefone',
            'Relatórios avançados'
          ]
        }
      ];
    
      const handleChoosePlan = (plan) => {
        toast({
          title: "🚧 Este recurso não está implementado ainda",
          description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
        });
      };
    
      return (
        <>
          <Helmet>
            <title>Planos e Preços - JusSmart</title>
            <meta name="description" content="Escolha o plano ideal para o seu escritório de advocacia" />
          </Helmet>
    
          <div className="min-h-screen bg-slate-50">
            <header className="bg-white shadow-sm">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <Link to="/" className="flex items-center space-x-4">
                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">JusSmart</span>
                    </div>
                  </Link>
                  <p className="text-slate-600">
                    Já é cliente? <Link to="/login" className="font-semibold text-primary">Faça login</Link>
                  </p>
                </div>
              </nav>
            </header>
    
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-slate-900 mb-4"
                >
                  Planos flexíveis para seu escritório
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-slate-600 max-w-2xl mx-auto"
                >
                  Comece com 10 dias grátis. Cancele a qualquer momento.
                </motion.p>
              </div>
    
              <div className="flex items-center justify-center space-x-4 mb-12">
                <Label htmlFor="billing-cycle" className="text-slate-600">Mensal</Label>
                <Switch
                  id="billing-cycle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <Label htmlFor="billing-cycle" className="text-slate-600">
                  Anual <span className="text-green-600 font-semibold">(Economize até 30%)</span>
                </Label>
              </div>
    
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative bg-white border-2 rounded-lg p-8 flex flex-col ${
                      plan.popular ? 'border-primary shadow-2xl' : 'border-slate-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                          Mais Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <p className="text-slate-600 mb-6">{plan.users} usuário{plan.users > 1 ? 's' : ''}</p>
                      
                      <div className="mb-8">
                        <div className="text-4xl font-bold text-slate-900 mb-1">
                          R$ {(isYearly ? plan.yearlyPrice : plan.monthlyPrice).toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-slate-600">por usuário/mês</div>
                        {isYearly && (
                          <div className="text-sm text-green-600 mt-2">
                            cobrado anualmente
                          </div>
                        )}
                      </div>
                      
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={() => handleChoosePlan(plan)}
                      className={`w-full mt-auto ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      Experimentar Grátis
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                ))}
              </div>
    
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Dúvidas frequentes
                </h3>
                <div className="max-w-3xl mx-auto text-left space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-900">Posso cancelar a qualquer momento?</h4>
                    <p className="text-slate-600">Sim, você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-900">O que acontece ao final do período de teste?</h4>
                    <p className="text-slate-600">Você será notificado e poderá escolher um plano para continuar utilizando o JusSmart. Seus dados serão mantidos.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-900">Meus dados estão seguros?</h4>
                    <p className="text-slate-600">Sim. Utilizamos criptografia de ponta e seguimos rigorosamente as diretrizes da LGPD para garantir a segurança e a privacidade dos seus dados.</p>
                  </div>
                </div>
                <p className="mt-8 text-slate-600">
                  Ainda com dúvidas?{' '}
                  <a href="#" className="font-semibold text-primary hover:underline">
                    Fale conosco
                  </a>
                </p>
              </div>
            </main>
          </div>
        </>
      );
    };
    
    export default PricingPage;
  
