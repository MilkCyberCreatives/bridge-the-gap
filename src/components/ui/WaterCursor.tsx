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
  const RING_SIZE = 34;
  const DOT_SIZE = 8;

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
      dot.style.transform = `translate3d(${x - DOT_SIZE / 2}px, ${y - DOT_SIZE / 2}px, 0) scale(${
        pressed ? 0.9 : hover ? 1.12 : 1
      })`;
      ring.style.transform = `translate3d(${x - RING_SIZE / 2}px, ${y - RING_SIZE / 2}px, 0) scale(${
        pressed ? 0.88 : hover ? 1.22 : 1
      }) rotate(${hover ? 16 : 0}deg)`;
      ring.style.opacity = hover ? "0.94" : "0.75";
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
        className="cursor-ring-animate pointer-events-none fixed left-0 top-0 z-[120] rounded-full border transition-transform duration-150 will-change-transform"
        style={{
          width: `${RING_SIZE}px`,
          height: `${RING_SIZE}px`,
          borderColor: "rgb(var(--brand) / 0.7)",
          backgroundColor: "rgb(var(--brand) / 0.12)",
          boxShadow: "0 0 0 1px rgb(var(--brand) / 0.15)",
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="cursor-dot-animate pointer-events-none fixed left-0 top-0 z-[121] rounded-full transition-transform duration-75 will-change-transform"
        style={{
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          backgroundColor: "rgb(var(--brand))",
          boxShadow: "0 0 12px rgb(var(--brand) / 0.55)",
        }}
        aria-hidden
      />
    </>
  );
}
