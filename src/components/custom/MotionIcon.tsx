"use client";
import { useTheme } from "next-themes";
import { useState } from "react";

export const MotionIcon = ({
  value,
  Icon,
}: {
  value: string;
  Icon: React.ComponentType<{
    animateState: "normal" | "animate";
    stroke: string;
  }>;
}) => {
  const [hovered, setHovered] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const effectiveTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div
      className="flex items-center rounded-2xl gap-1 justify-center h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{value}</span>
      <Icon
        animateState={hovered ? "animate" : "normal"}
        stroke={effectiveTheme === "dark" ? "black" : "white"}
      />
    </div>
  );
};
