"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Briefcase, LineChart, School } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

const TRUST_POINTS = [
  {
    title: "Multi-service delivery capability",
    description:
      "One provider for tutoring, matric support, teacher development, and coaching.",
    Icon: Briefcase,
  },
  {
    title: "Curriculum aware implementation",
    description:
      "Programmes and support plans are aligned to CAPS and IB expectations.",
    Icon: School,
  },
  {
    title: "Measurable progress framework",
    description:
      "Interventions include milestone tracking, feedback loops, and adjustment cycles.",
    Icon: LineChart,
  },
  {
    title: "Professional service standard",
    description:
      "Clear communication, documented processes, and dependable response timelines.",
    Icon: BadgeCheck,
  },
];

export default function WhyChooseSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="rounded-[30px] border border-slate-800 bg-[#111827] px-7 py-10 sm:px-10">
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, ease: EASE_OUT }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              Positioning
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Positioned as an education support and professional development provider.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              The website language and structure reflect the complete operating model,
              with a premium but practical presentation.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <motion.article
                key={point.title}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="water-hover rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-2">
                    <point.Icon className="h-5 w-5 text-[rgb(var(--brand-2))]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold tracking-tight text-white/95">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/about"
              className="btn-water inline-flex rounded-full bg-[rgb(var(--brand))] px-7 py-3 text-sm font-bold text-white"
            >
              Read About Bridge The Gap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
