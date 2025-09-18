
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { AuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
    import LandingPage from '@/pages/LandingPage';
    import LoginPage from '@/pages/LoginPage';
    import RegisterPage from '@/pages/RegisterPage';
    import DashboardPage from '@/pages/DashboardPage';
    import ClientsPage from '@/pages/ClientsPage';
    import ClientDetailPage from '@/pages/ClientDetailPage';
    import FinancialPage from '@/pages/FinancialPage';
    import ContractsPage from '@/pages/ContractsPage';
    import BlogPage from '@/pages/BlogPage';
    import BlogPostPage from '@/pages/BlogPostPage';
    import PricingPage from '@/pages/PricingPage';
    import ProtectedRoute from '@/components/ProtectedRoute';
    import AppLayout from '@/components/layout/AppLayout';

    const AppRoutes = () => {
      const { user, loading } = useAuth();

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        );
      }

      return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/app" /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/app" /> : <RegisterPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          
          <Route path="/app" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:id" element={<ClientDetailPage />} />
            <Route path="financial" element={<FinancialPage />} />
            <Route path="contracts" element={<ContractsPage />} />
          </Route>

          <Route path="*" element={<Navigate to={user ? "/app" : "/"} />} />
        </Routes>
      );
    }

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
  