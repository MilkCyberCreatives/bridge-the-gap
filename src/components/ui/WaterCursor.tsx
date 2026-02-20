"use client";

import { useEffect, useRef, useState } from "react";

function findInteractiveElement(node: EventTarget | null): HTMLElement | null {
  if (!(node instanceof HTMLElement)) return null;
  return node.closest(
    "a, button, input, textarea, select, summary, [role='button'], .btn-water, .water-hover"
  );
}

export default function WaterCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const supportsDesktopCursor = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    setEnabled(supportsDesktopCursor);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let hover = false;
    let pressed = false;

    const updateCursor = (x: number, y: number) => {
      dot.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0) scale(${
        pressed ? 0.9 : hover ? 1.12 : 1
      })`;
      ring.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0) scale(${
        pressed ? 0.85 : hover ? 1.28 : 1
      }) rotateY(${hover ? 180 : 0}deg)`;
      ring.style.opacity = hover ? "0.92" : "0.7";
    };

    const onMouseMove = (event: MouseEvent) => {
      const interactive = findInteractiveElement(event.target);
      hover = Boolean(interactive);
      updateCursor(event.clientX, event.clientY);

      if (interactive) {
        const bounds = interactive.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        interactive.style.setProperty("--x", `${Math.max(0, Math.min(100, x))}%`);
        interactive.style.setProperty("--y", `${Math.max(0, Math.min(100, y))}%`);
      }
    };

    const onMouseDown = () => {
      pressed = true;
    };

    const onMouseUp = () => {
      pressed = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] h-9 w-9 rounded-full border border-brand/60 bg-brand/10 shadow-glow transition-transform duration-150 will-change-transform"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[121] h-2 w-2 rounded-full bg-brand transition-transform duration-75 will-change-transform"
        aria-hidden
      />
    </>
  );
}
