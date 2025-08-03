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
  const { theme  } = useTheme()

  return (
    <div
      className="flex items-center rounded-2xl bg-white gap-1 justify-center h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{value}</span>
      <Icon animateState={hovered ? "animate" : "normal"} stroke={theme==='dark' ? 'black' : 'white'} />
    </div>
  );
};
