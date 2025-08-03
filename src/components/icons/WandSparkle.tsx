"use client";

import { useEffect } from "react";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const sparkleVariants: Variants = {
  normal: {
    opacity: 1,
  },
  animate: (i: number) => ({
    opacity: [1, 0.3, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 0.2,
      delay: i * 0.1,
      ease: "easeInOut",
    },
  }),
};

interface WandSparklesProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  animateState?: "normal" | "animate";
}

const WandSparkles = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  animateState = "normal",
  ...props
}: WandSparklesProps) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(animateState);
  }, [animateState]);

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
        {[
          "m14 7 3 3",
          "M5 6v4",
          "M19 14v4",
          "M10 2v2",
          "M7 8H3",
          "M21 16h-4",
          "M11 3H9",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            variants={sparkleVariants}
            animate={controls}
            custom={i}
          />
        ))}
      </svg>
    </div>
  );
};

export { WandSparkles };
