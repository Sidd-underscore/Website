'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

export function TransitionLayout({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 1.05 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
