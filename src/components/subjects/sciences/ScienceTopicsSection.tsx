"use client";

import { motion, useReducedMotion } from "framer-motion";

const TOPICS = [
  {
    title: "matter & materials",
    desc: "properties of materials, changes of state, mixtures, and everyday applications.",
  },
  {
    title: "energy & change",
    desc: "heat, electricity, forces and motion — simplified with examples and practice questions.",
  },
  {
    title: "life & living",
    desc: "basic systems, cells and processes (aligned to grade level and curriculum).",
  },
  {
    title: "earth & beyond",
    desc: "weather, climate, planet earth concepts, and understanding key terms clearly.",
  },
];

export default function ScienceTopicsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wide text-black/55">
            what we cover
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            key topics learners commonly struggle with
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
            We break complex ideas into clear steps and reinforce them with exam-style
            practice.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {TOPICS.map((t) => (
            <motion.div
              key={t.title}
              variants={{
                hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
                show: reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl"
            >
              <p className="text-base font-extrabold tracking-tight text-black/85">
                {t.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/70">{t.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
