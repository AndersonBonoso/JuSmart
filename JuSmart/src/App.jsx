import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/contexts/SupabaseAuthContext";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import ClientsPage from "@/pages/ClientsPage";
import ClientDetailPage from "@/pages/ClientDetailPage";
import FinancialPage from "@/pages/FinancialPage";
import ContractsPage from "@/pages/ContractsPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import PricingPage from "@/pages/PricingPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

// Página simples para finalizar o fluxo de OAuth e redirecionar
function AuthCallback() {
  const { user, initialLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialLoading) return;
    if (user) navigate("/app", { replace: true });
    else navigate("/login", { replace: true });
  }, [user, initialLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
    </div>
  );
}

const AppRoutes = () => {
  const { user, initialLoading } = useAuth();

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <Routes>
      {/* públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/app" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/app" replace /> : <RegisterPage />}
      />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />

      {/* callback do OAuth (Google/Apple) */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* área logada */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="clients/:id" element={<ClientDetailPage />} />
        <Route path="financial" element={<FinancialPage />} />
        <Route path="contracts" element={<ContractsPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to={user ? "/app" : "/"} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <AppRoutes />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
