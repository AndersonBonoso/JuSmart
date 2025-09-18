
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  FileText, 
  Settings,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard, exact: true },
  { name: 'Clientes', href: '/app/clients', icon: Users },
  { name: 'Financeiro', href: '/app/financial', icon: DollarSign },
  { name: 'Contratos', href: '/app/contracts', icon: FileText },
  { name: 'Configurações', href: '/app/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Scale className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">JustiFy</span>
        </div>
      </div>
      
      <nav className="px-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.exact}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
