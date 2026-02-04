"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ConsultationFormSection() {
  const reduceMotion = useReducedMotion();

  const wrap = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={item} className="text-xs font-semibold tracking-wide text-black/55">
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
            Share a few details and we’ll respond with the best tutoring plan for your learner.
          </motion.p>
        </motion.div>

        <motion.form
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="mx-auto mt-10 w-full max-w-5xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <motion.input
              variants={item}
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Parent / Guardian Name"
              name="guardianName"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
            />

            <motion.input
              variants={item}
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Contact Number (WhatsApp preferred)"
              name="phone"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
            />

            <motion.input
              variants={item}
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Email Address"
              name="email"
              type="email"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
            />

            <motion.input
              variants={item}
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
              placeholder="Learner Grade (e.g. Grade 7 / Grade 12)"
              name="grade"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
            />

            <motion.input
              variants={item}
              className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20 md:col-span-2"
              placeholder="Subjects Needed (e.g. Maths, English, Physical Sciences)"
              name="subjects"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
            />

            <motion.textarea
              variants={item}
              className="water-hover min-h-[140px] w-full rounded-3xl border border-border bg-white/70 px-5 py-4 text-sm outline-none placeholder:text-black/45 focus:border-black/20 md:col-span-2"
              placeholder="Briefly describe the learner’s needs (goals, challenges, exam date, etc.)"
              name="message"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
            />
          </div>

          <motion.div
            variants={item}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              type="submit"
              className="btn-water inline-flex h-12 items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 text-sm font-extrabold text-white"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                el.style.setProperty("--x", `${x}%`);
                el.style.setProperty("--y", `${y}%`);
              }}
            >
              Submit Consultation Request
            </button>

            <p className="text-xs text-black/55">
              We’ll respond within business hours. Your details stay private.
            </p>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
