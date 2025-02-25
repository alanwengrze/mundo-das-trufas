"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
interface AnimateTransactionWrapperProps {
  className?: string;
  children: React.ReactNode;
}
export function AnimateTransactionWrapper({
  className,
  children,
}: AnimateTransactionWrapperProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
