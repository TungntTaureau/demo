import React, { ReactNode } from "react";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "menu" | "dock" | "card" | "button";
  onClick?: () => void;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = "",
  variant = "default",
  onClick,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "menu":
        return "liquidGlass-wrapper menu p-4 rounded-2xl";
      case "dock":
        return "liquidGlass-wrapper dock p-3 rounded-xl";
      case "card":
        return "liquidGlass-wrapper card p-6 rounded-2xl";
      case "button":
        return "liquidGlass-wrapper button px-6 py-3 rounded-xl cursor-pointer";
      default:
        return "liquidGlass-wrapper p-4 rounded-xl";
    }
  };

  return (
    <div className={`${getVariantClasses()} ${className}`} onClick={onClick}>
      <div className="liquidGlass-effect"></div>
      <div className="liquidGlass-tint"></div>
      <div className="liquidGlass-shine"></div>
      <div className="liquidGlass-text relative z-10">{children}</div>
    </div>
  );
};
