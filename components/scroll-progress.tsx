"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.2,
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-brand-blue"
        style={{ scaleX }}
      />
      <div
        aria-hidden="true"
        className="fixed right-6 top-1/2 z-40 hidden h-40 w-px -translate-y-1/2 overflow-hidden bg-line lg:block"
      >
        <motion.div className="h-full w-full origin-top bg-brand-blue" style={{ scaleY: scaleX }} />
      </div>
    </>
  );
}
