"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface Props {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants: Record<Direction, Variants> = {
  up: {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -60, rotate: -2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60, rotate: 2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay,
        duration,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
