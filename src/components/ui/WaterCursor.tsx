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
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnabled(media.matches);

    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let hover = false;
    let pressed = false;
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTarget: EventTarget | null = null;
    let hasPointer = false;

    const renderCursor = () => {
      frameId = 0;
      if (!hasPointer) return;

      const interactive = findInteractiveElement(pointerTarget);
      hover = Boolean(interactive);

      dot.style.transform = `translate3d(${pointerX - DOT_SIZE / 2}px, ${
        pointerY - DOT_SIZE / 2
      }px, 0) scale(${pressed ? 0.9 : hover ? 1.12 : 1})`;
      ring.style.transform = `translate3d(${pointerX - RING_SIZE / 2}px, ${
        pointerY - RING_SIZE / 2
      }px, 0) scale(${pressed ? 0.88 : hover ? 1.22 : 1}) rotate(${hover ? 16 : 0}deg)`;
      ring.style.opacity = hover ? "0.94" : "0.75";

      if (interactive) {
        const bounds = interactive.getBoundingClientRect();
        if (bounds.width > 0 && bounds.height > 0) {
          const x = ((pointerX - bounds.left) / bounds.width) * 100;
          const y = ((pointerY - bounds.top) / bounds.height) * 100;
          interactive.style.setProperty("--x", `${Math.max(0, Math.min(100, x))}%`);
          interactive.style.setProperty("--y", `${Math.max(0, Math.min(100, y))}%`);
        }
      }
    };

    const scheduleRender = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(renderCursor);
    };

    const onMouseMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerTarget = event.target;
      hasPointer = true;
      scheduleRender();
    };

    const onMouseDown = () => {
      pressed = true;
      scheduleRender();
    };

    const onMouseUp = () => {
      pressed = false;
      scheduleRender();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (frameId) window.cancelAnimationFrame(frameId);
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
