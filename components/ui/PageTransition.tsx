"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const routes = ["/", "/products", "/projects"]; 
// định nghĩa thứ tự nav để biết trái/phải

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const index = routes.indexOf(pathname); // vị trí route hiện tại

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={index}>
      <motion.div
        key={pathname}
        custom={index}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}