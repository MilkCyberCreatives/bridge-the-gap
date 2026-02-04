"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.2, delayChildren: 0.15 },
    },
  };

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 40, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          },
        },
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/how-it-works.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

      {/* Content */}
      <div className="relative z-10">
        <div className="container-tight py-24 sm:py-32">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.p
              variants={item}
              className="text-sm font-semibold uppercase tracking-wide text-white/70"
            >
              How It Works
            </motion.p>

            <motion.h2
              variants={item}
              className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Simple. Structured. Results-Driven.
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-4 text-base leading-relaxed text-white/85"
            >
              Our tutoring process is designed to support learners step by step,
              build confidence, and deliver measurable academic improvement —
              aligned to CAPS and IEB standards.
            </motion.p>

            {/* Steps */}
            <motion.div
              variants={container}
              className="mt-10 space-y-5"
            >
              {[
                {
                  title: "Assessment & Consultation",
                  desc: "We assess the learner’s current level and identify gaps through a structured consultation.",
                },
                {
                  title: "Focused Tutoring Programme",
                  desc: "Learners receive targeted subject support aligned to their grade and curriculum.",
                },
                {
                  title: "Progress Tracking & Feedback",
                  desc: "Ongoing feedback ensures improvement, confidence, and academic growth.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="flex items-start gap-4"
                >
                  <CheckCircle className="mt-1 h-6 w-6 text-[rgb(var(--brand))]" />
                  <div>
                    <p className="font-bold text-white">{step.title}</p>
                    <p className="mt-1 text-sm text-white/80">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={item} className="mt-10">
              <Link
                href="/contact"
                className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 py-4 text-sm font-extrabold text-white"
              >
                Book Free Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
