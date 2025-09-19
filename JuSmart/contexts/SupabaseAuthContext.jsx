import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createClient } from "@supabase/supabase-js";

// ------------ Supabase client ------------
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  console.warn("[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY não definidos.");
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: { persistSession: true, autoRefreshToken: true },
});

// ------------ Helpers ------------
function getRedirectTo() {
  const fromEnv = import.meta.env.VITE_APP_URL;
  if (fromEnv) return `${fromEnv}/login`;
  if (typeof window !== "undefined") return `${window.location.origin}/login`;
  return undefined;
}
const hasV2OAuth = () => typeof supabase?.auth?.signInWithOAuth === "function";
const hasV1OAuth = () => typeof supabase?.auth?.signIn === "function";

// fallback final: força authorize por URL do Supabase
function manualAuthorize(provider, redirectTo) {
  const url = new URL(`${supabaseUrl}/auth/v1/authorize`);
  url.searchParams.set("provider", provider);
  if (redirectTo) url.searchParams.set("redirect_to", redirectTo);
  window.location.assign(url.toString());
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sessão inicial + listener
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (typeof supabase.auth.getSession === "function") {
          const { data } = await supabase.auth.getSession();
          if (!alive) return;
          setUser(data?.session?.user ?? null);
        } else if (typeof supabase.auth.session === "function") {
          const session = supabase.auth.session();
          if (!alive) return;
          setUser(session?.user ?? null);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  // email + senha
  const signUp = useCallback(async (email, password, metadata = {}) => {
    if (typeof supabase.auth.signUp === "function") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      });
      if (error) throw error;
      return data;
    }
    const { user, session, error } = await supabase.auth.signUp(
      { email, password },
      { data: metadata }
    );
    if (error) throw error;
    return { user, session };
  }, []);

  // OAuth Google com v2 → v1 → fallback por URL
  const signInWithGoogle = useCallback(async () => {
    const redirectTo = getRedirectTo();
    try {
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
      manualAuthorize("google", redirectTo);
    } catch (err) {
      console.warn("[OAuth Google via SDK falhou] Forçando authorize:", err);
      manualAuthorize("google", redirectTo);
    }
  }, []);

  // OAuth Apple com v2 → v1 → fallback por URL
  const signInWithApple = useCallback(async () => {
    const redirectTo = getRedirectTo();
    try {
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
      manualAuthorize("apple", redirectTo);
    } catch (err) {
      console.warn("[OAuth Apple via SDK falhou] Forçando authorize:", err);
      manualAuthorize("apple", redirectTo);
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  // mantém updateProfile
  const updateProfile = useCallback(async (updates) => {
    let userId = null;

    // v2: getUser() é async e retorna { data: { user } }
    if (typeof supabase.auth.getUser === "function") {
      const { data } = await supabase.auth.getUser();
      userId = data?.user?.id ?? null;
    }
    // v1: user() é sync
    if (!userId && typeof supabase.auth.user === "function") {
      userId = supabase.auth.user()?.id ?? null;
    }

    if (!userId) throw new Error("Sem usuário logado.");

    const { data, error } = await supabase.from("profiles").upsert({
      id: userId,
      ...updates,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return data;
  }, []);

  // mantém refreshSession (v2 apenas)
  const refreshSession = useCallback(async () => {
    if (typeof supabase.auth.refreshSession === "function") {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return data;
    }
    return null; // v1 não precisa
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
