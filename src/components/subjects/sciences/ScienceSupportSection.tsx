"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function ScienceSupportSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] border border-border bg-white/70 p-8 backdrop-blur-xl sm:p-10"
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06), transparent 55%), radial-gradient(circle at 80% 20%, rgba(250,78,27,0.14), transparent 55%)",
            }}
          />

          <div className="relative">
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              ready to improve science results?
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70">
              We’ll recommend the right plan based on grade, curriculum, and the learner’s goals.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-water inline-flex h-12 items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 text-sm font-extrabold text-white"
              >
                book a consultation
              </Link>

              <Link
                href="/request-a-subject"
                className="water-hover inline-flex h-12 items-center justify-center rounded-full border border-border bg-white/70 px-8 text-sm font-extrabold text-black/75 backdrop-blur-xl"
              >
                request a subject
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
