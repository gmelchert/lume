"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type IconProps = { className?: string };

const variants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: "easeInOut" },
      opacity: { duration: 0.2 },
    },
  },
};

/** Animation props for the svg root — empty (static) under reduced motion. */
function useDraw() {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.6 },
  };
}

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1,
};

export function DiamondIcon({ className }: IconProps) {
  return (
    <motion.svg {...svgProps} className={className} {...useDraw()}>
      <motion.path variants={variants} d="M6 3h12l3 5-9 13L3 8l3-5Z" strokeLinejoin="round" />
      <motion.path variants={variants} d="M3 8h18M9 3 7.5 8 12 21 16.5 8 15 3" strokeLinejoin="round" />
    </motion.svg>
  );
}

export function EngraveIcon({ className }: IconProps) {
  return (
    <motion.svg {...svgProps} className={className} {...useDraw()}>
      <motion.circle variants={variants} cx="12" cy="15" r="6" />
      <motion.path variants={variants} d="m9 6 3-3 3 3-3 4-3-4Z" strokeLinejoin="round" />
    </motion.svg>
  );
}

export function DeliveryIcon({ className }: IconProps) {
  return (
    <motion.svg {...svgProps} className={className} {...useDraw()}>
      <motion.path variants={variants} d="M1 5h13v11H1zM14 8h5l3 4v4h-8z" strokeLinejoin="round" />
      <motion.circle variants={variants} cx="6" cy="18" r="2" />
      <motion.circle variants={variants} cx="18" cy="18" r="2" />
    </motion.svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <motion.svg {...svgProps} className={className} {...useDraw()}>
      <motion.path
        variants={variants}
        d="M12 21S3 14.5 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 14.5 12 21 12 21Z"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
