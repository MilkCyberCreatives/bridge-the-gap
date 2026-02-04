"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function ScienceOverviewSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight grid items-center gap-8 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold tracking-wide text-black/55">
            subject focus
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            science made simple and practical
          </h2>
          <p className="mt-3 text-base leading-relaxed text-black/70">
            We help learners understand key concepts, apply them in tests, and build
            consistent study habits. Lessons are structured, paced, and aligned to the
            learner’s grade and curriculum.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "clear concept explanations",
              "practical exam-style practice",
              "study plans & revision techniques",
              "confidence + marks improvement",
            ].map((t) => (
              <div
                key={t}
                className="water-hover rounded-2xl border border-border bg-white/70 px-5 py-4 text-sm font-semibold text-black/75 backdrop-blur-xl"
              >
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-white/60 backdrop-blur-xl"
        >
          <div className="relative aspect-[16/11] w-full">
            <Image
              src="/images/subjects/science.jpg"
              alt="science support"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
