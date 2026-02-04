"use client";

import { motion, useReducedMotion } from "framer-motion";

const TOPICS = [
  { title: "matter & materials", desc: "properties, changes, and real-world examples." },
  { title: "energy & change", desc: "heat, electricity, forces, and motion basics." },
  { title: "life & living", desc: "systems, cells, and life processes (grade dependent)." },
  { title: "earth & beyond", desc: "weather, climate, and our planet in context." },
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
            key science topics learners struggle with
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
            We break complex ideas into clear steps and reinforce with practice.
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
                hidden: reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 },
                show: reduceMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
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
