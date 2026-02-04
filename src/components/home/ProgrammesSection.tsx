"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  BookOpenCheck,
  UserRoundCog,
  ArrowRight,
} from "lucide-react";

const items = [
  {
    title: "Learner Support",
    subtitle: "Grade R–12 tutoring aligned to CAPS & IEB",
    points: ["Homework & class support", "Tests & exam preparation", "Confidence + study habits"],
    href: "/programmes/learner-support",
    Icon: GraduationCap,
  },
  {
    title: "Matric Support",
    subtitle: "Matric rewrite and results improvement",
    points: ["Revision plans & past papers", "Subject support & focus areas", "Structured progress tracking"],
    href: "/programmes/matric-support",
    Icon: BookOpenCheck,
  },
  {
    title: "Educator Development",
    subtitle: "Teacher coaching and development support",
    points: ["Workshops & coaching", "Teaching strategies & tools", "Classroom performance support"],
    href: "/programmes/educator-development",
    Icon: UserRoundCog,
  },
];

export default function ProgrammesSection() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 36, scale: 0.97, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        {/* Heading */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-wide text-black/55">
            Programmes
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Support That Fits Your Learning Journey
          </h2>

          <p className="mt-3 text-base leading-relaxed text-black/70">
            We offer structured tutoring support, matric improvement pathways and
            educator development — designed for South African schooling
            standards.
          </p>
        </motion.div>

        {/* Cards (stronger scroll animations + stagger) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {items.map(({ title, subtitle, points, href, Icon }) => (
            <motion.div
              key={title}
              variants={item}
              className="water-hover group relative overflow-hidden rounded-3xl border border-border bg-white/70 backdrop-blur-xl"
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, rotate: -0.15, transition: { duration: 0.25 } }
              }
            >
              {/* premium hover wash */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,78,27,0.16),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(248,135,24,0.12),transparent_60%)]" />
              </div>

              {/* subtle top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-black/10" />

              <div className="relative p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-border bg-white/75 p-3 backdrop-blur">
                    <Icon className="h-6 w-6 text-[rgb(var(--brand))]" />
                  </div>

                  <span className="rounded-full border border-border bg-white/75 px-3 py-1 text-[11px] font-semibold text-black/55 backdrop-blur">
                    CAPS • IEB
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold tracking-tight">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  {subtitle}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-black/70">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand))]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={href}
                    className="btn-water inline-flex items-center gap-2 rounded-full border border-border bg-white/75 px-4 py-2 text-sm font-semibold text-black/75 backdrop-blur transition hover:bg-white"
                  >
                    View Programme <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA row */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-border bg-white/65 px-6 py-6 backdrop-blur-xl sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm font-semibold text-black/80">
              Not sure where to start?
            </p>
            <p className="mt-1 text-sm text-black/65">
              We’ll recommend the best programme based on your goals.
            </p>
          </div>

          <Link
            href="/contact"
            className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-6 py-3 text-sm font-extrabold text-white"
          >
            Book Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
