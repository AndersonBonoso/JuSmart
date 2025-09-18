
    import React, { useState } from 'react';
    import { Helmet } from 'react-helmet';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Scale, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { useToast } from '@/components/ui/use-toast';
    import { GoogleIcon, AppleIcon } from '@/components/ui/icons';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [loading, setLoading] = useState(false);
      const { signIn } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Erro no Login",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo de volta ao JusSmart.",
          });
          navigate('/app', { replace: true });
        }
        setLoading(false);
      };

      const handleSocialLogin = () => {
        toast({
          title: "🚧 Este recurso não está implementado ainda",
          description: "Mas não se preocupe! Você pode solicitar na próxima conversa! 🚀"
        });
      };

      return (
        <>
          <Helmet>
            <title>Login - JusSmart</title>
            <meta name="description" content="Faça login na sua conta JusSmart e gerencie seu escritório de advocacia" />
          </Helmet>
          <div className="min-h-screen flex bg-slate-50">
            <div className="fixed top-4 left-4 z-10">
              <Link to="/">
                <Button variant="ghost">
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
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
              >
                <div className="text-center">
                  <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
                    <Scale className="h-10 w-10 text-primary" />
                    <span className="text-3xl font-bold text-primary">JusSmart</span>
                  </Link>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Faça login na sua conta
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Ou{' '}
                    <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                      crie uma nova conta
                    </Link>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" onClick={handleSocialLogin}>
                    <GoogleIcon className="mr-2 h-5 w-5" />
                    Google
                  </Button>
                  <Button type="button" variant="outline" onClick={handleSocialLogin}>
                    <AppleIcon className="mr-2 h-5 w-5" />
                    Apple
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300" /></div>
                  <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Ou continue com</span></div>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1">
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="seu@email.com" required />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative mt-1">
                      <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" placeholder="Sua senha" required />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <a href="#" onClick={(e) => { e.preventDefault(); handleSocialLogin(); }} className="font-medium text-primary hover:text-primary/80">
                        Esqueceu sua senha?
                      </a>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </>
      );
    };

    export default LoginPage;
  