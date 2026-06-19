"use client";

import { motion, useScroll } from "framer-motion";

/** Thin progress bar at the top of the viewport tracking scroll position. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brown"
    />
  );
}
