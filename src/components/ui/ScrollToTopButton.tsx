"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(media.matches);
    updateMotion();

    const onScroll = () => setVisible(window.scrollY > 1);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener?.("change", updateMotion);

    return () => {
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener?.("change", updateMotion);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
      }
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        left: "auto",
        right: "24px",
        bottom: "120px",
        width: "48px",
        height: "48px",
        borderRadius: "9999px",
        zIndex: 140,
      }}
      className={`btn-water grid place-items-center border border-transparent bg-[rgb(var(--brand))] text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition-all duration-200 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
