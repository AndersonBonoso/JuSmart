
    import React from 'react';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { AlertTriangle } from 'lucide-react';

    const TrialBanner = () => {
      const { escritorio } = useAuth();

      if (!escritorio || escritorio.subscription_status !== 'trial' || !escritorio.trial_end) {
        return null;
      }

      const trialEnd = new Date(escritorio.trial_end);
      const now = new Date();
      const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (daysLeft <= 0) {
        return (
          <div className="bg-red-600 text-white px-6 py-2 text-center">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Seu período de teste expirou!
              </span>
            </div>
          </div>
        );
      }

      return (
        <div className="bg-amber-500 text-white px-6 py-2 text-center">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">
              Período de teste: {daysLeft} {daysLeft === 1 ? 'dia restante' : 'dias restantes'}
            </span>
          </div>
        </div>
      );
    };

    export default TrialBanner;
  