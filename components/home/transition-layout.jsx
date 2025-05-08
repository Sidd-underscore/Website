"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export function TransitionLayout({ children }) {
  const pathname = usePathname();

  if (pathname.includes("/photos/albums/"))
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    );

    if (pathname.includes("/photos/")) return children;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
