"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlindWrapperProps {
  children: ReactNode;
  index: number;
}

/**
 * A client-side wrapper that implements a staggered "blinds" entrance animation.
 * The component rotates from -90deg on the X-axis (closed) to 0deg (open).
 */
export function BlindWrapper({ children, index }: BlindWrapperProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        rotateX: -90, 
        transformPerspective: 1000 
      }}
      whileInView={{ 
        opacity: 1, 
        rotateX: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: (index % 10) * 0.05, // Stagger based on position in current view chunk
        ease: [0.22, 1, 0.36, 1], // Smooth custom cubic-bezier
      }}
      style={{ transformOrigin: "top", backfaceVisibility: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
