
    import React, { useState } from 'react';
    import { Helmet } from 'react-helmet';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { 
      ArrowLeft, 
      Calendar, 
      User, 
      Search,
      Tag
    } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    
    const posts = [
      {
        id: 1,
        slug: 'nova-lei-protecao-dados',
        title: 'Nova Lei de Proteção de Dados: O que muda para os escritórios de advocacia',
        excerpt: 'Entenda as principais mudanças na LGPD e como adequar seu escritório às novas exigências.',
        author: 'Ana Lima, especialista em Direito Digital',
        date: '2025-09-15',
        tags: ['LGPD', 'Proteção de Dados', 'Compliance'],
        image: 'Legal documents and data protection concept'
      },
      {
        id: 2,
        slug: 'digitalizacao-processos-direito',
        title: 'Digitalização de Processos: Como a tecnologia está transformando o Direito',
        excerpt: 'A revolução digital no judiciário brasileiro e suas implicações para os advogados.',
        author: 'Carlos Mendes, advogado e consultor de tecnologia',
        date: '2025-09-10',
        tags: ['Tecnologia', 'Processo Digital', 'Inovação'],
        image: 'Digital transformation in legal sector'
      },
      {
        id: 3,
        slug: 'gestao-financeira-advocacia',
        title: 'Gestão Financeira para Escritórios de Advocacia: Dicas Práticas',
        excerpt: 'Como organizar as finanças do seu escritório e aumentar a rentabilidade.',
        author: 'Beatriz Costa, consultora financeira',
        date: '2025-09-05',
        tags: ['Gestão', 'Finanças', 'Escritório'],
        image: 'Financial management for law firms'
      },
      {
        id: 4,
        slug: 'marco-civil-internet-atualizacoes',
        title: 'Marco Civil da Internet: Atualizações e Impactos Jurídicos',
        excerpt: 'As recentes mudanças no Marco Civil e como elas afetam a prática advocatícia.',
        author: 'Ricardo Faria, mestre em Direito e Novas Tecnologias',
        date: '2025-09-01',
        tags: ['Marco Civil', 'Internet', 'Direito Digital'],
        image: 'Internet law and digital rights concept'
      }
    ];
    
    const BlogPage = () => {
      const [searchTerm, setSearchTerm] = useState('');
    
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    
      return (
        <>
          <Helmet>
            <title>Blog - JusSmart</title>
            <meta name="description" content="Atualizações sobre justiça no Brasil e no mundo, tecnologia jurídica e dicas para escritórios de advocacia" />
          </Helmet>
    
          <div className="min-h-screen bg-slate-50">
            <header className="bg-white shadow-sm">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <Link to="/" className="flex items-center space-x-4">
                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">JusSmart</span>
                      <span className="text-slate-600">Blog</span>
                    </div>
                  </Link>
                  
                  <div className="flex items-center space-x-4">
                    <Link to="/login">
                      <Button variant="ghost">Entrar</Button>
                    </Link>
                    <Link to="/register">
                      <Button>Cadastrar</Button>
                    </Link>
                  </div>
                </div>
              </nav>
            </header>
    
            <section className="bg-gradient-to-r from-[#0A2540] to-[#123A63] text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl font-bold mb-4">
                    Blog JusSmart
                  </h1>
                  <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                    Atualizações sobre justiça no Brasil e no mundo, e dicas para otimizar a gestão do seu escritório.
                  </p>
                </motion.div>
              </div>
            </section>
    
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="mb-12">
                <div className="max-w-lg mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Buscar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-6 text-lg bg-white"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden group"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <div className="overflow-hidden">
                        <img alt={post.image} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-slate-500 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-slate-600 mb-4">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
    
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Nenhum artigo encontrado
                  </h3>
                  <p className="text-slate-600">
                    Tente ajustar sua busca ou explore outros tópicos.
                  </p>
                </div>
              )}
            </main>
          </div>
        </>
      );
    };
    
    export default BlogPage;
  