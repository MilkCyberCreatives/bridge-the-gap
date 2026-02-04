"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Which grades do you support?",
    a: "We support learners from Grade R to Grade 12, including subject support, study skills, and exam preparation aligned to South African standards.",
  },
  {
    q: "Do you support both CAPS and IEB?",
    a: "Yes. Our tutoring support is aligned to CAPS and IEB requirements, with a focus on clarity, confidence, and measurable progress.",
  },
  {
    q: "Do you offer matric rewrite support?",
    a: "Yes. We assist with structured matric rewrite preparation, study plans, and targeted practice to improve results.",
  },
  {
    q: "How do I book a consultation?",
    a: "Use the consultation form below or contact us on WhatsApp. We’ll confirm your learner’s needs and recommend the best programme and support plan.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  const wrap = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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
            Frequently Asked Questions
          </motion.p>

          <motion.h2
            variants={item}
            className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Quick Answers Before You Book
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70"
          >
            Clean, clear guidance — so you can move forward with confidence.
          </motion.p>
        </motion.div>

        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={faq.q}
                variants={item}
                whileHover={reduceMotion ? {} : { y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="water-hover mb-3 rounded-3xl border border-border bg-white/70 backdrop-blur-xl"
                onMouseMove={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  const r = el.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  el.style.setProperty("--x", `${x}%`);
                  el.style.setProperty("--y", `${y}%`);
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-extrabold tracking-tight text-black/85 sm:text-base">
                    {faq.q}
                  </span>

                  <motion.span
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/70"
                    animate={reduceMotion ? {} : { rotate: isOpen ? 0 : 0 }}
                    whileHover={reduceMotion ? {} : { scale: 1.03 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 text-sm leading-relaxed text-black/70 sm:px-6">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
