
    import React from 'react';
    import { motion } from 'framer-motion';
    
    const PasswordStrength = ({ password }) => {
      const getStrength = () => {
        let score = 0;
        if (!password || password.length < 8) return 0;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        return score;
      };
    
      const strength = getStrength();
      const strengthLabels = ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
      const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
      return (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-slate-600">Força da senha</span>
            <span className={`text-xs font-bold ${
              strength === 0 ? 'text-slate-500' :
              strength <= 2 ? 'text-orange-500' :
              strength === 3 ? 'text-blue-500' : 'text-green-500'
            }`}>
              {strength > 0 ? strengthLabels[strength] : ''}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <motion.div
              className={`h-1.5 rounded-full ${strength > 0 ? strengthColors[strength - 1] : ''}`}
              initial={{ width: 0 }}
              animate={{ width: `${(strength / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      );
    };
    
    export default PasswordStrength;
  