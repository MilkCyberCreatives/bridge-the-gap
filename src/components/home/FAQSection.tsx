"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const FAQS = [
  {
    q: "Do you only provide tutoring?",
    a: "No. Tutoring is one service area. We also provide matric support, teacher professional development, and coaching services.",
  },
  {
    q: "Which curricula do you support?",
    a: "We support subjects and focus areas across CAPS and IB curricula.",
  },
  {
    q: "Can schools request group tutoring interventions?",
    a: "Yes. Group tutoring is available as part of school intervention programmes and can be scoped with school leaders.",
  },
  {
    q: "Can bookings sync with the Londiwe email calendar?",
    a: "Yes. The booking flow supports calendar availability checks when Google Calendar credentials are configured in Vercel.",
  },
  {
    q: "Where are you based?",
    a: "Kempton Park, Birchleigh North. Online and in-person options are available depending on the programme.",
  },
];

export default function FAQSection() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common Questions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
            Practical answers about services, booking, and delivery.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={faq.q}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mb-3 rounded-3xl border border-border bg-white/75 backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-extrabold tracking-tight text-black/85 sm:text-base">
                    {faq.q}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/80">
                    {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={reduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-sm leading-relaxed text-black/70 sm:px-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
