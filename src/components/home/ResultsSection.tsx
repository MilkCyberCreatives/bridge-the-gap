"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { QUICK_STATS, TARGET_AUDIENCES } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

export default function ResultsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
              Who We Serve
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built for school leaders, parents, and learners.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-black/70">
              Group tutoring is included as part of school intervention programmes.
              This helps schools scale academic support while still giving learners
              structured guidance and measurable progress.
            </p>
            <Link
              href="/programmes/tutoring-services"
              className="btn-water mt-6 inline-flex rounded-full bg-[rgb(var(--brand))] px-6 py-3 text-sm font-extrabold text-white"
            >
              View Tutoring and School Intervention
            </Link>
          </motion.div>

          <div className="space-y-4">
            {TARGET_AUDIENCES.map((audience) => (
              <motion.article
                key={audience.title}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE_OUT }}
                className="water-hover rounded-3xl border border-border bg-white/75 p-5 backdrop-blur-xl sm:p-6"
              >
                <h3 className="text-lg font-extrabold tracking-tight text-black/85">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{audience.summary}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="water-hover rounded-2xl border border-border bg-white/75 p-5 text-center backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-black/55">{stat.label}</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-black/85">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
