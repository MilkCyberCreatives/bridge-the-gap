"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress =
        scrollHeight <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / scrollHeight));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[90] h-1" aria-hidden>
      <div
        ref={barRef}
        className="h-full origin-left bg-[rgb(var(--brand))] transition-[transform] duration-100 ease-out"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
