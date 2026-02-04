"use client";

import { useEffect } from "react";

export default function WaterHoverProvider() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest(".btn-water, .water-hover") as HTMLElement | null;
      if (!el) return;

      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;

      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;

      el.style.setProperty("--x", `${x}%`);
      el.style.setProperty("--y", `${y}%`);
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return null;
}
