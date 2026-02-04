"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      // if page is scrollable, this will change
      setShow(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Scroll to top"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16, scale: 0.94 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={reduceMotion ? {} : { y: -2 }}
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
          className="btn-water fixed bottom-6 right-6 z-[999] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white backdrop-blur-xl shadow-[0_14px_45px_rgba(0,0,0,0.35)]"
          onMouseMove={(e) => {
            // ✅ makes ::before water effect follow cursor using your CSS
            const el = e.currentTarget;
            const r = el.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            el.style.setProperty("--x", `${x}%`);
            el.style.setProperty("--y", `${y}%`);
          }}
        >
          {/* subtle pulse ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />

          {/* brand glow */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            animate={reduceMotion ? {} : { opacity: [0.16, 0.32, 0.16] }}
            transition={reduceMotion ? {} : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(250,78,27,0.30), transparent 55%)",
            }}
          />

          <ArrowUp className="relative h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
