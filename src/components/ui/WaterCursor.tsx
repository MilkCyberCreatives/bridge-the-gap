"use client";

import { useEffect, useRef, useState } from "react";

function isInteractiveElement(node: EventTarget | null): HTMLElement | null {
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
    const supportsDesktopCursor =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(supportsDesktopCursor);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    let rafId = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let hover = false;
    let pressed = false;
    let rotation = 0;

    const animate = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      rotation += hover ? 8 : 3;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0) scale(${
          pressed ? 0.8 : hover ? 1.15 : 1
        })`;
      }

      if (ringRef.current) {
        const scale = pressed ? 0.82 : hover ? 1.45 : 1;
        const flip = hover ? 180 : 0;
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${
          ringY - 18
        }px, 0) scale(${scale}) rotate(${rotation}deg) rotateY(${flip}deg)`;
        ringRef.current.style.opacity = hover ? "0.95" : "0.72";
      }

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;

      const interactive = isInteractiveElement(event.target);
      hover = Boolean(interactive);

      if (interactive) {
        const bounds = interactive.getBoundingClientRect();
        const relativeX = ((event.clientX - bounds.left) / bounds.width) * 100;
        const relativeY = ((event.clientY - bounds.top) / bounds.height) * 100;
        interactive.style.setProperty("--x", `${Math.max(0, Math.min(100, relativeX))}%`);
        interactive.style.setProperty("--y", `${Math.max(0, Math.min(100, relativeY))}%`);
      }
    };

    const onMouseDown = () => {
      pressed = true;
    };

    const onMouseUp = () => {
      pressed = false;
    };

    const onMouseLeave = () => {
      hover = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        hover = false;
        pressed = false;
      }
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseout", onMouseLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseout", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] h-9 w-9 rounded-full border border-brand/60 bg-brand/10 shadow-glow will-change-transform"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[121] h-2 w-2 rounded-full bg-brand will-change-transform"
        aria-hidden
      />
    </>
  );
}
