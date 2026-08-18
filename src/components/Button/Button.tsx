// Componente reutilizpavel
import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

// O React fornece a tipagem com base nas propriedades legítimas de um "button". Isso evita precisar tipar cada propriedade que ele eventualmente possa ter a depender do contexto onde será empregado
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
}