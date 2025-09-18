
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Calendar, User } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    
    const posts = [
      {
        id: 1,
        slug: 'nova-lei-protecao-dados',
        title: 'Nova Lei de Proteção de Dados: O que muda para os escritórios de advocacia',
        author: 'Ana Lima, especialista em Direito Digital',
        date: '2025-09-15',
        image: 'Legal documents and data protection concept',
        content: `
          <p>A Lei Geral de Proteção de Dados (LGPD), Lei nº 13.709/2018, entrou em vigor e trouxe mudanças significativas para todos os setores, incluindo o jurídico. Escritórios de advocacia, que lidam diariamente com dados sensíveis de clientes, precisam estar especialmente atentos para garantir a conformidade e evitar sanções pesadas.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Principais Impactos para a Advocacia</h3>
          <p>O principal impacto é a necessidade de uma governança de dados robusta. Isso significa mapear todo o ciclo de vida dos dados dentro do escritório: como são coletados, onde são armazenados, quem tem acesso, como são utilizados e, finalmente, como são descartados de forma segura.</p>
          <ul class="list-disc list-inside my-4 space-y-2">
            <li><strong>Consentimento Explícito:</strong> Para a maioria dos tratamentos de dados, será necessário obter o consentimento livre, informado e inequívoco do titular (cliente). Contratos de honorários e procurações devem ser revisados para incluir cláusulas específicas sobre o tratamento de dados.</li>
            <li><strong>Direitos dos Titulares:</strong> Clientes agora têm o direito de solicitar acesso, correção, anonimização, portabilidade e eliminação de seus dados. Os escritórios precisam ter processos claros para atender a essas solicitações dentro dos prazos legais.</li>
            <li><strong>Segurança da Informação:</strong> É obrigatório adotar medidas de segurança, técnicas e administrativas, para proteger os dados contra acessos não autorizados e situações de destruição, perda ou alteração. Isso inclui desde o uso de softwares seguros até políticas de senhas e controle de acesso físico.</li>
          </ul>
          <h3 class="text-xl font-bold mt-6 mb-3">Como se Adequar?</h3>
          <p>A adequação à LGPD não é apenas uma obrigação legal, mas também uma vantagem competitiva, transmitindo confiança e profissionalismo aos clientes. O primeiro passo é realizar um diagnóstico completo (Data Mapping) para entender o fluxo de dados no seu escritório. Em seguida, elabore uma política de privacidade clara, revise seus contratos e invista em tecnologia que garanta a segurança das informações, como o JusSmart.</p>
          <p class="mt-4">A nomeação de um Encarregado de Proteção de Dados (DPO - Data Protection Officer), seja ele interno ou externo, também é uma medida crucial para ser o ponto de contato entre o escritório, os titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD).</p>
        `
      },
      {
        id: 2,
        slug: 'digitalizacao-processos-direito',
        title: 'Digitalização de Processos: Como a tecnologia está transformando o Direito',
        author: 'Carlos Mendes, advogado e consultor de tecnologia',
        date: '2025-09-10',
        image: 'Digital transformation in legal sector',
        content: `
          <p>A transformação digital, acelerada nos últimos anos, rompeu as barreiras tradicionais do mundo jurídico. O processo eletrônico, as audiências por videoconferência e o uso de softwares de gestão se tornaram a nova realidade, exigindo dos advogados uma rápida adaptação e a incorporação de novas habilidades.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">A Era do Processo Eletrônico</h3>
          <p>O processo judicial eletrônico (PJe, e-SAJ, Projudi, etc.) já é uma realidade consolidada na maioria dos tribunais brasileiros. Essa mudança eliminou a necessidade de petições físicas e deslocamentos, mas, em contrapartida, trouxe a demanda por conhecimento em certificação digital, sistemas dos tribunais e segurança cibernética.</p>
          <p class="mt-4">A tecnologia não apenas mudou a forma de peticionar, mas também abriu portas para uma advocacia mais analítica e baseada em dados. Ferramentas de jurimetria, por exemplo, permitem analisar grandes volumes de decisões judiciais para identificar tendências e prever possíveis resultados, oferecendo um embasamento muito mais sólido para as estratégias processuais.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Ferramentas que Potencializam a Advocacia</h3>
          <p>Além dos sistemas dos tribunais, um ecossistema de tecnologias (as chamadas "lawtechs" ou "legaltechs") surgiu para otimizar a rotina dos escritórios. Softwares de gestão como o JusSmart centralizam informações de clientes, processos e finanças, automatizam tarefas repetitivas e facilitam o trabalho colaborativo.</p>
          <p class="mt-4">A inteligência artificial também começa a desempenhar um papel importante, auxiliando na revisão de contratos, na busca por jurisprudência relevante e até na elaboração de peças processuais mais simples. A advocacia do futuro é, sem dúvida, uma parceria entre a expertise humana e a eficiência da máquina.</p>
        `
      },
      {
        id: 3,
        slug: 'gestao-financeira-advocacia',
        title: 'Gestão Financeira para Escritórios de Advocacia: Dicas Práticas',
        author: 'Beatriz Costa, consultora financeira',
        date: '2025-09-05',
        image: 'Financial management for law firms',
        content: `
          <p>Muitos advogados são excelentes em suas áreas de atuação, mas enfrentam dificuldades na gestão financeira do próprio escritório. Uma administração financeira eficiente é o que garante a sustentabilidade e o crescimento do negócio a longo prazo.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Separando as Finanças Pessoais das Profissionais</h3>
          <p>O primeiro e mais fundamental passo é ter contas bancárias separadas. Misturar as finanças pessoais com as do escritório é a receita para o descontrole. Crie uma conta PJ e centralize todas as receitas e despesas do escritório nela. Isso simplifica a contabilidade e oferece uma visão clara da saúde financeira do negócio.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Controle de Fluxo de Caixa</h3>
          <p>O fluxo de caixa é o coração financeiro do seu escritório. Você precisa saber exatamente quanto dinheiro entra, quanto sai e quando. Utilize planilhas ou, idealmente, um software de gestão para registrar todas as movimentações.</p>
          <ul class="list-disc list-inside my-4 space-y-2">
            <li><strong>Receitas:</strong> Registre todos os honorários recebidos, sejam eles contratuais, de sucumbência ou por ato.</li>
            <li><strong>Despesas Fixas:</strong> Aluguel, salários, internet, telefone, anuidades (OAB), etc.</li>
            <li><strong>Despesas Variáveis:</strong> Custas processuais, viagens, cópias, contratação de correspondentes.</li>
          </ul>
          <p class="mt-4">Com esse controle, você pode projetar seus recebimentos e pagamentos, evitando surpresas e garantindo que haverá capital de giro para manter a operação.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Precificação e Controle de Inadimplência</h3>
          <p>Precificar seus serviços corretamente é vital. Calcule seus custos fixos e variáveis, defina sua margem de lucro e entenda o valor que você entrega ao cliente. Não tenha medo de cobrar um preço justo pelo seu trabalho.</p>
          <p class="mt-4">Para combater a inadimplência, tenha contratos de honorários claros, ofereça diferentes meios de pagamento e utilize um sistema para enviar lembretes de vencimento automáticos. Uma régua de cobrança bem definida ajuda a recuperar valores em atraso de forma profissional.</p>
        `
      },
      {
        id: 4,
        slug: 'marco-civil-internet-atualizacoes',
        title: 'Marco Civil da Internet: Atualizações e Impactos Jurídicos',
        author: 'Ricardo Faria, mestre em Direito e Novas Tecnologias',
        date: '2025-09-01',
        image: 'Internet law and digital rights concept',
        content: `
          <p>O Marco Civil da Internet (Lei nº 12.965/2014) é a principal legislação que regula o uso da internet no Brasil, estabelecendo princípios, garantias, direitos и deveres para usuários e provedores. Desde sua promulgação, a lei tem sido objeto de debates e interpretações jurisprudenciais que moldam o cenário do Direito Digital no país.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Neutralidade de Rede em Foco</h3>
          <p>Um dos pilares do Marco Civil é a neutralidade de rede, que obriga os provedores a tratar todos os pacotes de dados de forma isonômica, sem discriminação por conteúdo, origem, destino ou serviço. Recentemente, discussões sobre "zero-rating" (prática de não cobrar pelo tráfego de dados de certos aplicativos) têm colocado esse princípio à prova, gerando debates sobre sua flexibilização e os limites da regulação.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Responsabilidade dos Provedores</h3>
          <p>A responsabilidade civil de provedores de aplicação (como redes sociais e plataformas de conteúdo) por danos decorrentes de conteúdo gerado por terceiros é outro ponto central. O Art. 19 do Marco Civil estabelece que o provedor só pode ser responsabilizado se, após ordem judicial específica, não tomar as providências para tornar indisponível o conteúdo apontado como infringente.</p>
          <p class="mt-4">O Supremo Tribunal Federal (STF) tem se debruçado sobre a constitucionalidade deste artigo (Tema 987 de Repercussão Geral), e a decisão final terá um impacto profundo na moderação de conteúdo, na liberdade de expressão e no combate à desinformação online.</p>
          <h3 class="text-xl font-bold mt-6 mb-3">Privacidade e Proteção de Dados</h3>
          <p>O Marco Civil foi um precursor da LGPD ao estabelecer diretrizes sobre a proteção da privacidade e dos dados pessoais online. Ele garante o sigilo das comunicações e a inviolabilidade do fluxo de dados, salvo por ordem judicial. A guarda de registros de conexão e de acesso a aplicações, por prazos determinados, é uma obrigação imposta aos provedores para auxiliar em investigações, sempre mediante autorização da justiça.</p>
          <p class="mt-4">Para advogados, compreender as nuances do Marco Civil é essencial para atuar em casos envolvendo crimes cibernéticos, remoção de conteúdo, quebra de sigilo de dados e responsabilidade de plataformas digitais.</p>
        `
      }
    ];
    
    const BlogPostPage = () => {
      const { id } = useParams();
      const post = posts.find(p => p.slug === id);
    
      if (!post) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
            <p className="text-slate-600 mb-8">O artigo que você está procurando não existe ou foi movido.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Blog
              </Button>
            </Link>
          </div>
        );
      }
    
      return (
        <>
          <Helmet>
            <title>{post.title} - JusSmart Blog</title>
            <meta name="description" content={post.excerpt} />
          </Helmet>
    
          <div className="min-h-screen bg-white">
            <header className="bg-white shadow-sm sticky top-0 z-10">
              <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <Link to="/blog" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-semibold">Voltar para o Blog</span>
                  </Link>
                </div>
              </nav>
            </header>
    
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                    {post.title}
                  </h1>
                  <div className="flex items-center text-slate-500 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <span className="mx-3">·</span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Publicado em {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                </header>
    
                <img alt={post.image} className="w-full h-auto max-h-96 object-cover rounded-lg mb-8 shadow-lg" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
    
                <div
                  className="prose prose-lg max-w-none text-slate-700 prose-h3:text-slate-800 prose-p:leading-relaxed prose-ul:text-slate-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </motion.article>
            </main>
          </div>
        </>
      );
    };
    
    export default BlogPostPage;
  