import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [escritorio, setEscritorio] = useState(null);

  const getEscritorioData = useCallback(async (userId) => {
    if (!userId) return null;
    try {
      const { data: perfil, error: perfilError } = await supabase
        .from('perfis_usuarios')
        .select('escritorio_id')
        .eq('id', userId)
        .single();

      if (perfilError || !perfil) {
        console.error('Erro ao buscar perfil:', perfilError);
        return null;
      }

      const { data: escritorioData, error: escritorioError } = await supabase
        .from('escritorios')
        .select('*')
        .eq('id', perfil.escritorio_id)
        .single();

      if (escritorioError) {
        console.error('Erro ao buscar escritório:', escritorioError);
        return null;
      }
      return escritorioData;
    } catch (e) {
      console.error('Exceção ao buscar dados do escritório:', e);
      return null;
    }
  }, []);

  const handleSession = useCallback(async (session) => {
    setSession(session);
    const currentUser = session?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      const escritorioData = await getEscritorioData(currentUser.id);
      setEscritorio(escritorioData);
    } else {
      setEscritorio(null);
    }
    setLoading(false);
  }, [getEscritorioData]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await handleSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await handleSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (email, password, data) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: data.name,
        }
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Falha no cadastro",
        description: error.message || "Algo deu errado.",
      });
      return { error };
    }
    
    if (authData.user) {
      const { data: escritorio, error: escritorioError } = await supabase
        .from('escritorios')
        .insert({
          nome: data.escritorio_nome,
          tipo: data.tipo,
          cpf_responsavel: data.cpf,
          oab: data.oab,
          oab_validade: data.oab_validade,
          socios: data.socios,
          trial_end: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select()
        .single();

      if (escritorioError) {
        toast({ variant: "destructive", title: "Falha ao criar escritório", description: escritorioError.message });
        return { error: escritorioError };
      }

      const { error: perfilError } = await supabase
        .from('perfis_usuarios')
        .update({
          escritorio_id: escritorio.id,
          role: 'master',
          full_name: data.name,
          oab: data.oab,
        })
        .eq('id', authData.user.id);

      if (perfilError) {
        toast({ variant: "destructive", title: "Falha ao atualizar perfil", description: perfilError.message });
        return { error: perfilError };
      }
    }

    return { user: authData.user, error: null };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Falha no login",
        description: error.message || "E-mail ou senha incorretos.",
      });
    }

    return { error };
  }, [toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        variant: "destructive",
        title: "Falha ao sair",
        description: error.message || "Algo deu errado.",
      });
    }

    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    escritorio,
    loading,
    signUp,
    signIn,
    signOut,
  }), [user, session, escritorio, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};