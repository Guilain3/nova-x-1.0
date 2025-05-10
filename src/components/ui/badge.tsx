// components/ui/badge.tsx

import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "destructive" | "warning";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className,
}) => {
  const baseStyle =
    "text-xs px-2 py-1 rounded-full font-medium inline-block";

  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-700",
    destructive: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={clsx(baseStyle, variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
