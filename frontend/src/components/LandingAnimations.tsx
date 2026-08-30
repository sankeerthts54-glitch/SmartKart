"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LandingAnimationsProps {
  children: ReactNode;
}

export function LandingAnimations({ children }: LandingAnimationsProps) {
  // Just a clean entrance animation — no parallax that breaks layout
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
