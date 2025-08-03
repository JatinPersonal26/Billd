import React from "react";
import { cn } from "@/lib/utils"; // Remove if not using it

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger"; // define allowed variants
}

export function Badge({ children, className, variant = "primary" }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium";

  const variantStyles = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  );
}