"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, CheckCircle2, Send } from "lucide-react";

export default function RequestSubjectFormSection() {
  const reduceMotion = useReducedMotion();

  const wrap = {
    hidden: {},
    show: {
      transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: "easeOut" },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start"
        >
          {/* Left info card */}
          <motion.div variants={item} className="relative">
            <div className="water-hover rounded-[28px] border border-border bg-white/70 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/70">
                  <BookOpen className="h-5 w-5 text-[rgb(var(--brand))]" />
                </span>
                <div>
                  <p className="text-sm font-extrabold tracking-tight text-black/85">
                    request a subject
                  </p>
                  <p className="text-sm text-black/60">
                    we’ll confirm availability and advise the best plan.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-black/70">
                {[
                  "Tell us the subject and grade (e.g. Grade 10 Physical Sciences).",
                  "Share what the learner struggles with and your target marks.",
                  "We reply with a clear tutoring recommendation and next steps.",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-[rgb(var(--brand))]" />
                    <p className="leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-white/60 p-5">
                <p className="text-xs font-extrabold tracking-wide text-black/60">
                  quick note
                </p>
                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  If your request is urgent (upcoming test/exam), mention the date in your message
                  so we can prioritise the right support.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div variants={item}>
            <div className="rounded-[28px] border border-border bg-white/70 p-6 backdrop-blur-xl sm:p-8">
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wide text-black/55">
                  subject request form
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
                  tell us what you need
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-black/70">
                  Fill in the details below and we’ll get back to you with the best tutoring option.
                </p>
              </div>

              <motion.form
                variants={wrap}
                initial="hidden"
                animate="show"
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 grid gap-4"
              >
                <motion.div variants={item} className="grid gap-4 md:grid-cols-2">
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
                    placeholder="Learner Grade (e.g. Grade 7)"
                    name="grade"
                  />
                </motion.div>

                <motion.div variants={item} className="grid gap-4 md:grid-cols-2">
                  <input
                    className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20 md:col-span-2"
                    placeholder="Subject Requested (e.g. Life Sciences / Accounting)"
                    name="subject"
                  />

                  <input
                    className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
                    placeholder="Curriculum (CAPS / IEB)"
                    name="curriculum"
                  />

                  <input
                    className="water-hover h-12 w-full rounded-full border border-border bg-white/70 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
                    placeholder="Preferred Format (Online / In-person)"
                    name="format"
                  />
                </motion.div>

                <motion.div variants={item}>
                  <textarea
                    className="water-hover min-h-[160px] w-full rounded-3xl border border-border bg-white/70 px-5 py-4 text-sm outline-none placeholder:text-black/45 focus:border-black/20"
                    placeholder="Tell us what the learner needs help with (topics, challenges, test/exam date, goals, etc.)"
                    name="message"
                  />
                </motion.div>

                <motion.div variants={item} className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="submit"
                    className="btn-water inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[rgb(var(--brand))] px-8 text-sm font-extrabold text-white"
                  >
                    <Send className="h-4 w-4" />
                    submit request
                  </button>

                  <p className="text-xs text-black/55">
                    We’ll respond within business hours. Your details stay private.
                  </p>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
