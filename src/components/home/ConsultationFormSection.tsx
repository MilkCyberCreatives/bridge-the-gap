"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function ConsultationFormSection() {
  const reduceMotion = useReducedMotion();

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 18, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.75, ease: EASE_OUT },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold tracking-wide text-black/55"
          >
            Book A Free Consultation
          </motion.p>

          <motion.h2
            variants={item}
            className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Tell Us What Support You Need
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70"
          >
            Share a few details and we’ll respond with the best tutoring plan for
            your learner.
          </motion.p>
        </motion.div>

        <motion.form
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: EASE_OUT,
          }}
          className="mx-auto mt-10 w-full max-w-5xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Parent / Guardian Name"
              name="guardianName"
            />
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Contact Number (WhatsApp preferred)"
              name="phone"
            />
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Email Address"
              name="email"
              type="email"
            />
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Learner Grade (e.g. Grade 7 / Grade 12)"
              name="grade"
            />
            <input
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20 md:col-span-2"
              placeholder="Subjects Needed (e.g. Maths, English, Physical Sciences)"
              name="subjects"
            />
            <textarea
              className="water-hover min-h-[140px] w-full rounded-3xl border border-border bg-white/70 px-5 py-4 text-sm outline-none placeholder:text-black/45 focus:border-black/20 md:col-span-2"
              placeholder="Briefly describe the learner’s needs (goals, challenges, exam date, etc.)"
              name="message"
            />
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="submit"
              className="btn-water inline-flex h-12 items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 text-sm font-extrabold text-white"
            >
              Submit Consultation Request
            </button>

            <p className="text-xs text-black/55">
              We’ll respond within business hours. Your details stay private.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
