// src/contexts/SupabaseAuthContext.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "@/lib/customSupabaseClient";

// URL para onde o Supabase deve redirecionar após o OAuth.
// Em dev: http://localhost:5173  |  Em produção: https://ju-smart.vercel.app
const APP_URL =
  import.meta.env?.VITE_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");

// Contexto
const SupabaseAuthContext = createContext(null);

// Provider
export function SupabaseAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Carrega sessão ao montar e assina mudanças de auth
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setInitialLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession ?? null);
        setUser(newSession?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      subscription?.subscription?.unsubscribe?.();
    };
  }, []);

  // ---------- Ações de Autenticação ----------

  const signUp = useCallback(async (email, password, metadata = {}) => {
    // Cadastro com metadados (RegisterPage já usa)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${APP_URL}/login`, // para fluxo de confirmação por e-mail
      },
    });
    if (error) throw error;
    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  // OAuth genérico
  const signInWithProvider = useCallback(async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: APP_URL, // volta para a sua app
        // se quiser forçar popup em vez de redirect:
        // queryParams: { prompt: "select_account" },
      },
    });
    if (error) throw error;
  }, []);

  // Atalhos
  const signInWithGoogle = useCallback(
    async () => signInWithProvider("google"),
    [signInWithProvider]
  );

  const signInWithApple = useCallback(
    async () => signInWithProvider("apple"),
    [signInWithProvider]
  );

  // Reset de senha (opcional)
  const resetPassword = useCallback(async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${APP_URL}/reset-password`,
    });
    if (error) throw error;
    return data;
  }, []);

  const value = useMemo(
    () => ({
      // estado
      session,
      user,
      initialLoading,

      // métodos
      signUp,
      signIn,
      signOut,
      signInWithGoogle,
      signInWithApple, // funciona quando você concluir a configuração na Apple
      resetPassword,
    }),
    [
      session,
      user,
      initialLoading,
      signUp,
      signIn,
      signOut,
      signInWithGoogle,
      signInWithApple,
      resetPassword,
    ]
  );

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

// Hook de consumo
export function useAuth() {
  const ctx = useContext(SupabaseAuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth deve ser usado dentro de <SupabaseAuthProvider>."
    );
  }
  return ctx;
}

export default SupabaseAuthContext;
