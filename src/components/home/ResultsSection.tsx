"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

function useCountUp(target: number, start: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const t0 = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, start, durationMs]);

  return value;
}

export default function ResultsSection() {
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: EASE_OUT, },
        },
  };

  const c1 = useCountUp(3, inView, 850);
  const c2 = useCountUp(7, inView, 900);
  const c3 = useCountUp(12, inView, 950);
  const c4 = useCountUp(24, inView, 1000);

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          onViewportEnter={() => setInView(true)}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={item} className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-black/55">
              Results
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Progress You Can Feel
            </h2>
            <p className="mt-3 text-base leading-relaxed text-black/70">
              We focus on consistency, structured practice and feedback — so
              learners improve step by step, with confidence.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: c1, suffix: "+", label: "Core learning steps", hint: "Assess • Teach • Track" },
              { n: c2, suffix: "", label: "Weekly support rhythm", hint: "Consistency builds results" },
              { n: c3, suffix: "+", label: "Key subject focus areas", hint: "Target weak points" },
              { n: c4, suffix: "h", label: "Study habit building", hint: "Small wins add up" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={item}
                className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl"
                whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
              >
                <p className="text-sm font-semibold text-black/70">{s.label}</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-black">
                  {s.n}
                  <span className="text-black/70">{s.suffix}</span>
                </p>
                <p className="mt-2 text-sm text-black/60">{s.hint}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={item}
            className="mt-10 rounded-3xl border border-border bg-white/65 p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border border-border bg-white/75 p-2 backdrop-blur">
                  <TrendingUp className="h-5 w-5 text-[rgb(var(--brand))]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black/80">
                    Want a structured improvement plan?
                  </p>
                  <p className="mt-1 text-sm text-black/65">
                    We’ll recommend a practical plan aligned to your grade and subject.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="btn-water inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(var(--brand))] px-6 py-3 text-sm font-extrabold text-white"
              >
                Book Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
