"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { HOME_FAQS } from "@/data/faqs";

export default function FAQSection() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-[url('/images/how-it-works.webp')] bg-cover bg-center opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,246,250,0.62),rgba(243,246,250,0.82))]" />

      <div className="container-tight relative z-10">
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
          {HOME_FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={faq.question}
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
                    {faq.question}
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
                        {faq.answer}
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
