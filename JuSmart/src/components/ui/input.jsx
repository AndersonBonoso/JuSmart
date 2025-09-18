import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      // Preset visual do projeto: fundo branco, borda, foco etc. (vem de index.css)
      // Mantemos w-full e paddings padrão; classes extras podem ser passadas via className
      className={cn(
        "input-base w-full px-4 py-3 text-sm",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
