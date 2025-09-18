import React from "react";
import { Button } from "@/components/ui/button";
import { GoogleIcon, AppleIcon } from "@/components/ui/icons";

/**
 * Botões de login social padronizados
 *
 * - Altura do botão: 48px (h-12)
 * - Ícones: 20px (h-5 w-5)
 * - Google: fundo branco, borda cinza, sem amarelo
 * - Apple: botão preto oficial
 */
export default function SocialLoginButtons({
  onGoogleClick,
  onAppleClick,
  size = "md", // futuro: sm | md | lg
  className = "",
}) {
  const iconSizeClass = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {/* Google (botão claro recomendado) */}
      <Button
        type="button"
        variant="outline"
        onClick={onGoogleClick}
        className="h-12 bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-sm"
        aria-label="Continuar com Google"
      >
        <GoogleIcon className={`${iconSizeClass} mr-2`} />
        <span>Continuar com Google</span>
      </Button>

      {/* Apple (botão preto oficial) */}
      <Button
        type="button"
        onClick={onAppleClick}
        className="h-12 bg-black text-white hover:bg-black/90"
        aria-label="Continuar com Apple"
      >
        <AppleIcon className={`${iconSizeClass} mr-2`} />
        <span>Continuar com Apple</span>
      </Button>
    </div>
  );
}

