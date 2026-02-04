"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      // show after a bit of scrolling
      setShow(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollTop}
          aria-label="Scroll to top"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={[
            // ✅ right side placement + always above footer
            "fixed bottom-6 right-6 z-[80]",
            // ✅ premium shape
            "h-12 w-12 rounded-full",
            // ✅ ORANGE brand (not black)
            "bg-[rgb(var(--brand))] text-white",
            // ✅ water effect
            "btn-water",
            // ✅ subtle border/shadow for clarity on light/dark areas
            "border border-white/15 shadow-lg shadow-black/10",
            // ✅ tap target
            "grid place-items-center",
          ].join(" ")}
        >
          <motion.span
            aria-hidden
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, -2, 0],
                  }
            }
            transition={
              reduceMotion ? {} : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            }
            className="grid place-items-center"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
