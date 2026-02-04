"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function RequestSubjectFormSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wide text-black/55">
            learner support request
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            what subject do you need help with?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
            Share the grade, subject, and what the learner is struggling with — we’ll
            guide you to the right programme.
          </p>
        </div>

        <motion.form
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
          className="mx-auto mt-10 w-full max-w-5xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="parent / guardian name"
              name="guardianName"
            />
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="contact number (whatsapp preferred)"
              name="phone"
            />

            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="email address"
              name="email"
              type="email"
            />
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="learner grade (e.g. grade 7 / grade 12)"
              name="grade"
            />

            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20 md:col-span-2"
              placeholder="subject requested (e.g. maths, english, science)"
              name="subject"
            />

            <textarea
              className="water-hover min-h-[150px] w-full rounded-3xl border border-border bg-white/70 px-5 py-4 text-sm outline-none placeholder:text-black/45 focus:border-black/20 md:col-span-2"
              placeholder="briefly describe the learner’s needs (goals, challenges, exam date, etc.)"
              name="message"
            />
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="submit"
              className="btn-water inline-flex h-12 items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 text-sm font-extrabold text-white"
            >
              submit request
            </button>

            <p className="text-xs text-black/55">
              we’ll respond within business hours. your details stay private.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
