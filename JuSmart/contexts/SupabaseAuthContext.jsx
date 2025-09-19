import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createClient } from "@supabase/supabase-js";

// ===================================================
// Supabase client
// ===================================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  // Log claro em dev
  console.warn(
    "[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY não definidos."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// ===================================================
// Helpers
// ===================================================
function getRedirectTo() {
  // Em dev usa localhost; em prod usa domínio do app
  const fromEnv = import.meta.env.VITE_APP_URL;
  if (fromEnv) return `${fromEnv}/login`; // pós-login cai no /login que redireciona para /app
  if (typeof window !== "undefined") {
    const base = window.location.origin;
    return `${base}/login`;
  }
  return undefined;
}

const hasV2OAuth = () =>
  typeof supabase?.auth?.signInWithOAuth === "function"; // v2
const hasV1OAuth = () => typeof supabase?.auth?.signIn === "function"; // v1

// ===================================================
/* Contexto */
// ===================================================
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega sessão inicial
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (typeof supabase.auth.getSession === "function") {
          // v2
          const { data } = await supabase.auth.getSession();
          if (!mounted) return;
          setUser(data?.session?.user ?? null);
        } else if (typeof supabase.auth.session === "function") {
          // v1
          const session = supabase.auth.session();
          if (!mounted) return;
          setUser(session?.user ?? null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    // Escuta mudanças de auth
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  // -------- email + senha --------
  const signUp = useCallback(async (email, password, metadata = {}) => {
    if (typeof supabase.auth.signUp === "function") {
      // v2
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      });
      if (error) throw error;
      return data;
    }
    // v1
    const { user, session, error } = await supabase.auth.signUp(
      { email, password },
      { data: metadata }
    );
    if (error) throw error;
    return { user, session };
  }, []);

  // -------- OAuth (Google) com fallback v2 -> v1 --------
  const signInWithGoogle = useCallback(async () => {
    const redirectTo = getRedirectTo();

    if (hasV2OAuth()) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
      if (error) throw error;
      return data;
    }

    if (hasV1OAuth()) {
      const { user, session, error } = await supabase.auth.signIn(
        { provider: "google" },
        { redirectTo }
      );
      if (error) throw error;
      return { user, session };
    }

    throw new Error(
      "Nenhuma API OAuth válida encontrada no supabase-js (v1/v2)."
    );
  }, []);

  // -------- OAuth (Apple) com fallback v2 -> v1 --------
  const signInWithApple = useCallback(async () => {
    const redirectTo = getRedirectTo();

    if (hasV2OAuth()) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: { redirectTo },
      });
      if (error) throw error;
      return data;
    }

    if (hasV1OAuth()) {
      const { user, session, error } = await supabase.auth.signIn(
        { provider: "apple" },
        { redirectTo }
      );
      if (error) throw error;
      return { user, session };
    }

    throw new Error(
      "Nenhuma API OAuth válida encontrada no supabase-js (v1/v2)."
    );
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const u = supabase.auth.user?.() ?? supabase.auth.getUser?.();
    const currentUser = u?.user ?? u; // v1/v2 compat
    if (!currentUser) throw new Error("Sem usuário logado.");

    const { data, error } = await supabase.from("profiles").upsert({
      id: currentUser.id,
      ...updates,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return data;
  }, []);

  const refreshSession = useCallback(async () => {
    if (typeof supabase.auth.refreshSession === "function") {
      // v2
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return data;
    }
    // v1 não precisa (token auto-refresh)
    return null;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signUp,
      signInWithGoogle,
      signInWithApple,
      signOut,
      updateProfile,
      refreshSession,
    }),
    [
      user,
      loading,
      signUp,
      signInWithGoogle,
      signInWithApple,
      signOut,
      updateProfile,
      refreshSession,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider />");
  return ctx;
};
