import { type ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-xl shadow-md bg-[#2a0000] border border-red-800 text-red-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};
