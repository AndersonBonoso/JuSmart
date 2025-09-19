import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, User, Mail, Lock, Building, FileText, Eye, EyeOff, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import PasswordStrength from '@/components/PasswordStrength';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipo: '',
    escritorio_nome: '',
    oab: '',
    oab_validade: '',
    cpf: '',
    cnpj: '',
    socios: [{ nome: '', cpf: '', percentual: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ⬇️ ALTERAÇÃO: acrescentamos signInWithGoogle e signInWithApple
  const { signUp, signInWithGoogle, signInWithApple } = useAuth();
  const { toast } = useToast();

  const passwordMatch = useMemo(() => {
    return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocioChange = (index, field, value) => {
    const newSocios = [...formData.socios];
    newSocios[index][field] = value;
    setFormData(prev => ({ ...prev, socios: newSocios }));
  };

  const addSocio = () => {
    setFormData(prev => ({
      ...prev,
      socios: [...prev.socios, { nome: '', cpf: '', percentual: '' }]
    }));
  };

  const removeSocio = (index) => {
    if (formData.socios.length > 1) {
      const newSocios = formData.socios.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, socios: newSocios }));
    }
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos", variant: "destructive" });
      return false;
    }
    if (!passwordMatch) {
      toast({ title: "Senhas não coincidem", description: "As senhas devem ser iguais", variant: "destructive" });
      return false;
    }
    if (formData.password.length < 8) {
      toast({ title: "Senha fraca", description: "A senha deve ter no mínimo 8 caracteres.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.tipo || !formData.escritorio_nome) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos do escritório", variant: "destructive" });
      return false;
    }
    if (formData.tipo === 'PF' && (!formData.oab || !formData.oab_validade)) {
      toast({ title: "Campos obrigatórios", description: "OAB e data de validade são obrigatórios para PF", variant: "destructive" });
      return false;
    }
    if (formData.tipo === 'PJ') {
      if (!formData.cpf) {
        toast({ title: "Campo obrigatório", description: "CPF do responsável legal é obrigatório", variant: "destructive" });
        return false;
      }
      const totalPercentual = formData.socios.reduce((sum, socio) => sum + (parseFloat(socio.percentual) || 0), 0);
      if (totalPercentual !== 100) {
        toast({ title: "Percentuais inválidos", description: "A soma dos percentuais dos sócios deve ser exatamente 100%", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData);
    if (!error) setStep(3);
    setLoading(false);
  };

  // ⬇️ NOVOS HANDLERS reais para os botões sociais
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      toast({
        title: 'Erro ao entrar com Google',
        description: err?.message || String(err),
        variant: 'destructive',
      });
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithApple();
    } catch (err) {
      toast({
        title: 'Apple ID indisponível',
        description: 'Configure o provedor Apple no Supabase para ativar este login.',
        variant: 'destructive',
      });
    }
  };

  // Mantemos esse placeholder caso queira reutilizar
  const handleSocialRegister = () => {
    toast({ title: "🚧 Este recurso não está implementado ainda", description: "Podemos ativar na próxima etapa. 🚀" });
  };

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-md"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Verifique seu e-mail!
          </h2>
          <p className="text-slate-600 mb-6">
            Enviamos um link de confirmação para <strong>{formData.email}</strong>. Por favor, clique no link para ativar sua conta e fazer login.
          </p>
          <Link to="/login">
            <Button className="w-full">Ir para o Login</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cadastro - JusSmart</title>
        <meta name="description" content="Crie sua conta JusSmart e comece a gerenciar seu escritório de advocacia hoje mesmo" />
      </Helmet>

      {/* Fundo sóbrio/azul-marinho */}
      <div className="min-h-screen flex gradient-hero">
        <div className="fixed top-4 left-4 z-10">
          <Link to="/">
            <Button variant="ghost" className="text-white/90 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md"
          >
            <div className="text-center">
              <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
                <Scale className="h-10 w-10 text-primary" />
                <span className="text-3xl font-bold text-primary">JusSmart</span>
              </Link>
              <h2 className="text-3xl font-bold text-slate-900">
                Crie sua conta
              </h2>
              <p className="mt-2 text-slate-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                  Faça login
                </Link>
              </p>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                {/* Botões Sociais (componentizado) */}
                <SocialLoginButtons
                  onGoogleClick={handleGoogleLogin}   {/* ⬅️ ALTERADO */}
                  onAppleClick={handleAppleLogin}     {/* ⬅️ ALTERADO */}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Ou cadastre-se com email</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* IMPORTANTE: pl-10 por último para não ser sobrescrito por px-* */}
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <div className="relative mt-1">
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="px-4 pr-4 py-3 pl-10 input-base"
                        placeholder="Seu nome completo"
                        required
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="px-4 pr-4 py-3 pl-10 input-base"
                        placeholder="seu@email.com"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="px-4 pr-10 py-3 pl-10 input-base"
                        placeholder="Crie uma senha"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <PasswordStrength password={formData.password} />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="px-4 pr-10 py-3 pl-10 input-base"
                        placeholder="Confirme sua senha"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {formData.confirmPassword && (
                      <div className={`flex items-center mt-2 text-xs ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                        {passwordMatch ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                        {passwordMatch ? 'As senhas coincidem' : 'As senhas não coincidem'}
                      </div>
                    )}
                  </div>

                  <Button type="button" onClick={handleNext} className="w-full">Continuar</Button>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="tipo">Tipo de escritório</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                    {/* Trigger com visual de input branco */}
                    <SelectTrigger className="input-base h-12 px-4 pr-10">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PF">Pessoa Física</SelectItem>
                      <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="escritorio_nome">Nome do escritório</Label>
                  <div className="relative mt-1">
                    <Input
                      id="escritorio_nome"
                      type="text"
                      value={formData.escritorio_nome}
                      onChange={(e) => handleInputChange('escritorio_nome', e.target.value)}
                      className="px-4 pr-4 py-3 pl-10 input-base"
                      placeholder="Nome do seu escritório"
                      required
                    />
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {formData.tipo === 'PF' && (
                  <>
                    <div>
                      <Label htmlFor="oab">Número da OAB</Label>
                      <div className="relative mt-1">
                        <Input
                          id="oab"
                          type="text"
                          value={formData.oab}
                          onChange={(e) => handleInputChange('oab', e.target.value)}
                          className="px-4 pr-4 py-3 pl-10 input-base"
                          placeholder="Ex: SP123456"
                          required
                        />
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="oab_validade">Data de validade da OAB</Label>
                      <Input
                        id="oab_validade"
                        type="date"
                        value={formData.oab_validade}
                        onChange={(e) => handleInputChange('oab_validade', e.target.value)}
                        className="input-base px-4 py-3"
                        required
                      />
                    </div>
                  </>
                )}

                {formData.tipo === 'PJ' && (
                  <>
                    <div>
                      <Label htmlFor="cpf">CPF do responsável legal</Label>
                      <Input
                        id="cpf"
                        type="text"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        className="input-base px-4 py-3"
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>

                    <div>
                      <Label>Sócios</Label>
                      {formData.socios.map((socio, index) => (
                        <div key={index} className="border p-4 rounded-lg mt-2 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Nome do sócio"
                              value={socio.nome}
                              onChange={(e) => handleSocioChange(index, 'nome', e.target.value)}
                              className="input-base px-4 py-3"
                              required
                            />
                            <Input
                              placeholder="CPF"
                              value={socio.cpf}
                              onChange={(e) => handleSocioChange(index, 'cpf', e.target.value)}
                              className="input-base px-4 py-3"
                              required
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder="% participação"
                              value={socio.percentual}
                              onChange={(e) => handleSocioChange(index, 'percentual', e.target.value)}
                              className="input-base px-4 py-3"
                              required
                            />
                            {formData.socios.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeSocio(index)}
                              >
                                Remover
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addSocio} className="mt-2 w-full">
                        Adicionar Sócio
                      </Button>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Voltar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
