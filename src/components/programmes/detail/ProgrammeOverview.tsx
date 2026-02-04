"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ProgrammeOverview({
  heading,
  intro,
  bullets,
}: {
  heading: string;
  intro: string;
  bullets: string[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start"
        >
          <div>
            <p className="text-xs font-semibold tracking-wide text-black/55">Programme Overview</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{heading}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70">{intro}</p>
          </div>

          <div className="water-hover rounded-3xl border border-border bg-white/65 p-6 backdrop-blur-xl">
            <p className="text-sm font-extrabold tracking-tight text-black/85">
              What you can expect
            </p>

            <ul className="mt-4 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-black/70">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-[rgb(var(--brand))]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
