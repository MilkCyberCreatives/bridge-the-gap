"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function ProgrammesCTASection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full pb-16 sm:pb-20">
      <div className="container-tight">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="water-hover rounded-[28px] border border-border bg-white/65 p-8 text-center backdrop-blur-xl sm:p-10"
        >
          <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Not sure which programme is best?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-black/70">
            Book a free consultation and we’ll recommend the right plan based on your learner’s grade,
            subjects, goals, and timeline.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 py-4 text-sm font-extrabold text-white"
            >
              Book Free Consultation
            </Link>

            <Link
              href="/insights"
              className="water-hover inline-flex items-center justify-center rounded-full border border-border bg-white/70 px-8 py-4 text-sm font-extrabold text-black/80"
            >
              Read Insights
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
