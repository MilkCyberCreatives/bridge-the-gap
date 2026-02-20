"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
          }
          aria-label="Scroll to top"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="btn-water fixed bottom-6 right-6 z-[90] grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-[rgb(var(--brand))] text-white shadow-lg shadow-black/15"
        >
          <motion.span
            animate={reduceMotion ? {} : { y: [0, -2, 0] }}
            transition={reduceMotion ? {} : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
