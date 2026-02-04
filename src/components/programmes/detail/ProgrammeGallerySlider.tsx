"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProgrammeGallerySlider({
  title = "Gallery",
  images,
}: {
  title?: string;
  images: { src: string; alt: string }[];
}) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const total = images.length;

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const target = children[idx];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const next = () => {
    const idx = Math.min(active + 1, total - 1);
    setActive(idx);
    scrollToIndex(idx);
  };

  const prev = () => {
    const idx = Math.max(active - 1, 0);
    setActive(idx);
    scrollToIndex(idx);
  };

  const dots = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  return (
    <section className="relative w-full pb-16 sm:pb-20">
      <div className="container-tight">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-black/55">Visuals</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70">
                Swipe on mobile or use the arrows to browse. Clean, premium, and fast.
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                className="btn-water inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-black/70" />
              </button>
              <button
                type="button"
                onClick={next}
                className="btn-water inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-black/70" />
              </button>
            </div>
          </div>

          {/* slider */}
          <div className="mt-8">
            <div
              ref={scrollerRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onScroll={(e) => {
                const el = e.currentTarget;
                const idx = Math.round(el.scrollLeft / Math.max(el.clientWidth * 0.86, 1));
                const safe = Math.max(0, Math.min(total - 1, idx));
                setActive(safe);
              }}
            >
              {images.map((img, i) => (
                <div
                  key={img.src}
                  className="water-hover relative min-w-[86%] snap-start overflow-hidden rounded-3xl border border-border bg-white/65 backdrop-blur-xl sm:min-w-[520px]"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 520px"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <p className="text-sm font-extrabold text-black/80">{img.alt}</p>
                    <p className="text-xs text-black/55">
                      {i + 1} / {total}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {dots.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    scrollToIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-[rgb(var(--brand))]" : "w-2.5 bg-black/15"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* mobile arrows */}
            <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={prev}
                className="btn-water inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-black/70" />
              </button>
              <button
                type="button"
                onClick={next}
                className="btn-water inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-black/70" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
