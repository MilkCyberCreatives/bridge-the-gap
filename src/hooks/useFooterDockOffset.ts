"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

export function useFooterDockOffset(basePx: number): CSSProperties {
  const [offsetPx, setOffsetPx] = useState(basePx);

  useEffect(() => {
    let rafId = 0;

    const updateOffset = () => {
      const footer = document.getElementById("site-footer");
      if (!footer) {
        setOffsetPx(basePx);
        return;
      }

      const rect = footer.getBoundingClientRect();
      const overlap = Math.max(0, window.innerHeight - rect.top);
      const next = Math.round(basePx + overlap);
      setOffsetPx((prev) => (prev === next ? prev : next));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [basePx]);

  return useMemo(
    () => ({
      bottom: `calc(${offsetPx}px + env(safe-area-inset-bottom))`,
    }),
    [offsetPx]
  );
}
