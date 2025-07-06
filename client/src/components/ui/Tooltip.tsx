// components/ui/Tooltip.tsx
import { type ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
}

export const Tooltip = ({
  label,
  children,
  position = "right",
}: TooltipProps) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span
        className={`absolute z-50 whitespace-nowrap rounded px-2 py-1 text-xs bg-black text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200
        ${
          position === "right"
            ? "left-full ml-2 top-1/2 -translate-y-1/2"
            : position === "left"
              ? "right-full mr-2 top-1/2 -translate-y-1/2"
              : position === "top"
                ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
                : "top-full mt-2 left-1/2 -translate-x-1/2"
        }`}
      >
        {label}
      </span>
    </div>
  );
};
