import { cn } from "../../libs/utils";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md focus:outline-none ",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
