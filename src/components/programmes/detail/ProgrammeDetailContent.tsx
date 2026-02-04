"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CheckCircle } from "lucide-react";

type Item = { title: string; desc: string };
type Faq = { q: string; a: string };

export default function ProgrammeDetailContent({
  introTitle,
  introText,
  highlights,
  includes,
  gallery,
  faqs,
}: {
  introTitle: string;
  introText: string;
  highlights: Item[];
  includes: Item[];
  gallery: { src: string; alt: string }[];
  faqs: Faq[];
}) {
  const reduceMotion = useReducedMotion();

  const wrap: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.03 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        {/* Intro */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={wrap}
          className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]"
        >
          <motion.div variants={item}>
            <p className="text-xs font-semibold tracking-wide text-black/55">
              Programme Overview
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {introTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-black/70">
              {introText}
            </p>

            <div className="mt-6 space-y-4">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="water-hover flex items-start gap-3 rounded-3xl border border-border bg-white/65 p-5 backdrop-blur-xl"
                >
                  <CheckCircle className="mt-1 h-5 w-5 text-[rgb(var(--brand))]" />
                  <div>
                    <p className="font-extrabold text-black/85">{h.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-black/70">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Included */}
          <motion.div variants={item} className="md:pt-7">
            <div className="water-hover rounded-3xl border border-border bg-white/65 p-6 backdrop-blur-xl">
              <p className="text-sm font-extrabold tracking-tight text-black/85">
                What’s Included
              </p>
              <div className="mt-4 space-y-3">
                {includes.map((x) => (
                  <div key={x.title} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[rgb(var(--brand))]" />
                    <div>
                      <p className="text-sm font-extrabold text-black/85">
                        {x.title}
                      </p>
                      <p className="mt-1 text-sm text-black/70">{x.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* mini note */}
            <div className="mt-4 rounded-3xl border border-border bg-white/45 p-6 text-sm text-black/70 backdrop-blur-xl">
              We align to CAPS &amp; IEB outcomes and focus on steady improvement
              with clear feedback.
            </div>
          </motion.div>
        </motion.div>

        {/* Sliding gallery */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
          className="mt-10"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-black/55">
                In Action
              </p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
                A premium learning experience
              </h3>
            </div>
            <p className="hidden text-sm text-black/55 sm:block">Swipe / drag</p>
          </div>

          <motion.div drag="x" dragConstraints={{ left: -260, right: 0 }} className="mt-5 flex gap-4 overflow-hidden">
            {gallery.map((g) => (
              <div
                key={g.src}
                className="water-hover relative h-[220px] min-w-[280px] overflow-hidden rounded-3xl border border-border bg-white/65 backdrop-blur-xl sm:min-w-[340px]"
              >
                <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="340px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ mini */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={wrap}
          className="mt-12"
        >
          <motion.div variants={item} className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-wide text-black/55">
              Programme FAQ
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Quick answers
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Clear guidance before you book.
            </p>
          </motion.div>

          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <motion.div
                key={f.q}
                variants={item}
                className="water-hover rounded-3xl border border-border bg-white/65 p-6 backdrop-blur-xl"
              >
                <p className="text-sm font-extrabold text-black/85">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
