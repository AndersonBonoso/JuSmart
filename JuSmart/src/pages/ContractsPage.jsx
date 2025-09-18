
    import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Edit, 
  Download, 
  Eye,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContractsPage = () => {
  const [contractTemplate, setContractTemplate] = useState(`CONTRATO DE PRESTAÇÃO DE SERVIÇOS ADVOCATÍCIOS

Pelo presente instrumento particular, de um lado {{NOME_CLIENTE}}, {{TIPO_PESSOA}}, {{DOCUMENTO}}, residente e domiciliado à {{ENDERECO_CLIENTE}}, doravante denominado CONTRATANTE, e de outro lado {{NOME_ADVOGADO}}, advogado inscrito na OAB/{{UF_OAB}} sob o nº {{OAB}}, com escritório à {{ENDERECO_ESCRITORIO}}, doravante denominado CONTRATADO, têm entre si justo e acordado o seguinte:

CLÁUSULA PRIMEIRA - DO OBJETO
O CONTRATADO prestará serviços advocatícios ao CONTRATANTE no processo/procedimento {{NUMERO_PROCESSO}}, na área {{AREA_DIREITO}}.

CLÁUSULA SEGUNDA - DOS HONORÁRIOS
Pelos serviços prestados, o CONTRATANTE pagará ao CONTRATADO a quantia de R$ {{VALOR_HONORARIOS}} ({{VALOR_EXTENSO}}), da seguinte forma: {{FORMA_PAGAMENTO}}.

CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES
São obrigações do CONTRATADO:
a) Prestar os serviços com zelo e diligência;
b) Manter sigilo profissional;
c) Informar o CONTRATANTE sobre o andamento do processo.

São obrigações do CONTRATANTE:
a) Fornecer todos os documentos necessários;
b) Efetuar o pagamento conforme acordado;
c) Comunicar mudanças de endereço.

CLÁUSULA QUARTA - DA VIGÊNCIA
Este contrato vigorará até a conclusão dos serviços contratados.

Local e data: {{CIDADE}}, {{DATA}}

_________________________                    _________________________
{{NOME_CLIENTE}}                             {{NOME_ADVOGADO}}
CONTRATANTE                                  CONTRATADO - OAB/{{UF_OAB}} {{OAB}}`);

  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedTemplate = localStorage.getItem('justify_contract_template');
    if (savedTemplate) {
      setContractTemplate(savedTemplate);
    }
  }, []);

  const variables = [
    '{{NOME_CLIENTE}}',
    '{{TIPO_PESSOA}}',
    '{{DOCUMENTO}}',
    '{{ENDERECO_CLIENTE}}',
    '{{NOME_ADVOGADO}}',
    '{{UF_OAB}}',
    '{{OAB}}',
    '{{ENDERECO_ESCRITORIO}}',
    '{{NUMERO_PROCESSO}}',
    '{{AREA_DIREITO}}',
    '{{VALOR_HONORARIOS}}',
    '{{VALOR_EXTENSO}}',
    '{{FORMA_PAGAMENTO}}',
    '{{CIDADE}}',
    '{{DATA}}'
  ];

  const handleSave = () => {
    localStorage.setItem('justify_contract_template', contractTemplate);
    setIsEditing(false);
    toast({
      title: "Modelo salvo com sucesso!",
      description: "O modelo de contrato foi atualizado.",
    });
  };

  const handleGeneratePDF = () => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  const handlePreview = () => {
    toast({
      title: "🚧 Este recurso não está implementado ainda",
      description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Contratos - JustiFy</title>
        <meta name="description" content="Gerencie modelos de contratos e gere documentos personalizados" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Contratos</h1>
            <p className="text-slate-600">Gerencie modelos e gere contratos personalizados</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button onClick={handleGeneratePDF}>
              <Download className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200"
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Modelo de Contrato</h2>
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {isEditing ? (
                  <Textarea
                    value={contractTemplate}
                    onChange={(e) => setContractTemplate(e.target.value)}
                    className="min-h-[600px] font-mono text-sm"
                    placeholder="Digite o modelo do contrato..."
                  />
                ) : (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-slate-900 font-mono">
                      {contractTemplate}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200"
            >
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold">Variáveis Disponíveis</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Clique para copiar uma variável
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  {variables.map((variable) => (
                    <button
                      key={variable}
                      onClick={() => {
                        navigator.clipboard.writeText(variable);
                        toast({
                          title: "Variável copiada!",
                          description: `${variable} foi copiado para a área de transferência`,
                        });
                      }}
                      className="w-full text-left px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <code className="text-primary">{variable}</code>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-blue-50 rounded-lg p-6 mt-6"
            >
              <h3 className="font-semibold text-blue-900 mb-2">Como usar</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use as variáveis no modelo de contrato</li>
                <li>• Ao gerar o PDF, as variáveis serão substituídas pelos dados reais</li>
                <li>• Mantenha o formato {"{{VARIAVEL}}"} para funcionamento correto</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200"
        >
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold">Contratos Recentes</h2>
          </div>
          
          <div className="p-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Nenhum contrato gerado ainda
              </h3>
              <p className="text-slate-600 mb-4">
                Os contratos gerados aparecerão aqui para fácil acesso
              </p>
              <Button onClick={handleGeneratePDF}>
                Gerar Primeiro Contrato
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ContractsPage;
  