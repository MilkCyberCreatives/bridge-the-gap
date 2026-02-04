"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

type Props = {
  introTitle: string;
  introText: string;
  outcomes: { title: string; desc: string }[];
  topics: string[];
  support: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  images: { src: string; alt: string }[];
};

export default function SubjectDetailContent({
  introTitle,
  introText,
  outcomes,
  topics,
  support,
  faqs,
  images,
}: Props) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);

  const railScroll = (dir: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section className="relative w-full py-14 sm:py-16">
      <div className="container-tight">
        {/* Intro */}
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold tracking-wide text-black/55">Subject Support</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{introTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">{introText}</p>
        </motion.div>

        {/* Outcomes */}
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {outcomes.map((o) => (
            <div
              key={o.title}
              className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl"
            >
              <p className="text-sm font-extrabold tracking-tight text-black/85">{o.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/70">{o.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Topics + Support */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
            className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl"
          >
            <p className="text-sm font-extrabold tracking-tight text-black/85">Key topics we support</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-black/70">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-[rgb(var(--brand))]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
            className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl"
          >
            <p className="text-sm font-extrabold tracking-tight text-black/85">How we support learners</p>
            <div className="mt-4 space-y-4">
              {support.map((s) => (
                <div key={s.title} className="rounded-2xl border border-border bg-white/50 p-4">
                  <p className="text-sm font-extrabold text-black/85">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-black/70">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sliding Gallery */}
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
          className="mt-10"
        >
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-black/55">Gallery</p>
              <p className="mt-1 text-lg font-extrabold tracking-tight text-black/85">Support in action</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => railScroll("left")}
                className="btn-water inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70"
                aria-label="Previous"
              >
                <ArrowLeft className="h-4 w-4 text-black/75" />
              </button>
              <button
                type="button"
                onClick={() => railScroll("right")}
                className="btn-water inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70"
                aria-label="Next"
              >
                <ArrowRight className="h-4 w-4 text-black/75" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {images.map((img) => (
              <div
                key={img.src}
                className="water-hover relative min-w-[85%] snap-center overflow-hidden rounded-3xl border border-border bg-white/60 backdrop-blur-xl sm:min-w-[60%] lg:min-w-[40%]"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-extrabold tracking-tight text-black/85">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mini FAQ */}
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <p className="text-center text-xs font-semibold tracking-wide text-black/55">FAQ</p>
          <h3 className="mt-2 text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
            Quick answers
          </h3>

          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl"
              >
                <p className="text-sm font-extrabold tracking-tight text-black/85">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{f.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* hide scrollbar (nice & clean) */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
