import React from "react";
import { Button } from "@/components/ui/button";

/** Google multicolor – protegido contra CSS global que altera fill */
const GoogleSVG = ({ className = "" }) => (
  <svg
    viewBox="0 0 48 48"
    width="20"
    height="20"
    aria-hidden="true"
    className={`shrink-0 ${className}`}
  >
    <path
      style={{ fill: "#FFC107" }}
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
         s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
         s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      style={{ fill: "#FF3D00" }}
      d="M6.306,14.691l6.571,4.819C14.655,16.155,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
         C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      style={{ fill: "#4CAF50" }}
      d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.197-5.238C29.171,35.091,26.715,36,24,36
         c-5.202,0-9.619-3.315-11.283-7.946l-6.522,5.024C9.508,39.556,16.227,44,24,44z"
    />
    <path
      style={{ fill: "#1976D2" }}
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.236-2.231,4.166-4.091,5.565l6.197,5.238
         C36.965,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

/** Apple monocromático – herda a cor (texto branco sobre bg preto) */
const AppleSVG = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    className={`shrink-0 ${className}`}
  >
    <path
      fill="currentColor"
      d="M16.365 13.223c.03 3.245 2.882 4.327 2.916 4.341-.025.08-.455 1.554-1.499 3.079-.904 1.317-1.844 2.631-3.327 2.658-1.455.026-1.924-.859-3.59-.859-1.666 0-2.19.832-3.57.885-1.439.054-2.532-1.423-3.444-2.737-1.878-2.72-3.313-7.672-1.386-11.03.957-1.661 2.666-2.72 4.531-2.746 1.416-.027 2.75.93 3.59.93.84 0 2.47-1.144 4.163-.977.71.029 2.709.287 3.982 2.162-.103.064-2.38 1.39-2.366 4.294zM13.6 3.8c.778-.94 1.3-2.25 1.155-3.56-1.117.045-2.463.74-3.253 1.68-.718.844-1.353 2.19-1.185 3.48 1.254.097 2.505-.64 3.283-1.6z"
    />
  </svg>
);

export default function SocialLoginButtons({
  onGoogleClick,
  onAppleClick,
  size = "md", // sm | md | lg
  className = "",
  googleText = "Continuar com Google",
  appleText = "Continuar com Apple",
}) {
  const sizes = {
    sm: "h-10 px-4 text-[14px]",
    md: "h-12 px-5 text-[15px]",
    lg: "h-12 px-6 text-[16px]",
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      {/* Google */}
      <Button
        type="button"
        variant="outline"
        onClick={onGoogleClick}
        className={`inline-flex items-center justify-center gap-3 ${sizes[size]} bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-sm font-medium leading-none`}
        aria-label={googleText}
      >
        <GoogleSVG className="mr-1" />
        <span className="whitespace-nowrap">{googleText}</span>
      </Button>

      {/* Apple */}
      <Button
        type="button"
        onClick={onAppleClick}
        className={`inline-flex items-center justify-center gap-3 ${sizes[size]} bg-black text-white hover:bg-black/90 font-medium leading-none`}
        aria-label={appleText}
      >
        <AppleSVG className="mr-1" />
        <span className="whitespace-nowrap">{appleText}</span>
      </Button>
    </div>
  );
}
