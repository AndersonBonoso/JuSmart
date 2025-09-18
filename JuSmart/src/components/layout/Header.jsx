
    import React from 'react';
    import { Bell, User, LogOut } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { useAuth } from '@/contexts/SupabaseAuthContext';
    import { useToast } from '@/components/ui/use-toast';
    import { useNavigate } from 'react-router-dom';

    const Header = () => {
      const { user, signOut } = useAuth();
      const { toast } = useToast();
      const navigate = useNavigate();

      const handleSignOut = async () => {
        const { error } = await signOut();
        if (!error) {
          navigate('/');
          toast({
            title: "Logout realizado com sucesso!",
          });
        }
      };

      const handleNotImplemented = () => {
        toast({
          title: "🚧 Funcionalidade em construção!",
          description: "Você pode solicitar este recurso na próxima mensagem. 🚀",
        });
      };

      return (
        <header className="flex items-center justify-end h-16 px-6 bg-white border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleNotImplemented}>
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-slate-600" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <p className="font-medium">Minha Conta</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleNotImplemented}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      );
    };

    export default Header;
  