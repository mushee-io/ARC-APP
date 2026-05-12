import React from "react";

interface ChainIconProps {
  chain: string;
  size?: "sm" | "md" | "lg";
}

export function ChainIcon({ chain, size = "md" }: ChainIconProps) {
  const colors: Record<string, string> = {
    ARC: "bg-blue-500",
    ETH: "bg-gray-400",
    BASE: "bg-blue-600",
    POL: "bg-purple-500",
    SOL: "bg-gradient-to-tr from-green-400 to-blue-500",
  };

  const initials: Record<string, string> = {
    ARC: "A",
    ETH: "E",
    BASE: "B",
    POL: "P",
    SOL: "S",
  };

  const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const bgClass = colors[chain] || "bg-gray-300";
  const initial = initials[chain] || chain[0];

  return (
    <div
      className={`${sizeClasses[size]} ${bgClass} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
      data-testid={`chain-icon-${chain}`}
    >
      {initial}
    </div>
  );
}
