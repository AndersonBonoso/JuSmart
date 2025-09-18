
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { 
      Scale, 
      Shield, 
      Users, 
      FileText, 
      DollarSign, 
      Clock,
      CheckCircle,
      Star,
      ArrowRight
    } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    
    const LandingPage = () => {
      const benefits = [
        {
          icon: Shield,
          title: 'Segurança LGPD',
          description: 'Proteção total dos dados dos seus clientes conforme a Lei Geral de Proteção de Dados'
        },
        {
          icon: Users,
          title: 'Gestão de Clientes',
          description: 'Organize todos os dados dos seus clientes em um só lugar, com histórico completo'
        },
        {
          icon: FileText,
          title: 'Controle de Processos',
          description: 'Acompanhe todos os processos com prazos, documentos e histórico detalhado'
        },
        {
          icon: DollarSign,
          title: 'Financeiro Completo',
          description: 'Controle de honorários, recebimentos e inadimplência em tempo real'
        },
        {
          icon: Clock,
          title: 'Economia de Tempo',
          description: 'Automatize tarefas repetitivas e foque no que realmente importa: seus clientes'
        },
        {
          icon: Scale,
          title: 'Especializado em Direito',
          description: 'Desenvolvido especificamente para as necessidades de escritórios de advocacia'
        }
      ];
    
      const testimonials = [
        {
          name: 'Dra. Maria Santos',
          role: 'Advogada Trabalhista',
          content: 'O JusSmart revolucionou minha prática. Agora tenho controle total sobre meus processos e financeiro.',
          rating: 5
        },
        {
          name: 'Dr. Carlos Oliveira',
          role: 'Escritório Oliveira & Associados',
          content: 'Excelente ferramenta! A segurança dos dados e a facilidade de uso são impressionantes.',
          rating: 5
        },
        {
          name: 'Dra. Ana Costa',
          role: 'Advogada Civilista',
          content: 'Recomendo para todos os colegas. O suporte é excepcional e o sistema muito intuitivo.',
          rating: 5
        }
      ];
    
      const plans = [
        {
          name: 'Individual',
          users: 1,
          monthlyPrice: 49.90,
          yearlyPrice: 34.90,
          features: ['1 usuário', 'Clientes ilimitados', 'Processos ilimitados', 'Suporte por email']
        },
        {
          name: 'Pro',
          users: 2,
          monthlyPrice: 89.90,
          yearlyPrice: 74.90,
          features: ['2 usuários', 'Clientes ilimitados', 'Processos ilimitados', 'Suporte prioritário'],
          popular: true
        },
        {
          name: 'Premium',
          users: 3,
          monthlyPrice: 109.90,
          yearlyPrice: 94.90,
          features: ['3 usuários', 'Clientes ilimitados', 'Processos ilimitados', 'Suporte premium']
        }
      ];
    
      return (
        <>
          <Helmet>
            <title>JusSmart - Sistema de Gestão para Escritórios de Advocacia</title>
            <meta name="description" content="Gerencie clientes, processos, contratos e financeiro do seu escritório de advocacia com segurança LGPD. Teste grátis por 10 dias." />
          </Helmet>
    
          <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center space-x-2">
                    <Scale className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-primary">JusSmart</span>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-8">
                    <a href="#benefits" className="text-slate-600 hover:text-primary">Benefícios</a>
                    <a href="#testimonials" className="text-slate-600 hover:text-primary">Clientes</a>
                    <a href="#pricing" className="text-slate-600 hover:text-primary">Planos</a>
                    <Link to="/blog" className="text-slate-600 hover:text-primary">Blog</Link>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link to="/login">
                      <Button variant="ghost" className="text-primary hover:text-yellow-400">Entrar</Button>
                    </Link>
                    <Link to="/register">
                       <Button variant="ghost" className="text-primary hover:bg-primary hover:text-yellow-400">Cadastrar</Button>
                    </Link>
                  </div>
                </div>
              </nav>
            </header>
    
            {/* Hero Section */}
            <section className="gradient-hero text-white py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-5xl font-bold mb-6">
                      Gerencie seu escritório de advocacia com
                      <span className="text-yellow-400"> segurança</span> e
                      <span className="text-yellow-400"> eficiência</span>
                    </h1>
                    <p className="text-xl mb-8 text-slate-200">
                      Sistema completo para gestão de clientes, processos, contratos e financeiro. 
                      Desenvolvido especialmente para advogados brasileiros com foco em LGPD.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/register">
                        <Button size="lg" className="bg-white text-primary hover:bg-yellow-400 hover:text-primary">
                          Teste Grátis por 10 Dias
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-yellow-400 hover:text-primary border-white">
                        Ver Demonstração
                      </Button>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <img alt="Dashboard do JusSmart" className="rounded-lg shadow-2xl" src="https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0" />
                  </motion.div>
                </div>
              </div>
            </section>
    
            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    Por que escolher o JusSmart?
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Desenvolvido especificamente para as necessidades dos escritórios de advocacia brasileiros
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <benefit.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-600">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
    
            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    O que nossos clientes dizem
                  </h2>
                  <p className="text-xl text-slate-600">
                    Advogados de todo o Brasil confiam no JusSmart
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white p-6 rounded-lg shadow-lg"
                    >
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 mb-4">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
    
            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    Planos que cabem no seu bolso
                  </h2>
                  <p className="text-xl text-slate-600 mb-8">
                    Escolha o plano ideal para o seu escritório. Todos com 10 dias grátis!
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative bg-white border-2 rounded-lg p-8 ${
                        plan.popular ? 'border-primary shadow-lg' : 'border-slate-200'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                            Mais Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                        <p className="text-slate-600 mb-4">{plan.users} usuário{plan.users > 1 ? 's' : ''}</p>
                        
                        <div className="mb-6">
                          <div className="text-4xl font-bold text-slate-900 mb-1">
                            R$ {plan.monthlyPrice.toFixed(2).replace('.', ',')}
                          </div>
                          <div className="text-slate-600">por mês</div>
                          <div className="text-sm text-slate-500 mt-2">
                            ou R$ {plan.yearlyPrice.toFixed(2).replace('.', ',')} no plano anual
                          </div>
                        </div>
                        
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-slate-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Link to="/register">
                          <Button 
                            className={`w-full ${
                              plan.popular 
                                ? 'bg-primary hover:bg-primary/90' 
                                : 'bg-slate-900 hover:bg-slate-800'
                            }`}
                          >
                            Experimentar Grátis
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
    
            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Scale className="h-8 w-8 text-accent" />
                      <span className="text-2xl font-bold">JusSmart</span>
                    </div>
                    <p className="text-slate-400 mb-4">
                      Sistema de gestão para escritórios de advocacia
                    </p>
                    <p className="text-sm text-slate-500">
                      OGMA Tech Solutions<br />
                      CNPJ: 12.345.678/0001-90<br />
                      Av. Paulista, 1000 - São Paulo, SP
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Produto</h3>
                    <ul className="space-y-2 text-slate-400">
                      <li><a href="#benefits" className="hover:text-white">Benefícios</a></li>
                      <li><a href="#pricing" className="hover:text-white">Planos</a></li>
                      <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Suporte</h3>
                    <ul className="space-y-2 text-slate-400">
                      <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                      <li><a href="#" className="hover:text-white">Contato</a></li>
                      <li><a href="#" className="hover:text-white">Status</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-slate-400">
                      <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                      <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                      <li><a href="#" className="hover:text-white">LGPD</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
                  <p>&copy; 2025 OGMA Tech Solutions. Todos os direitos reservados.</p>
                </div>
              </div>
            </footer>
          </div>
        </>
      );
    };
    
    export default LandingPage;
  